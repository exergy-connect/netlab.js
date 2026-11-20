import ipaddr from "ipaddr.js";
import type { JsonObject, Node, Topology, TransformContext } from "../types.js";
import { deepMerge } from "../data/merge.js";
import { getDevice } from "../devices/registry.js";

export const name = "gateway";

function object(value: unknown): JsonObject {
  return value && typeof value === "object" && !Array.isArray(value) ? value as JsonObject : {};
}

function address(cidr: string, id: number): string {
  const [ip, length] = ipaddr.parseCIDR(cidr);
  const bits = ip.kind() === "ipv4" ? 32 : 128;
  let value = 0n;
  for (const byte of ip.toByteArray()) value = (value << 8n) | BigInt(byte);
  const hostBits = BigInt(bits - length);
  const base = (value >> hostBits) << hostBits;
  let result = base + (id < 0 ? (1n << hostBits) + BigInt(id) : BigInt(id));
  const bytes = new Array<number>(bits / 8);
  for (let i = bytes.length - 1; i >= 0; i--) { bytes[i] = Number(result & 255n); result >>= 8n; }
  return `${ipaddr.fromByteArray(bytes).toString()}/${length}`;
}

export function link_pre_transform(link: JsonObject, topology: Topology, ctx: TransformContext): void {
  const ends = (link.interfaces ?? []) as JsonObject[];
  if (link.gateway === undefined && ends.some(i => i.gateway !== undefined && i.gateway !== false)) {
    link.gateway = true;
    for (const end of ends) if (end.gateway === undefined) end.gateway = false;
  }
  if (link.gateway === undefined || link.gateway === false) return;
  const defaults = object(object(topology.defaults).gateway);
  const gateway = deepMerge(deepMerge(defaults, object(topology.gateway)), object(link.gateway));
  for (const key of ["attributes", "features", "no_propagate", "transform_after", "config_after"]) delete gateway[key];
  if (gateway.protocol !== "anycast" && gateway.protocol !== "vrrp") {
    ctx.diagnostics.error({ module: name, code: "VALUE", category: "VALUE", message: `Unknown gateway protocol ${gateway.protocol}` });
  }
  if (typeof gateway.id !== "number" || !Number.isInteger(gateway.id) || gateway.id === -1) {
    ctx.diagnostics.error({ module: name, code: "VALUE", category: "VALUE", message: "Gateway ID must be an integer other than -1" });
  }
  link.gateway = gateway;
}

export function module_post_link_transform(topology: Topology): void {
  for (const link of topology.links ?? []) {
    if (!link.gateway || typeof link.gateway !== "object") continue;
    const gateway = structuredClone(link.gateway as JsonObject);
    const prefix = object(link.prefix);
    for (const af of ["ipv4", "ipv6"]) {
      if (gateway[af] === undefined && typeof prefix[af] === "string" && typeof gateway.id === "number") {
        gateway[af] = address(prefix[af] as string, gateway.id);
      }
    }
    link.gateway = gateway;
    for (const end of link.interfaces ?? []) {
      const node = topology.nodes?.[String(end.node)];
      if (!node || end.gateway === false) continue;
      const sviName = object(link.vlan).access;
      const intf = sviName && node.module?.includes("vlan")
        ? node.interfaces?.find(i => i.type === "svi" && i.vlan?.name === sviName)
        : node.interfaces?.find(i => i.linkindex === link.linkindex);
      if (!intf) continue;
      if (node.module?.includes(name)) {
        intf.gateway = deepMerge(gateway, object(end.gateway));
        if (gateway.protocol === "anycast" && object(gateway.anycast).unicast === false) delete intf.ipv4;
      } else {
        const hostGateway: JsonObject = {};
        for (const af of ["ipv4", "ipv6"]) if (typeof gateway[af] === "string") hostGateway[af] = (gateway[af] as string).split("/")[0]!;
        intf.gateway = hostGateway;
      }
    }
  }
}

/** Finalize protocol-specific interface data after VLAN interfaces exist. */
export function node_post_transform(node: Node, _topology: Topology, ctx: TransformContext): void {
  const supported = object(object(getDevice(String(node.device ?? "none")).features).gateway).protocol;
  const checked = new Set<string>();
  for (const intf of node.interfaces ?? []) {
    if (!intf.gateway || typeof intf.gateway !== "object") continue;
    const gateway = intf.gateway as JsonObject;
    const protocol = String(gateway.protocol ?? "");
    if (!checked.has(protocol)) {
      checked.add(protocol);
      if (!Array.isArray(supported) || !supported.includes(protocol)) {
        ctx.diagnostics.error({ module: name, code: "VALUE", category: "VALUE", message: `Node ${node.name} (${node.device}) does not support gateway protocol ${protocol}` });
      }
    }
    for (const other of ["anycast", "vrrp"]) if (other !== protocol) delete gateway[other];
    if (protocol !== "vrrp") continue;
    const settings = deepMerge(object(object(node.gateway).vrrp), object(gateway.vrrp));
    const group = settings.group;
    if (typeof group !== "number" || !Number.isInteger(group) || group < 1 || group > 255) {
      ctx.diagnostics.error({ module: name, code: "VALUE", category: "VALUE", message: `VRRP group on ${node.name} must be an integer from 1 to 255` });
      continue;
    }
    const hex = group.toString(16).padStart(2, "0");
    const mac: JsonObject = {};
    if (gateway.ipv4 !== undefined) mac.ipv4 = `00:00:5e:00:01:${hex}`;
    if (gateway.ipv6 !== undefined) {
      mac.ipv6 = `00:00:5e:00:02:${hex}`;
      settings.lla = `fe80::200:5eff:fe00:02${hex}`;
    }
    settings.mac = mac;
    gateway.vrrp = settings;
  }
}
