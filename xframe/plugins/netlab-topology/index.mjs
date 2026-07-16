import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { loadTopologyString, transform } from "@exergy-connect/netlab";
import { parseFenceBody } from "./lib/parse-fence.mjs";
import { buildVizModel } from "./lib/viz-model.mjs";
import { renderStaticSvg } from "./lib/render-svg.mjs";

/**
 * xFrame content plugin: netlab topology YAML → layered SVG (static) or
 * interactive VizModel mount (dynamic).
 */
export default {
  type: "netlab",
  version: 1,
  div_class: "netlab-topology",

  async transform(context) {
    const attrs = context.directive?.attributes ?? context.node.options;
    const { yaml, show, clickToZoom } = parseFenceBody(context.body, attrs);

    if (!yaml.trim()) {
      throw new Error("netlab content plugin: fence body is empty (expected topology YAML)");
    }

    let topology;
    try {
      const loaded = loadTopologyString(yaml);
      const result = transform(loaded, { validate: false });
      topology = result.topology;
      if (result.diagnostics?.hasErrors?.()) {
        const errs = result.diagnostics.list().filter((d) => d.severity === "error");
        if (errs.length) {
          throw new Error(errs.map((d) => d.message).join("; "));
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`netlab content plugin: transform failed — ${msg}`);
    }

    const model = buildVizModel(topology, show, { clickToZoom });

    if (context.evaluation === "dynamic") {
      const options = { ...(context.node.options ?? {}) };
      if (clickToZoom) options.click_to_zoom = "true";
      else options.click_to_zoom = "false";
      return {
        nodes: {
          index: context.node.index,
          kind: "widget",
          widget: {
            type: context.type,
            body: JSON.stringify(model),
          },
          options,
          provenance: context.node.provenance,
        },
        includeRuntime: true,
      };
    }

    mkdirSync(context.generatedDir, { recursive: true });
    const absolute = path.join(context.generatedDir, context.fileName);
    const svg = renderStaticSvg(model, { layers: model.show });
    writeFileSync(absolute, svg, "utf8");
    const src = path
      .relative(context.sourceDir, absolute)
      .split(path.sep)
      .join("/");

    const label = model.name || model.nodes.map((n) => n.name).join(", ") || "netlab topology";
    return {
      index: context.node.index,
      kind: "media",
      media: {
        src,
        alt: context.directive?.attributes.alt ?? label,
        caption: context.directive?.attributes.caption,
      },
      options: context.node.options,
      provenance: context.node.provenance,
    };
  },
};
