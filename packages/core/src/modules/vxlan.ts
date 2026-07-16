import type { ModuleHooks } from "./registry.js";
import type { JsonObject, Node, Topology, TransformContext } from "../types.js";

export const name = "vxlan";
export const transform_after = ["vlan", "vrf"];
export const requires = ["vlan"];

const DEFAULT_START_VNI = 100000;

function vlanDict(topology: Topology): Record<string, JsonObject> {
  return (topology.vlans as Record<string, JsonObject> | undefined) ?? {};
}

function startVni(topology: Topology): number {
  const defVxlan = (topology.defaults as JsonObject | undefined)?.vxlan;
  const fromDefaults = Number(
    defVxlan && typeof defVxlan === "object" && !Array.isArray(defVxlan)
      ? (defVxlan as JsonObject).start_vni
      : undefined,
  );
  const fromMod = Number((topology.vxlan as JsonObject | undefined)?.start_vni);
  if (Number.isFinite(fromMod) && fromMod > 0) return fromMod;
  if (Number.isFinite(fromDefaults) && fromDefaults > 0) return fromDefaults;
  return DEFAULT_START_VNI;
}

function vlanNamesForVxlan(topology: Topology, node?: Node): string[] {
  const src = ((node?.vxlan as JsonObject | undefined) ?? (topology.vxlan as JsonObject) ?? {}) as JsonObject;
  if (Array.isArray(src.vlans) && src.vlans.length) return src.vlans.map(String);
  return Object.keys(vlanDict(topology));
}

export function module_init(topology: Topology, _ctx: TransformContext): void {
  if (!topology.vxlan) topology.vxlan = {};
  const vxlan = topology.vxlan as JsonObject;
  if (vxlan.domain === undefined) vxlan.domain = "global";
  if (vxlan.flooding === undefined) vxlan.flooding = "static";
  if (vxlan.use_v6_vtep === undefined) vxlan.use_v6_vtep = false;
}

export function module_pre_transform(topology: Topology, _ctx: TransformContext): void {
  const vlans = vlanDict(topology);
  if (!Object.keys(vlans).length) return;

  const used = new Set<number>();
  for (const v of Object.values(vlans)) {
    if (typeof v?.vni === "number") used.add(v.vni);
  }

  const base = startVni(topology);
  let next = base;
  const names = vlanNamesForVxlan(topology);
  for (const vname of names) {
    const v = vlans[vname];
    if (!v) continue;
    if (v.vni === false) continue;
    if (typeof v.vni === "number") continue;
    const id = Number(v.id);
    const preferred = Number.isFinite(id) ? base + id : 0;
    if (preferred > 0 && !used.has(preferred)) {
      v.vni = preferred;
      used.add(preferred);
    } else {
      while (used.has(next)) next++;
      v.vni = next;
      used.add(next);
      next++;
    }
  }

  const vxlan = (topology.vxlan as JsonObject) ?? {};
  if (!Array.isArray(vxlan.vlans) || !vxlan.vlans.length) {
    vxlan.vlans = names.filter((n) => typeof vlans[n]?.vni === "number");
  }
  topology.vxlan = vxlan;
}

function loopbackAddress(node: Node, af: "ipv4" | "ipv6"): string | undefined {
  const lb = node.loopback as JsonObject | undefined;
  const raw = lb?.[af];
  if (typeof raw !== "string") return undefined;
  return raw.split("/")[0];
}

export function module_post_transform(topology: Topology, ctx: TransformContext): void {
  const topoVxlan = (topology.vxlan as JsonObject) ?? {};
  const flooding = String(topoVxlan.flooding ?? "static");
  const vlans = vlanDict(topology);

  for (const node of Object.values(topology.nodes ?? {})) {
    if (!(node.module ?? []).includes("vxlan")) continue;
    const nv = ((node.vxlan as JsonObject) ?? {}) as JsonObject;

    if (nv.domain === undefined) nv.domain = topoVxlan.domain ?? "global";
    // Topology-level flooding (e.g. forced to evpn by EVPN module_init) wins
    nv.flooding = flooding;

    const names = vlanNamesForVxlan(topology, node).filter((n) => typeof vlans[n]?.vni === "number");
    nv.vlans = names;

    // Copy VLAN VXLAN attrs onto the node
    const nodeVlans: Record<string, JsonObject> = {
      ...((node.vlans as Record<string, JsonObject>) ?? {}),
    };
    for (const vname of names) {
      const g = vlans[vname]!;
      const prev = nodeVlans[vname] ?? {};
      const prevEvpn = (prev.evpn as JsonObject | undefined) ?? {};
      const gEvpn =
        g.evpn && typeof g.evpn === "object" && !Array.isArray(g.evpn)
          ? (g.evpn as JsonObject)
          : {};
      nodeVlans[vname] = {
        ...prev,
        id: g.id,
        mode: g.mode,
        vni: g.vni,
        ...(Object.keys(gEvpn).length || Object.keys(prevEvpn).length
          ? { evpn: { ...gEvpn, ...prevEvpn } }
          : {}),
      };
    }
    if (Object.keys(nodeVlans).length) node.vlans = nodeVlans;

    const useV6 = Boolean(topoVxlan.use_v6_vtep ?? nv.use_v6_vtep);
    const af: "ipv4" | "ipv6" = useV6 ? "ipv6" : "ipv4";
    const vtep = loopbackAddress(node, af);
    if (!vtep) {
      ctx.diagnostics.error({
        code: "MISSING",
        category: "MISSING",
        module: "vxlan",
        message: `VXLAN module needs an ${af.toUpperCase()} address on loopback of ${node.name}`,
        path: `nodes.${node.name}.loopback.${af}`,
      });
    } else {
      nv.vtep = vtep;
      nv.vtep_interface = String((node.loopback as JsonObject | undefined)?.ifname ?? "lo");
      nv.transport = af;
    }

    // Static flooding VTEP lists (skipped when flooding=evpn)
    if (String(nv.flooding) === "static") {
      const peers = Object.values(topology.nodes ?? {}).filter(
        (n) => n !== node && (n.module ?? []).includes("vxlan"),
      );
      const vtepSet = new Set<string>();
      for (const vname of names) {
        const vlan = nodeVlans[vname];
        if (!vlan || typeof vlan.vni !== "number") continue;
        const list: string[] = [];
        for (const peer of peers) {
          const pv = (peer.vxlan as JsonObject | undefined)?.vtep;
          if (typeof pv !== "string" || pv === vtep) continue;
          const peerVlans = (peer.vlans as Record<string, JsonObject> | undefined) ?? {};
          const match = Object.values(peerVlans).some((x) => x?.vni === vlan.vni);
          if (match) {
            list.push(pv);
            vtepSet.add(pv);
          }
        }
        if (list.length) vlan.vtep_list = list;
      }
      if (vtepSet.size) nv.vtep_list = [...vtepSet].sort();
    }

    node.vxlan = nv;
  }
}

const _hooks: ModuleHooks = {
  name,
  transform_after,
  requires,
  module_init,
  module_pre_transform,
  module_post_transform,
};
export default _hooks;
