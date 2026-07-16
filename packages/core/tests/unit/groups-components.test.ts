import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createNodeDict } from "../../src/nodes/nodes.js";
import { initGroups, autoCreateGroupMembers, copyGroupData } from "../../src/groups/groups.js";
import { expandComponents } from "../../src/components/components.js";
import { loadTopologyString } from "../../src/load/load.js";
import { transform } from "../../src/transform/orchestrator.js";
import type { Topology } from "../../src/types.js";

describe("groups and components", () => {
  it("copies group device/module onto members", () => {
    const topology: Topology = {
      nodes: createNodeDict(["r1", "r2"]),
      groups: {
        core: { members: ["r1", "r2"], device: "frr", module: ["ospf"] },
      },
    };
    initGroups(topology);
    copyGroupData(topology);
    assert.equal(topology.nodes!.r1!.device, "frr");
    assert.deepEqual(topology.nodes!.r1!.module, ["ospf"]);
  });

  it("auto-creates nodes from groups._auto_create", () => {
    const topology: Topology = {
      groups: {
        _auto_create: true,
        hosts: { members: ["h1", "h2"], device: "linux" },
        switches: { members: ["s1", "hosts"], device: "frr", module: ["ospf"] },
      },
    };
    initGroups(topology);
    topology.nodes = createNodeDict(topology.nodes);
    autoCreateGroupMembers(topology);
    copyGroupData(topology);
    assert.ok(topology.nodes!.h1);
    assert.ok(topology.nodes!.h2);
    assert.ok(topology.nodes!.s1);
    assert.equal(topology.nodes!.hosts, undefined); // group name not created as node
    assert.equal(topology.nodes!.h1!.device, "linux");
    assert.equal(topology.nodes!.s1!.device, "frr");
    assert.deepEqual(topology.nodes!.s1!.module, ["ospf"]);
  });

  it("preserves list-form nodes when auto-creating group members", () => {
    const topology: Topology = {
      nodes: [{ name: "rr1" }, "pe1"] as unknown as Topology["nodes"],
      groups: {
        _auto_create: true,
        extras: { members: ["x1"] },
      },
    };
    initGroups(topology);
    autoCreateGroupMembers(topology);
    assert.ok(topology.nodes!.rr1);
    assert.ok(topology.nodes!.pe1);
    assert.ok(topology.nodes!.x1);
  });

  it("auto-creates EVPN/VXLAN group members without unknown-module errors", () => {
    const topo = loadTopologyString(`
defaults.device: frr
provider: clab
groups:
  _auto_create: True
  switches:
    members: [ dut, s2 ]
    module: [ vlan, vxlan, ospf, bgp, evpn ]
bgp.as: 65000
vlans:
  red:
    mode: bridge
nodes: {}
links:
  - dut:
    s2:
`);
    const { topology, diagnostics } = transform(topo, { validate: false });
    assert.ok(topology.nodes!.dut);
    assert.ok(topology.nodes!.s2);
    assert.ok((topology.nodes!.dut!.module ?? []).includes("vxlan"));
    assert.ok((topology.nodes!.dut!.module ?? []).includes("evpn"));
    assert.equal((topology.vxlan as { flooding?: string }).flooding, "evpn");
    const unknown = diagnostics.list().filter((d) => d.message.includes("Unknown module"));
    assert.equal(unknown.length, 0);
  });

  it("expands component includes into prefixed nodes/links", () => {
    const topology: Topology = {
      nodes: {
        site: { name: "site", include: "pair" },
      },
      components: {
        pair: {
          nodes: { a: {}, b: {} },
          links: [["a", "b"]],
        },
      },
      links: [],
    } as Topology;
    expandComponents(topology);
    assert.ok(topology.nodes!.site_a);
    assert.ok(topology.nodes!.site_b);
    assert.equal(topology.nodes!.site, undefined);
    assert.equal(topology.links!.length, 1);
    assert.deepEqual(
      topology.links![0]!.interfaces!.map((i) => i.node).sort(),
      ["site_a", "site_b"],
    );
  });
});
