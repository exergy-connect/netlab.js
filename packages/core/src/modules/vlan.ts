import type { ModuleHooks } from "./registry.js";
import type { Interface, JsonObject, Neighbor, Node, Topology, TransformContext } from "../types.js";
import { INTERNAL_LINKNAME } from "../types.js";
import { deepMerge } from "../data/merge.js";
import { getDevice } from "../devices/registry.js";
import {
  adjustLinkObject,
  getNextLinkindex,
  getUniqueIfindex,
} from "../links/links.js";
import { formatNamedIfName } from "../nodes/nodes.js";

export const name = "vlan";

const SVI_IFINDEX_OFFSET = 40000;

const VLAN_NO_PROPAGATE_DEFAULT = [
  "id",
  "vni",
  "mode",
  "prefix",
  "evpn",
  "stp",
  "lag",
  "links",
];

const PHY_IFATTR_DEFAULT = [
  "bridge",
  "ifindex",
  "parentindex",
  "ifname",
  "linkindex",
  "type",
  "vlan",
  "mtu",
  "bandwidth",
  "_selfloop_ifindex",
  "stp",
  "virtual_interface",
  "lag",
  "evpn",
];

function vlanDefaults(topology: Topology): JsonObject {
  const d = (topology.defaults as JsonObject | undefined)?.vlan;
  return d && typeof d === "object" && !Array.isArray(d) ? (d as JsonObject) : {};
}

function vlanAttrDict(topology: Topology, key: string): string[] {
  const attrs = (vlanDefaults(topology).attributes as JsonObject | undefined)?.[key];
  if (attrs && typeof attrs === "object" && !Array.isArray(attrs)) {
    return Object.keys(attrs as JsonObject);
  }
  if (key === "vlan_no_propagate") return [...VLAN_NO_PROPAGATE_DEFAULT];
  if (key === "phy_ifattr") return [...PHY_IFATTR_DEFAULT];
  if (key === "copy_vlan_to_intf") return ["ipv4", "ipv6", "gateway"];
  return [];
}

function vlanDict(topology: Topology): Record<string, JsonObject> {
  return (topology.vlans as Record<string, JsonObject> | undefined) ?? {};
}

function startVlanId(topology: Topology): number {
  const fromMod = Number((topology.vlan as JsonObject | undefined)?.start_vlan_id);
  if (Number.isFinite(fromMod) && fromMod > 0) return fromMod;
  const fromDefaults = Number(vlanDefaults(topology).start_vlan_id);
  return Number.isFinite(fromDefaults) && fromDefaults > 0 ? fromDefaults : 1000;
}

function copyVlanAttributes(vlan: string, vlanData: JsonObject, link: JsonObject): void {
  if (vlanData.prefix !== undefined) link.prefix = structuredClone(vlanData.prefix) as never;
  if (link.type === undefined) link.type = (vlanData.type as string | undefined) ?? "lan";
  link.vlan_name = vlan;
}

function computeInterfaceVlanMode(
  intf: JsonObject,
  node: Node,
  topology: Topology,
): string {
  const vlan =
    (intf.vlan as JsonObject | undefined)?.access ??
    (intf.vlan as JsonObject | undefined)?.native;
  if (!vlan) return "irb";
  const nodeVlans = (node.vlans as Record<string, JsonObject> | undefined) ?? {};
  return (
    (intf._vlan_mode as string | undefined) ||
    ((intf.vlan as JsonObject | undefined)?.mode as string | undefined) ||
    (nodeVlans[String(vlan)]?.mode as string | undefined) ||
    ((node.vlan as JsonObject | undefined)?.mode as string | undefined) ||
    (vlanDict(topology)[String(vlan)]?.mode as string | undefined) ||
    ((topology.vlan as JsonObject | undefined)?.mode as string | undefined) ||
    "irb"
  );
}

function setAccessVlanInterfaceMode(link: JsonObject, topology: Topology): void {
  for (const intf of (link.interfaces as JsonObject[] | undefined) ?? []) {
    if (!intf.vlan) continue;
    const node = topology.nodes?.[String(intf.node)];
    if (!node) continue;
    intf._vlan_mode = computeInterfaceVlanMode(intf, node, topology);
  }
}

function getVlanInterfaceMode(intf: JsonObject): string | undefined {
  return intf._vlan_mode as string | undefined;
}

/** Expand vlans.*.links into topology links with vlan.access (Netlab create_vlan_access_links). */
export function createVlanAccessLinks(
  topology: Topology,
  ctx?: TransformContext,
): void {
  const vlans = vlanDict(topology);
  if (!Object.keys(vlans).length) return;
  if (!topology.links) topology.links = [];

  for (const [vname, vdata] of Object.entries(vlans)) {
    if (!vdata || typeof vdata !== "object") continue;
    if (!Array.isArray(vdata.links)) continue;
    for (let cnt = 0; cnt < vdata.links.length; cnt++) {
      const linkData = adjustLinkObject(
        vdata.links[cnt],
        `vlans.${vname}.links[${cnt + 1}]`,
        topology.nodes ?? {},
        ctx?.diagnostics,
      );
      if (!linkData) continue;
      const vlan = ((linkData as JsonObject).vlan as JsonObject | undefined) ?? {};
      vlan.access = vname;
      (linkData as JsonObject).vlan = vlan;
      linkData.linkindex = getNextLinkindex(topology);
      (linkData as JsonObject)[INTERNAL_LINKNAME] = `vlans.${vname}.links[${cnt + 1}]`;
      topology.links.push(linkData);
    }
    delete vdata.links;
  }
}

function assignVlanIds(topology: Topology): void {
  const vlans = vlanDict(topology);
  if (!Object.keys(vlans).length) return;

  const used = new Set<number>();
  for (const v of Object.values(vlans)) {
    if (typeof v?.id === "number") used.add(v.id);
  }
  for (const node of Object.values(topology.nodes ?? {})) {
    const nv = node.vlans as Record<string, JsonObject> | undefined;
    if (!nv) continue;
    for (const v of Object.values(nv)) {
      if (typeof v?.id === "number") used.add(v.id);
    }
  }

  let next = startVlanId(topology);
  for (const [vname, vdata] of Object.entries(vlans)) {
    const v = vdata ?? {};
    if (v.id === undefined) {
      while (used.has(next)) next++;
      v.id = next;
      used.add(next);
      next++;
    }
    vlans[vname] = v;
  }
  topology.vlans = vlans;
}

export function module_pre_transform(topology: Topology, ctx: TransformContext): void {
  if (topology.vlans && !topology.links) topology.links = [];
  assignVlanIds(topology);
  createVlanAccessLinks(topology, ctx);
}

export function link_pre_transform(
  link: JsonObject,
  topology: Topology,
  _ctx: TransformContext,
): void {
  if (link.type === "vlan_member") return;

  const vlan = link.vlan as JsonObject | undefined;
  if (!vlan) return;

  // Merge link VLAN attributes into interface VLAN attributes on VLAN-aware nodes
  for (const intf of (link.interfaces as JsonObject[] | undefined) ?? []) {
    const node = topology.nodes?.[String(intf.node)];
    if (!node) continue;
    if (!(node.module ?? []).includes("vlan")) continue;
    intf.vlan = deepMerge(
      structuredClone(vlan) as JsonObject,
      (intf.vlan as JsonObject | undefined) ?? {},
    );
  }

  const access =
    typeof vlan.access === "string"
      ? vlan.access
      : typeof vlan.native === "string"
        ? vlan.native
        : undefined;

  if (access) {
    const vdef = vlanDict(topology)[access];
    if (vdef && vlan.access_id === undefined && typeof vdef.id === "number") {
      vlan.access_id = vdef.id;
    }
    for (const intf of (link.interfaces as JsonObject[] | undefined) ?? []) {
      const iv = intf.vlan as JsonObject | undefined;
      if (!iv) continue;
      if (iv.access_id === undefined && vlan.access_id !== undefined) {
        iv.access_id = vlan.access_id;
      }
    }

    setAccessVlanInterfaceMode(link, topology);

    // Copy VLAN prefix / type onto the link (access/native)
    if (vdef) {
      const skip = new Set(vlanAttrDict(topology, "vlan_no_propagate"));
      const copy: JsonObject = {};
      for (const [k, v] of Object.entries(vdef)) {
        if (skip.has(k)) continue;
        copy[k] = structuredClone(v) as never;
      }
      // mode becomes vlan.mode on the link payload when present in skip set — still set type/prefix
      for (const [k, v] of Object.entries(copy)) {
        if (link[k] === undefined) link[k] = v as never;
        else if (
          link[k] &&
          typeof link[k] === "object" &&
          !Array.isArray(link[k]) &&
          v &&
          typeof v === "object" &&
          !Array.isArray(v)
        ) {
          link[k] = deepMerge(v as JsonObject, link[k] as JsonObject) as never;
        }
      }
      copyVlanAttributes(access, vdef, link);
    }

    // Disable IP addressing on access VLAN ports in bridge mode
    for (const intf of (link.interfaces as JsonObject[] | undefined) ?? []) {
      const node = topology.nodes?.[String(intf.node)];
      if (!node) continue;
      if (!(node.module ?? []).includes("vlan")) continue;
      if (getVlanInterfaceMode(intf) === "bridge") {
        intf.ipv4 = false;
        intf.ipv6 = false;
      }
    }
  }
}

function populateNodeVlan(vlan: string, node: Node, topology: Topology): JsonObject {
  if (!node.vlans) node.vlans = {};
  const nodeVlans = node.vlans as Record<string, JsonObject>;
  if (nodeVlans[vlan]?._global_merge) return nodeVlans[vlan]!;

  const nVlan = (nodeVlans[vlan] as JsonObject | undefined) ?? {};
  const gVlan = vlanDict(topology)[vlan] ?? {};
  nVlan.mode =
    (nVlan.mode as string | undefined) ||
    ((node.vlan as JsonObject | undefined)?.mode as string | undefined) ||
    (gVlan.mode as string | undefined) ||
    ((topology.vlan as JsonObject | undefined)?.mode as string | undefined) ||
    "irb";
  nVlan._global_merge = true;
  const merged = deepMerge(structuredClone(gVlan) as JsonObject, nVlan);
  // Drop topology-only module keys not used by this node
  for (const m of Object.keys(merged)) {
    if (!(node.module ?? []).includes(m) && (topology.module ?? []).includes(m)) {
      delete merged[m];
    }
  }
  nodeVlans[vlan] = merged;
  return merged;
}

function createNodeVlan(node: Node, vlan: string, topology: Topology): JsonObject | undefined {
  if (!node.vlans) node.vlans = {};
  const nodeVlans = node.vlans as Record<string, JsonObject>;
  if (!(vlan in nodeVlans) && !vlanDict(topology)[vlan]) return undefined;
  if (!(vlan in nodeVlans)) nodeVlans[vlan] = {};
  const data = populateNodeVlan(vlan, node, topology);
  if (data.bridge_group === undefined) {
    const nv = (node.vlan as JsonObject | undefined) ?? {};
    const next = Number(nv.max_bridge_group ?? 0) + 1;
    nv.max_bridge_group = next;
    node.vlan = nv;
    data.bridge_group = next;
  }
  return data;
}

function getVlanData(
  vlan: string,
  node: Node,
  topology: Topology,
  intf?: Interface,
): JsonObject | undefined {
  const fromTopo = vlanDict(topology)[vlan];
  if (fromTopo) return fromTopo;
  const fromNode = (node.vlans as Record<string, JsonObject> | undefined)?.[vlan];
  if (fromNode) return fromNode;
  if (intf?.neighbors) {
    for (const n of intf.neighbors) {
      if (!n.node) continue;
      const peer = topology.nodes?.[n.node];
      const peerVlan = (peer?.vlans as Record<string, JsonObject> | undefined)?.[vlan];
      if (peerVlan) return peerVlan;
    }
  }
  return undefined;
}

function updateVlanNeighborList(
  vlan: string,
  phyIf: Interface,
  sviIf: Interface,
  node: Node,
  topology: Topology,
): void {
  const vlanData = getVlanData(vlan, node, topology, phyIf);
  if (!vlanData) return;
  if (!Array.isArray(vlanData.neighbors)) vlanData.neighbors = [];
  const neighbors = vlanData.neighbors as Neighbor[];
  const known = new Set(neighbors.map((n) => n.node));
  for (const n of phyIf.neighbors ?? []) {
    if (!known.has(n.node)) neighbors.push({ ...n });
  }

  const sviInfo = new Set([...(node.module ?? []), "ipv4", "ipv6"]);
  const nodeName = String(node.name ?? "");
  const sviEntry: Neighbor = { node: nodeName };
  if (sviIf.ifname !== undefined) sviEntry.ifname = sviIf.ifname;
  for (const k of sviInfo) {
    const v = (sviIf as JsonObject)[k];
    if (v !== undefined) (sviEntry as JsonObject)[k] = v as never;
  }

  const filtered = neighbors.filter((n) => n.node !== nodeName);
  filtered.push(sviEntry);
  vlanData.neighbors = filtered;
}

function createSviInterfaces(node: Node, topology: Topology, ctx: TransformContext): void {
  const skipIfattr = new Set([
    ...vlanAttrDict(topology, "phy_ifattr"),
    ...Object.keys((topology.defaults as JsonObject | undefined)?.providers ?? {}),
  ]);
  const sviSkipattr = new Set([
    ...vlanAttrDict(topology, "vlan_no_propagate").filter((k) => k !== "mode"),
    ...vlanAttrDict(topology, "vlan_svi_no_propagate"),
  ]);

  const vlanIfmap: Record<string, Interface> = {};
  const ifaces = node.interfaces ?? [];
  const initialLen = ifaces.length;

  for (let ifidx = 0; ifidx < initialLen; ifidx++) {
    const ifdata = ifaces[ifidx]!;
    const vlanObj = ifdata.vlan as JsonObject | undefined;
    if (!vlanObj) continue;
    const accessVlan = (vlanObj.access ?? vlanObj.native) as string | undefined;
    if (!accessVlan) continue;

    const mode = getVlanInterfaceMode(ifdata as JsonObject) ?? "irb";
    if (mode === "route") continue; // routed access kept as native L3 — not needed for bridge EVPN

    const vlanData = createNodeVlan(node, accessVlan, topology);
    if (!vlanData) continue;

    const features = ((getDevice(String(node.device ?? "none")).features as JsonObject) ?? {})
      .vlan as JsonObject | undefined;
    const sviName = features?.svi_interface_name;
    if (!sviName || typeof sviName !== "string") {
      ctx.diagnostics.error({
        code: "VALUE",
        category: "VALUE",
        module: "vlan",
        message: `Device ${node.device} used by ${node.name} does not support VLAN interfaces (access vlan ${accessVlan})`,
        path: `nodes.${node.name}`,
      });
      return;
    }

    let vlanIfdata = vlanIfmap[accessVlan];
    if (!vlanIfdata) {
      const vlanMode = (vlanObj.mode as string | undefined) || (vlanData.mode as string | undefined) || "";
      const copyAttr = ["vlan_name", "gateway"];
      if (vlanMode !== "bridge") copyAttr.push("ipv4", "ipv6");
      const base: JsonObject = {};
      for (const k of copyAttr) {
        if ((ifdata as JsonObject)[k] !== undefined) {
          base[k] = structuredClone((ifdata as JsonObject)[k]) as never;
        }
      }
      vlanIfdata = base as Interface;
      if (vlanMode) {
        vlanIfdata.vlan = { mode: vlanMode, name: accessVlan };
      } else {
        vlanIfdata.vlan = { name: accessVlan };
      }
      vlanIfdata.type = "svi";
      vlanIfdata.ifindex = getUniqueIfindex(node, SVI_IFINDEX_OFFSET);
      vlanIfdata.ifname = formatNamedIfName(sviName, {
        vlan: Number(vlanData.id),
        bvi: Number(vlanData.bridge_group ?? vlanData.id),
        ifname: ifdata.ifname,
      });
      vlanIfdata.name = `VLAN ${accessVlan} (${vlanData.id})`;
      vlanIfdata.virtual_interface = true;
      vlanIfdata.neighbors = [];

      for (const [k, v] of Object.entries(vlanData)) {
        if (sviSkipattr.has(k) || copyAttr.includes(k)) continue;
        if (v === true && (vlanIfdata as JsonObject)[k] !== undefined) continue;
        if ((vlanIfdata as JsonObject)[k] === undefined) {
          (vlanIfdata as JsonObject)[k] = structuredClone(v) as never;
        }
      }

      node.interfaces = node.interfaces ?? [];
      node.interfaces.push(vlanIfdata);
      vlanIfmap[accessVlan] = vlanIfdata;
    }

    updateVlanNeighborList(accessVlan, ifdata, vlanIfdata, node, topology);

    if (ifdata.neighbors !== undefined) {
      (ifdata as JsonObject)._vlan_saved_neighbors = ifdata.neighbors;
    }
    for (const attr of Object.keys(ifdata as JsonObject)) {
      if (attr.includes("_vlan_saved")) continue;
      if (!skipIfattr.has(attr)) delete (ifdata as JsonObject)[attr];
    }
    ifdata.vlan = { ...(ifdata.vlan as JsonObject), access_id: vlanData.id, access: accessVlan };
  }
}

function setSviNeighborList(node: Node, topology: Topology): void {
  for (const ifdata of node.interfaces ?? []) {
    if (ifdata.vlan_name === undefined) continue;
    const vlanData = getVlanData(String(ifdata.vlan_name), node, topology, ifdata);
    if (!vlanData || !Array.isArray(vlanData.neighbors)) continue;
    ifdata.neighbors = (vlanData.neighbors as Neighbor[]).filter((n) => n.node !== node.name);
  }
}

function cleanupVlanFlags(topology: Topology): void {
  for (const link of topology.links ?? []) {
    delete (link as JsonObject).vlan_name;
    for (const intf of (link.interfaces as JsonObject[] | undefined) ?? []) {
      if (intf._vlan_mode !== undefined) {
        intf.vlan = { ...((intf.vlan as JsonObject) ?? {}), mode: intf._vlan_mode };
        delete intf._vlan_mode;
      }
    }
  }
  for (const node of Object.values(topology.nodes ?? {})) {
    for (const intf of node.interfaces ?? []) {
      delete (intf as JsonObject).vlan_name;
      delete (intf as JsonObject)._global_merge;
      if (intf._vlan_mode !== undefined) {
        intf.vlan = { ...((intf.vlan as JsonObject) ?? {}), mode: intf._vlan_mode };
        delete intf._vlan_mode;
      }
      // Restore access-port neighbors after SVI rebuild (Netlab node_cleanup)
      if ((intf as JsonObject)._vlan_saved_neighbors !== undefined) {
        intf.neighbors = (intf as JsonObject)._vlan_saved_neighbors as Neighbor[];
        delete (intf as JsonObject)._vlan_saved_neighbors;
      }
    }
    const nv = node.vlans as Record<string, JsonObject> | undefined;
    if (!nv) continue;
    for (const vdata of Object.values(nv)) {
      delete vdata._global_merge;
      delete vdata.neighbors;
    }
  }
  for (const vdata of Object.values(vlanDict(topology))) {
    delete vdata.neighbors;
  }
}

export function module_post_link_transform(topology: Topology, ctx: TransformContext): void {
  for (const node of Object.values(topology.nodes ?? {})) {
    if (!(node.module ?? []).includes("vlan")) continue;
    const nv = node.vlans as Record<string, JsonObject> | undefined;
    if (nv) {
      for (const vname of Object.keys(nv)) populateNodeVlan(vname, node, topology);
    }
    createSviInterfaces(node, topology, ctx);
  }
  for (const node of Object.values(topology.nodes ?? {})) {
    if (!(node.module ?? []).includes("vlan")) continue;
    setSviNeighborList(node, topology);
  }
  cleanupVlanFlags(topology);
}

const _hooks: ModuleHooks = {
  name,
  module_pre_transform,
  link_pre_transform,
  module_post_link_transform,
};
export default _hooks;
