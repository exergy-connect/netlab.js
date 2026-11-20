import type { JsonObject } from "../types.js";
import { moduleDefaultsForSystem } from "../modules/defs.js";
import { DEFAULTS_DATA } from "./embedded-data.js";

/** Built-in system defaults (subset of Netlab topology-defaults + module defaults). */
export function systemDefaults(): JsonObject {
  return {
    device: "frr",
    provider: "clab",
    ...structuredClone(DEFAULTS_DATA),
    ...moduleDefaultsForSystem(),
  };
}
