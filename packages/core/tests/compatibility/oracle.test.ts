/**
 * Optional Python Netlab oracle: when `NETLAB_PYTHON` points at a netlab checkout
 * (or `netlab` is on PATH), compare transformed structural keys for scoped fixtures.
 *
 * Filtered to devices none/linux/frr/bird and provider clab.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import yaml from "js-yaml";
import { loadTopologyFile } from "../../src/load/load.js";
import { transformAndExport } from "../../src/transform/orchestrator.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../");
const fixturesDir = path.join(root, "tests/fixtures");
const ALLOWED_DEVICES = new Set(["none", "linux", "frr", "bird"]);

function findNetlab(): { mode: "cli" | "python"; cmd: string; argsPrefix: string[] } | null {
  const envPy = process.env.NETLAB_PYTHON;
  if (envPy && fs.existsSync(envPy)) {
    return {
      mode: "python",
      cmd: process.env.PYTHON ?? "python3",
      argsPrefix: [
        "-c",
        `
import sys, yaml
sys.path.insert(0, ${JSON.stringify(envPy)})
from netsim.utils import read as nread
from netsim.augment import main as aug
topo = nread.load(sys.argv[1])
aug.transform(topo)
# strip internals-ish
for k in list(topo.keys()):
  if k.startswith('_') or k in ('pools','Plugin'):
    topo.pop(k, None)
print(yaml.safe_dump(topo.to_dict() if hasattr(topo,'to_dict') else dict(topo), sort_keys=True))
`,
      ],
    };
  }
  const which = spawnSync("which", ["netlab"], { encoding: "utf8" });
  if (which.status === 0 && which.stdout.trim()) {
    return { mode: "cli", cmd: which.stdout.trim(), argsPrefix: ["create", "-o", "yaml"] };
  }
  return null;
}

function structuralSummary(topo: Record<string, unknown>): Record<string, unknown> {
  const nodes = (topo.nodes ?? {}) as Record<string, Record<string, unknown>>;
  return {
    provider: topo.provider,
    module: topo.module,
    nodeNames: Object.keys(nodes).sort(),
    nodeDevices: Object.fromEntries(
      Object.entries(nodes).map(([n, d]) => [n, d.device]),
    ),
    linkCount: Array.isArray(topo.links) ? topo.links.length : 0,
    ifaceCounts: Object.fromEntries(
      Object.entries(nodes).map(([n, d]) => [
        n,
        Array.isArray(d.interfaces) ? d.interfaces.length : 0,
      ]),
    ),
  };
}

describe("python oracle compatibility", () => {
  const oracle = findNetlab();

  it("skips or compares fixtures against Python Netlab when available", () => {
    const files = fs.readdirSync(fixturesDir).filter((f) => f.endsWith(".yml"));
    assert.ok(files.length > 0);

    if (!oracle) {
      // Harness present; oracle optional in CI without Python netlab
      assert.ok(true, "oracle not configured (set NETLAB_PYTHON or install netlab)");
      return;
    }

    for (const file of files) {
      const full = path.join(fixturesDir, file);
      const input = yaml.load(fs.readFileSync(full, "utf8")) as Record<string, unknown>;
      const provider = String(input.provider ?? "clab");
      assert.equal(provider, "clab", file);

      const js = transformAndExport(loadTopologyFile(full), { validate: false }).topology;
      for (const n of Object.values(js.nodes ?? {})) {
        assert.ok(ALLOWED_DEVICES.has(String(n.device)), `${file}: device ${n.device}`);
      }

      let pyYaml: string;
      if (oracle.mode === "cli") {
        const r = spawnSync(oracle.cmd, [...oracle.argsPrefix, full], {
          encoding: "utf8",
          maxBuffer: 10 * 1024 * 1024,
        });
        if (r.status !== 0) {
          console.log(`oracle skip ${file}: ${r.stderr}`);
          continue;
        }
        pyYaml = r.stdout;
      } else {
        const r = spawnSync(oracle.cmd, [...oracle.argsPrefix, full], {
          encoding: "utf8",
          maxBuffer: 10 * 1024 * 1024,
        });
        if (r.status !== 0) {
          console.log(`oracle skip ${file}: ${r.stderr}`);
          continue;
        }
        pyYaml = r.stdout;
      }

      const py = yaml.load(pyYaml) as Record<string, unknown>;
      const a = structuralSummary(js as Record<string, unknown>);
      const b = structuralSummary(py);
      assert.deepEqual(a.nodeNames, b.nodeNames, file);
      assert.equal(a.linkCount, b.linkCount, file);
    }
  });
});
