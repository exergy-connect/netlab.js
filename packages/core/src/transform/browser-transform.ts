import type { Stage, Topology } from "../types.js";
import type { DiagnosticCollector } from "../diagnose/collector.js";
import { validateAt } from "../validate/validate-at.js";
import { runPipeline } from "./pipeline.js";

export type TransformOptions = {
  yangDir?: string;
  validate?: boolean;
  cleanup?: boolean;
  snapshots?: Map<string, Topology>;
};

export type TransformResult = {
  topology: Topology;
  diagnostics: DiagnosticCollector;
  stages: Partial<Record<Stage, boolean>>;
};

/**
 * Browser transform. Pass `validate: true` to run YANG stage checkpoints
 * (lab-viewer supplies a Vite fs/path shim for the yang/ tree).
 */
export function transform(topology: Topology, options: TransformOptions = {}): TransformResult {
  const stages: Partial<Record<Stage, boolean>> = {};
  const doValidate = options.validate === true;

  const checkpoint = (topo: Topology, stage: Stage, diagnostics: DiagnosticCollector): void => {
    if (!doValidate) return;
    const r = validateAt(topo, stage, { yangDir: options.yangDir, diagnostics });
    stages[stage] = r.ok;
    options.snapshots?.set(stage, structuredClone(topo));
  };

  const { topology: result, diagnostics } = runPipeline(topology, {
    afterSetup: (topo, ctx) => {
      const d = ctx.diagnostics as DiagnosticCollector;
      checkpoint(topo, "user_input", d);
      checkpoint(topo, "normalized", d);
    },
    afterAddressed: (topo, ctx) => {
      checkpoint(topo, "addressed", ctx.diagnostics as DiagnosticCollector);
    },
    afterTransformed: (topo, ctx) => {
      checkpoint(topo, "transformed", ctx.diagnostics as DiagnosticCollector);
    },
  });

  return { topology: result, diagnostics, stages };
}
