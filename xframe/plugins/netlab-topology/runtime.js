/* Invoked by ir2html as `(function (roots) { … })(mountNodeList)`. */
(() => {
  const AS_COLORS = [
    "#38bdf8", "#a78bfa", "#34d399", "#fbbf24",
    "#f472b6", "#fb7185", "#2dd4bf", "#c084fc",
  ];
  const AREA_COLORS = ["#2dd4bf", "#38bdf8", "#5eead4", "#67e8f9", "#4ade80", "#7dd3fc"];
  const ROLE_TIER = {
    spine: 0, superspine: 0, core: 0,
    leaf: 1, tor: 1, access: 2,
    host: 3, server: 3,
    router: 1, switch: 1, bridge: 1,
  };

  function asColor(asn) {
    if (asn == null || Number.isNaN(Number(asn))) return AS_COLORS[0];
    return AS_COLORS[Math.abs(Number(asn)) % AS_COLORS.length];
  }

  function areaColor(area) {
    const s = String(area ?? "0.0.0.0");
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return AREA_COLORS[h % AREA_COLORS.length];
  }

  function orderForMinimalCrossings(nodes, edges) {
    if (nodes.length <= 1) return nodes.slice();
    if (!edges.length) return nodes.slice().sort((a, b) => a.localeCompare(b));
    // Lightweight: BFS from highest degree
    const deg = new Map(nodes.map((n) => [n, 0]));
    const adj = new Map(nodes.map((n) => [n, []]));
    for (const [u, v] of edges) {
      if (!adj.has(u) || !adj.has(v)) continue;
      adj.get(u).push(v);
      adj.get(v).push(u);
      deg.set(u, (deg.get(u) ?? 0) + 1);
      deg.set(v, (deg.get(v) ?? 0) + 1);
    }
    for (const list of adj.values()) list.sort((a, b) => a.localeCompare(b));
    let start = nodes[0];
    for (const n of nodes) {
      if ((deg.get(n) ?? 0) > (deg.get(start) ?? 0)
        || ((deg.get(n) ?? 0) === (deg.get(start) ?? 0) && n.localeCompare(start) < 0)) {
        start = n;
      }
    }
    const order = [];
    const seen = new Set();
    const q = [start];
    seen.add(start);
    while (q.length) {
      const u = q.shift();
      order.push(u);
      for (const v of adj.get(u) ?? []) {
        if (seen.has(v)) continue;
        seen.add(v);
        q.push(v);
      }
    }
    for (const n of nodes.slice().sort((a, b) => a.localeCompare(b))) {
      if (!seen.has(n)) order.push(n);
    }
    return order;
  }

  function layoutNodes(nodes, edges, width, height) {
    const names = nodes.map((n) => n.name);
    const roles = new Map(nodes.map((n) => [n.name, String(n.role ?? "").toLowerCase()]));
    let hasTiered = false;
    for (const name of names) {
      const r = roles.get(name) ?? "";
      if (r && r in ROLE_TIER && !["router", "switch", "bridge"].includes(r)) hasTiered = true;
    }
    const positions = new Map();
    const radius = 34;

    if (hasTiered && names.length > 1) {
      const byTier = new Map();
      for (const name of names) {
        const t = ROLE_TIER[roles.get(name) ?? ""] ?? 1;
        if (!byTier.has(t)) byTier.set(t, []);
        byTier.get(t).push(name);
      }
      const tierKeys = [...byTier.keys()].sort((a, b) => a - b);
      const padX = 70;
      const padY = 64;
      const usableH = height - padY * 2;
      tierKeys.forEach((tier, ti) => {
        const row = byTier.get(tier).slice().sort((a, b) => a.localeCompare(b));
        const y = padY + (tierKeys.length === 1 ? usableH / 2 : (usableH * ti) / Math.max(tierKeys.length - 1, 1));
        const usableW = width - padX * 2;
        row.forEach((name, i) => {
          const x = row.length === 1 ? width / 2 : padX + (usableW * i) / Math.max(row.length - 1, 1);
          positions.set(name, { x, y });
        });
      });
    } else {
      const order = orderForMinimalCrossings(names, edges);
      const cx = width / 2;
      const cy = height / 2;
      const r = Math.min(width, height) * 0.34;
      const n = Math.max(order.length, 1);
      order.forEach((name, i) => {
        if (n === 1) {
          positions.set(name, { x: cx, y: cy });
          return;
        }
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        positions.set(name, {
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
        });
      });
    }
    return { positions, radius };
  }

  function insetEndpoints(a, b, r) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const inset = Math.min(r, len / 2 - 2);
    return {
      x1: a.x + ux * inset,
      y1: a.y + uy * inset,
      x2: b.x - ux * inset,
      y2: b.y - uy * inset,
    };
  }

  function arcControl(a, b, bulge) {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    return {
      x: mx - (dy / len) * len * bulge,
      y: my + (dx / len) * len * bulge,
    };
  }

  /** Place loopback text in the largest angular gap away from incident edges. */
  function loopbackAnchor(nodeName, positions, edges, radius) {
    const p = positions.get(nodeName);
    if (!p) return { x: 0, y: 0 };
    const angles = [];
    for (const e of edges) {
      let peer;
      if (e.from === nodeName) peer = e.to;
      else if (e.to === nodeName) peer = e.from;
      else continue;
      const q = positions.get(peer);
      if (!q) continue;
      angles.push(Math.atan2(q.y - p.y, q.x - p.x));
    }
    // Reserve downward cone for node name
    const nameAngle = Math.PI / 2;
    angles.push(nameAngle - 0.55, nameAngle + 0.55);
    const dist = radius + 16;
    if (!angles.length) {
      return { x: p.x - dist * 0.35, y: p.y - dist };
    }
    angles.sort((a, b) => a - b);
    let bestMid = angles[0] + Math.PI;
    let bestGap = -1;
    for (let i = 0; i < angles.length; i++) {
      const a0 = angles[i];
      const a1 = i + 1 < angles.length ? angles[i + 1] : angles[0] + Math.PI * 2;
      const gap = a1 - a0;
      if (gap > bestGap) {
        bestGap = gap;
        bestMid = a0 + gap / 2;
      }
    }
    let mid = bestMid;
    while (mid > Math.PI) mid -= Math.PI * 2;
    while (mid < -Math.PI) mid += Math.PI * 2;
    return {
      x: p.x + Math.cos(mid) * dist,
      y: p.y + Math.sin(mid) * dist,
    };
  }

  function themeRoot(el) {
    return el.closest("[data-theme]") ?? document.getElementById("xframe") ?? document.documentElement;
  }

  function svgEl(name, attrs = {}) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (const [k, v] of Object.entries(attrs)) {
      if (v != null) el.setAttribute(k, String(v));
    }
    return el;
  }

  function neighborsOf(model, name) {
    const out = new Set([name]);
    for (const e of model.physicalEdges) {
      if (e.from === name) out.add(e.to);
      if (e.to === name) out.add(e.from);
    }
    for (const e of model.bgpEdges) {
      if (e.from === name) out.add(e.to);
      if (e.to === name) out.add(e.from);
    }
    return out;
  }

  function parseModel(body) {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }

  /**
   * Draw a node glyph centered on (cx, cy). Art is 64×64, scaled into 56×56
   * so it matches the static SVG <use width="56" height="56"> placement.
   */
  function appendGlyph(parent, glyph, cx, cy) {
    const g = svgEl("g", {
      class: "nl-glyph",
      transform: `translate(${cx - 28}, ${cy - 28}) scale(${56 / 64})`,
      "pointer-events": "none",
    });
    if (glyph === "switch") {
      g.append(
        svgEl("rect", { x: 6, y: 22, width: 52, height: 22, rx: 4, class: "nl-glyph-body" }),
        svgEl("rect", { x: 12, y: 28, width: 8, height: 10, rx: 1.5, class: "nl-glyph-port" }),
        svgEl("rect", { x: 24, y: 28, width: 8, height: 10, rx: 1.5, class: "nl-glyph-port" }),
        svgEl("rect", { x: 36, y: 28, width: 8, height: 10, rx: 1.5, class: "nl-glyph-port" }),
        svgEl("rect", { x: 48, y: 28, width: 6, height: 10, rx: 1.5, class: "nl-glyph-port" }),
        svgEl("path", {
          d: "M20 22 V16 H28 V22 M36 22 V14 H44 V22",
          class: "nl-glyph-antenna",
          fill: "none",
        }),
      );
    } else if (glyph === "host") {
      g.append(
        svgEl("rect", { x: 14, y: 12, width: 36, height: 28, rx: 3, class: "nl-glyph-body" }),
        svgEl("rect", { x: 18, y: 16, width: 28, height: 16, rx: 1, class: "nl-glyph-screen" }),
        svgEl("path", { d: "M24 40 H40 L44 50 H20 Z", class: "nl-glyph-body" }),
        svgEl("rect", { x: 22, y: 50, width: 20, height: 4, rx: 1, class: "nl-glyph-port" }),
      );
    } else {
      g.append(
        svgEl("rect", { x: 8, y: 18, width: 48, height: 28, rx: 6, class: "nl-glyph-body" }),
        svgEl("circle", { cx: 20, cy: 32, r: 4, class: "nl-glyph-port" }),
        svgEl("circle", { cx: 32, cy: 32, r: 4, class: "nl-glyph-port" }),
        svgEl("circle", { cx: 44, cy: 32, r: 4, class: "nl-glyph-port" }),
        svgEl("path", {
          d: "M16 18 V12 M32 18 V10 M48 18 V12",
          class: "nl-glyph-antenna",
          fill: "none",
        }),
        svgEl("circle", { cx: 16, cy: 10, r: 2.5, class: "nl-glyph-tip" }),
        svgEl("circle", { cx: 32, cy: 8, r: 2.5, class: "nl-glyph-tip" }),
        svgEl("circle", { cx: 48, cy: 10, r: 2.5, class: "nl-glyph-tip" }),
      );
    }
    parent.appendChild(g);
  }

  function mount(el) {
    const model = parseModel(el.getAttribute("data-fence") ?? "");
    if (!model || !Array.isArray(model.nodes)) {
      el.textContent = "Invalid netlab topology model";
      return;
    }

    const available = model.availableLayers?.length
      ? model.availableLayers
      : ["nodes", "links"];
    const active = new Set(model.show?.length ? model.show : available);
    if (!active.has("nodes") && available.includes("nodes")) active.add("nodes");
    const clickToZoom = model.clickToZoom !== false;

    let selected = null;
    let zoomed = false;
    const width = 720;
    const height = 400;
    const edgePairs = (model.physicalEdges ?? []).map((e) => [e.from, e.to]);
    const { positions, radius } = layoutNodes(model.nodes, edgePairs, width, height);
    const root = themeRoot(el);

    const shell = document.createElement("div");
    shell.className = "nl-shell";

    const toolbar = document.createElement("div");
    toolbar.className = "nl-toolbar";
    toolbar.setAttribute("role", "group");
    toolbar.setAttribute("aria-label", "Topology layers");

    for (const layer of available) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "nl-chip";
      btn.dataset.layer = layer;
      btn.textContent = layer;
      btn.setAttribute("aria-pressed", active.has(layer) ? "true" : "false");
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        if (active.has(layer)) active.delete(layer);
        else active.add(layer);
        paint();
      });
      toolbar.appendChild(btn);
    }

    /** @type {HTMLButtonElement | null} */
    let zoomBtn = null;
    /** Portal overlay on document.body — required because #xframe uses transform. */
    /** @type {HTMLDivElement | null} */
    let zoomOverlay = null;
    /** @type {HTMLDivElement | null} */
    let zoomStage = null;
    /** @type {Comment | null} */
    let zoomPlaceholder = null;

    function setZoomed(on) {
      if (!clickToZoom || !zoomOverlay || !zoomStage) return;
      const next = Boolean(on);
      if (next === zoomed) return;
      zoomed = next;

      if (zoomed) {
        // Move the live mount out of the transformed slide canvas onto body.
        zoomPlaceholder = document.createComment("netlab-topology-zoom");
        if (el.parentNode) el.parentNode.insertBefore(zoomPlaceholder, el);
        zoomStage.replaceChildren(el);
        el.classList.add("is-zoomed");
        zoomOverlay.hidden = false;
        document.documentElement.classList.add("nl-topology-zoomed");
      } else {
        el.classList.remove("is-zoomed");
        if (zoomPlaceholder?.parentNode) {
          zoomPlaceholder.parentNode.insertBefore(el, zoomPlaceholder);
          zoomPlaceholder.remove();
        }
        zoomPlaceholder = null;
        zoomStage.replaceChildren();
        zoomOverlay.hidden = true;
        document.documentElement.classList.remove("nl-topology-zoomed");
      }

      if (zoomBtn) {
        zoomBtn.setAttribute("aria-pressed", zoomed ? "true" : "false");
        zoomBtn.classList.toggle("is-on", zoomed);
        zoomBtn.textContent = zoomed ? "close" : "zoom";
        zoomBtn.title = zoomed ? "Exit enlarged view" : "Enlarge topology";
      }
    }

    if (clickToZoom) {
      el.dataset.clickToZoom = "true";
      zoomBtn = document.createElement("button");
      zoomBtn.type = "button";
      zoomBtn.className = "nl-chip nl-chip-zoom";
      zoomBtn.textContent = "zoom";
      zoomBtn.title = "Enlarge topology";
      zoomBtn.setAttribute("aria-pressed", "false");
      zoomBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        setZoomed(!zoomed);
      });
      toolbar.appendChild(zoomBtn);

      zoomOverlay = document.createElement("div");
      zoomOverlay.className = "nl-zoom-overlay";
      zoomOverlay.hidden = true;
      zoomOverlay.setAttribute("role", "dialog");
      zoomOverlay.setAttribute("aria-modal", "true");
      zoomOverlay.setAttribute("aria-label", "Enlarged topology");
      zoomStage = document.createElement("div");
      zoomStage.className = "nl-zoom-stage";
      zoomStage.addEventListener("click", (event) => event.stopPropagation());
      zoomOverlay.appendChild(zoomStage);
      zoomOverlay.addEventListener("click", () => setZoomed(false));
      document.body.appendChild(zoomOverlay);
    }

    const svg = svgEl("svg", {
      viewBox: `0 0 ${width} ${height}`,
      class: "nl-svg",
      role: "img",
      "aria-label": model.name ? `Topology ${model.name}` : "Interactive netlab topology",
    });

    const defs = svgEl("defs");
    const markerId = `nl-rt-arrow-${Math.random().toString(36).slice(2, 8)}`;
    defs.innerHTML = `
      <marker id="${markerId}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
      </marker>`;
    svg.appendChild(defs);

    const layerG = {
      overlay: svgEl("g", { class: "nl-layer-overlay" }),
      isis: svgEl("g", { class: "nl-layer-isis" }),
      ospf: svgEl("g", { class: "nl-layer-ospf" }),
      links: svgEl("g", { class: "nl-layer-links" }),
      bgp: svgEl("g", { class: "nl-layer-bgp" }),
      nodes: svgEl("g", { class: "nl-layer-nodes" }),
      ip: svgEl("g", { class: "nl-layer-ip" }),
    };
    for (const g of Object.values(layerG)) svg.appendChild(g);

    /** @type {Map<string, SVGGElement>} */
    const nodeEls = new Map();
    /** @type {SVGElement[]} */
    const linkEls = [];
    /** @type {SVGElement[]} */
    const bgpEls = [];

    // Build static structure once; paint toggles visibility/classes
    for (const e of model.overlayEdges ?? []) {
      const a = positions.get(e.from);
      const b = positions.get(e.to);
      if (!a || !b) continue;
      const c = arcControl(a, b, 0.32);
      const path = svgEl("path", {
        class: "nl-overlay",
        d: `M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}`,
        "data-kind": e.kind,
        "data-from": e.from,
        "data-to": e.to,
      });
      layerG.overlay.appendChild(path);
      linkEls.push(path);
    }

    for (const e of model.isisEdges ?? []) {
      const a = positions.get(e.from);
      const b = positions.get(e.to);
      if (!a || !b) continue;
      const seg = insetEndpoints(a, b, radius * 0.85);
      const line = svgEl("line", {
        class: "nl-isis",
        x1: seg.x1, y1: seg.y1, x2: seg.x2, y2: seg.y2,
        "data-from": e.from, "data-to": e.to,
      });
      layerG.isis.appendChild(line);
      linkEls.push(line);
    }

    for (const e of model.ospfEdges ?? []) {
      const a = positions.get(e.from);
      const b = positions.get(e.to);
      if (!a || !b) continue;
      const seg = insetEndpoints(a, b, radius * 0.85);
      const line = svgEl("line", {
        class: "nl-link nl-link-ospf",
        x1: seg.x1, y1: seg.y1, x2: seg.x2, y2: seg.y2,
        stroke: areaColor(e.area),
        "data-from": e.from, "data-to": e.to,
      });
      layerG.ospf.appendChild(line);
      linkEls.push(line);
    }

    for (const e of model.physicalEdges ?? []) {
      const a = positions.get(e.from);
      const b = positions.get(e.to);
      if (!a || !b) continue;
      const seg = insetEndpoints(a, b, radius * 0.85);
      const line = svgEl("line", {
        class: "nl-link",
        x1: seg.x1, y1: seg.y1, x2: seg.x2, y2: seg.y2,
        "data-from": e.from, "data-to": e.to,
      });
      layerG.links.appendChild(line);
      linkEls.push(line);
    }

    let bi = 0;
    for (const e of model.bgpEdges ?? []) {
      const a = positions.get(e.from);
      const b = positions.get(e.to);
      if (!a || !b) continue;
      const bulge = 0.18 + (bi % 3) * 0.06;
      bi++;
      const c = arcControl(a, b, bulge);
      const path = svgEl("path", {
        class: `nl-bgp nl-bgp-${e.type === "ebgp" ? "ebgp" : "ibgp"}`,
        d: `M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}`,
        "data-from": e.from,
        "data-to": e.to,
      });
      if (e.type === "ebgp") path.setAttribute("marker-end", `url(#${markerId})`);
      layerG.bgp.appendChild(path);
      bgpEls.push(path);
      linkEls.push(path);
    }

    for (const node of model.nodes) {
      const p = positions.get(node.name);
      if (!p) continue;
      const g = svgEl("g", { class: "nl-node", "data-name": node.name });
      g.style.cursor = "pointer";

      const halo = svgEl("circle", {
        class: "nl-node-halo",
        cx: p.x, cy: p.y, r: radius + 6,
        stroke: node.ospfArea ? areaColor(node.ospfArea) : "transparent",
      });
      halo.dataset.ospf = node.ospfArea ? "1" : "0";
      g.appendChild(halo);

      const disc = svgEl("circle", {
        class: "nl-node-disc",
        cx: p.x, cy: p.y, r: 30,
        stroke: asColor(node.as),
      });
      g.appendChild(disc);
      appendGlyph(g, node.glyph, p.x, p.y);

      const label = svgEl("text", {
        class: "nl-label",
        x: p.x, y: p.y + radius + 14,
        "text-anchor": "middle",
      });
      label.textContent = node.name;
      g.appendChild(label);

      const subBits = [node.device, node.as != null ? `AS${node.as}` : null].filter(Boolean);
      if (subBits.length) {
        const sub = svgEl("text", {
          class: "nl-sub",
          x: p.x, y: p.y + radius + 26,
          "text-anchor": "middle",
        });
        sub.textContent = subBits.join(" · ");
        g.appendChild(sub);
      }

      g.addEventListener("click", (event) => {
        event.stopPropagation();
        selected = selected === node.name ? null : node.name;
        paint();
      });

      layerG.nodes.appendChild(g);
      nodeEls.set(node.name, g);
    }

    for (const lab of model.ipLabels ?? []) {
      if (lab.kind === "loopback") {
        const anchor = loopbackAnchor(lab.node, positions, model.physicalEdges ?? [], radius);
        const t = svgEl("text", {
          class: "nl-ip nl-ip-loopback",
          x: anchor.x, y: anchor.y,
          "text-anchor": "middle",
          "dominant-baseline": "central",
          "data-node": lab.node,
        });
        t.textContent = lab.text;
        layerG.ip.appendChild(t);
        continue;
      }
      if (!lab.peer) continue;
      const a = positions.get(lab.node);
      const b = positions.get(lab.peer);
      if (!a || !b) continue;
      const mx = a.x + (b.x - a.x) * 0.28;
      const my = a.y + (b.y - a.y) * 0.28;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const t = svgEl("text", {
        class: "nl-ip nl-ip-link",
        x: mx + (-dy / len) * 10,
        y: my + (dx / len) * 10,
        "text-anchor": "middle",
        "dominant-baseline": "central",
        "data-node": lab.node,
        "data-peer": lab.peer,
      });
      t.textContent = lab.text;
      layerG.ip.appendChild(t);
    }

    const meta = document.createElement("div");
    meta.className = "nl-meta";
    const hint = document.createElement("p");
    hint.className = "nl-hint";
    meta.appendChild(hint);

    function paint() {
      const showLinks = active.has("links");
      const showOspf = active.has("ospf");
      // OSPF strokes ride on the underlay — require links so the links chip
      // actually clears connectivity. With both on, prefer OSPF-colored edges.
      layerG.links.style.display = showLinks && !showOspf ? "" : "none";
      layerG.ospf.style.display = showLinks && showOspf ? "" : "none";
      layerG.bgp.style.display = active.has("bgp") ? "" : "none";
      layerG.isis.style.display = active.has("isis") ? "" : "none";
      layerG.ip.style.display = active.has("ip") ? "" : "none";
      layerG.overlay.style.display = (active.has("vxlan") || active.has("evpn")) ? "" : "none";
      layerG.nodes.style.display = active.has("nodes") ? "" : "none";

      // Overlay kind filter
      for (const child of layerG.overlay.children) {
        const kind = child.getAttribute("data-kind");
        const show = (kind === "vxlan" && active.has("vxlan"))
          || (kind === "evpn" && (active.has("evpn") || active.has("vxlan")));
        child.style.display = show ? "" : "none";
      }

      // Halos follow the ospf chip (independent of links)
      for (const g of nodeEls.values()) {
        const halo = g.querySelector(".nl-node-halo");
        if (halo) halo.style.display = showOspf && halo.dataset.ospf === "1" ? "" : "none";
      }

      const hot = selected ? neighborsOf(model, selected) : null;
      for (const [name, g] of nodeEls) {
        g.classList.toggle("is-selected", name === selected);
        g.classList.toggle("is-neighbor", Boolean(hot && hot.has(name) && name !== selected));
        g.classList.toggle("is-dimmed", Boolean(hot && !hot.has(name)));
      }
      for (const line of linkEls) {
        const from = line.getAttribute("data-from");
        const to = line.getAttribute("data-to");
        const isHot = Boolean(hot && hot.has(from) && hot.has(to)
          && (from === selected || to === selected));
        line.classList.toggle("is-hot", isHot);
        line.classList.toggle("is-dimmed", Boolean(hot && !isHot));
      }

      for (const chip of toolbar.querySelectorAll(".nl-chip[data-layer]")) {
        const layer = chip.dataset.layer;
        chip.classList.toggle("is-on", active.has(layer));
        chip.setAttribute("aria-pressed", active.has(layer) ? "true" : "false");
      }

      hint.textContent = selected
        ? `Focused “${selected}” — click again to clear · toggle layers above`
        : clickToZoom
          ? "Toggle layers · click a node to focus · zoom (or double-click canvas)"
          : "Toggle layers · click a node to focus neighbors";
    }

    svg.addEventListener("click", () => {
      selected = null;
      paint();
    });

    if (clickToZoom) {
      svg.addEventListener("dblclick", (event) => {
        // Double-click empty canvas / links to zoom; ignore node glyphs
        if (event.target.closest?.(".nl-node")) return;
        event.preventDefault();
        event.stopPropagation();
        setZoomed(!zoomed);
      });
      svg.classList.add("nl-svg-zoomable");
      const onKey = (event) => {
        if (event.key === "Escape" && zoomed) {
          event.stopPropagation();
          setZoomed(false);
        }
      };
      window.addEventListener("keydown", onKey);
    }

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.attributeName === "data-theme")) {
        /* theme tokens flow via CSS; force a class tick for polish */
        el.dataset.nlTheme = root.getAttribute("data-theme") || "light";
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    const shellEl = document.getElementById("xframe");
    if (shellEl && shellEl !== root) {
      observer.observe(shellEl, { attributes: true, attributeFilter: ["data-theme"] });
    }

    shell.append(toolbar, svg, meta);
    el.replaceChildren(shell);
    paint();
  }

  function init(hosts) {
    for (const host of hosts) {
      if (host instanceof HTMLElement) mount(host);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init(roots));
  } else {
    init(roots);
  }
})();
