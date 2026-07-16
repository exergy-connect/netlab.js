import type { ModuleHooks } from "./registry.js";
import type { JsonObject, Node, Topology, TransformContext } from "../types.js";

export const name = "ospf";

export function module_init(topology: Topology, _ctx: TransformContext): void {
  if (!topology.ospf) topology.ospf = {};
}

export function node_post_transform(node: Node, topology: Topology, _ctx: TransformContext): void {
  const ospf = ((node.ospf as JsonObject) ?? {}) as JsonObject;
  const global = (topology.ospf as JsonObject) ?? {};
  if (ospf.area === undefined) ospf.area = global.area ?? "0.0.0.0";

  // router_id from loopback ipv4 or node id
  if (!ospf.router_id) {
    const lb = node.loopback as JsonObject | undefined;
    const ipv4 = typeof lb?.ipv4 === "string" ? lb.ipv4.split("/")[0] : undefined;
    ospf.router_id = ipv4 ?? `10.0.0.${node.id ?? 1}`;
  }

  const hasV4 =
    (node.interfaces ?? []).some((i) => typeof i.ipv4 === "string") ||
    typeof (node.loopback as JsonObject | undefined)?.ipv4 === "string";
  const hasV6 =
    (node.interfaces ?? []).some((i) => typeof i.ipv6 === "string") ||
    typeof (node.loopback as JsonObject | undefined)?.ipv6 === "string";
  ospf.af = { ipv4: hasV4, ipv6: hasV6 };

  // p2p interfaces → point-to-point; skip external/EBGP links; stub → passive
  for (const intf of node.interfaces ?? []) {
    if (intf.role === "external") {
      delete intf.ospf;
      continue;
    }
    const io = ((intf.ospf as JsonObject) ?? {}) as JsonObject;
    if (io.area === undefined) io.area = ospf.area;
    if (!io.network_type && intf.type === "p2p") io.network_type = "point-to-point";
    if (intf.role === "stub" || intf.type === "stub") {
      if (io.passive === undefined) io.passive = true;
    } else if (io.passive === undefined) {
      io.passive = false;
    }
    intf.ospf = io;
  }

  if (node.loopback) {
    const lb = node.loopback as JsonObject;
    const lo = ((lb.ospf as JsonObject) ?? {}) as JsonObject;
    if (lo.area === undefined) lo.area = ospf.area;
    if (lo.passive === undefined) lo.passive = false;
    lb.ospf = lo;
  }

  node.ospf = ospf;
}

const hooks: ModuleHooks = {
  name,
  module_init,
  node_post_transform,
};
export default hooks;
// named re-exports already above
