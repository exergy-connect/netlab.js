import yaml from "js-yaml";
import {
  loadTopologyString,
  transform,
  type Topology,
} from "@exergy-connect/netlab";
import {
  collectEdges,
  orderForMinimalCrossings,
} from "./layout";
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
      warnings: warns.map(formatDiagnostic),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    status.textContent = "Transform failed";
    showDiagnostics({ errors: [message] });
    lastResult = undefined;
    renderJson(undefined);
    graph.innerHTML = "";
  }
}

src.addEventListener("input", fitTextarea);
runBtn.addEventListener("click", run);
fullJsonBox.addEventListener("change", () => renderJson(lastResult));
fitTextarea();
run();
