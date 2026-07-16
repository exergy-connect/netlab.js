#!/usr/bin/env node
/**
 * Embed data/devices/*.yml, data/daemons/*.yml, and data/modules/*.yml
 * as TypeScript string maps.
 *
 * Usage: node tools/embed-data.mjs
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function collectYml(relDir) {
  const dir = join(root, relDir);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".yml"))
    .sort()
    .map((f) => {
      const name = f.replace(/\.yml$/, "");
      const text = readFileSync(join(dir, f), "utf8");
      return `  ${JSON.stringify(name)}: ${JSON.stringify(text)},`;
    });
}

function writeTs(outFile, parts) {
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, parts.join("\n") + "\n");
  console.log(`Wrote ${outFile}`);
}

function mapBlock(comment, exportName, entries) {
  return [
    `/** Auto-generated from ${comment} — do not hand-edit. */`,
    `export const ${exportName}: Record<string, string> = {`,
    ...entries,
    `};`,
    ``,
  ].join("\n");
}

writeTs(join(root, "packages/core/src/devices/embedded-yaml.ts"), [
  mapBlock("data/devices/*.yml", "DEVICE_YAML", collectYml("data/devices")),
  mapBlock("data/daemons/*.yml", "DAEMON_YAML", collectYml("data/daemons")),
]);

writeTs(join(root, "packages/core/src/modules/embedded-yaml.ts"), [
  mapBlock("data/modules/*.yml", "MODULE_YAML", collectYml("data/modules")),
]);
