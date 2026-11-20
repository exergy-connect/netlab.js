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
  const multihoming = Array.isArray(topology.plugin) && topology.plugin.includes("evpn.multihoming");
  const topoEvpn = (topology.evpn ?? {}) as JsonObject;
  const configuredSegments = (topoEvpn.ethernet_segments && typeof topoEvpn.ethernet_segments === "object" && !Array.isArray(topoEvpn.ethernet_segments) ? topoEvpn.ethernet_segments : {}) as JsonObject;
  const segments: Record<string, JsonObject> = {};
  const reserved = new Set<string>();
  for (const [key, value] of Object.entries(configuredSegments)) {
    if (!value || typeof value !== "object" || Array.isArray(value)) continue;
    segments[key] = { ...value };
    if (typeof value.id === "string" && /^(?:[0-9a-f]{2}:){9}[0-9a-f]{2}$/i.test(value.id)) {
      const bytes = value.id.toLowerCase().split(":");
      reserved.add(bytes.slice(1, 6).join(""));
      if (bytes[0] === "00" && bytes[1] === "02") reserved.add(bytes.slice(2, 7).join(""));
    }
  }
  let segmentId = 1;
  const segmentFor = (key: string): JsonObject => {
    if (segments[key]) return segments[key]!;
    while (reserved.has(segmentId.toString(16).padStart(10, "0"))) segmentId++;
    const hex = segmentId.toString(16).padStart(10, "0");
    reserved.add(hex);
    segmentId++;
    const octets = (value: string) => value.match(/../g)!.join(":");
    return segments[key] = { id: octets(`0002${hex}000000`), _lacp_system_id: octets(`02${hex}`) };
  };
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
    const endpointData = new Map<string, JsonObject>();
    const segmentNames = new Map<string, string>();
    let invalidSegment = false;
    for (const member of members) for (const end of member.interfaces ?? []) {
      const node = String(end.node);
      const evpn = end.evpn as JsonObject | undefined;
      const es = evpn?.es;
      if (es !== undefined && (typeof es !== "string" || !es)) { error(`Invalid Ethernet segment on ${node}`); invalidSegment = true; continue; }
      if (typeof es === "string") {
        if (!multihoming || !(topology.nodes?.[node]?.module ?? []).includes("evpn")) { error(`ESI-LAG on ${node} requires EVPN and the evpn.multihoming plugin`); invalidSegment = true; }
        if (segmentNames.has(node) && segmentNames.get(node) !== es) { error(`Conflicting Ethernet segments on ${node}`); invalidSegment = true; }
        segmentNames.set(node, es);
      }
      const previous = endpointData.get(node) ?? {};
      const setting = end.lag as JsonObject | undefined;
      const previousLag = previous.lag as JsonObject | undefined;
      if (previousLag?.lacp_system_id !== undefined && setting?.lacp_system_id !== undefined && previousLag.lacp_system_id !== setting.lacp_system_id) {
        error(`Conflicting LACP system IDs on ${node}`); invalidSegment = true;
      }
      endpointData.set(node, { ...previous, ...(evpn ? { evpn: { ...(previous.evpn as JsonObject ?? {}), ...evpn } } : {}), ...(setting ? { lag: { ...previousLag, ...setting } } : {}) });
    }
    if (invalidSegment) continue;
    const sameSide = (a: string, b: string) => pairs.get(a) === b || (!!segmentNames.get(a) && segmentNames.get(a) === segmentNames.get(b));
    const sides: string[][] = [[String(members[0]!.interfaces![0]!.node)], [String(members[0]!.interfaces![1]!.node)]];
    let valid = true;
    for (const member of members.slice(1)) {
      const [a, b] = member.interfaces!.map(i => String(i.node));
      const sideOf = (n: string) => sides.findIndex(side => side.includes(n) || side.some(other => sameSide(n, other)));
      const ai = sideOf(a!), bi = sideOf(b!);
      if (ai < 0 && bi < 0 || ai >= 0 && bi >= 0 && ai === bi) { valid = false; break; }
      const side = ai >= 0 ? ai : 1 - bi;
      if (!sides[side]!.includes(a!)) sides[side]!.push(a!);
      if (!sides[1 - side]!.includes(b!)) sides[1 - side]!.push(b!);
    }
    if (sides.some(side => side.length > 2 || (side.length === 2 && !sameSide(side[0]!, side[1]!)))) valid = false;
    if (!valid) { error("MLAG members must connect two sides of one or two paired nodes"); continue; }
    for (const side of sides) {
      const key = side.map(node => segmentNames.get(node)).find(value => value !== undefined);
      if (!key) continue;
      if (side.some(node => segmentNames.get(node) !== key)) {
        error(`All nodes on an ESI-LAG side must use the same Ethernet segment: ${side.join(", ")}`);
        invalidSegment = true;
        continue;
      }
      const segment = segmentFor(key);
      if (!(segment.auto === true || typeof segment.id === "string" && /^(?:[0-9a-f]{2}:){9}[0-9a-f]{2}$/i.test(segment.id))) {
        error(`Invalid Ethernet segment identifier for ${key}`); invalidSegment = true; continue;
      }
      let sideLacp: string | undefined;
      for (const node of side) {
        const data = endpointData.get(node)!;
        const nodeLag = (data.lag ?? {}) as JsonObject;
        let lacp = nodeLag.lacp_system_id ?? segment._lacp_system_id;
        if (typeof lacp === "number" && Number.isInteger(lacp) && lacp > 0 && lacp <= 65535) {
          const hex = lacp.toString(16).padStart(4, "0");
          lacp = `02${hex}${hex}00`.match(/../g)!.join(":");
        }
        if (typeof lacp !== "string" || !/^(?:[0-9a-f]{2}:){5}[0-9a-f]{2}$/i.test(lacp)) {
          error(`ESI-LAG on ${node} requires a valid LACP system ID`); invalidSegment = true; continue;
        }
        if (sideLacp !== undefined && sideLacp.toLowerCase() !== lacp.toLowerCase()) {
          error(`Mismatched LACP system IDs for Ethernet segment ${key}`); invalidSegment = true;
        }
        sideLacp = lacp;
        data.lag = { ...nodeLag, lacp_system_id: lacp };
        data.evpn = { ...(data.evpn as JsonObject), _esi: structuredClone(segment) };
        const nodeEvpn = (topology.nodes![node]!.evpn ?? {}) as JsonObject;
        nodeEvpn.ethernet_segments = { ...(nodeEvpn.ethernet_segments as JsonObject ?? {}), [key]: structuredClone(segment) };
        topology.nodes![node]!.evpn = nodeEvpn;
      }
    }
    if (invalidSegment) continue;
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
    link.interfaces = nodes.map(node => {
      const data = endpointData.get(node) ?? {};
      const isEsi = segmentNames.has(node);
      return { ...data, node, lag: { ...(data.lag as JsonObject ?? {}), ifindex: ids.get(node)!, lacp: lag.lacp ?? (topology.nodes?.[node]?.lag as JsonObject | undefined)?.lacp ?? "fast", lacp_mode: lag.lacp_mode ?? (topology.nodes?.[node]?.lag as JsonObject | undefined)?.lacp_mode ?? "active", ...(sides.some(side => side.length === 2 && side.includes(node)) && !isEsi ? { _mlag: true } : {}) } };
    });
    link.type = "lag";
    delete lag.members;
    for (const member of members) {
      const physical: Link = { interfaces: (member.interfaces ?? []).map(({ evpn: _evpn, lag: _lag, ...end }) => end), type: "p2p", prefix: false as never, linkindex: links.length + 1, lag: { _parentindex: link.linkindex ?? 0 } };
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
