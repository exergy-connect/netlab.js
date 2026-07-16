export type {
  Topology,
  Node,
  Link,
  Interface,
  Stage,
  Diagnostic,
  DeviceDef,
  TransformContext,
} from "./types.js";
export { INTERNAL_LINKNAME, INTERNAL_NS, SUPPORTED_DEVICES, SUPPORTED_PROVIDER } from "./types.js";

export { deepMerge, cloneJson } from "./data/merge.js";
export { expandDottedKeys, expandDottedKeysInPlace } from "./data/dotted.js";
export { getPath, setPath, hasPath } from "./data/path.js";
export { DiagnosticCollector, mapXyangError } from "./diagnose/collector.js";

export {
  loadTopologyFile,
  loadTopologyString,
  parseTopologyText,
  applyDefaults,
} from "./load/load.js";
export { systemDefaults } from "./load/defaults.js";
export {
  getAttributes,
  getLinkPropagateAttributes,
  getLinkModuleNoPropagate,
  getPoolNoCopy,
} from "./load/attributes.js";

export { validateAt } from "./validate/validate-at.js";
export { loadNetlabYang, createValidator, defaultYangDir } from "./validate/schema.js";
export { toYangInstance } from "./validate/instance-adapter.js";

export { transform, transformAndExport } from "./transform/orchestrator.js";
export type { TransformOptions, TransformResult } from "./transform/orchestrator.js";
export { cleanupTopology, exportTopology } from "./transform/cleanup.js";

export { createNodeDict, transformNodes, formatIfName } from "./nodes/nodes.js";
export { canonicalizeLinks, transformLinks } from "./links/links.js";
export {
  setupAddressing,
  setupPools,
  createPoolSnapshot,
  allocateLinkPrefix,
  resetPoolCursors,
} from "./addressing/ipam.js";
export { loadDevices, getDevice, buildModuleSupportLists } from "./devices/registry.js";
export {
  initGroups,
  autoCreateGroupMembers,
  copyGroupData,
  createBgpAutogroups,
} from "./groups/groups.js";
export { expandComponents } from "./components/components.js";
export { listModules, collectTopologyModules, sortModules } from "./modules/registry.js";
export { loadModuleDefs, supportedModuleNames } from "./modules/defs.js";
