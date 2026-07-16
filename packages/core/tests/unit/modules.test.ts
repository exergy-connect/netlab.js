import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { collectTopologyModules, sortModules } from "../../src/modules/registry.js";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";

describe("protocol modules", () => {
  it("orders modules with transform_after dependencies", () => {
    assert.deepEqual(sortModules(["bgp", "ospf", "vlan", "vrf"]), ["vlan", "vrf", "ospf", "bgp"]);
  });

  it("runs ospf + isis + bgp hooks on a none lab", () => {
    const topo = loadTopologyString(`
defaults:
  device: none
provider: clab
module: [vlan, vrf, ospf, isis, bgp]
bgp:
  as: 65000
vlans:
  red: {}
vrfs:
  tenant: {}
nodes:
  r1:
  r2:
links:
  - [r1, r2]
`);
    const { topology } = transform(topo, { validate: false });
    assert.ok((topology.nodes!.r1!.ospf as { router_id?: string }).router_id);
    assert.ok((topology.nodes!.r1!.isis as { net?: string }).net);
    assert.ok(Array.isArray((topology.nodes!.r1!.bgp as { neighbor?: unknown[] }).neighbor));
    assert.ok(collectTopologyModules(topology).includes("ospf"));
  });
});
