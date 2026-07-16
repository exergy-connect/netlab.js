# netlab.js

YANG-native JavaScript implementation of Netlab's data modeling and topology transformations.

netlab.js uses [YANG](https://www.rfc-editor.org/rfc/rfc6020) as the canonical data model and [xYang](https://github.com/exergy-connect/xYang) for schema handling and validation. Runtime topology data is represented as plain JSON-compatible JavaScript objects and progressively transformed into canonical network topology data.

The existing [Netlab Python implementation](https://netlab.tools/) serves as the behavioral reference.

## Status

Initial TypeScript core is in place: YANG schema under `yang/`, transform pipeline in `@exergy-connect/netlab`, stage-gated xYang validation, devices `none`/`linux`/`frr`/`bird`/`iosv`, provider `clab` only, and a browser lab viewer.

Requires Node.js 24+.

```bash
npm install
npm run build
npm test
npm run viewer   # apps/lab-viewer
```

`npm install` configures git hooks via `core.hooksPath=.githooks`. The `pre-push` hook runs `npm run build` and blocks the push if the build fails.

## Goals

- Represent the Netlab data model in YANG
- Validate topology data using xYang
- Preserve plain JSON-compatible runtime data
- Reproduce Netlab's topology transformations
- Support browser and server-side JavaScript environments
- Provide a foundation for topology visualization and network automation

## Scope

Initial areas of focus:

- Topology parsing and normalization
- Defaults and inheritance
- Nodes and links
- Interfaces
- Addressing
- Protocol and feature modules
- Device and platform capabilities
- Semantic validation
- Canonical transformed topology data

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
````

YANG defines the model (covering what Netlab expresses in `defaults/attributes.yml` for schema). xYang provides schema handling and validation. JavaScript transformations apply Netlab behavior, including transform-control lists from `data/defaults/attributes.yml` such as `link_no_propagate` and `pool_no_copy`.

## Relationship to Netlab

Netlab.js is inspired by and based on the behavior of the [Netlab Python implementation](https://netlab.tools/).

The goal is semantic compatibility with the relevant data-modeling and transformation behavior, rather than a line-by-line port of the Python implementation.

## License

Apache License 2.0.
