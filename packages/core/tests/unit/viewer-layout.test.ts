import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { collectEdges, layoutTopology, orderForMinimalCrossings } from "../../../../apps/lab-viewer/src/layout.js";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";

describe("viewer topology layout", () => {
  it("keeps nodes apart in the MLAG VTEP symmetric IRB lab", () => {
    const input = loadTopologyString(readFileSync("tests/fixtures/integration/mlag.vtep/03-evpn-vxlan-symm-irb.yml", "utf8"));
    const { topology } = transform(input);
    const edges = collectEdges(topology);
    const names = orderForMinimalCrossings(Object.keys(topology.nodes!), edges);
    const hosts = new Set(names.filter((name) => topology.nodes![name]!.role === "host"));
    for (const aspect of [0.6, 1, 1.6, 2.5]) {
      const layout = layoutTopology(names, edges, hosts, () => 65, aspect, (name) => topology.nodes![name]!.id);
      for (let i = 0; i < names.length; i++) for (const other of names.slice(i + 1)) {
        const a = layout.get(names[i]!)!, b = layout.get(other)!;
        assert.ok(Math.hypot(a.x - b.x, a.y - b.y) >= 165, `${names[i]} overlaps ${other}`);
      }
      for (const [a, b] of edges) for (const name of names) {
        if (name === a || name === b) continue;
        const p = layout.get(a)!, q = layout.get(b)!, r = layout.get(name)!;
        const dx = q.x - p.x, dy = q.y - p.y;
        const t = Math.max(0, Math.min(1, ((r.x - p.x) * dx + (r.y - p.y) * dy) / (dx * dx + dy * dy)));
        assert.ok(Math.hypot(r.x - p.x - t * dx, r.y - p.y - t * dy) >= 65, `${a}-${b} passes through ${name} at aspect ${aspect}`);
      }
    }
  });

  it("continues searching when many hosts fill the initial placement area", () => {
    const names = ["router", ...Array.from({ length: 100 }, (_, i) => `h${i}`)];
    const hosts = new Set(names.slice(1));
    const edges = names.slice(1).map((name) => ["router", name] as const);
    const layout = layoutTopology(names, edges, hosts, () => 34, 1.6);
    for (let i = 0; i < names.length; i++) for (const other of names.slice(i + 1)) {
      const a = layout.get(names[i]!)!, b = layout.get(other)!;
      assert.ok(Math.hypot(a.x - b.x, a.y - b.y) >= 103 - 1e-6, `${names[i]} overlaps ${other}`);
    }
  });
  it("keeps links from passing through another router", () => {
    const names = ["r1", "r2", "r3"];
    const edges = [["r1", "r2"], ["r2", "r3"], ["r3", "r1"]] as const;
    const layout = layoutTopology(names, edges, new Set(), () => 34, 2);
    for (const [a, b] of edges) {
      const p = layout.get(a)!, q = layout.get(b)!;
      const vx = q.x - p.x, vy = q.y - p.y;
      for (const name of names.filter((n) => n !== a && n !== b)) {
        const r = layout.get(name)!;
        const t = ((r.x - p.x) * vx + (r.y - p.y) * vy) / (vx * vx + vy * vy);
        assert.ok(t <= 0 || t >= 1 || Math.hypot(r.x - p.x - t * vx, r.y - p.y - t * vy) > 54);
      }
    }
  });

  it("prefers lower router IDs on the left", () => {
    const ids: Record<string, number> = { left: 3, middle: 9, right: 7 };
    const edges = [["left", "middle"], ["middle", "right"], ["right", "left"]] as const;
    const layout = layoutTopology(["right", "middle", "left"], edges, new Set(), () => 34, 2, (name) => ids[name]);
    assert.ok(layout.get("left")!.x < layout.get("right")!.x);
    assert.ok(layout.get("right")!.x < layout.get("middle")!.x);
  });

  it("mirrors equivalent host branches on a symmetric backbone", () => {
    const nodes = ["a", "b", "c", "a1", "a2", "b1", "b2"];
    const edges = [["a", "b"], ["a", "c"], ["b", "c"], ["a", "a1"], ["a", "a2"], ["b", "b1"], ["b", "b2"]] as const;
    const layout = layoutTopology(nodes, edges, new Set(["a1", "a2", "b1", "b2"]), () => 34, 2);
    const a = layout.get("a")!, b = layout.get("b")!;
    assert.equal(a.x, -b.x);
    assert.equal(a.y, b.y);
    for (const [x, y] of [["a1", "b1"], ["a2", "b2"]]) {
      assert.ok(Math.abs(layout.get(x!)!.x + layout.get(y!)!.x) < 1e-6);
      assert.ok(Math.abs(layout.get(x!)!.y - layout.get(y!)!.y) < 1e-6);
    }
  });

  it("uses the available aspect ratio without overlapping nodes", () => {
    const names = ["r1", "r2", "r3", "r4", "h1", "h2"];
    const edges = [["r1", "r2"], ["r2", "r3"], ["r3", "r4"], ["r1", "h1"], ["r4", "h2"]] as const;
    const hosts = new Set(["h1", "h2"]);
    const wide = layoutTopology(names, edges, hosts, () => 34, 2.5);
    const tall = layoutTopology(names, edges, hosts, () => 34, 0.6);
    const spread = (layout: Map<string, {x: number; y: number}>, axis: "x" | "y") => {
      const values = names.map((name) => layout.get(name)![axis]);
      return Math.max(...values) - Math.min(...values);
    };
    assert.ok(spread(wide, "x") > spread(wide, "y"));
    assert.ok(spread(tall, "y") > spread(tall, "x"));
    for (const layout of [wide, tall]) for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) {
      const a = layout.get(names[i]!)!, b = layout.get(names[j]!)!;
      assert.ok(Math.hypot(a.x - b.x, a.y - b.y) >= 103);
    }
  });
});
