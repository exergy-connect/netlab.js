import type {
  DiagnosticCollectorLike,
  Interface,
  JsonObject,
  Link,
  LinkInterface,
  Neighbor,
  Node,
  Topology,
} from "../types.js";
import { INTERNAL_LINKNAME } from "../types.js";
import { formatIfName } from "../nodes/nodes.js";
import { getDevice } from "../devices/registry.js";
import {
  allocateLinkPrefix,
  assignInterfaceAddresses,
  getDefaultLinkType,
} from "../addressing/ipam.js";

/** Port of adjust_link_object + adjust_link_list (canonical form). */
export function canonicalizeLinks(
  topology: Topology,
  diagnostics?: DiagnosticCollectorLike,
): Link[] {
  const nodes = topology.nodes ?? {};
  const raw = topology.links;
  if (!raw) return [];

  const list = Array.isArray(raw) ? raw : [];
  const out: Link[] = [];
  let cnt = 0;

  for (const item of list) {
    cnt++;
    const linkname = `links[${cnt}]`;
    const link = adjustLinkObject(item, linkname, nodes, diagnostics);
    if (!link) continue;
    if (link.disable === true) continue;
    link.linkindex = cnt;
    link[INTERNAL_LINKNAME] = linkname;
    delete link._linkname;
    out.push(link);
  }

  topology.links = out;
  return out;
}

function adjustLinkObject(
  l: unknown,
  linkname: string,
  nodes: Record<string, Node>,
  diagnostics?: DiagnosticCollectorLike,
): Link | null {
  if (typeof l === "string") {
    const interfaces: LinkInterface[] = [];
    for (const part of l.split("-")) {
      const n = part.trim();
      if (nodes[n]) interfaces.push({ node: n });
      else {
        diagnostics?.error({
          code: "VALUE",
          category: "VALUE",
          module: "links",
          message: `Link string ${l} in ${linkname} refers to an unknown node ${n}`,
        });
      }
    }
    return { interfaces, [INTERNAL_LINKNAME]: linkname };
  }

  if (Array.isArray(l)) {
    return {
      interfaces: adjustInterfaceList(l, nodes, diagnostics, linkname),
      [INTERNAL_LINKNAME]: linkname,
    };
  }

  if (l && typeof l === "object") {
    const obj = { ...(l as JsonObject) } as Link;
    if (Array.isArray(obj.interfaces)) {
      obj.interfaces = adjustInterfaceList(obj.interfaces, nodes, diagnostics, linkname);
      obj[INTERNAL_LINKNAME] = linkname;
      return obj;
    }

    const linkData: Link = { [INTERNAL_LINKNAME]: linkname };
    const linkIntf: LinkInterface[] = [];
    for (const [k, v] of Object.entries(obj)) {
      if (k in nodes) {
        const intf: LinkInterface =
          v && typeof v === "object" && !Array.isArray(v)
            ? { ...(v as LinkInterface), node: k }
            : { node: k };
        linkIntf.push(intf);
      } else {
        (linkData as JsonObject)[k] = v as never;
      }
    }
    linkData.interfaces = linkIntf;
    return linkData;
  }

  diagnostics?.error({
    code: "TYPE",
    category: "TYPE",
    module: "links",
    message: `Invalid type ${typeof l} for ${linkname}`,
  });
  return null;
}

function adjustInterfaceList(
  list: unknown[],
  nodes: Record<string, Node>,
  diagnostics: DiagnosticCollectorLike | undefined,
  linkname: string,
): LinkInterface[] {
  const out: LinkInterface[] = [];
  for (const item of list) {
    if (typeof item === "string") {
      if (!nodes[item]) {
        diagnostics?.error({
          code: "VALUE",
          category: "VALUE",
          module: "links",
          message: `Interface in ${linkname} refers to unknown node ${item}`,
        });
        continue;
      }
      out.push({ node: item });
    } else if (item && typeof item === "object" && !Array.isArray(item)) {
      const intf = item as LinkInterface;
      if (!intf.node || !nodes[intf.node]) {
        diagnostics?.error({
          code: "VALUE",
          category: "VALUE",
          module: "links",
          message: `Interface data in ${linkname} missing/unknown node`,
        });
        continue;
      }
      out.push(intf);
    }
  }
  return out;
}

export function transformLinks(topology: Topology): void {
  const nodes = topology.nodes ?? {};
  for (const link of topology.links ?? []) {
    setLinkTypeRole(link, nodes);
    const ifaces = link.interfaces ?? [];
    (link as JsonObject).node_count = ifaces.length;

    if ((link.type === "lan" || link.type === "stub") && !link.bridge) {
      const base = String(topology.name ?? "lab").slice(0, 10);
      link.bridge = `${base}_${link.linkindex ?? 1}`;
    }

    allocateLinkPrefix(topology, link);
    assignInterfaceAddresses(topology, link);

    for (const lif of ifaces) {
      const node = nodes[lif.node!];
      if (!node) continue;
      const def = getDevice(String(node.device ?? "frr"));
      const isVirtual = link.type === "loopback";
      let ifindex: number;
      let ifname: string;
      if (isVirtual) {
        ifindex = nextVirtualIfIndex(node, "loopback");
        const reduced = ifindex - 10000;
        const tmpl = String(
          (def as JsonObject).loopback_interface_name ??
            def.interface_name ??
            "Loopback{ifindex}",
        );
        ifname = formatIfName(tmpl, reduced);
        lif.virtual_interface = true;
      } else {
        ifindex = nextIfIndex(node);
        ifname = formatIfName(String(def.interface_name ?? "eth{ifindex}"), ifindex);
      }
      lif.ifindex = ifindex;
      lif.ifname = ifname;

      const neighbors: Neighbor[] = ifaces
        .filter((o) => o.node !== lif.node)
        .map((o) => {
          const n: Neighbor = { node: o.node ?? "" };
          if (o.ifname !== undefined) n.ifname = o.ifname;
          if (o.ipv4 !== undefined) n.ipv4 = o.ipv4;
          if (o.ipv6 !== undefined) n.ipv6 = o.ipv6;
          return n;
        });

      const nif: Interface = {
        ifindex,
        ifname,
        type: link.type ?? getDefaultLinkType(link),
        neighbors,
      };
      if (isVirtual) nif.virtual_interface = true;
      if (lif.ipv4 !== undefined) nif.ipv4 = lif.ipv4;
      if (lif.ipv6 !== undefined) nif.ipv6 = lif.ipv6;
      if (link.linkindex !== undefined) nif.linkindex = link.linkindex;
      if (link.role) nif.role = link.role;
      if (link.bridge) nif.bridge = link.bridge;

      if (link.ospf) nif.ospf = { ...(link.ospf as JsonObject) };
      if (link.vlan) nif.vlan = { ...(link.vlan as JsonObject) };
      if ((link as JsonObject).isis) nif.isis = { ...((link as JsonObject).isis as JsonObject) };
      if (lif.bgp !== undefined) nif.bgp = structuredClone(lif.bgp) as JsonObject;
      else if (link.bgp !== undefined) nif.bgp = structuredClone(link.bgp) as JsonObject;

      node.interfaces = node.interfaces ?? [];
      node.interfaces.push(nif);
    }
  }

  // Refresh node AF flags after interface addressing
  for (const node of Object.values(nodes)) {
    node.af = node.af ?? {};
    if (node.loopback?.ipv4 || (node.interfaces ?? []).some((i) => typeof i.ipv4 === "string")) {
      (node.af as JsonObject).ipv4 = true;
    }
    if (node.loopback?.ipv6 || (node.interfaces ?? []).some((i) => typeof i.ipv6 === "string")) {
      (node.af as JsonObject).ipv6 = true;
    }
  }
}

/** Port of set_link_type_role (subset). */
function setLinkTypeRole(link: Link, nodes: Record<string, Node>): void {
  const ifaces = link.interfaces ?? [];
  const nCount = ifaces.length;
  let routerCount = 0;
  for (const iface of ifaces) {
    const node = nodes[iface.node!];
    if (!node) continue;
    if (node.role !== "host") routerCount++;
  }

  if (
    !("role" in link) &&
    routerCount <= 1 &&
    link.type !== "loopback" &&
    !(link as JsonObject).vlan_name
  ) {
    link.role = "stub";
  }

  if (!link.type) {
    link.type = getDefaultLinkType(link);
  }

  void nCount;
}

function nextIfIndex(node: Node): number {
  const used = (node.interfaces ?? []).map((i) => i.ifindex ?? 0);
  let n = 1;
  while (used.includes(n)) n++;
  return n;
}

function nextVirtualIfIndex(node: Node, _kind: "loopback"): number {
  // loopback virtual interfaces start at 10001 (Netlab VIRTUAL_INTERFACE_TYPES)
  const used = (node.interfaces ?? []).map((i) => i.ifindex ?? 0);
  let n = 10001;
  while (used.includes(n)) n++;
  return n;
}
