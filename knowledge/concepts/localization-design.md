---
type: Concept
title: "Localization Design"
description: "Translated interfaces need flexible layouts and accessible language context."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/design-system/rules/localization.md
  - id: source-2
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature-design/localization/patterns.md
  - id: source-3
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature-technical/localization/README.md
---

# Localization Design

The visual guidance calls for translatable text, layouts that tolerate expansion, attention to text direction, accessible language metadata and readable non-Latin scripts. These are design considerations, not a claim that the runtime implements every internationalization feature.

The runtime documentation explicitly excludes built-in pluralization, interpolation and RTL switching, while mockup guidance describes approaches for those needs. Distinguish consumer- or generator-provided behavior from the capabilities of the language provider.
