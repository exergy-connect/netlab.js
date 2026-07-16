import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getLinkModuleNoPropagate,
  getLinkPropagateAttributes,
  getPoolNoCopy,
} from "../../src/load/attributes.js";
import { systemDefaults } from "../../src/load/defaults.js";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";

describe("attributes.yml transform control", () => {
  it("computes link propagate set without prefix/interfaces/gateway", () => {
    const defaults = systemDefaults();
    const prop = getLinkPropagateAttributes(defaults);
    assert.ok(prop.has("type"));
    assert.ok(prop.has("bridge"));
    assert.ok(prop.has("role"));
    assert.ok(prop.has("linkindex"));
    assert.ok(!prop.has("prefix"));
    assert.ok(!prop.has("interfaces"));
    assert.ok(!prop.has("gateway"));
    assert.deepEqual([...getLinkModuleNoPropagate(defaults)].sort(), ["dhcp", "vlan"]);
    assert.deepEqual([...getPoolNoCopy(defaults)].sort(), ["mac", "prefix", "prefix6", "start"]);
  });

  it("propagates link role/bandwidth but not prefix onto node interfaces", () => {
    const topo = loadTopologyString(`
defaults:
  device: none
provider: clab
nodes:
  r1:
  r2:
links:
  - r1:
    r2:
    role: external
    bandwidth: 1000
`);
    const { topology } = transform(topo, { validate: false });
    const iface = topology.nodes!.r1!.interfaces![0]!;
    assert.equal(iface.role, "external");
    assert.equal(iface.bandwidth, 1000);
    assert.equal(iface.linkindex, 1);
    assert.equal(iface.prefix, undefined);
    assert.equal(iface.interfaces, undefined);
  });

  it("vlan module merges access VLAN onto interfaces (not via link_module_no_propagate)", () => {
    const topo = loadTopologyString(`
defaults:
  device: none
provider: clab
module: [vlan]
vlans:
  red: {}
nodes:
  r1:
  r2:
links:
  - r1:
    r2:
    vlan:
      access: red
`);
    const { topology } = transform(topo, { validate: false });
    // vlan stays out of generic link→interface propagation; VLAN link_pre_transform merges it
    const access = topology.nodes!.r1!.interfaces!.find((i) => i.type !== "svi")!;
    assert.equal((access.vlan as { access?: string }).access, "red");
    assert.equal(typeof (access.vlan as { access_id?: number }).access_id, "number");
  });
});
