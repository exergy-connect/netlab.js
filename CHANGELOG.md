# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Shared MLAG VTEP (lag module):** MLAG pairs running VXLAN get an anycast VTEP loopback from the `mlag_vtep` pool (or the peer's `loopback.pool`), replacing Netlab's `mlag.vtep` plugin; disable per node with `lag.mlag.vtep: false`. Devices with `features.mlag_vtep.evpn.vtep_source_loopback` source EVPN VXLAN from their own loopback. Covered by the upstream `mlag.vtep` integration labs, validated against the input YANG model.
- **Link groups:** `links` may be a dictionary of named link groups (`links.<group>[n]`), as in Netlab.
- **Loopback pools:** node and group `loopback.pool` select the pool for the node loopback.
- **Lab viewer examples:** select topology YAML from the BGP basic labs and Netlab integration repositories on GitHub.
- **xFrame plugin:** render Netlab topologies as layered static SVGs or interactive diagrams with layer filters and click-to-zoom.

- **Devices `ios` / `iosv`:** Netlab device YAML under `data/devices/` with parent inheritance, so topologies using `device: iosv` keep Cisco-style names (`GigabitEthernet0/N`, `Loopback0`, mgmt `GigabitEthernet0/0`).
- **Daemons:** `data/daemons/` (starting with Netlab `bird.yml`) merged via `mergeDaemons` — `daemon: true` and default `parent: linux` when omitted, matching Netlab `augment.devices.merge_daemons`.
- **Defaults:** `data/defaults/*.yml` (Netlab `addressing.yml`, `attributes.yml`, …) embedded and loaded by filename into `systemDefaults()`; `setupPools()` ports Netlab legacy lan/loopback/p2p merge and missing IPv4 prefix fill.
- **Embed tooling:** `tools/embed-data.mjs` emits `DEVICE_YAML`, `DAEMON_YAML`, `MODULE_YAML`, and `DEFAULTS_YAML`.
- **YANG core attrs:** `netlab-topology` / `netlab-types` cover Netlab `attributes.yml` schema for node/link/interface/loopback/pool/group (including `iosv`, `vlan_member`).

### Changed

- **Validation:** bundle the precompiled xYang schema so validation needs no YANG files at runtime; remove the `yangDir` option and `defaultYangDir` export.

- **Package configuration:** the root package manages core and viewer dependencies, build scripts, and library exports.
- **GitHub Actions:** upgraded checkout and Node setup actions to v7.

- **YANG groupings:** `uses` for shared shapes (`mtu`, `ipv4-ipv6`, `neighbor`/`neighbor-body`, `if-identity`, `ntype:af-flags`, `vlan-definition`, `vlan-if-attrs`, `vrf-definition`, `bgp-rr-attrs`, `evpn-common`/`evpn-rt-attrs`, `vxlan-common`/`vxlan-vlan-attrs`, `ospf-link-attrs`, `isis-common`). Cross-module imported groupings require `@exergy-connect/xyang` ≥ 0.1.6.
- **Module order:** transform hooks still sort with `transform_after`; final topology/node `module` lists use `config_after` (Netlab `reorder_node_modules`), e.g. `[ospf, bgp]` not `[bgp, ospf]`.
- **Addressing IPAM:** removed hardcoded `defaultIpv4PrefixLen`; prefix lengths come from YAML plus Netlab `setup_pools` rules (`p2p_subnet`→30, `lan_subnet`→24, loopback→32, mgmt→24).
- **Bird:** moved from `data/devices/bird.yml` to `data/daemons/bird.yml` without modifying the Netlab YAML content.
- **Attributes split:** YANG is the schema authority for Netlab `attributes.yml`; YAML retains transform-control lists (`link_no_propagate`, `link_module_no_propagate`, `pool_no_copy`) applied by the pipeline.
- **Link→interface copy:** driven by `attributes.link` ∪ `link_internal` − `link_no_propagate`, plus node modules minus `link_module_no_propagate`.
- **`topology.pools`:** omits `pool_no_copy` keys (`start`, `prefix`, `prefix6`, `mac`).

### Fixed

- **Lab viewer TypeScript:** include Vite client types so CSS imports type-check.

- **Unsupported-device fallback:** tests use a truly unsupported device (`eos`) for the frr remap warning; `iosv` is supported and no longer rewritten to `frr`.
- **Lab-viewer YANG load:** fs shim no longer treats `/yang/modules/<host-module>.yang` as existing via basename fallback, so BGP/OSPF/`augment` modules mutate the cached host schema instead of a duplicate (fixes `Unknown field 'bgp'` on nodes).
- **Pool unnumbered markers:** `ntype:ipv4-prefix` / `ipv6-prefix` are unions of string and boolean so YAML `ipv4: True` validates (requires `@exergy-connect/xyang` ≥ 0.1.5 for imported typedef resolution).
- **Transform schema gaps:** `interfaces.pool`, `links.node_count`, and interface/link `bgp` containers so BGP labs (e.g. dual-stack RFC 8950) validate past the addressed stage.
- **EVPN/VLAN YANG coverage:** group `bgp` (node namespace), open `device-name` string, SVI `mode`/`bridge_group`, node `vlan`/`vlans.bridge_group`, neighbor and link-interface `vlan`, and cleanup of link `_vlan_mode` so labs like `10-vxlan-rr` validate through the transformed stage.
