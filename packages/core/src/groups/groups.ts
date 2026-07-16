import type { Group, JsonObject, Topology } from "../types.js";
import { deepMerge } from "../data/merge.js";

/** Initialize groups and copy group device/module/node_data onto member nodes. */
export function initGroups(topology: Topology): void {
  if (!topology.groups) topology.groups = {};
  // Ensure dict form
  if (Array.isArray(topology.groups)) {
    const dict: Record<string, Group> = {};
    for (const g of topology.groups as Group[]) {
      if (g.name) dict[String(g.name)] = g;
    }
    topology.groups = dict;
  }
}

export function copyGroupData(topology: Topology): void {
  const groups = topology.groups ?? {};
  const nodes = topology.nodes ?? {};

  for (const [, g] of Object.entries(groups)) {
    const members = g.members ?? [];
    for (const m of members) {
      const node = nodes[m];
      if (!node) continue;
      if (g.device && !node.device) node.device = g.device;
      if (Array.isArray(g.module)) {
        const existing = new Set(node.module ?? []);
        for (const mod of g.module) existing.add(mod);
        node.module = [...existing];
      }
      if (g.node_data && typeof g.node_data === "object") {
        const merged = deepMerge(g.node_data as JsonObject, node as JsonObject);
        Object.assign(node, merged);
      }
    }
  }
}
