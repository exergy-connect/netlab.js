import ipaddr from "ipaddr.js";
import type { JsonObject, Link, Node, Topology, TransformContext } from "../types.js";

const object = (value: unknown): value is JsonObject => value !== null && typeof value === "object" && !Array.isArray(value);

/** Expand a flat leaf/spine Clos before normal node, group, and link processing. */
export function expandFabric(topology: Topology, ctx: TransformContext): void {
  if (!topology.fabric && !topology.module?.includes("fabric")) return;
  try {
    const spec = topology.fabric;
    if (!object(spec)) throw new Error("fabric must be a map");
    const unsupported = Object.keys(spec).filter(key => !["leafs", "spines", "leaf", "spine", "link"].includes(key));
    if (topology.design !== undefined) unsupported.push("design");
    if (unsupported.length) throw new Error(`Unsupported fabric features: ${unsupported.join(", ")}`);
    const count = (value: unknown, label: string): number => {
      const n = Number(value);
      if (!Number.isInteger(n) || n < 1) throw new Error(`${label} must be a positive integer`);
      return n;
    };
    const leaves = count(spec.leafs, "fabric.leafs"), spines = count(spec.spines, "fabric.spines");
    const leaf = object(spec.leaf) ? spec.leaf : {}, spine = object(spec.spine) ? spec.spine : {};
    const link = object(spec.link) ? spec.link : {};
    if (Object.keys(link).some(k => !["prefix", "subnet"].includes(k))) throw new Error("Only fabric.link.prefix and subnet are supported");
    const pool = typeof link.prefix === "string" ? link.prefix : "10.1.0.0/16";
    const [addr, bits] = ipaddr.parseCIDR(pool);
    const subnet = Number(link.subnet ?? 30);
    if (addr.kind() !== "ipv4" || !Number.isInteger(subnet) || subnet <= bits || subnet > 30)
      throw new Error("fabric link subnet must be an IPv4 prefix between the pool length and /30");
    const bytes = addr.toByteArray();
    const address = bytes.reduce((n, b) => n * 256 + b, 0);
    const poolSize = 2 ** (32 - bits), size = 2 ** (32 - subnet);
    const base = Math.floor(address / poolSize) * poolSize;
    if (leaves * spines * size > poolSize) throw new Error(`fabric link pool ${pool} is exhausted`);
    const ip = (n: number): string => [24, 16, 8, 0].map(shift => Math.floor(n / 2 ** shift) % 256).join(".");
    const format = (value: unknown, i: number): unknown => {
      if (typeof value === "string") {
        const result = value.replace(/\{count(?::0([1-9])d)?\}/g, (_, width: string | undefined) => String(i).padStart(Number(width ?? 0), "0"));
        if (/[{}]/.test(result)) throw new Error(`Unsupported fabric template ${value}`);
        return /^\d+$/.test(result) ? Number(result) : result;
      }
      if (Array.isArray(value)) return value.map(v => format(v, i));
      if (object(value)) return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, format(v, i)]));
      return value;
    };
    const nodes = structuredClone(topology.nodes ?? {}), groups = structuredClone(topology.groups ?? {});
    const generated = new Set<string>();
    const make = (params: JsonObject, n: number, prefix: string, groupName: string): string[] => {
      const names: string[] = [];
      for (let i = 1; i <= n; i++) {
        const name = String(format(params.name ?? `${prefix}{count}`, i));
        if (generated.has(name)) throw new Error(`duplicate fabric node ${name}`);
        generated.add(name);
        const attrs = format(Object.fromEntries(Object.entries(params).filter(([k]) => k !== "name" && k !== "group")), i) as Node;
        nodes[name] = { ...attrs, ...(nodes[name] ?? {}) };
        names.push(name);
      }
      const group = groups[groupName] ?? {};
      groups[groupName] = { ...group, members: [...new Set([...(group.members ?? []), ...names])].sort() };
      return names;
    };
    const leafNames = make(leaf, leaves, "L", String(leaf.group ?? "leafs"));
    const spineNames = make(spine, spines, "S", String(spine.group ?? "spines"));
    const links: Link[] = [];
    for (const l of leafNames) for (const s of spineNames) {
      const network = base + links.length * size;
      links.push({ type: "p2p", prefix: { ipv4: `${ip(network)}/${subnet}` }, interfaces: [
        { node: l, ipv4: `${ip(network + 1)}/${subnet}` }, { node: s, ipv4: `${ip(network + 2)}/${subnet}` },
      ] });
    }
    topology.nodes = nodes;
    topology.groups = groups;
    topology.links = [...links, ...(topology.links ?? [])];
    topology.module = (topology.module ?? []).filter(m => m !== "fabric");
  } catch (error) {
    ctx.diagnostics.error({ module: "fabric", code: "VALUE", category: "VALUE", path: "fabric", message: error instanceof Error ? error.message : String(error) });
  }
}
