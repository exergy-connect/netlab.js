import type { JsonObject, Topology } from "../types.js";
import { INTERNAL_NS } from "../types.js";

/** Strip pipeline-only keys for Python-compatible export. */
export function cleanupTopology(topology: Topology): Topology {
  delete topology.pools;
  delete topology.Plugin;
  delete topology.stage;
  delete topology[`${INTERNAL_NS}:_Providers`];

  for (const node of Object.values(topology.nodes ?? {})) {
    stripInternalKeys(node as JsonObject);
    for (const intf of node.interfaces ?? []) stripInternalKeys(intf as JsonObject);
    const vrfs = node.vrfs as Record<string, JsonObject> | undefined;
    if (vrfs) {
      for (const v of Object.values(vrfs)) stripInternalKeys(v);
    }
  }
  for (const link of topology.links ?? []) {
    stripInternalKeys(link as JsonObject);
  }
  return topology;
}

function stripInternalKeys(obj: JsonObject): void {
  for (const key of Object.keys(obj)) {
    if (key.startsWith(`${INTERNAL_NS}:`)) delete obj[key];
  }
}

/** Export a deep clone with cleanup applied (does not mutate original if clone first). */
export function exportTopology(topology: Topology): Topology {
  const copy = structuredClone(topology);
  return cleanupTopology(copy);
}
