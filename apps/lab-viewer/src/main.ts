import yaml from "js-yaml";
import {
  loadTopologyString,
  transform,
  type Topology,
} from "@exergy-connect/netlab";
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
      <div id="errors" class="errors" hidden></div>
    </section>
    <section class="view">
      <div class="graph-wrap">
        <h2>Graph</h2>
        <svg id="graph" viewBox="0 0 640 360" role="img" aria-label="Topology graph"></svg>
      </div>
      <div class="json-wrap">
        <h2>Transformed JSON</h2>
        <pre id="out"></pre>
      </div>
    </section>
  </main>
`;

const src = app.querySelector<HTMLTextAreaElement>("#src")!;
const out = app.querySelector<HTMLPreElement>("#out")!;
const status = app.querySelector<HTMLSpanElement>("#status")!;
const errorsEl = app.querySelector<HTMLDivElement>("#errors")!;
const graph = app.querySelector<SVGSVGElement>("#graph")!;
const runBtn = app.querySelector<HTMLButtonElement>("#run")!;
const validateBox = app.querySelector<HTMLInputElement>("#validate")!;

src.value = SAMPLE;

function fitTextarea(): void {
  src.style.height = "auto";
  src.style.height = `${src.scrollHeight}px`;
}

function clearErrors(): void {
  errorsEl.hidden = true;
  errorsEl.innerHTML = "";
  status.classList.remove("is-error");
}

function showErrors(messages: string[]): void {
  if (!messages.length) {
    clearErrors();
    return;
  }
  status.classList.add("is-error");
  errorsEl.hidden = false;
  errorsEl.innerHTML = `
    <h2>Transform errors</h2>
    <ul>
      ${messages.map((m) => `<li>${escapeHtml(m)}</li>`).join("")}
    </ul>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderGraph(topology: Topology): void {
  const nodes = Object.keys(topology.nodes ?? {});
  const links = topology.links ?? [];
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

  const lines = links
    .flatMap((link) => {
      const ifaces = link.interfaces ?? [];
      if (ifaces.length < 2) return [];
      const edges: string[] = [];
      for (let i = 0; i < ifaces.length; i++) {
        for (let j = i + 1; j < ifaces.length; j++) {
          const a = pos.get(String(ifaces[i]!.node));
          const b = pos.get(String(ifaces[j]!.node));
          if (!a || !b) continue;
          edges.push(
            `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="edge"/>`,
          );
        }
      }
      return edges;
    })
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
  clearErrors();
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
    out.textContent = JSON.stringify(result, null, 2);
    renderGraph(result);
    const errs = diagnostics.list().filter((d) => d.severity === "error");
    const warns = diagnostics.list().filter((d) => d.severity === "warning");
    if (errs.length) {
      status.textContent = `${errs.length} error(s); stages: ${JSON.stringify(stages)}`;
      showErrors(
        errs.map((d) => {
          const where = d.path ? ` (${d.path})` : "";
          return `[${d.module}/${d.code}] ${d.message}${where}`;
        }),
      );
    } else {
      status.textContent = warns.length
        ? `OK with ${warns.length} warning(s) — stages: ${JSON.stringify(stages)}`
        : `OK — stages: ${JSON.stringify(stages)}`;
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    status.textContent = "Transform failed";
    showErrors([message]);
    out.textContent = "";
    graph.innerHTML = "";
  }
}

src.addEventListener("input", fitTextarea);
runBtn.addEventListener("click", run);
fitTextarea();
run();
