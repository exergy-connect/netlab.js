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
    adaptMpls(n);
    adaptGateway(n);
    adaptBgp(n);
    if (n.loopback === false) delete n.loopback;
    if (Array.isArray(n.interfaces)) {
      n.interfaces = (n.interfaces as JsonObject[]).map((intf) => {
        const copy = { ...intf };
        adaptMpls(copy, true);
        adaptGateway(copy);
        if (Array.isArray(copy.neighbors)) {
          // already list
        }
        return copy;
      });
    }
    if (n.vlans && typeof n.vlans === "object" && !Array.isArray(n.vlans)) {
      n.vlans = dictToNamedList(n.vlans);
    }
    if (n.vrfs && typeof n.vrfs === "object" && !Array.isArray(n.vrfs)) {
      n.vrfs = dictToNamedList(n.vrfs);
    }
    dequalifyInternalKeys(n);
    return n;
  });

  const links = (topology.links ?? []).map((link, idx) => {
    const l: JsonObject = { ...(link as JsonObject) };
    adaptMpls(l, true);
    adaptGateway(l);
    if (Array.isArray(l.interfaces)) {
      l.interfaces = (l.interfaces as JsonObject[]).map(intf => {
        const copy = { ...intf };
        adaptMpls(copy, true);
        adaptGateway(copy);
        return copy;
      });
    }
    if (l.ospf === false || l.ospf === true) delete l.ospf;
    if (l.linkindex === undefined) l.linkindex = idx + 1;
    // Keep the diagnostic link name in the internal module namespace.
    if (typeof l._linkname === "string" && l[INTERNAL_LINKNAME] === undefined) {
      l[INTERNAL_LINKNAME] = l._linkname;
    }
    delete l._linkname;
    return l;
  });

  const groups = topology.groups
    ? Object.entries(topology.groups).map(([name, g]) => {
        const group = { ...(g as JsonObject), name: (g as JsonObject).name ?? name };
        adaptMpls(group);
        adaptGateway(group);
        return group;
      })
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
  if (topology.defaults && typeof topology.defaults === "object" && !Array.isArray(topology.defaults)) {
    const device = (topology.defaults as JsonObject).device;
    if (device !== undefined) topoObj.defaults = { device };
  }
  if (groups) topoObj.groups = groups;
  if (addressing) topoObj.addressing = addressing;
  if (topology.mpls !== undefined) {
    topoObj.mpls = topology.mpls;
    adaptMpls(topoObj);
  }
  if (topology.lag !== undefined) topoObj.lag = topology.lag;
  if (topology.gateway !== undefined) {
    topoObj.gateway = topology.gateway;
    adaptGateway(topoObj);
  }
  if (topology.ospf) topoObj.ospf = topology.ospf;
  if (topology.bgp) {
    topoObj.bgp = topology.bgp;
    adaptBgp(topoObj);
  }
  if (topology.routing) topoObj.routing = topology.routing;
  if (topology.isis) topoObj.isis = topology.isis;
  if (topology.vxlan) topoObj.vxlan = topology.vxlan;
  if (topology.evpn) topoObj.evpn = topology.evpn;
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
  })).map(item => {
    adaptGateway(item);
    return item;
  });
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

/** Adapt Netlab's scalar/list shorthand to typed YANG containers without changing runtime data. */
function adaptMpls(parent: JsonObject, link = false): void {
  const value = parent.mpls;
  if (!value || typeof value !== "object" || Array.isArray(value)) return;
  const mpls: JsonObject = { ...value as JsonObject };
  parent.mpls = mpls;
  if (link) return;
  for (const key of ["ldp", "bgp", "vpn"]) {
    const setting = mpls[key];
    if (typeof setting === "boolean") mpls[key] = { enabled: setting };
    else if (Array.isArray(setting) && key !== "ldp") mpls[key] = { sessions: setting };
  }
  if ("6pe" in mpls) {
    mpls._6pe = mpls["6pe"];
    delete mpls["6pe"];
  }
}

/** Represent boolean gateway shorthand as a typed container during validation. */
function adaptGateway(parent: JsonObject): void {
  if (typeof parent.gateway === "boolean") parent.gateway = { enabled: parent.gateway };
}

/** Adapt keyed BGP dictionaries and import shorthand to modeled lists. */
function adaptBgp(parent: JsonObject): void {
  const raw = parent.bgp;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return;
  const bgp: JsonObject = { ...raw as JsonObject };
  parent.bgp = bgp;
  for (const key of ["originate", "advertise"]) {
    const rawPrefixes = bgp[key];
    if (rawPrefixes === undefined) continue;
    const entries = Array.isArray(rawPrefixes) ? rawPrefixes : [rawPrefixes];
    bgp[key] = entries.map(value => typeof value === "string"
      ? { [value.includes(":") ? "ipv6" : "ipv4"]: value }
      : value);
  }
  for (const key of ["as_list", "confederation", "import"]) {
    const value = bgp[key];
    if (key === "import" && Array.isArray(value)) {
      bgp[key] = value.map(item => typeof item === "string" ? { protocol: item } : item);
      continue;
    }
    if (!value || typeof value !== "object" || Array.isArray(value)) continue;
    bgp[key] = Object.entries(value).map(([name, setting]) => ({
      ...(setting && typeof setting === "object" && !Array.isArray(setting) ? setting : key === "import" && setting !== null ? { enabled: setting } : {}),
      ...(key === "import" ? { protocol: name } : { asn: /^\d+$/.test(name) ? Number(name) : name }),
    }));
  }
}
