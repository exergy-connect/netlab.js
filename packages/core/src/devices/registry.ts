import yaml from "js-yaml";
import type { DeviceDef, JsonObject } from "../types.js";
import { SUPPORTED_DEVICES } from "../types.js";
import { deepMerge } from "../data/merge.js";
import { DAEMON_YAML, DEVICE_YAML } from "./embedded-yaml.js";

const SUPPORTED = new Set<string>(SUPPORTED_DEVICES);

let cache: Record<string, DeviceDef> | undefined;

function loadYamlMap(src: Record<string, string>): Record<string, DeviceDef> {
  const out: Record<string, DeviceDef> = {};
  for (const [name, text] of Object.entries(src)) {
    const parsed = (yaml.load(text) as JsonObject) ?? {};
    out[name] = { ...parsed, name };
  }
  return out;
}

/** Port of netsim.augment.devices.merge_daemons */
function mergeDaemons(
  devices: Record<string, DeviceDef>,
  daemons: Record<string, DeviceDef>,
): void {
  for (const [dname, ddef] of Object.entries(daemons)) {
    if (devices[dname]) {
      throw new Error(`duplicate name ${dname} for a device and a daemon`);
    }
    const merged: DeviceDef = { ...ddef, name: dname, daemon: true };
    if (!merged.parent) merged.parent = "linux";
    devices[dname] = merged;
  }
}

function resolveParents(raw: Record<string, DeviceDef>): Record<string, DeviceDef> {
  const resolved: Record<string, DeviceDef> = {};
  const visiting = new Set<string>();

  function resolve(name: string): DeviceDef {
    if (resolved[name]) return resolved[name]!;
    if (visiting.has(name)) return raw[name] ?? { name };
    visiting.add(name);
    const def = raw[name] ?? { name };
    const parent = typeof def.parent === "string" ? def.parent : undefined;
    let merged: DeviceDef = { ...def, name };
    if (parent && raw[parent]) {
      const base = resolve(parent);
      merged = deepMerge(base, { ...def, name }) as DeviceDef;
      if (def.daemon !== undefined) merged.daemon = def.daemon;
      merged.parent = parent;
    }
    visiting.delete(name);
    resolved[name] = merged;
    return merged;
  }

  for (const name of Object.keys(raw)) resolve(name);
  return resolved;
}

export function loadDevices(): Record<string, DeviceDef> {
  if (cache) return cache;
  const devices = loadYamlMap(DEVICE_YAML);
  mergeDaemons(devices, loadYamlMap(DAEMON_YAML));
  const resolved = resolveParents(devices);

  // Apply clab feature overlays; drop non-clab provider blocks from runtime defs
  for (const d of Object.values(resolved)) {
    if (d.clab && typeof d.clab === "object") {
      const clab = d.clab as JsonObject;
      if (clab.features) {
        d.features = deepMerge((d.features as JsonObject) ?? {}, clab.features as JsonObject);
      }
    }
    delete d.libvirt;
    delete d.virtualbox;
    delete d.external;
  }
  cache = resolved;
  return resolved;
}

export function getDevice(name: string): DeviceDef {
  const devices = loadDevices();
  return devices[name] ?? { name, interface_name: "eth{ifindex}", role: "router" };
}

export function isSupportedDevice(name: string): boolean {
  return SUPPORTED.has(name);
}

export function buildModuleSupportLists(devices: Record<string, DeviceDef>): Record<string, string[]> {
  const support: Record<string, string[]> = {};
  for (const [dname, def] of Object.entries(devices)) {
    if (def._meta_device) continue;
    const features = (def.features ?? {}) as JsonObject;
    for (const mod of Object.keys(features)) {
      if (features[mod] === false) continue;
      support[mod] = support[mod] ?? [];
      if (!support[mod]!.includes(dname)) support[mod]!.push(dname);
    }
  }
  return support;
}

/** Test helper */
export function _resetDeviceCache(): void {
  cache = undefined;
}
