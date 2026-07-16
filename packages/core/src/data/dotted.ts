import type { JsonObject, JsonValue } from "../types.js";
import { deepMerge } from "./merge.js";

function isPlainObject(v: JsonValue): v is JsonObject {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

/**
 * Expand dotted keys into nested objects (python-box `box_dots=True` / Netlab YAML).
 * Example: `{ "bgp.as": 65000 }` → `{ bgp: { as: 65000 } }`.
 */
export function expandDottedKeys(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return value.map((item) => expandDottedKeys(item));
  }
  if (!isPlainObject(value)) {
    return value;
  }

  const out: JsonObject = {};
  for (const [key, raw] of Object.entries(value)) {
    assignDotted(out, key, expandDottedKeys(raw));
  }
  return out;
}

function assignDotted(target: JsonObject, key: string, value: JsonValue): void {
  if (!key.includes(".")) {
    mergeAssign(target, key, value);
    return;
  }

  const parts = key.split(".");
  let cur = target;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]!;
    const existing = cur[part];
    if (existing === undefined || existing === null || !isPlainObject(existing)) {
      // Descend through missing/null/scalar parents (Netlab topologies use this freely).
      cur[part] = {};
    }
    cur = cur[part] as JsonObject;
  }
  mergeAssign(cur, parts[parts.length - 1]!, value);
}

function mergeAssign(target: JsonObject, key: string, value: JsonValue): void {
  const existing = target[key];
  if (isPlainObject(existing) && isPlainObject(value)) {
    target[key] = deepMerge(existing, value);
  } else {
    target[key] = value;
  }
}

/** Replace `target` contents with a dotted-key-expanded copy (keeps the same object reference). */
export function expandDottedKeysInPlace(target: JsonObject): void {
  const expanded = expandDottedKeys(target) as JsonObject;
  for (const key of Object.keys(target)) {
    delete target[key];
  }
  Object.assign(target, expanded);
}
