---
type: Concept
title: "TrendMetricCard"
description: "Documented purpose and responsibilities of TrendMetricCard."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/molecules/TrendMetricCard.md
---

# TrendMetricCard

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

Shows a metric label and value in a compact card format, with an optional trend indicator showing direction (up/down/neutral) and percentage change. The trend color communicates positive (green) or negative (red) movement. Adapts to its container width for use in dashboard metric rows.

## Documented responsibilities

- Display a metric label and value in a compact card
- Show an optional trend indicator with color-coded direction
- Adapt to container width

## Documented boundaries

- Does not fetch or calculate metric data
- Does not format values beyond rendering them as-is
- Does not handle click events or user interaction
- Does not animate trend changes or value transitions
- Does not provide chart or sparkline visualization

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.
