# Frontend Foundations

Status: draft; derived from documentation, not yet approved or independently verified.

Specification mapping: `openspec/changes/fe-complete-knowledge-traceability/specs/frontend-foundations/spec.md`. These are proposed deltas; implementation and acceptance evidence remain unverified until recorded.

## Knowledge references

- [Product scope](../../../knowledge/product/product-scope.md): library boundaries.
- [Provider hierarchy](../../../knowledge/architecture/provider-hierarchy.md): integration order.
- [Theming](../../../knowledge/concepts/theming.md): theme and tokens.
- [Localization](../../../knowledge/concepts/localization.md): language context.
- [Prototype runtime](../../../knowledge/concepts/prototype-runtime.md): prototype scope.

## Source documents

- [Project README](../../../README.md)
- [Provider hierarchy](../../raw/architecture/runtime-maps/provider-hierarchy.md)
- [Localization technical overview](../../raw/feature-technical/localization/README.md)
- [Prototype runtime overview](../../raw/feature-technical/proto-runtime/overview.md)

## Draft requirements and scenarios

### FR-FE-001 — Provider composition
The documented integration SHALL place the theme provider outside the language provider.

Given an application using both providers, when it composes the application root, then the language provider is nested within the theme provider.

### FR-FE-002 — Language changes
The language context SHALL make language selection available to consumers and propagate a selected language without requiring a page reload.

Given a consumer inside the language provider, when the active language changes, then the consumer can receive the active language's translations without a page reload.

### FR-FE-003 — Prototype boundary
Prototype workflows SHALL be usable with mock data without requiring production backend services.

Given a configured prototype with mock data, when a supported prototype workflow is exercised, then it does not require a production backend.

## Open decisions and verification

Confirm the requirements and scenarios against the current public API, runtime behavior and tests. Detailed component, theme, accessibility, template and error contracts remain to be extracted and reviewed; no coverage is implied by this package.
