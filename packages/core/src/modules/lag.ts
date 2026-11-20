import { adjustLinkObject } from "../links/links.js";
import type { JsonObject, Link, Topology, TransformContext } from "../types.js";

export const name = "lag";

/** Expand point-to-point aggregate links before normal link processing. */
export function module_pre_transform(topology: Topology, ctx: TransformContext): void {
  const links = topology.links ?? [];
  const nextId = new Map<string, number>();
  const defaults = (topology.defaults?.lag ?? {}) as JsonObject;
  const pairs = new Map<string, string>();
  const peerIds = new Set<number>();
  for (const link of links) {
    const id = ((link.lag as JsonObject | undefined)?.mlag as JsonObject | undefined)?.peergroup;
    if (typeof id === "number") peerIds.add(id);
  }
  let nextPeerId = 1;
  const error = (message: string) => ctx.diagnostics.error({ module: name, code: "VALUE", category: "VALUE", message });
  const normalize = (lag: JsonObject): Link[] | undefined => {
    if (!Array.isArray(lag.members)) return undefined;
    const members = lag.members.map((member, i) => adjustLinkObject(member, `lag.members[${i + 1}]`, topology.nodes ?? {}, ctx.diagnostics));
    if (!members.length || members.some(m => !m || m.interfaces?.length !== 2 || m.interfaces[0]?.node === m.interfaces[1]?.node)) {
      error("LAG members must connect two distinct nodes");
      return undefined;
    }
    return members as Link[];
  };
  // Discover peer pairs first, regardless of the order of links in the input.
  for (const link of [...links]) {
    const lag = link.lag as JsonObject | undefined;
    const mlag = lag?.mlag as JsonObject | undefined;
    if (!lag || !mlag?.peergroup) continue;
    const members = normalize(lag);
    if (!members) continue;
    const nodes = members[0]!.interfaces!.map(i => String(i.node));
    if (members.some(m => m.interfaces!.some(i => !nodes.includes(String(i.node))))) {
      error("MLAG peerlink members must connect the same two nodes");
      continue;
    }
    if (nodes.some(n => !(topology.nodes?.[n]?.module ?? []).includes("lag"))) {
      error(`LAG module must be enabled on both MLAG peers: ${nodes.join(", ")}`);
      continue;
    }
    if (nodes.some(n => pairs.has(n))) {
      error(`A node cannot belong to more than one MLAG peer group: ${nodes.join(", ")}`);
      continue;
    }
    if (mlag.peergroup === true) {
      while (peerIds.has(nextPeerId)) nextPeerId++;
      mlag.peergroup = nextPeerId++;
      peerIds.add(mlag.peergroup as number);
    }
    pairs.set(nodes[0]!, nodes[1]!);
    pairs.set(nodes[1]!, nodes[0]!);
    link.interfaces = members[0]!.interfaces;
    link.type = "p2p";
    link.prefix = false as never;
    delete lag.members;
    for (const member of members.slice(1)) {
      links.push({ ...member, type: "p2p", prefix: false as never, linkindex: links.length + 1, lag: { _peerlink: link.linkindex ?? 0 } });
    }
  }
  for (const link of [...links]) {
    const lag = link.lag as JsonObject | undefined;
    if (!lag || !Array.isArray(lag.members) || (lag.mlag as JsonObject | undefined)?.peergroup) continue;
    const members = normalize(lag);
    if (!members) continue;
    const sides: string[][] = [[String(members[0]!.interfaces![0]!.node)], [String(members[0]!.interfaces![1]!.node)]];
    let valid = true;
    for (const member of members.slice(1)) {
      const [a, b] = member.interfaces!.map(i => String(i.node));
      const sideOf = (n: string) => sides.findIndex(side => side.includes(n) || (!!pairs.get(n) && side.includes(pairs.get(n)!)));
      const ai = sideOf(a!), bi = sideOf(b!);
      if (ai < 0 && bi < 0 || ai >= 0 && bi >= 0 && ai === bi) { valid = false; break; }
      const side = ai >= 0 ? ai : 1 - bi;
      if (!sides[side]!.includes(a!)) sides[side]!.push(a!);
      if (!sides[1 - side]!.includes(b!)) sides[1 - side]!.push(b!);
    }
    if (sides.some(side => side.length > 2 || (side.length === 2 && pairs.get(side[0]!) !== side[1]))) valid = false;
    if (!valid) { error("MLAG members must connect two sides of one or two paired nodes"); continue; }
    const nodes = sides.flat();
    if (nodes.some(n => !(topology.nodes?.[n]?.module ?? []).includes("lag"))) {
      error(`LAG module must be enabled on all endpoints: ${nodes.join(", ")}`);
      continue;
    }
    const base = typeof defaults.start_lag_id === "number" ? defaults.start_lag_id : 1;
    const ids = new Map<string, number>();
    for (const side of sides) {
      const id = typeof lag.ifindex === "number" ? lag.ifindex : Math.max(base, ...side.map(n => nextId.get(n) ?? base));
      for (const node of side) { ids.set(node, id); nextId.set(node, id + 1); }
    }
    link.interfaces = nodes.map(node => ({ node, lag: { ifindex: ids.get(node)!, lacp: lag.lacp ?? (topology.nodes?.[node]?.lag as JsonObject | undefined)?.lacp ?? "fast", lacp_mode: lag.lacp_mode ?? (topology.nodes?.[node]?.lag as JsonObject | undefined)?.lacp_mode ?? "active", ...(sides.some(side => side.length === 2 && side.includes(node)) ? { _mlag: true } : {}) } }));
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
  // A virtual multi-chassis link is represented as a shared link, but peers
  // on the same side are not LAG neighbors. Use physical member adjacency.
  for (const link of topology.links ?? []) {
    if (link.type !== "lag") continue;
    const members = (topology.links ?? []).filter(l => (l.lag as JsonObject | undefined)?._parentindex === link.linkindex);
    for (const end of link.interfaces ?? []) {
      const nodeName = String(end.node);
      const neighbors = new Set(members.filter(m => m.interfaces?.some(i => i.node === nodeName))
        .flatMap(m => (m.interfaces ?? []).filter(i => i.node !== nodeName).map(i => String(i.node))));
      const bond = topology.nodes?.[nodeName]?.interfaces?.find(i => i.linkindex === link.linkindex);
      if (bond?.neighbors) bond.neighbors = bond.neighbors.filter(n => neighbors.has(String(n.node)));
    }
  }
}
