import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createNodeDict } from "../../src/nodes/nodes.js";
import { canonicalizeLinks } from "../../src/links/links.js";
import { INTERNAL_LINKNAME } from "../../src/types.js";
import type { Topology } from "../../src/types.js";

describe("canonicalize", () => {
  it("expands list node names and link shorthand", () => {
    const topology: Topology = {
      nodes: createNodeDict(["r1", "r2"]),
      links: [["r1", "r2"]],
    };
    canonicalizeLinks(topology);
    assert.equal(topology.nodes!.r1!.name, "r1");
    assert.equal(topology.links!.length, 1);
    assert.equal(topology.links![0]!.linkindex, 1);
    assert.equal(topology.links![0]![INTERNAL_LINKNAME], "links[1]");
    assert.deepEqual(
      topology.links![0]!.interfaces!.map((i) => i.node),
      ["r1", "r2"],
    );
  });

  it("splits dict-style link attachments", () => {
    const topology: Topology = {
      nodes: createNodeDict({ r1: {}, r2: {} }),
      links: [{ r1: null, r2: null, bandwidth: 1000 }],
    };
    canonicalizeLinks(topology);
    assert.equal(topology.links![0]!.bandwidth, 1000);
    assert.equal(topology.links![0]!.interfaces!.length, 2);
  });
});
