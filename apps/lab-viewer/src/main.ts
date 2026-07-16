import yaml from "js-yaml";
import {
  loadTopologyString,
  transform,
  type Topology,
} from "@exergy-connect/netlab";
import "./style.css";

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

const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <header>
    <h1>netlab.js</h1>
    <p>Load a topology, transform it, inspect JSON and a simple graph.</p>
  </header>
  <main>
    <section class="editor">
      <label for="src">Topology YAML</label>
      <textarea id="src" spellcheck="false"></textarea>
      <div class="actions">
        <button id="run" type="button">Transform</button>
        <span id="status"></span>
      </div>
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
const graph = app.querySelector<SVGSVGElement>("#graph")!;
const runBtn = app.querySelector<HTMLButtonElement>("#run")!;

src.value = SAMPLE;

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
  try {
    const parsed = yaml.load(src.value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Topology must be a YAML object");
    }
    // Browser has no fs; apply defaults via string load path helpers
    const topology = loadTopologyString(src.value);
    const { topology: result, diagnostics, stages } = transform(topology, {
      validate: false,
    });
    out.textContent = JSON.stringify(result, null, 2);
    renderGraph(result);
    const errs = diagnostics.list().filter((d) => d.severity === "error");
    status.textContent = errs.length
      ? `${errs.length} error(s); stages: ${JSON.stringify(stages)}`
      : `OK — stages: ${JSON.stringify(stages)}`;
  } catch (e) {
    status.textContent = e instanceof Error ? e.message : String(e);
    out.textContent = "";
    graph.innerHTML = "";
  }
}

runBtn.addEventListener("click", run);
run();
