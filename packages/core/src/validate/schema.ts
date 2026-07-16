import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseYangFile, YangValidator, type YangModule } from "@exergy-connect/xyang";

let cachedModule: YangModule | undefined;
let cachedYangDir: string | undefined;

export function defaultYangDir(): string {
  // packages/core/src/validate -> repo yang/
  const here = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(here, "../../../../yang");
}

export function loadNetlabYang(yangDir: string = defaultYangDir()): YangModule {
  if (cachedModule && cachedYangDir === yangDir) return cachedModule;

  const topologyPath = path.join(yangDir, "netlab-topology.yang");
  const includePaths = [yangDir, path.join(yangDir, "modules")];

  // Parse host module with includes so imports/augments resolve
  const module = parseYangFile(topologyPath, { includePath: includePaths });

  // Also parse augment modules so they merge (xYang expands augments when loading via include path)
  for (const extra of [
    "netlab-internal.yang",
    "modules/netlab-ospf.yang",
    "modules/netlab-bgp.yang",
    "modules/netlab-vlan.yang",
    "modules/netlab-vrf.yang",
    "modules/netlab-isis.yang",
  ]) {
    try {
      parseYangFile(path.join(yangDir, extra), { includePath: includePaths });
    } catch {
      // optional during early scaffold
    }
  }

  // Re-parse topology with all modules on the include path so augments apply
  cachedModule = parseYangFile(topologyPath, { includePath: includePaths });
  cachedYangDir = yangDir;
  return cachedModule;
}

export function createValidator(yangDir?: string): YangValidator {
  const mod = loadNetlabYang(yangDir);
  return new YangValidator(mod);
}
