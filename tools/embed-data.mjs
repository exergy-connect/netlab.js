#!/usr/bin/env node
/** Generate native TypeScript objects from the vendored YAML defaults.
 * Usage: node tools/embed-data.mjs
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { load } from "js-yaml";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function collectYml(relDir) {
  const dir = join(root, relDir);
  if (!existsSync(dir)) return {};
  return Object.fromEntries(readdirSync(dir)
    .filter((f) => f.endsWith(".yml"))
    .sort()
    .map((f) => {
      const value = load(readFileSync(join(dir, f), "utf8"));
      if (!value || typeof value !== "object" || Array.isArray(value) || !isDeepStrictEqual(value, JSON.parse(JSON.stringify(value)))) {
        throw new Error(`${relDir}/${f} must contain a JSON-compatible object`);
      }
      return [f.replace(/\.yml$/, ""), value];
    }));
}

function writeTs(outFile, parts) {
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, 'import type { JsonObject } from "../types.js";\n\n' + parts.join("\n") + "\n");
  console.log(`Wrote ${outFile}`);
}

function mapBlock(comment, exportName, entries) {
  return `/** Auto-generated from ${comment} — do not hand-edit. */\nexport const ${exportName}: Record<string, JsonObject> = ${JSON.stringify(entries, null, 2)};\n`;
}

writeTs(join(root, "packages/core/src/devices/embedded-data.ts"), [
  mapBlock("data/devices/*.yml", "DEVICE_DATA", collectYml("data/devices")),
  mapBlock("data/daemons/*.yml", "DAEMON_DATA", collectYml("data/daemons")),
]);
writeTs(join(root, "packages/core/src/modules/embedded-data.ts"), [
  mapBlock("data/modules/*.yml", "MODULE_DATA", collectYml("data/modules")),
]);
writeTs(join(root, "packages/core/src/load/embedded-data.ts"), [
  mapBlock("data/defaults/*.yml", "DEFAULTS_DATA", collectYml("data/defaults")),
]);
