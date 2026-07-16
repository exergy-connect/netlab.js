/**
 * Browser-safe entry: transform without YANG/xYang filesystem validation.
 */
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
export { getPath, setPath, hasPath } from "./data/path.js";
export { DiagnosticCollector } from "./diagnose/collector.js";

export { loadTopologyString, parseTopologyText, applyDefaults } from "./load/parse.js";
export { systemDefaults } from "./load/defaults.js";

export { transform } from "./transform/browser-transform.js";
export type { TransformOptions, TransformResult } from "./transform/browser-transform.js";
export { cleanupTopology, exportTopology } from "./transform/cleanup.js";

export { createNodeDict, transformNodes, formatIfName } from "./nodes/nodes.js";
export { canonicalizeLinks, transformLinks } from "./links/links.js";
export { setupAddressing, allocateLinkPrefix, resetPoolCursors } from "./addressing/ipam.js";
export { loadDevices, getDevice } from "./devices/registry.js";
