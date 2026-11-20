import { it } from "node:test";
import assert from "node:assert/strict";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";

it("expands a flat fabric before node and link transformation", () => {
  const result = transform(loadTopologyString(`
module: [fabric, bgp]
bgp.as: 65000
fabric:
  leafs: 2
  spines: 2
  leaf: { name: 'leaf{count:02d}' }
  link: { prefix: 10.50.0.0/24 }
nodes: { extra: { device: linux } }
links: [extra-leaf01]
`));
  assert.equal(result.diagnostics.hasErrors(), false, JSON.stringify(result.diagnostics.list()));
  assert.deepEqual(Object.keys(result.topology.nodes ?? {}).sort(), ["S1", "S2", "extra", "leaf01", "leaf02"]);
  assert.equal(result.topology.links?.length, 5);
  assert.equal(result.topology.links?.[0]?.interfaces?.[0]?.ipv4, "10.50.0.1/30");
  assert.equal(result.topology.links?.[0]?.interfaces?.[1]?.ipv4, "10.50.0.2/30");
  assert.equal(result.topology.links?.[1]?.interfaces?.[0]?.ipv4, "10.50.0.5/30");
});

it("reports unsupported features and exhausted pools", () => {
  for (const input of [
    "fabric: {leafs: 2, spines: 2, pods: []}",
    "fabric: {leafs: 2, spines: 2, link: {prefix: 10.0.0.0/29}}",
  ]) {
    const result = transform(loadTopologyString(input));
    assert.ok(result.diagnostics.list().some(d => d.module === "fabric" && d.severity === "error"));
  }
});
