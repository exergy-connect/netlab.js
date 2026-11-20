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
| Validation | One xYang check after input setup; later stages can be checked explicitly with `validateAt` |
| Lab viewer | Paste YAML, transform, graph, nodes/links JSON (optional full JSON + YANG validate) |

Requires Node.js 24+. See [CHANGELOG.md](CHANGELOG.md) for recent changes.
The root `package.json` manages dependencies and commands for both the core and viewer.

```bash
npm install
npm run build
npm test
npm run viewer        # local apps/lab-viewer
npm run build:pages   # build the GitHub Pages site locally into docs/
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
docs/                 Generated GitHub Pages build (not tracked)
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

GitHub Pages is deployed from a workflow artifact. Set the repository Pages source to **GitHub Actions**; generated `docs/` files are not committed.

## GitHub Action

Use the action from another repository to validate a topology and write the
transformed, cleaned topology as JSON with a top-level `topology` member
containing a list of named nodes. Check out the calling repository
first:

```yaml
steps:
  - uses: actions/checkout@v7
  - uses: exergy-connect/netlab.js@main # Pin to a release or commit in production
    id: topology
    with:
      input: topology.yml
      output: build/topology.json
  - run: cat "$TOPOLOGY_JSON"
    env:
      TOPOLOGY_JSON: ${{ steps.topology.outputs.path }}
```

`input` is required; `output` defaults to `topology.json`. Both paths are
relative to the workspace unless absolute. The `path` output is the absolute
path of the generated file. The action accepts YAML or JSON, applies defaults
and transformations, validates the input setup against YANG, and fails on
validation or transformation errors. Warnings are logged. It uses Node.js 24
and runs the bundled action without installing dependencies. The output reflects the
implementation's current support and limitations described above; it is not a
full Netlab compatibility check.

The CI workflow also uploads a `netlab-action-bundle` artifact containing the
minified Node.js 24 runner, its license notices, and the YANG schema files. Build
it locally with `npm run build:action`. The runner is at
`action-dist/normalize-topology.mjs` and expects the `yang/` directory alongside
`action-dist/`. It accepts the same `NETLAB_INPUT` and `NETLAB_OUTPUT` environment
variables used by the action. The reusable action runs the checked-in bundle. Rebuild and commit the bundle
when changing its source or dependencies.

## Normalized core YANG model

[`yang/netlab.js.yang`](yang/netlab.js.yang) defines a strict core subset of the
transformed topology: supported devices, nodes, interfaces, neighbors, links,
and their common attributes. It excludes input shorthand and data such as
protocol settings, defaults, groups, and device-specific extensions. It uses
the shared address types in `netlab-types.yang` (including its permissive IPv6
type).

This is a model for a **projection** of the normalized output, not a schema for
the complete action output. For YANG validation, select the modeled fields within the exported `topology`
member. The action output uses a list of named nodes; the library runtime
topology still uses a dictionary. The action continues to validate its
input-setup stage with `netlab-topology.yang`; it does not validate its complete
output against this subset.

The library also exposes `exportMachineTopology(topology)` to create this
machine-facing representation without mutating the runtime topology. It
preserves other exported fields, including module data. Full output-schema
coverage and output validation remain future work.
