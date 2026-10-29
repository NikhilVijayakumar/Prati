---
type: Architecture
title: "Provider Hierarchy"
description: "Theme and language contexts are composed at the application root."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
---

# Provider Hierarchy

The documented integration places ThemeProvider outside LanguageProvider. Consumer-managed providers such as authentication and routing are nested inside them. Theme and language hooks expose their respective context to descendants.
