import type { JsonObject, Node, Topology } from "../types.js";
import { exportTopology } from "./cleanup.js";

/** Machine export rooted at the YANG topology container. */
export type MachineTopology = { topology: Omit<Topology, "nodes"> & { nodes: Node[] } };

/**
 * Produce a machine-oriented export without mutating the runtime topology.
 * Other attributes are preserved until their output representations are modeled.
 */
export function exportMachineTopology(topology: Topology): MachineTopology {
  const copy = exportTopology(topology);
  const nodes = Object.entries(copy.nodes ?? {}).map(([name, node]) => ({ ...node, name }));
  const result: JsonObject = { ...copy, nodes, links: copy.links ?? [] };
  return { topology: result as MachineTopology["topology"] };
}
