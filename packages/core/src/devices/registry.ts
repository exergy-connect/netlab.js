import yaml from "js-yaml";
import type { DeviceDef, JsonObject } from "../types.js";
import { deepMerge } from "../data/merge.js";
import { DEVICE_YAML } from "./embedded-yaml.js";

const SUPPORTED = new Set(["none", "linux", "frr", "bird"]);

let cache: Record<string, DeviceDef> | undefined;

export function loadDevices(): Record<string, DeviceDef> {
  if (cache) return cache;
  const devices: Record<string, DeviceDef> = {};
  for (const name of SUPPORTED) {
    const text = DEVICE_YAML[name];
    if (!text) continue;
    const raw = yaml.load(text) as JsonObject;
    devices[name] = { ...raw, name };
  }
  // Inherit bird ← linux
  if (devices.bird && devices.linux) {
    devices.bird = deepMerge(devices.linux, {
      ...devices.bird,
      daemon: true,
      parent: "linux",
    });
  }
  // Apply clab overlays into features; drop non-clab provider blocks
  for (const d of Object.values(devices)) {
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
  cache = devices;
  return devices;
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
