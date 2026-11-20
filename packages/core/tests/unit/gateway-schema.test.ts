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

it("validates gateway IP addresses, prefixes, and anycast MAC addresses", () => {
  for (const [ipv4, ipv6, mac] of [
    ["192.0.2.1", "2001:db8::1", "02:00:ca:fe:00:ff"],
    ["192.0.2.1/24", "2001:db8::1/64", "0200.cafe.00ff"],
  ]) {
    const input = loadTopologyString(`defaults.device: frr\nmodule: [gateway]\ngateway: { ipv4: '${ipv4}', ipv6: '${ipv6}', anycast: { mac: '${mac}' } }\nnodes: [r1]\n`);
    assert.deepEqual(transform(input).diagnostics.list().filter(d => d.severity === "error"), []);
  }
  for (const [field, value] of [["ipv4", "999.2.3.4"], ["ipv4", "192.0.2.1/33"], ["ipv6", "not-an-ip"], ["ipv6", "2001:db8::1/129"], ["anycast.mac", "invalid"]]) {
    const input = loadTopologyString(`defaults.device: frr\nmodule: [gateway]\ngateway.${field}: '${value}'\nnodes: [r1]\n`);
    const errors = transform(input).diagnostics.list().filter(d => d.module === "xyang" && d.severity === "error");
    assert.ok(errors.length, `accepted invalid ${field}: ${value}`);
  }
});
