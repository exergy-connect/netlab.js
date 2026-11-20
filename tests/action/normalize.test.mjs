import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const script = resolve(process.env.NETLAB_ACTION_SCRIPT || "tools/normalize-topology.mjs");
test("normalizes a topology and rejects invalid input", () => {
  const dir = mkdtempSync(join(tmpdir(), "netlab-action-"));
  try {
    const run = (input) => spawnSync(process.execPath, [script], {
      encoding: "utf8",
      env: { ...process.env, GITHUB_WORKSPACE: dir, GITHUB_OUTPUT: join(dir, "outputs"), NETLAB_INPUT: input, NETLAB_OUTPUT: "out/topology.json" },
    });
    writeFileSync(join(dir, "valid.yml"), "defaults.device: frr\nnodes: { r1: }\n");
    const valid = run("valid.yml");
    assert.equal(valid.status, 0, valid.stderr);
    const result = JSON.parse(readFileSync(join(dir, "out/topology.json"), "utf8"));
    assert.ok(Array.isArray(result.topology.nodes));
    assert.equal(result.topology.nodes[0].name, "r1");
    assert.match(readFileSync(join(dir, "outputs"), "utf8"), /path=.*out\/topology\.json/);
    rmSync(join(dir, "out"), { recursive: true });
    writeFileSync(join(dir, "invalid.yml"), "defaults.device: frr\nnodes: { r1: }\nmodule: [unknown_module]\n");
    const invalid = run("invalid.yml");
    assert.notEqual(invalid.status, 0);
    assert.throws(() => readFileSync(join(dir, "out/topology.json")));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
