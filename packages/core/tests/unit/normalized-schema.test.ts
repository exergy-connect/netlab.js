import { it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { YangParser, YangValidator } from "@exergy-connect/xyang";
import { loadTopologyString } from "../../src/load/load.js";
import { exportMachineTopology } from "../../src/transform/machine-export.js";
import { transformAndExport } from "../../src/transform/orchestrator.js";

const yangDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../yang");

it("models the normalized core graph and rejects unsupported devices", () => {
  const parser = new YangParser({ include_path: [yangDir], expand_uses: true });
  const validator = new YangValidator(parser.parseFile(path.join(yangDir, "netlab.js.yang")));
  const result = transformAndExport(loadTopologyString(`
defaults.device: frr
nodes: { r1:, r2: }
links: [[r1, r2]]
`), { yangDir });
  assert.equal(result.diagnostics.hasErrors(), false);
  const output = exportMachineTopology(result.topology);
  assert.deepEqual(output.topology.nodes.map(node => node.name), ["r1", "r2"]);
  assert.ok(result.topology.nodes?.r1);
  assert.equal(Object.hasOwn(output.topology, "defaults"), false);
  assert.ok(result.topology.defaults);
  const valid = validator.validate(output);
  assert.equal(valid.isValid, true, valid.errors.join("\n"));
  const invalid = structuredClone(output);
  invalid.topology.nodes[0]!.device = "unsupported";
  assert.equal(validator.validate(invalid).isValid, false);
});


it("validates the BGP integration reference against the output model", () => {
  const parser = new YangParser({ include_path: [yangDir], expand_uses: true });
  const validator = new YangValidator(parser.parseFile(path.join(yangDir, "netlab.js.yang")));
  const reference = JSON.parse(readFileSync(path.join(yangDir, "../reference/integration/bgp/01-ebgp-session.json"), "utf8"));
  const result = validator.validate(reference);
  assert.equal(result.isValid, true, result.errors.join("\n"));
  for (const mutate of [
    (data: any) => { data.topology.nodes[0].bgp.as = "invalid"; },
    (data: any) => { data.topology.nodes[0].bgp.router_id = "999.1.1.1"; },
    (data: any) => { data.topology.nodes[0].bgp.community.ebgp = ["invalid"]; },
    (data: any) => { data.topology.nodes[0].bgp.neighbors[0].activate.ipv4 = "yes"; },
    (data: any) => { data.topology.nodes[0].interfaces[0].bgp.local_as = "invalid"; },
  ]) {
    const invalid = structuredClone(reference);
    mutate(invalid);
    assert.equal(validator.validate(invalid).isValid, false);
  }
});

it("validates route reflectors and simultaneous iBGP and local-AS eBGP sessions", () => {
  const parser = new YangParser({ include_path: [yangDir], expand_uses: true });
  const validator = new YangValidator(parser.parseFile(path.join(yangDir, "netlab.js.yang")));
  const result = transformAndExport(loadTopologyString(`
defaults.device: frr
module: [bgp]
bgp.as: 65000
bgp.sessions.ipv4: [ibgp, ebgp]
bgp.activate.ipv4: [ibgp, ebgp]
nodes:
  leaf:
  spine:
    bgp.rr: true
links:
  - leaf:
      bgp.local_as: 65201
    spine:
      bgp.local_as: 65100
`), { yangDir });
  assert.equal(result.diagnostics.hasErrors(), false, JSON.stringify(result.diagnostics.list()));
  const output = exportMachineTopology(result.topology);
  const validation = validator.validate(output);
  assert.equal(validation.isValid, true, validation.errors.join("\n"));
  const invalid = structuredClone(output) as any;
  invalid.topology.nodes[0].bgp.sessions.ipv4 = ["invalid"];
  assert.equal(validator.validate(invalid).isValid, false);
  const invalidLink = structuredClone(output) as any;
  invalidLink.topology.links[0].interfaces[0].bgp.local_as = "invalid";
  assert.equal(validator.validate(invalidLink).isValid, false);
});

it("validates BGP AS lists, confederations, import policies and VRFs", async () => {
  const { projectBgpDictionaries } = await import("./bgp-yang-projection.js");
  const parser = new YangParser({ include_path: [yangDir], expand_uses: true });
  const validator = new YangValidator(parser.parseFile(path.join(yangDir, "netlab.js.yang")));
  const result = transformAndExport(loadTopologyString(`
defaults.device: none
module: [bgp, vrf]
bgp.as: 65000
vrfs:
  red:
    bgp.router_id: 1.2.3.4
nodes:
  r1:
    vrfs:
      red:
        bgp.router_id: 1.2.3.5
`), { validate: false });
  const output = exportMachineTopology(result.topology) as any;
  output.topology.bgp.as_list = { 65000: { name: "core", members: ["r1"], rr: ["r1"] } };
  output.topology.bgp.confederation = { 65000: { members: [65001, 65002] } };
  output.topology.nodes[0].bgp.neighbors = [{name: "r1", as: 65000, type: "ibgp", ipv6: "2001:db8::1"}];
  output.topology.nodes[0].bgp.import = { ospf: {policy: "permit"}, connected: true };
  output.topology.nodes[0].vrfs.red.bgp.import = { static: {policy: "permit"} };
  const validate = (obj: any) => validator.validate(projectBgpDictionaries(obj));
  const valid = validate(output);
  assert.equal(valid.isValid, true, valid.errors.join("\n"));
  for (const mutate of [
    (x: any) => { x.topology.nodes[0].bgp.neighbors[0].ipv6 = "2001:::1"; },
    (x: any) => { x.topology.bgp.as_list[65000].members = [3]; },
    (x: any) => { x.topology.bgp.confederation[65000].members = ["invalid"]; },
    (x: any) => { x.topology.nodes[0].bgp.import.ospf.policy = 5; },
    (x: any) => { x.topology.nodes[0].vrfs.red.bgp.router_id = "bad"; },
  ]) {
    const invalid = structuredClone(output);
    mutate(invalid);
    assert.equal(validate(invalid).isValid, false);
  }
});

it("validates transformed BGP confederation output", async () => {
  const { projectBgpDictionaries } = await import("./bgp-yang-projection.js");
  const parser = new YangParser({include_path: [yangDir], expand_uses: true});
  const validator = new YangValidator(parser.parseFile(path.join(yangDir, "netlab.js.yang")));
  const result = transformAndExport(loadTopologyString(`
defaults.device: frr
module: [bgp]
bgp.as_list:
  65001: {members: [a]}
  65002: {members: [b]}
bgp.confederation:
  65000: {members: [65001, 65002]}
nodes: [a, b]
links: [a-b]
`));
  assert.equal(result.diagnostics.hasErrors(), false, JSON.stringify(result.diagnostics.list()));
  const valid = validator.validate(projectBgpDictionaries(exportMachineTopology(result.topology)));
  assert.equal(valid.isValid, true, valid.errors.join("\n"));
});
