# Proposal: Validate Knowledge Provenance

## Why

The knowledge bundle needs reproducible structural checks and source metadata so maintainers can identify malformed YAML and missing provenance before relying on draft concepts. Validation results must remain distinct from evidence that a concept is accurate.

## What Changes

- **knowledge-validation**: Validate concept YAML and source metadata and provide a reproducible source inventory check.

## Scope and traceability

This completed tooling slice supports KT-001 and KT-002 in `docs/requirements/knowledge-traceability/requirement.md` and the draft concepts in `knowledge/index.md`. It does not complete source review, verify product claims, or resolve the remaining requirement-to-implementation mappings. The current branch is `develop`.
