import path from "node:path";
import { fileURLToPath } from "node:url";
import { YangParser, YangValidator, type YangModule } from "@exergy-connect/xyang";

let cachedModule: YangModule | undefined;
let cachedYangDir: string | undefined;

export function defaultYangDir(): string {
  // Browser / Vite: lab-viewer fs shim serves the tree at /yang
  if (!import.meta.url.startsWith("file:")) {
    return "/yang";
  }
  // packages/core/src/validate -> repo yang/
  const here = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(here, "../../../../yang");
}

export function loadNetlabYang(yangDir: string = defaultYangDir()): YangModule {
  if (cachedModule && cachedYangDir === yangDir) return cachedModule;

  const topologyPath = path.join(yangDir, "netlab-topology.yang");
  const includePaths = [yangDir, path.join(yangDir, "modules")];

  // One parser cache so modular augment modules mutate the shared host schema.
  const parser = new YangParser({ include_path: includePaths, expand_uses: true });
  const module = parser.parseFile(topologyPath);

  for (const extra of [
    "netlab-internal.yang",
    "modules/netlab-ospf.yang",
    "modules/netlab-bgp.yang",
    "modules/netlab-vlan.yang",
    "modules/netlab-vrf.yang",
    "modules/netlab-isis.yang",
    "modules/netlab-vxlan.yang",
    "modules/netlab-evpn.yang",
  ]) {
    try {
      parser.parseFile(path.join(yangDir, extra));
    } catch {
      // optional during early scaffold
    }
  }

  cachedModule = module;
  cachedYangDir = yangDir;
  return cachedModule;
}

export function createValidator(yangDir?: string): YangValidator {
  const mod = loadNetlabYang(yangDir);
  return new YangValidator(mod);
}
