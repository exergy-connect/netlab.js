import { it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { YangParser, YangValidator } from "@exergy-connect/xyang";
import { loadTopologyString } from "../../src/load/load.js";
import { exportMachineTopology } from "../../src/transform/machine-export.js";
import { transformAndExport } from "../../src/transform/orchestrator.js";

const yangDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../yang");

it("models the normalized core graph and rejects unsupported devices", () => {
  const parser = new YangParser({ include_path: [yangDir], expand_uses: true });
  const validator = new YangValidator(parser.parseFile(path.join(yangDir, "netlab.js.yang")));
  const result = transformAndExport(loadTopologyString(`
defaults.device: frr
nodes: { r1:, r2: }
links: [[r1, r2]]
`), { yangDir });
  assert.equal(result.diagnostics.hasErrors(), false);
  const output = exportMachineTopology(result.topology);
  assert.deepEqual(output.topology.nodes.map(node => node.name), ["r1", "r2"]);
  assert.ok(result.topology.nodes?.r1);
  const valid = validator.validate(output);
  assert.equal(valid.isValid, true, valid.errors.join("\n"));
  const invalid = structuredClone(output);
  invalid.topology.nodes[0]!.device = "unsupported";
  assert.equal(validator.validate(invalid).isValid, false);
});
