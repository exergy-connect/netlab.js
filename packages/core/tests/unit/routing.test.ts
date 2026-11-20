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
    assert.equal((result.topology.nodes!.r2!.routing as JsonObject).static, undefined);
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
