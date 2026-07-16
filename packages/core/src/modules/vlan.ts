import type { ModuleHooks } from "./registry.js";
import type { JsonObject, Topology, TransformContext } from "../types.js";

export const name = "vlan";
export const transform_after: string[] = [];
export const requires: string[] = [];

export function module_pre_transform(topology: Topology, _ctx: TransformContext): void {
  const vlans = topology.vlans;
  if (!vlans || typeof vlans !== "object") return;
  // Assign VLAN IDs if missing
  let next = 1;
  for (const [vname, vdata] of Object.entries(vlans as Record<string, JsonObject>)) {
    const v = vdata ?? {};
    if (v.id === undefined) {
      while (Object.values(vlans as Record<string, JsonObject>).some((x) => x?.id === next)) next++;
      v.id = next++;
    }
    (vlans as Record<string, JsonObject>)[vname] = v;
  }
}

export function link_pre_transform(link: JsonObject, topology: Topology, _ctx: TransformContext): void {
  const vlan = link.vlan as JsonObject | undefined;
  if (!vlan) return;
  if (typeof vlan.access === "string") {
    const vdef = (topology.vlans as Record<string, JsonObject> | undefined)?.[vlan.access];
    if (vdef && vlan.access_id === undefined) vlan.access_id = vdef.id;
  }
}

const _hooks: ModuleHooks = {
  name,
  transform_after,
  requires,
  module_pre_transform,
  link_pre_transform,
};
export default _hooks;
