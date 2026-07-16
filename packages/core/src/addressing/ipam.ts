import ipaddr from "ipaddr.js";
import type { JsonObject, Link, Topology } from "../types.js";
import { deepMerge } from "../data/merge.js";

type Af = "ipv4" | "ipv6";

type PoolCursor = {
  ipv4?: number;
  ipv6?: number;
  /** 1-based cache of allocated subnets for nth (loopback) access */
  cache4?: string[];
  cache6?: string[];
  skipFirst4?: boolean;
  skipFirst6?: boolean;
};

const poolCursor: Record<string, PoolCursor> = {};

export function resetPoolCursors(): void {
  for (const k of Object.keys(poolCursor)) delete poolCursor[k];
}

/**
 * Port of netsim.augment.addressing.setup_pools:
 * merge legacy lan/loopback/p2p defaults, then fill missing IPv4 prefix lengths.
 */
export function setupPools(
  addrPools: JsonObject,
  defaults: JsonObject = {},
): Record<string, JsonObject> {
  const legacy: JsonObject = {
    lan: {
      ipv4: typeof defaults.lan === "string" ? defaults.lan : "10.0.0.0/16",
      prefix: typeof defaults.lan_subnet === "number" ? defaults.lan_subnet : 24,
    },
    loopback: {
      ipv4: "10.0.0.0/24",
      prefix: 32,
    },
    p2p: {
      ipv4: typeof defaults.p2p === "string" ? defaults.p2p : "10.2.0.0/16",
      prefix: typeof defaults.p2p_subnet === "number" ? defaults.p2p_subnet : 30,
    },
  };

  const merged = deepMerge(legacy, addrPools);
  const out: Record<string, JsonObject> = {};

  for (const [name, raw] of Object.entries(merged)) {
    if (raw === null || raw === undefined) {
      out[name] = {};
      continue;
    }
    if (typeof raw !== "object" || Array.isArray(raw)) {
      out[name] = { ipv4: raw as never };
      continue;
    }
    const pool = { ...(raw as JsonObject) };
    if (typeof pool.ipv4 === "string" && typeof pool.prefix !== "number") {
      pool.prefix = name.includes("loopback") ? 32 : 24;
    }
    // Netlab validate_pools: mgmt defaults to /24
    if (name === "mgmt" && typeof pool.prefix !== "number") {
      pool.prefix = 24;
    }
    out[name] = pool;
  }
  return out;
}

export function setupAddressing(topology: Topology): void {
  resetPoolCursors();
  const addressing = setupPools(
    (topology.addressing ?? {}) as JsonObject,
    (topology.defaults ?? {}) as JsonObject,
  );
  topology.addressing = addressing;
  topology.pools = { ...addressing };

  for (const [name, pool] of Object.entries(addressing)) {
    const cur: PoolCursor = {};
    // Match Netlab create_pool_generators: skip first subnet for loopback and /32,/127+
    const p4 = typeof pool.prefix === "number" ? pool.prefix : 24;
    const p6 = typeof pool.prefix6 === "number" ? pool.prefix6 : 64;
    if (typeof pool.ipv4 === "string") {
      cur.skipFirst4 = p4 === 32 || name === "loopback" || name.includes("loopback");
      cur.ipv4 = cur.skipFirst4 ? 1 : 0;
      cur.cache4 = [];
    }
    if (typeof pool.ipv6 === "string") {
      cur.skipFirst6 = p6 >= 127 || name === "loopback" || name.includes("loopback");
      cur.ipv6 = cur.skipFirst6 ? 1 : 0;
      cur.cache6 = [];
    }
    poolCursor[name] = cur;
  }
}

/** Default pool type from node count (Netlab get_default_link_type). */
export function getDefaultLinkType(link: Link): string {
  const n = (link.interfaces ?? []).length;
  if (n > 2) return "lan";
  return n === 2 ? "p2p" : "stub";
}

export function allocateLinkPrefix(topology: Topology, link: Link): void {
  const existing = (link.prefix ?? {}) as JsonObject;
  if (typeof existing.ipv4 === "string" || typeof existing.ipv6 === "string") {
    return;
  }
  // Netlab allows prefix: false to skip allocation
  if ((link as JsonObject).prefix === false) {
    link.prefix = {};
    return;
  }

  const defaultType = getDefaultLinkType(link);
  const candidates: string[] = [];
  if (typeof (link as JsonObject).pool === "string") {
    candidates.push(String((link as JsonObject).pool));
  }
  if (typeof link.role === "string") candidates.push(link.role);
  candidates.push(defaultType);
  if (!candidates.includes("lan")) candidates.push("lan");

  const prefix = allocateFromPools(topology, candidates);
  link.prefix = Object.keys(prefix).length ? prefix : {};
}

/** Allocate the n-th prefix from a pool (1-based, Netlab addressing.get(..., n)). */
export function allocateNthFromPool(
  topology: Topology,
  poolName: string,
  n: number,
): JsonObject {
  return allocateFromPools(topology, [poolName], n);
}

export function assignInterfaceAddresses(topology: Topology, link: Link): void {
  const prefix = (link.prefix ?? {}) as JsonObject;
  const ifaces = [...(link.interfaces ?? [])].sort((a, b) =>
    String(a.node).localeCompare(String(b.node)),
  );
  const nodes = topology.nodes ?? {};
  const isP2p = link.type === "p2p" && ifaces.length === 2;

  for (const af of ["ipv4", "ipv6"] as Af[]) {
    const cidr = prefix[af];
    if (typeof cidr !== "string") continue;

    if (isP2p) {
      ifaces[0]![af] = hostInSubnet(cidr, 1);
      ifaces[1]![af] = hostInSubnet(cidr, 2);
      for (const orig of link.interfaces ?? []) {
        const match = ifaces.find((i) => i.node === orig.node);
        if (match) orig[af] = match[af];
      }
      continue;
    }

    // id-based for roomy subnets (Netlab IPAM_id_based), else sequential
    let seq = 1;
    for (const iface of link.interfaces ?? []) {
      if (iface[af] !== undefined && iface[af] !== null) continue;
      const node = nodes[iface.node!];
      const id = node?.id;
      const useId = typeof id === "number" && id > 0 && hostFits(cidr, id);
      const host = useId ? id : seq++;
      iface[af] = hostInSubnet(cidr, host);
    }
  }
}

function allocateFromPools(
  topology: Topology,
  candidates: string[],
  nth?: number,
): JsonObject {
  const addressing = (topology.addressing ?? {}) as JsonObject;
  const poolName = candidates.find((p) => addressing[p] && typeof addressing[p] === "object");
  if (!poolName) return {};

  const pool = addressing[poolName] as JsonObject;
  const cur = poolCursor[poolName] ?? (poolCursor[poolName] = {});
  const out: JsonObject = {};

  if (typeof pool.ipv4 === "string") {
    const plen = typeof pool.prefix === "number" ? pool.prefix : 24;
    out.ipv4 = nth !== undefined ? nthSubnetV4(pool.ipv4, plen, nth, cur) : nextSubnetV4(pool.ipv4, plen, cur);
  }
  if (typeof pool.ipv6 === "string") {
    const plen = typeof pool.prefix6 === "number" ? pool.prefix6 : 64;
    out.ipv6 = nth !== undefined ? nthSubnetV6(pool.ipv6, plen, nth, cur) : nextSubnetV6(pool.ipv6, plen, cur);
  }
  return out;
}

function nextSubnetV4(poolCidr: string, subnetPlen: number, cur: PoolCursor): string {
  const idx = cur.ipv4 ?? 0;
  cur.ipv4 = idx + 1;
  return subnetAtV4(poolCidr, subnetPlen, idx);
}

function nthSubnetV4(poolCidr: string, subnetPlen: number, n: number, cur: PoolCursor): string {
  cur.cache4 = cur.cache4 ?? [];
  while (cur.cache4.length < n) {
    const idx = cur.cache4.length + (cur.skipFirst4 ? 1 : 0);
    // When using cache for nth, advance sequential cursor past allocated entries
    cur.cache4.push(subnetAtV4(poolCidr, subnetPlen, idx));
  }
  // Keep sequential cursor at least past cached entries
  const minNext = (cur.skipFirst4 ? 1 : 0) + cur.cache4.length;
  if ((cur.ipv4 ?? 0) < minNext) cur.ipv4 = minNext;
  return cur.cache4[n - 1]!;
}

function nextSubnetV6(poolCidr: string, subnetPlen: number, cur: PoolCursor): string {
  const idx = cur.ipv6 ?? 0;
  cur.ipv6 = idx + 1;
  return subnetAtV6(poolCidr, subnetPlen, idx);
}

function nthSubnetV6(poolCidr: string, subnetPlen: number, n: number, cur: PoolCursor): string {
  cur.cache6 = cur.cache6 ?? [];
  while (cur.cache6.length < n) {
    const idx = cur.cache6.length + (cur.skipFirst6 ? 1 : 0);
    cur.cache6.push(subnetAtV6(poolCidr, subnetPlen, idx));
  }
  const minNext = (cur.skipFirst6 ? 1 : 0) + cur.cache6.length;
  if ((cur.ipv6 ?? 0) < minNext) cur.ipv6 = minNext;
  return cur.cache6[n - 1]!;
}

function subnetAtV4(poolCidr: string, subnetPlen: number, idx: number): string {
  const [ip, poolPlen] = parseV4(poolCidr);
  const size = 2 ** (32 - subnetPlen);
  const base = (ip + idx * size) >>> 0;
  return `${formatV4(base)}/${subnetPlen}`;
}

function subnetAtV6(poolCidr: string, subnetPlen: number, idx: number): string {
  const [addr, poolPlen] = ipaddr.parseCIDR(poolCidr);
  if (addr.kind() !== "ipv6") throw new Error(`Expected IPv6 pool, got ${poolCidr}`);
  const base = bytesToBigInt(addr.toByteArray());
  const hostBits = 128n - BigInt(subnetPlen);
  const subnet = ((base >> hostBits) + BigInt(idx)) << hostBits;
  const bytes = bigIntToBytes(subnet, 16);
  const net = ipaddr.fromByteArray(Array.from(bytes)) as ipaddr.IPv6;
  return `${net.toString()}/${subnetPlen}`;
}

export function hostInSubnet(cidr: string, host: number): string {
  const [addr, plen] = ipaddr.parseCIDR(cidr);
  if (addr.kind() === "ipv4") {
    const [base] = parseV4(cidr);
    return `${formatV4((base + host) >>> 0)}/${plen}`;
  }
  const base = bytesToBigInt(addr.toByteArray());
  const ip = base + BigInt(host);
  const bytes = bigIntToBytes(ip, 16);
  const hostAddr = ipaddr.fromByteArray(Array.from(bytes)) as ipaddr.IPv6;
  return `${hostAddr.toString()}/${plen}`;
}

/** Network prefix string from a host CIDR (for bgp.advertise). */
export function networkFromHostCidr(cidr: string): string {
  try {
    const [addr, plen] = ipaddr.parseCIDR(cidr);
    if (addr.kind() === "ipv4") {
      const [base] = parseV4(cidr);
      const mask = plen === 0 ? 0 : (~0 << (32 - plen)) >>> 0;
      return `${formatV4((base & mask) >>> 0)}/${plen}`;
    }
    const bytes = addr.toByteArray();
    const base = bytesToBigInt(bytes);
    const hostBits = 128n - BigInt(plen);
    const net = (base >> hostBits) << hostBits;
    const netAddr = ipaddr.fromByteArray(Array.from(bigIntToBytes(net, 16))) as ipaddr.IPv6;
    return `${netAddr.toString()}/${plen}`;
  } catch {
    return cidr;
  }
}

function hostFits(cidr: string, host: number): boolean {
  try {
    const [, plen] = ipaddr.parseCIDR(cidr);
    const kind = ipaddr.parseCIDR(cidr)[0].kind();
    if (kind === "ipv4") {
      const max = 2 ** (32 - plen) - 2;
      return host > 0 && host <= max;
    }
    // IPv6 /64 has enormous space; id-based always fits for practical ids
    return host > 0;
  } catch {
    return false;
  }
}

function parseV4(cidr: string): [number, number] {
  const [ip, plenStr] = cidr.split("/");
  const parts = (ip ?? "0.0.0.0").split(".").map(Number);
  const base =
    ((parts[0]! << 24) >>> 0) + ((parts[1]! << 16) >>> 0) + ((parts[2]! << 8) >>> 0) + (parts[3]! >>> 0);
  return [base, Number(plenStr ?? 32)];
}

function formatV4(n: number): string {
  return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join(".");
}

function bytesToBigInt(bytes: number[] | Uint8Array): bigint {
  let n = 0n;
  for (const b of bytes) n = (n << 8n) + BigInt(b);
  return n;
}

function bigIntToBytes(n: bigint, len: number): number[] {
  const out = new Array<number>(len).fill(0);
  let x = n;
  for (let i = len - 1; i >= 0; i--) {
    out[i] = Number(x & 0xffn);
    x >>= 8n;
  }
  return out;
}
