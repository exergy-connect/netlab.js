/** Load the source model and all augment modules for schema generation and parity tests. */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { YangParser } from "@exergy-connect/xyang";

export function loadSourceYang() {
  const yangDir = fileURLToPath(new URL("../yang/", import.meta.url));
  const parser = new YangParser({ includePath: [yangDir, path.join(yangDir, "modules")], expandUses: true });
  const module = parser.parseFile(path.join(yangDir, "netlab-topology.yang"));
  for (const extra of [
    "netlab-internal.yang", "modules/netlab-bfd.yang", "modules/netlab-ospf.yang",
    "modules/netlab-bgp.yang", "modules/netlab-vlan.yang", "modules/netlab-gateway.yang",
    "modules/netlab-vrf.yang", "modules/netlab-isis.yang", "modules/netlab-vxlan.yang",
    "modules/netlab-evpn.yang", "modules/netlab-mpls.yang", "modules/netlab-lag.yang",
  ]) parser.parseFile(path.join(yangDir, extra));
  return module;
}
