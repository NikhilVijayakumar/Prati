---
type: Concept
title: "Card"
description: "Documented purpose and responsibilities of Card."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/molecules/Card.md
---

# Card

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

A versatile card component that wraps content in a bordered surface. Supports a header with title, supporting text, and an action slot. The card body accepts any content as children. All header sections are optional and render independently.

## Documented responsibilities

- Render a styled container surface for grouping content
- Display an optional header with title, supporting text, and action slot
- Render children as the card body content

## Documented boundaries

- Does not manage or persist state
- Does not fetch or load data
- Does not handle click events or user interactions beyond the action slot
- Does not enforce layout constraints
- Does not provide scroll or overflow behavior

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.
