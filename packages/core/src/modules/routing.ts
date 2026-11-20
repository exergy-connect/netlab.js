import type { JsonObject, JsonValue, Node, Topology, TransformContext } from "../types.js";
import { getDevice } from "../devices/registry.js";

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
  const filters = object(routing.prefix);
  if (filters) for (const [filterName, raw] of Object.entries(filters)) {
    const entries = Array.isArray(raw) ? raw : [raw];
    filters[filterName] = entries.map((entry, index) => {
      const rule = object(entry);
      if (!rule) { error(ctx, node, `Invalid prefix filter ${filterName}`); return entry; }
      const normalized: JsonObject = { sequence: (index + 1) * 10, action: "permit", ...rule };
      for (const af of ["ipv4", "ipv6"] as const) if (typeof normalized[af] === "string") normalized[af] = [normalized[af]!];
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

/** Resolve and validate routing policies after protocol and VRF imports are known. */
export function processRoutingPolicies(topology: Topology, ctx: TransformContext): void {
  const globalRouting = object(topology.routing) ?? {};
  for (const node of Object.values(topology.nodes ?? {})) {
    const requests: string[] = [];
    const collectImports = (bgp: JsonObject | undefined) => {
      const imports = object(bgp?.import);
      for (const data of Object.values(imports ?? {})) {
        const policy = object(data)?.policy;
        if (typeof policy === "string" && !requests.includes(policy)) requests.push(policy);
      }
    };
    collectImports(object(node.bgp));
    for (const vrf of Object.values(object(node.vrfs) ?? {})) collectImports(object(object(vrf)?.bgp));
    if (requests.length && !(node.module ?? []).includes("routing")) {
      error(ctx, node, `Node ${node.name} requires the routing module for BGP import policies`);
      continue;
    }
    let routing = object(node.routing);
    if (!routing && requests.length) node.routing = routing = {};
    if (!routing) continue;
    let policies = object(routing.policy);
    if (!policies && requests.length) routing.policy = policies = {};
    if (!policies) continue;
    const globalPolicies = object(globalRouting.policy) ?? {};
    for (const policy of requests) {
      if (policies[policy] !== undefined && policies[policy] !== null) continue;
      if (globalPolicies[policy] === undefined || globalPolicies[policy] === null) {
        error(ctx, node, `Global routing policy ${policy} referenced on node ${node.name} does not exist`); continue;
      }
      policies[policy] = structuredClone(globalPolicies[policy]!);
    }
    const features = object(object(getDevice(String(node.device)).features)?.routing);
    const featurePolicy = object(features?.policy);
    for (const [policyName, raw] of Object.entries(policies)) {
      if (raw === null && globalPolicies[policyName] !== undefined) {
        policies[policyName] = structuredClone(globalPolicies[policyName]!);
      }
      const input = policies[policyName];
      let entries = Array.isArray(input) ? input : [input];
      const globalRaw = globalPolicies[policyName];
      if (globalRaw && input !== globalRaw) {
        const globalEntries = Array.isArray(globalRaw) ? globalRaw : [globalRaw];
        const localSequences = new Set(entries.map((entry, idx) => object(entry)?.sequence ?? (idx + 1) * 10));
        entries = [...entries, ...globalEntries.map((entry, idx) => {
          const rule = object(entry);
          return rule ? { sequence: (idx + 1) * 10, ...rule } : entry;
        }).filter((entry) => !localSequences.has(object(entry)?.sequence ?? -1))];
      }
      const normalized: JsonObject[] = [];
      for (const [index, entry] of entries.entries()) {
        const source = object(entry);
        if (!source) { error(ctx, node, `Invalid routing policy ${policyName} on node ${node.name}`); continue; }
        const rule: JsonObject = structuredClone(source);
        for (const [section, keys] of [["set", ["locpref", "med", "weight", "prepend"]], ["match", ["prefix", "nexthop", "aspath"]]] as const) {
          for (const key of keys) if (key in rule) {
            const values = object(rule[section]) ?? {};
            values[key] = rule[key]!; delete rule[key]; rule[section] = values;
          }
        }
        const match = object(rule.match);
        if (typeof match?.community === "string") match.community = { standard: match.community };
        const set = object(rule.set);
        if (typeof set?.prepend === "string" || typeof set?.prepend === "number") set.prepend = { path: String(set.prepend) };
        const community = object(set?.community);
        if (community?.delete || community?.delete_list) {
          if (rule.delete !== undefined) error(ctx, node, `Routing policy ${policyName} mixes legacy community deletion and delete`);
          const del = object(rule.delete) ?? {};
          if (community.delete_list) del.community = { list: { standard: community.delete_list } };
          else { const values = {...community}; delete values.delete; del.community = values; }
          rule.delete = del; delete set!.community;
        }
        if (set && Object.keys(set).length === 0) delete rule.set;
        const deletion = object(object(rule.delete)?.community);
        if (typeof deletion?.list === "string") deletion.list = { standard: deletion.list };
        rule.sequence ??= (index + 1) * 10;
        rule.action ??= "permit";
        if (!Number.isInteger(rule.sequence) || Number(rule.sequence) < 1 || Number(rule.sequence) > 32767 || !["permit", "deny"].includes(String(rule.action))) error(ctx, node, `Invalid action or sequence in routing policy ${policyName}`);
        if (rule.action === "deny" && (rule.set !== undefined || rule.delete !== undefined)) error(ctx, node, `Deny rule in routing policy ${policyName} cannot set or delete attributes`);
        for (const [key, max] of [["locpref", 4294967295], ["med", 32767], ["weight", 65535]] as const) {
          const value = object(rule.set)?.[key];
          if (value !== undefined && (typeof value !== "number" || !Number.isInteger(value) || value < 0 || value > max)) error(ctx, node, `Invalid set.${key} in routing policy ${policyName}`);
        }
        const prepend = object(object(rule.set)?.prepend);
        if (prepend && ((prepend.path !== undefined && typeof prepend.path !== "string") || (prepend.count !== undefined && (typeof prepend.count !== "number" || !Number.isInteger(prepend.count) || prepend.count < 1 || prepend.count > 32)))) error(ctx, node, `Invalid set.prepend in routing policy ${policyName}`);
        for (const section of ["set", "match", "delete"]) {
          const attrs = object(rule[section]);
          if (rule[section] !== undefined && !attrs) { error(ctx, node, `Invalid ${section} in routing policy ${policyName}`); continue; }
          for (const [key, value] of Object.entries(attrs ?? {})) {
            const sectionFeatures = object(featurePolicy?.[section]);
            const capability = sectionFeatures?.[key];
            if (!featurePolicy || !capability) { error(ctx, node, `Device ${node.device} does not support routing policy ${section}.${key} on node ${node.name}`); continue; }
            const supportedOptions = object(capability);
            const options = object(value);
            if (supportedOptions && options) for (const option of Object.keys(options)) {
              if (!supportedOptions[option]) error(ctx, node, `Device ${node.device} does not support routing policy ${section}.${key}.${option} on node ${node.name}`);
            }
          }
        }
        normalized.push(rule);
      }
      normalized.sort((a, b) => Number(a.sequence) - Number(b.sequence));
      if (new Set(normalized.map((rule) => rule.sequence)).size !== normalized.length) error(ctx, node, `Duplicate sequence in routing policy ${policyName}`);
      policies[policyName] = normalized;
      for (const rule of normalized) {
        const match = object(rule.match);
        const filterRefs: [string, JsonValue | undefined][] = [["prefix", match?.prefix], ["prefix", match?.nexthop], ["aspath", match?.aspath], ["community", match?.community], ["community", object(object(rule.delete)?.community)?.list]];
        for (const [kind, ref] of filterRefs) {
          const names = typeof ref === "string" ? [ref] : Object.values(object(ref) ?? {}).filter((v): v is string => typeof v === "string");
          for (const name of names) {
            const globals = object(globalRouting[kind]);
            let local = object(routing[kind]);
            if (!local) routing[kind] = local = {};
            if (local[name] === undefined || local[name] === null) {
              if (globals?.[name] === undefined || globals[name] === null) { error(ctx, node, `Routing ${kind} ${name} referenced by policy ${policyName} does not exist`); continue; }
              local[name] = structuredClone(globals[name]!);
            }
            if (kind === "prefix" && local[name] !== null) {
              const filter = Array.isArray(local[name]) ? local[name] as JsonValue[] : [local[name]!];
              local[name] = filter.map((entry, idx) => {
                const data = object(entry);
                if (!data) { error(ctx, node, `Invalid prefix filter ${name}`); return entry; }
                const result: JsonObject = { sequence: (idx + 1) * 10, action: "permit", ...data };
                if (typeof result.prefix === "string") {
                  const named = object(object(topology.prefix)?.[result.prefix]);
                  if (!named) error(ctx, node, `Unknown named prefix ${result.prefix}`);
                  else {
                    for (const af of ["ipv4", "ipv6"] as const) if (named[af] !== undefined) result[af] = [named[af]!];
                    delete result.prefix;
                  }
                }
                for (const af of ["ipv4", "ipv6"] as const) if (typeof result[af] === "string") result[af] = [result[af]!];
                return result;
              });
            }
          }
        }
      }
    }
  }
}
