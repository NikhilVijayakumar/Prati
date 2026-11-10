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

## Browser consumer fixes

- [x] Export documented template map and test rendering through public API (PKG-001).
- [x] Correct theme CSS callbacks and preserve Node template file fallback (PKG-001).
- [x] Run focused tests, lint, build, and packed browser consumer checks; record limitations.

- Follow-up: 229 tests, lint and build passed; the build emitted no Node externalization warnings. A fresh offline tarball install passed the documented template example and root/component/theme browser smoke checks with no console warnings or errors. Node file fallback passed for ESM and CJS with a DOM shim. Direct Node imports without a DOM, full consumer compatibility, registry ownership and publication remain unverified; previous direct Node import failure remains a known limitation. Gherkin scenarios are not executable tests.

## Staged release approval

- [x] Update the workflow and release guidance for staged publishing (PKG-002).
- [x] Validate workflow configuration and document external verification gaps.

- Staged workflow YAML, OIDC permission, pinned npm version, command and absence of direct publish were checked locally. A real tag-triggered staging run and npm 2FA approval remain unverified and require a configured trusted publisher and a new release version. Gherkin scenarios are not executable tests.
