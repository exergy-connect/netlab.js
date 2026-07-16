import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadTopologyFile } from "../../src/load/load.js";
import { transform, transformAndExport } from "../../src/transform/orchestrator.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../");
const yangDir = path.join(root, "yang");
const fixturesDir = path.join(root, "tests/fixtures");

describe("compatibility fixtures", () => {
  it("transforms none/clab fixtures without fatal structural failures", () => {
    const files = fs.readdirSync(fixturesDir).filter((f) => f.endsWith(".yml"));
    assert.ok(files.length > 0);
    for (const file of files) {
      const topo = loadTopologyFile(path.join(fixturesDir, file));
      // Enforce scope
      assert.equal(topo.provider ?? "clab", "clab");
      const { topology, diagnostics } = transform(topo, { yangDir, validate: false });
      assert.ok(topology.nodes);
      assert.ok(Array.isArray(topology.links));
      const exported = transformAndExport(structuredClone(loadTopologyFile(path.join(fixturesDir, file))), {
        yangDir,
        validate: false,
      }).topology;
      assert.equal(exported.stage, undefined);
      assert.ok(!JSON.stringify(exported).includes("netlab-internal:"));
      void diagnostics;
    }
  });
});
