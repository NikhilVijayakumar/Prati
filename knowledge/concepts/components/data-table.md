---
type: Concept
title: "DataTable"
description: "Documented purpose and responsibilities of DataTable."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/organisms/DataTable.md
---

# DataTable

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

Renders structured data in a table format with a header that stays visible during vertical scroll. Column definitions drive the table output — each column specifies its label, alignment, minimum width, and an optional custom render function for cells. Rows display in the order provided; no built-in sorting or pagination.

## Documented responsibilities

- Render tabular data with a sticky header that remains visible during vertical scroll
- Support custom column definitions with label, alignment, and minimum width
- Support custom cell rendering via per-column render functions
- Apply hover styling on table rows

## Documented boundaries

- Does not paginate, sort, or filter data — rows render in the order provided
- Does not support inline editing, row selection, or bulk actions
- Does not fetch or load data from any source
- Does not provide built-in search or column visibility controls
- Does not handle empty, loading, or error states — these must be managed by the parent

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.
