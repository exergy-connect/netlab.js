import { adjustLinkObject } from "../links/links.js";
import type { JsonObject, Link, Topology, TransformContext } from "../types.js";

export const name = "lag";

/** Expand point-to-point aggregate links before normal link processing. */
export function module_pre_transform(topology: Topology, ctx: TransformContext): void {
  const links = topology.links ?? [];
  const nextId = new Map<string, number>();
  const defaults = (topology.defaults?.lag ?? {}) as JsonObject;
  for (const link of [...links]) {
    const lag = link.lag as JsonObject | undefined;
    if (!lag || !Array.isArray(lag.members)) continue;
    const members = lag.members.map((member, i) => adjustLinkObject(member, `lag.members[${i + 1}]`, topology.nodes ?? {}, ctx.diagnostics)).filter((m): m is Link => m !== null);
    if (!members.length || members.some(m => m.interfaces?.length !== 2 || m.interfaces[0]?.node === m.interfaces[1]?.node)) {
      ctx.diagnostics.error({ module: name, code: "VALUE", category: "VALUE", message: "LAG members must connect two distinct nodes" });
      continue;
    }
    const nodes = [...new Set(members.flatMap(m => (m.interfaces ?? []).map(i => String(i.node))))];
    if (nodes.length !== 2 || (lag.mlag as JsonObject | undefined)?.peergroup) {
      ctx.diagnostics.error({ module: name, code: "VALUE", category: "VALUE", message: "MLAG is not yet supported" });
      continue;
    }
    if (nodes.some(n => !(topology.nodes?.[n]?.module ?? []).includes("lag"))) {
      ctx.diagnostics.error({ module: name, code: "MISSING", category: "MISSING", message: `LAG module must be enabled on both endpoints: ${nodes.join(", ")}` });
      continue;
    }
    const base = typeof defaults.start_lag_id === "number" ? defaults.start_lag_id : 1;
    const ids = new Map<string, number>();
    for (const node of nodes) {
      const id = typeof lag.ifindex === "number" ? lag.ifindex : (nextId.get(node) ?? base);
      ids.set(node, id);
      nextId.set(node, id + 1);
    }
    link.interfaces = nodes.map(node => ({ node, lag: { ifindex: ids.get(node)!, lacp: lag.lacp ?? (topology.nodes?.[node]?.lag as JsonObject | undefined)?.lacp ?? "fast", lacp_mode: lag.lacp_mode ?? (topology.nodes?.[node]?.lag as JsonObject | undefined)?.lacp_mode ?? "active" } }));
    link.type = "lag";
    delete lag.members;
    for (const member of members) {
      const physical: Link = { interfaces: member.interfaces ?? [], type: "p2p", prefix: false as never, linkindex: links.length + 1, lag: { _parentindex: link.linkindex ?? 0 } };
      if (link.mtu !== undefined) physical.mtu = link.mtu;
      links.push(physical);
    }
  }
}

/** Associate member ports with their aggregate interfaces. */
export function module_post_link_transform(topology: Topology): void {
  for (const link of topology.links ?? []) {
    const parent = (link.lag as JsonObject | undefined)?._parentindex;
    if (typeof parent !== "number") continue;
    for (const end of link.interfaces ?? []) {
      const node = topology.nodes?.[String(end.node)];
      const port = node?.interfaces?.find(i => i.linkindex === link.linkindex);
      const bond = node?.interfaces?.find(i => i.linkindex === parent);
      if (!port || !bond) continue;
      port.lag = { ...(port.lag as JsonObject ?? {}), ifindex: (bond.lag as JsonObject)?.ifindex ?? 1, parent: bond.ifname ?? "" };
      delete port.ipv4;
      delete port.ipv6;
    }
  }
}
