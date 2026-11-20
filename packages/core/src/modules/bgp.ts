import ipaddr from "ipaddr.js";
import type { ModuleHooks } from "./registry.js";
import type { JsonObject, JsonValue, Link, Node, Topology, TransformContext } from "../types.js";
import { getDevice } from "../devices/registry.js";
import { networkFromHostCidr } from "../addressing/ipam.js";

export const name = "bgp";

const DEFAULT_SESSIONS: Record<string, string[]> = {
  ipv4: ["ibgp", "ebgp", "localas_ibgp", "confed_ebgp"],
  ipv6: ["ibgp", "ebgp", "localas_ibgp", "confed_ebgp"],
};

/** Rare session types inherit community lists (only when that session type is in use). */
const INHERIT_COMMUNITY: Record<string, string> = {
  localas_ibgp: "ibgp",
};

/** Apply explicit AS membership before module defaults and BGP groups are propagated. */
export function processBgpAsList(topology: Topology, ctx: TransformContext): void {
  const entries = (topology.bgp as JsonObject | undefined)?.as_list;
  if (!entries || typeof entries !== "object" || Array.isArray(entries)) return;
  const assigned = new Map<string, number>();
  const error = (message: string) => ctx.diagnostics.error({ module: "bgp", code: "VALUE", category: "VALUE", message });
  for (const [key, data] of Object.entries(entries)) {
    const asn = Number(key);
    if (!Number.isInteger(asn) || asn < 1 || asn > 4294967295 || !data || typeof data !== "object" || Array.isArray(data) || !Array.isArray(data.members)) {
      error(`Invalid BGP AS list entry ${key}`); continue;
    }
    const expand = (list: JsonValue[]): string[] => {
      const result = new Set<string>();
      for (const item of list) {
        if (typeof item !== "string") { error(`Invalid BGP AS ${key} member`); continue; }
        const escaped = item.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".");
        const matches = Object.keys(topology.nodes ?? {}).filter((n) => new RegExp(`^${escaped}$`).test(n));
        if (!matches.length) error(`Unknown BGP AS ${key} member ${item}`);
        for (const match of matches) result.add(match);
      }
      return [...result];
    };
    const members = expand(data.members);
    data.members = members;
    const reflectors = Array.isArray(data.rr) ? expand(data.rr) : [];
    if (Array.isArray(data.rr)) data.rr = reflectors;
    for (const name of members) {
      const node = topology.nodes![name]!;
      const bgp = (node.bgp ?? {}) as JsonObject;
      if ((assigned.has(name) && assigned.get(name) !== asn) || (bgp.as !== undefined && Number(bgp.as) !== asn)) {
        error(`Node ${name} has conflicting BGP AS membership for ${asn}`); continue;
      }
      assigned.set(name, asn); bgp.as = asn; node.bgp = bgp;
    }
    for (const name of reflectors) {
      if (!members.includes(name)) { error(`Route reflector ${name} is not a member of AS ${asn}`); continue; }
      (topology.nodes![name]!.bgp as JsonObject).rr = true;
    }
  }
}

function configureConfederations(topology: Topology, ctx: TransformContext): void {
  const configs = (topology.bgp as JsonObject | undefined)?.confederation;
  if (!configs || typeof configs !== "object" || Array.isArray(configs)) return;
  const owners = new Map<number, number>();
  const error = (message: string) => ctx.diagnostics.error({ module: "bgp", code: "VALUE", category: "VALUE", message });
  for (const [key, value] of Object.entries(configs)) {
    const asn = Number(key);
    if (!Number.isInteger(asn) || asn < 1 || asn > 4294967295 || !value || typeof value !== "object" || Array.isArray(value) || !Array.isArray(value.members) || !value.members.length) { error(`Invalid BGP confederation ${key}`); continue; }
    for (const member of value.members) {
      if (typeof member !== "number" || !Number.isInteger(member) || member < 1 || member > 4294967295) { error(`Invalid BGP confederation member ${String(member)}`); continue; }
      if (owners.has(member) || String(member) in configs) { error(`Conflicting BGP confederation member ${member}`); continue; }
      owners.set(member, asn);
    }
  }
  for (const node of Object.values(topology.nodes ?? {})) {
    if (!(node.module ?? []).includes("bgp")) continue;
    const bgp = node.bgp as JsonObject | undefined;
    const member = Number(bgp?.as);
    if (String(member) in configs) error(`Node ${node.name} uses confederation AS ${member} as its BGP AS`);
    const parent = owners.get(member);
    if (parent === undefined || !bgp) continue;
    const features = getDevice(String(node.device)).features as JsonObject | undefined;
    if (!(features?.bgp as JsonObject | undefined)?.confederation) { error(`Device ${node.device} on node ${node.name} does not support BGP confederations`); continue; }
    const config = configs[String(parent)] as JsonObject;
    bgp.confederation = { as: parent, peers: (config.members as number[]).filter((m) => m !== member) };
  }
}

export function module_init(topology: Topology, _ctx: TransformContext): void {
  if (!topology.bgp) topology.bgp = {};
}

export function node_pre_transform(node: Node, topology: Topology, ctx: TransformContext): void {
  const bgp = ((node.bgp as JsonObject) ?? {}) as JsonObject;
  const global = (topology.bgp as JsonObject) ?? {};
  if (bgp.as === undefined && global.as !== undefined) bgp.as = global.as;
  if (bgp.as === undefined) {
    ctx.diagnostics.error({
      code: "MISSING",
      category: "MISSING",
      module: "bgp",
      message: `Node ${node.name} is missing bgp.as`,
      path: `nodes.${node.name}.bgp.as`,
    });
  }
  node.bgp = bgp;
}

/** Set EBGP role on inter-AS links before address allocation (Netlab ebgp_role_link). */
export function link_pre_transform(link: JsonObject, topology: Topology, _ctx: TransformContext): void {
  const defaults = (topology.defaults as JsonObject | undefined)?.bgp as JsonObject | undefined;
  const ebgpRole =
    String((topology.bgp as JsonObject | undefined)?.ebgp_role ?? defaults?.ebgp_role ?? "external");
  if (!ebgpRole) return;
  if ((link as Link).vlan_name) return;

  const asSet = new Set<number>();
  for (const ifdata of (link.interfaces as { node?: string }[] | undefined) ?? []) {
    const ndata = topology.nodes?.[ifdata.node!];
    if (!ndata) continue;
    const nodeAs = Number((ndata.bgp as JsonObject | undefined)?.as);
    if (Number.isFinite(nodeAs) && nodeAs > 0) asSet.add(nodeAs);
    const localAs = Number(
      ((ifdata as JsonObject).bgp as JsonObject | undefined)?.local_as ??
        (ndata.bgp as JsonObject | undefined)?.local_as ??
        nodeAs,
    );
    if (Number.isFinite(localAs) && localAs > 0) asSet.add(localAs);
  }
  if (asSet.size > 1 && !(link as Link).role) {
    (link as Link).role = ebgpRole;
  }
}

/** Router IDs + RR cluster IDs before per-node session build. */
export function module_post_transform(topology: Topology, _ctx: TransformContext): void {
  for (const node of Object.values(topology.nodes ?? {})) {
    if (!(node.module ?? []).includes("bgp")) continue;
    const bgp = ((node.bgp as JsonObject) ?? {}) as JsonObject;
    if (!bgp.router_id) {
      const lb = node.loopback as JsonObject | undefined;
      bgp.router_id =
        typeof lb?.ipv4 === "string" ? lb.ipv4.split("/")[0]! : `10.0.0.${node.id ?? 1}`;
    }
    node.bgp = bgp;
  }
  buildBgpRrClusters(topology);
  configureConfederations(topology, _ctx);
}

export function node_post_transform(node: Node, topology: Topology, _ctx: TransformContext): void {
  const bgp = ((node.bgp as JsonObject) ?? {}) as JsonObject;
  if (!bgp.as) {
    node.bgp = bgp;
    return;
  }

  buildBgpSessions(node, topology);
  bgpSetAdvertise(node, topology);
  bgpTransformCommunityList(node, topology, _ctx);
  processBgpImports(node, _ctx);
  bgpBuildAdvertiseList(node);
  bgpProcessOriginate(node, topology, _ctx);
  bgpSetOriginateAf(node);
  node.bgp = bgp;
}

function buildBgpRrClusters(topology: Topology): void {
  const asSet = new Set<number>();
  for (const n of Object.values(topology.nodes ?? {})) {
    const asn = Number((n.bgp as JsonObject | undefined)?.as);
    if (Number.isFinite(asn)) asSet.add(asn);
  }
  for (const asn of asSet) {
    const rrlist = findBgpRr(asn, topology);
    if (!rrlist.length) continue;
    const candidates = rrlist
      .filter((n) => (n.bgp as JsonObject).rr_cluster_id === undefined)
      .map((n) => String((n.bgp as JsonObject).router_id ?? ""));
    const clusterId = candidates.length ? candidates.sort()[0]! : undefined;
    for (const n of rrlist) {
      const bgp = n.bgp as JsonObject;
      if (bgp.rr_cluster_id === undefined) {
        bgp.rr_cluster_id = clusterId || bgp.router_id;
      }
    }
  }
}

function findBgpRr(bgpAs: number, topology: Topology): Node[] {
  return Object.values(topology.nodes ?? {}).filter((n) => {
    const bgp = n.bgp as JsonObject | undefined;
    return bgp && Number(bgp.as) === bgpAs && bgp.rr;
  });
}

function buildBgpSessions(node: Node, topology: Topology): void {
  const bgp = node.bgp as JsonObject;
  const sessions = (bgp.sessions as Record<string, string[]> | undefined) ?? DEFAULT_SESSIONS;
  const neighbors: JsonObject[] = [];
  bgp.neighbors = neighbors;

  buildIbgpSessions(node, sessions, topology, neighbors);
  buildEbgpSessions(node, sessions, topology, neighbors);

  for (const af of ["ipv4", "ipv6"] as const) {
    if (neighbors.some((n) => n[af] !== undefined)) bgp[af] = true;
  }

  const activate = (bgp.activate as Record<string, string[]> | undefined) ?? DEFAULT_SESSIONS;
  for (const ngb of neighbors) {
    const act: JsonObject = {};
    for (const af of ["ipv4", "ipv6"] as const) {
      if (ngb[af] !== undefined && bgp[af] && (activate[af] ?? []).includes(String(ngb.type))) {
        act[af] = true;
      }
    }
    if (Object.keys(act).length) ngb.activate = act;
  }
}

function buildIbgpSessions(
  node: Node,
  sessions: Record<string, string[]>,
  topology: Topology,
  neighbors: JsonObject[],
): void {
  const bgp = node.bgp as JsonObject;
  const nodeAs = Number(bgp.as);
  const isRr = Boolean(bgp.rr);
  const bgpNhs = bgp.next_hop_self;
  const rrMesh = bgp.rr_mesh !== false;
  const rrlist = isRr ? [] : findBgpRr(nodeAs, topology);

  let peers: Node[];
  if (isRr || rrlist.length === 0) {
    peers = Object.values(topology.nodes ?? {}).filter((ngb) => {
      if (ngb.name === node.name) return false;
      return Number((ngb.bgp as JsonObject | undefined)?.as) === nodeAs;
    });
    if (isRr && !rrMesh) {
      peers = peers.filter(
        (ngb) => !(ngb.bgp as JsonObject).rr || (ngb.bgp as JsonObject).rr_mesh !== false,
      );
    }
  } else {
    peers = rrlist;
  }

  for (const peer of peers) {
    const endpoint = (peer.loopback as JsonObject | undefined) ?? {};
    const extra: JsonObject = {};
    if ((peer.bgp as JsonObject)?.rr) extra.rr = (peer.bgp as JsonObject).rr as boolean;
    const nb = bgpNeighbor(peer, endpoint, "ibgp", sessions, extra);
    if (!nb) continue;
    if (node.loopback) nb._source_intf = structuredClone(node.loopback);
    if (bgpNhs) nb.next_hop_self = "ebgp";
    if (isRr && !nb.rr) nb.rr_client = true;
    neighbors.push(nb);
  }
}

function buildEbgpSessions(
  node: Node,
  sessions: Record<string, string[]>,
  topology: Topology,
  neighbors: JsonObject[],
): void {
  const bgp = node.bgp as JsonObject;
  const nodeAs = Number(bgp.as);

  for (const intf of node.interfaces ?? []) {
    if (intf.bgp === false) continue;
    const hasAf = typeof intf.ipv4 === "string" || typeof intf.ipv6 === "string";
    if (!hasAf) continue;

    for (const ngbIf of intf.neighbors ?? []) {
      const peer = topology.nodes?.[ngbIf.node!];
      if (!peer) continue;
      const peerBgp = peer.bgp as JsonObject | undefined;
      const peerAs = Number(peerBgp?.as);
      if (!Number.isFinite(peerAs) || peerAs <= 0) continue;
      // Interface local-AS settings determine the actual AS numbers on this link.
      // Match the peer's interface by link identity so parallel links stay distinct.
      const peerIntf = peer.interfaces?.find((candidate) =>
        intf.linkindex != null && candidate.linkindex === intf.linkindex &&
        (ngbIf.ifname == null || candidate.ifname === ngbIf.ifname));
      const localSetting = (intf.bgp as JsonObject | undefined)?.local_as ?? bgp.local_as;
      const peerSetting = (peerIntf?.bgp as JsonObject | undefined)?.local_as ?? peerBgp?.local_as;
      const localAs = Number(localSetting ?? nodeAs);
      const nodeConfed = bgp.confederation as JsonObject | undefined;
      const peerConfed = peerBgp?.confederation as JsonObject | undefined;
      const sameConfed = nodeConfed?.as !== undefined && nodeConfed.as === peerConfed?.as;
      const remoteAs = Number(peerSetting ?? (peerConfed && !sameConfed ? peerConfed.as : peerAs));
      if (!Number.isFinite(localAs) || !Number.isFinite(remoteAs) || remoteAs <= 0 || localAs === remoteAs) continue;

      const afData: JsonObject = {};
      if (typeof ngbIf.ipv4 === "string") afData.ipv4 = ngbIf.ipv4;
      if (typeof ngbIf.ipv6 === "string") afData.ipv6 = ngbIf.ipv6;
      const extra: JsonObject = { ifindex: intf.ifindex ?? 0 };
      const sessionType = sameConfed ? "confed_ebgp" : "ebgp";
      const nb = bgpNeighbor(peer, afData, sessionType, sessions, extra);
      if (!nb) continue;
      nb.as = remoteAs;
      if (sessionType === "confed_ebgp" && bgp.next_hop_self) nb.next_hop_self = "all";
      if (localSetting !== undefined) nb.local_as = localAs;
      neighbors.push(nb);
    }
  }
}

function bgpNeighbor(
  n: Node,
  intf: JsonObject,
  ctype: string,
  sessions: Record<string, string[]>,
  extra: JsonObject = {},
): JsonObject | null {
  const ngb: JsonObject = { ...extra, name: n.name ?? "", as: (n.bgp as JsonObject)?.as, type: ctype };
  let afCount = 0;
  for (const af of ["ipv4", "ipv6"] as const) {
    if (!(sessions[af] ?? []).includes(ctype)) continue;
    if (!(af in intf)) continue;
    afCount++;
    const val = intf[af];
    if (typeof val === "boolean") ngb[af] = val;
    else if (typeof val === "string") ngb[af] = val.split("/")[0]!;
  }
  return afCount > 0 ? ngb : null;
}

function bgpSetAdvertise(node: Node, topology: Topology): void {
  const defaults = (topology.defaults as JsonObject | undefined)?.bgp as JsonObject | undefined;
  const stubRoles = (defaults?.advertise_roles as string[] | undefined) ?? ["stub"];
  const bgp = node.bgp as JsonObject;
  const intfs: JsonObject[] = [
    ...((node.interfaces ?? []) as JsonObject[]),
    ...((node.loopback ? [node.loopback] : []) as JsonObject[]),
  ];

  for (const l of intfs) {
    if (l.bgp === false) continue;
    const lb = ((l.bgp as JsonObject) ?? {}) as JsonObject;
    if ("advertise" in lb) {
      l.bgp = lb;
      continue;
    }
    const role = l.role as string | undefined;
    const typ = l.type as string | undefined;
    if ((typ && stubRoles.includes(typ)) || (role && stubRoles.includes(role))) {
      if (role !== "stub") lb.advertise = true;
      else lb.advertise = isTrueStub(l, topology);
      l.bgp = lb;
      continue;
    }
    if (typ === "loopback" && bgp.advertise_loopback) {
      lb.advertise = true;
      l.bgp = lb;
    }
  }
}

function isTrueStub(intf: JsonObject, topology: Topology): boolean {
  for (const ngb of (intf.neighbors as { node?: string }[] | undefined) ?? []) {
    const peer = topology.nodes?.[ngb.node!];
    if (peer && peer.role !== "host") return false;
  }
  return true;
}

function bgpBuildAdvertiseList(node: Node): void {
  const bgp = node.bgp as JsonObject;
  const list: JsonObject[] = Array.isArray(bgp.advertise)
    ? (bgp.advertise as JsonObject[]).filter((x) => x && typeof x === "object")
    : [];
  // If advertise was a boolean/flag container from merge, start fresh from interfaces
  if (!Array.isArray(bgp.advertise)) bgp.advertise = list;

  const intfs: JsonObject[] = [
    ...((node.loopback ? [node.loopback] : []) as JsonObject[]),
    ...((node.interfaces ?? []) as JsonObject[]),
  ];
  for (const intf of intfs) {
    if (!(intf.bgp as JsonObject | undefined)?.advertise) continue;
    const entry: JsonObject = {};
    for (const af of ["ipv4", "ipv6"] as const) {
      if (typeof intf[af] === "string") entry[af] = networkFromHostCidr(String(intf[af]));
    }
    if (Object.keys(entry).length) list.push(entry);
  }
  if (list.length) bgp.advertise = list;
  else delete bgp.advertise;
}

/** Normalize originated prefixes and create discard routes when the device supports them. */
function bgpProcessOriginate(node: Node, topology: Topology, ctx: TransformContext): void {
  const bgp = node.bgp as JsonObject;
  if (bgp.originate === undefined) return;
  const values = Array.isArray(bgp.originate) ? bgp.originate : [bgp.originate];
  const prefixes: JsonObject[] = [];
  for (const value of values) {
    let item: JsonValue = value;
    if (typeof item === "string") {
      const named = (topology.prefix as JsonObject | undefined)?.[item];
      if (named !== undefined) item = named;
      else item = { [item.includes(":") ? "ipv6" : "ipv4"]: item };
    }
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      ctx.diagnostics.error({ module: "bgp", code: "VALUE", category: "VALUE", message: `Invalid BGP originate prefix on ${node.name}`, path: `nodes.${node.name}.bgp.originate` });
      continue;
    }
    const prefix: JsonObject = {};
    for (const af of ["ipv4", "ipv6"]) {
      if (item[af] === undefined) continue;
      const cidr = item[af];
      try {
        if (typeof cidr !== "string") throw new Error("Invalid prefix");
        const [addr] = ipaddr.parseCIDR(cidr);
        if (addr.kind() !== af) throw new Error("Wrong address family");
        prefix[af] = networkFromHostCidr(cidr);
      } catch {
        ctx.diagnostics.error({ module: "bgp", code: "VALUE", category: "VALUE", message: `Invalid ${af} BGP originate prefix ${String(cidr)} on ${node.name}`, path: `nodes.${node.name}.bgp.originate` });
      }
    }
    if (Object.keys(prefix).length) prefixes.push(prefix);
  }
  const features = (getDevice(String(node.device)).features ?? {}) as JsonObject;
  const modern = Boolean((features.bgp as JsonObject | undefined)?.advertise && ((features.routing as JsonObject | undefined)?.static as JsonObject | undefined)?.discard);
  const advertised = Array.isArray(bgp.advertise) ? bgp.advertise : [];
  advertised.push(...prefixes);
  if (advertised.length) bgp.advertise = advertised;
  if (modern && prefixes.length) {
    const routing = node.routing && typeof node.routing === "object" && !Array.isArray(node.routing) ? node.routing as JsonObject : {};
    const routes = Array.isArray(routing.static) ? routing.static : [];
    routes.push(...prefixes.map(prefix => ({ ...prefix, nexthop: { discard: true } })));
    routing.static = routes;
    node.routing = routing;
    node.module ??= [];
    if (!node.module.includes("routing")) node.module.push("routing");
    delete bgp.originate;
  } else {
    bgp.originate = prefixes.flatMap(prefix => {
      if (prefix.ipv6 !== undefined) ctx.diagnostics.error({ module: "bgp", code: "VALUE", category: "VALUE", message: `Device ${node.device} on ${node.name} cannot originate IPv6 BGP prefixes` });
      return typeof prefix.ipv4 === "string" ? [prefix.ipv4] : [];
    });
  }
}

function processBgpImports(node: Node, ctx: TransformContext, topology?: Topology): void {
  const features = getDevice(String(node.device)).features as JsonObject | undefined;
  const supported = (features?.bgp as JsonObject | undefined)?.import;
  const error = (message: string, path: string) => ctx.diagnostics.error({ module: "bgp", code: "VALUE", category: "VALUE", message, path });
  function normalize(bgp: JsonObject, path: string): void {
    const raw = bgp.import;
    if (raw === undefined) return;
    let entries: [string, JsonValue][];
    if (Array.isArray(raw)) entries = raw.map((item) => [String(item), true]);
    else if (raw && typeof raw === "object") entries = Object.entries(raw);
    else { error(`Invalid BGP route imports on node ${node.name}`, path); return; }
    const result: JsonObject = {};
    for (const [proto, setting] of entries) {
      if (setting === false) continue;
      if (!supported || (Array.isArray(supported) && !supported.includes(proto))) {
        error(`Device ${node.device} cannot import ${proto} routes into BGP on node ${node.name}`, path); continue;
      }
      if (proto === "bgp" || (!(node.module ?? []).includes(proto) && !["connected", "static"].includes(proto))) {
        error(`Cannot import ${proto} routes into BGP on node ${node.name}`, path); continue;
      }
      if (setting !== true && setting !== null && (typeof setting !== "object" || Array.isArray(setting))) {
        error(`Invalid BGP import of ${proto} on node ${node.name}`, path); continue;
      }
      result[proto === "ripv2" ? "rip" : proto] = setting === true || setting === null ? {} : setting;
    }
    bgp.import = result;
  }
  if (!topology) {
    if (node.bgp && typeof node.bgp === "object") normalize(node.bgp as JsonObject, `nodes.${node.name}.bgp.import`);
    return;
  }
  if (!(node.module ?? []).includes("bgp") || !(node.bgp as JsonObject | undefined)?.as) return;
  const vrfs = node.vrfs as Record<string, JsonObject> | undefined;
  const vrfAware = supported === true || (Array.isArray(supported) && supported.includes("vrf"));
  const defaults = (topology.defaults as JsonObject | undefined)?.const as JsonObject | undefined;
  const protocols = Array.isArray(defaults?.vrf_igp_protocols) ? defaults.vrf_igp_protocols : ["connected"];
  for (const [name, vrf] of Object.entries(vrfs ?? {})) {
    if (vrf.bgp === false) continue;
    if (!vrf.bgp || typeof vrf.bgp !== "object" || Array.isArray(vrf.bgp)) vrf.bgp = {};
    const bgp = vrf.bgp as JsonObject;
    const path = `nodes.${node.name}.vrfs.${name}.bgp.import`;
    if (bgp.import !== undefined) {
      if (!vrfAware) error(`Device ${node.device} cannot import routes into BGP in VRF ${name} on node ${node.name}`, path);
      else normalize(bgp, path);
      continue;
    }
    if (!vrfAware) continue;
    const generated: JsonObject = {};
    for (const proto of protocols) {
      if (typeof proto !== "string") continue;
      if (proto !== "connected" && !(proto in vrf)) continue;
      generated[proto === "ripv2" ? "rip" : proto] = { auto: true };
    }
    if (Object.keys(generated).length) bgp.import = generated;
  }
}

/** Process VRF imports after VRF node data has been assembled. */
export function processBgpVrfImports(topology: Topology, ctx: TransformContext): void {
  for (const node of Object.values(topology.nodes ?? {})) processBgpImports(node, ctx, topology);
}

/** Set bgp.ipv4/ipv6 when advertise list contains that AF (even without sessions). */
function bgpSetOriginateAf(node: Node): void {
  const bgp = node.bgp as JsonObject;
  const advertise = Array.isArray(bgp.advertise) ? (bgp.advertise as JsonObject[]) : [];
  for (const af of ["ipv4", "ipv6"] as const) {
    if (bgp[af]) continue;
    if (advertise.some((pfx) => af in pfx)) bgp[af] = true;
  }
}

function bgpTransformCommunityList(node: Node, topology: Topology, ctx: TransformContext): void {
  const bgp = node.bgp as JsonObject;
  const src = bgp.community as Record<string, string[]> | undefined;
  if (!src || typeof src !== "object") return;
  // Clone so we do not mutate topology.bgp.community via shared deepMerge refs
  const clist: Record<string, string[]> = Object.fromEntries(
    Object.entries(src).map(([k, v]) => [k, Array.isArray(v) ? [...v] : v]),
  );
  for (const [iKw, from] of Object.entries(INHERIT_COMMUNITY)) {
    if (!(iKw in clist) && from in clist) {
      clist[iKw] = [...(clist[from] ?? [])];
    }
  }
  if ((topology.bgp as JsonObject | undefined)?.confederation && !clist.confed_ebgp && clist.ibgp) {
    clist.confed_ebgp = [...clist.ibgp];
  }
  const features = getDevice(String(node.device)).features as JsonObject | undefined;
  const bgpFeatures = features?.bgp as JsonObject | undefined;
  const mapping = (bgpFeatures?.community && typeof bgpFeatures.community === "object"
    ? bgpFeatures.community : { standard: "standard", extended: "extended" }) as JsonObject;
  for (const [session, keywords] of Object.entries(clist)) {
    if (!Array.isArray(keywords)) continue;
    const transformed: string[] = [];
    for (const keyword of keywords) {
      const value = mapping[keyword];
      if (value === undefined) {
        ctx.diagnostics.error({ code: "VALUE", category: "VALUE", module: "bgp", message: `Invalid ${session} BGP community propagation keyword '${keyword}' for device ${node.device}/node ${node.name}`, path: `nodes.${node.name}.bgp.community.${session}` });
        continue;
      }
      for (const mapped of Array.isArray(value) ? value : [value]) {
        if (typeof mapped === "string" && !transformed.includes(mapped)) transformed.push(mapped);
      }
    }
    clist[session] = transformed;
  }
  bgp.community = clist;
}

const _hooks: ModuleHooks = {
  name,
  module_init,
  node_pre_transform,
  link_pre_transform,
  module_post_transform,
  node_post_transform,
};
export default _hooks;
