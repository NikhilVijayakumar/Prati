---
type: Concept
title: "CsvViewer"
description: "Documented purpose and responsibilities of CsvViewer."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/organisms/CsvViewer.md
---

# CsvViewer

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

Parses CSV content into a sortable table with configurable pagination. Auto-detects comma or semicolon delimiters based on the first line. Shows column headers that remain visible during scroll. Supports configurable rows per page (10, 25, or 50). Displays an empty state message when no CSV content is available.

## Documented responsibilities

- Parse CSV content into headers and data rows
- Auto-detect comma or semicolon delimiter from the first line
- Render data in a paginated table with sticky headers
- Provide configurable rows per page
- Show an empty state message when no CSV content is available

## Documented boundaries

- Does not load file content from disk or network
- Does not support write-back, editing, or saving CSV data
- Does not validate CSV structure or column types
- Does not provide column sorting, filtering, or search
- Does not handle non-CSV file formats

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.
