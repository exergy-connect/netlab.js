import type { JsonObject, Node, Topology, TransformContext } from "../types.js";

export const name = "mpls";

/** Set up LDP on IPv4 interfaces when MPLS LDP is enabled. */
export function node_post_transform(node: Node, _topology: Topology, ctx: TransformContext): void {
  const mpls = node.mpls as JsonObject | undefined;
  if (!mpls || !mpls.ldp) return;
  if (!(node.module ?? []).some((m) => ["ospf", "isis", "eigrp"].includes(m))) {
    ctx.diagnostics.error({ code: "VALUE", category: "VALUE", module: "mpls", message: `You cannot enable LDP on node ${node.name} without an IGP`, path: `nodes.${node.name}.mpls.ldp` });
  }
  const ldp: JsonObject = typeof mpls.ldp === "object" ? { ...mpls.ldp as JsonObject } : {};
  const ipv4 = (node.loopback as JsonObject | undefined)?.ipv4;
  if (typeof ipv4 === "string") ldp.router_id ??= ipv4.split("/")[0];
  for (const intf of node.interfaces ?? []) {
    if (typeof intf.ipv4 !== "string" || intf.role === "external" || intf.vrf) continue;
    const config = intf.mpls as JsonObject | undefined;
    if (config?.ldp === false) continue;
    intf.ldp = { ...(typeof config?.ldp === "object" ? config.ldp as JsonObject : {}), passive: intf.type === "stub" || intf.role === "stub" };
    ldp.af = { ipv4: true };
  }
  delete mpls.ldp;
  node.ldp = ldp;
}
