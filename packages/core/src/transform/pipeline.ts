import type { Topology, TransformContext } from "../types.js";
import { DiagnosticCollector } from "../diagnose/collector.js";
import { loadDevices } from "../devices/registry.js";
import { createNodeDict, applyNodeDeviceDefaults, transformNodes } from "../nodes/nodes.js";
import { canonicalizeLinks, transformLinks } from "../links/links.js";
import { setupAddressing } from "../addressing/ipam.js";
import { initGroups, autoCreateGroupMembers, copyGroupData } from "../groups/groups.js";
import { expandComponents } from "../components/components.js";
import {
  checkUnknownModules,
  collectTopologyModules,
  copyNodeModuleAttrsToInterfaces,
  mergeModuleParams,
  runModuleHook,
} from "../modules/registry.js";
import { selectProvider, providerPreTransform, providerPostTransform } from "../provider/clab.js";
import { processQuirks } from "../devices/quirks.js";
import { applyDefaults } from "../load/parse.js";

export type PipelineHooks = {
  afterSetup?: (topology: Topology, ctx: TransformContext) => void;
  afterAddressed?: (topology: Topology, ctx: TransformContext) => void;
  afterTransformed?: (topology: Topology, ctx: TransformContext) => void;
};

export type PipelineResult = {
  topology: Topology;
  diagnostics: DiagnosticCollector;
  ctx: TransformContext;
};

/** Core transform pipeline without YANG validation (browser + Node). */
export function runPipeline(topology: Topology, hooks: PipelineHooks = {}): PipelineResult {
  const diagnostics = new DiagnosticCollector();
  const devices = loadDevices();
  const ctx: TransformContext = { diagnostics, devices };

  applyDefaults(topology);
  selectProvider(topology, ctx);

  initGroups(topology);
  autoCreateGroupMembers(topology);
  topology.nodes = createNodeDict(topology.nodes, diagnostics);
  expandComponents(topology);
  canonicalizeLinks(topology, diagnostics);
  copyGroupData(topology);
  applyNodeDeviceDefaults(topology, diagnostics);

  if (Array.isArray(topology.module)) {
    for (const node of Object.values(topology.nodes)) {
      if (node.role === "host" && !node["netlab-internal:_daemon"]) {
        continue;
      }
      const set = new Set([...(node.module ?? []), ...topology.module]);
      node.module = [...set];
    }
  }

  mergeModuleParams(topology);
  checkUnknownModules(topology, diagnostics);
  runModuleHook("module_init", topology, ctx);
  setupAddressing(topology);

  hooks.afterSetup?.(topology, ctx);

  providerPreTransform(topology, ctx);
  runModuleHook("module_pre_transform", topology, ctx);
  runModuleHook("node_pre_transform", topology, ctx);

  transformNodes(topology);

  runModuleHook("link_pre_transform", topology, ctx);
  transformLinks(topology);
  runModuleHook("link_post_transform", topology, ctx);

  runModuleHook("node_post_transform", topology, ctx);
  copyNodeModuleAttrsToInterfaces(topology);
  runModuleHook("module_post_transform", topology, ctx);

  hooks.afterAddressed?.(topology, ctx);

  processQuirks(topology);
  providerPostTransform(topology, ctx);
  topology.module = collectTopologyModules(topology);

  hooks.afterTransformed?.(topology, ctx);

  return { topology, diagnostics, ctx };
}
