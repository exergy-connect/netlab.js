import { YangValidator, parseJsonSchema, type YangModule } from "@exergy-connect/xyang";
import compiledSchema from "../generated/netlab-schema.json" with { type: "json" };

let compiledModule: YangModule | undefined;

/** Load the bundled Netlab schema once per process. */
export function loadNetlabYang(): YangModule {
  return compiledModule ??= parseJsonSchema(compiledSchema);
}

export function createValidator(): YangValidator {
  return new YangValidator(loadNetlabYang());
}
