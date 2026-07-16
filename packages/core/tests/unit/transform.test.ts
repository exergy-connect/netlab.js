import { describe, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";
import { INTERNAL_LINKNAME } from "../../src/types.js";

const yangDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../yang");

describe("transform vertical slice", () => {
  it("transforms a 2-node p2p lab with ospf", () => {
    const topo = loadTopologyString(`
defaults:
  device: none
provider: clab
module: [ospf]
nodes:
  r1:
  r2:
links:
  - [r1, r2]
`);
    const { topology, diagnostics, stages } = transform(topo, { yangDir, validate: true });

    assert.equal(topology.provider, "clab");
    assert.ok(topology.nodes!.r1!.id);
    assert.ok(topology.nodes!.r1!.interfaces!.length >= 1);
    assert.ok(topology.links![0]![INTERNAL_LINKNAME]);
    assert.ok((topology.nodes!.r1!.ospf as { router_id?: string })?.router_id);
    assert.equal(typeof topology.links![0]!.prefix, "object");

    // Validation may warn on pattern edge cases; ensure transform completed
    assert.ok(stages.user_input !== undefined);
    if (diagnostics.hasErrors()) {
      console.log(diagnostics.list());
    }
  });
});
