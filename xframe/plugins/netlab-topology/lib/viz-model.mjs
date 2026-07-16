/**
 * Build a presentation VizModel from a transformed netlab Topology.
 */

import { ALL_LAYERS } from "./parse-fence.mjs";

/**
 * @typedef {object} VizNode
 * @property {string} name
 * @property {string} [device]
 * @property {string} [role]
 * @property {string} glyph  // router | switch | host
 * @property {number} [as]
 * @property {string} [routerId]
 * @property {string} [ospfArea]
 * @property {string} [isisNet]
 * @property {string[]} [modules]
 * @property {string} [loopback]
 * @property {string[]} [vlans]
 * @property {string[]} [vrfs]
 */

/**
 * @typedef {object} VizEdge
 * @property {string} from
 * @property {string} to
 * @property {string} [id]
 * @property {string} [prefix]
 * @property {string} [ospfArea]
 * @property {{ node: string, ipv4?: string, ipv6?: string, ifname?: string }[]} [ends]
 */

/**
 * @typedef {object} VizBgpEdge
 * @property {string} from
 * @property {string} to
 * @property {string} type  // ibgp | ebgp
 * @property {number} [as]
 * @property {string} [ipv4]
 */

/**
 * @typedef {object} VizIpLabel
 * @property {string} node
 * @property {string} [peer]
 * @property {string} text
 * @property {"link" | "loopback"} kind
 */

/**
 * @typedef {object} VizModel
 * @property {string} [name]
 * @property {string[]} modules
 * @property {string[]} availableLayers
 * @property {string[]} show
 * @property {boolean} [clickToZoom]
 * @property {VizNode[]} nodes
 * @property {VizEdge[]} physicalEdges
 * @property {VizBgpEdge[]} bgpEdges
 * @property {VizIpLabel[]} ipLabels
 * @property {Array<{ from: string, to: string, area?: string }>} ospfEdges
 * @property {Array<{ from: string, to: string, level?: string }>} isisEdges
 * @property {Array<{ node: string, vlan: string }>} vlanMembers
 * @property {Array<{ node: string, vrf: string }>} vrfMembers
 * @property {Array<{ from: string, to: string, kind: string }>} overlayEdges
 */

function asString(v) {
  if (v == null || v === false) return undefined;
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return undefined;
}

function pickGlyph(role, device) {
  const r = String(role ?? "").toLowerCase();
  const d = String(device ?? "").toLowerCase();
  if (r === "host" || r === "server" || d === "linux") return "host";
  if (r === "bridge" || r === "switch" || r === "leaf" || r === "tor") return "switch";
  return "router";
}

/**
 * @param {import("@exergy-connect/netlab").Topology} topology
 */
function collectPhysicalEdges(topology) {
  /** @type {VizEdge[]} */
  const edges = [];
  const seen = new Set();
  let idx = 0;
  for (const link of topology.links ?? []) {
    const ifaces = link.interfaces ?? [];
    if (ifaces.length < 2) continue;
    for (let i = 0; i < ifaces.length; i++) {
      for (let j = i + 1; j < ifaces.length; j++) {
        const a = String(ifaces[i].node ?? "");
        const b = String(ifaces[j].node ?? "");
        if (!a || !b || a === b) continue;
        const key = a < b ? `${a}\0${b}` : `${b}\0${a}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const prefix = asString(link.prefix?.ipv4) ?? asString(link.prefix?.ipv6);
        const ospfArea = asString(ifaces[i].ospf?.area) ?? asString(ifaces[j].ospf?.area);
        edges.push({
          id: `p${idx++}`,
          from: a < b ? a : b,
          to: a < b ? b : a,
          prefix,
          ospfArea,
          ends: [
            {
              node: a,
              ipv4: asString(ifaces[i].ipv4),
              ipv6: asString(ifaces[i].ipv6),
              ifname: asString(ifaces[i].ifname),
            },
            {
              node: b,
              ipv4: asString(ifaces[j].ipv4),
              ipv6: asString(ifaces[j].ipv6),
              ifname: asString(ifaces[j].ifname),
            },
          ],
        });
      }
    }
  }
  return edges;
}

/**
 * @param {import("@exergy-connect/netlab").Topology} topology
 */
function collectBgpEdges(topology) {
  /** @type {VizBgpEdge[]} */
  const edges = [];
  const seen = new Set();
  for (const [name, node] of Object.entries(topology.nodes ?? {})) {
    const neighbors = node.bgp?.neighbors;
    if (!Array.isArray(neighbors)) continue;
    for (const nb of neighbors) {
      const peer = String(nb.name ?? "");
      if (!peer || !topology.nodes?.[peer]) continue;
      const type = String(nb.type ?? "ibgp").toLowerCase();
      const undirected = type === "ibgp";
      const a = undirected ? (name < peer ? name : peer) : name;
      const b = undirected ? (name < peer ? peer : name) : peer;
      const key = undirected ? `u:${a}|${b}|${type}` : `d:${a}|${b}|${type}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({
        from: a,
        to: b,
        type,
        as: typeof nb.as === "number" ? nb.as : Number(nb.as) || undefined,
        ipv4: asString(nb.ipv4),
      });
    }
  }
  return edges;
}

/**
 * @param {import("@exergy-connect/netlab").Topology} topology
 * @param {VizEdge[]} physical
 */
function collectIpLabels(topology, physical) {
  /** @type {VizIpLabel[]} */
  const labels = [];
  for (const [name, node] of Object.entries(topology.nodes ?? {})) {
    const lo = asString(node.loopback?.ipv4) ?? asString(node.loopback?.ipv6);
    if (lo) {
      labels.push({ node: name, text: lo.split("/")[0] ?? lo, kind: "loopback" });
    }
  }
  for (const edge of physical) {
    for (const end of edge.ends ?? []) {
      const ip = end.ipv4 ?? end.ipv6;
      if (!ip) continue;
      const peer = edge.from === end.node ? edge.to : edge.from;
      labels.push({
        node: end.node,
        peer,
        text: String(ip).split("/")[0] ?? String(ip),
        kind: "link",
      });
    }
  }
  return labels;
}

/**
 * @param {import("@exergy-connect/netlab").Topology} topology
 * @param {VizEdge[]} physical
 */
function collectOspfEdges(topology, physical) {
  const hasOspf = (topology.module ?? []).includes("ospf")
    || Object.values(topology.nodes ?? {}).some((n) => n.ospf);
  if (!hasOspf) return [];
  return physical
    .filter((e) => e.ospfArea != null || true)
    .map((e) => ({
      from: e.from,
      to: e.to,
      area: e.ospfArea ?? asString(topology.nodes?.[e.from]?.ospf?.area) ?? "0.0.0.0",
    }));
}

/**
 * @param {import("@exergy-connect/netlab").Topology} topology
 */
function collectIsisEdges(topology) {
  const edges = [];
  const seen = new Set();
  for (const [name, node] of Object.entries(topology.nodes ?? {})) {
    if (!node.isis) continue;
    for (const intf of node.interfaces ?? []) {
      if (!intf.isis) continue;
      for (const nb of intf.neighbors ?? []) {
        const peer = String(nb.node ?? "");
        if (!peer) continue;
        const a = name < peer ? name : peer;
        const b = name < peer ? peer : name;
        const key = `${a}|${b}`;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push({
          from: a,
          to: b,
          level: asString(intf.isis.level) ?? asString(node.isis.type),
        });
      }
    }
  }
  return edges;
}

/**
 * @param {import("@exergy-connect/netlab").Topology} topology
 */
function collectVlanMembers(topology) {
  /** @type {Array<{ node: string, vlan: string }>} */
  const out = [];
  for (const [name, node] of Object.entries(topology.nodes ?? {})) {
    for (const intf of node.interfaces ?? []) {
      const access = asString(intf.vlan?.access);
      if (access) out.push({ node: name, vlan: access });
      const trunk = intf.vlan?.trunk;
      if (Array.isArray(trunk)) {
        for (const v of trunk) out.push({ node: name, vlan: String(v) });
      }
    }
  }
  // Unique
  const seen = new Set();
  return out.filter((m) => {
    const k = `${m.node}|${m.vlan}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/**
 * @param {import("@exergy-connect/netlab").Topology} topology
 */
function collectVrfMembers(topology) {
  /** @type {Array<{ node: string, vrf: string }>} */
  const out = [];
  for (const [name, node] of Object.entries(topology.nodes ?? {})) {
    for (const intf of node.interfaces ?? []) {
      const vrf = asString(intf.vrf);
      if (vrf) out.push({ node: name, vrf });
    }
    if (node.vrfs && typeof node.vrfs === "object") {
      for (const vrf of Object.keys(node.vrfs)) out.push({ node: name, vrf });
    }
  }
  const seen = new Set();
  return out.filter((m) => {
    const k = `${m.node}|${m.vrf}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/**
 * VXLAN / EVPN logical overlays (node pairs that share VNI or EVPN).
 * @param {import("@exergy-connect/netlab").Topology} topology
 */
function collectOverlayEdges(topology) {
  /** @type {Array<{ from: string, to: string, kind: string }>} */
  const edges = [];
  const modules = topology.module ?? [];
  if (!modules.includes("vxlan") && !modules.includes("evpn")) return edges;

  const vxlanNodes = Object.entries(topology.nodes ?? {})
    .filter(([, n]) => n.vxlan || (n.module ?? []).includes("vxlan") || (n.module ?? []).includes("evpn"))
    .map(([name]) => name)
    .sort((a, b) => a.localeCompare(b));

  // Full mesh overlay among VTEPs (undirected unique pairs)
  for (let i = 0; i < vxlanNodes.length; i++) {
    for (let j = i + 1; j < vxlanNodes.length; j++) {
      edges.push({
        from: vxlanNodes[i],
        to: vxlanNodes[j],
        kind: modules.includes("evpn") ? "evpn" : "vxlan",
      });
    }
  }
  return edges;
}

/**
 * @param {import("@exergy-connect/netlab").Topology} topology
 * @param {string[] | null} show
 * @param {{ clickToZoom?: boolean }} [opts]
 * @returns {VizModel}
 */
export function buildVizModel(topology, show, opts = {}) {
  const modules = [...(topology.module ?? [])];
  const physicalEdges = collectPhysicalEdges(topology);
  const bgpEdges = collectBgpEdges(topology);
  const ipLabels = collectIpLabels(topology, physicalEdges);
  const ospfEdges = collectOspfEdges(topology, physicalEdges);
  const isisEdges = collectIsisEdges(topology);
  const vlanMembers = collectVlanMembers(topology);
  const vrfMembers = collectVrfMembers(topology);
  const overlayEdges = collectOverlayEdges(topology);

  /** @type {VizNode[]} */
  const nodes = Object.entries(topology.nodes ?? {})
    .map(([name, node]) => {
      const bgp = node.bgp;
      const ospf = node.ospf;
      const isis = node.isis;
      return {
        name,
        device: asString(node.device),
        role: asString(node.role),
        glyph: pickGlyph(node.role, node.device),
        as: typeof bgp?.as === "number" ? bgp.as : (bgp?.as != null ? Number(bgp.as) : undefined),
        routerId: asString(bgp?.router_id) ?? asString(ospf?.router_id),
        ospfArea: asString(ospf?.area),
        isisNet: asString(isis?.net),
        modules: Array.isArray(node.module) ? node.module.map(String) : undefined,
        loopback: asString(node.loopback?.ipv4) ?? asString(node.loopback?.ipv6),
        vlans: vlanMembers.filter((m) => m.node === name).map((m) => m.vlan),
        vrfs: vrfMembers.filter((m) => m.node === name).map((m) => m.vrf),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const availableLayers = [];
  if (nodes.length) availableLayers.push("nodes");
  if (physicalEdges.length) availableLayers.push("links");
  if (ipLabels.length) availableLayers.push("ip");
  if (bgpEdges.length) availableLayers.push("bgp");
  if (ospfEdges.length && modules.includes("ospf")) availableLayers.push("ospf");
  if (isisEdges.length) availableLayers.push("isis");
  if (vlanMembers.length) availableLayers.push("vlan");
  if (vrfMembers.length) availableLayers.push("vrf");
  if (overlayEdges.some((e) => e.kind === "vxlan")) availableLayers.push("vxlan");
  if (overlayEdges.some((e) => e.kind === "evpn") || modules.includes("evpn")) {
    if (!availableLayers.includes("evpn") && (overlayEdges.length || modules.includes("evpn"))) {
      availableLayers.push("evpn");
    }
  }

  // Preserve canonical layer order
  const available = ALL_LAYERS.filter((l) => availableLayers.includes(l));
  const resolvedShow = show?.length
    ? show.filter((l) => available.includes(l) || l === "nodes")
    : available.slice();
  if (!resolvedShow.includes("nodes") && available.includes("nodes")) {
    resolvedShow.unshift("nodes");
  }

  return {
    name: asString(topology.name),
    modules,
    availableLayers: available,
    show: resolvedShow,
    clickToZoom: opts.clickToZoom !== false,
    nodes,
    physicalEdges,
    bgpEdges,
    ipLabels,
    ospfEdges,
    isisEdges,
    vlanMembers,
    vrfMembers,
    overlayEdges,
  };
}
