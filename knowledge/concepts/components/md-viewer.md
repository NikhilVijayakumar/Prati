---
type: Concept
title: "MdViewer"
description: "Documented purpose and responsibilities of MdViewer."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/molecules/MdViewer.md
---

# MdViewer

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

Converts raw Markdown content into styled HTML for reading. Displays the file name as a heading above the rendered content. Applies custom styling to headings, paragraphs, lists, blockquotes, and horizontal rules. The Markdown parser is loaded lazily to optimize initial bundle size.

## Documented responsibilities

- Render Markdown content to styled HTML
- Display the file name as a heading with a divider separator
- Lazy-load the Markdown parser for code-splitting
- Apply custom styling to headings, blockquotes, paragraphs, lists, and horizontal rules

## Documented boundaries

- Does not load file content from disk or network
- Does not support syntax highlighting, diagrams, or embedded media
- Does not handle file encoding or format conversion
- Does not persist scroll position across re-renders

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.
