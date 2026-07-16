import type { ModuleHooks } from "./registry.js";
import type { JsonObject, Node, Topology, TransformContext } from "../types.js";

export const name = "vrf";

export function module_pre_transform(topology: Topology, _ctx: TransformContext): void {
  const vrfs = topology.vrfs;
  if (!vrfs || typeof vrfs !== "object") return;
  let idx = 1;
  for (const [vname, vdata] of Object.entries(vrfs as Record<string, JsonObject>)) {
    const v = vdata ?? {};
    if (!v.rd) v.rd = `1:${idx}`;
    if (!v.import) v.import = [String(v.rd)];
    if (!v.export) v.export = [String(v.rd)];
    (vrfs as Record<string, JsonObject>)[vname] = v;
    idx++;
  }
}

export function node_post_transform(node: Node, topology: Topology, _ctx: TransformContext): void {
  const global = topology.vrfs as Record<string, JsonObject> | undefined;
  if (!global) return;
  // Copy global VRFs onto node if referenced by interfaces
  const used = new Set(
    (node.interfaces ?? []).map((i) => i.vrf).filter((x): x is string => typeof x === "string"),
  );
  if (!used.size) return;
  const nodeVrfs: Record<string, JsonObject> = {
    ...((node.vrfs as Record<string, JsonObject>) ?? {}),
  };
  for (const name of used) {
    if (!nodeVrfs[name] && global[name]) nodeVrfs[name] = { ...global[name] };
  }
  node.vrfs = nodeVrfs;
}

const _hooks: ModuleHooks = {
  name,
  module_pre_transform,
  node_post_transform,
};
export default _hooks;
