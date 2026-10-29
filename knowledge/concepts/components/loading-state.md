---
type: Concept
title: "LoadingState"
description: "Documented purpose and responsibilities of LoadingState."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/atoms/LoadingState.md
  - id: source-2
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature-technical/components/atoms/LoadingState.md
  - id: source-3
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature-design/components/atoms/LoadingState.md
---

# LoadingState

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

A simple full-width loading indicator consisting of a spinning animation and a localized "Loading..." text message. Centered both horizontally and vertically within its container. Self-contained with no configuration options.

## Documented responsibilities

- Display a centered animated spinner during loading operations
- Show a localized "Loading..." text message below the spinner
- Fill the full width of its parent container

## Documented boundaries

- Does not accept custom messages or content
- Does not handle error, empty, or success transitions
- Does not respond to user interaction
- Does not manage timing or minimum display duration

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.

## Documented intent and observed difference

The source documentation describes a full-width container. The component's current root uses a flex layout without an explicit width; the space it occupies can depend on the parent layout. The intended width contract needs a maintainer decision and a behavior check before it is treated as guaranteed.

The technical source describes a different translation key and a progressbar accessibility gap. The implementation inspected during this review reads `loading_message`, sets `role="status"` on the container, and hides the spinner from assistive technology. These observations require behavioral verification and should not be confused with the older technical description.
