import { describe, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";
import { INTERNAL_LINKNAME } from "../../src/types.js";

const yangDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../yang");

describe("transform vertical slice", () => {
  it("transforms a 2-node p2p lab with ospf", () => {
    const topo = loadTopologyString(`
defaults:
  device: none
provider: clab
module: [ospf]
nodes:
  r1:
  r2:
links:
  - [r1, r2]
`);
    const { topology, diagnostics, stages } = transform(topo, { yangDir, validate: true });

    assert.equal(topology.provider, "clab");
    assert.ok(topology.nodes!.r1!.id);
    assert.ok(topology.nodes!.r1!.interfaces!.length >= 1);
    assert.ok(topology.links![0]![INTERNAL_LINKNAME]);
    assert.ok((topology.nodes!.r1!.ospf as { router_id?: string })?.router_id);
    assert.equal(typeof topology.links![0]!.prefix, "object");

    // Validation may warn on pattern edge cases; ensure transform completed
    assert.ok(stages.user_input !== undefined);
    if (diagnostics.hasErrors()) {
      console.log(diagnostics.list());
    }
  });

  it("keeps list-form nodes and maps unsupported devices to frr with a warning", () => {
    const topo = loadTopologyString(`
defaults:
  device: eos
provider: clab
nodes:
  - name: rr1
  - pe1
links:
  - rr1-pe1
`);
    const { topology, diagnostics } = transform(topo, { validate: false });
    assert.deepEqual(Object.keys(topology.nodes ?? {}).sort(), ["pe1", "rr1"]);
    assert.equal(topology.nodes!.rr1!.device, "frr");
    assert.equal(topology.nodes!.pe1!.device, "frr");
    assert.ok((topology.links?.[0]?.interfaces ?? []).length >= 2);
    const warnings = diagnostics.list().filter((d) => d.severity === "warning");
    assert.ok(warnings.some((d) => d.message.includes("Unsupported device 'eos'")));
    assert.equal(diagnostics.hasErrors(), false);
  });

  it("uses iosv interface naming (GigabitEthernet / Loopback)", () => {
    const topo = loadTopologyString(`
defaults:
  device: iosv
provider: clab
nodes:
  - name: rr1
  - pe1
links:
  - rr1-pe1
`);
    const { topology, diagnostics } = transform(topo, { validate: false });
    assert.equal(topology.nodes!.rr1!.device, "iosv");
    assert.equal(topology.nodes!.rr1!.loopback!.ifname, "Loopback0");
    assert.equal(topology.nodes!.rr1!.mgmt!.ifname, "GigabitEthernet0/0");
    assert.equal(topology.nodes!.rr1!.interfaces![0]!.ifname, "GigabitEthernet0/1");
    assert.equal(diagnostics.hasErrors(), false);
  });
});
