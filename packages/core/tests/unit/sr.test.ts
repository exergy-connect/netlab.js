import { it } from "node:test";
import assert from "node:assert/strict";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";

it("transforms SR-MPLS on group members and computes node SIDs and label blocks", () => {
  const input = loadTopologyString(`
defaults.device: frr
groups:
  _auto_create: true
  core:
    members: [dut, s2, p]
    module: [isis, sr]
links: [dut-p, p-s2]
`);
  const { topology, diagnostics } = transform(input, { validate: false });
  assert.equal(diagnostics.list().filter(d => d.message.includes("Unknown module sr")).length, 0);
  for (const node of Object.values(topology.nodes!)) {
    const sr = node.sr as any;
    assert.deepEqual(sr.protocol, ["isis"]);
    assert.equal(sr.node_sid.ipv4, node.id);
    assert.equal(sr.srgb._end, 31999);
  }
});

it("reports SR protocols whose routing module is missing", () => {
  const input = loadTopologyString(`
defaults.device: frr
module: [sr]
nodes: [r1]
`);
  const { diagnostics } = transform(input, { validate: false });
  assert.ok(diagnostics.list().some(d => d.module === "sr" && d.message.includes("without isis")));
});
