---
type: Architecture
title: "Provider Hierarchy"
description: "Theme and language contexts are composed at the application root."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/README.md
  - id: source-2
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/architecture/runtime-maps/provider-hierarchy.md
---

# Provider Hierarchy

The documented integration places ThemeProvider outside LanguageProvider. Consumer-managed providers such as authentication and routing are nested inside them. Theme and language hooks expose their respective context to descendants.
