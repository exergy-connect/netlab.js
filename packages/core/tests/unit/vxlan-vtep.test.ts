import { it } from "node:test";
import assert from "node:assert/strict";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";
import type { JsonObject } from "../../src/types.js";

it("uses a marked loopback as the VTEP and advertises it to peers", () => {
  const input = loadTopologyString(`
defaults.device: frr
module: [vlan, vxlan, ospf]
vlans:
  red:
    vni: 5000
links:
  - dut:
    s2:
  - dut:
    type: loopback
    vxlan.vtep: true
    pool: vrf_loopback
nodes: [dut, s2]
`);
  const { topology, diagnostics } = transform(input);
  assert.deepEqual(diagnostics.list().filter(d => d.severity === "error"), []);
  const dut = topology.nodes!.dut!;
  const selected = dut.interfaces!.find(i => i.type === "loopback")!;
  const vxlan = dut.vxlan as JsonObject;
  assert.equal(vxlan.vtep, (selected.ipv4 as string).split("/")[0]);
  assert.equal(vxlan.vtep_interface, selected.ifname);
  assert.notEqual(vxlan.vtep, (dut.loopback!.ipv4 as string).split("/")[0]);
  const peerVlan = (topology.nodes!.s2!.vlans as Record<string, JsonObject>).red!;
  assert.deepEqual(peerVlan.vtep_list, [vxlan.vtep]);
});
