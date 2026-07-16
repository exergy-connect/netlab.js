import type { JsonObject, JsonValue } from "../types.js";

/** Get a dotted path value (Box-like). */
export function getPath(obj: JsonObject, path: string): JsonValue | undefined {
  if (!path) return obj;
  const parts = path.split(".");
  let cur: JsonValue = obj;
  for (const p of parts) {
    if (cur === null || cur === undefined || typeof cur !== "object" || Array.isArray(cur)) {
      return undefined;
    }
    cur = (cur as JsonObject)[p];
  }
  return cur;
}

/** Set a dotted path, auto-creating intermediate objects. */
export function setPath(obj: JsonObject, path: string, value: JsonValue): void {
  const parts = path.split(".");
  let cur: JsonObject = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i]!;
    const next = cur[p];
    if (next === null || next === undefined || typeof next !== "object" || Array.isArray(next)) {
      cur[p] = {};
    }
    cur = cur[p] as JsonObject;
  }
  cur[parts[parts.length - 1]!] = value;
}

export function hasPath(obj: JsonObject, path: string): boolean {
  return getPath(obj, path) !== undefined;
}

export function deletePath(obj: JsonObject, path: string): void {
  const parts = path.split(".");
  let cur: JsonObject = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const next = cur[parts[i]!];
    if (next === null || next === undefined || typeof next !== "object" || Array.isArray(next)) {
      return;
    }
    cur = next as JsonObject;
  }
  delete cur[parts[parts.length - 1]!];
}
