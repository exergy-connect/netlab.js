# netlab.js

YANG-native JavaScript implementation of Netlab's data modeling and topology transformations.

netlab.js uses [YANG](https://www.rfc-editor.org/rfc/rfc6020) as the canonical data model and [xYang](https://github.com/exergy-connect/xYang) for schema handling and validation. Runtime topology data is plain JSON-compatible JavaScript objects, progressively transformed into canonical network topology data.

The [Netlab Python implementation](https://netlab.tools/) is the behavioral reference.

**Live lab viewer:** [exergy-connect.github.io/netlab.js](https://exergy-connect.github.io/netlab.js/)

## Status

TypeScript core is usable for transform + optional YANG validation:

| Area | Support |
| --- | --- |
| Devices | `none`, `linux`, `frr`, `bird`, `iosv` (others remap to `frr` with a warning) |
| Provider | `clab` only |
| Modules | `vlan`, `vrf`, `vxlan`, `ospf`, `isis`, `bgp`, `evpn` |
| Validation | Stage-gated xYang checks: `user_input` → `normalized` → `addressed` → `transformed` |
| Lab viewer | Paste YAML, transform, graph, nodes/links JSON (optional full JSON + YANG validate) |

Requires Node.js 24+. See [CHANGELOG.md](CHANGELOG.md) for recent changes.

```bash
npm install
npm run build
npm test
npm run viewer        # local apps/lab-viewer
npm run build:pages   # sync viewer into docs/ for GitHub Pages
```

`npm install` sets `core.hooksPath=.githooks`. The `pre-push` hook runs `npm run build` and blocks the push if the build fails.

## Quick start

```ts
import { loadTopologyString, transform } from "@exergy-connect/netlab";

const topology = loadTopologyString(`
defaults.device: frr
provider: clab
module: [ospf]
nodes: { r1:, r2: }
links: [[r1, r2]]
`);

const { topology: result, diagnostics, stages } = transform(topology, {
  validate: true, // optional; needs yang/ on disk (or /yang in the browser)
});
```

## Repository layout

```text
yang/                 YANG model (netlab-topology + module augments)
data/                 Embedded Netlab YAML (devices, daemons, modules, defaults)
packages/core/        @exergy-connect/netlab transform + validation library
apps/lab-viewer/      Browser UI (Vite)
xframe/               xFrame.present content plugin (netlab topology viz)
docs/                 GitHub Pages build of the lab viewer
tools/                embed-data, sync-docs, …
```

## Goals

- Represent the Netlab data model in YANG
- Validate topology data using xYang
- Preserve plain JSON-compatible runtime data
- Reproduce Netlab's topology transformations
- Support browser and server-side JavaScript environments
- Provide a foundation for topology visualization and network automation

## Architecture

```text
YANG modules
     │
     ▼
  xYang
     │
     ▼
Plain JavaScript objects
     │
     ▼
JavaScript transformations
     │
     ▼
Canonical topology data
```

YANG is the schema authority for what Netlab expresses in `defaults/attributes.yml`. xYang loads and validates instances. JavaScript transformations apply Netlab behavior, including transform-control lists from `data/defaults/attributes.yml` (`link_no_propagate`, `pool_no_copy`, …).

Module YANG under `yang/modules/` augments the topology root (groups inherit the node attribute namespace where Netlab does). Shared shapes use YANG `grouping`/`uses`, including cross-module `uses ntype:…` (requires `@exergy-connect/xyang` ≥ 0.1.6). Device names in YANG are open identifiers; the runtime still remaps unsupported platforms.

## Relationship to Netlab

Netlab.js targets semantic compatibility with Netlab's data-modeling and transformation behavior, not a line-by-line Python port. Integration fixtures under Netlab's `tests/integration/` (for example EVPN VXLAN labs) are useful validation targets.

## License

Apache License 2.0.
