import type { ModuleHooks } from "./registry.js";
import type { JsonObject, Node, Topology, TransformContext } from "../types.js";

export const name = "ospf";

function normalizeArea(container: JsonObject): void {
  const ospf = container.ospf;
  if (!ospf || typeof ospf !== "object" || Array.isArray(ospf)) return;
  const area = ospf.area;
  if (typeof area !== "number" || !Number.isInteger(area) || area < 0 || area > 0xffffffff) return;
  ospf.area = [24, 16, 8, 0].map((shift) => (area >>> shift) & 255).join(".");
}

export function module_init(topology: Topology, _ctx: TransformContext): void {
  if (!topology.ospf) topology.ospf = {};
  normalizeArea(topology);
  for (const node of Object.values(topology.nodes ?? {})) {
    normalizeArea(node);
    for (const intf of node.interfaces ?? []) normalizeArea(intf);
  }
  for (const link of topology.links ?? []) {
    normalizeArea(link);
    for (const intf of link.interfaces ?? []) normalizeArea(intf);
  }
}

export function node_post_transform(node: Node, topology: Topology, _ctx: TransformContext): void {
  const ospf = ((node.ospf as JsonObject) ?? {}) as JsonObject;
  const global = (topology.ospf as JsonObject) ?? {};
  if (ospf.area === undefined) ospf.area = global.area ?? "0.0.0.0";

  // router_id from loopback ipv4 or node id
  if (!ospf.router_id) {
    const lb = node.loopback as JsonObject | undefined;
    const ipv4 = typeof lb?.ipv4 === "string" ? lb.ipv4.split("/")[0] : undefined;
    ospf.router_id = ipv4 ?? `10.0.0.${node.id ?? 1}`;
  }

  const hasV4 =
    (node.interfaces ?? []).some((i) => typeof i.ipv4 === "string") ||
    typeof (node.loopback as JsonObject | undefined)?.ipv4 === "string";
  const hasV6 =
    (node.interfaces ?? []).some((i) => typeof i.ipv6 === "string") ||
    typeof (node.loopback as JsonObject | undefined)?.ipv6 === "string";
  ospf.af = { ipv4: hasV4, ipv6: hasV6 };
  if (!(node.module ?? []).includes("bfd") || ospf.bfd === false) delete ospf.bfd;
  else if (ospf.bfd === true) {
    const bfd: JsonObject = {};
    if (hasV4) bfd.ipv4 = true;
    if (hasV6) bfd.ipv6 = true;
    if (Object.keys(bfd).length) ospf.bfd = bfd;
    else delete ospf.bfd;
  }

  // p2p interfaces → point-to-point; skip external/EBGP links; stub → passive
  for (const intf of node.interfaces ?? []) {
    normalizeArea(intf);
    if (intf.role === "external" || (intf as JsonObject).ospf === false) {
      delete intf.ospf;
      continue;
    }
    const io = ((intf.ospf as JsonObject) ?? {}) as JsonObject;
    if (io.area === undefined) io.area = ospf.area;
    if (!io.network_type && intf.type === "p2p") io.network_type = "point-to-point";
    if (intf.role === "stub" || intf.type === "stub") {
      if (io.passive === undefined) io.passive = true;
    } else if (io.passive === undefined) {
      io.passive = false;
    }
    if (ospf.bfd !== undefined) {
      const bfdEnabled = (node.module ?? []).includes("bfd");
      const configured = io.bfd === undefined ? ospf.bfd : io.bfd;
      const interfaceBfd = (intf as JsonObject).bfd;
      const interfaceDisabled = interfaceBfd === false ||
        (!!interfaceBfd && typeof interfaceBfd === "object" && !Array.isArray(interfaceBfd) && interfaceBfd.enabled === false);
      if (!bfdEnabled || interfaceDisabled || configured === false) delete io.bfd;
      else {
        const source = configured === true ? ospf.bfd : configured;
        const flags: JsonObject = source && typeof source === "object" && !Array.isArray(source)
          ? { ...source } : { ipv4: true, ipv6: true };
        for (const af of ["ipv4", "ipv6"]) if (!intf[af]) delete flags[af];
        if (flags.ipv4 || flags.ipv6) io.bfd = flags;
        else delete io.bfd;
      }
    }
    intf.ospf = io;
  }

  if (node.loopback) {
    const lb = node.loopback as JsonObject;
    const lo = ((lb.ospf as JsonObject) ?? {}) as JsonObject;
    if (lo.area === undefined) lo.area = ospf.area;
    if (lo.passive === undefined) lo.passive = false;
    lb.ospf = lo;
  }

  node.ospf = ospf;
}

const hooks: ModuleHooks = {
  name,
  module_init,
  node_post_transform,
};
export default hooks;
// named re-exports already above
