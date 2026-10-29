---
type: Concept
title: "Notification"
description: "Documented purpose and responsibilities of Notification."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/molecules/Notification.md
---

# Notification

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

A toast-style notification that displays a message with a configurable severity level (success, info, warning, error). Anchored at the bottom-center of the viewport. Auto-dismisses after a configurable duration, or can be set to persist until manually closed.

## Documented responsibilities

- Display a toast notification at the bottom-center of the screen
- Show a message with configurable severity styling
- Auto-dismiss after a configurable duration
- Fire a callback when dismissed or auto-hidden

## Documented boundaries

- Does not manage app-wide notification queue or stacking
- Does not persist notification history across sessions
- Does not provide undo or action callbacks within the notification
- Does not handle multiple simultaneous notifications
- Does not support custom positioning

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.
