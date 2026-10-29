---
type: Concept
title: "FormLayout"
description: "Documented purpose and responsibilities of FormLayout."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/organisms/FormLayout.md
---

# FormLayout

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

Provides consistent vertical layout for form pages. Includes an optional title header at the top and a dedicated actions row at the bottom for submit or cancel buttons. Maintains a max-width constraint for readability. All sections are optional and render independently.

## Documented responsibilities

- Provide consistent vertical layout for form pages
- Render an optional title header at the top of the form
- Render an optional actions row at the bottom for submit/cancel buttons
- Maintain a max-width constraint for readability

## Documented boundaries

- Does not manage form state, field values, or submission handling
- Does not validate form inputs or display validation errors
- Does not handle form lifecycle events (submit, reset, dirty tracking)
- Does not provide scroll behavior for long forms
- Does not render feedback messages (success, error)

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.
