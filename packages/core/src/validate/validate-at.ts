import type { DiagnosticCollectorLike, Stage, Topology } from "../types.js";
import { mapXyangError } from "../diagnose/collector.js";
import { createValidator, defaultYangDir } from "./schema.js";
import { toYangInstance } from "./instance-adapter.js";

export type ValidateAtOptions = {
  yangDir?: string;
  diagnostics?: DiagnosticCollectorLike;
};

/**
 * Set topology.stage then validate the adapted YANG instance with xYang.
 */
export function validateAt(
  topology: Topology,
  stage: Stage,
  options: ValidateAtOptions = {},
): { ok: boolean; errors: string[]; warnings: string[] } {
  topology.stage = stage;
  const yangDir = options.yangDir ?? defaultYangDir();
  const validator = createValidator(yangDir);
  const instance = toYangInstance(topology);
  const result = validator.validate(instance);

  if (options.diagnostics) {
    for (const err of result.errors) {
      options.diagnostics.error(mapXyangError(err));
    }
    for (const warn of result.warnings) {
      options.diagnostics.warning(mapXyangError(warn));
    }
  }

  return { ok: result.isValid, errors: result.errors, warnings: result.warnings };
}
