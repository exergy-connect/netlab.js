import * as yaml from "js-yaml";
import {
  loadTopologyString,
  transform,
  type Topology,
} from "@exergy-connect/netlab";
import {
  collectEdges,
  orderForMinimalCrossings,
  layoutTopology,
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
          <button type="button" id="layer-addressing" aria-pressed="false">IP addresses</button>
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
        <div id="address-list" class="address-list" hidden></div>
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
const addressingButton = app.querySelector<HTMLButtonElement>("#layer-addressing")!;
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
  const detailsFor = (name: string) => {
    const node = topology.nodes![name]!;
    return [node.device, node.bgp?.as != null ? `AS${node.bgp.as}` : undefined]
      .filter((value) => value != null && value !== "").join(" · ");
  };
  const labelFor = (name: string) => {
    const id = topology.nodes![name]!.id;
    return id == null ? name : `${name} (#${id})`;
  };
  const loopbacksFor = (name: string): string[] => {
    const loopback = topology.nodes![name]!.loopback;
    if (!loopback || typeof loopback !== "object" || Array.isArray(loopback)) return [];
    return [loopback.ipv4, loopback.ipv6].filter((value): value is string => typeof value === "string" && value.length > 0);
  };
  const radiusFor = (name: string) => {
    const loopbacks = loopbacksFor(name);
    const sviCount = (topology.nodes![name]!.interfaces ?? []).filter((intf) => intf.type === "svi").length;
    return Math.max(34, labelFor(name).length * 5.2, detailsFor(name).length * 4.1 + 8,
      ...loopbacks.map((address) => address.length * 3.5 + 12), loopbacks.length ? 32 + loopbacks.length * 7 : 0,
      sviCount ? Math.max(52, sviCount * 9 + 16) : 0);
  };
  const aspect = graph.clientWidth / Math.max(1, graph.clientHeight);
  const hosts = new Set(nodes.filter((name) => topology.nodes![name]!.role === "host"));
  const relative = layoutTopology(nodes, edges, hosts, radiusFor, aspect, (name) => topology.nodes![name]!.id);
  const margin = 55;
  const minX = Math.min(0, ...nodes.map((n) => relative.get(n)!.x - radiusFor(n) - margin));
  const maxX = Math.max(0, ...nodes.map((n) => relative.get(n)!.x + radiusFor(n) + margin));
  const minY = Math.min(0, ...nodes.map((n) => relative.get(n)!.y - radiusFor(n) - margin));
  const maxY = Math.max(0, ...nodes.map((n) => relative.get(n)!.y + radiusFor(n) + margin));
  const contentWidth = Math.max(1, maxX - minX), contentHeight = Math.max(1, maxY - minY);
  const width = Math.max(contentWidth, contentHeight * aspect);
  const height = Math.max(contentHeight, contentWidth / aspect);
  const centerX = (width - (maxX - minX)) / 2 - minX;
  const centerY = (height - (maxY - minY)) / 2 - minY;
  graph.setAttribute("viewBox", `0 0 ${width} ${height}`);
  graph.style.aspectRatio = `${width} / ${height}`;
  const pos = new Map<string, { x: number; y: number }>();
  for (const name of nodes) {
    const p = relative.get(name)!;
    pos.set(name, { x: centerX + p.x, y: centerY + p.y });
  }

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
  const vlanInterfaceLayer = svg("g", {});
  const addressingLayer = svg("g", { class: "addressing-layer", "aria-label": "IP addresses" });
  graph.append(linkLayer, ospfLayer, bgpLayer, interfaceLayer, nodeLayer, vlanInterfaceLayer, addressingLayer);
  // Preserve link identity, including parallel links, rather than using the
  // deduplicated edges used for layout.
  const pairs = new Map<string, number>();
  const represented = new Set<unknown>();
  const interfacePositions = new Map<unknown, { x: number; y: number }>();
  const linkLabels = new Map<unknown, { x: number; y: number; angle: number; side: number }>();
  const links = topology.links ?? [];
  const lagParents = new Set(links.flatMap((link) => {
    const lag = link.lag;
    return lag && typeof lag === "object" && !Array.isArray(lag) && typeof lag._parentindex === "number"
      ? [lag._parentindex] : [];
  }));
  const lagEndpoints = new Map<string, { node: string; parent: number; points: { x: number; y: number }[] }>();
  type LinkEnd = NonNullable<typeof links[number]["interfaces"]>[number];
  // Draw one link end on the segment from its node towards `to`: OSPF color up
  // to `ospfSpan`, the interface bubble, and the address label anchor.
  const drawEnd = (link: typeof links[number], end: LinkEnd, x1: number, y1: number, x2: number, y2: number, ospfSpan: number, labelAt: number) => {
    const dx = x2 - x1, dy = y2 - y1, length = Math.hypot(dx, dy) || 1;
    const node = topology.nodes?.[end.node!];
    const intf = node?.interfaces?.find((candidate) =>
      candidate.linkindex === link.linkindex && (end.ifindex == null || candidate.ifindex === end.ifindex),
    ) ?? end;
    const area = intf?.ospf && typeof intf.ospf === "object" && !Array.isArray(intf.ospf) ? intf.ospf.area : undefined;
    const color = areaColor(area);
    if (color) ospfLayer.append(svg("line", { x1, y1, x2: x1 + dx * ospfSpan, y2: y1 + dy * ospfSpan, stroke: color, class: "ospf-link" }));
    represented.add(intf);
    let angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const flip = angle > 90 || angle < -90;
    if (flip) angle += angle > 90 ? -180 : 180;
    linkLabels.set(intf, { x: x1 + dx * labelAt, y: y1 + dy * labelAt, angle, side: flip ? 1 : -1 });
    const t = Math.min(0.9 * ospfSpan, (radiusFor(end.node!) + 14) / length);
    const point = { x: x1 + dx * t, y: y1 + dy * t };
    const bubble = svg("circle", { cx: point.x, cy: point.y, r: 7, class: "interface-bubble" });
    interfacePositions.set(intf, point);
    const lag = link.lag;
    const parent = lag && typeof lag === "object" && !Array.isArray(lag) ? lag._parentindex : undefined;
    if (typeof parent === "number") {
      const key = `${parent}\0${end.node}`;
      const group = lagEndpoints.get(key) ?? { node: end.node!, parent, points: [] };
      group.points.push(point);
      lagEndpoints.set(key, group);
    }
    interactive(bubble, `Interface ${end.node} · ${intf.ifname ?? end.ifname ?? "unnamed"}`, intf);
    interfaceLayer.append(bubble);
    decorateVlan(bubble, [...new Set([...vlanNames(intf), ...vlanNames(end), ...vlanNames(link)])], (intf.type === "svi" || intf.type === "vlan_member"));
  };
  for (const link of topology.links ?? []) {
    if (link.type === "vlan_member" || (link.type === "lag" && lagParents.has(link.linkindex ?? -1))) continue;
    const ends = (link.interfaces ?? []).filter((end) => end.node && pos.has(end.node));
    // A multi-access segment is one link: draw it as a hub with a spoke per
    // node rather than a mesh, which would look like parallel p2p links.
    if (new Set(ends.map((end) => end.node)).size > 2) {
      const points = ends.map((end) => pos.get(end.node!)!);
      const centroid = { x: points.reduce((sum, p) => sum + p.x, 0) / points.length, y: points.reduce((sum, p) => sum + p.y, 0) / points.length };
      const clearance = (c: { x: number; y: number }) => Math.min(...nodes.map((name) => {
        const p = pos.get(name)!;
        return Math.hypot(c.x - p.x, c.y - p.y) - radiusFor(name);
      }));
      let hub = centroid;
      for (let ring = 1; clearance(hub) < 40 && ring <= 8; ring++) {
        const candidates = Array.from({ length: 12 }, (_, i) => ({ x: centroid.x + Math.cos(i * Math.PI / 6) * ring * 20, y: centroid.y + Math.sin(i * Math.PI / 6) * ring * 20 }));
        hub = candidates.reduce((best, c) => clearance(c) > clearance(best) ? c : best, hub);
      }
      const title = `LAN ${ends.map((end) => end.node).join(" – ")}`;
      for (const end of ends) {
        const p = pos.get(end.node!)!;
        const spoke = svg("line", { x1: p.x, y1: p.y, x2: hub.x, y2: hub.y, class: "edge" });
        interactive(spoke, title, link);
        linkLayer.append(spoke);
      }
      const marker = svg("circle", { cx: hub.x, cy: hub.y, r: 6, class: "lan-hub" });
      interactive(marker, title, link);
      linkLayer.append(marker);
      for (const end of ends) {
        const p = pos.get(end.node!)!;
        drawEnd(link, end, p.x, p.y, hub.x, hub.y, 1, 0.5);
      }
      continue;
    }
    if (ends.length === 1) {
      const end = ends[0]!;
      const p = pos.get(end.node!)!;
      const dx = p.x - centerX, dy = p.y - centerY;
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
      drawEnd(link, first, x1, y1, x2, y2, 0.5, 0.32);
      drawEnd(link, second, x2, y2, x1, y1, 0.5, 0.32);
    }
  }
  // A LAG is a logical interface, not another physical edge. Connect its
  // member ports with a curved bond and keep the aggregate selectable.
  for (const group of lagEndpoints.values()) {
    const node = topology.nodes?.[group.node];
    const aggregate = node?.interfaces?.find((intf) => intf.type === "lag" && intf.linkindex === group.parent);
    const center = pos.get(group.node);
    if (!aggregate || !center || group.points.length === 0) continue;
    const points = group.points;
    const mean = { x: points.reduce((sum, p) => sum + p.x, 0) / points.length, y: points.reduce((sum, p) => sum + p.y, 0) / points.length };
    const dx = mean.x - center.x, dy = mean.y - center.y, length = Math.hypot(dx, dy) || 1;
    const control = { x: mean.x + dx / length * 20, y: mean.y + dy / length * 20 };
    if (points.length > 1) {
      const normal = { x: -dy / length, y: dx / length };
      points.sort((a, b) => (a.x - b.x) * normal.x + (a.y - b.y) * normal.y);
      const first = points[0]!, last = points[points.length - 1]!;
      const arc = svg("path", { d: `M ${first.x} ${first.y} Q ${control.x} ${control.y} ${last.x} ${last.y}`, class: "lag-bond" });
      interactive(arc, `LAG ${group.node} · ${aggregate.ifname ?? "aggregate"}`, aggregate);
      interfaceLayer.append(arc);
    }
    const point = { x: (mean.x + control.x) / 2, y: (mean.y + control.y) / 2 };
    represented.add(aggregate);
    interfacePositions.set(aggregate, point);
    const bubble = svg("circle", { cx: point.x, cy: point.y, r: 7, class: "interface-bubble" });
    interactive(bubble, `Interface ${group.node} · ${aggregate.ifname ?? "aggregate"}`, aggregate);
    interfaceLayer.append(bubble);
    decorateVlan(bubble, vlanNames(aggregate), false);
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
  const children: { name: string; intf: NonNullable<Topology["nodes"]>[string]["interfaces"] extends (infer I)[] | undefined ? I : never; parent: unknown }[] = [];
  for (const name of nodes) {
    const p = pos.get(name)!;
    const interfaces = topology.nodes![name]!.interfaces ?? [];
    const parentOf = (intf: typeof interfaces[number]) => interfaces.find((candidate) => candidate !== intf && (
      (intf.parent_ifindex != null && candidate.ifindex === intf.parent_ifindex) ||
      (typeof intf.parent_ifname === "string" && candidate.ifname === intf.parent_ifname)
    ));
    const remaining = interfaces.filter((intf) => !represented.has(intf));
    const vlanInterfaces = remaining.filter((intf) => intf.type === "svi");
    vlanInterfaces.forEach((intf, index) => {
      const point = { x: p.x + (index - (vlanInterfaces.length - 1) / 2) * 18, y: p.y - radiusFor(name) + 13 };
      interfacePositions.set(intf, point);
      const bubble = svg("circle", { cx: point.x, cy: point.y, r: 6, class: "interface-bubble" });
      interactive(bubble, `Interface ${name} · ${intf.ifname ?? "unnamed"}`, intf);
      vlanInterfaceLayer.append(bubble);
      decorateVlan(bubble, vlanNames(intf), true);
    });
    const standalone = remaining.filter((intf) => intf.type !== "svi" && !parentOf(intf));
    const outward = Math.atan2(p.y - centerY, p.x - centerX);
    standalone.forEach((intf, index) => {
      const angle = outward + (index - (standalone.length - 1) / 2) * 0.35;
      const distance = radiusFor(name) + 14;
      const point = { x: p.x + distance * Math.cos(angle), y: p.y + distance * Math.sin(angle) };
      interfacePositions.set(intf, point);
      const bubble = svg("circle", { cx: point.x, cy: point.y, r: 7, class: "interface-bubble" });
      interactive(bubble, `Interface ${name} · ${intf.ifname ?? "unnamed"}`, intf);
      interfaceLayer.append(bubble);
      decorateVlan(bubble, vlanNames(intf), intf.type === "svi" || intf.type === "vlan_member");
    });
    for (const intf of remaining) {
      const parent = parentOf(intf);
      if (intf.type !== "svi" && parent) children.push({ name, intf, parent });
    }
  }
  for (const { name, intf, parent } of children) {
    const anchor = interfacePositions.get(parent);
    if (!anchor) continue;
    const nodePos = pos.get(name)!;
    const direction = Math.atan2(anchor.y - nodePos.y, anchor.x - nodePos.x);
    let point = { x: anchor.x, y: anchor.y };
    let bestClearance = -Infinity;
    // Try nearby positions around the parent, avoiding nodes and every marker
    // already drawn (including their VLAN rings).
    for (const distance of [25, 34, 43, 52, 61, 70, 79]) {
      for (let step = 0; step < 16; step++) {
        const angle = direction + (step % 2 ? 1 : -1) * Math.ceil(step / 2) * Math.PI / 8;
        const candidate = { x: anchor.x + Math.cos(angle) * distance, y: anchor.y + Math.sin(angle) * distance };
        const markerClearance = Math.min(...[...interfacePositions.values()].map((other) => Math.hypot(candidate.x - other.x, candidate.y - other.y) - 21));
        const nodeClearance = Math.min(...nodes.map((other) => {
          const center = pos.get(other)!;
          return Math.hypot(candidate.x - center.x, candidate.y - center.y) - radiusFor(other) - 10;
        }));
        const clearance = Math.min(markerClearance, nodeClearance, candidate.x - 10, width - 10 - candidate.x, candidate.y - 10, height - 10 - candidate.y);
        if (clearance > bestClearance) { bestClearance = clearance; point = candidate; }
        if (clearance >= 0) break;
      }
      if (bestClearance >= 0) break;
    }
    interfacePositions.set(intf, point);
    const bubble = svg("circle", { cx: point.x, cy: point.y, r: 7, class: "interface-bubble" });
    interactive(bubble, `Interface ${name} · ${intf.ifname ?? "unnamed"}`, intf);
    interfaceLayer.append(bubble);
    decorateVlan(bubble, vlanNames(intf), intf.type === "svi" || intf.type === "vlan_member");
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
    const loopbacks = loopbacksFor(name);
    const label = svg("text", { x: p.x, y: p.y - (loopbacks.length ? 12 : 2), "text-anchor": "middle" });
    label.textContent = labelFor(name);
    const sub = svg("text", { x: p.x, y: p.y + (loopbacks.length ? 4 : 14), "text-anchor": "middle", class: "sub" });
    sub.textContent = details;
    group.append(label, sub);
    loopbacks.forEach((address, index) => {
      const text = svg("text", { x: p.x, y: p.y + 19 + index * 12, "text-anchor": "middle", class: "node-loopback" });
      text.textContent = address;
      group.append(text);
    });
    interactive(group, `Node ${name}`, node);
    nodeLayer.append(group);
  }
  // Position labels near the interface, choosing a side that clears existing labels and nodes.
  const addressBoxes: { x: number; y: number; w: number; h: number }[] = [];
  const labelScale = Math.max(0.1, Math.min(graph.clientWidth / width, graph.clientHeight / height));
  const addressFont = Math.max(16, 11 / labelScale);
  const lineHeight = addressFont * 1.25;
  addressingLayer.style.fontSize = `${addressFont}px`;
  const drawAddresses = (values: unknown[], anchor: { x: number; y: number }, origin: { x: number; y: number }, offset = 13) => {
    const addresses = values.filter((value): value is string => typeof value === "string" && value.length > 0);
    if (!addresses.length) return;
    const w = Math.max(...addresses.map((address) => address.length * addressFont * 0.6)) + 4;
    const h = addresses.length * lineHeight;
    const angle = Math.atan2(anchor.y - origin.y, anchor.x - origin.x);
    let best = { x: anchor.x + offset, y: anchor.y - h / 2 };
    let bestScore = Infinity;
    for (let i = 0; i < 16; i++) {
      const a = angle + (i % 2 ? 1 : -1) * Math.ceil(i / 2) * Math.PI / 8;
      const x = anchor.x + Math.cos(a) * offset + (Math.cos(a) < 0 ? -w : 0);
      const y = anchor.y + Math.sin(a) * offset - h / 2;
      let score = Math.max(0, -x) + Math.max(0, x + w - width) + Math.max(0, -y) + Math.max(0, y + h - height);
      for (const box of addressBoxes) if (x < box.x + box.w && x + w > box.x && y < box.y + box.h && y + h > box.y) score += 1000;
      for (const name of nodes) {
        const p = pos.get(name)!;
        const cx = Math.max(x, Math.min(p.x, x + w)), cy = Math.max(y, Math.min(p.y, y + h));
        if (Math.hypot(p.x - cx, p.y - cy) < radiusFor(name) + 7) score += 1000;
      }
      if (score < bestScore) { bestScore = score; best = { x, y }; }
      if (score === 0) break;
    }
    addressBoxes.push({ ...best, w, h });
    addresses.forEach((address, index) => {
      const label = svg("text", { x: best.x + 2, y: best.y + addressFont + index * lineHeight, class: "address-label" });
      label.textContent = address;
      addressingLayer.append(label);
    });
  };
  const addressRows: { node: string; intf: string; address: string }[] = [];
  for (const name of nodes) {
    const node = topology.nodes![name]!;
    const p = pos.get(name)!;
    for (const intf of node.interfaces ?? []) {
      for (const address of [intf.ipv4, intf.ipv6]) {
        if (typeof address === "string" && address) addressRows.push({ node: name, intf: String(intf.ifname ?? "interface"), address });
      }
      const anchor = interfacePositions.get(intf);
      const linkLabel = linkLabels.get(intf);
      if (linkLabel) {
        const addresses = [intf.ipv4, intf.ipv6].filter((value): value is string => typeof value === "string" && value.length > 0);
        addresses.forEach((address, index) => {
          const radians = linkLabel.angle * Math.PI / 180;
          const side = linkLabel.side;
          const distance = addressFont * 1.2;
          const x = linkLabel.x - Math.sin(radians) * side * distance;
          const y = linkLabel.y + Math.cos(radians) * side * distance + (index - (addresses.length - 1) / 2) * lineHeight;
          const label = svg("text", { x, y, "text-anchor": "middle", class: "address-label", "data-anchor-x": anchor?.x ?? linkLabel.x, "data-anchor-y": anchor?.y ?? linkLabel.y });
          label.textContent = address;
          addressingLayer.append(label);
        });
      } else if (anchor) drawAddresses([intf.ipv4, intf.ipv6], anchor, p);
    }
    if (node.loopback && typeof node.loopback === "object" && !Array.isArray(node.loopback)) {
      for (const address of [node.loopback.ipv4, node.loopback.ipv6]) {
        if (typeof address === "string" && address) addressRows.push({ node: name, intf: "loopback", address });
      }
    }
  }
  const addressList = app.querySelector<HTMLElement>("#address-list")!;
  addressList.replaceChildren();
  const addressTable = document.createElement("table");
  addressTable.setAttribute("aria-label", "Interface addresses");
  const header = addressTable.createTHead().insertRow();
  for (const text of ["Node", "Interface", "Address"]) {
    const cell = document.createElement("th");
    cell.scope = "col";
    cell.textContent = text;
    header.append(cell);
  }
  const body = addressTable.createTBody();
  for (const row of addressRows) {
    const tr = body.insertRow();
    for (const value of [row.node, row.intf, row.address]) tr.insertCell().textContent = value;
  }
  addressList.append(addressTable);
  for (const label of addressingLayer.querySelectorAll<SVGTextElement>(".address-label")) {
    label.dataset.originalX = label.getAttribute("x") ?? "0";
    label.dataset.originalY = label.getAttribute("y") ?? "0";
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
    const addressingVisible = addressingButton.getAttribute("aria-pressed") === "true";
    addressingLayer.style.display = addressingVisible ? "" : "none";
    nodeLayer.querySelectorAll<SVGElement>(".node-loopback").forEach((text) => { text.style.display = addressingVisible ? "" : "none"; });
    addressList.hidden = addressingLayer.style.display === "none";
    if (addressingLayer.style.display !== "none") {
      addressingLayer.querySelectorAll(".address-leader").forEach((line) => line.remove());
      const placed: DOMRect[] = [];
      const graphRect = graph.getBoundingClientRect();
      const obstacles = [...nodeLayer.querySelectorAll("circle"), ...interfaceLayer.querySelectorAll("circle.interface-bubble"), ...vlanInterfaceLayer.querySelectorAll("circle.interface-bubble")].map((el) => el.getBoundingClientRect());
      for (const label of addressingLayer.querySelectorAll<SVGTextElement>(".address-label")) {
        const initialX = Number(label.dataset.originalX ?? 0);
        const initialY = Number(label.dataset.originalY ?? 0);
        let best = { x: initialX, y: initialY }, bestScore = Infinity;
        for (let attempt = 0; attempt < 121; attempt++) {
          const ring = Math.ceil(attempt / 8);
          const angle = (attempt % 8) * Math.PI / 4;
          const x = initialX + Math.cos(angle) * ring * addressFont * 0.9;
          const y = initialY + Math.sin(angle) * ring * addressFont * 0.9;
          label.setAttribute("x", String(x));
          label.setAttribute("y", String(y));
          const box = label.getBoundingClientRect();
          const outside = Math.max(0, graphRect.left - box.left) + Math.max(0, box.right - graphRect.right) + Math.max(0, graphRect.top - box.top) + Math.max(0, box.bottom - graphRect.bottom);
          const intersects = (other: DOMRect) => box.left < other.right + 3 && box.right + 3 > other.left && box.top < other.bottom + 3 && box.bottom + 3 > other.top;
          const collisions = placed.filter(intersects).length + obstacles.filter(intersects).length;
          const score = outside * 10 + collisions * 1000 + ring * 10;
          if (score < bestScore) { bestScore = score; best = { x, y }; }
          if (!outside && !collisions) break;
        }
        label.setAttribute("x", String(best.x));
        label.setAttribute("y", String(best.y));
        placed.push(label.getBoundingClientRect());
        const anchorX = label.getAttribute("data-anchor-x"), anchorY = label.getAttribute("data-anchor-y");
        if (anchorX !== null && anchorY !== null) {
          const leader = svg("line", { x1: anchorX, y1: anchorY, x2: best.x, y2: best.y - addressFont * 0.35, class: "address-leader" });
          addressingLayer.insertBefore(leader, addressingLayer.firstChild);
        }
      }
    }
    ospfLegend.hidden = !ospfOn || areas.size === 0;
  };
  for (const button of [ospfButton, bgpButton, addressingButton]) button.onclick = () => {
    button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
    applyLayers();
  };
  applyLayers();
}

let lastGraphSize = "";
let graphResizeFrame = 0;
new ResizeObserver(() => {
  const size = `${graph.clientWidth}x${graph.clientHeight}`;
  if (size === lastGraphSize) return;
  lastGraphSize = size;
  if (!lastResult) return;
  cancelAnimationFrame(graphResizeFrame);
  graphResizeFrame = requestAnimationFrame(() => { if (lastResult) renderGraph(lastResult); });
}).observe(graph);

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
