import type { JsonObject, Link, Topology } from "../types.js";

type V4Net = { base: number; plen: number };

const poolCursor: Record<string, number> = {};

export function resetPoolCursors(): void {
  for (const k of Object.keys(poolCursor)) delete poolCursor[k];
}

export function setupAddressing(topology: Topology): void {
  resetPoolCursors();
  const addressing = (topology.addressing ?? {}) as JsonObject;
  // Store normalized addressing; generators are JS-side cursors (not exported)
  topology.addressing = addressing;
  topology.pools = { ...addressing };
}

export function allocateLinkPrefix(topology: Topology, link: Link): void {
  if (link.prefix && typeof link.prefix === "object") {
    return;
  }
  const poolName = link.type === "p2p" ? "p2p" : "lan";
  const pool = ((topology.addressing as JsonObject)?.[poolName] ?? {}) as JsonObject;
  const ipv4 = pool.ipv4;
  if (typeof ipv4 !== "string") {
    link.prefix = {};
    return;
  }
  const subnetPlen = link.type === "p2p" ? 30 : 24;
  const net = nextSubnet(ipv4, subnetPlen, poolName);
  link.prefix = { ipv4: formatCidr(net.base, net.plen) };
}

export function assignInterfaceAddresses(topology: Topology, link: Link): void {
  const prefix = (link.prefix ?? {}) as JsonObject;
  const ipv4 = prefix.ipv4;
  if (typeof ipv4 !== "string") return;

  const net = parseCidr(ipv4);
  const ifaces = [...(link.interfaces ?? [])].sort((a, b) =>
    String(a.node).localeCompare(String(b.node)),
  );

  if (link.type === "p2p" && ifaces.length === 2) {
    // sorted names → .1 and .2 (or network+1 / +2)
    ifaces[0]!.ipv4 = `${hostAt(net, 1)}/${net.plen}`;
    ifaces[1]!.ipv4 = `${hostAt(net, 2)}/${net.plen}`;
    // write back into original order objects
    for (const orig of link.interfaces ?? []) {
      const match = ifaces.find((i) => i.node === orig.node);
      if (match) orig.ipv4 = match.ipv4;
    }
    return;
  }

  // sequential / id-based hybrid: prefer node.id when it fits
  const nodes = topology.nodes ?? {};
  let seq = 1;
  for (const iface of link.interfaces ?? []) {
    if (iface.ipv4 !== undefined && iface.ipv4 !== null) continue;
    const node = nodes[iface.node!];
    const id = node?.id;
    if (typeof id === "number" && id > 0 && id < 2 ** (32 - net.plen) - 1) {
      iface.ipv4 = `${hostAt(net, id)}/${net.plen}`;
    } else {
      iface.ipv4 = `${hostAt(net, seq)}/${net.plen}`;
      seq++;
    }
  }
}

function nextSubnet(poolCidr: string, subnetPlen: number, cursorKey: string): V4Net {
  const pool = parseCidr(poolCidr);
  const size = 2 ** (32 - subnetPlen);
  const idx = poolCursor[cursorKey] ?? 0;
  poolCursor[cursorKey] = idx + 1;
  const base = (pool.base + idx * size) >>> 0;
  return { base, plen: subnetPlen };
}

function parseCidr(cidr: string): V4Net {
  const [ip, plenStr] = cidr.split("/");
  const parts = (ip ?? "0.0.0.0").split(".").map(Number);
  const base =
    ((parts[0]! << 24) >>> 0) + ((parts[1]! << 16) >>> 0) + ((parts[2]! << 8) >>> 0) + (parts[3]! >>> 0);
  return { base, plen: Number(plenStr ?? 32) };
}

function hostAt(net: V4Net, host: number): string {
  const n = (net.base + host) >>> 0;
  return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join(".");
}

function formatCidr(base: number, plen: number): string {
  const ip = [(base >>> 24) & 0xff, (base >>> 16) & 0xff, (base >>> 8) & 0xff, base & 0xff].join(".");
  return `${ip}/${plen}`;
}
