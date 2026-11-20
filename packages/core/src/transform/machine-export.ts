import type { JsonObject, JsonValue, Node, Topology } from "../types.js";
import { exportTopology } from "./cleanup.js";

/** Machine export rooted at the YANG topology container. */
export type MachineTopology = { topology: Omit<Topology, "nodes" | "defaults"> & { nodes: Node[] } };

function sortKeys(value: JsonValue): JsonValue {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortKeys(value[key]!)]));
  }
  return value;
}

/**
 * Produce a machine-oriented export without mutating the runtime topology.
 * Other attributes are preserved until their output representations are modeled.
 */
export function exportMachineTopology(topology: Topology): MachineTopology {
  const copy = exportTopology(topology);
  delete copy.defaults;
  const nodes = Object.entries(copy.nodes ?? {}).map(([name, node]) => ({ ...node, name }));
  const result: JsonObject = { ...copy, nodes, links: copy.links ?? [] };
  return { topology: sortKeys(result) as MachineTopology["topology"] };
}
