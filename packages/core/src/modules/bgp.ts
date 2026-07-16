import type { ModuleHooks } from "./registry.js";
import type { JsonObject, Node, Topology, TransformContext } from "../types.js";

export const name = "bgp";
export const transform_after = ["vlan", "vrf", "ospf", "isis"];
export const requires: string[] = [];

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

export function node_post_transform(node: Node, topology: Topology, _ctx: TransformContext): void {
  const bgp = ((node.bgp as JsonObject) ?? {}) as JsonObject;
  if (!bgp.router_id) {
    const lb = node.loopback as JsonObject | undefined;
    bgp.router_id =
      typeof lb?.ipv4 === "string" ? lb.ipv4.split("/")[0]! : `10.0.0.${node.id ?? 1}`;
  }

  // Build simple neighbor list from interface neighbors with bgp module
  const neighbors: JsonObject[] = [];
  for (const intf of node.interfaces ?? []) {
    for (const nb of intf.neighbors ?? []) {
      const peer = topology.nodes?.[nb.node!];
      if (!peer || !(peer.module ?? []).includes("bgp")) continue;
      const peerBgp = (peer.bgp as JsonObject) ?? {};
      const localAs = Number(bgp.as);
      const peerAs = Number(peerBgp.as);
      const entry: JsonObject = {
        name: nb.node ?? "",
        as: peerAs,
        type: localAs === peerAs ? "ibgp" : "ebgp",
      };
      if (typeof nb.ipv4 === "string") entry.ipv4 = nb.ipv4.split("/")[0]!;
      else if (typeof nb.ipv4 === "boolean") entry.ipv4 = nb.ipv4;
      neighbors.push(entry);
    }
  }
  bgp.neighbor = neighbors;
  node.bgp = bgp;
}

const _hooks: ModuleHooks = {
  name,
  transform_after,
  requires,
  module_init,
  node_pre_transform,
  node_post_transform,
};
export default _hooks;
