---
type: Concept
title: "StatusDot"
description: "Documented purpose and responsibilities of StatusDot."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/atoms/StatusDot.md
---

# StatusDot

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

Displays a small colored dot representing one of several predefined states (ok, warning, error, executing, waiting). The color communicates the state without requiring text. Size is configurable for different contexts.

## Documented responsibilities

- Visually communicate component or system status
- Support multiple status levels with distinct colors
- Allow size configuration for different UI contexts

## Documented boundaries

- Does not display text labels or tooltips
- Does not handle click interactions
- Does not animate state transitions
- Does not manage or persist state

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.
