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
      <label for="examples">GitHub topologies</label>
      <select id="examples" disabled><option value="">Loading topologies…</option></select>
      <p id="catalog-status" role="status"></p>
      <label for="src">Topology YAML</label>
      <textarea id="src" spellcheck="false" rows="1"></textarea>
      <div class="actions">
        <button id="run" type="button">Transform</button>
        <label class="check">
          <input id="validate" type="checkbox" />
          Validate (YANG)
        </label>
        <span id="status"></span>
      </div>
      <div id="diagnostics" class="diagnostics" hidden></div>
    </section>
    <section class="view">
      <div class="graph-wrap">
        <h2>Graph</h2>
        <svg id="graph" viewBox="0 0 640 360" role="img" aria-label="Topology graph"></svg>
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
  source?: string;
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
        <h3>Topology YAML</h3>
        <pre class="error-source">${escapeHtml(opts.source ?? "")}</pre>
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
    const text = ["Transform errors", ...errors, ...(opts.sourceUrl ? [`Lab file: ${opts.sourceUrl}`] : []), "", "Topology YAML:", opts.source ?? ""].join("\n");
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
  const edges = collectEdges(topology);
  const nodes = orderForMinimalCrossings(nodeNames, edges);
  const w = 640;
  const h = 360;
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.32;
  const pos = new Map<string, { x: number; y: number }>();
  nodes.forEach((name, i) => {
    const a = (2 * Math.PI * i) / Math.max(nodes.length, 1) - Math.PI / 2;
    pos.set(name, { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
  });

  const lines = edges
    .map(([u, v]) => {
      const a = pos.get(u);
      const b = pos.get(v);
      if (!a || !b) return "";
      return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="edge"/>`;
    })
    .filter(Boolean)
    .join("");

  const circles = nodes
    .map((name) => {
      const p = pos.get(name)!;
      const device = String(topology.nodes?.[name]?.device ?? "");
      return `
        <g class="node">
          <circle cx="${p.x}" cy="${p.y}" r="28"/>
          <text x="${p.x}" y="${p.y - 2}" text-anchor="middle">${name}</text>
          <text x="${p.x}" y="${p.y + 14}" text-anchor="middle" class="sub">${device}</text>
        </g>`;
    })
    .join("");

  graph.innerHTML = `${lines}${circles}`;
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
      source: src.value,
      sourceUrl,
      warnings: warns.map(formatDiagnostic),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    status.textContent = "Transform failed";
    showDiagnostics({ errors: [message], source: src.value, sourceUrl });
    lastResult = undefined;
    renderJson(undefined);
    graph.innerHTML = "";
  }
}

let sourceGeneration = 0;
examples.addEventListener("change", async () => {
  const generation = ++sourceGeneration;
  if (!examples.value) return;
  catalogStatus.textContent = "Loading topology…";
  try {
    const response = await fetch(examples.value);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const source = await response.text();
    if (generation !== sourceGeneration) return;
    src.value = source;
    sourceUrl = examples.value;
    fitTextarea();
    catalogStatus.textContent = "Topology loaded. Edit it or select Transform.";
  } catch (error) {
    if (generation !== sourceGeneration) return;
    catalogStatus.textContent = `Could not load topology: ${error instanceof Error ? error.message : String(error)}. Choose it again to retry.`;
    examples.value = "";
  }
});
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
});
runBtn.addEventListener("click", run);
fullJsonBox.addEventListener("change", () => renderJson(lastResult));
fitTextarea();
run();
