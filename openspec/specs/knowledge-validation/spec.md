# knowledge-validation Specification

## Purpose
Define structural validation for knowledge concepts and reproducible checks for the raw-source coverage inventory.

## Requirements

### Requirement: Validate concept YAML and sources

The knowledge validation workflow SHALL reject malformed concept frontmatter, missing source lists, duplicate source identifiers, and missing source URLs. This supports KT-002 in `docs/requirements/knowledge-traceability/requirement.md` and the provenance convention in `knowledge/index.md`.

#### Scenario: Concept has malformed YAML

- **GIVEN** a concept with malformed YAML frontmatter
- **WHEN** the knowledge YAML validator runs
- **THEN** validation fails

#### Scenario: Concept is missing source metadata

- **GIVEN** a concept without a source list
- **WHEN** the knowledge YAML validator runs
- **THEN** validation fails

### Requirement: Detect coverage inventory drift

The coverage check SHALL compare the stored inventory with the inventory derived from Git-tracked raw files and concept source references. This supports KT-001 in `docs/requirements/knowledge-traceability/requirement.md`.

#### Scenario: Inventory matches current inputs

- **GIVEN** the stored inventory matches the tracked raw files and source references
- **WHEN** the coverage check runs
- **THEN** the check succeeds
