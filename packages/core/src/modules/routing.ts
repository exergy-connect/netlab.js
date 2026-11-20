import type { JsonObject, JsonValue, Node, Topology, TransformContext } from "../types.js";

export const name = "routing";

function object(value: JsonValue | undefined): JsonObject | undefined {
  return value && typeof value === "object" && !Array.isArray(value) ? value : undefined;
}

function error(ctx: TransformContext, node: Node, message: string): void {
  ctx.diagnostics.error({ module: "routing", code: "VALUE", category: "VALUE", path: `nodes.${node.name}.routing`, message });
}

/** Resolve node next hops after interfaces and neighbor addresses have been built. */
export function node_post_transform(node: Node, topology: Topology, ctx: TransformContext): void {
  const routing = object(node.routing);
  if (!routing) return;
  if (Array.isArray(routing.static)) {
    const globalLists = object(object(topology.routing)?.static);
    const expand = (values: JsonValue[], stack: string[]): JsonValue[] => values.flatMap((value) => {
      const entry = object(value);
      if (!entry || typeof entry.include !== "string") return [value];
      const name = entry.include;
      if (stack.includes(name)) { error(ctx, node, `Recursive static route include ${name}`); return []; }
      const source = globalLists?.[name];
      if (!source) { error(ctx, node, `Unknown static route list ${name}`); return []; }
      const expanded = expand(Array.isArray(source) ? source : [source], [...stack, name]);
      return expanded.map((item) => {
        const route = object(item);
        return route ? { ...route, ...(entry.nexthop !== undefined ? { nexthop: structuredClone(entry.nexthop) } : {}) } : item;
      });
    });
    routing.static = expand(routing.static, []);
    for (const value of routing.static) {
      const route = object(value);
      if (!route) { error(ctx, node, "Static route must be an object"); continue; }
      const hop = object(route.nexthop);
      if (!hop || typeof hop.node !== "string") continue;
      const target = hop.node;
      const matches = (node.interfaces ?? []).flatMap((intf) =>
        (intf.neighbors ?? []).filter((neighbor) => neighbor.node === target)
          .map((neighbor) => ({ intf, neighbor })));
      if (matches.length === 0) { error(ctx, node, `Cannot resolve next-hop node ${target} on ${node.name}`); continue; }
      const nextHops: JsonObject[] = matches.map(({ intf, neighbor }) => {
        const result: JsonObject = {};
        for (const af of ["ipv4", "ipv6"] as const) {
          if (typeof neighbor[af] === "string") result[af] = neighbor[af].split("/")[0]!;
        }
        if (intf.ifname) result.intf = intf.ifname;
        if (hop.vrf) result.vrf = hop.vrf;
        return result;
      }).filter((next) => next.ipv4 || next.ipv6);
      if (!nextHops.length) { error(ctx, node, `No address for next-hop node ${target} on ${node.name}`); continue; }
      hop.nhlist = nextHops;
      for (const af of ["ipv4", "ipv6"] as const) {
        if (nextHops[0]![af] !== undefined) hop[af] = nextHops[0]![af]!;
      }
    }
  }
  const policies = object(routing.policy);
  if (policies) for (const [policyName, raw] of Object.entries(policies)) {
    const entries = Array.isArray(raw) ? raw : [raw];
    policies[policyName] = entries.map((entry, index) => {
      const rule = object(entry);
      if (!rule) { error(ctx, node, `Invalid routing policy ${policyName}`); return entry; }
      return { sequence: (index + 1) * 10, action: "permit", ...rule };
    });
  }
  const filters = object(routing.prefix);
  if (filters) for (const [filterName, raw] of Object.entries(filters)) {
    const entries = Array.isArray(raw) ? raw : [raw];
    filters[filterName] = entries.map((entry, index) => {
      const rule = object(entry);
      if (!rule) { error(ctx, node, `Invalid prefix filter ${filterName}`); return entry; }
      const normalized: JsonObject = { sequence: (index + 1) * 10, action: "permit", ...rule };
      if (typeof rule.prefix === "string") {
        const named = object(topology.prefix)?.[rule.prefix];
        const prefix = object(named);
        if (!prefix) error(ctx, node, `Unknown named prefix ${rule.prefix}`);
        else {
          for (const af of ["ipv4", "ipv6"] as const) if (prefix[af] !== undefined) normalized[af] = [prefix[af]!];
          delete normalized.prefix;
        }
      }
      return normalized;
    });
  }
}
