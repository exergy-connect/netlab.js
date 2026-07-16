#!/usr/bin/env node
/**
 * Build the lab viewer for GitHub Pages and sync the output into /docs.
 *
 * Usage:
 *   VITE_BASE_PATH=/netlab.js/ npm run build:pages
 */
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "apps/lab-viewer/dist");
const docs = join(root, "docs");
const base = process.env.VITE_BASE_PATH || "/netlab.js/";

const build = spawnSync(
  "npm",
  ["run", "build", "-w", "@exergy-connect/netlab-lab-viewer"],
  {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, VITE_BASE_PATH: base },
  },
);

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

rmSync(docs, { recursive: true, force: true });
mkdirSync(docs, { recursive: true });
cpSync(dist, docs, { recursive: true });
writeFileSync(join(docs, ".nojekyll"), "");
console.log(`Synced lab viewer to ${docs} (base=${base})`);
