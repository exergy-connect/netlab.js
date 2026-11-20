import { it } from "node:test";
import assert from "node:assert/strict";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";
import { validateAt } from "../../src/validate/validate-at.js";
import type { JsonObject } from "../../src/types.js";

it("enables OSPF BFD on addressed interfaces and respects endpoint overrides", () => {
  const result = transform(loadTopologyString(`
defaults.device: none
module: [ospf, bfd]
ospf.bfd.ipv4: true
bfd.min_tx: 100
nodes: [a, b, c]
links:
  - a-b
  - a:
      ospf.bfd: false
    c:
`));
  assert.equal(result.diagnostics.hasErrors(), false, JSON.stringify(result.diagnostics.list()));
  const a = result.topology.nodes!.a!;
  assert.equal((a.bfd as JsonObject).min_tx, 100);
  const active = a.interfaces!.find(intf => intf.neighbors?.some(n => n.node === "b"))!;
  const disabled = a.interfaces!.find(intf => intf.neighbors?.some(n => n.node === "c"))!;
  assert.deepEqual((active.ospf as JsonObject).bfd, { ipv4: true });
  assert.equal((disabled.ospf as JsonObject).bfd, undefined);
  const check = validateAt(result.topology, "transformed");
  assert.equal(check.ok, true, JSON.stringify(check.errors));
});

it("validates BFD timing ranges and boolean shorthand", () => {
  const yaml = `
defaults.device: none
module: [ospf, bfd]
ospf.bfd: true
nodes: [a, b]
links:
  - a:
      bfd: false
    b:
    bfd.min_tx: 0
`;
  const invalid = transform(loadTopologyString(yaml));
  assert.equal(invalid.stages.user_input, false);
  assert.ok(invalid.diagnostics.list().some(d => d.message.includes("min_tx")));
  const valid = transform(loadTopologyString(yaml.replace("min_tx: 0", "min_tx: 50")));
  assert.equal(valid.stages.user_input, true, JSON.stringify(valid.diagnostics.list()));
});
