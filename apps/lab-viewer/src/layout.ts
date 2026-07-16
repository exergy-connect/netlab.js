import type { Topology } from "@exergy-connect/netlab";

export type Edge = readonly [string, string];

/** Collect unique undirected edges from topology links (clique expansion). */
export function collectEdges(topology: Topology): Edge[] {
  const seen = new Set<string>();
  const edges: Edge[] = [];
  for (const link of topology.links ?? []) {
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
