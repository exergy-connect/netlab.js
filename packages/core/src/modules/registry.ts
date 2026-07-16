import type { JsonObject, Node, Topology, TransformContext } from "../types.js";
import { deepMerge } from "../data/merge.js";
import * as vlanMod from "./vlan.js";
import * as vrfMod from "./vrf.js";
import * as ospfMod from "./ospf.js";
import * as isisMod from "./isis.js";
import * as bgpMod from "./bgp.js";

export type ModuleHooks = {
  name: string;
  requires?: string[];
  transform_after?: string[];
  module_init?: (topology: Topology, ctx: TransformContext) => void;
  module_pre_transform?: (topology: Topology, ctx: TransformContext) => void;
  node_pre_transform?: (node: Node, topology: Topology, ctx: TransformContext) => void;
  node_post_transform?: (node: Node, topology: Topology, ctx: TransformContext) => void;
  module_post_transform?: (topology: Topology, ctx: TransformContext) => void;
  link_pre_transform?: (link: JsonObject, topology: Topology, ctx: TransformContext) => void;
  link_post_transform?: (link: JsonObject, topology: Topology, ctx: TransformContext) => void;
};

function asHooks(m: {
  name: string;
  requires?: string[];
  transform_after?: string[];
  module_init?: ModuleHooks["module_init"];
  module_pre_transform?: ModuleHooks["module_pre_transform"];
  node_pre_transform?: ModuleHooks["node_pre_transform"];
  node_post_transform?: ModuleHooks["node_post_transform"];
  module_post_transform?: ModuleHooks["module_post_transform"];
  link_pre_transform?: ModuleHooks["link_pre_transform"];
  link_post_transform?: ModuleHooks["link_post_transform"];
}): ModuleHooks {
  return m;
}

const MODULES: ModuleHooks[] = [
  asHooks(vlanMod),
  asHooks(vrfMod),
  asHooks(ospfMod),
  asHooks(isisMod),
  asHooks(bgpMod),
];

export function listModules(): ModuleHooks[] {
  return MODULES;
}

export function sortModules(names: string[]): string[] {
  const byName = new Map(MODULES.map((m) => [m.name, m]));
  const result: string[] = [];
  const visiting = new Set<string>();
  const done = new Set<string>();

  function visit(n: string): void {
    if (done.has(n)) return;
    if (visiting.has(n)) return;
    visiting.add(n);
    const mod = byName.get(n);
    for (const dep of [...(mod?.requires ?? []), ...(mod?.transform_after ?? [])]) {
      if (names.includes(dep)) visit(dep);
    }
    visiting.delete(n);
    done.add(n);
    result.push(n);
  }

  for (const n of names) visit(n);
  return result;
}

export function collectTopologyModules(topology: Topology): string[] {
  const set = new Set<string>(topology.module ?? []);
  for (const node of Object.values(topology.nodes ?? {})) {
    for (const m of node.module ?? []) set.add(m);
  }
  return sortModules([...set]);
}

export function mergeModuleParams(topology: Topology): void {
  const defaults = (topology.defaults ?? {}) as JsonObject;
  for (const m of collectTopologyModules(topology)) {
    const modDefault = (defaults[m] as JsonObject) ?? {};
    const topoMod = (topology[m] as JsonObject) ?? {};
    topology[m] = deepMerge(modDefault, topoMod);
    for (const node of Object.values(topology.nodes ?? {})) {
      if (!(node.module ?? []).includes(m)) continue;
      const nodeMod = (node[m] as JsonObject) ?? {};
      node[m] = deepMerge(topology[m] as JsonObject, nodeMod);
    }
  }
}

export function runModuleHook(
  hook: keyof ModuleHooks,
  topology: Topology,
  ctx: TransformContext,
): void {
  const names = collectTopologyModules(topology);
  for (const name of names) {
    const mod = MODULES.find((m) => m.name === name);
    if (!mod) continue;
    const fn = mod[hook];
    if (typeof fn !== "function") continue;
    if (hook.startsWith("node_")) {
      for (const node of Object.values(topology.nodes ?? {})) {
        if ((node.module ?? []).includes(name)) {
          (fn as (n: Node, t: Topology, c: TransformContext) => void)(node, topology, ctx);
        }
      }
    } else if (hook.startsWith("link_")) {
      for (const link of topology.links ?? []) {
        (fn as (l: JsonObject, t: Topology, c: TransformContext) => void)(link, topology, ctx);
      }
    } else {
      (fn as (t: Topology, c: TransformContext) => void)(topology, ctx);
    }
  }
}

export function copyNodeModuleAttrsToInterfaces(topology: Topology): void {
  const copyMap: Record<string, string[]> = {
    ospf: ["area", "passive", "network_type", "cost"],
    isis: ["network_type", "metric", "passive"],
  };
  for (const node of Object.values(topology.nodes ?? {})) {
    for (const [mod, attrs] of Object.entries(copyMap)) {
      if (!(node.module ?? []).includes(mod)) continue;
      const src = (node[mod] as JsonObject) ?? {};
      for (const intf of node.interfaces ?? []) {
        const dst = ((intf[mod] as JsonObject) ?? {}) as JsonObject;
        for (const a of attrs) {
          if (dst[a] === undefined && src[a] !== undefined) dst[a] = src[a]!;
        }
        intf[mod] = dst;
      }
    }
  }
}
