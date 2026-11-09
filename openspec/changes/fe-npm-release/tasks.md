# Tasks

- [x] Record draft requirements, design and nonvisual contract (PKG-001?003).
- [x] Configure package metadata and entry points (PKG-001).
- [x] Add CI and release workflow and migration guidance (PKG-002?003).
- [ ] Verify checks and packed consumer entry points; record failures and gaps.
- [ ] Configure accounts and publish a verified release.

## Verification evidence

- Lint passed; build passed with browser-external warnings for Node modules.
- Full suite: 226 passed, one MdViewer async loading test failed under parallel load; isolated file passed (4 tests).
- Dry-run package: 821,812 bytes compressed, 2,703,868 bytes unpacked; includes JS, declarations, README and license.
- Direct Node imports of both formats fail because bundled code accesses `document` at module evaluation; SSR/Node compatibility and clean consumer installation remain unverified.
- GitHub and npm authentication, ownership, hosted workflow, and publication remain unverified. Gherkin scenarios above are not executed tests.
