import fs from "node:fs";
import type { Topology } from "../types.js";
import { applyDefaults, loadTopologyString, parseTopologyText, type LoadOptions } from "./parse.js";

export type { LoadOptions };
export { parseTopologyText, loadTopologyString, applyDefaults };

export function loadTopologyFile(filePath: string, options: LoadOptions = {}): Topology {
  const text = fs.readFileSync(filePath, "utf8");
  return loadTopologyString(text, options);
}
