import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  allocateLinkPrefix,
  assignInterfaceAddresses,
  createPoolSnapshot,
  resetPoolCursors,
  setupAddressing,
  setupPools,
} from "../../src/addressing/ipam.js";
import { systemDefaults } from "../../src/load/defaults.js";
import type { Link, Topology } from "../../src/types.js";

describe("addressing IPAM", () => {
  it("loads addressing defaults from YAML and fills Netlab prefix lengths", () => {
    const defaults = systemDefaults();
    const addr = defaults.addressing as Record<string, Record<string, unknown>>;
    assert.equal(addr.p2p!.ipv4, "10.1.0.0/16");
    assert.equal(addr.p2p!.prefix, undefined); // Netlab addressing.yml omits p2p prefix
    const pools = setupPools(addr);
    assert.equal(pools.p2p!.prefix, 30); // legacy p2p_subnet
    assert.equal(pools.lan!.prefix, 24);
    assert.equal(pools.loopback!.prefix, 32);
    assert.equal(pools.router_id!.prefix, 32); // from YAML
    assert.equal(pools.mgmt!.prefix, 24);
  });

  it("loads attributes defaults from YAML (pool_no_copy, link_no_propagate)", () => {
    const attrs = systemDefaults().attributes as Record<string, unknown>;
    assert.deepEqual(attrs.pool_no_copy, ["start", "prefix", "prefix6", "mac"]);
    assert.deepEqual(attrs.link_no_propagate, ["prefix", "interfaces", "gateway"]);
    assert.ok((attrs.link as Record<string, unknown>)?.type);
    assert.ok((attrs.node as Record<string, unknown>)?.device);
  });

  it("omits pool_no_copy keys from topology.pools snapshot", () => {
    const defaults = systemDefaults();
    const addressing = setupPools(defaults.addressing as Record<string, never>, defaults);
    const pools = createPoolSnapshot(addressing, defaults);
    assert.equal(addressing.p2p!.prefix, 30);
    assert.equal(pools.p2p!.prefix, undefined);
    assert.equal(pools.p2p!.ipv4, "10.1.0.0/16");
    assert.equal(pools.mgmt!.start, undefined);
    assert.equal(pools.mgmt!.mac, undefined);
    assert.equal(pools.mgmt!.ipv4, "192.168.121.0/24");
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

it("embeds vendored data as equivalent native objects", async () => {
  const { readdirSync, readFileSync } = await import("node:fs");
  const yaml = await import("js-yaml");
  const { DEFAULTS_DATA } = await import("../../src/load/embedded-data.js");
  const { DEVICE_DATA, DAEMON_DATA } = await import("../../src/devices/embedded-data.js");
  const { MODULE_DATA } = await import("../../src/modules/embedded-data.js");
  for (const [directory, embedded] of Object.entries({
    defaults: DEFAULTS_DATA, devices: DEVICE_DATA, daemons: DAEMON_DATA, modules: MODULE_DATA,
  })) {
    const dir = new URL(`../../../../data/${directory}/`, import.meta.url);
    const files = readdirSync(dir).filter((name) => name.endsWith(".yml")).sort();
    assert.deepEqual(Object.keys(embedded).sort(), files.map((name) => name.slice(0, -4)));
    for (const file of files) {
      assert.deepEqual(embedded[file.slice(0, -4)], yaml.load(readFileSync(new URL(file, dir), "utf8")), `${directory}/${file}`);
    }
  }
});

it("provides independent copies of embedded defaults for each topology", () => {
  const first = systemDefaults();
  const second = systemDefaults();
  (first.addressing as any).p2p.ipv4 = "192.0.2.0/24";
  (first.bgp as any).attributes.global.as = "modified";
  assert.notEqual((second.addressing as any).p2p.ipv4, "192.0.2.0/24");
  assert.notEqual((second.bgp as any).attributes.global.as, "modified");
  assert.notEqual(((systemDefaults().bgp as any).attributes.global.as), "modified");
});
