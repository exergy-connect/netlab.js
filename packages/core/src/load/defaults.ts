import yaml from "js-yaml";
import type { JsonObject } from "../types.js";
import { moduleDefaultsForSystem } from "../modules/defs.js";
import { DEFAULTS_YAML } from "./embedded-yaml.js";

function loadDefaultYaml(name: string): JsonObject {
  const text = DEFAULTS_YAML[name];
  if (!text) return {};
  const raw = yaml.load(text);
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  return raw as JsonObject;
}

/** Built-in system defaults (subset of Netlab topology-defaults + module YAML). */
export function systemDefaults(): JsonObject {
  return {
    device: "frr",
    provider: "clab",
    addressing: loadDefaultYaml("addressing"),
    ...moduleDefaultsForSystem(),
  };
}
