---
type: Concept
title: "EmptyState"
description: "Documented purpose and responsibilities of EmptyState."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/atoms/EmptyState.md
---

# EmptyState

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

A simple text indicator displaying a localized "No data found" message when no content is available to display. Centered in its container with standard spacing. Self-contained with no configuration options.

## Documented responsibilities

- Display a centered "No data found" text indicator
- Use localization for the message text
- Fill the width of its parent container

## Documented boundaries

- Does not accept custom messages or content
- Does not provide action buttons, retry, or dismiss functionality
- Does not handle loading, error, or populated state transitions
- Does not manage or persist state

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.
