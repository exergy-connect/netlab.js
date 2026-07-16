import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { collectTopologyModules, sortModules } from "../../src/modules/registry.js";
import {
  loadModuleDefs,
  moduleConfigAfter,
  moduleNoPropagate,
  moduleNodeCopy,
  moduleRequires,
  moduleTransformAfter,
} from "../../src/modules/defs.js";
import { systemDefaults } from "../../src/load/defaults.js";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";

describe("protocol modules", () => {
  it("loads module YAML defs with requires/transform_after/no_propagate", () => {
    const defs = loadModuleDefs();
    assert.ok(defs.bgp);
    assert.ok(defs.vxlan);
    assert.deepEqual(moduleRequires("vxlan"), ["vlan"]);
    assert.deepEqual(moduleRequires("evpn"), ["bgp"]);
    assert.deepEqual(moduleTransformAfter("bgp"), ["vlan"]);
    assert.deepEqual(moduleTransformAfter("vrf"), ["vlan", "bgp"]);
    assert.ok(moduleNoPropagate(defs.bgp).includes("ebgp_role"));
    assert.ok(moduleNoPropagate(defs.vxlan).includes("start_vni"));
    assert.deepEqual(moduleNodeCopy("ospf"), [
      "area",
      "passive",
      "digest",
      "password",
      "priority",
      "timers",
    ]);
    const defaults = systemDefaults();
    assert.equal((defaults.ospf as { area?: string }).area, "0.0.0.0");
    assert.equal((defaults.vxlan as { start_vni?: number }).start_vni, 100000);
  });

  it("orders modules with transform_after dependencies from YAML", () => {
    // Netlab: bgp after vlan; vrf after vlan+bgp; ospf after vlan+vrf
    assert.deepEqual(sortModules(["bgp", "ospf", "vlan", "vrf"]), [
      "vlan",
      "bgp",
      "vrf",
      "ospf",
    ]);
    const ordered = sortModules(["evpn", "bgp", "vxlan", "vlan", "ospf"]);
    assert.ok(ordered.indexOf("vlan") < ordered.indexOf("vxlan"));
    assert.ok(ordered.indexOf("vxlan") < ordered.indexOf("evpn"));
    assert.ok(ordered.indexOf("bgp") < ordered.indexOf("evpn"));
  });

  it("orders final module lists with config_after (bgp after ospf)", () => {
    assert.ok(moduleConfigAfter("bgp").includes("ospf"));
    assert.deepEqual(sortModules(["bgp", "ospf"], "config_after"), ["ospf", "bgp"]);
    const topo = loadTopologyString(`
defaults:
  device: none
provider: clab
module: [bgp, ospf]
bgp:
  as: 65000
nodes:
  r1:
  r2:
links:
  - r1-r2
`);
    const { topology } = transform(topo, { validate: false });
    assert.deepEqual(topology.module, ["ospf", "bgp"]);
    assert.deepEqual(topology.nodes!.r1!.module, ["ospf", "bgp"]);
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
    assert.ok(Array.isArray((topology.nodes!.r1!.bgp as { neighbors?: unknown[] }).neighbors));
    assert.ok(collectTopologyModules(topology).includes("ospf"));
  });

  it("assigns VXLAN VNI/VTEP and EVPN EVI/RT/AF", () => {
    const topo = loadTopologyString(`
defaults.device: none
provider: clab
module: [vlan, vxlan, ospf, bgp, evpn]
bgp.as: 65000
vlans:
  red:
    mode: bridge
  blue:
    mode: bridge
nodes:
  r1:
  r2:
links:
  - [r1, r2]
`);
    const { topology, diagnostics } = transform(topo, { validate: false });
    assert.equal(diagnostics.hasErrors(), false);
    assert.equal((topology.vxlan as { flooding?: string }).flooding, "evpn");
    const red = (topology.vlans as Record<string, { vni?: number; id?: number; evpn?: { evi?: number } }>)
      .red!;
    assert.equal(red.vni, 100000 + Number(red.id));
    assert.equal(red.evpn?.evi, red.id);
    const n1 = topology.nodes!.r1!;
    assert.equal((n1.vxlan as { flooding?: string }).flooding, "evpn");
    assert.ok((n1.vxlan as { vtep?: string }).vtep);
    assert.deepEqual((n1.evpn as { vlans?: string[] }).vlans?.sort(), ["blue", "red"]);
    const neighbors = (n1.bgp as { neighbors?: { name?: string; evpn?: string; type?: string }[] })
      .neighbors!;
    assert.ok(neighbors.some((nb) => nb.type === "ibgp" && nb.evpn === "ipv4"));
    const nodeRed = (n1.vlans as Record<string, { evpn?: { rd?: string } }>).red!;
    assert.ok(nodeRed.evpn?.rd?.includes(":"));
  });
});
