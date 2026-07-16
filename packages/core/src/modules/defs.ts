import yaml from "js-yaml";
import type { JsonObject } from "../types.js";
import { MODULE_YAML } from "./embedded-yaml.js";

/** Meta keys never merged from defaults into topology/node module params (Netlab). */
export const MODULE_META_KEYS = [
  "attributes",
  "extra_attributes",
  "features",
  "hooks",
  "requires",
  "supported_on",
  "no_propagate",
  "config_after",
  "transform_after",
  "warnings",
  "_top",
] as const;

export type ModuleDef = JsonObject & {
  requires?: string[];
  transform_after?: string[];
  config_after?: string[];
  no_propagate?: string[] | Record<string, unknown>;
  attributes?: JsonObject & { node_copy?: string[] };
};

const SUPPORTED = ["vlan", "vrf", "vxlan", "ospf", "isis", "bgp", "evpn"] as const;

let cache: Record<string, ModuleDef> | undefined;

export function supportedModuleNames(): readonly string[] {
  return SUPPORTED;
}

export function loadModuleDefs(): Record<string, ModuleDef> {
  if (cache) return cache;
  const defs: Record<string, ModuleDef> = {};
  for (const name of SUPPORTED) {
    const text = MODULE_YAML[name];
    if (!text) continue;
    const raw = (yaml.load(text) as JsonObject) ?? {};
    defs[name] = raw as ModuleDef;
  }
  cache = defs;
  return defs;
}

export function getModuleDef(name: string): ModuleDef | undefined {
  return loadModuleDefs()[name];
}

/** Normalize no_propagate list or BGP-style map keys. */
export function moduleNoPropagate(def: ModuleDef | undefined): string[] {
  if (!def) return [...MODULE_META_KEYS];
  const raw = def.no_propagate;
  let keys: string[] = [];
  if (Array.isArray(raw)) {
    keys = raw.map(String);
  } else if (raw && typeof raw === "object") {
    keys = Object.keys(raw);
  }
  // Keys whose name contains "no_propagate" (e.g. vlan_no_propagate) are also stripped
  for (const k of Object.keys(def)) {
    if (k.includes("no_propagate") && k !== "no_propagate") keys.push(k);
  }
  return [...MODULE_META_KEYS, ...keys];
}

/** Strip meta / no_propagate keys from a module defaults object for merge into topology/node. */
export function stripModuleMeta(def: ModuleDef | undefined): JsonObject {
  if (!def) return {};
  const out: JsonObject = { ...def };
  for (const key of moduleNoPropagate(def)) delete out[key];
  return out;
}

export function moduleRequires(name: string): string[] {
  const def = getModuleDef(name);
  const r = def?.requires;
  return Array.isArray(r) ? r.map(String) : [];
}

export function moduleTransformAfter(name: string): string[] {
  const def = getModuleDef(name);
  const t = def?.transform_after;
  return Array.isArray(t) ? t.map(String) : [];
}

export function moduleNodeCopy(name: string): string[] {
  const attrs = getModuleDef(name)?.attributes;
  const copy = attrs && typeof attrs === "object" ? attrs.node_copy : undefined;
  return Array.isArray(copy) ? copy.map(String) : [];
}

/** Full module YAML blobs for inclusion under topology.defaults. */
export function moduleDefaultsForSystem(): Record<string, JsonObject> {
  const defs = loadModuleDefs();
  const out: Record<string, JsonObject> = {};
  for (const [name, def] of Object.entries(defs)) {
    out[name] = { ...def };
  }
  return out;
}

/** Test helper */
export function _resetModuleDefCache(): void {
  cache = undefined;
}
