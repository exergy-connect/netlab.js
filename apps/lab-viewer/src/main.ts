import * as yaml from "js-yaml";
import {
  loadTopologyString,
  transform,
  type Topology,
} from "@exergy-connect/netlab";
import {
  collectEdges,
  orderForMinimalCrossings,
} from "./layout";
import { fetchRepository, repositories } from "./catalog";
import "./style.css";

declare const __BUILD_TIME__: string;

const SAMPLE = `defaults:
  device: frr
provider: clab
name: demo
module: [ospf]
nodes:
  r1:
  r2:
links:
  - [r1, r2]
`;

function formatBuildTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
}

const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <header>
    <p class="build-time" title="Build timestamp">Built ${formatBuildTime(__BUILD_TIME__)}</p>
    <h1>netlab.js</h1>
    <p>Load a topology, transform it, inspect JSON and a simple graph.</p>
  </header>
  <main>
    <section class="editor">
      <div class="actions">
        <button id="run" type="button">Transform</button>
        <label class="check">
          <input id="validate" type="checkbox" />
          Validate (YANG)
        </label>
        <span id="status"></span>
      </div>
      <label for="examples">GitHub topologies</label>
      <select id="examples" disabled><option value="">Loading topologies…</option></select>
      <p id="catalog-status" role="status"></p>
      <label for="src">Topology YAML</label>
      <textarea id="src" spellcheck="false" rows="1"></textarea>
      <div id="diagnostics" class="diagnostics" hidden></div>
    </section>
    <section class="view">
      <div class="graph-wrap">
        <h2>Graph</h2>
        <div class="graph-layers" aria-label="Graph layers">
          <button type="button" id="layer-ospf" aria-pressed="true">OSPF areas</button>
          <button type="button" id="layer-bgp" aria-pressed="true">BGP sessions</button>
          <span class="bgp-key" id="bgp-legend"><span class="ebgp-key">····</span> eBGP <span class="ibgp-key">⌒</span> iBGP</span>
        </div>
        <div id="ospf-legend" class="ospf-legend" aria-label="OSPF area colors"></div>
        <div id="vlan-legend" class="ospf-legend" aria-label="VLAN colors"></div>
        <p class="graph-hint">Hover to inspect · click or press Enter to keep properties open · Escape to clear</p>
        <div class="graph-canvas">
          <svg id="graph" viewBox="0 0 640 360" role="group" aria-label="Topology graph"></svg>
          <aside id="graph-properties" class="graph-properties" aria-label="Graph properties" hidden>
            <div class="graph-properties-head"><strong></strong><button type="button" aria-label="Close properties">×</button></div>
            <pre></pre>
          </aside>
        </div>
      </div>
      <div class="json-wrap">
        <div class="json-head">
          <h2>Transformed JSON</h2>
          <label class="check">
            <input id="full-json" type="checkbox" />
            Full JSON
          </label>
        </div>
        <pre id="out"></pre>
      </div>
    </section>
  </main>
`;

const examples = app.querySelector<HTMLSelectElement>("#examples")!;
const catalogStatus = app.querySelector<HTMLParagraphElement>("#catalog-status")!;
const src = app.querySelector<HTMLTextAreaElement>("#src")!;
const out = app.querySelector<HTMLPreElement>("#out")!;
const status = app.querySelector<HTMLSpanElement>("#status")!;
const diagnosticsEl = app.querySelector<HTMLDivElement>("#diagnostics")!;
const graph = app.querySelector<SVGSVGElement>("#graph")!;
const ospfButton = app.querySelector<HTMLButtonElement>("#layer-ospf")!;
const bgpButton = app.querySelector<HTMLButtonElement>("#layer-bgp")!;
const bgpLegend = app.querySelector<HTMLElement>("#bgp-legend")!;
const ospfLegend = app.querySelector<HTMLDivElement>("#ospf-legend")!;
const graphProperties = app.querySelector<HTMLElement>("#graph-properties")!;
const runBtn = app.querySelector<HTMLButtonElement>("#run")!;
const validateBox = app.querySelector<HTMLInputElement>("#validate")!;
const fullJsonBox = app.querySelector<HTMLInputElement>("#full-json")!;

/** Last successful transform; kept so the Full JSON checkbox can re-render. */
let lastResult: Topology | undefined;
let sourceUrl: string | undefined;

src.value = SAMPLE;

function fitTextarea(): void {
  src.style.height = "auto";
  src.style.height = `${src.scrollHeight}px`;
}

function formatDiagnostic(d: {
  module: string;
  code: string;
  message: string;
  path?: string;
}): string {
  const where = d.path ? ` (${d.path})` : "";
  return `[${d.module}/${d.code}] ${d.message}${where}`;
}

function clearDiagnostics(): void {
  diagnosticsEl.hidden = true;
  diagnosticsEl.innerHTML = "";
  status.classList.remove("is-error", "is-warning");
}

function showDiagnostics(opts: {
  errors?: string[];
  warnings?: string[];
  sourceUrl?: string;
}): void {
  const errors = opts.errors ?? [];
  const warnings = opts.warnings ?? [];
  if (!errors.length && !warnings.length) {
    clearDiagnostics();
    return;
  }
  status.classList.toggle("is-error", errors.length > 0);
  status.classList.toggle("is-warning", errors.length === 0 && warnings.length > 0);
  diagnosticsEl.hidden = false;
  const sections: string[] = [];
  if (errors.length) {
    sections.push(`
      <div class="diag-block is-error">
        <h2>Transform errors</h2>
        <ul>
          ${errors.map((m) => `<li>${escapeHtml(m)}</li>`).join("")}
        </ul>
        ${opts.sourceUrl ? `<p>Lab file: ${escapeHtml(opts.sourceUrl)}</p>` : ""}
        <button class="copy-error" type="button">Copy error text</button>
        <span class="copy-status" role="status"></span>
      </div>`);
  }
  if (warnings.length) {
    sections.push(`
      <div class="diag-block is-warning">
        <h2>Transform warnings</h2>
        <ul>
          ${warnings.map((m) => `<li>${escapeHtml(m)}</li>`).join("")}
        </ul>
      </div>`);
  }
  diagnosticsEl.innerHTML = sections.join("");
  const copyButton = diagnosticsEl.querySelector<HTMLButtonElement>(".copy-error");
  if (copyButton) {
    const text = ["Transform errors", ...errors, ...(opts.sourceUrl ? [`Lab file: ${opts.sourceUrl}`] : [])].join("\n");
    copyButton.addEventListener("click", async () => {
      const copyStatus = diagnosticsEl.querySelector<HTMLSpanElement>(".copy-status")!;
      try {
        await navigator.clipboard.writeText(text);
        copyStatus.textContent = "Copied.";
      } catch {
        copyStatus.textContent = "Could not copy. Select the text and copy it manually.";
      }
    });
  }
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderJson(topology: Topology | undefined): void {
  if (!topology) {
    out.textContent = "";
    return;
  }
  const view = fullJsonBox.checked
    ? topology
    : { nodes: topology.nodes ?? {}, links: topology.links ?? [] };
  out.textContent = JSON.stringify(view, null, 2);
}

function renderGraph(topology: Topology): void {
  const nodeNames = Object.keys(topology.nodes ?? {});
  const hasProtocol = (protocol: "ospf" | "bgp") =>
    topology.module?.includes(protocol) || Object.values(topology.nodes ?? {}).some((node) =>
      node.module?.includes(protocol) || Boolean(node[protocol]));
  ospfButton.hidden = !hasProtocol("ospf");
  bgpButton.hidden = !hasProtocol("bgp");
  bgpLegend.hidden = bgpButton.hidden;
  const edges = collectEdges(topology);
  const nodes = orderForMinimalCrossings(nodeNames, edges);
  const pos = new Map<string, { x: number; y: number }>();
  nodes.forEach((name, i) => {
    const a = (2 * Math.PI * i) / Math.max(nodes.length, 1) - Math.PI / 2;
    pos.set(name, nodes.length === 1 ? { x: 320, y: 180 } : {
      x: 320 + 115.2 * Math.cos(a), y: 180 + 115.2 * Math.sin(a),
    });
  });
  const detailsFor = (name: string) => {
    const node = topology.nodes![name]!;
    return [node.device, node.bgp?.as != null ? `AS${node.bgp.as}` : undefined]
      .filter((value) => value != null && value !== "").join(" · ");
  };
  const radiusFor = (name: string) => Math.max(34, name.length * 4, detailsFor(name).length * 3.4 + 8);

  type Item = { title: string; properties: unknown; element: SVGElement };
  let selected: Item | undefined;
  let hovered: Item | undefined;
  const title = graphProperties.querySelector("strong")!;
  const content = graphProperties.querySelector("pre")!;
  const close = graphProperties.querySelector<HTMLButtonElement>("button")!;
  const show = () => {
    const item = selected ?? hovered;
    graphProperties.hidden = !item;
    if (item) {
      title.textContent = item.title;
      content.textContent = JSON.stringify(item.properties, null, 2);
    }
  };
  const clear = () => {
    selected?.element.classList.remove("is-selected");
    selected = undefined;
    hovered = undefined;
    show();
  };
  graphProperties.hidden = true;
  close.onclick = clear;
  graph.onkeydown = (event) => {
    if (event.key === "Escape") { clear(); event.preventDefault(); }
  };
  graph.onclick = (event) => { if (event.target === graph) clear(); };
  graph.replaceChildren();
  const svg = (tag: string, attrs: Record<string, string | number>): SVGElement => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, String(value));
    return el;
  };
  const interactive = (el: SVGElement, itemTitle: string, properties: unknown) => {
    const item: Item = { title: itemTitle, properties, element: el };
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", itemTitle);
    const enter = () => { hovered = item; show(); };
    const leave = () => { if (hovered === item) hovered = undefined; show(); };
    const select = (event: Event) => {
      event.stopPropagation();
      const wasSelected = selected === item;
      selected?.element.classList.remove("is-selected");
      selected = wasSelected ? undefined : item;
      selected?.element.classList.add("is-selected");
      show();
    };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("focus", enter);
    el.addEventListener("blur", leave);
    el.addEventListener("click", select);
    el.addEventListener("keydown", (event: Event) => {
      const key = (event as KeyboardEvent).key;
      if (key === "Enter" || key === " ") { event.preventDefault(); select(event); }
    });
  };

  const colors = ["#2dd4bf", "#fb923c", "#a78bfa", "#f472b6", "#a3e635", "#38bdf8", "#facc15", "#fb7185"];
  const areas = new Map<string, string>();
  const areaColor = (value: unknown): string | undefined => {
    if (typeof value !== "string" && typeof value !== "number") return undefined;
    const key = String(value);
    if (!areas.has(key)) areas.set(key, colors[areas.size % colors.length]!);
    return areas.get(key);
  };
  const vlanColors = new Map<string, string>();
  const vlanNames = (value: unknown): string[] => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return [];
    const data = value as Record<string, unknown>;
    const vlan = data.vlan && typeof data.vlan === "object" && !Array.isArray(data.vlan)
      ? data.vlan as Record<string, unknown> : {};
    const trunk = vlan.trunk;
    return [...new Set([data.vlan_name, vlan.name, vlan.access, vlan.native,
      ...(Array.isArray(trunk) ? trunk : trunk && typeof trunk === "object" ? Object.keys(trunk) : []),
    ].filter((name): name is string => typeof name === "string" && name.length > 0))];
  };
  const vlanColor = (name: string): string => {
    if (!vlanColors.has(name)) {
      const keyword = name.toLowerCase();
      const namedColor = /^[a-z]+$/.test(keyword) && !["inherit", "initial", "unset", "revert", "revertlayer", "currentcolor", "transparent"].includes(keyword)
        && CSS.supports("color", keyword);
      vlanColors.set(name, namedColor ? keyword : colors[vlanColors.size % colors.length]!);
    }
    return vlanColors.get(name)!;
  };
  const decorateVlan = (bubble: SVGElement, names: string[], svi = false) => {
    if (!names.length) return;
    if (svi) {
      bubble.classList.add("vlan-interface");
      bubble.style.fill = vlanColor(names[0]!);
      bubble.style.stroke = vlanColor(names[0]!);
      return;
    }
    // A segmented ring keeps every VLAN visible on a trunk.
    const cx = bubble.getAttribute("cx")!, cy = bubble.getAttribute("cy")!;
    const circumference = 2 * Math.PI * 9;
    names.forEach((name, index) => interfaceLayer.append(svg("circle", {
      cx, cy, r: 9, fill: "none", stroke: vlanColor(name), "stroke-width": 3,
      "stroke-dasharray": `${circumference / names.length} ${circumference}`,
      "stroke-dashoffset": -index * circumference / names.length,
      "pointer-events": "none",
    })));
  };
  const linkLayer = svg("g", {});
  const ospfLayer = svg("g", { class: "ospf-layer" });
  const bgpLayer = svg("g", { class: "bgp-layer" });
  const interfaceLayer = svg("g", {});
  const nodeLayer = svg("g", {});
  graph.append(linkLayer, ospfLayer, bgpLayer, interfaceLayer, nodeLayer);
  // Preserve link identity, including parallel links, rather than using the
  // deduplicated edges used for layout.
  const pairs = new Map<string, number>();
  const represented = new Set<unknown>();
  for (const link of topology.links ?? []) {
    const ends = (link.interfaces ?? []).filter((end) => end.node && pos.has(end.node));
    if (ends.length === 1) {
      const end = ends[0]!;
      const p = pos.get(end.node!)!;
      const dx = p.x - 320, dy = p.y - 180;
      const length = Math.hypot(dx, dy) || 1;
      const line = svg("line", { x1: p.x, y1: p.y, x2: p.x + (dx || 1) / length * 60, y2: p.y + dy / length * 60, class: "edge" });
      interactive(line, `Link ${end.node}`, link);
      linkLayer.append(line);
    }
    for (let i = 0; i < ends.length; i++) for (let j = i + 1; j < ends.length; j++) {
      const first = ends[i]!;
      const second = ends[j]!;
      if (first.node === second.node) continue;
      const a = pos.get(first.node!)!;
      const b = pos.get(second.node!)!;
      const key = [first.node!, second.node!].sort().join("\0");
      const count = pairs.get(key) ?? 0;
      pairs.set(key, count + 1);
      const dx = b.x - a.x, dy = b.y - a.y, length = Math.hypot(dx, dy) || 1;
      const offset = count === 0 ? 0 : (Math.ceil(count / 2) * (count % 2 ? 12 : -12));
      const x1 = a.x - dy / length * offset, y1 = a.y + dx / length * offset;
      const x2 = b.x - dy / length * offset, y2 = b.y + dx / length * offset;
      const line = svg("line", { x1, y1, x2, y2, class: "edge" });
      interactive(line, `Link ${first.node} – ${second.node}`, link);
      linkLayer.append(line);
      for (const [end, t1, t2] of [[first, 0, 0.5], [second, 0.5, 1]] as const) {
        const intf = topology.nodes?.[end.node!]?.interfaces?.find((candidate) =>
          candidate.linkindex === link.linkindex && (end.ifindex == null || candidate.ifindex === end.ifindex));
        const area = intf?.ospf && typeof intf.ospf === "object" && !Array.isArray(intf.ospf) ? intf.ospf.area : undefined;
        const color = areaColor(area);
        if (color) ospfLayer.append(svg("line", {
          x1: x1 + (x2 - x1) * t1, y1: y1 + (y2 - y1) * t1,
          x2: x1 + (x2 - x1) * t2, y2: y1 + (y2 - y1) * t2,
          stroke: color, class: "ospf-link",
        }));
      }
      // Match eBGP neighbors to this link's interface so parallel links remain distinct.
      const hasEbgp = [[first, second], [second, first]].some(([local, remote]) => {
        const neighbors = topology.nodes?.[local!.node!]?.bgp?.neighbors;
        return Array.isArray(neighbors) && neighbors.some((neighbor) =>
          neighbor && typeof neighbor === "object" && !Array.isArray(neighbor)
          && neighbor.type === "ebgp" && neighbor.name === remote!.node
          && (neighbor.ifindex == null || neighbor.ifindex === local!.ifindex));
      });
      if (hasEbgp) bgpLayer.append(svg("line", {
        x1: x1 - dy / length * 5, y1: y1 + dx / length * 5,
        x2: x2 - dy / length * 5, y2: y2 + dx / length * 5, class: "bgp-ebgp",
      }));
      for (const [end, t] of [[first, Math.min(0.45, (radiusFor(first.node!) + 14) / length)], [second, Math.max(0.55, 1 - (radiusFor(second.node!) + 14) / length)]] as const) {
        const node = topology.nodes?.[end.node!];
        const intf = node?.interfaces?.find((candidate) =>
          candidate.linkindex === link.linkindex && (end.ifindex == null || candidate.ifindex === end.ifindex),
        ) ?? end;
        represented.add(intf);
        const bubble = svg("circle", { cx: x1 + (x2 - x1) * t, cy: y1 + (y2 - y1) * t, r: 7, class: "interface-bubble" });
        interactive(bubble, `Interface ${end.node} · ${intf.ifname ?? end.ifname ?? "unnamed"}`, intf);
        interfaceLayer.append(bubble);
        decorateVlan(bubble, [...new Set([...vlanNames(intf), ...vlanNames(end), ...vlanNames(link)])], intf.type === "svi");
      }
    }
  }
  const bgpSeen = new Set<string>();
  for (const name of nodes) {
    const neighbors = topology.nodes![name]!.bgp?.neighbors;
    if (!Array.isArray(neighbors)) continue;
    for (const neighbor of neighbors) {
      if (!neighbor || typeof neighbor !== "object" || Array.isArray(neighbor) || neighbor.type !== "ibgp" || typeof neighbor.name !== "string") continue;
      const peer = neighbor.name;
      const a = pos.get(name), b = pos.get(peer);
      if (!a || !b || name === peer) continue;
      const key = [name, peer].sort().join("\0");
      if (bgpSeen.has(key)) continue;
      bgpSeen.add(key);
      const dx = b.x - a.x, dy = b.y - a.y;
      const mx = (a.x + b.x) / 2 - dy * 0.25, my = (a.y + b.y) / 2 + dx * 0.25;
      bgpLayer.append(svg("path", { d: `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`, class: "bgp-ibgp" }));
    }
  }
  for (const name of nodes) {
    const p = pos.get(name)!;
    const remaining = (topology.nodes![name]!.interfaces ?? []).filter((intf) => !represented.has(intf));
    const outward = Math.atan2(p.y - 180, p.x - 320);
    remaining.forEach((intf, index) => {
      const angle = outward + (index - (remaining.length - 1) / 2) * 0.35;
      const distance = radiusFor(name) + 14;
      const bubble = svg("circle", { cx: p.x + distance * Math.cos(angle), cy: p.y + distance * Math.sin(angle), r: 7, class: "interface-bubble" });
      interactive(bubble, `Interface ${name} · ${intf.ifname ?? "unnamed"}`, intf);
      interfaceLayer.append(bubble);
      decorateVlan(bubble, vlanNames(intf), intf.type === "svi");
    });
  }
  for (const name of nodes) {
    const p = pos.get(name)!;
    const node = topology.nodes![name]!;
    const details = detailsFor(name);
    // Approximate the width of each label, with room for the circle's curvature.
    const radius = radiusFor(name);
    const area = areaColor(node.ospf?.area);
    if (area) ospfLayer.append(svg("circle", { cx: p.x, cy: p.y, r: radius + 5, stroke: area, class: "ospf-halo" }));
    const group = svg("g", { class: "node" });
    group.append(svg("circle", { cx: p.x, cy: p.y, r: radius }));
    const label = svg("text", { x: p.x, y: p.y - 2, "text-anchor": "middle" });
    label.textContent = name;
    const sub = svg("text", { x: p.x, y: p.y + 14, "text-anchor": "middle", class: "sub" });
    sub.textContent = details;
    group.append(label, sub);
    interactive(group, `Node ${name}`, node);
    nodeLayer.append(group);
  }
  ospfLegend.replaceChildren();
  for (const [area, color] of areas) {
    const entry = document.createElement("span");
    const swatch = document.createElement("i");
    swatch.style.backgroundColor = color;
    entry.append(swatch, document.createTextNode(`Area ${area}`));
    ospfLegend.append(entry);
  }
  const vlanLegend = app.querySelector<HTMLElement>("#vlan-legend")!;
  vlanLegend.replaceChildren();
  for (const [name, color] of vlanColors) {
    const entry = document.createElement("span");
    const swatch = document.createElement("i");
    swatch.style.backgroundColor = color;
    entry.append(swatch, document.createTextNode(`VLAN ${name}`));
    vlanLegend.append(entry);
  }
  const applyLayers = () => {
    const ospfOn = ospfButton.getAttribute("aria-pressed") === "true";
    const bgpOn = bgpButton.getAttribute("aria-pressed") === "true";
    ospfLayer.style.display = ospfOn ? "" : "none";
    bgpLayer.style.display = bgpOn ? "" : "none";
    ospfLegend.hidden = !ospfOn || areas.size === 0;
  };
  for (const button of [ospfButton, bgpButton]) button.onclick = () => {
    button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
    applyLayers();
  };
  applyLayers();
}

function run(): void {
  status.textContent = "Running…";
  clearDiagnostics();
  try {
    const parsed = yaml.load(src.value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Topology must be a YAML object");
    }
    // Browser has no fs; apply defaults via string load path helpers
    const topology = loadTopologyString(src.value);
    const { topology: result, diagnostics, stages } = transform(topology, {
      validate: validateBox.checked,
      yangDir: "/yang",
    });
    lastResult = result;
    renderJson(result);
    renderGraph(result);
    const errs = diagnostics.list().filter((d) => d.severity === "error");
    const warns = diagnostics.list().filter((d) => d.severity === "warning");
    const parts: string[] = [];
    if (errs.length) parts.push(`${errs.length} error(s)`);
    if (warns.length) parts.push(`${warns.length} warning(s)`);
    status.textContent = parts.length
      ? `${parts.join(", ")}; stages: ${JSON.stringify(stages)}`
      : `OK — stages: ${JSON.stringify(stages)}`;
    showDiagnostics({
      errors: errs.map(formatDiagnostic),
      sourceUrl,
      warnings: warns.map(formatDiagnostic),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    status.textContent = "Transform failed";
    showDiagnostics({ errors: [message], sourceUrl });
    lastResult = undefined;
    renderJson(undefined);
    graph.innerHTML = "";
    graphProperties.hidden = true;
    ospfButton.hidden = true;
    bgpButton.hidden = true;
    bgpLegend.hidden = true;
    ospfLegend.hidden = true;
  }
}

let sourceGeneration = 0;
async function loadExample(url: string, restore = false): Promise<void> {
  const generation = ++sourceGeneration;
  catalogStatus.textContent = "Loading topology…";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const source = await response.text();
    if (generation !== sourceGeneration) return;
    src.value = source;
    sourceUrl = url;
    const pageUrl = new URL(location.href);
    pageUrl.searchParams.set("lab", url);
    history.replaceState(history.state, "", pageUrl);
    fitTextarea();
    catalogStatus.textContent = "Topology loaded. Edit it or select Transform.";
    if (restore) run();
  } catch (error) {
    if (generation !== sourceGeneration) return;
    catalogStatus.textContent = `Could not load topology: ${error instanceof Error ? error.message : String(error)}. Choose it again to retry.`;
    examples.value = "";
  }
}
examples.addEventListener("change", () => {
  if (examples.value) void loadExample(examples.value);
  else {
    ++sourceGeneration;
    const pageUrl = new URL(location.href);
    pageUrl.searchParams.delete("lab");
    history.replaceState(history.state, "", pageUrl);
  }
});
const requestedLab = new URL(location.href).searchParams.get("lab");
const initialGeneration = sourceGeneration;
src.addEventListener("input", () => { ++sourceGeneration; examples.value = ""; fitTextarea(); });
void Promise.allSettled(repositories.map(repo => fetchRepository(repo))).then(results => {
  examples.replaceChildren(new Option("Choose a topology…", ""));
  const errors: string[] = [];
  results.forEach((result, index) => {
    if (result.status === "rejected") { errors.push(String(result.reason)); return; }
    const group = document.createElement("optgroup");
    group.label = repositories[index].title;
    for (const entry of result.value) group.append(new Option(entry.path, entry.url));
    examples.append(group);
  });
  examples.disabled = examples.options.length <= 1;
  catalogStatus.textContent = errors.length ? `Some lists could not load: ${errors.join("; ")}` : "Select a topology from GitHub.";
  if (requestedLab && sourceGeneration === initialGeneration) {
    const option = Array.from(examples.options).find(item => item.value === requestedLab);
    if (option) {
      examples.value = requestedLab;
      void loadExample(requestedLab, true);
    } else {
      catalogStatus.textContent = `Saved lab is not available in the loaded catalog.${errors.length ? ` ${errors.join("; ")}` : ""}`;
    }
  }
});
runBtn.addEventListener("click", run);
fullJsonBox.addEventListener("change", () => renderJson(lastResult));
fitTextarea();
run();
