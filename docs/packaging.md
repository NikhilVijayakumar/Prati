# Public GitHub Libraries — Packaging, Publishing and Release Management

**Implementation Guide — Version 1.0**  
**Date:** 9 November 2026  
**Owner:** Nikhil Vijayakumar  
**Scope:** Personal public GitHub repositories containing reusable JavaScript, TypeScript and Python libraries.

---

## 1. Objective

Migrate existing public GitHub libraries from direct Git-based dependencies to properly versioned packages distributed through npm and PyPI.

### Current approach

Applications install libraries directly from GitHub.

Example `package.json`:

```json
{
  "dependencies": {
    "prati": "github:NikhilVijayakumar/prati"
  }
}
```

Example Python dependency:

```bash
pip install git+https://github.com/USERNAME/python-library.git
```

### Proposed approach

Publish versioned, optimized packages while continuing to use GitHub for source control.

JavaScript/TypeScript:

```json
{
  "dependencies": {
    "@nikhilvijayakumar/prati": "1.0.0"
  }
}
```

Python:

```bash
pip install your-package-name==1.0.0
```

### Expected benefits

1. Smaller package artifacts through controlled file inclusion.
2. Precompiled JavaScript where applicable.
3. Versioned, repeatable dependency installation.
4. Simplified installation for colleagues.
5. Automated builds, tests and publishing.
6. Independent release cycles for each library.
7. No GitHub authentication required to install public packages from npm or PyPI.
8. Easier dependency updates and rollback.

**Important:** Packaging does not automatically guarantee smaller total installations or faster builds. Measure package size, installed dependencies and installation time before and after migration.

---

## 2. Decisions and scope

| Area | Decision |
|---|---|
| Source hosting | GitHub |
| Repository visibility | Public |
| Repository ownership | Personally owned |
| Primary consumers | Owner, team members and colleagues |
| JavaScript registry | npmjs.com |
| Python registry | PyPI |
| CI/CD | GitHub Actions |
| Licensing | MIT |
| Versioning | Semantic Versioning |
| Release trigger | Git version tags |
| Publishing authentication | OpenID Connect (OIDC) |
| Package optimization | Include only required distribution files |
| Private repositories | Out of scope |
| Private package registries | Not needed |
| GitHub Packages | Not selected |
| Monorepo migration | Not required |

### Why not GitHub Packages?

GitHub Packages is a valid option for npm libraries, but npmjs.com is more convenient for publicly distributed JavaScript packages because users can install them without GitHub package authentication.

GitHub Packages also does not offer a native PyPI-compatible registry.

Using npm and PyPI provides standard installation workflows across JavaScript and Python.

---

## 3. Target architecture

```text
Public GitHub Repository
        |
        | Developer pushes code
        v
GitHub Pull Request
        |
        | Tests and build verification
        v
Protected Main Branch
        |
        | Version is updated
        | Release tag is created
        v
GitHub Actions
        |
        +-- Validate release version
        |
        +-- Install build dependencies
        |
        +-- Run automated tests
        |
        +-- Build package
        |
        +-- Validate packaged files
        |
        +-- Publish using OIDC
        |
        +---------------------+
        |                     |
        v                     v
     npm Registry         PyPI Registry
        |                     |
        v                     v
   npm install            pip install
        |                     |
        +----------+----------+
                   |
                   v
          Consuming Applications
```

The source repository remains unchanged in purpose.

Only the package distribution mechanism changes.

---

## 4. One-time account configuration

### 4.1 Create an npm account

Registration:

https://www.npmjs.com/signup

Steps:

1. Create an npm account.
2. Verify the email address.
3. Enable two-factor authentication.
4. Check the available npm username or organization scope.
5. Confirm the desired package name is available.
6. Configure package publishing access.

Recommended naming pattern:

```text
@nikhilvijayakumar/prati
@nikhilvijayakumar/another-library
```

The npm scope must belong to an account or organization you control. The GitHub username alone does not reserve the equivalent npm scope.

For public scoped packages, use:

```bash
npm publish --access public
```

**First publication:** Normally publish the initial package version through an authenticated npm CLI session, then configure a trusted publisher on the package's npm settings page.

After trusted publishing is configured, subsequent releases can be handled by GitHub Actions.

### 4.2 Create a PyPI account

Registration:

https://pypi.org/account/register/

Steps:

1. Create a PyPI account.
2. Verify the email address.
3. Enable two-factor authentication.
4. Choose a unique package distribution name.
5. Configure a pending trusted publisher.
6. Link the GitHub repository and publishing workflow.

PyPI does not use npm-style account scopes.

Example naming pattern:

```text
nikhil-prati
nikhil-workflow-utils
nikhil-python-tools
```

These are illustrative names and must be checked for availability.

PyPI supports creating a new project through its first trusted-publishing workflow run. Manual first publication is not required when using a pending trusted publisher.

### 4.3 Use separate accounts

Only one account on each registry is needed for multiple libraries.

```text
GitHub Account
   |
   +-- Public JavaScript repositories
   |       |
   |       +-- npm account
   |
   +-- Public Python repositories
           |
           +-- PyPI account
```

Publishing public packages is free on both registries.

---

## 5. MIT licensing

### Decision

Use the MIT License as the default for personally owned public libraries.

MIT permits:

- Personal use.
- Commercial use.
- Modification.
- Redistribution.
- Integration into proprietary software.

It requires preserving the copyright and license notice.

### Copyright ownership

Copyright protection generally arises automatically when original code is created.

Purchasing a copyright or completing a separate registration is not required to apply the MIT License to code you own.

Example notice:

```text
Copyright (c) 2026 Nikhil Vijayakumar
```

Use the appropriate original copyright year for older libraries.

### Repository changes

Create:

```text
LICENSE
```

Copy the complete standard MIT License text from:

https://opensource.org/license/mit

Replace the template copyright holder with the correct name and year.

For npm:

```json
{
  "license": "MIT"
}
```

For modern Python packaging:

```toml
[project]
license = "MIT"
```

Keep the `LICENSE` file in the published distribution.

### Important

The repository must contain code you have the right to license. Third-party dependencies and embedded assets retain their own license requirements.

---

# PART A — JAVASCRIPT / TYPESCRIPT

## 6. Required npm repository changes

### Target repository structure

```text
prati/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── publish.yml
│
├── src/
│   └── index.ts
│
├── tests/
│
├── dist/                  # Generated, not committed
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
├── LICENSE
└── README.md
```

This is an example layout. Preserve existing repository structures where practical.

### 6.1 Update `package.json`

Example for a TypeScript Node.js library:

```json
{
  "name": "@nikhilvijayakumar/prati",
  "version": "1.0.0",
  "description": "Reusable development library",
  "license": "MIT",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/NikhilVijayakumar/prati.git"
  },
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org"
  },
  "scripts": {
    "build": "tsc",
    "prepack": "npm run build"
  }
}
```

This example illustrates the packaging fields. Merge them into the existing `package.json`, retaining valid dependencies, scripts and module settings.

**Do not replace an existing ESM module with CommonJS or vice versa merely to support publishing.**

The `main` and `types` paths must point to files actually generated by the build.

Add TypeScript as a development dependency if necessary:

```bash
npm install --save-dev typescript
```

Use the package's existing compatible TypeScript version where possible.

### 6.2 Configure TypeScript build output

Example `tsconfig.json` for a conventional NodeNext project:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "declaration": true,
    "sourceMap": false,
    "strict": true
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "tests"
  ]
}
```

Adapt this configuration to the actual project.

For libraries exposing multiple public entry points, configure the package `exports` field appropriately and ensure all exported files exist.

For JavaScript-only repositories, TypeScript compilation may be unnecessary.

### 6.3 Update `.gitignore`

```gitignore
node_modules/
dist/
coverage/
*.tgz
```

Retain any other relevant existing exclusions.

Commit `package-lock.json` so CI can use reproducible dependency resolution with `npm ci`.

### 6.4 Restrict published files

Use the `files` property:

```json
{
  "files": [
    "dist"
  ]
}
```

This generally excludes unnecessary development files from the published archive.

npm automatically includes certain metadata files, such as `package.json`, README and LICENSE.

Do not exclude assets required at runtime, such as templates, schemas, native binaries or configuration defaults.

### 6.5 Inspect the package locally

Execute:

```bash
npm ci
npm run build
npm pack --dry-run
```

Check:

- JavaScript output exists.
- TypeScript declarations exist where needed.
- Required runtime assets are included.
- Tests and development files are excluded.
- The package has no embedded credentials.
- The package size is reasonable.

To produce a local archive:

```bash
npm pack
```

Test installation of that archive in a separate temporary consumer project before publication.

---

## 7. npm publishing workflow

Create:

```text
.github/workflows/publish.yml
```

Example:

```yaml
name: Publish npm Package

on:
  push:
    tags:
      - "v*"

permissions:
  contents: read

jobs:
  publish:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      id-token: write

    steps:
      - name: Checkout source
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "24"
          registry-url: "https://registry.npmjs.org"
          package-manager-cache: false

      - name: Install dependencies
        run: npm ci

      - name: Validate release version
        env:
          RELEASE_TAG: ${{ github.ref_name }}
        run: |
          VERSION=$(node -p "require('./package.json').version")
          test "$RELEASE_TAG" = "v$VERSION"

      - name: Run tests
        run: npm test --if-present

      - name: Build package
        run: npm run build --if-present

      - name: Inspect package
        run: npm pack --dry-run

      - name: Publish package
        run: npm publish --access public
```

Replace the test and build commands with the actual commands used by the library.

### npm trusted publisher setup

After the initial npm package publication:

1. Open the package on npmjs.com.
2. Navigate to its settings.
3. Locate Trusted Publishers.
4. Select GitHub Actions.
5. Enter the GitHub owner.
6. Enter the repository name.
7. Enter `publish.yml` as the workflow filename.
8. Enable direct `npm publish` if the UI offers separate publishing permissions.
9. Save the configuration.

The GitHub workflow requires:

```yaml
permissions:
  id-token: write
```

Use npm CLI 11.5.1 or newer for trusted publishing; Node.js 24 is a convenient publishing runtime.

No long-lived npm publishing token is needed once OIDC is configured.

### Triggering a release

First update the version in `package.json` and the lockfile, commit the changes, and merge through the normal review process.

For example:

```bash
npm version patch
```

By default, `npm version` also creates a Git commit and tag. Use it only in the appropriate branch and release workflow.

For a manually controlled tag:

```bash
git tag v1.0.1
git push origin v1.0.1
```

The workflow validates that the Git tag matches the package version.

Only create a release tag from reviewed, approved source code.

---

## 8. Migrating npm consumers

### Existing dependency

```json
{
  "dependencies": {
    "prati": "github:NikhilVijayakumar/prati"
  }
}
```

### New dependency

```json
{
  "dependencies": {
    "@nikhilvijayakumar/prati": "1.0.0"
  }
}
```

Migration commands:

```bash
npm uninstall prati
npm install @nikhilvijayakumar/prati@1.0.0 --save-exact
```

Update import paths where necessary:

```javascript
import { someFunction } from "@nikhilvijayakumar/prati";
```

If retaining the original import name is useful during migration, npm supports aliases:

```json
{
  "dependencies": {
    "prati": "npm:@nikhilvijayakumar/prati@1.0.0"
  }
}
```

Verify compatibility in consuming applications.

Commit the updated `package-lock.json`.

Use:

```bash
npm ci
```

for CI installation.

---

# PART B — PYTHON

## 9. Required Python repository changes

### Recommended structure

```text
python-library/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── publish.yml
│
├── src/
│   └── your_package/
│       ├── __init__.py
│       └── core.py
│
├── tests/
│
├── pyproject.toml
├── .gitignore
├── LICENSE
└── README.md
```

### 9.1 Create or update `pyproject.toml`

Example using setuptools:

```toml
[build-system]
requires = ["setuptools>=77", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "your-package-name"
version = "1.0.0"
description = "Reusable Python development library"
readme = "README.md"
requires-python = ">=3.10"
license = "MIT"

authors = [
    { name = "Nikhil Vijayakumar" }
]

dependencies = []

[project.urls]
Repository = "https://github.com/USERNAME/REPOSITORY"

[tool.setuptools.packages.find]
where = ["src"]

[tool.setuptools]
include-package-data = false
```

Replace the project name, repository address and Python requirements.

Use real runtime dependencies rather than leaving `dependencies` empty if the package requires other libraries.

If the project already uses Hatch, Poetry, Flit or another build system, retain its existing backend.

### 9.2 Understand Python package naming

The distribution name and Python import name can differ.

Example:

```bash
pip install your-package-name
```

Import:

```python
import your_package
```

Use a unique distribution name on PyPI while retaining sensible Python module names.

### 9.3 Build Python distributions

Install the build tools:

```bash
python -m pip install --upgrade build twine
```

Build:

```bash
python -m build
```

This normally creates:

```text
dist/
├── your_package_name-1.0.0-py3-none-any.whl
└── your_package_name-1.0.0.tar.gz
```

Validate:

```bash
python -m twine check dist/*
```

The wheel is typically the preferred installation artifact for a compatible Python environment.

A source distribution is also useful for platforms or installation scenarios where a wheel is unavailable.

### 9.4 Python package size optimization

- Use a `src/` layout when appropriate.
- Exclude test fixtures and unnecessary development assets from distributions.
- Avoid including caches and generated temporary files.
- Exclude large datasets unless required at runtime.
- Keep dependency declarations accurate.
- Use wheels for convenient installation.
- Avoid bundling external dependencies without a specific need.

For Python libraries containing native code, build platform-specific wheels using an appropriate tool such as `cibuildwheel`.

Do not assume a pure-Python build workflow covers compiled dependencies or extensions.

---

## 10. PyPI publishing workflow

Create:

```text
.github/workflows/publish.yml
```

Example:

```yaml
name: Publish Python Package

on:
  push:
    tags:
      - "v*"

permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install tools
        run: python -m pip install build twine

      - name: Verify version
        env:
          RELEASE_TAG: ${{ github.ref_name }}
        run: |
          python - <<'PY'
          import os
          import tomllib

          with open("pyproject.toml", "rb") as f:
              version = tomllib.load(f)["project"]["version"]

          assert os.environ["RELEASE_TAG"] == f"v{version}"
          PY

      - name: Run tests
        run: |
          python -m pip install -e . pytest
          python -m pytest

      - name: Build distributions
        run: python -m build

      - name: Validate distributions
        run: python -m twine check dist/*

      - name: Upload distributions
        uses: actions/upload-artifact@v4
        with:
          name: python-dists
          path: dist/

  publish:
    needs: build
    runs-on: ubuntu-latest

    environment: pypi

    permissions:
      id-token: write

    steps:
      - uses: actions/download-artifact@v4
        with:
          name: python-dists
          path: dist/

      - name: Publish to PyPI
        uses: pypa/gh-action-pypi-publish@release/v1
```

The example assumes pytest and a static version stored in `pyproject.toml`. Adapt it to each repository's actual test framework and versioning system.

### Configure PyPI trusted publishing

Open:

https://pypi.org/manage/account/publishing/

Create a pending publisher using:

| Field | Value |
|---|---|
| PyPI project | Exact distribution name |
| Owner | GitHub repository owner |
| Repository | GitHub repository name |
| Workflow | `publish.yml` |
| Environment | `pypi` |

In the GitHub repository, create an environment named `pypi` under Settings → Environments.

For safer releases, configure environment protection and require approval before publishing.

The PyPI project is created when the first valid trusted-publishing workflow successfully uploads the package.

### Release commands

Update the version in `pyproject.toml`, then commit and merge the change.

Create a matching tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The workflow builds, validates and publishes the distribution.

### Installing the package

```bash
pip install your-package-name==1.0.0
```

For a project requirements file:

```text
your-package-name==1.0.0
```

Test the published wheel in a clean virtual environment before updating other applications.

---

# PART C — OPTIMIZATION

## 11. Packaging and size-reduction strategy

A primary goal is to avoid distributing unnecessary repository content.

### Optimization levels

| Level | Action | Recommendation |
|---|---|---|
| 1 | Exclude unrelated repository files | Required |
| 2 | Publish compiled JS when applicable | Required for TS libraries |
| 3 | Include only runtime assets | Required |
| 4 | Remove unused runtime dependencies | High priority |
| 5 | Disable unnecessary source maps | Optional |
| 6 | Bundle JavaScript using tsup/esbuild | Evaluate |
| 7 | Minify JavaScript | Evaluate |
| 8 | Support tree shaking | Useful for frontend libraries |
| 9 | Compress or externalize large assets | Case-dependent |
| 10 | Set size limits in CI | Recommended after baseline |

### Do not bundle everything automatically

Bundling is useful for some applications and standalone CLI programs, but can be counterproductive for libraries.

Possible drawbacks include:

- Duplicate dependencies.
- Larger application installations.
- Reduced compatibility.
- Complicated ESM/CommonJS interoperability.
- Difficulty handling native Node.js modules.

Start with clean packaging. Add bundling only when measurements show a benefit.

### Measure size before optimizing

For npm:

```bash
npm pack --dry-run
```

For Python:

```bash
python -m build
```

Record:

```text
Library:
Version:
Source repository size:
Published archive size:
Unpacked package size:
Total installed dependency size:
Installation time:
Build required by consumer:
```

Measure the Git-based installation and registry-based installation in equivalent clean environments.

Optimization should not remove required files or change public behavior.

---

# PART D — VERSIONING AND RELEASE MANAGEMENT

## 12. Semantic Versioning

Use:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
1.0.0
1.0.1
1.1.0
2.0.0
```

### Version rules

| Change | Version increment |
|---|---|
| Backward-compatible bug fix | PATCH |
| New backward-compatible functionality | MINOR |
| Breaking public API change | MAJOR |

These rules assume a stable public API from version 1.0.0 onward.

### Recommended release process

```text
Feature / Fix Branch
       |
       v
Pull Request
       |
       v
Review + CI Tests
       |
       v
Merge to Main
       |
       v
Update Version
       |
       v
Create Release Tag
       |
       v
GitHub Actions Publish
       |
       v
Verify Registry Package
       |
       v
Update Consumers
```

### Version pinning

Start with exact versions in consuming applications:

npm:

```json
{
  "dependencies": {
    "@nikhilvijayakumar/prati": "1.0.0"
  }
}
```

Python:

```text
your-package-name==1.0.0
```

Exact top-level versions do not automatically lock the entire transitive dependency graph. Use lockfiles or appropriate dependency-locking tools for reproducible application builds.

### Release immutability

Treat a published package version as immutable.

Do not attempt to overwrite a released version with different contents.

For fixes, publish a new version.

Example:

```text
1.0.0 → 1.0.1
```

A lockfile and consistent build environment are still necessary for reproducible builds.

---

## 13. GitHub Actions security

### Recommended controls

- Restrict who can push release tags.
- Protect the main branch.
- Require pull-request reviews.
- Run tests before publishing.
- Use OIDC rather than long-lived registry credentials.
- Set minimal workflow permissions.
- Configure release environment protections.
- Avoid running release jobs on untrusted code.
- Review third-party GitHub Actions.
- Pin production workflows to reviewed action commit SHAs where appropriate.
- Never include secrets in package archives.
- Check dependencies and licensing before publishing.

For public repositories, these controls are particularly important because publishing a compromised package can affect everyone who installs it.

---

## 14. README requirements

Each library should document:

### Overview

- What the library does.
- Intended use cases.
- Supported languages and runtimes.

### Installation

npm:

```bash
npm install @nikhilvijayakumar/prati
```

Python:

```bash
pip install your-package-name
```

### Usage

Include at least one working example.

### Compatibility

Document:

- Supported Node.js or Python versions.
- Supported operating systems, if relevant.
- External runtime requirements.
- Breaking changes and migration requirements.

### Release information

Link to GitHub Releases and optionally maintain:

```text
CHANGELOG.md
```

### License

```text
MIT License
Copyright (c) Nikhil Vijayakumar
```

Link to the complete LICENSE file.

---

# PART E — MULTIPLE REPOSITORIES

## 15. Standardizing your public libraries

Maintain independent repositories and versions.

Example:

```text
GitHub Account
│
├── prati
│   ├── package.json
│   └── .github/workflows/publish.yml
│
├── javascript-library-2
│   ├── package.json
│   └── .github/workflows/publish.yml
│
├── python-library-1
│   ├── pyproject.toml
│   └── .github/workflows/publish.yml
│
└── python-library-2
    ├── pyproject.toml
    └── .github/workflows/publish.yml
```

Each repository owns its:

- Package name.
- Version.
- Source code.
- Tests.
- Build configuration.
- Dependencies.
- Release history.

### Shared GitHub workflow templates

After the first few repositories are working, introduce reusable templates for:

1. npm testing and packaging.
2. Python testing and packaging.
3. Package size analysis.
4. Release validation.
5. Changelog checks.

Avoid centralizing every release step prematurely.

For PyPI trusted publishing, keep the actual publishing job in each repository's top-level workflow rather than relying on a reusable workflow that may not satisfy PyPI's identity restrictions.

### Suggested standard commands

npm:

```bash
npm ci
npm test
npm run build
npm pack --dry-run
```

Python:

```bash
python -m pip install build twine
python -m build
python -m twine check dist/*
```

---

# PART F — MIGRATION PLAN

## 16. Phase 1 — Registry accounts and licensing

- [ ] Create npm account.
- [ ] Create PyPI account.
- [ ] Verify email addresses.
- [ ] Enable account security.
- [ ] Confirm npm scope ownership.
- [ ] Decide standard package naming.
- [ ] Adopt MIT licensing.
- [ ] Add LICENSE files to eligible repositories.

**Outcome:** Registry accounts and license conventions are ready.

## 17. Phase 2 — Pilot with `prati`

- [ ] Review the existing repository.
- [ ] Inspect existing package scripts and module format.
- [ ] Update package metadata.
- [ ] Add package inclusion rules.
- [ ] Verify build output.
- [ ] Ensure tests pass.
- [ ] Measure archive contents and size.
- [ ] Add publishing workflow.
- [ ] Publish initial npm version.
- [ ] Configure npm trusted publishing.
- [ ] Verify automated publishing with a subsequent version.
- [ ] Install in one consuming application.
- [ ] Verify existing imports and behavior.
- [ ] Commit consumer lockfile updates.

**Outcome:** One complete npm publishing and consumption workflow is proven.

## 18. Phase 3 — Pilot with one Python library

- [ ] Select one pure-Python library.
- [ ] Validate `pyproject.toml`.
- [ ] Confirm import and package names.
- [ ] Build wheel and source distribution.
- [ ] Inspect distributed contents.
- [ ] Run automated tests.
- [ ] Add publishing workflow.
- [ ] Configure PyPI pending trusted publisher.
- [ ] Configure GitHub `pypi` environment.
- [ ] Publish first release.
- [ ] Install in a clean virtual environment.
- [ ] Confirm package functionality.

**Outcome:** One complete PyPI publishing and consumption workflow is proven.

## 19. Phase 4 — Migrate remaining stable libraries

For each library:

- [ ] Confirm the library is ready for versioned distribution.
- [ ] Confirm package name availability.
- [ ] Check ownership and licensing.
- [ ] Configure packaging.
- [ ] Test distribution contents.
- [ ] Publish initial version.
- [ ] Update consuming applications.
- [ ] Test compatibility.
- [ ] Document migration.
- [ ] Record package size measurements.

Experimental libraries may continue using Git dependencies until stable enough for packaging.

## 20. Phase 5 — Optional enhancements

After the initial migration:

- [ ] Introduce shared GitHub Actions workflows.
- [ ] Add automated changelog generation.
- [ ] Evaluate Changesets for npm version management.
- [ ] Evaluate Python-compatible automated versioning tools.
- [ ] Enable Dependabot or Renovate for consumers.
- [ ] Introduce package-size regression checks.
- [ ] Add automated consumer compatibility tests.
- [ ] Introduce prerelease versions when useful.
- [ ] Automate dependency upgrade pull requests.

These are improvements, not prerequisites.

---

## 21. Troubleshooting

| Problem | Likely cause | Resolution |
|---|---|---|
| npm publish authentication failure | Trusted publisher mismatch or initial package setup incomplete | Verify npm settings, GitHub repository and workflow identity |
| npm package name rejected | Name or scope unavailable | Choose an available name/scope |
| npm package missing files | Incorrect `files`, entry points or build output | Inspect `npm pack --dry-run` |
| npm consumer import failure | Changed package name or module exports | Update import paths or use an npm alias |
| PyPI publish denied | Incorrect pending publisher details | Match project, repository, workflow and environment |
| Python module not importable | Incorrect package discovery | Validate `src/` layout and wheel contents |
| Package unnecessarily large | Extra files or dependencies | Inspect archive and adjust packaging |
| Release version mismatch | Tag and metadata differ | Update metadata before tagging |
| Existing version cannot be republished | Registry version already exists | Increment version and publish again |
| CI installs fail | Dependency or lockfile issues | Rebuild and validate lockfiles |

---

## 22. Final repository checklist

Before the first release, every package should have:

- [ ] Valid package metadata.
- [ ] Unique registry name.
- [ ] Correct version.
- [ ] MIT LICENSE file.
- [ ] Installation instructions.
- [ ] Supported runtime declaration.
- [ ] Accurate runtime dependencies.
- [ ] Working tests.
- [ ] Working package build.
- [ ] Correct entry points and exports.
- [ ] Minimal package contents.
- [ ] No embedded secrets.
- [ ] Publishing workflow.
- [ ] Trusted publishing configuration.
- [ ] Verified installation from a clean environment.

---

## 23. Official documentation

### npm

- npm website: https://www.npmjs.com/
- Package configuration: https://docs.npmjs.com/cli/configuring-npm/package-json/
- Trusted publishing: https://docs.npmjs.com/trusted-publishers/
- npm publishing: https://docs.npmjs.com/cli/commands/npm-publish/

### Python / PyPI

- PyPI: https://pypi.org/
- Python packaging guide: https://packaging.python.org/
- Creating a Python package: https://packaging.python.org/en/latest/tutorials/packaging-projects/
- Trusted publishing: https://docs.pypi.org/trusted-publishers/
- Pending publisher setup: https://docs.pypi.org/trusted-publishers/creating-a-project-through-oidc/

### GitHub

- GitHub Actions: https://docs.github.com/en/actions
- Publishing packages: https://docs.github.com/en/actions/tutorials/publish-packages
- GitHub Releases: https://docs.github.com/en/repositories/releasing-projects-on-github

### Licensing

- MIT License: https://opensource.org/license/mit
- Choose a License: https://choosealicense.com/licenses/mit/

---

## 24. Final recommendation

Use the following standard for independently owned public libraries:

**Source control:** GitHub  
**JavaScript package registry:** npm  
**Python package registry:** PyPI  
**Automation:** GitHub Actions  
**Publishing security:** OIDC trusted publishing  
**License:** MIT  
**Versioning:** Semantic Versioning  
**Package size:** Minimal required distribution contents  
**Application dependencies:** Versioned packages rather than Git branch references

### Implementation order

1. Configure npm and PyPI accounts.
2. Standardize MIT licensing.
3. Migrate `prati` as the first npm package.
4. Validate npm package installation in a consuming application.
5. Package and publish one Python library.
6. Standardize the proven workflows.
7. Migrate the remaining stable libraries.
8. Introduce advanced optimization only when beneficial.

**Success criteria:** Every migrated library can be installed through its standard package manager, without cloning its Git repository or requiring the consuming application to build the library from source, except where source builds are intentionally supported.
