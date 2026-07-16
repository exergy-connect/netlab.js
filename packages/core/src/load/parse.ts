import yaml from "js-yaml";
import type { JsonObject, Topology } from "../types.js";
import { deepMerge } from "../data/merge.js";
import { systemDefaults } from "./defaults.js";

export type LoadOptions = {
  defaults?: JsonObject;
  name?: string;
};

export function parseTopologyText(text: string): Topology {
  const data = yaml.load(text);
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Topology must be a YAML/JSON object");
  }
  return data as Topology;
}

export function loadTopologyString(text: string, options: LoadOptions = {}): Topology {
  const raw = parseTopologyText(text);
  return applyDefaults(raw, options);
}

export function applyDefaults(topology: Topology, options: LoadOptions = {}): Topology {
  const baseDefaults = deepMerge(systemDefaults(), options.defaults ?? {});
  const topoDefaults = (topology.defaults as JsonObject) ?? {};
  topology.defaults = deepMerge(baseDefaults, topoDefaults);

  if (!topology.provider) topology.provider = "clab";
  if (!topology.name) topology.name = options.name ?? "topology";

  const defAddr = (topology.defaults.addressing as JsonObject) ?? {};
  topology.addressing = deepMerge(defAddr, (topology.addressing as JsonObject) ?? {});

  return topology;
}
