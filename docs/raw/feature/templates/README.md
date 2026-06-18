# Template System

**Feature Area:** Server-Side Handlebars Template Rendering

## Overview

Prati ships a Handlebars-based template rendering system for generating HTML strings — primarily for email and notification content. The system bundles `.hbs` templates at build time and exposes a `templateRenderer` service that compiles and renders them with caller-supplied data.

This is distinct from the UI component templates (PageHeader, SummaryPanel, HeroSection) in the atomic design tier. Those are framework components. These are server-side HTML generation templates.

## Architecture

```
src/templates/        ← .hbs source files + bundledTemplates registry
src/services/         ← templateRenderer service
src/types/            ← template.types.ts interfaces
```

## Template Registry

`bundledTemplates` (`src/templates/index.ts`) is a `Record<string, string>` that maps template names to raw Handlebars source strings. Templates are imported at build time via `?raw` Vite imports.

| Template Name   | File               | Purpose                            |
| --------------- | ------------------ | ---------------------------------- |
| `base-layout`   | `base-layout.hbs`  | Email container with header/footer |
| `otp-email`     | `otp-email.hbs`    | OTP code delivery email            |
| `alert`         | `alert.hbs`        | Alert notification with type styling |
| `task-summary`  | `task-summary.hbs` | Task list summary with status      |

## TemplateRenderer Service

`createTemplateRenderer(cfg?)` returns a `TemplateRendererService`:

```ts
const renderer = createTemplateRenderer({ templates: bundledTemplates });
const result = await renderer.render({ templateName: 'otp-email', data: { name: 'Alice', code: '1234', title: 'OTP' } });
// result.success: true, result.html: rendered string
```

**Resolution order:**
1. Check `templates` map (bundled) — used in browser and Node
2. Fall back to `basePath` filesystem read (Node only) — for custom template directories

## Custom Helpers

Templates use a custom `ifEquals` block helper for conditional styling:

```hbs
{{#ifEquals type 'warning'}}...{{else ifEquals type 'error'}}...{{/ifEquals}}
```

This helper is registered automatically in `templateRenderer.ts` at module load time.

## Responsibilities

- Bundle `.hbs` templates at build time via Vite `?raw` imports
- Compile and render templates with caller-supplied data using Handlebars
- Support both browser (bundled map) and Node (filesystem) rendering paths
- Return a structured `RenderResult` with `success`, `html`, or `error`

## Non-Responsibilities

- Does not send emails — rendering only, transport is caller responsibility
- Does not validate template data schemas — callers provide correct shapes
- Does not cache compiled templates across calls
- Does not support template inheritance beyond Handlebars partials

## States

- **Bundled mode** — renderer uses `bundledTemplates` map; works in browser and Node
- **Filesystem mode** — renderer reads from `basePath` directory; Node-only
- **Error** — template not found or Handlebars compile/render failure; returns `{ success: false, error }`

## Error Conditions

- Template name not in map and no `basePath` — returns `{ success: false, error: "Template not found..." }`
- Handlebars compile error — returns `{ success: false, error: <message> }`
- File read failure (filesystem mode) — returns `{ success: false, error: <message> }`

## See Also

- [base-layout](./base-layout.md) — email container template
- [otp-email](./otp-email.md) — OTP delivery template
- [alert](./alert.md) — alert notification template
- [task-summary](./task-summary.md) — task list summary template
- [UI Component Templates](../components/atomic-design/templates.md) — atomic design layout tier (separate concept)

## Future Enhancements

- Register `ifEquals` and other custom helpers centrally in the renderer factory
- Cache compiled `HandlebarsTemplateDelegate` instances to avoid recompilation per render call
- Template data schema validation (e.g., Zod) before compile to surface data errors early
- Support for Handlebars partials registration in the renderer config

## Open Questions

- Should `configure()` (currently a no-op) accept helper registrations?
- Should the renderer support async Handlebars helpers for dynamic content?
