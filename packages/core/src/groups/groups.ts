import type { Group, JsonObject, Node, Topology } from "../types.js";
import { deepMerge } from "../data/merge.js";
import { createNodeDict } from "../nodes/nodes.js";

function truthyFlag(v: unknown): boolean {
  return v === true || v === "true" || v === "True";
}

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

/**
 * Auto-create missing nodes from group members (Netlab `groups._auto_create`).
 *
 * Enabled when `groups._auto_create`, `defaults.groups._auto_create`, or a
 * per-group `_auto_create` flag is true. Skips members that name other groups.
 */
export function autoCreateGroupMembers(topology: Topology): void {
  const groups = topology.groups ?? {};
  const defaultsGroups = ((topology.defaults as JsonObject | undefined)?.groups ?? {}) as Record<
    string,
    unknown
  >;
  const defaultCreate =
    truthyFlag(groups._auto_create) || truthyFlag(defaultsGroups._auto_create);

  // Preserve list-form nodes; never wipe them to {}.
  if (!topology.nodes || typeof topology.nodes !== "object") {
    topology.nodes = {};
  } else if (Array.isArray(topology.nodes)) {
    topology.nodes = createNodeDict(topology.nodes);
  }
  const nodes = topology.nodes as Record<string, Node>;

  for (const [gname, gdata] of Object.entries(groups)) {
    if (gname.startsWith("_")) continue;
    if (!gdata || typeof gdata !== "object" || Array.isArray(gdata)) continue;

    const group = gdata as Group;
    const members = group.members;
    if (!Array.isArray(members) || members.length === 0) continue;
    if (!truthyFlag(group._auto_create) && !defaultCreate) continue;

    const objType = String(group.type ?? "node");
    if (objType !== "node") continue; // only node auto-create for now

    for (const member of members) {
      const name = String(member);
      if (name in groups || name in defaultsGroups) continue; // member is a group
      if (name in nodes) continue;
      nodes[name] = { name, interfaces: [] };
    }
  }
}

export function copyGroupData(topology: Topology): void {
  const groups = topology.groups ?? {};
  const nodes = topology.nodes ?? {};

  for (const [gname, g] of Object.entries(groups)) {
    if (gname.startsWith("_")) continue;
    if (!g || typeof g !== "object" || Array.isArray(g)) continue;
    const members = g.members ?? [];
    for (const m of members) {
      const node = nodes[m];
      if (!node) continue;
      if (g.device && !node.device) node.device = g.device;
      if (typeof g.provider === "string" && !node.provider) {
        node.provider = g.provider;
      }
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

/** Port of netsim.augment.groups.create_bgp_autogroups — groups.asNNNN.members. */
export function createBgpAutogroups(topology: Topology): void {
  if (!topology.groups) topology.groups = {};
  const groups = topology.groups;
  const globalAs = Number((topology.bgp as JsonObject | undefined)?.as);

  for (const [name, node] of Object.entries(topology.nodes ?? {})) {
    if (!(node.module ?? []).includes("bgp")) continue;
    const nodeAs = Number((node.bgp as JsonObject | undefined)?.as ?? globalAs);
    if (!Number.isFinite(nodeAs) || nodeAs <= 0) continue;
    const gname = `as${nodeAs}`;
    if (!groups[gname]) groups[gname] = { members: [] };
    const g = groups[gname]!;
    if (!Array.isArray(g.members)) g.members = [];
    if (!g.members.includes(name)) g.members.push(name);
  }
}
