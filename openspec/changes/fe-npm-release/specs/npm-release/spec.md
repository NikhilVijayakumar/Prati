## ADDED Requirements

### Requirement: Distributable package

The package SHALL expose JavaScript and declarations for existing public entry points (PKG-001; `knowledge/architecture/library-compatibility.md`).

#### Scenario: Consumer installs archive

- **GIVEN** a built package archive and its peers
- **WHEN** a consumer imports its public entry points
- **THEN** JavaScript and type entry points resolve.

### Requirement: Release validation

GitHub Actions SHALL run checks and only publish a version matching its release tag (PKG-002; `knowledge/architecture/library-compatibility.md`).

#### Scenario: Version mismatch

- **GIVEN** a release tag differs from the package version
- **WHEN** the publish workflow runs
- **THEN** publication fails before the registry operation.

### Requirement: Migration guidance

Documentation SHALL describe setup and migration (PKG-003; `knowledge/architecture/library-compatibility.md`).

#### Scenario: Existing consumer migrates

- **GIVEN** a consumer importing `prati`
- **WHEN** it adopts the scoped package
- **THEN** guidance explains scoped imports and the alias option.
