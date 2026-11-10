# Proposal: npm release

Package Prati for npm and validate and publish releases through GitHub Actions. Scope includes package metadata, distribution compatibility, CI, release workflow and migration guidance; excludes UI changes and account configuration. The scoped name changes consumer installation and imports; existing exports and peer ranges remain.

Knowledge: `knowledge/architecture/library-compatibility.md`. Requirements: `docs/requirements/npm-release/requirement.md` PKG-001?003 (draft). Change ID `fe-npm-release`; branch `develop`. Ownership and registry availability require verification.

Browser consumer verification found that the documented bundled template export is missing and theme initialization emits CSS warnings. Correct the export and warnings and preserve Node template file loading; no new screens or peer changes are intended. The existing draft PKG-001 and library compatibility knowledge apply, along with `knowledge/concepts/theming.md` for theme behavior. Branch: develop.
