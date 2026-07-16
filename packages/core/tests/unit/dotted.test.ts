import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { expandDottedKeys } from "../../src/data/dotted.js";
import { loadTopologyString, parseTopologyText } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";

describe("dotted keys (Netlab box_dots)", () => {
  it("expands nested dotted keys and merges with existing objects", () => {
    assert.deepEqual(expandDottedKeys({ "bgp.as": 65000 }), { bgp: { as: 65000 } });
    assert.deepEqual(
      expandDottedKeys({
        bgp: { rr: true },
        "bgp.as": 65000,
        "bgp.community.standard": ["standard"],
      }),
      { bgp: { rr: true, as: 65000, community: { standard: ["standard"] } } },
    );
  });

  it("parses topology YAML dotted forms like Netlab", () => {
    const topo = parseTopologyText(`
defaults.device: frr
provider: clab
module: [bgp]
bgp.as: 65000
nodes:
  r1:
  r2:
links:
  - [r1, r2]
`);
    assert.equal((topo.defaults as { device?: string }).device, "frr");
    assert.deepEqual(topo.bgp, { as: 65000 });
    assert.ok(!("bgp.as" in (topo as object)));
  });

  it("inherits top-level bgp.as onto nodes after transform", () => {
    const topo = loadTopologyString(`
defaults.device: frr
provider: clab
module: [bgp]
bgp.as: 65000
nodes:
  r1:
  r2:
links:
  - [r1, r2]
`);
    const { topology, diagnostics } = transform(topo, { validate: false });
    assert.equal(diagnostics.hasErrors(), false);
    assert.equal((topology.nodes!.r1!.bgp as { as?: number }).as, 65000);
    assert.equal((topology.nodes!.r2!.bgp as { as?: number }).as, 65000);
  });

  it("expands dotted keys inside node dictionaries", () => {
    const topo = parseTopologyText(`
defaults:
  device: frr
nodes:
  r1:
    bgp.as: 65000
`);
    assert.deepEqual(topo.nodes!.r1, { bgp: { as: 65000 } });
  });
});
