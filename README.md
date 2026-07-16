# netlab.js

YANG-native JavaScript implementation of Netlab's data modeling and topology transformations.

netlab.js uses [YANG](https://www.rfc-editor.org/rfc/rfc6020) as the canonical data model and [xYang](https://github.com/JC1415/xYang) for schema handling and validation. Runtime topology data is represented as plain JSON-compatible JavaScript objects and progressively transformed into canonical network topology data.

The existing [Netlab Python implementation](https://netlab.tools/) serves as the behavioral reference.

## Status

🚧 Early development.

The project is currently focused on understanding and reimplementing Netlab's core data-modeling and transformation pipeline.

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

YANG defines the model. xYang provides schema handling and validation. JavaScript functions transform the topology data.

## Relationship to Netlab

Netlab.js is inspired by and based on the behavior of the [Netlab Python implementation](https://netlab.tools/).

The goal is semantic compatibility with the relevant data-modeling and transformation behavior, rather than a line-by-line port of the Python implementation.

## License

Apache License 2.0.
