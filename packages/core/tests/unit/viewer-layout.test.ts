import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { layoutTopology } from "../../../../apps/lab-viewer/src/layout.js";

describe("viewer topology layout", () => {
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
