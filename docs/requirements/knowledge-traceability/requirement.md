# Knowledge and Requirement Traceability

Status: draft. Owner: Prati maintainers. This package governs documentation migration, not individual component behavior.

## Knowledge references

- [Product scope](../../../knowledge/product/product-scope.md): frontend library boundaries.
- [Component architecture](../../../knowledge/architecture/component-architecture.md): component classification.
- [Visual design principles](../../../knowledge/concepts/visual-design-principles.md): design intent and its scope.
- [Architecture and security review](../../../knowledge/practices/architecture-and-security-review.md): evidence and review practices.

## Scope

Review tracked `docs/raw` sources and classify each. Extract reusable frontend knowledge, derive observable requirement packages, reference relevant knowledge, and map requirements to OpenSpec capability specifications and implementation/test evidence. Preserve historical reports, prompts, brand-specific material and assets as scoped references where they do not define Prati behavior. A source reference alone does not establish complete extraction or implemented behavior.

## Requirements

- **KT-001 Source disposition:** Each tracked raw source has an explicit disposition, rationale and applicable links to derived knowledge and requirement packages. Unreviewed and partial sources remain visible.
- **KT-002 Knowledge provenance:** Each derived concept is independently readable, source-attributed, indexed and marked draft unless verified. Document contradictions and unresolved scope.
- **KT-003 Requirement ownership:** Each applicable product behavior or design contract maps to an identifiable requirement package and relevant knowledge. Duplicated descriptions may point to one requirement; reference-only material has a stated exclusion.
- **KT-004 Specification and implementation mapping:** Each requirement maps to a capability specification, implementation and actual verification evidence, or is explicitly proposed, unimplemented, conflicting or unverified with a next action.
- **KT-005 Completion and archive:** Validate the bundle, traceability and OpenSpec artifacts; report missing evidence and archive only completed, verified work under project policy.

## Acceptance scenarios

Given a tracked raw document, when its review is complete, then its disposition and applicable knowledge and requirement links are recorded.

Given a documented behavior, when a reviewer follows its requirement ID, then its knowledge context, specification status and verification evidence or an explicit gap can be found.

Given conflicting documentation and implementation, when requirements are mapped, then the conflict remains open until resolved; neither version is silently represented as verified.

## Open decisions

- Whether BAVANS-specific guidance applies to Prati consumers.
- The intended spacing rule and LoadingState width contract.
- Whether earlier behavior is approved as a baseline when documentation and implementation differ.

Do not archive the migration as complete while in-scope sources, requirements or verification remain unclassified.
