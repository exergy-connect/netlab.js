import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildModuleSupportLists, getDevice, loadDevices } from "../../src/devices/registry.js";
import { processQuirks } from "../../src/devices/quirks.js";
import type { Topology } from "../../src/types.js";

describe("devices + quirks", () => {
  it("loads none/linux/frr/bird with bird inheriting linux", () => {
    const devices = loadDevices();
    assert.ok(devices.none);
    assert.ok(devices.linux);
    assert.ok(devices.frr);
    assert.ok(devices.bird);
    assert.equal(devices.bird!.daemon, true);
    assert.equal(devices.bird!.parent, "linux");
    // bird.yml has no role; inherits host from linux (Netlab daemon semantics)
    assert.equal(devices.bird!.role, "host");
    assert.equal(devices.linux!.role, "host");
    assert.ok(getDevice("frr").interface_name);
  });

  it("derives module support lists from device features", () => {
    const support = buildModuleSupportLists(loadDevices());
    assert.ok((support.ospf ?? []).includes("frr") || (support.ospf ?? []).includes("none"));
  });

  it("rewrites bird VRF RTs", () => {
    const topology: Topology = {
      nodes: {
        r1: {
          name: "r1",
          device: "bird",
          vrfs: { red: { import: ["65000:1"], export: ["65000:1"] } },
        },
      },
    };
    processQuirks(topology);
    const v = topology.nodes!.r1!.vrfs as Record<string, Record<string, unknown>>;
    assert.deepEqual(v.red!["netlab-internal:_bird_import"], ["(rt,65000,1)"]);
  });
});
