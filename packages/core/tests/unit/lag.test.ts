import { it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";
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
