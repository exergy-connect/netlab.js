import type { JsonObject, Node, Topology } from "../types.js";

/** Port of bird quirks: rewrite VRF RTs to BIRD (rt,a,b) form. */
export function processQuirks(topology: Topology): void {
  for (const node of Object.values(topology.nodes ?? {})) {
    if (node.device === "bird") birdQuirks(node);
  }
}

function birdTransformRt(rt: string): string {
  return `(rt,${rt.split(":").join(",")})`;
}

function birdQuirks(node: Node): void {
  const vrfs = node.vrfs as Record<string, JsonObject> | undefined;
  if (!vrfs) return;
  for (const vdata of Object.values(vrfs)) {
    for (const kw of ["import", "export"] as const) {
      const list = vdata[kw];
      if (!Array.isArray(list)) continue;
      vdata[`netlab-internal:_bird_${kw}`] = list.map((rt) =>
        typeof rt === "string" ? birdTransformRt(rt) : rt,
      );
    }
  }
}
