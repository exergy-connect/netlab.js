import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";
import type { JsonObject } from "../../src/types.js";

describe("routing module", () => {
  it("resolves static route next hops and normalizes inherited policy and prefix filters", () => {
    const result = transform(loadTopologyString(`
defaults.device: none
module: [routing]
prefix:
  beacon: { ipv4: 10.42.0.0/24 }
routing:
  prefix:
    beacon_filter: { prefix: beacon }
  policy:
    inbound:
      match.prefix: beacon_filter
      set.med: 50
  static:
    routes:
      - ipv4: 192.0.2.0/24
        nexthop.discard: true
nodes:
  r1:
    routing.policy.inbound: null
    routing.static:
      - ipv4: 203.0.113.0/24
        nexthop.node: r2
      - include: routes
  r2: {}
links: [r1-r2]
`));
    assert.deepEqual(result.diagnostics.list().filter((d) => d.severity === "error"), []);
    const routing = result.topology.nodes!.r1!.routing as JsonObject;
    const routes = routing.static as JsonObject[];
    const nextHop = routes[0]!.nexthop as JsonObject;
    const neighbor = result.topology.nodes!.r1!.interfaces![0]!.neighbors![0]!;
    assert.equal(nextHop.ipv4, String(neighbor.ipv4).split("/")[0]);
    assert.equal(nextHop.intf, undefined);
    assert.ok(Array.isArray(nextHop.nhlist));
    assert.equal(routes[1]!.ipv4, "192.0.2.0/24");
    assert.equal((routes[1]!.nexthop as JsonObject).discard, true);
    const policy = (routing.policy as JsonObject).inbound as JsonObject[];
    assert.equal(policy[0]!.sequence, 10);
    assert.equal(policy[0]!.action, "permit");
    const filter = (routing.prefix as JsonObject).beacon_filter as JsonObject[];
    assert.deepEqual(filter[0]!.ipv4, ["10.42.0.0/24"]);
    assert.equal((result.topology.nodes!.r2!.routing as JsonObject | undefined)?.static, undefined);
  });

  it("reports missing next-hop nodes and recursive static route includes", () => {
    const result = transform(loadTopologyString(`
defaults.device: none
module: [routing]
routing.static.loop: [{ include: loop }]
nodes:
  r1:
    routing.static:
      - ipv4: 192.0.2.0/24
        nexthop.node: missing
      - include: loop
`));
    const errors = result.diagnostics.list().filter((d) => d.module === "routing");
    assert.ok(errors.some((d) => d.message.includes("Recursive static route include")));
    assert.ok(errors.some((d) => d.message.includes("Cannot resolve next-hop node")));
  });
});

describe("routing policies", () => {
  it("imports a BGP redistribution policy and its prefix filter only on the requesting node", () => {
    const result = transform(loadTopologyString(`
defaults.device: frr
module: [routing, bgp, ospf]
bgp.as: 65000
routing:
  policy:
    REDIST:
      - match.prefix: FILTER
        set.med: 50
  prefix:
    FILTER:
      - ipv4: 10.42.0.0/16
nodes:
  r1:
    bgp.import.ospf.policy: REDIST
  r2:
links: [r1-r2]
`));
    assert.equal(result.diagnostics.hasErrors(), false, JSON.stringify(result.diagnostics.list()));
    const routing = result.topology.nodes!.r1!.routing as any;
    assert.deepEqual(routing.policy.REDIST, [{action: "permit", sequence: 10, match: {prefix: "FILTER"}, set: {med: 50}}]);
    assert.deepEqual(routing.prefix.FILTER, [{action: "permit", sequence: 10, ipv4: ["10.42.0.0/16"]}]);
    assert.equal((result.topology.nodes!.r2!.routing as any)?.policy, undefined);
  });

  it("normalizes shortcut values, sorts entries, and validates references and rules", () => {
    const result = transform(loadTopologyString(`
defaults.device: none
module: [routing]
routing.policy.MY_POLICY:
  - {sequence: 20, med: 123, prepend: 65001}
  - {sequence: 10, match.community: MISSING}
nodes:
  r1:
    routing.policy.MY_POLICY: null
`), {validate: false});
    const policy = (result.topology.nodes!.r1!.routing as any).policy.MY_POLICY;
    assert.deepEqual(policy[0].match.community, {standard: "MISSING"});
    assert.deepEqual(policy[1].set, {med: 123, prepend: {path: "65001"}});
    assert.ok(result.diagnostics.list().some(d => d.message.includes("community MISSING")));
    const invalid = transform(loadTopologyString(`
defaults.device: frr
module: [routing]
nodes:
  r1:
    routing.policy.BAD:
      - {action: deny, set.med: -1}
`), {validate: false});
    assert.ok(invalid.diagnostics.list().some(d => d.message.includes("Deny rule")));
    assert.ok(invalid.diagnostics.list().some(d => d.message.includes("Invalid set.med")));
  });

  it("reports a BGP policy reference without the routing module", () => {
    const result = transform(loadTopologyString(`
defaults.device: frr
module: [bgp, ospf]
bgp.as: 65000
nodes:
  r1:
    bgp.import.ospf.policy: MISSING
`), {validate: false});
    assert.ok(result.diagnostics.list().some(d => d.message.includes("requires the routing module")));
  });
});
