---
type: Concept
title: "PageHeader"
description: "Documented purpose and responsibilities of PageHeader."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/templates/PageHeader.md
---

# PageHeader

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

Provides a comprehensive header for page-level content. Supports primary and secondary action buttons with configurable appearance, leading and trailing meta content slots, and a responsive layout that wraps on narrow viewports. The title is required; all other sections are optional and render independently. Designed for use across multiple pages as a consistent page header template.

## Documented responsibilities

- Render a page-level header with title and optional subtitle
- Render primary and secondary action buttons with configurable variant and size
- Render leading and trailing meta content slots
- Wrap responsively on narrow viewports

## Documented boundaries

- Does not manage page-level state or data fetching
- Does not handle navigation routing — action click callbacks are void functions
- Does not render breadcrumbs, tabs, or other secondary navigation
- Does not provide sticky or scroll-aware behavior
- Does not manage responsive breakpoints beyond wrapping behavior

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.
