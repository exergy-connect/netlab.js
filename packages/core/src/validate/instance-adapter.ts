import type { JsonObject, JsonValue, Link, Node, Topology } from "../types.js";
import { INTERNAL_LINKNAME, INTERNAL_NS } from "../types.js";

/**
 * Convert Netlab runtime shape (nodes as dict) into a YANG/RFC7951-ish instance
 * for xYang validation: nodes/groups/vlans/vrfs become keyed lists; internal
 * attributes stay as qualified names.
 */
export function toYangInstance(topology: Topology): JsonObject {
  const nodesDict = topology.nodes ?? {};
  const nodesList = Object.entries(nodesDict).map(([name, node]) => {
    const n: JsonObject = { ...(node as JsonObject), name: node.name ?? name };
    if (Array.isArray(n.interfaces)) {
      n.interfaces = (n.interfaces as JsonObject[]).map((intf) => {
        const copy = { ...intf };
        if (Array.isArray(copy.neighbors)) {
          // already list
        }
        return copy;
      });
    }
    dequalifyInternalKeys(n);
    return n;
  });

  const links = (topology.links ?? []).map((link, idx) => {
    const l: JsonObject = { ...(link as JsonObject) };
    if (l.linkindex === undefined) l.linkindex = idx + 1;
    // Runtime uses qualified internal names; map onto host-module leaves for xYang
    const qName = l[INTERNAL_LINKNAME];
    if (typeof qName === "string") {
      l._linkname = qName;
      delete l[INTERNAL_LINKNAME];
    } else if (typeof l._linkname === "string") {
      // already local
    }
    dequalifyInternalKeys(l);
    return l;
  });

  const groups = topology.groups
    ? Object.entries(topology.groups).map(([name, g]) => ({
        ...(g as JsonObject),
        name: (g as JsonObject).name ?? name,
      }))
    : undefined;

  const addressing = adaptAddressing(topology.addressing);

  const topoObj: JsonObject = {
    nodes: nodesList,
    links,
  };
  if (topology.stage !== undefined) topoObj.stage = topology.stage;
  if (topology.name !== undefined) topoObj.name = topology.name;
  if (topology.provider !== undefined) topoObj.provider = topology.provider;
  if (topology.module !== undefined) topoObj.module = topology.module;
  if (topology.defaults !== undefined) topoObj.defaults = topology.defaults;
  if (groups) topoObj.groups = groups;
  if (addressing) topoObj.addressing = addressing;
  if (topology.ospf) topoObj.ospf = topology.ospf;
  if (topology.bgp) topoObj.bgp = topology.bgp;
  if (topology.isis) topoObj.isis = topology.isis;
  if (topology.vlans) topoObj.vlans = dictToNamedList(topology.vlans);
  if (topology.vrfs) topoObj.vrfs = dictToNamedList(topology.vrfs);

  const instance: JsonObject = { topology: topoObj };

  // Topology-level internal providers
  const topo = instance.topology as JsonObject;
  if (Array.isArray(topology[`${INTERNAL_NS}:_Providers`])) {
    topo[`${INTERNAL_NS}:_Providers`] = topology[`${INTERNAL_NS}:_Providers`];
  }

  return instance;
}

function dictToNamedList(d: JsonValue): JsonObject[] {
  if (!d || typeof d !== "object" || Array.isArray(d)) return [];
  return Object.entries(d as JsonObject).map(([name, v]) => ({
    ...(typeof v === "object" && v && !Array.isArray(v) ? (v as JsonObject) : {}),
    name,
  }));
}

function adaptAddressing(addressing: JsonValue | undefined): JsonObject | undefined {
  if (!addressing || typeof addressing !== "object" || Array.isArray(addressing)) return undefined;
  const pools = Object.entries(addressing as JsonObject).map(([name, v]) => ({
    ...(typeof v === "object" && v && !Array.isArray(v) ? (v as JsonObject) : {}),
    name,
  }));
  return { pool: pools };
}

/** Map netlab-internal:_foo → _foo for host-module validation. */
function dequalifyInternalKeys(obj: JsonObject): void {
  const prefix = `${INTERNAL_NS}:`;
  for (const key of Object.keys(obj)) {
    if (key.startsWith(prefix)) {
      const local = key.slice(prefix.length);
      if (obj[local] === undefined) obj[local] = obj[key]!;
      delete obj[key];
    }
  }
}

/** Ensure runtime nodes remain a dict keyed by name. */
export function ensureNodesDict(topology: Topology): void {
  if (!topology.nodes) {
    topology.nodes = {};
    return;
  }
  if (Array.isArray(topology.nodes)) {
    const dict: Record<string, Node> = {};
    for (const n of topology.nodes as Node[]) {
      const name = n.name;
      if (typeof name === "string") dict[name] = n;
    }
    topology.nodes = dict;
  }
}

export function ensureLinksArray(topology: Topology): Link[] {
  if (!topology.links) topology.links = [];
  return topology.links;
}
