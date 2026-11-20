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
  it("creates routed VLAN subinterfaces on mixed trunks", () => {
    const { topology, diagnostics } = transform(loadTopologyString(`
defaults.device: frr
module: [vlan]
nodes: [s1, s2]
vlans:
  red: { mode: bridge }
  blue: { mode: route, id: 123 }
links:
  - s1:
    s2:
    vlan.trunk: [red, blue]
`));
    assert.equal(diagnostics.hasErrors(), false, JSON.stringify(diagnostics.list()));
    const a = topology.nodes!.s1!.interfaces!.find((i) => i.type === "vlan_member")!;
    const b = topology.nodes!.s2!.interfaces!.find((i) => i.type === "vlan_member")!;
    assert.equal(a.ifname, "eth1.123");
    assert.equal(a.parent_ifname, "eth1");
    assert.equal(a.vlan?.name, "blue");
    assert.equal(a.vlan?.access_id, 123);
    assert.equal(a.neighbors?.[0]?.ifname, b.ifname);
    assert.ok(typeof a.ipv4 === "string" && typeof b.ipv4 === "string" && a.ipv4 !== b.ipv4);
    const red = topology.nodes!.s1!.interfaces!.find((i) => i.ifname === "eth1.1000")!;
    assert.equal(red.vlan?.access, "red");
    assert.equal(red.parent_ifname, "eth1");
    assert.equal(red.neighbors?.[0]?.ifname, "eth1.1000");
    assert.ok(topology.nodes!.s1!.interfaces!.some((i) => i.type === "svi" && i.vlan?.name === "red"));
    assert.equal(topology.nodes!.s1!.interfaces!.some((i) => i.type === "svi" && i.vlan?.name === "blue"), false);
    assert.equal(topology.nodes!.s1!.interfaces!.find((i) => i.ifname === "eth1")?.ipv4, undefined);
  });

  it("builds eBGP sessions using interface local AS numbers alongside iBGP", () => {
    const { topology, diagnostics } = transform(loadTopologyString(`
defaults.device: frr
module: [bgp]
bgp.as: 65000
nodes:
  leaf:
  spine:
    bgp.rr: true
links:
  - leaf:
      bgp.local_as: 65201
    spine:
      bgp.local_as: 65100
`));
    assert.equal(diagnostics.hasErrors(), false, JSON.stringify(diagnostics.list()));
    assert.equal((topology.nodes!.leaf!.interfaces![0]!.bgp as { local_as?: number }).local_as, 65201);
    const leaf = topology.nodes!.leaf!.bgp!.neighbors as { type: string; name: string; as: number; local_as?: number; ifindex?: number }[];
    const spine = topology.nodes!.spine!.bgp!.neighbors as typeof leaf;
    assert.ok(leaf.some((n) => n.type === "ibgp" && n.name === "spine"));
    assert.deepEqual(leaf.filter((n) => n.type === "ebgp").map(({ name, as, local_as, ifindex }) => ({ name, as, local_as, ifindex })),
      [{ name: "spine", as: 65100, local_as: 65201, ifindex: 1 }]);
    assert.deepEqual(spine.filter((n) => n.type === "ebgp").map(({ name, as, local_as, ifindex }) => ({ name, as, local_as, ifindex })),
      [{ name: "leaf", as: 65201, local_as: 65100, ifindex: 1 }]);
  });

  it("normalizes numeric OSPF areas before validation and propagation", () => {
    const topo = loadTopologyString(`
defaults.device: none
module: [ospf]
ospf.area: 4294967295
nodes:
  r1:
    ospf.area: 1
  r2:
links:
  - r1:
    r2:
    ospf.area: 256
`);
    const { topology, diagnostics, stages } = transform(topo);
    assert.equal(diagnostics.hasErrors(), false);
    assert.ok(Object.values(stages).every(Boolean));
    assert.equal(topology.ospf?.area, "255.255.255.255");
    assert.equal(topology.nodes!.r1!.ospf?.area, "0.0.0.1");
    assert.equal(topology.links![0]!.ospf?.area, "0.0.1.0");
    assert.equal(topology.nodes!.r1!.interfaces![0]!.ospf?.area, "0.0.1.0");
  });

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
    assert.equal(red.id, 1000);
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

  it("expands vlans.*.links into access links with host addressing and SVIs", () => {
    const topo = loadTopologyString(`
defaults.device: none
provider: clab
groups:
  _auto_create: True
  hosts:
    members: [ h1, h2 ]
    device: linux
  switches:
    members: [ s1, s2 ]
    module: [ vlan, vxlan, ospf, bgp, evpn ]
  core:
    members: [ dut ]
    module: [ ospf, bgp, evpn ]
    bgp.rr: True
bgp.as: 65000
nodes:
  dut:
  s1:
  s2:
vlans:
  red:
    mode: bridge
    prefix:
      ipv4: 172.31.1.0/24
    links: [ s1-h1, s2-h2 ]
links:
  - s1:
    s2:
    mtu: 1600
  - s1:
    dut:
    mtu: 1600
  - s2:
    dut:
    mtu: 1600
`);
    const { topology, diagnostics } = transform(topo, { validate: false });
    assert.equal(diagnostics.hasErrors(), false);

    const red = (topology.vlans as Record<string, { id?: number; links?: unknown }>).red!;
    assert.equal(red.id, 1000);
    assert.equal(red.links, undefined);

    const accessLinks = (topology.links ?? []).filter(
      (l) => (l.vlan as { access?: string } | undefined)?.access === "red",
    );
    assert.equal(accessLinks.length, 2);
    for (const link of accessLinks) {
      assert.equal(link.type, "lan");
      assert.deepEqual(link.prefix, { ipv4: "172.31.1.0/24" });
    }

    const h1 = topology.nodes!.h1!;
    const h2 = topology.nodes!.h2!;
    assert.ok(h1.interfaces?.length);
    assert.ok(h2.interfaces?.length);
    assert.match(String(h1.interfaces![0]!.ipv4), /^172\.31\.1\.\d+\/24$/);
    assert.match(String(h2.interfaces![0]!.ipv4), /^172\.31\.1\.\d+\/24$/);

    const s1 = topology.nodes!.s1!;
    const access = s1.interfaces!.find((i) => (i.vlan as { access?: string })?.access === "red");
    assert.ok(access);
    // Bridge-mode access ports get no IP (disabled before addressing; stripped when SVI is built)
    assert.equal(access!.ipv4, undefined);
    assert.equal((access!.vlan as { access_id?: number }).access_id, 1000);

    const svi = s1.interfaces!.find((i) => i.type === "svi");
    assert.ok(svi);
    assert.equal(svi!.ifname, "Vlan1000");
    assert.equal((s1.vlans as Record<string, { mode?: string }>).red?.mode, "bridge");
  });
});

describe("MPLS EVPN bridging", () => {
  it("transforms grouped MPLS LDP nodes and retains EVPN VLANs without VXLAN", () => {
    const { topology, diagnostics } = transform(loadTopologyString(`
defaults.device: none
mpls.ldp: true
evpn.transport: mpls
evpn.vlans: [red, blue]
bgp.as: 65000
groups:
  _auto_create: true
  switches:
    members: [dut, s2]
    module: [vlan, mpls, ospf, bgp, evpn]
  core:
    members: [p]
    module: [ospf, mpls]
vlans:
  red: {mode: bridge}
  blue: {mode: bridge}
links: [dut-p, p-s2]
`));
    assert.equal(diagnostics.hasErrors(), false, JSON.stringify(diagnostics.list()));
    for (const name of ["dut", "s2", "p"]) {
      const node = topology.nodes![name]!;
      assert.ok(node.ldp);
      assert.ok(node.interfaces!.some((intf) => intf.ldp));
    }
    assert.deepEqual((topology.nodes!.dut!.evpn as {vlans: string[]}).vlans, ["red", "blue"]);
    assert.equal(topology.vxlan, undefined);
  });
});

describe("Netlab management MACs and BGP communities", () => {
  it("allocates MACs from the pool and applies device community mappings", () => {
    const { topology, diagnostics } = transform(loadTopologyString(`
defaults.device: frr
addressing.mgmt.mac: 'ca:fe:00:00:00:05'
module: [bgp]
bgp.as: 65000
nodes:
  r1: {id: 1}
  r2: {id: 256}
  r3:
    id: 3
    mgmt.mac: 'AA-BB-CC-DD-EE-FF'
`), { validate: false });
    assert.equal(diagnostics.hasErrors(), false, JSON.stringify(diagnostics.list()));
    assert.equal(topology.nodes!.r1!.mgmt!.mac, 'ca:fe:00:01:00:05');
    assert.equal(topology.nodes!.r2!.mgmt!.mac, 'ca:fe:00:00:01:05');
    assert.equal(topology.nodes!.r3!.mgmt!.mac, 'aa:bb:cc:dd:ee:ff');
    const community = topology.nodes!.r1!.bgp!.community as Record<string, string[]>;
    assert.deepEqual(community.ebgp, ['standard', 'large']);
    assert.deepEqual(community.ibgp, ['standard', 'large', 'extended']);
    assert.deepEqual(community.localas_ibgp, community.ibgp);
  });

  it("does not add FRR community mappings to devices without them", () => {
    const { topology, diagnostics } = transform(loadTopologyString(`
defaults.device: none
module: [bgp]
bgp.as: 65000
nodes: {r1:}
`));
    assert.equal(diagnostics.hasErrors(), false, JSON.stringify(diagnostics.list()));
    assert.deepEqual((topology.nodes!.r1!.bgp!.community as Record<string, string[]>).ebgp, ['standard']);
  });
});

describe("BGP AS lists, confederations and imports", () => {
  it("assigns AS membership and builds internal and external confederation sessions", () => {
    const result = transform(loadTopologyString(`
defaults.device: frr
module: [bgp]
bgp.as_list:
  65001: {members: [a]}
  65002: {members: [b]}
  65003: {members: [c]}
bgp.confederation:
  65000: {members: [65001, 65002]}
nodes: [a, b, c]
links: [a-b, b-c]
`));
    assert.equal(result.diagnostics.hasErrors(), false, JSON.stringify(result.diagnostics.list()));
    const nodes = result.topology.nodes!;
    assert.deepEqual((nodes.a!.bgp!.confederation as any), {as: 65000, peers: [65002]});
    const a = (nodes.a!.bgp!.neighbors as any[])[0];
    assert.deepEqual([a.name, a.as, a.type, a.next_hop_self], ["b", 65002, "confed_ebgp", "all"]);
    const b = nodes.b!.bgp!.neighbors as any[];
    assert.deepEqual(b.map(n => [n.name, n.as, n.type]), [["a", 65001, "confed_ebgp"], ["c", 65003, "ebgp"]]);
    const c = (nodes.c!.bgp!.neighbors as any[])[0];
    assert.deepEqual([c.name, c.as, c.type], ["b", 65000, "ebgp"]);
    assert.equal(nodes.c!.bgp!.confederation, undefined);
  });

  it("rejects conflicting AS membership and normalizes route imports", () => {
    const conflict = transform(loadTopologyString(`
defaults.device: frr
module: [bgp]
bgp.as_list:
  65001: {members: [a]}
  65002: {members: [a]}
nodes: [a]
`), {validate: false});
    assert.ok(conflict.diagnostics.list().some(d => d.message.includes("conflicting BGP AS membership")));
    const result = transform(loadTopologyString(`
defaults.device: frr
module: [bgp, ospf]
bgp.as: 65000
nodes:
  a:
    bgp.import: [ospf, connected]
  b:
links: [a-b]
`));
    assert.equal(result.diagnostics.hasErrors(), false, JSON.stringify(result.diagnostics.list()));
    assert.deepEqual(result.topology.nodes!.a!.bgp!.import, {ospf: {}, connected: {}});
  });
});

describe("BGP VRF route imports", () => {
  it("adds connected imports after global VRFs are assigned to nodes", () => {
    const result = transform(loadTopologyString(`
defaults.device: frr
module: [bgp, vrf]
bgp.as: 65000
vrfs:
  red:
    links: [r1-h1]
nodes:
  r1:
  h1: {device: linux, module: []}
`));
    assert.equal(result.diagnostics.hasErrors(), false, JSON.stringify(result.diagnostics.list()));
    const vrfs = result.topology.nodes!.r1!.vrfs as Record<string, any>;
    assert.deepEqual(vrfs.red.bgp.import, {connected: {auto: true}});
    assert.equal((result.topology.vrfs!.red as any).bgp, undefined);
  });

  it("honors explicit VRF imports and node overrides", () => {
    const result = transform(loadTopologyString(`
defaults.device: frr
module: [bgp, vrf]
bgp.as: 65000
vrfs:
  red:
    bgp.import: [connected]
    links: [r1-h1]
nodes:
  r1:
    vrfs:
      red:
        bgp.import:
          connected: false
          static: true
  h1: {device: linux, module: []}
`), {validate: false});
    assert.equal(result.diagnostics.hasErrors(), false, JSON.stringify(result.diagnostics.list()));
    const vrfs = result.topology.nodes!.r1!.vrfs as Record<string, any>;
    assert.deepEqual(vrfs.red.bgp.import, {static: {}});
  });

  it("reports explicit VRF imports when a device lacks VRF import support", () => {
    const result = transform(loadTopologyString(`
defaults.device: frr
module: [bgp, vrf]
bgp.as: 65000
vrfs:
  red:
    bgp.import: [connected]
    links: [r1-h1]
nodes:
  r1: {device: linux, module: [bgp, vrf]}
  h1: {device: linux, module: []}
`), {validate: false});
    assert.ok(result.diagnostics.list().some(d => d.message.includes("cannot import routes into BGP in VRF red")));
  });
});


it("does not create empty interface BGP data when no attributes are copied", () => {
  const { topology, diagnostics } = transform(loadTopologyString(`
defaults.device: frr
module: [bgp]
bgp.as: 65000
nodes: [r1, r2]
links: [r1-r2]
`));
  assert.equal(diagnostics.hasErrors(), false, JSON.stringify(diagnostics.list()));
  assert.equal(topology.nodes!.r1!.interfaces![0]!.bgp, undefined);
  assert.equal(topology.nodes!.r2!.interfaces![0]!.bgp, undefined);
});
