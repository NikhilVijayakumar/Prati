# Proposal: Complete Knowledge and Requirement Traceability

## Why

Prati's raw frontend documentation contains product and design knowledge that is only partially extracted and not consistently connected to requirements, specifications and implementation evidence. Maintainers need a traceable migration that makes gaps and conflicts visible before work is declared complete.

## What Changes

- **knowledge-traceability**: Classify raw sources, map applicable knowledge to requirements and specifications, and record implementation evidence and gaps.
- **frontend-foundations**: Capture the existing draft provider, language and prototype boundaries as reviewable specifications.

## Scope

Inventory tracked raw documents; distinguish reusable knowledge, product requirements and reference-only material. Review relevant implementation and tests; map requirements to specs with honest statuses. Preserve existing work. This process change does not alter public component behavior or decide unresolved design questions.

## Knowledge References

`knowledge/product/product-scope.md`, `knowledge/architecture/component-architecture.md`, `knowledge/concepts/visual-design-principles.md`, `knowledge/practices/architecture-and-security-review.md`. Requirement package: `docs/requirements/knowledge-traceability/requirement.md` (KT-001 to KT-005).

## Risks and open questions

Sources overlap and may be historical or specific to another brand. A raw claim, an OpenSpec scenario and an implemented test are distinct evidence. Brand scope, spacing policy and LoadingState width require maintainer decisions. Do not infer approval or implementation from documentation alone.

## Traceability

Change ID: `fe-complete-knowledge-traceability`; current branch: `develop`. Existing uncommitted knowledge work is migration input. Integration and archive follow actual project policy.
