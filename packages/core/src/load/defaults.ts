import type { JsonObject } from "../types.js";

/** Built-in system defaults (subset of Netlab topology-defaults). */
export function systemDefaults(): JsonObject {
  return {
    device: "frr",
    provider: "clab",
    addressing: {
      loopback: { ipv4: "10.0.0.0/24" },
      router_id: { ipv4: "10.0.0.0/24", prefix: 32 },
      lan: { ipv4: "172.16.0.0/16" },
      p2p: { ipv4: "10.1.0.0/16" },
      mgmt: { ipv4: "192.168.121.0/24", start: 100, mac: "CA-FE-00-00-00-00" },
      vrf_loopback: { ipv4: "10.2.0.0/24", prefix: 32 },
      l2only: {},
    },
    ospf: {
      area: "0.0.0.0",
    },
    bgp: {},
    isis: {
      type: "level-2",
    },
  };
}
