import type { JsonObject, Node, Topology, TransformContext } from "../types.js";
import { getDevice } from "../devices/registry.js";
import { deepMerge } from "../data/merge.js";

export const name = "sr";

export function node_post_transform(node: Node, topology: Topology, ctx: TransformContext): void {
  const device = getDevice(String(node.device ?? ""));
  const sr = deepMerge((device.sr as JsonObject) ?? {}, (node.sr as JsonObject) ?? {});
  const protocols = Array.isArray(sr.protocol) ? sr.protocol : ["isis"];
  sr.protocol = protocols;
  const srgb = sr.srgb as JsonObject | undefined;
  if (srgb) {
    for (const [start, size, end] of [["start", "size", "_end"], ["dyn_start", "dyn_size", "_dyn_end"]]) {
      if (typeof srgb[start!] !== "number") continue;
      srgb[size!] ??= 8000;
      if (typeof srgb[size!] === "number") srgb[end!] = (srgb[start!] as number) + (srgb[size!] as number) - 1;
    }
  }
  const features = ((device.features as JsonObject | undefined)?.sr ?? {}) as JsonObject;
  let valid = true;
  for (const protocol of protocols) {
    const mod = protocol === "ospfv2" ? "ospf" : protocol;
    if (Array.isArray(features.protocol) && !features.protocol.includes(protocol)) {
      ctx.diagnostics.error({ code: "TYPE", category: "TYPE", module: "sr", message: `Device ${node.device} (node ${node.name}) does not support ${protocol} with SR-MPLS` });
      valid = false;
    } else if (typeof mod === "string" && !(node.module ?? []).includes(mod)) {
      ctx.diagnostics.error({ code: "MISSING", category: "MISSING", module: "sr", message: `SR-MPLS on node ${node.name} uses ${protocol} without ${mod} configuration module` });
      valid = false;
    }
  }
  const nodeAf = (node.af ?? {}) as JsonObject;
  const af = (sr.af ?? { ...nodeAf }) as JsonObject;
  sr.af = af;
  const sid = (sr.node_sid ?? {}) as JsonObject;
  sr.node_sid = sid;
  const offsets = ((topology.sr as JsonObject | undefined)?.node_sid_offset ?? {}) as JsonObject;
  if (valid) for (const family of ["ipv4", "ipv6"]) {
    if (!af[family] || !nodeAf[family]) continue;
    if (Array.isArray(features.af) && !features.af.includes(family)) {
      ctx.diagnostics.error({ code: "VALUE", category: "VALUE", module: "sr", message: `Device ${node.device} (node ${node.name}) does not support SR-MPLS for ${family}` });
    } else if (family === "ipv6" && !protocols.includes("isis")) {
      ctx.diagnostics.error({ code: "MISSING", category: "MISSING", module: "sr", message: `${family} address family is not supported by the SR-MPLS protocol(s) used on ${node.name}` });
    } else if (sid[family] == null && typeof node.id === "number") {
      sid[family] = node.id + (typeof offsets[family] === "number" ? offsets[family] as number : family === "ipv6" ? 100 : 0);
    }
  }
  node.sr = sr;
}
