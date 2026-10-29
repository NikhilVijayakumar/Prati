# Design

Use the knowledge profile, Node YAML parser and Python structural checks to validate draft concept metadata and bundle links. Generate a tracked-source inventory from concept provenance; check it for drift. Keep structural results separate from content accuracy and product verification. This implements the tooling portion of KT-001 and KT-002 and uses `knowledge/index.md`.

No new ADR is required: this implements the existing knowledge-first convention without changing the product architecture.
