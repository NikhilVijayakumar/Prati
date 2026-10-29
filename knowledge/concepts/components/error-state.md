---
type: Concept
title: "ErrorState"
description: "Documented purpose and responsibilities of ErrorState."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/atoms/ErrorState.md
---

# ErrorState

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

Displays an error message with appropriate visual treatment for error states. Accepts an optional custom error message; falls back to a localized default message when none is provided. Centered within its container.

## Documented responsibilities

- Display an error message with error-appropriate visual styling
- Show a custom error message when provided
- Fall back to a localized default message when no custom message is given

## Documented boundaries

- Does not capture or log errors to any service
- Does not provide retry, dismiss, or action callbacks
- Does not display error codes, stack traces, or technical details
- Does not manage error recovery or state transitions

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.
