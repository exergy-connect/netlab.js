import type { DiagnosticCollectorLike, JsonObject, Node, Topology } from "../types.js";
import { SUPPORTED_DEVICES } from "../types.js";
import { getDevice } from "../devices/registry.js";
import { allocateNthFromPool, hostInSubnet } from "../addressing/ipam.js";

/** Port of netsim.augment.nodes.create_node_dict */
export function createNodeDict(
  nodes: unknown,
  diagnostics?: DiagnosticCollectorLike,
): Record<string, Node> {
  let nodeDict: Record<string, Node>;

  if (nodes && typeof nodes === "object" && !Array.isArray(nodes)) {
    nodeDict = { ...(nodes as Record<string, Node>) };
  } else {
    nodeDict = {};
    for (const n of (nodes as unknown[]) ?? []) {
      if (typeof n === "string") {
        nodeDict[n] = { name: n };
      } else if (n && typeof n === "object" && !Array.isArray(n)) {
        const obj = n as Node;
        if (!obj.name) {
          diagnostics?.error({
            code: "VALUE",
            category: "VALUE",
            module: "nodes",
            message: `Node is missing a "name" attribute: ${JSON.stringify(n)}`,
          });
          continue;
        }
        nodeDict[obj.name] = obj;
      }
    }
  }

  for (const name of Object.keys(nodeDict)) {
    let ndata = nodeDict[name];
    if (ndata === null || ndata === undefined) {
      ndata = { name };
    } else if (typeof ndata !== "object" || Array.isArray(ndata)) {
      diagnostics?.error({
        code: "TYPE",
        category: "TYPE",
        module: "nodes",
        message: `Node data for node ${name} must be a dictionary`,
      });
      ndata = { name, extra: ndata as unknown as never };
    } else {
      ndata = { ...ndata, name };
    }
    if (!Array.isArray(ndata.interfaces)) ndata.interfaces = [];
    nodeDict[name] = ndata;
  }

  return nodeDict;
}

export function assignNodeIds(topology: Topology): void {
  const used = new Set<number>();
  for (const node of Object.values(topology.nodes ?? {})) {
    if (typeof node.id === "number") used.add(node.id);
  }
  let next = 1;
  for (const node of Object.values(topology.nodes ?? {})) {
    if (typeof node.id === "number") continue;
    while (used.has(next)) next++;
    node.id = next;
    used.add(next);
    next++;
  }
}

export function applyNodeDeviceDefaults(topology: Topology, diagnostics?: DiagnosticCollectorLike): void {
  const defaultDevice = String((topology.defaults as JsonObject)?.device ?? "frr");
  const allowed = SUPPORTED_DEVICES as readonly string[];
  for (const node of Object.values(topology.nodes ?? {})) {
    if (!node.device) node.device = defaultDevice;
    let device = String(node.device);
    if (!allowed.includes(device)) {
      diagnostics?.warning({
        code: "VALUE",
        category: "VALUE",
        module: "nodes",
        message: `Unsupported device '${device}' on node ${node.name}; using frr (allowed: ${allowed.join(", ")})`,
        path: `nodes.${node.name}.device`,
      });
      device = "frr";
      node.device = device;
    }
    const def = getDevice(device);
    if (!node.role) node.role = String(def.role ?? "router");
    if (def.daemon) {
      node["netlab-internal:_daemon"] = true;
      if (def.parent) node["netlab-internal:_daemon_parent"] = def.parent;
    }
  }
}

export function transformNodes(topology: Topology): void {
  assignNodeIds(topology);
  const mgmtPool = ((topology.addressing as JsonObject)?.mgmt ?? {}) as JsonObject;
  const mgmtBase = String(mgmtPool.ipv4 ?? "192.168.121.0/24");
  const mgmtStart = Number(mgmtPool.start ?? 100);

  for (const node of Object.values(topology.nodes ?? {})) {
    const id = node.id ?? 1;
    const def = getDevice(String(node.device ?? "frr"));
    const ifindexOffset = Number((def as JsonObject).ifindex_offset ?? 1);
    const mgmtIf =
      def.mgmt_if !== undefined
        ? String(def.mgmt_if)
        : formatIfName(String(def.interface_name ?? "eth{ifindex}"), ifindexOffset - 1);
    node.mgmt = {
      ifname: mgmtIf || "eth0",
      ipv4: nthHost(mgmtBase, mgmtStart + id),
      mac: macFromId(String(mgmtPool.mac ?? "CA-FE-00-00-00-00"), id),
    };

    if (node.role === "router" || node.role === "gateway" || !node.role) {
      const loName = formatIfName(String(def.loopback_interface_name ?? "lo{ifindex}"), 0);
      const prefix = allocateNthFromPool(topology, "loopback", id);
      const loopback: JsonObject = {
        ifindex: 0,
        ifname: loName || "lo",
        type: "loopback",
        virtual_interface: true,
        neighbors: [],
      };
      if (typeof prefix.ipv4 === "string") {
        // /32 → use prefix as address; larger → host 1
        loopback.ipv4 = prefix.ipv4.endsWith("/32") ? prefix.ipv4 : hostInSubnet(prefix.ipv4, 1);
      }
      if (typeof prefix.ipv6 === "string") {
        loopback.ipv6 = prefix.ipv6.endsWith("/128") ? prefix.ipv6 : hostInSubnet(prefix.ipv6, 1);
      }
      node.loopback = loopback;
    }

    node.af = node.af ?? {};
    if (node.loopback?.ipv4 || (node.interfaces ?? []).some((i) => i.ipv4)) {
      (node.af as JsonObject).ipv4 = true;
    }
    if (node.loopback?.ipv6 || (node.interfaces ?? []).some((i) => i.ipv6)) {
      (node.af as JsonObject).ipv6 = true;
    }
  }
}

export function formatIfName(template: string, ifindex: number): string {
  // Minimal Jinja-like: eth{ifindex} and lo{ifindex if ifindex else ""}
  if (template.includes("if ifindex else")) {
    return ifindex ? template.replace(/\{ifindex if ifindex else ""\}/g, String(ifindex)) : template.replace(/lo\{ifindex if ifindex else ""\}/g, "lo").replace(/\{ifindex if ifindex else ""\}/g, "");
  }
  return template.replace(/\{ifindex\}/g, String(ifindex));
}

function nthHost(cidr: string, host: number): string {
  const addr = nthHostAddress(cidr, host);
  return addr; // mgmt often without mask in Netlab
}

function nthHostAddress(cidr: string, host: number): string {
  const [base, ,] = parseV4(cidr);
  const n = (base & 0xffffffff) + host;
  return [
    (n >>> 24) & 0xff,
    (n >>> 16) & 0xff,
    (n >>> 8) & 0xff,
    n & 0xff,
  ].join(".");
}

function parseV4(cidr: string): [number, number] {
  const [ip, plenStr] = cidr.split("/");
  const parts = (ip ?? "0.0.0.0").split(".").map((x) => Number(x));
  const base =
    ((parts[0]! << 24) >>> 0) + ((parts[1]! << 16) >>> 0) + ((parts[2]! << 8) >>> 0) + (parts[3]! >>> 0);
  const plen = Number(plenStr ?? 32);
  const mask = plen === 0 ? 0 : (~0 << (32 - plen)) >>> 0;
  return [base & mask, plen];
}

function macFromId(template: string, id: number): string {
  // CA-FE-00-00-00-00 + id in last octets
  const hex = id.toString(16).padStart(4, "0");
  return template.replace(/00-00$/, `${hex.slice(0, 2)}-${hex.slice(2)}`);
}
