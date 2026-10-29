---
type: Concept
title: "SeverityBadge"
description: "Documented purpose and responsibilities of SeverityBadge."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/atoms/SeverityBadge.md
---

# SeverityBadge

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

Renders a compact label indicating severity (CRITICAL, WARNING, URGENT, INFO, SUCCESS) using color-coded semi-transparent backgrounds and matching text colors. Accepts any string input with graceful fallback to default styling.

## Documented responsibilities

- Display a color-coded severity level label
- Map severity levels to distinct visual treatments
- Accept any string input with graceful fallback

## Documented boundaries

- Does not display icons or visual indicators alongside text
- Does not handle click events or user interaction
- Does not manage or persist state
- Does not transform or format the level value

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.
