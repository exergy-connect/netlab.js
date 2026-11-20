import type { Topology } from "@exergy-connect/netlab";

export type Edge = readonly [string, string];

/** Collect unique undirected edges from topology links (clique expansion). */
export function collectEdges(topology: Topology): Edge[] {
  const seen = new Set<string>();
  const edges: Edge[] = [];
  for (const link of topology.links ?? []) {
    if (link.type === "vlan_member") continue;
    const ifaces = link.interfaces ?? [];
    if (ifaces.length < 2) continue;
    for (let i = 0; i < ifaces.length; i++) {
      for (let j = i + 1; j < ifaces.length; j++) {
        const a = String(ifaces[i]!.node);
        const b = String(ifaces[j]!.node);
        if (!a || !b || a === b) continue;
        const key = a < b ? `${a}\0${b}` : `${b}\0${a}`;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push(a < b ? [a, b] : [b, a]);
      }
    }
  }
  return edges;
}

/** Count chord crossings for a circular node order. */
export function countCircularCrossings(
  order: readonly string[],
  edges: readonly Edge[],
): number {
  const n = order.length;
  if (n < 4 || edges.length < 2) return 0;
  const pos = new Map<string, number>();
  order.forEach((name, i) => pos.set(name, i));

  const chords: [number, number][] = [];
  for (const [u, v] of edges) {
    const i = pos.get(u);
    const j = pos.get(v);
    if (i === undefined || j === undefined) continue;
    chords.push(i < j ? [i, j] : [j, i]);
  }

  let crossings = 0;
  for (let a = 0; a < chords.length; a++) {
    const [i, j] = chords[a]!;
    for (let b = a + 1; b < chords.length; b++) {
      const [k, l] = chords[b]!;
      // Distinct endpoints and interleaved: i < k < j < l or k < i < l < j
      if (i === k || i === l || j === k || j === l) continue;
      if ((i < k && k < j && j < l) || (k < i && i < l && l < j)) {
        crossings++;
      }
    }
  }
  return crossings;
}

function degreeMap(nodes: readonly string[], edges: readonly Edge[]): Map<string, number> {
  const deg = new Map<string, number>();
  for (const n of nodes) deg.set(n, 0);
  for (const [u, v] of edges) {
    if (deg.has(u)) deg.set(u, (deg.get(u) ?? 0) + 1);
    if (deg.has(v)) deg.set(v, (deg.get(v) ?? 0) + 1);
  }
  return deg;
}

/** BFS order starting from the highest-degree node (stable among ties). */
function seedOrder(nodes: readonly string[], edges: readonly Edge[]): string[] {
  if (nodes.length === 0) return [];
  const deg = degreeMap(nodes, edges);
  const adj = new Map<string, string[]>();
  for (const n of nodes) adj.set(n, []);
  for (const [u, v] of edges) {
    if (!adj.has(u) || !adj.has(v)) continue;
    adj.get(u)!.push(v);
    adj.get(v)!.push(u);
  }
  for (const list of adj.values()) {
    list.sort((a, b) => a.localeCompare(b));
  }

  let start = nodes[0]!;
  let bestDeg = deg.get(start) ?? 0;
  for (const n of nodes) {
    const d = deg.get(n) ?? 0;
    if (d > bestDeg || (d === bestDeg && n.localeCompare(start) < 0)) {
      start = n;
      bestDeg = d;
    }
  }

  const order: string[] = [];
  const seen = new Set<string>();
  const queue = [start];
  seen.add(start);
  while (queue.length) {
    const u = queue.shift()!;
    order.push(u);
    for (const v of adj.get(u) ?? []) {
      if (seen.has(v)) continue;
      seen.add(v);
      queue.push(v);
    }
  }
  // Isolated / other components, stable by name
  const rest = nodes.filter((n) => !seen.has(n)).sort((a, b) => a.localeCompare(b));
  for (const n of rest) {
    if (seen.has(n)) continue;
    // BFS within each remaining component
    const q = [n];
    seen.add(n);
    while (q.length) {
      const u = q.shift()!;
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

/** Circular mean of neighbor positions (handles wrap-around via vectors). */
function circularBarycenter(positions: number[], n: number): number {
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

function applyBarycenter(
  order: string[],
  edges: readonly Edge[],
): string[] {
  const n = order.length;
  if (n < 3) return order.slice();

  const adj = new Map<string, string[]>();
  for (const name of order) adj.set(name, []);
  for (const [u, v] of edges) {
    if (!adj.has(u) || !adj.has(v)) continue;
    adj.get(u)!.push(v);
    adj.get(v)!.push(u);
  }

  const pos = new Map<string, number>();
  order.forEach((name, i) => pos.set(name, i));

  // Desired slot for each node
  const desired = new Map<string, number>();
  for (const name of order) {
    const neigh = adj.get(name) ?? [];
    if (neigh.length === 0) {
      desired.set(name, pos.get(name)!);
      continue;
    }
    const npos = neigh.map((v) => pos.get(v)!);
    desired.set(name, circularBarycenter(npos, n));
  }

  // Sort by desired position; break ties by current position then name
  const next = order.slice().sort((a, b) => {
    const da = desired.get(a)!;
    const db = desired.get(b)!;
    if (da !== db) return da - db;
    const pa = pos.get(a)!;
    const pb = pos.get(b)!;
    if (pa !== pb) return pa - pb;
    return a.localeCompare(b);
  });
  return next;
}

function improveByAdjacentSwaps(
  order: string[],
  edges: readonly Edge[],
): string[] {
  const best = order.slice();
  let bestScore = countCircularCrossings(best, edges);
  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 0; i < best.length; i++) {
      const j = (i + 1) % best.length;
      const trial = best.slice();
      const tmp = trial[i]!;
      trial[i] = trial[j]!;
      trial[j] = tmp;
      const score = countCircularCrossings(trial, edges);
      if (score < bestScore) {
        for (let k = 0; k < best.length; k++) best[k] = trial[k]!;
        bestScore = score;
        improved = true;
      }
    }
  }
  return best;
}

function factorialPermutations(nodes: readonly string[]): string[][] {
  if (nodes.length === 0) return [[]];
  if (nodes.length === 1) return [[nodes[0]!]];
  const result: string[][] = [];
  const used = new Array(nodes.length).fill(false);
  const cur: string[] = [];
  const dfs = () => {
    if (cur.length === nodes.length) {
      result.push(cur.slice());
      return;
    }
    for (let i = 0; i < nodes.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      cur.push(nodes[i]!);
      dfs();
      cur.pop();
      used[i] = false;
    }
  };
  dfs();
  return result;
}

/**
 * Return a circular node order that heuristically minimizes chord crossings.
 * For n ≤ 8, tries all permutations; otherwise BFS seed + barycenter + swaps.
 */
export function orderForMinimalCrossings(
  nodes: readonly string[],
  edges: readonly Edge[],
): string[] {
  if (nodes.length <= 1) return nodes.slice();
  if (edges.length === 0) {
    return nodes.slice().sort((a, b) => a.localeCompare(b));
  }

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

  // Also try reverse (reflection) of best
  const reflected = best.slice().reverse();
  const refScore = countCircularCrossings(reflected, edges);
  if (refScore < bestScore) return reflected;
  return best;
}

/** Lay out the backbone on an aspect-aware grid, then place hosts near peers. */
export function layoutTopology(
  names: readonly string[], edges: readonly Edge[], hosts: ReadonlySet<string>,
  radius: (name: string) => number, aspect: number,
  nodeId: (name: string) => number | undefined = () => undefined,
): Map<string, { x: number; y: number }> {
  const ratio = Math.max(0.5, Math.min(4, Number.isFinite(aspect) ? aspect : 1.6));
  const coreNames = names.filter((name) => !hosts.has(name));
  const core = orderForMinimalCrossings(coreNames, edges);
  const positions = new Map<string, { x: number; y: number }>();
  const spacing = 2 * Math.max(34, ...core.map(radius)) + 240;
  // Give links extra horizontal room on wide panels without stretching nodes.
  const horizontalSpacing = spacing * Math.max(1, Math.min(2, ratio * 0.85));
  const hostDegree = (name: string) => edges.filter(([a, b]) => (a === name && hosts.has(b)) || (b === name && hosts.has(a))).length;
  const score = (order: readonly string[], slots: readonly { x: number; y: number }[]) => {
    const lookup = new Map(order.map((name, i) => [name, slots[i]!]));
    let result = 0;
    for (const [a, b] of edges) {
      const p = lookup.get(a), q = lookup.get(b);
      if (!p || !q) continue;
      const vx = q.x - p.x, vy = q.y - p.y;
      const dx = Math.abs(vx) / spacing, dy = Math.abs(vy) / spacing;
      result += (dx && dy ? 10 : 0) + dx + dy;
      // A link passing through a third node can be mistaken for a different link.
      for (const name of order) {
        if (name === a || name === b) continue;
        const r = lookup.get(name)!;
        const t = ((r.x - p.x) * vx + (r.y - p.y) * vy) / (vx * vx + vy * vy);
        if (t > 0 && t < 1 && Math.hypot(r.x - p.x - t * vx, r.y - p.y - t * vy) < radius(name) + 20) result += 100;
      }
    }
    for (let i = 0; i < order.length; i++) for (let j = i + 1; j < order.length; j++) {
      const a = order[i]!, b = order[j]!, idA = nodeId(a), idB = nodeId(b);
      if (idA == null || idB == null || idA === idB) continue;
      const dx = lookup.get(a)!.x - lookup.get(b)!.x;
      if (dx && Math.sign(dx) !== Math.sign(idA - idB)) result += 0.3;
    }
    for (const name of order) result -= hostDegree(name) * Math.abs(lookup.get(name)!.x) / spacing * 0.6;
    return result;
  };
  let chosenOrder = core.slice();
  let chosenSlots: { x: number; y: number }[] = [];
  let chosenScore = Infinity;
  for (let columns = 1; columns <= Math.max(1, core.length); columns++) {
    const rows = Math.ceil(core.length / columns);
    const slots = core.map((_, i) => {
      const row = Math.floor(i / columns);
      const rowLength = Math.min(columns, core.length - row * columns);
      return { x: (i % columns - (rowLength - 1) / 2) * horizontalSpacing, y: (row - (rows - 1) / 2) * spacing };
    });
    let order = core.slice(), best = score(order, slots), improved = true;
    while (improved) {
      improved = false;
      for (let i = 0; i < order.length; i++) for (let j = i + 1; j < order.length; j++) {
        const trial = order.slice();
        [trial[i], trial[j]] = [trial[j]!, trial[i]!];
        const value = score(trial, slots);
        if (value < best - 1e-9) { order = trial; best = value; improved = true; }
      }
    }
    const shape = Math.abs(Math.log((columns / Math.max(rows, 1)) / ratio));
    if (best + shape < chosenScore) { chosenOrder = order; chosenSlots = slots; chosenScore = best + shape; }
  }
  chosenOrder.forEach((name, i) => positions.set(name, chosenSlots[i]!));
  // Mirror matching host groups when their backbone positions and links mirror.
  const groups = new Map<string, string[]>();
  for (const host of names.filter((name) => hosts.has(name))) {
    const peers = edges.flatMap(([a, b]) => a === host && coreNames.includes(b) ? [b] : b === host && coreNames.includes(a) ? [a] : []);
    if (peers.length === 1) groups.set(peers[0]!, [...(groups.get(peers[0]!) ?? []), host]);
  }
  for (const group of groups.values()) group.sort((a, b) => (nodeId(a) ?? Infinity) - (nodeId(b) ?? Infinity) || a.localeCompare(b));
  const adjacent = (a: string, b: string) => edges.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  const reflected = (p: { x: number; y: number }, q: { x: number; y: number }) =>
    Math.abs(p.x + q.x) < 1e-6 && Math.abs(p.y - q.y) < 1e-6;
  const mirroredCore = (left: string, right: string) => core.every((node) => {
    const mirror = core.find((candidate) => reflected(positions.get(node)!, positions.get(candidate)!));
    return mirror !== undefined && adjacent(left, node) === adjacent(right, mirror);
  });
  for (const left of core) {
    const anchor = positions.get(left)!;
    if (anchor.x >= -1e-6) continue;
    const right = core.find((name) => reflected(anchor, positions.get(name)!));
    const leftHosts = groups.get(left), rightHosts = right ? groups.get(right) : undefined;
    if (!right || !leftHosts?.length || !rightHosts || leftHosts.length !== rightHosts.length ||
        Math.abs(radius(left) - radius(right)) > 1e-6 || !mirroredCore(left, right) ||
        leftHosts.some((host, i) => Math.abs(radius(host) - radius(rightHosts[i]!)) > 1e-6)) continue;
    const otherAnchor = positions.get(right)!;
    const maxHostRadius = Math.max(...leftHosts.map(radius));
    const baseDistance = radius(left) + maxHostRadius + 130;
    for (let extra = 0; extra <= 350; extra += 35) {
      const distance = baseDistance + extra;
      const spread = Math.min(Math.PI / 3, Math.max(Math.PI / 7, 2 * Math.asin(Math.min(0.99, (2 * maxHostRadius + 35) / (2 * distance)))));
      const candidates = leftHosts.flatMap((host, i) => {
        const angle = (i - (leftHosts.length - 1) / 2) * spread;
        const x = anchor.x - distance * Math.cos(angle), y = anchor.y + distance * Math.sin(angle);
        return [{ name: host, x, y }, { name: rightHosts[i]!, x: otherAnchor.x + distance * Math.cos(angle), y: otherAnchor.y + distance * Math.sin(angle) }];
      });
      const clear = candidates.every((c, i) =>
        [...positions].every(([other, p]) => Math.hypot(c.x - p.x, c.y - p.y) >= radius(c.name) + radius(other) + 35) &&
        candidates.slice(0, i).every((other) => Math.hypot(c.x - other.x, c.y - other.y) >= radius(c.name) + radius(other.name) + 35));
      if (!clear) continue;
      for (const c of candidates) positions.set(c.name, { x: c.x, y: c.y });
      break;
    }
  }
  for (const name of names.filter((name) => hosts.has(name))) {
    if (positions.has(name)) continue;
    const peers = edges.flatMap(([a, b]) => a === name ? [b] : b === name ? [a] : []).filter((peer) => positions.has(peer));
    const anchor = peers.length ? {
      x: peers.reduce((sum, peer) => sum + positions.get(peer)!.x, 0) / peers.length,
      y: peers.reduce((sum, peer) => sum + positions.get(peer)!.y, 0) / peers.length,
    } : { x: 0, y: 0 };
    const startAngle = Math.hypot(anchor.x, anchor.y) > 1 ? Math.atan2(anchor.y, anchor.x) : 0;
    const minDistance = Math.max(34, ...peers.map(radius)) + radius(name) + 130;
    let choice = { x: anchor.x + minDistance, y: anchor.y }, bestScore = Infinity;
    for (let extra = 0; extra <= 350; extra += 35) for (let step = 0; step < 24; step++) {
      const angle = startAngle + (step % 2 ? 1 : -1) * Math.ceil(step / 2) * Math.PI / 12;
      const distance = minDistance + extra;
      const candidate = { x: anchor.x + distance * Math.cos(angle), y: anchor.y + distance * Math.sin(angle) };
      let collision = false;
      for (const [other, p] of positions) {
        if (Math.hypot(candidate.x - p.x, candidate.y - p.y) < radius(name) + radius(other) + 35) { collision = true; break; }
      }
      if (collision) continue;
      const points = [...positions.values(), candidate];
      const w = Math.max(...points.map((p) => p.x)) - Math.min(...points.map((p) => p.x)) + 2 * spacing;
      const h = Math.max(...points.map((p) => p.y)) - Math.min(...points.map((p) => p.y)) + 2 * spacing;
      const fit = Math.max(w / ratio, h);
      const candidateScore = fit + extra * 0.8 + Math.abs(step > 12 ? 24 - step : step) * 0.1;
      if (candidateScore < bestScore) { bestScore = candidateScore; choice = candidate; }
    }
    positions.set(name, choice);
  }
  return positions;
}
