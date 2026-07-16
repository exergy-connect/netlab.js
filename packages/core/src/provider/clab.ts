import type { Topology, TransformContext } from "../types.js";

/** clab-only provider hooks (topology-data aspects). */
export function selectProvider(topology: Topology, ctx: TransformContext): void {
  if (!topology.provider) topology.provider = "clab";
  if (topology.provider !== "clab") {
    ctx.diagnostics.error({
      code: "VALUE",
      category: "VALUE",
      module: "provider",
      message: `Unsupported provider '${topology.provider}' (only clab is supported)`,
      path: "provider",
    });
  }
}

export function providerPreTransform(_topology: Topology, _ctx: TransformContext): void {
  // clab addressing overlays could go here
}

export function providerPostTransform(topology: Topology, _ctx: TransformContext): void {
  // Ensure clab-friendly defaults remain present
  if (!topology.provider) topology.provider = "clab";
}
