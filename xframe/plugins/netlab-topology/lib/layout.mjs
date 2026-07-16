/**
 * Layout helpers: circular crossing minimization + role-aware tiers.
 */

/**
 * @typedef {readonly [string, string]} Edge
 */

/**
 * @param {readonly string[]} order
 * @param {readonly Edge[]} edges
 */
export function countCircularCrossings(order, edges) {
  const n = order.length;
  if (n < 4 || edges.length < 2) return 0;
  const pos = new Map();
  order.forEach((name, i) => pos.set(name, i));
  const chords = [];
  for (const [u, v] of edges) {
    const i = pos.get(u);
    const j = pos.get(v);
    if (i === undefined || j === undefined) continue;
    chords.push(i < j ? [i, j] : [j, i]);
  }
  let crossings = 0;
  for (let a = 0; a < chords.length; a++) {
    const [i, j] = chords[a];
    for (let b = a + 1; b < chords.length; b++) {
      const [k, l] = chords[b];
      if (i === k || i === l || j === k || j === l) continue;
      if ((i < k && k < j && j < l) || (k < i && i < l && l < j)) crossings++;
    }
  }
  return crossings;
}

function degreeMap(nodes, edges) {
  const deg = new Map();
  for (const n of nodes) deg.set(n, 0);
  for (const [u, v] of edges) {
    if (deg.has(u)) deg.set(u, (deg.get(u) ?? 0) + 1);
    if (deg.has(v)) deg.set(v, (deg.get(v) ?? 0) + 1);
  }
  return deg;
}

function seedOrder(nodes, edges) {
  if (nodes.length === 0) return [];
  const deg = degreeMap(nodes, edges);
  const adj = new Map();
  for (const n of nodes) adj.set(n, []);
  for (const [u, v] of edges) {
    if (!adj.has(u) || !adj.has(v)) continue;
    adj.get(u).push(v);
    adj.get(v).push(u);
  }
  for (const list of adj.values()) list.sort((a, b) => a.localeCompare(b));

  let start = nodes[0];
  let bestDeg = deg.get(start) ?? 0;
  for (const n of nodes) {
    const d = deg.get(n) ?? 0;
    if (d > bestDeg || (d === bestDeg && n.localeCompare(start) < 0)) {
      start = n;
      bestDeg = d;
    }
  }

  const order = [];
  const seen = new Set();
  const queue = [start];
  seen.add(start);
  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    for (const v of adj.get(u) ?? []) {
      if (seen.has(v)) continue;
      seen.add(v);
      queue.push(v);
    }
  }
  const rest = nodes.filter((n) => !seen.has(n)).sort((a, b) => a.localeCompare(b));
  for (const n of rest) {
    if (seen.has(n)) continue;
    const q = [n];
    seen.add(n);
    while (q.length) {
      const u = q.shift();
      order.push(u);
      for (const v of adj.get(u) ?? []) {
        if (seen.has(v)) continue;
        seen.add(v);
        q.push(v);
      }
    }
  }
  return order;
}

function circularBarycenter(positions, n) {
  if (positions.length === 0) return 0;
  let sx = 0;
  let sy = 0;
  for (const p of positions) {
    const a = (2 * Math.PI * p) / n;
    sx += Math.cos(a);
    sy += Math.sin(a);
  }
  const angle = Math.atan2(sy / positions.length, sx / positions.length);
  let idx = Math.round((angle / (2 * Math.PI)) * n);
  idx = ((idx % n) + n) % n;
  return idx;
}

function applyBarycenter(order, edges) {
  const n = order.length;
  if (n < 3) return order.slice();
  const adj = new Map();
  for (const name of order) adj.set(name, []);
  for (const [u, v] of edges) {
    if (!adj.has(u) || !adj.has(v)) continue;
    adj.get(u).push(v);
    adj.get(v).push(u);
  }
  const pos = new Map();
  order.forEach((name, i) => pos.set(name, i));
  const desired = new Map();
  for (const name of order) {
    const neigh = adj.get(name) ?? [];
    if (!neigh.length) {
      desired.set(name, pos.get(name));
      continue;
    }
    desired.set(name, circularBarycenter(neigh.map((v) => pos.get(v)), n));
  }
  return order.slice().sort((a, b) => {
    const da = desired.get(a);
    const db = desired.get(b);
    if (da !== db) return da - db;
    const pa = pos.get(a);
    const pb = pos.get(b);
    if (pa !== pb) return pa - pb;
    return a.localeCompare(b);
  });
}

function improveByAdjacentSwaps(order, edges) {
  const best = order.slice();
  let bestScore = countCircularCrossings(best, edges);
  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 0; i < best.length; i++) {
      const j = (i + 1) % best.length;
      const trial = best.slice();
      const tmp = trial[i];
      trial[i] = trial[j];
      trial[j] = tmp;
      const score = countCircularCrossings(trial, edges);
      if (score < bestScore) {
        for (let k = 0; k < best.length; k++) best[k] = trial[k];
        bestScore = score;
        improved = true;
      }
    }
  }
  return best;
}

function factorialPermutations(nodes) {
  if (nodes.length === 0) return [[]];
  if (nodes.length === 1) return [[nodes[0]]];
  const result = [];
  const used = new Array(nodes.length).fill(false);
  const cur = [];
  const dfs = () => {
    if (cur.length === nodes.length) {
      result.push(cur.slice());
      return;
    }
    for (let i = 0; i < nodes.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      cur.push(nodes[i]);
      dfs();
      cur.pop();
      used[i] = false;
    }
  };
  dfs();
  return result;
}

/**
 * @param {readonly string[]} nodes
 * @param {readonly Edge[]} edges
 */
export function orderForMinimalCrossings(nodes, edges) {
  if (nodes.length <= 1) return nodes.slice();
  if (edges.length === 0) return nodes.slice().sort((a, b) => a.localeCompare(b));

  if (nodes.length <= 8) {
    let best = nodes.slice();
    let bestScore = countCircularCrossings(best, edges);
    for (const perm of factorialPermutations(nodes)) {
      const score = countCircularCrossings(perm, edges);
      if (score < bestScore) {
        best = perm;
        bestScore = score;
        if (bestScore === 0) break;
      }
    }
    return best;
  }

  let order = seedOrder(nodes, edges);
  let best = order.slice();
  let bestScore = countCircularCrossings(best, edges);
  for (let iter = 0; iter < 24; iter++) {
    order = applyBarycenter(order, edges);
    order = improveByAdjacentSwaps(order, edges);
    const score = countCircularCrossings(order, edges);
    if (score < bestScore) {
      best = order.slice();
      bestScore = score;
      if (bestScore === 0) break;
    }
  }
  const reflected = best.slice().reverse();
  if (countCircularCrossings(reflected, edges) < bestScore) return reflected;
  return best;
}

const ROLE_TIER = {
  spine: 0,
  superspine: 0,
  core: 0,
  leaf: 1,
  tor: 1,
  access: 2,
  host: 3,
  server: 3,
  router: 1,
  switch: 1,
  bridge: 1,
};

/**
 * @param {Array<{ name: string, role?: string }>} nodes
 * @param {readonly Edge[]} edges
 * @param {{ width?: number, height?: number }} [opts]
 * @returns {{ width: number, height: number, positions: Map<string, { x: number, y: number }>, radius: number }}
 */
export function layoutNodes(nodes, edges, opts = {}) {
  const width = opts.width ?? 720;
  const height = opts.height ?? 420;
  const names = nodes.map((n) => n.name);
  const roles = new Map(nodes.map((n) => [n.name, String(n.role ?? "").toLowerCase()]));
  const tiers = new Map();
  let hasTieredRoles = false;
  for (const name of names) {
    const role = roles.get(name) ?? "";
    if (role && role in ROLE_TIER && role !== "router" && role !== "switch" && role !== "bridge") {
      hasTieredRoles = true;
    }
    tiers.set(name, ROLE_TIER[role] ?? 1);
  }

  /** @type {Map<string, { x: number, y: number }>} */
  const positions = new Map();
  const radius = 36;

  if (hasTieredRoles && names.length > 1) {
    const byTier = new Map();
    for (const name of names) {
      const t = tiers.get(name) ?? 1;
      if (!byTier.has(t)) byTier.set(t, []);
      byTier.get(t).push(name);
    }
    const tierKeys = [...byTier.keys()].sort((a, b) => a - b);
    const padX = 80;
    const padY = 70;
    const usableH = height - padY * 2;
    tierKeys.forEach((tier, ti) => {
      const row = byTier.get(tier).slice().sort((a, b) => a.localeCompare(b));
      const y = padY + (tierKeys.length === 1 ? usableH / 2 : (usableH * ti) / Math.max(tierKeys.length - 1, 1));
      const usableW = width - padX * 2;
      row.forEach((name, i) => {
        const x = row.length === 1
          ? width / 2
          : padX + (usableW * i) / Math.max(row.length - 1, 1);
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
      // Tiny deterministic offset so overlapping labels breathe
      const jitter = ((name.charCodeAt(0) % 5) - 2) * 1.5;
      positions.set(name, {
        x: cx + Math.cos(angle) * r + jitter,
        y: cy + Math.sin(angle) * r + jitter * 0.6,
      });
    });
  }

  return { width, height, positions, radius };
}

/**
 * Shorten a segment so endpoints sit on a circle of radius `r` around each node.
 * @param {{ x: number, y: number }} a
 * @param {{ x: number, y: number }} b
 * @param {number} r
 */
export function insetEndpoints(a, b, r) {
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

/**
 * Quadratic control point for a curved arc between a and b.
 * @param {{ x: number, y: number }} a
 * @param {{ x: number, y: number }} b
 * @param {number} bulge
 */
export function arcControl(a, b, bulge = 0.22) {
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

/**
 * Place a loopback label in the largest angular gap away from incident edges
 * (and optionally away from the node name which sits below the glyph).
 *
 * @param {string} nodeName
 * @param {Map<string, { x: number, y: number }>} positions
 * @param {readonly { from: string, to: string }[]} edges
 * @param {number} radius  node glyph radius
 * @returns {{ x: number, y: number }}
 */
export function loopbackAnchor(nodeName, positions, edges, radius) {
  const p = positions.get(nodeName);
  if (!p) return { x: 0, y: 0 };

  /** @type {number[]} */
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

  // Reserve the downward cone for the node name / device subtitle.
  const nameAngle = Math.PI / 2;
  angles.push(nameAngle - 0.55, nameAngle + 0.55);

  const dist = radius + 16;
  if (angles.length === 0) {
    // No edges: sit above-left so it doesn't collide with a centered title.
    return {
      x: p.x - dist * 0.35,
      y: p.y - dist,
    };
  }

  angles.sort((a, b) => a - b);
  // Unwrap: find largest gap on the circle
  let bestMid = angles[0] + Math.PI; // opposite of first if only one real edge
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
  // Normalize
  let mid = bestMid;
  while (mid > Math.PI) mid -= Math.PI * 2;
  while (mid < -Math.PI) mid += Math.PI * 2;

  return {
    x: p.x + Math.cos(mid) * dist,
    y: p.y + Math.sin(mid) * dist,
  };
}
