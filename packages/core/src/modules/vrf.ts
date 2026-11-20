import type { ModuleHooks } from "./registry.js";
import type { JsonObject, Node, Topology, TransformContext } from "../types.js";
import { deepMerge } from "../data/merge.js";
import { adjustLinkObject, getNextLinkindex } from "../links/links.js";
import { INTERNAL_LINKNAME } from "../types.js";

export const name = "vrf";

export function expandVrfLinks(topology: Topology, ctx: TransformContext): void {
  for (const [name, value] of Object.entries(topology.vrfs ?? {})) {
    if (!value || typeof value !== "object" || Array.isArray(value) || !Array.isArray(value.links)) continue;
    topology.links ??= [];
    value.links.forEach((raw, index) => {
      const path = `vrfs.${name}.links[${index + 1}]`;
      const link = adjustLinkObject(raw, path, topology.nodes ?? {}, ctx.diagnostics);
      if (!link) return;
      link.vrf = name;
      link.linkindex = getNextLinkindex(topology);
      link[INTERNAL_LINKNAME] = path;
      topology.links!.push(link);
    });
    delete value.links;
  }
}

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
    if (global[name]) nodeVrfs[name] = deepMerge(global[name]!, nodeVrfs[name] ?? {});
  }
  node.vrfs = nodeVrfs;
}

const _hooks: ModuleHooks = {
  name,
  module_pre_transform,
  node_post_transform,
};
export default _hooks;
