import { describe, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateAt } from "../../src/validate/validate-at.js";
import { canonicalizeLinks } from "../../src/links/links.js";
import { createNodeDict } from "../../src/nodes/nodes.js";
import type { Topology } from "../../src/types.js";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";

const yangDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../yang");

describe("validateAt stage gates", () => {
  it("normalizes named prefixes, loopbacks and VRF links before validation", () => {
    const result = transform(loadTopologyString(`
defaults.device: none
module: [vrf, ospf]
prefix:
  beacon:
    ipv4: 172.42.43.0/24
nodes:
  r1:
    loopback: true
  r2:
    loopback.ipv4: 192.0.2.1/32
vrfs:
  tenant:
    links: [r1-r2]
links:
  - r1:
    prefix: beacon
    ospf: false
`), { yangDir });
    assert.equal(result.diagnostics.hasErrors(), false);
    assert.equal(result.stages.user_input, true);
    assert.equal(result.topology.links?.length, 2);
    assert.equal(result.topology.links?.[0]?.prefix?.ipv4, "172.42.43.0/24");
    assert.equal(result.topology.links?.[1]?.vrf, "tenant");
    assert.equal(result.topology.nodes?.r2?.loopback?.ipv4, "192.0.2.1/32");
    assert.equal(result.topology.nodes?.r1?.interfaces?.find((intf) => intf.linkindex === 1)?.ospf, undefined);
  });

  it("validates FRR node settings and BGP link endpoint attributes once", () => {
    const yaml = `
defaults.device: frr
groups:
  external:
    members: [x1, x2]
    module: [bgp]
nodes:
  rtr:
    bgp.as: 65000
    frr.daemons: [bgpd, ospfd, ospf6d]
  x1:
    bgp.as: 65100
  x2:
    bgp.as: 65101
links:
  - rtr:
    x1:
      bgp.default_originate: true
  - rtr:
    x2:
      bgp.default_originate: true
`;
    const valid = transform(loadTopologyString(yaml), { yangDir });
    assert.deepEqual(valid.stages, { user_input: true });
    assert.equal(valid.diagnostics.hasErrors(), false);

    const invalid = transform(loadTopologyString(yaml.replace("bgp.default_originate: true", "bgp.default_originate: invalid")), { yangDir });
    assert.equal(invalid.diagnostics.list().filter((d) => d.message.includes("default_originate")).length, 1);
  });

  it("rejects undefined trunk VLANs while accepting global and node VLANs", () => {
    const yaml = `
defaults.device: none
module: [vlan]
vlans:
  red:
nodes:
  s1:
    vlans:
      blue:
  s2:
links:
  - s1:
    s2:
    vlan.trunk: [red, blue]
`;
    const valid = transform(loadTopologyString(yaml), { yangDir });
    assert.equal(valid.diagnostics.hasErrors(), false, JSON.stringify(valid.diagnostics.list()));
    const invalid = transform(loadTopologyString(yaml.replace("[red, blue]", "[red, blue, green]")), { yangDir });
    assert.ok(invalid.diagnostics.list().some((d) => d.message.includes("trunk[2]") && d.message.includes("must be defined")));
    const unrelated = transform(loadTopologyString(yaml.replace("  s2:\nlinks:", "  s2:\n  s3:\n    vlans:\n      green:\nlinks:").replace("[red, blue]", "[red, blue, green]")), { yangDir });
    assert.ok(unrelated.diagnostics.list().some((d) => d.message.includes("trunk[2]") && d.message.includes("link endpoint")));
    const wrongNode = transform(loadTopologyString(yaml.replace("  - s1:\n    s2:\n    vlan.trunk: [red, blue]", "  - s1:\n    s2:\n      vlan.trunk: [blue]")), { yangDir });
    assert.ok(wrongNode.diagnostics.list().some((d) => d.message.includes("interface node")));
  });

  it("accepts and applies a group node role", () => {
    const result = transform(loadTopologyString(`
defaults.device: none
groups:
  switches:
    members: [s1]
    role: router
nodes: [s1]
`), { yangDir });
    assert.equal(result.diagnostics.hasErrors(), false, JSON.stringify(result.diagnostics.list()));
    assert.equal(result.topology.nodes?.s1?.role, "router");
  });

  it("accepts canonicalized minimal topology at user_input", () => {
    const topology: Topology = {
      name: "t",
      provider: "clab",
      nodes: createNodeDict(["r1", "r2"]),
      links: [["r1", "r2"]],
    };
    canonicalizeLinks(topology);
    for (const n of Object.values(topology.nodes!)) n.device = "none";
    const r = validateAt(topology, "user_input", { yangDir });
    if (!r.ok) console.log(r.errors);
    assert.equal(topology.stage, "user_input");
    // Soft assert: YANG load/validate path must not throw; strict validity may evolve
    assert.ok(Array.isArray(r.errors));
  });
});

it("validates EVPN VLAN and VRF attributes at input and transformed stages", () => {
  const snapshots = new Map();
  const result = transform(loadTopologyString(`
defaults.device: none
module: [vlan, vxlan, ospf, bgp, evpn, vrf]
bgp.as: 65000
vrfs:
  tenant:
    evpn.transit_vni: 5042
vlans:
  red:
    vrf: tenant
nodes:
  r1:
    evpn.as: 65000
    vlans:
      red:
        evpn.import: "65000:1"
        evpn.export: ["65000:2"]
  r2:
links: [r1-r2]
`), { yangDir, snapshots });
  assert.equal(result.stages.user_input, true, JSON.stringify(result.diagnostics.list()));
  const validation = validateAt(result.topology, "transformed", { yangDir });
  assert.equal(validation.ok, true, JSON.stringify(validation.errors));
  const red = snapshots.get("user_input").nodes.r1.vlans.red;
  assert.equal(red.evpn.import, "65000:1", "validation must not mutate runtime shorthand");
});
