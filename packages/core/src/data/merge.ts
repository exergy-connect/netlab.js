import type { JsonObject, JsonValue } from "../types.js";

function isPlainObject(v: JsonValue): v is JsonObject {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

/**
 * Deep merge: nested objects merge; scalars/lists from `overlay` replace.
 * Honors `_removed_attr` tombstones on the target (keys listed are not re-added).
 * Later/`overlay` wins on conflicts (Box `A + B` with B wins).
 */
export function deepMerge(base: JsonObject, overlay: JsonObject): JsonObject {
  const removed = new Set<string>(
    Array.isArray(base._removed_attr) ? (base._removed_attr as string[]) : [],
  );
  const out: JsonObject = { ...base };

  for (const [key, value] of Object.entries(overlay)) {
    if (key === "_removed_attr") {
      const extra = Array.isArray(value) ? (value as string[]) : [];
      out._removed_attr = [...removed, ...extra.filter((k) => !removed.has(k))];
      continue;
    }
    if (removed.has(key)) continue;

    const existing = out[key];
    if (isPlainObject(existing) && isPlainObject(value)) {
      out[key] = deepMerge(existing, value);
    } else {
      out[key] = cloneJson(value);
    }
  }
  return out;
}

export function cloneJson<T extends JsonValue>(value: T): T {
  return structuredClone(value);
}

/** Merge with removed-attribute semantics used by Netlab group/node data. */
export function mergeWithRemovedAttributes(target: JsonObject, source: JsonObject): JsonObject {
  return deepMerge(target, source);
}
