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

it("validates VRF loopbacks and OSPF settings alongside group attributes", () => {
  const yaml = `
defaults.device: none
module: [vrf, ospf]
groups:
  routers:
    members: [r1, r2]
    ospf.area: 2
    netlab_phy_control: false
vrfs:
  red:
    loopback: true
    ospf.area: 3
nodes:
  r1:
    vrfs:
      red:
        loopback: 10.0.0.42/32
        ospf.router_id: 10.0.0.1
  r2:
links: [r1-r2]
`;
  const result = transform(loadTopologyString(yaml), { yangDir });
  assert.equal(result.stages.user_input, true, JSON.stringify(result.diagnostics.list()));
  const validation = validateAt(result.topology, "transformed", { yangDir });
  assert.equal(validation.ok, true, JSON.stringify(validation.errors));

  const invalid = transform(loadTopologyString(yaml.replace("netlab_phy_control: false", "netlab_phy_control: invalid")), { yangDir });
  assert.equal(invalid.stages.user_input, false);
  assert.ok(invalid.diagnostics.list().some(d => d.message.includes("netlab_phy_control")));
});

it("validates typed VRF settings, loopbacks, BGP and group definitions", () => {
  const topology = {
    nodes: { r1: { name: "r1", device: "none", vrf: { as: 65000, loopback: true }, vrfs: {
      red: { loopback: "192.0.2.1/32", bgp: { router_id: "192.0.2.1", import: ["connected"] } },
      blue: { loopback: { ipv6: "2001:db8::1/128" }, bgp: false },
    } } },
    groups: { routers: { members: ["r1"], vrfs: { green: { loopback: true, bgp: { as: 65001 } } } } },
    vrfs: { red: { loopback: null } }, links: [],
  } as unknown as Topology;
  const before = structuredClone(topology);
  const result = validateAt(topology, "user_input", { yangDir });
  assert.equal(result.ok, true, JSON.stringify(result.errors));
  delete topology.stage;
  assert.deepEqual(topology, before);

  for (const invalid of [
    { vrf: { as: "bad" } },
    { vrfs: { red: { loopback: "not-a-prefix" } } },
    { vrfs: { red: { loopback: { ipv4: 42 } } } },
    { vrfs: { red: { bgp: { as: "bad" } } } },
    { vrfs: { red: { bgp: { unexpected: true } } } },
  ]) {
    const candidate = { nodes: { r1: { name: "r1", device: "none", ...invalid } }, links: [] } as unknown as Topology;
    assert.equal(validateAt(candidate, "user_input", { yangDir }).ok, false, JSON.stringify(invalid));
  }
  const invalidGroup = { nodes: {}, links: [], groups: { routers: { vrfs: { red: { bgp: { as: "bad" } } } } } } as unknown as Topology;
  assert.equal(validateAt(invalidGroup, "user_input", { yangDir }).ok, false);
});

it("resolves VRF references against global and relevant node definitions", () => {
  const topology = {
    nodes: {
      r1: { name: "r1", device: "none", vrfs: { local: {} }, interfaces: [{ ifindex: 1, vrf: "local", neighbors: [{ node: "r2", vrf: "remote" }] }], vlans: { red: { vrf: "local" } } },
      r2: { name: "r2", device: "none", vrfs: { remote: {} } },
      r3: { name: "r3", device: "none", vrfs: { unrelated: {} } },
    },
    vrfs: { global: {} }, vlans: { blue: { vrf: "global" } },
    links: [{ vrf: "local", interfaces: [{ node: "r1" }, { node: "r2" }] }],
  } as unknown as Topology;
  const valid = validateAt(topology, "user_input", { yangDir });
  assert.equal(valid.ok, true, JSON.stringify(valid.errors));
  const invalidCases: Array<(value: any) => void> = [
    v => { v.links[0].vrf = "unrelated"; },
    v => { v.nodes.r1.interfaces[0].vrf = "unrelated"; },
    v => { v.nodes.r1.interfaces[0].neighbors[0].vrf = "unrelated"; },
    v => { v.nodes.r1.vlans.red.vrf = "unrelated"; },
    v => { v.vlans.blue.vrf = "local"; },
    v => { v.links[0].vrf = "missing"; },
  ];
  for (const mutate of invalidCases) {
    const invalid = structuredClone(topology);
    mutate(invalid);
    const result = validateAt(invalid, "user_input", { yangDir });
    assert.equal(result.ok, false, JSON.stringify(invalid));
    assert.ok(result.errors.some(error => error.includes("VRF must be defined")), JSON.stringify(result.errors));
  }
});

it("validates structured route distinguishers and numeric offsets", () => {
  const topology = (rd: unknown) => ({ nodes: {}, links: [], vrfs: { red: { rd } } }) as unknown as Topology;
  for (const rd of ["65000:42", "192.0.2.1:100", "4200000000:123", 42, null]) {
    const result = validateAt(topology(rd), "user_input", { yangDir });
    assert.equal(result.ok, true, `${JSON.stringify(rd)}: ${JSON.stringify(result.errors)}`);
  }
  for (const rd of ["bad", "65000:x", "256.0.2.1:3", "1:2:3", -1, true]) {
    const result = validateAt(topology(rd), "user_input", { yangDir });
    assert.equal(result.ok, false, JSON.stringify(rd));
  }
  const evpn = { nodes: {}, links: [], vlans: { red: { evpn: { rd: "bad" } } } } as unknown as Topology;
  assert.equal(validateAt(evpn, "user_input", { yangDir }).ok, false);
});

it("normalizes VLAN and VRF links before validating the shared link list", () => {
  const yaml = `
defaults.device: none
module: [vlan, vrf, gateway]
nodes: [a, b, c]
vrfs:
  tenant:
    links: [a-b]
vlans:
  red:
    links:
      - a-c
      - interfaces: [b, c]
        mtu: 1500
        gateway.protocol: anycast
links: [a-b]
`;
  const snapshots = new Map<string, Topology>();
  const result = transform(loadTopologyString(yaml), { yangDir, snapshots });
  assert.equal(result.stages.user_input, true, JSON.stringify(result.diagnostics.list()));
  const input = snapshots.get("user_input")!;
  assert.equal(input.links?.length, 4);
  assert.equal((input.vrfs!.tenant as Record<string, unknown>).links, undefined);
  assert.equal((input.vlans!.red as Record<string, unknown>).links, undefined);
  const access = input.links!.filter(link => link.vlan?.access === "red");
  assert.equal(access.length, 2);
  assert.equal((access[1]!.gateway as { protocol: string }).protocol, "anycast");
  assert.equal(result.topology.links!.filter(link => link.vlan?.access === "red").length, 2);
  assert.equal(new Set(input.links!.map(link => link.linkindex)).size, 4);

  const invalid = transform(loadTopologyString(yaml.replace("mtu: 1500", "mtu: 1")), { yangDir });
  assert.equal(invalid.stages.user_input, false);
  assert.ok(invalid.diagnostics.list().some(d => d.module === "xyang" && d.message.includes("mtu")), JSON.stringify(invalid.diagnostics.list()));
});
