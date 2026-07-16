#!/usr/bin/env node
/**
 * Embed data/devices/*.yml and data/modules/*.yml as TypeScript string maps.
 *
 * Usage: node tools/embed-data.mjs
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function embedDir(relDir, outFile, exportName) {
  const dir = join(root, relDir);
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".yml"))
    .sort();
  const entries = files.map((f) => {
    const name = f.replace(/\.yml$/, "");
    const text = readFileSync(join(dir, f), "utf8");
    return `  ${JSON.stringify(name)}: ${JSON.stringify(text)},`;
  });
  mkdirSync(dirname(outFile), { recursive: true });
  const body = [
    `/** Auto-generated from ${relDir}/*.yml — do not hand-edit. */`,
    `export const ${exportName}: Record<string, string> = {`,
    ...entries,
    `};`,
    ``,
  ].join("\n");
  writeFileSync(outFile, body);
  console.log(`Wrote ${outFile} (${files.length} files)`);
}

embedDir(
  "data/devices",
  join(root, "packages/core/src/devices/embedded-yaml.ts"),
  "DEVICE_YAML",
);
embedDir(
  "data/modules",
  join(root, "packages/core/src/modules/embedded-yaml.ts"),
  "MODULE_YAML",
);
