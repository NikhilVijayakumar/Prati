# Design

Review sources by capability rather than treating overlapping feature, design and technical documents as separate products. Keep knowledge independently readable and source-attributed. Record requirement ownership and spec/evidence status in requirement packages and traceability records; preserve draft and conflict states. The generated inventory assists discovery but a source link alone is not complete coverage.

## Knowledge References

Use `knowledge/product/product-scope.md`, `knowledge/architecture/component-architecture.md`, `knowledge/concepts/visual-design-principles.md`, and `knowledge/practices/architecture-and-security-review.md`; implement KT-001 through KT-005 in `docs/requirements/knowledge-traceability/requirement.md`.

## Architecture decision

No new ADR is needed: the work follows existing knowledge-first and OpenSpec conventions. A new policy or tool would require a separate decision if evidence warrants it.

## Verification

Run knowledge, coverage, traceability, schema and change validation. Compare source claims to actual implementation and tests; report the unreviewed remainder. Structural validation is not human review.
