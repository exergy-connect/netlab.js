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

it("reports unsupported multi-chassis LAGs instead of silently building them", () => {
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
