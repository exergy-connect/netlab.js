/**
 * Render a VizModel to a self-contained static SVG string.
 */

import { layoutNodes, insetEndpoints, arcControl, loopbackAnchor } from "./layout.mjs";
import { iconDefs, glyphHref, asColor, areaColor } from "./icons.mjs";

/** Underlay (physical) vs overlay (control/tunnel) palette for static SVG. */
const UNDERLAY = "#6b8cae";
const UNDERLAY_IP = "#9ec0dc";
const OVERLAY_BGP = "#f472b6";
const OVERLAY_EBGP = "#fb923c";
const OVERLAY_TUNNEL = "#c084fc";
const OVERLAY_IP = "#f9a8d4";

export function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {import("./viz-model.mjs").VizModel} model
 * @param {{ layers?: string[] }} [opts]
 */
export function renderStaticSvg(model, opts = {}) {
  const layers = new Set(opts.layers ?? model.show ?? model.availableLayers);
  const edgePairs = model.physicalEdges.map((e) => /** @type {const} */ ([e.from, e.to]));
  const { width, height, positions, radius } = layoutNodes(model.nodes, edgePairs);

  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" class="netlab-topology-static" role="img" aria-label="${escapeXml(model.name ?? "netlab topology")}">`);
  parts.push(`<defs>
  ${iconDefs()}
  <marker id="nl-bgp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="${OVERLAY_EBGP}"/>
  </marker>
  <filter id="nl-glow" x="-40%" y="-40%" width="180%" height="180%">
    <feGaussianBlur stdDeviation="2.2" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <linearGradient id="nl-canvas" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#0b1220"/>
    <stop offset="55%" stop-color="#0f172a"/>
    <stop offset="100%" stop-color="#111827"/>
  </linearGradient>
  <radialGradient id="nl-vignette" cx="50%" cy="40%" r="70%">
    <stop offset="0%" stop-color="#1e293b" stop-opacity="0.55"/>
    <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
  </radialGradient>
</defs>`);

  parts.push(`<rect width="${width}" height="${height}" fill="url(#nl-canvas)" rx="16"/>`);
  parts.push(`<rect width="${width}" height="${height}" fill="url(#nl-vignette)" rx="16"/>`);

  // Subtle grid
  parts.push(`<g class="nl-grid" opacity="0.18">`);
  for (let x = 40; x < width; x += 40) {
    parts.push(`<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="#334155" stroke-width="0.6"/>`);
  }
  for (let y = 40; y < height; y += 40) {
    parts.push(`<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="#334155" stroke-width="0.6"/>`);
  }
  parts.push(`</g>`);

  parts.push(`<style>
    .nl-link { stroke: ${UNDERLAY}; stroke-width: 2.6; stroke-linecap: round; }
    .nl-link-ospf { stroke-width: 3.2; stroke-opacity: 0.9; }
    .nl-bgp { fill: none; stroke-width: 2.3; stroke-dasharray: 7 5; stroke-linecap: round; opacity: 0.95; filter: url(#nl-glow); }
    .nl-bgp-ibgp { stroke: ${OVERLAY_BGP}; }
    .nl-bgp-ebgp { stroke: ${OVERLAY_EBGP}; }
    .nl-overlay { fill: none; stroke: ${OVERLAY_TUNNEL}; stroke-width: 1.8; stroke-dasharray: 3 6; opacity: 0.8; }
    .nl-isis { fill: none; stroke: #2dd4bf; stroke-width: 2; stroke-dasharray: 2 4; opacity: 0.85; }
    .nl-node-halo { fill: none; stroke-width: 2.5; opacity: 0.55; }
    .nl-glyph-body { fill: #1e293b; stroke: #38bdf8; stroke-width: 2; }
    .nl-glyph-port { fill: #0ea5e9; stroke: none; }
    .nl-glyph-screen { fill: #0f172a; stroke: #38bdf8; stroke-width: 1; }
    .nl-glyph-antenna { stroke: #64748b; stroke-width: 1.8; stroke-linecap: round; }
    .nl-glyph-tip { fill: #38bdf8; }
    .nl-label { fill: #e2e8f0; font: 600 13px ui-sans-serif, system-ui, sans-serif; }
    .nl-sub { fill: #94a3b8; font: 500 10px ui-sans-serif, system-ui, sans-serif; }
    .nl-ip { fill: ${UNDERLAY_IP}; font: 500 9px ui-monospace, SFMono-Regular, Menlo, monospace; }
    .nl-ip-loopback { fill: ${OVERLAY_IP}; font: 600 9px ui-monospace, SFMono-Regular, Menlo, monospace; }
    .nl-badge { fill: #0f172a; stroke-width: 1.2; }
    .nl-badge-text { fill: #e2e8f0; font: 600 9px ui-sans-serif, system-ui, sans-serif; }
    .nl-title { fill: #cbd5e1; font: 600 12px ui-sans-serif, system-ui, sans-serif; }
  </style>`);

  if (model.name) {
    parts.push(`<text x="20" y="28" class="nl-title">${escapeXml(model.name)}</text>`);
  }

  // Overlay edges (vxlan/evpn) under physical
  if (layers.has("vxlan") || layers.has("evpn")) {
    for (const e of model.overlayEdges) {
      if (e.kind === "vxlan" && !layers.has("vxlan")) continue;
      if (e.kind === "evpn" && !layers.has("evpn") && !layers.has("vxlan")) continue;
      const a = positions.get(e.from);
      const b = positions.get(e.to);
      if (!a || !b) continue;
      const c = arcControl(a, b, 0.32);
      parts.push(`<path class="nl-overlay" d="M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}"/>`);
    }
  }

  // ISIS
  if (layers.has("isis")) {
    for (const e of model.isisEdges) {
      const a = positions.get(e.from);
      const b = positions.get(e.to);
      if (!a || !b) continue;
      const seg = insetEndpoints(a, b, radius * 0.85);
      parts.push(`<line class="nl-isis" x1="${seg.x1}" y1="${seg.y1}" x2="${seg.x2}" y2="${seg.y2}"/>`);
    }
  }

  // OSPF accents on physical links
  if (layers.has("ospf")) {
    for (const e of model.ospfEdges) {
      const a = positions.get(e.from);
      const b = positions.get(e.to);
      if (!a || !b) continue;
      const seg = insetEndpoints(a, b, radius * 0.85);
      const color = areaColor(e.area ?? "0.0.0.0");
      parts.push(`<line class="nl-link nl-link-ospf" x1="${seg.x1}" y1="${seg.y1}" x2="${seg.x2}" y2="${seg.y2}" stroke="${color}"/>`);
    }
  }

  // Physical links
  if (layers.has("links")) {
    for (const e of model.physicalEdges) {
      if (layers.has("ospf") && e.ospfArea) continue; // already drawn as ospf accent
      const a = positions.get(e.from);
      const b = positions.get(e.to);
      if (!a || !b) continue;
      const seg = insetEndpoints(a, b, radius * 0.85);
      parts.push(`<line class="nl-link" x1="${seg.x1}" y1="${seg.y1}" x2="${seg.x2}" y2="${seg.y2}"/>`);
    }
  }

  // BGP arcs
  if (layers.has("bgp")) {
    let bi = 0;
    for (const e of model.bgpEdges) {
      const a = positions.get(e.from);
      const b = positions.get(e.to);
      if (!a || !b) continue;
      const bulge = 0.18 + (bi % 3) * 0.06;
      bi++;
      const c = arcControl(a, b, bulge);
      const cls = e.type === "ebgp" ? "nl-bgp nl-bgp-ebgp" : "nl-bgp nl-bgp-ibgp";
      const marker = e.type === "ebgp" ? ` marker-end="url(#nl-bgp-arrow)"` : "";
      parts.push(`<path class="${cls}" d="M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}"${marker}/>`);
    }
  }

  // Nodes
  if (layers.has("nodes")) {
    for (const node of model.nodes) {
      const p = positions.get(node.name);
      if (!p) continue;
      const accent = asColor(node.as);
      if (layers.has("ospf") && node.ospfArea) {
        parts.push(`<circle class="nl-node-halo" cx="${p.x}" cy="${p.y}" r="${radius + 6}" stroke="${areaColor(node.ospfArea)}"/>`);
      }
      parts.push(`<g class="nl-node" transform="translate(${p.x - 28}, ${p.y - 28})">
  <circle cx="28" cy="28" r="30" fill="#0f172a" stroke="${accent}" stroke-width="2" opacity="0.95"/>
  <use href="${glyphHref(node.glyph)}" width="56" height="56" x="0" y="0"/>
</g>`);
      parts.push(`<text class="nl-label" x="${p.x}" y="${p.y + radius + 14}" text-anchor="middle">${escapeXml(node.name)}</text>`);
      const sub = [node.device, node.as != null ? `AS${node.as}` : null].filter(Boolean).join(" · ");
      if (sub) {
        parts.push(`<text class="nl-sub" x="${p.x}" y="${p.y + radius + 26}" text-anchor="middle">${escapeXml(sub)}</text>`);
      }
      if (layers.has("vlan") && node.vlans?.length) {
        parts.push(badge(p.x + radius - 4, p.y - radius + 2, `VLAN ${node.vlans[0]}`, "#a78bfa"));
      }
      if (layers.has("vrf") && node.vrfs?.length) {
        parts.push(badge(p.x - radius + 4, p.y - radius + 2, node.vrfs[0], "#34d399"));
      }
    }
  }

  // IP labels — link IPs along underlay edges; loopbacks in the clearest angular gap
  if (layers.has("ip")) {
    for (const lab of model.ipLabels) {
      if (lab.kind === "loopback") {
        const anchor = loopbackAnchor(lab.node, positions, model.physicalEdges, radius);
        parts.push(`<text class="nl-ip nl-ip-loopback" x="${anchor.x}" y="${anchor.y}" text-anchor="middle" dominant-baseline="central">${escapeXml(lab.text)}</text>`);
        continue;
      }
      if (!lab.peer) continue;
      const a = positions.get(lab.node);
      const b = positions.get(lab.peer);
      if (!a || !b) continue;
      // Place near the node's end, offset perpendicular so text sits beside the line
      const t = 0.28;
      const mx = a.x + (b.x - a.x) * t;
      const my = a.y + (b.y - a.y) * t;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const ox = (-dy / len) * 10;
      const oy = (dx / len) * 10;
      parts.push(`<text class="nl-ip" x="${mx + ox}" y="${my + oy}" text-anchor="middle" dominant-baseline="central">${escapeXml(lab.text)}</text>`);
    }
  }

  // Legend chips
  const legend = [...layers].filter((l) => l !== "nodes");
  if (legend.length) {
    let lx = 20;
    const ly = height - 18;
    for (const layer of legend) {
      const color = legendColor(layer);
      parts.push(`<rect x="${lx}" y="${ly - 12}" width="10" height="10" rx="2" fill="${color}"/>`);
      parts.push(`<text x="${lx + 14}" y="${ly - 3}" class="nl-sub">${escapeXml(layer)}</text>`);
      lx += 14 + layer.length * 6.2 + 12;
    }
  }

  parts.push(`</svg>\n`);
  return parts.join("\n");
}

function badge(x, y, text, stroke) {
  const w = Math.max(36, text.length * 6.2 + 10);
  return `<g>
  <rect class="nl-badge" x="${x}" y="${y}" width="${w}" height="14" rx="4" stroke="${stroke}"/>
  <text class="nl-badge-text" x="${x + w / 2}" y="${y + 10}" text-anchor="middle">${escapeXml(text)}</text>
</g>`;
}

function legendColor(layer) {
  switch (layer) {
    case "bgp": return OVERLAY_BGP;
    case "ospf": return "#2dd4bf";
    case "ip": return UNDERLAY_IP;
    case "isis": return "#2dd4bf";
    case "vlan": return OVERLAY_TUNNEL;
    case "vrf": return "#34d399";
    case "vxlan":
    case "evpn": return OVERLAY_TUNNEL;
    case "links": return UNDERLAY;
    default: return "#94a3b8";
  }
}
