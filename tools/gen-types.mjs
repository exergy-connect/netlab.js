#!/usr/bin/env node
/**
 * Placeholder for YANG → TypeScript type generation.
 * Runtime types live in packages/core/src/types.ts; this tool documents the intent
 * to derive developer-facing types from yang/ once xYang codegen is wired.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const yangDir = path.join(root, "yang");
const out = path.join(root, "packages/core/src/generated/yang-modules.ts");

const modules = fs
  .readdirSync(yangDir, { recursive: true })
  .filter((f) => String(f).endsWith(".yang"))
  .map((f) => String(f));

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(
  out,
  `/** Generated module inventory — run: node tools/gen-types.mjs */\n` +
    `export const YANG_MODULES = ${JSON.stringify(modules, null, 2)} as const;\n`,
);
console.log(`Wrote ${out} (${modules.length} modules)`);
