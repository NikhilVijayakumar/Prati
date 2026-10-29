# Knowledge source map

This map records the initial conversion pass. The generated [raw coverage inventory](raw-coverage.md) maps all Git-tracked raw sources to concept frontmatter, identifies partial conversions and highlights material still awaiting extraction. Run `python scripts/knowledge_coverage.py` to update it or add `--check` to verify it. Concepts also identify revision-pinned source URLs. Drafts require reconciliation with current code and tests.

| Knowledge | Source documents |
| --- | --- |
| [Product scope](../../knowledge/product/product-scope.md) | [README](../../README.md) |
| [Component architecture](../../knowledge/architecture/component-architecture.md) | [Component overview](../raw/feature/components/README.md), [Atomic design](../raw/feature/components/atomic-design/README.md) |
| [Provider hierarchy](../../knowledge/architecture/provider-hierarchy.md) | [Provider map](../raw/architecture/runtime-maps/provider-hierarchy.md), [README](../../README.md) |
| [Theming](../../knowledge/concepts/theming.md) | [Theming](../raw/feature-technical/theming/README.md), [tokens](../raw/feature-technical/theming/tokens.md) |
| [Localization](../../knowledge/concepts/localization.md) | [Localization](../raw/feature-technical/localization/README.md) |
| [Prototype runtime](../../knowledge/concepts/prototype-runtime.md) | [Overview](../raw/feature-technical/proto-runtime/overview.md) |
| [Template rendering](../../knowledge/concepts/template-rendering.md) | [Templates](../raw/feature-technical/templates/README.md) |
