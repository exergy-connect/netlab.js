import type { JsonObject } from "../types.js";

/** Read defaults.attributes (from data/defaults/attributes.yml). */
export function getAttributes(defaults: JsonObject | undefined): JsonObject {
  const attrs = defaults?.attributes;
  if (attrs && typeof attrs === "object" && !Array.isArray(attrs)) {
    return attrs as JsonObject;
  }
  return {};
}

function objectKeys(obj: unknown): string[] {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return [];
  return Object.keys(obj as object);
}

function stringList(v: unknown): string[] {
  return Array.isArray(v) ? v.map(String) : [];
}

/**
 * Netlab get_link_propagate_attributes:
 * attributes.link ∪ attributes.link_internal − attributes.link_no_propagate
 */
export function getLinkPropagateAttributes(defaults: JsonObject | undefined): Set<string> {
  const attrs = getAttributes(defaults);
  const link = objectKeys(attrs.link);
  const internal = objectKeys(attrs.link_internal);
  const noPropagate = new Set(stringList(attrs.link_no_propagate));
  const out = new Set<string>([...link, ...internal]);
  for (const k of noPropagate) out.delete(k);
  return out;
}

export function getLinkModuleNoPropagate(defaults: JsonObject | undefined): Set<string> {
  return new Set(stringList(getAttributes(defaults).link_module_no_propagate));
}

export function getPoolNoCopy(defaults: JsonObject | undefined): Set<string> {
  return new Set(stringList(getAttributes(defaults).pool_no_copy));
}
