import type { ModuleHooks } from "./registry.js";
import type { JsonObject, Node, Topology, TransformContext } from "../types.js";

export const name = "isis";
export const transform_after = ["vlan", "vrf"];
export const requires: string[] = [];

export function module_init(topology: Topology, _ctx: TransformContext): void {
  if (!topology.isis) topology.isis = { type: "level-2" };
}

export function node_post_transform(node: Node, topology: Topology, _ctx: TransformContext): void {
  const isis = ((node.isis as JsonObject) ?? {}) as JsonObject;
  const global = (topology.isis as JsonObject) ?? {};
  if (!isis.area) isis.area = global.area ?? "49.0001";
  if (!isis.type) isis.type = global.type ?? "level-2";
  if (!isis.net) {
    const id = (node.id ?? 1).toString(16).padStart(4, "0");
    isis.net = `${isis.area}.0000.0000.${id}.00`;
  }
  for (const intf of node.interfaces ?? []) {
    const ii = ((intf.isis as JsonObject) ?? {}) as JsonObject;
    if (!ii.network_type && intf.type === "p2p") ii.network_type = "point-to-point";
    intf.isis = ii;
  }
  node.isis = isis;
}

const _hooks: ModuleHooks = {
  name,
  transform_after,
  requires,
  module_init,
  node_post_transform,
};
export default _hooks;
