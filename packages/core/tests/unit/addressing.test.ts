import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  allocateLinkPrefix,
  assignInterfaceAddresses,
  resetPoolCursors,
  setupAddressing,
  setupPools,
} from "../../src/addressing/ipam.js";
import { systemDefaults } from "../../src/load/defaults.js";
import type { Link, Topology } from "../../src/types.js";

describe("addressing IPAM", () => {
  it("loads addressing defaults from YAML and fills Netlab prefix lengths", () => {
    const addr = systemDefaults().addressing as Record<string, Record<string, unknown>>;
    assert.equal(addr.p2p!.ipv4, "10.1.0.0/16");
    assert.equal(addr.p2p!.prefix, undefined); // Netlab addressing.yml omits p2p prefix
    const pools = setupPools(addr);
    assert.equal(pools.p2p!.prefix, 30); // legacy p2p_subnet
    assert.equal(pools.lan!.prefix, 24);
    assert.equal(pools.loopback!.prefix, 32);
    assert.equal(pools.router_id!.prefix, 32); // from YAML
    assert.equal(pools.mgmt!.prefix, 24);
  });

  it("allocates sequential p2p /30s from the p2p pool", () => {
    resetPoolCursors();
    const topology: Topology = {
      addressing: { p2p: { ipv4: "10.1.0.0/16" }, lan: { ipv4: "172.16.0.0/16" } },
    };
    setupAddressing(topology);
    const a: Link = { type: "p2p", interfaces: [{ node: "r1" }, { node: "r2" }] };
    const b: Link = { type: "p2p", interfaces: [{ node: "r1" }, { node: "r3" }] };
    allocateLinkPrefix(topology, a);
    allocateLinkPrefix(topology, b);
    assert.equal((a.prefix as { ipv4: string }).ipv4, "10.1.0.0/30");
    assert.equal((b.prefix as { ipv4: string }).ipv4, "10.1.0.4/30");
  });

  it("assigns p2p hosts .1/.2 in sorted node-name order", () => {
    resetPoolCursors();
    const topology: Topology = {
      nodes: { r2: { name: "r2", id: 2 }, r1: { name: "r1", id: 1 } },
      addressing: { p2p: { ipv4: "10.1.0.0/16" } },
    };
    setupAddressing(topology);
    const link: Link = {
      type: "p2p",
      interfaces: [{ node: "r2" }, { node: "r1" }],
    };
    allocateLinkPrefix(topology, link);
    assignInterfaceAddresses(topology, link);
    const byNode = Object.fromEntries(link.interfaces!.map((i) => [i.node, i.ipv4]));
    assert.equal(byNode.r1, "10.1.0.1/30");
    assert.equal(byNode.r2, "10.1.0.2/30");
  });
});
