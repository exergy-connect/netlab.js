import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createNodeDict } from "../../src/nodes/nodes.js";
import { initGroups, copyGroupData } from "../../src/groups/groups.js";
import { expandComponents } from "../../src/components/components.js";
import type { Topology } from "../../src/types.js";

describe("groups and components", () => {
  it("copies group device/module onto members", () => {
    const topology: Topology = {
      nodes: createNodeDict(["r1", "r2"]),
      groups: {
        core: { members: ["r1", "r2"], device: "frr", module: ["ospf"] },
      },
    };
    initGroups(topology);
    copyGroupData(topology);
    assert.equal(topology.nodes!.r1!.device, "frr");
    assert.deepEqual(topology.nodes!.r1!.module, ["ospf"]);
  });

  it("expands component includes into prefixed nodes/links", () => {
    const topology: Topology = {
      nodes: {
        site: { name: "site", include: "pair" },
      },
      components: {
        pair: {
          nodes: { a: {}, b: {} },
          links: [["a", "b"]],
        },
      },
      links: [],
    } as Topology;
    expandComponents(topology);
    assert.ok(topology.nodes!.site_a);
    assert.ok(topology.nodes!.site_b);
    assert.equal(topology.nodes!.site, undefined);
    assert.equal(topology.links!.length, 1);
    assert.deepEqual(
      topology.links![0]!.interfaces!.map((i) => i.node).sort(),
      ["site_a", "site_b"],
    );
  });
});
