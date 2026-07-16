import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  allocateLinkPrefix,
  assignInterfaceAddresses,
  resetPoolCursors,
  setupAddressing,
} from "../../src/addressing/ipam.js";
import type { Link, Topology } from "../../src/types.js";

const golden = JSON.parse(
  fs.readFileSync(
    path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../../../../tests/fixtures/golden/addressing-p2p.json",
    ),
    "utf8",
  ),
);

describe("addressing golden", () => {
  it("matches golden p2p allocation", () => {
    resetPoolCursors();
    const topology: Topology = {
      nodes: { r1: { name: "r1", id: 1 }, r2: { name: "r2", id: 2 } },
      addressing: { p2p: { ipv4: "10.1.0.0/16" } },
    };
    setupAddressing(topology);
    const links: Link[] = [
      { type: "p2p", interfaces: [{ node: "r1" }, { node: "r2" }] },
      { type: "p2p", interfaces: [{ node: "r1" }, { node: "r2" }] },
    ];
    for (const link of links) allocateLinkPrefix(topology, link);
    assignInterfaceAddresses(topology, links[0]!);
    assert.deepEqual(
      links.map((l) => (l.prefix as { ipv4: string }).ipv4),
      golden.prefixes,
    );
    const hosts = Object.fromEntries(links[0]!.interfaces!.map((i) => [i.node, i.ipv4]));
    assert.deepEqual(hosts, golden.hosts);
  });
});
