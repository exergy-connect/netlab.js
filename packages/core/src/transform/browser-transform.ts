import type { Stage, Topology } from "../types.js";
import type { DiagnosticCollector } from "../diagnose/collector.js";
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

/** Browser transform: always skips YANG validation. */
export function transform(topology: Topology, _options: TransformOptions = {}): TransformResult {
  const { topology: result, diagnostics } = runPipeline(topology);
  return { topology: result, diagnostics, stages: {} };
}
