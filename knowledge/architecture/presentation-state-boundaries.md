---
type: Architecture
title: "Presentation and State Boundaries"
description: "The documented UI boundary separates rendering from application-owned behavior."
status: draft
generated: { by: openai/codex, at: 2026-10-30T00:00:00Z }
sources:
  - id: source-1
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/architecture/integration-contracts/state-management.md
  - id: source-2
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/architecture/invariants/mvvm-separation.md
  - id: source-3
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/architecture/invariants/stateless-ui.md
  - id: source-4
    resource: https://github.com/NikhilVijayakumar/Prati/blob/3e08389071e07af92f9bc0574c6d3bd00aea98ef/docs/raw/feature-technical/proto-runtime/persistence.md
---

# Presentation and State Boundaries

Reusable presentation components receive data and callbacks; transient interaction state may live with the component. Application or consumer layers own domain state, data fetching and persistence. The documentation describes a theme-preference persistence exception for the theme provider and separately describes local storage for prototype runtime data.

These are intended boundaries. Check actual behavior and the scope of an exception before concluding that any particular module satisfies them.
