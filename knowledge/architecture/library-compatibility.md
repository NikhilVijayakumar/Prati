---
type: Architecture
title: "Library Compatibility and Release"
description: "The documented public contract includes exports, types and peer compatibility."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/architecture/core/release-governance.md
  - id: source-2
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/architecture/invariants/dependency-safety.md
  - id: source-3
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/architecture/invariants/deterministic-build.md
  - id: source-4
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/architecture/invariants/platform-neutrality.md
  - id: source-5
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/architecture/invariants/public-api-stability.md
  - id: source-6
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/architecture/invariants/repository-isolation.md
---

# Library Compatibility and Release

The library's public interface includes exported components, providers, hooks, types, package entry points and supported peer dependency ranges. The release guidance treats consumer-breaking changes as requiring a migration and appropriate versioning. Platform-neutrality guidance calls for guarding browser-only APIs when server rendering or non-browser use is relevant.

Verify the actual export map, bundle formats and current code when planning a change; historical build audit claims are not current test results.
