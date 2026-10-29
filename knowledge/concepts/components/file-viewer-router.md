---
type: Concept
title: "FileViewerRouter"
description: "Documented purpose and responsibilities of FileViewerRouter."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/organisms/FileViewerRouter.md
---

# FileViewerRouter

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

A smart routing component that inspects the file extension and delegates rendering to the appropriate specialized viewer: CSV files go to the CSV viewer, Markdown and text files to the Markdown viewer, images to the image viewer, and JSON/JSONL to the JSON viewer. Unknown file types show an unsupported file message.

## Documented responsibilities

- Route to the correct viewer component based on file extension
- Support CSV, Markdown, text, image, and JSON/JSONL file types
- Display an unsupported file message for unknown extensions
- Pass encoding and MIME type metadata through to the image viewer

## Documented boundaries

- Does not load file content from disk or network
- Does not transform or convert file formats
- Does not validate file integrity or encoding
- Does not handle streaming or partial content

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.
