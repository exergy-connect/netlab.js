import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTopologyFile, transformAndExport, exportMachineTopology } from "../packages/core/dist/index.js";

try {
  const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
  const input = process.env.NETLAB_INPUT;
  const output = process.env.NETLAB_OUTPUT || "topology.json";
  if (!input) throw new Error("The input topology path is required");
  const inputPath = resolve(workspace, input);
  const outputPath = resolve(workspace, output);
  if (/[\r\n]/.test(outputPath)) throw new Error("Output path cannot contain a newline");
  if (inputPath === outputPath) throw new Error("Input and output paths must be different");

  const yangDir = fileURLToPath(new URL("../yang/", import.meta.url));
  const result = transformAndExport(loadTopologyFile(inputPath), { validate: true, yangDir });
  for (const diagnostic of result.diagnostics.list()) {
    console.error(`${diagnostic.severity}: ${diagnostic.message}`);
  }
  if (result.diagnostics.hasErrors() || result.stages.user_input !== true) {
    throw new Error("Topology validation or transformation failed");
  }
  const json = JSON.stringify(exportMachineTopology(result.topology), null, 2);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${json}\n`);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `path=${outputPath}\n`);
  }
  console.log(`Wrote ${outputPath}`);
} catch (error) {
  console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
