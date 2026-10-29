---
type: Concept
title: "Visual Tokens and Surfaces"
description: "Design guidance describes semantic color, spacing, typography and elevation."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/design-system/design.md
  - id: source-2
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/design-system/rules/atomic-rules.md
  - id: source-3
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/design-system/rules/mui-tokens.md
  - id: source-4
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/design-system/rules/theme.md
---

# Visual Tokens and Surfaces

The design reference describes indigo primary actions, neutral light and dark backgrounds, separate paper surfaces, semantic status colors and understated dividers. Theme and component code should be inspected for the actual values exposed to consumers. Color should convey purpose while text and controls remain legible in both modes.

The design guide describes an 8px rhythm; the spacing tokens also contain 4px and 12px values. Treat this as a documented discrepancy, not proof that all spacing is an 8px multiple. The mockup guidance describes CSS-variable mappings and specific generated artifacts; those are not established requirements for every React component.

Until a maintainer resolves the spacing policy, retain existing token values and treat the 8px grid as design intent rather than a verified universal invariant.
