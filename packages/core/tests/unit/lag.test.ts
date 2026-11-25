import { it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";
import { loadDevices } from "../../src/devices/registry.js";
import type { JsonObject } from "../../src/types.js";

// Upstream Netlab integration cases, retained with their original contents.
for (const file of ["01-l3-lag", "02-lag-vlan-trunk", "03-l3-lag-passive", "04-lag-vlan-routed-trunk"]) {
  it(`transforms Netlab integration case ${file}`, () => {
    const input = loadTopologyString(readFileSync(`tests/fixtures/integration/lag/${file}.yml`, "utf8"));
    const { topology, diagnostics } = transform(input);
    assert.deepEqual(diagnostics.list().filter(d => d.severity === "error"), []);
    const dut = topology.nodes!.dut!;
    const aggregates = dut.interfaces!.filter(i => i.type === "lag");
    assert.ok(aggregates.length > 0);
    for (const bond of aggregates) {
      const members = dut.interfaces!.filter(i => (i.lag as JsonObject | undefined)?.parent === bond.ifname);
      assert.equal(members.length, 2);
      assert.ok(members.every(i => !i.ipv4 && !i.ipv6));
    }
  });
}

it("rejects multi-chassis LAGs without a peer group", () => {
  const input = loadTopologyString(`
defaults.device: frr
module: [lag]
nodes: [a, b, c]
links:
  - lag.members: [a-b, a-c]
`);
  const { diagnostics } = transform(input);
  assert.ok(diagnostics.list().some(d => d.module === "lag" && d.message.includes("MLAG")));
});

it("keeps LACP settings and preserves the VLAN trunk", () => {
  const input = loadTopologyString(`
defaults.device: frr
module: [lag, vlan]
nodes:
  a: { lag.lacp_mode: passive }
  b:
vlans: { red: {} }
links:
  - lag.members: [a-b, a-b]
    lag.lacp: slow
    vlan.trunk: [red]
`);
  const { topology, diagnostics } = transform(input);
  assert.deepEqual(diagnostics.list().filter(d => d.severity === "error"), []);
  const a = topology.nodes!.a!.interfaces!.find(i => i.type === "lag")!;
  const b = topology.nodes!.b!.interfaces!.find(i => i.type === "lag")!;
  assert.equal((a.lag as JsonObject).lacp, "slow");
  assert.equal((a.lag as JsonObject).lacp_mode, "passive");
  assert.equal((b.lag as JsonObject).lacp_mode, "active");
  assert.deepEqual((a.vlan as JsonObject).trunk, ["red"]);
});


for (const file of ["10-mlag", "11-mlag-anycast"]) {
  it(`transforms MLAG integration case ${file}`, () => {
    const input = loadTopologyString(readFileSync(`tests/fixtures/integration/lag/${file}.yml`, "utf8"));
    const { topology, diagnostics, stages } = transform(input);
    assert.equal(stages.user_input, true);
    assert.deepEqual(diagnostics.list().filter(d => d.severity === "error"), []);
    for (const [nodeName, peer] of [["dut_s1", "dut_s2"], ["dut_s2", "dut_s1"]]) {
      const interfaces = topology.nodes![nodeName!]!.interfaces!;
      const peerLink = interfaces.find(i => ((i.lag as JsonObject | undefined)?.mlag as JsonObject | undefined)?.peergroup === 1)!;
      assert.equal(peerLink.type, "p2p");
      assert.equal(peerLink.neighbors?.[0]?.node, peer);
      assert.equal(peerLink.ipv4, undefined);
      const bond = interfaces.find(i => i.type === "lag")!;
      assert.equal((bond.lag as JsonObject)._mlag, true);
      assert.deepEqual(bond.neighbors?.map(n => n.node), ["x1"]);
      assert.equal(interfaces.filter(i => (i.lag as JsonObject | undefined)?.parent === bond.ifname).length, 1);
    }
    const client = topology.nodes!.x1!.interfaces!;
    const bond = client.find(i => i.type === "lag")!;
    assert.equal(client.filter(i => (i.lag as JsonObject | undefined)?.parent === bond.ifname).length, 2);
    assert.deepEqual(new Set(bond.neighbors?.map(n => n.node)), new Set(["dut_s1", "dut_s2"]));
  });
}

it("resolves peer groups independent of link order and reserves explicit IDs", () => {
  const { topology, diagnostics } = transform(loadTopologyString(`
defaults.device: none
module: [lag, vlan]
nodes: [a, b, c, d, e, f]
vlans: { red: {} }
links:
  - lag.members: [c-a, c-b]
    vlan.access: red
  - lag.members: [a-b, a-b]
    lag.mlag.peergroup: true
  - lag.members: [d-e]
    lag.mlag.peergroup: 1
`));
  assert.deepEqual(diagnostics.list().filter(d => d.severity === "error"), []);
  const peerLinks = topology.nodes!.a!.interfaces!.filter(i => (i.lag as JsonObject | undefined)?.mlag);
  assert.equal(((peerLinks[0]!.lag as JsonObject).mlag as JsonObject).peergroup, 2);
  assert.equal(topology.nodes!.a!.interfaces!.find(i => i.type === "lag")!.neighbors?.[0]?.node, "c");
  assert.equal(topology.nodes!.a!.interfaces!.filter(i => i.type === "p2p").length, 3);
});

for (const [file, expectedEsi, expectedLacp] of [
  ["01-esi-lag", "00:11:22:33:44:55:66:77:88:99", "02:00:01:00:01:00"],
  ["02-esi-lag-auto-id", "00:02:00:00:00:00:01:00:00:00", "02:00:00:00:00:01"],
]) {
  it(`transforms ESI-LAG integration case ${file}`, () => {
    const input = loadTopologyString(readFileSync(`tests/fixtures/integration/evpn.multihoming/${file}.yml`, "utf8"));
    const { topology, diagnostics, stages } = transform(input);
    assert.equal(stages.user_input, true);
    assert.deepEqual(diagnostics.list().filter(d => d.severity === "error"), []);
    for (const nodeName of ["dut_s1", "dut_s2"]) {
      const interfaces = topology.nodes![nodeName]!.interfaces!;
      const bond = interfaces.find(i => i.type === "lag")!;
      const evpn = bond.evpn as JsonObject;
      assert.equal((evpn._esi as JsonObject).id, expectedEsi);
      assert.equal((bond.lag as JsonObject).lacp_system_id, expectedLacp);
      assert.equal((bond.lag as JsonObject)._mlag, undefined);
      assert.deepEqual(bond.neighbors?.map(n => n.node), ["x1"]);
      const member = interfaces.find(i => (i.lag as JsonObject | undefined)?.parent === bond.ifname)!;
      assert.equal((member.evpn as JsonObject | undefined)?.es, undefined);
    }
    const client = topology.nodes!.x1!.interfaces!;
    const bond = client.find(i => i.type === "lag")!;
    assert.equal(client.filter(i => (i.lag as JsonObject | undefined)?.parent === bond.ifname).length, 2);
  });
}

it("rejects ESI-LAG with mismatched LACP identifiers", () => {
  const { diagnostics } = transform(loadTopologyString(`
defaults.device: none
plugin: [evpn.multihoming]
module: [lag, evpn, vlan]
nodes: [a, b, c]
evpn.ethernet_segments.seg.id: "00:11:22:33:44:55:66:77:88:99"
links:
  - lag.members:
      - a: { evpn.es: seg, lag.lacp_system_id: 1 }
        c:
      - b: { evpn.es: seg, lag.lacp_system_id: 2 }
        c:
`));
  assert.ok(diagnostics.list().some(d => d.severity === "error" && d.message.includes("Mismatched LACP")));
});

// Upstream Netlab mlag.vtep integration cases, retained with their original contents.
// The shared VTEP is part of the lag module here; the plugin entry is ignored.
for (const [file, shared, loopbacks] of [
  ["01-vxlan-bridging", "10.12.34.1", ["10.12.34.10/32", "10.12.34.20/32"]],
  ["02-evpn-vxlan-bridging", "10.101.101.1", undefined],
  ["03-evpn-vxlan-symm-irb", "10.101.101.1", undefined],
] as const) {
  it(`transforms mlag.vtep integration case ${file}`, () => {
    const input = loadTopologyString(readFileSync(`tests/fixtures/integration/mlag.vtep/${file}.yml`, "utf8"));
    const { topology, diagnostics, stages } = transform(input);
    assert.equal(stages.user_input, true, JSON.stringify(diagnostics.list()));
    assert.deepEqual(diagnostics.list().filter(d => d.severity === "error"), []);
    // Link groups (mlag/edge/core) are flattened, so the MLAG pair and core links exist.
    assert.equal(topology.links!.filter(l => ((l.lag as JsonObject | undefined)?.mlag as JsonObject | undefined)?.peergroup === 1).length, 1);
    for (const [i, nodeName] of ["dut_a", "dut_b"].entries()) {
      const node = topology.nodes![nodeName]!;
      const vxlan = node.vxlan as JsonObject;
      const vtep = node.interfaces!.filter(intf => intf.type === "loopback" && (intf.vxlan as JsonObject | undefined)?.vtep === true);
      assert.equal(vtep.length, 1);
      assert.equal(vtep[0]!.ipv4, `${shared}/32`);
      assert.ok(vtep[0]!.ospf, "shared VTEP is announced in the IGP");
      assert.equal(vxlan._shared_vtep, shared);
      assert.equal(vxlan.vtep, shared);
      assert.equal(vxlan.vtep_interface, vtep[0]!.ifname);
      if (loopbacks) assert.equal(node.loopback!.ipv4, loopbacks[i]);
      assert.deepEqual(new Set(node.interfaces!.find(intf => intf.type === "lag")!.neighbors!.map(n => n.node)).size, 1);
    }
    const xs = topology.nodes!.xs!;
    assert.equal((xs.vxlan as JsonObject)._shared_vtep, undefined);
    if (file.startsWith("01")) {
      // Static flooding: the remote VTEP sees the pair as one anycast VTEP, listed once.
      for (const vlan of ["red", "blue"]) {
        assert.deepEqual(((xs.vlans as Record<string, JsonObject>)[vlan]!).vtep_list, [shared]);
        assert.deepEqual(((topology.nodes!.dut_a!.vlans as Record<string, JsonObject>)[vlan]!).vtep_list, [(xs.vxlan as JsonObject).vtep]);
      }
    }
  });
}

const loopbackTopology = (nodeB = "b:", extra = "") => loadTopologyString(`
defaults.device: frr
module: [lag, vlan, vxlan, ospf]
vlans: { red: {} }
nodes:
  a:
  ${nodeB}
  c:
links:
  - lag: { members: [a-b], mlag.peergroup: true }
  - lag.members: [c-a, c-b]
    vlan.access: red
${extra}`);

it("allocates the shared MLAG VTEP from mlag_vtep or the peer's loopback pool", () => {
  const custom = transform(loopbackTopology(undefined, "addressing.mlag_vtep.ipv4: 10.99.99.0/24"));
  assert.deepEqual(custom.diagnostics.list().filter(d => d.severity === "error"), []);
  assert.equal((custom.topology.nodes!.a!.vxlan as JsonObject).vtep, "10.99.99.1");
  assert.equal((custom.topology.nodes!.b!.vxlan as JsonObject).vtep, "10.99.99.1");
  // As in mlag.vtep/01: node ids keep the per-node loopbacks clear of the shared one.
  const pool = transform(loopbackTopology("b: { id: 20 }", `addressing.lb: { ipv4: 10.42.0.0/24, prefix: 32 }
nodes.a.id: 10
groups:
  pair:
    members: [a, b]
    loopback.pool: lb`));
  assert.equal(pool.stages.user_input, true);
  assert.equal((pool.topology.nodes!.a!.vxlan as JsonObject).vtep, "10.42.0.1");
  assert.equal(pool.topology.nodes!.a!.loopback!.ipv4, "10.42.0.10/32");
  assert.equal(pool.topology.nodes!.b!.loopback!.ipv4, "10.42.0.20/32");
});

it("does not add a shared VTEP without VXLAN or when disabled on a node", () => {
  const noVxlan = transform(loadTopologyString(readFileSync("tests/fixtures/integration/lag/10-mlag.yml", "utf8")));
  assert.ok(!noVxlan.topology.links!.some(l => (l.vxlan as JsonObject | undefined)?.vtep));
  const disabled = transform(loopbackTopology("b: { lag.mlag.vtep: false }"));
  assert.equal(disabled.stages.user_input, true);
  assert.deepEqual(disabled.diagnostics.list().filter(d => d.severity === "error"), []);
  assert.ok((disabled.topology.nodes!.a!.vxlan as JsonObject)._shared_vtep);
  assert.equal((disabled.topology.nodes!.b!.vxlan as JsonObject)._shared_vtep, undefined);
  assert.equal((disabled.topology.nodes!.b!.vxlan as JsonObject).vtep, disabled.topology.nodes!.b!.loopback!.ipv4!.split("/")[0]);
});

it("sources EVPN VXLAN from the unique loopback on devices that support it", () => {
  const frr = loadDevices().frr!;
  const saved = frr.features;
  frr.features = { ...(saved ?? {}), mlag_vtep: { evpn: { vtep_source_loopback: true } } };
  try {
    const { topology, diagnostics } = transform(loadTopologyString(readFileSync("tests/fixtures/integration/mlag.vtep/02-evpn-vxlan-bridging.yml", "utf8")));
    assert.deepEqual(diagnostics.list().filter(d => d.severity === "error"), []);
    for (const nodeName of ["dut_a", "dut_b"]) {
      const node = topology.nodes![nodeName]!;
      const vxlan = node.vxlan as JsonObject;
      assert.equal(vxlan._shared_vtep, "10.101.101.1");
      assert.equal(vxlan.vtep, node.loopback!.ipv4!.split("/")[0]);
      assert.equal(vxlan.vtep_interface, node.loopback!.ifname);
    }
  } finally {
    frr.features = saved;
  }
});
