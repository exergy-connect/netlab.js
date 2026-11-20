import { it } from "node:test";
import assert from "node:assert/strict";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";
import { toYangInstance } from "../../src/validate/instance-adapter.js";

it("validates gateway shorthand and typed settings without modifying topology data", () => {
  const input = loadTopologyString(`
defaults.device: frr
module: [vlan, gateway]
gateway: { protocol: vrrp, vrrp: { group: 42, priority: 120 } }
groups:
  routers:
    members: [r1]
    gateway.vrrp.priority: 110
nodes: [r1, r2]
vlans:
  red: { gateway: true }
links:
  - interfaces:
      - node: r1
        gateway: true
      - node: r2
        gateway: false
    gateway: true
`);
  const result = transform(input);
  assert.deepEqual(result.diagnostics.list().filter(d => d.severity === "error"), []);
  const before = structuredClone(result.topology);
  const instance = toYangInstance(result.topology);
  assert.ok(instance.topology);
  assert.deepEqual(result.topology, before);
});

it("rejects gateway values with the wrong type", () => {
  const input = loadTopologyString(`
defaults.device: frr
module: [gateway]
gateway: { protocol: anycast, anycast: { unicast: invalid } }
nodes: [r1, r2]
links:
  - interfaces: [r1, r2]
    gateway: true
`);
  const errors = transform(input).diagnostics.list().filter(d => d.severity === "error");
  assert.ok(errors.some(d => d.module === "xyang" && d.message.includes("unicast")));
});
