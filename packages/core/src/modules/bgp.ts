import type { ModuleHooks } from "./registry.js";
import type { JsonObject, Link, Node, Topology, TransformContext } from "../types.js";
import { networkFromHostCidr } from "../addressing/ipam.js";

export const name = "bgp";

const DEFAULT_SESSIONS: Record<string, string[]> = {
  ipv4: ["ibgp", "ebgp", "localas_ibgp"],
  ipv6: ["ibgp", "ebgp", "localas_ibgp"],
};

/** Rare session types inherit community lists (only when that session type is in use). */
const INHERIT_COMMUNITY: Record<string, string> = {
  localas_ibgp: "ibgp",
};

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
}

export function node_post_transform(node: Node, topology: Topology, _ctx: TransformContext): void {
  const bgp = ((node.bgp as JsonObject) ?? {}) as JsonObject;
  if (!bgp.as) {
    node.bgp = bgp;
    return;
  }

  buildBgpSessions(node, topology);
  bgpSetAdvertise(node, topology);
  bgpTransformCommunityList(node);
  bgpBuildAdvertiseList(node);
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
      const peerAs = Number((peer.bgp as JsonObject | undefined)?.as);
      if (!Number.isFinite(peerAs) || peerAs <= 0) continue;
      if (peerAs === nodeAs) continue;

      const afData: JsonObject = {};
      if (typeof ngbIf.ipv4 === "string") afData.ipv4 = ngbIf.ipv4;
      if (typeof ngbIf.ipv6 === "string") afData.ipv6 = ngbIf.ipv6;
      const extra: JsonObject = { ifindex: intf.ifindex ?? 0 };
      const nb = bgpNeighbor(peer, afData, "ebgp", sessions, extra);
      if (!nb) continue;
      nb.as = peerAs;
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

/** Set bgp.ipv4/ipv6 when advertise list contains that AF (even without sessions). */
function bgpSetOriginateAf(node: Node): void {
  const bgp = node.bgp as JsonObject;
  const advertise = Array.isArray(bgp.advertise) ? (bgp.advertise as JsonObject[]) : [];
  for (const af of ["ipv4", "ipv6"] as const) {
    if (bgp[af]) continue;
    if (advertise.some((pfx) => af in pfx)) bgp[af] = true;
  }
}

function bgpTransformCommunityList(node: Node): void {
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
