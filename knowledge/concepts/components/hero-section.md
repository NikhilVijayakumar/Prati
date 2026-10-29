---
type: Concept
title: "HeroSection"
description: "Documented purpose and responsibilities of HeroSection."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature/components/templates/HeroSection.md
---

# HeroSection

The existing feature documentation describes the following intent; current implementation and public API have not been verified by this extraction.

## Overview

A high-impact landing-style component for displaying primary page content. Shows a headline with optional description text, a call-to-action button, and additional content below. Supports seven entrance animation variants (fade-up, fade-in, slide-left, slide-right, scale-up, stagger-fade, typewriter) that sequentially animate the headline, description, button, and children. The typewriter effect reveals the headline character by character.

## Documented responsibilities

- Render a prominent headline with optional description and call-to-action button
- Support entrance animations with multiple animation variants
- Sequentially stagger animation timing across headline, description, button, and children
- Provide typewriter effect for headline text

## Documented boundaries

- Does not fetch data or manage server state
- Does not handle navigation routing — action click handler is a void callback
- Does not manage scroll behavior beyond its own content area
- Does not render outside the hero section boundary
- Does not support multiple action buttons — only one primary action

Detailed states, props, edge cases and accessibility require review against the implementation and supporting design and technical documents.
