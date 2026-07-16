# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Devices `ios` / `iosv`:** Netlab device YAML under `data/devices/` with parent inheritance, so topologies using `device: iosv` keep Cisco-style names (`GigabitEthernet0/N`, `Loopback0`, mgmt `GigabitEthernet0/0`).
- **Daemons:** `data/daemons/` (starting with Netlab `bird.yml`) merged via `mergeDaemons` — `daemon: true` and default `parent: linux` when omitted, matching Netlab `augment.devices.merge_daemons`.
- **Defaults:** `data/defaults/*.yml` (Netlab `addressing.yml`, `attributes.yml`, …) embedded and loaded by filename into `systemDefaults()`; `setupPools()` ports Netlab legacy lan/loopback/p2p merge and missing IPv4 prefix fill.
- **Embed tooling:** `tools/embed-data.mjs` emits `DEVICE_YAML`, `DAEMON_YAML`, `MODULE_YAML`, and `DEFAULTS_YAML`.
- **YANG core attrs:** `netlab-topology` / `netlab-types` cover Netlab `attributes.yml` schema for node/link/interface/loopback/pool/group (including `iosv`, `vlan_member`).

### Changed

- **Module order:** transform hooks still sort with `transform_after`; final topology/node `module` lists use `config_after` (Netlab `reorder_node_modules`), e.g. `[ospf, bgp]` not `[bgp, ospf]`.
- **Addressing IPAM:** removed hardcoded `defaultIpv4PrefixLen`; prefix lengths come from YAML plus Netlab `setup_pools` rules (`p2p_subnet`→30, `lan_subnet`→24, loopback→32, mgmt→24).
- **Bird:** moved from `data/devices/bird.yml` to `data/daemons/bird.yml` without modifying the Netlab YAML content.
- **Attributes split:** YANG is the schema authority for Netlab `attributes.yml`; YAML retains transform-control lists (`link_no_propagate`, `link_module_no_propagate`, `pool_no_copy`) applied by the pipeline.
- **Link→interface copy:** driven by `attributes.link` ∪ `link_internal` − `link_no_propagate`, plus node modules minus `link_module_no_propagate`.
- **`topology.pools`:** omits `pool_no_copy` keys (`start`, `prefix`, `prefix6`, `mac`).

### Fixed

- **Unsupported-device fallback:** tests use a truly unsupported device (`eos`) for the frr remap warning; `iosv` is supported and no longer rewritten to `frr`.
- **Lab-viewer YANG load:** fs shim no longer treats `/yang/modules/<host-module>.yang` as existing via basename fallback, so BGP/OSPF/`augment` modules mutate the cached host schema instead of a duplicate (fixes `Unknown field 'bgp'` on nodes).
- **Pool unnumbered markers:** `ntype:ipv4-prefix` / `ipv6-prefix` are unions of string and boolean so YAML `ipv4: True` validates (requires `@exergy-connect/xyang` ≥ 0.1.5 for imported typedef resolution).
- **Transform schema gaps:** `interfaces.pool`, `links.node_count`, and interface/link `bgp` containers so BGP labs (e.g. dual-stack RFC 8950) validate past the addressed stage.
