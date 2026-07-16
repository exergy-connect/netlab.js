import type { ModuleHooks } from "./registry.js";
import type { JsonObject, Node, Topology, TransformContext } from "../types.js";

export const name = "evpn";
export const transform_after = ["vlan", "vxlan", "vrf"];
export const requires = ["bgp"];

function vlanDict(topology: Topology): Record<string, JsonObject> {
  return (topology.vlans as Record<string, JsonObject> | undefined) ?? {};
}

function bgpAsn(topology: Topology, node?: Node): number | undefined {
  const nodeAs = Number((node?.bgp as JsonObject | undefined)?.as);
  if (Number.isFinite(nodeAs) && nodeAs > 0) return nodeAs;
  const topoAs = Number((topology.bgp as JsonObject | undefined)?.as);
  if (Number.isFinite(topoAs) && topoAs > 0) return topoAs;
  const evpnAs = Number((topology.evpn as JsonObject | undefined)?.as);
  if (Number.isFinite(evpnAs) && evpnAs > 0) return evpnAs;
  return undefined;
}

export function module_init(topology: Topology, _ctx: TransformContext): void {
  if (!topology.evpn) topology.evpn = {};
  const evpn = topology.evpn as JsonObject;
  if (!Array.isArray(evpn.session) || !evpn.session.length) evpn.session = ["ibgp"];
  if (evpn.transport === undefined) evpn.transport = "vxlan";

  // EVPN forces VXLAN control-plane flooding
  if (!topology.vxlan) topology.vxlan = {};
  (topology.vxlan as JsonObject).flooding = "evpn";
}

export function module_pre_transform(topology: Topology, _ctx: TransformContext): void {
  const vlans = vlanDict(topology);
  const evpn = (topology.evpn as JsonObject) ?? {};
  const asn = bgpAsn(topology);

  let names: string[];
  if (Array.isArray(evpn.vlans) && evpn.vlans.length) {
    names = evpn.vlans.map(String);
  } else {
    names = Object.entries(vlans)
      .filter(([, v]) => typeof v?.vni === "number")
      .map(([n]) => n);
  }
  evpn.vlans = names;

  for (const vname of names) {
    const vlan = vlans[vname];
    if (!vlan) continue;
    const ve = ((vlan.evpn as JsonObject) ?? {}) as JsonObject;
    if (ve.evi === undefined) ve.evi = vlan.id ?? 0;
    const evi = ve.evi;
    if (asn !== undefined) {
      const rt = `${asn}:${evi}`;
      if (!ve.import) ve.import = [rt];
      if (!ve.export) ve.export = [rt];
    }
    vlan.evpn = ve;
  }

  topology.evpn = evpn;
}

export function node_post_transform(node: Node, topology: Topology, _ctx: TransformContext): void {
  if (!(node.module ?? []).includes("evpn")) return;

  const topoEvpn = (topology.evpn as JsonObject) ?? {};
  const ne = ((node.evpn as JsonObject) ?? {}) as JsonObject;
  if (ne.transport === undefined) ne.transport = topoEvpn.transport ?? "vxlan";
  if (!Array.isArray(ne.session) || !ne.session.length) {
    ne.session = Array.isArray(topoEvpn.session) ? [...topoEvpn.session] : ["ibgp"];
  }

  const vlans = vlanDict(topology);
  const names = (
    Array.isArray(ne.vlans) && ne.vlans.length
      ? ne.vlans.map(String)
      : Array.isArray(topoEvpn.vlans)
        ? topoEvpn.vlans.map(String)
        : Object.keys(vlans)
  ).filter((n) => typeof vlans[n]?.vni === "number");
  ne.vlans = names;

  const routerId = String((node.bgp as JsonObject | undefined)?.router_id ?? "");
  const nodeVlans: Record<string, JsonObject> = {
    ...((node.vlans as Record<string, JsonObject>) ?? {}),
  };
  for (const vname of names) {
    const g = vlans[vname]!;
    const ge = (g.evpn as JsonObject) ?? {};
    const local: JsonObject = {
      ...(nodeVlans[vname] ?? {}),
      id: g.id,
      mode: g.mode,
      vni: g.vni,
      evpn: { ...ge },
    };
    const evi = ge.evi;
    if (routerId && evi !== undefined && (local.evpn as JsonObject).rd === undefined) {
      (local.evpn as JsonObject).rd = `${routerId}:${evi}`;
    }
    nodeVlans[vname] = local;
  }
  if (Object.keys(nodeVlans).length) node.vlans = nodeVlans;

  // Activate EVPN AF on matching BGP neighbors
  const sessions = new Set((ne.session as string[]).map(String));
  const bgp = ((node.bgp as JsonObject) ?? {}) as JsonObject;
  const neighbors = Array.isArray(bgp.neighbor) ? (bgp.neighbor as JsonObject[]) : [];
  for (const nb of neighbors) {
    const peerName = String(nb.name ?? "");
    const peer = topology.nodes?.[peerName];
    if (!peer || !(peer.module ?? []).includes("evpn")) continue;
    const ntype = String(nb.type ?? "");
    if (!sessions.has(ntype)) continue;
    if (nb.evpn === undefined) nb.evpn = "ipv4";
  }
  bgp.neighbor = neighbors;
  node.bgp = bgp;
  node.evpn = ne;
}

const _hooks: ModuleHooks = {
  name,
  transform_after,
  requires,
  module_init,
  module_pre_transform,
  node_post_transform,
};
export default _hooks;
