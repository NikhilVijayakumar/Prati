## ADDED Requirements

### Requirement: Distributable package

The package SHALL expose JavaScript and declarations for existing public entry points (PKG-001; `knowledge/architecture/library-compatibility.md`).

#### Scenario: Consumer installs archive

- **GIVEN** a built package archive and its peers
- **WHEN** a consumer imports its public entry points
- **THEN** JavaScript and type entry points resolve.

### Requirement: Release validation

GitHub Actions SHALL run checks and only stage a version matching its release tag; publication SHALL require maintainer approval on npm (PKG-002; `knowledge/architecture/library-compatibility.md`).

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

### Requirement: Documented browser package usage

The package SHALL expose its documented bundled templates and initialize its theme without invalid CSS warnings, preserving theme-dependent scrollbar colors (PKG-001; `knowledge/architecture/library-compatibility.md`; `knowledge/concepts/theming.md`). Node-only template file loading remains available in Node.

#### Scenario: Browser consumer uses bundled templates

- **GIVEN** a consumer installs the built archive
- **WHEN** it imports the documented template API and renders an OTP template
- **THEN** the export resolves and the supplied code appears in the result.

#### Scenario: Theme initialization

- **GIVEN** a consumer renders the supplied theme
- **WHEN** the browser initializes the theme
- **THEN** scrollbar styles use the current theme without CSS property warnings.

#### Scenario: Valid release awaits approval

- **GIVEN** a matching release tag and passing checks
- **WHEN** GitHub Actions stages the package
- **THEN** the version is not publicly released until a maintainer approves it on npm with 2FA.
