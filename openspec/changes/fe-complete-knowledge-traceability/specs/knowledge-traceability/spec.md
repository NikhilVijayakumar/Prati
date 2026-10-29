## ADDED Requirements

### Requirement: Classify raw source material

The documentation workflow SHALL give each tracked raw source a review disposition and identify related knowledge and requirements or explain why it is reference-only. This implements KT-001 and uses `knowledge/product/product-scope.md`.

#### Scenario: Raw source is reviewed

- **GIVEN** a tracked raw source document
- **WHEN** its review is complete
- **THEN** its disposition and applicable links or exclusion rationale are recorded

### Requirement: Preserve independent knowledge and provenance

The knowledge bundle SHALL identify sources and draft or verified status for each concept and document relevant contradictions. This implements KT-002 and relates to `knowledge/concepts/visual-design-principles.md`.

#### Scenario: Conflicting source claims

- **GIVEN** two source claims conflict or a claim differs from observed behavior
- **WHEN** the concept is reviewed
- **THEN** the unresolved difference is recorded without claiming that either claim is verified

### Requirement: Trace requirements to specifications and evidence

The workflow SHALL map applicable requirements to knowledge, capability specifications and verification evidence, or explicitly record the mapping as proposed, unimplemented, conflicting or unverified. This implements KT-003 and KT-004 and relates to `knowledge/architecture/component-architecture.md`.

#### Scenario: Documented behavior has no executed check

- **GIVEN** a documented behavior with no executed verification
- **WHEN** its requirement is mapped
- **THEN** the mapping identifies the evidence gap and does not claim implementation verification

### Requirement: Verify completion before archive

The workflow SHALL record validation results and outstanding gaps before archiving completed migration work. This implements KT-005 and relates to `knowledge/practices/architecture-and-security-review.md`.

#### Scenario: Incomplete traceability

- **GIVEN** an in-scope source or requirement remains unreviewed
- **WHEN** the migration is assessed for completion
- **THEN** the work remains open and the gap is reported
