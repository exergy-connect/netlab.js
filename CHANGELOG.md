# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Devices `ios` / `iosv`:** Netlab device YAML under `data/devices/` with parent inheritance, so topologies using `device: iosv` keep Cisco-style names (`GigabitEthernet0/N`, `Loopback0`, mgmt `GigabitEthernet0/0`).
- **Daemons:** `data/daemons/` (starting with Netlab `bird.yml`) merged via `mergeDaemons` — `daemon: true` and default `parent: linux` when omitted, matching Netlab `augment.devices.merge_daemons`.
- **Defaults:** `data/defaults/addressing.yml` (Netlab original) embedded and loaded by `systemDefaults()`; `setupPools()` ports Netlab legacy lan/loopback/p2p merge and missing IPv4 prefix fill.
- **Embed tooling:** `tools/embed-data.mjs` emits `DEVICE_YAML`, `DAEMON_YAML`, `MODULE_YAML`, and `DEFAULTS_YAML`.

### Changed

- **Module order:** transform hooks still sort with `transform_after`; final topology/node `module` lists use `config_after` (Netlab `reorder_node_modules`), e.g. `[ospf, bgp]` not `[bgp, ospf]`.
- **Addressing IPAM:** removed hardcoded `defaultIpv4PrefixLen`; prefix lengths come from YAML plus Netlab `setup_pools` rules (`p2p_subnet`→30, `lan_subnet`→24, loopback→32, mgmt→24).
- **Bird:** moved from `data/devices/bird.yml` to `data/daemons/bird.yml` without modifying the Netlab YAML content.

### Fixed

- **Unsupported-device fallback:** tests use a truly unsupported device (`eos`) for the frr remap warning; `iosv` is supported and no longer rewritten to `frr`.
