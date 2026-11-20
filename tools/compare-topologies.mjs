#!/usr/bin/env node
// Compare selected topology fields after normalizing export shapes.
import { readFileSync, writeFileSync } from "node:fs";

const [pythonFile, jsFile, pythonNormalized, jsNormalized] = process.argv.slice(2);
if (!pythonFile || !jsFile || !pythonNormalized || !jsNormalized) {
  throw new Error("Usage: node tools/compare-topologies.mjs netlab.json netlab-js.json netlab-normalized.json netlab-js-normalized.json");
}
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])]));
  }
  return value;
}
function normalize(file) {
  const raw = JSON.parse(readFileSync(file, "utf8"));
  const topology = raw.topology ?? raw;
  if (!topology || typeof topology !== "object" || Array.isArray(topology)) throw new Error(`Invalid topology in ${file}`);
  const nodes = topology.nodes;
  if (Array.isArray(nodes)) {
    topology.nodes = Object.fromEntries(nodes.map((node) => {
      if (!node || typeof node.name !== "string") throw new Error(`Node without a name in ${file}`);
      return [node.name, node];
    }));
    if (Object.keys(topology.nodes).length !== nodes.length) throw new Error(`Duplicate node name in ${file}`);
  }
  const selected = Object.fromEntries(
    ["nodes", "links", "vlans", "vrfs"]
      .filter((key) => Object.hasOwn(topology, key))
      .map((key) => [key, topology[key]]),
  );
  return JSON.stringify(canonical(selected), null, 2) + "\n";
}
writeFileSync(pythonNormalized, normalize(pythonFile));
writeFileSync(jsNormalized, normalize(jsFile));
