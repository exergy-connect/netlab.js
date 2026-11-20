import { it } from "node:test";
import assert from "node:assert/strict";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";
import type { JsonObject } from "../../src/types.js";

it("validates group MPLS settings and applies them to member nodes", () => {
  const input = loadTopologyString(`
defaults.device: frr
groups:
  _auto_create: true
  pe:
    members: [pe1, pe2]
    module: [ospf, mpls]
    mpls.ldp: true
    mpls.vpn: true
  core:
    members: [p]
    module: [ospf, mpls]
    mpls.ldp: true
links: [pe1-p, pe2-p]
`);
  const { topology, diagnostics } = transform(input);
  assert.deepEqual(diagnostics.list().filter(d => d.severity === "error"), []);
  for (const name of ["pe1", "pe2", "p"]) {
    const node = topology.nodes![name]!;
    assert.ok((node.ldp as JsonObject).router_id);
  }
  assert.equal((topology.nodes!.pe1!.mpls as JsonObject).vpn, true);
  assert.equal((topology.nodes!.p!.mpls as JsonObject).vpn, undefined);
});

it("validates structured MPLS settings and rejects incorrectly typed fields", () => {
  const valid = loadTopologyString(`
defaults.device: frr
module: [ospf, mpls]
mpls:
  ldp:
    igp_sync: true
    advertise: [loopback]
  vpn: [ibgp]
groups:
  core:
    members: [r1]
    mpls:
      vpn:
        ipv4: [ibgp]
nodes: [r1, r2]
links: [r1-r2]
`);
  const result = transform(valid);
  assert.deepEqual(result.diagnostics.list().filter(d => d.severity === "error"), []);
  const invalid = loadTopologyString(`
defaults.device: frr
module: [ospf, mpls]
groups:
  core:
    members: [r1]
    mpls:
      vpn: { ipv4: invalid }
nodes: [r1]
`);
  const errors = transform(invalid).diagnostics.list().filter(d => d.severity === "error");
  assert.ok(errors.some(d => d.message.includes("ipv4")));
});
