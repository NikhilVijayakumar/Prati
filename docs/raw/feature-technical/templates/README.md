# Template System: Feature Technical

## 1. Overview

The Template System provides server-side Handlebars-based template rendering for generating HTML strings used in email and notification delivery. It maintains a template registry that maps logical names to `.hbs` source files and exposes a rendering service that compiles and executes templates with caller-supplied data.

## 2. Feature Summary

| Capability | Description |
|---|---|
| Template Registration | Maintains a registry mapping template names to Handlebars source content |
| Compilation | Compiles `.hbs` templates into executable rendering functions |
| Rendering | Executes compiled templates with caller-supplied data and returns a structured result |
| Resolution Order | Prefers bundled templates map, falls back to filesystem reads in Node environments |
| Helper Support | Provides a custom `ifEquals` helper for conditional branching in templates |
| Cross-Platform | Supports both browser and Node.js template resolution paths |

## 3. Responsibilities

- Bundle `.hbs` template source files into the application for offline availability
- Compile Handlebars templates and render them with caller-supplied data
- Support both browser and Node.js template resolution paths
- Return a structured `RenderResult` containing success status, rendered HTML, and error information
- Provide a `ifEquals` custom Handlebars helper for conditional equality comparisons in templates

## 4. Non-Responsibilities

- Does not send emails, notifications, or any outbound communication
- Does not validate input data schemas before rendering
- Does not cache compiled templates across render calls
- Does not support template inheritance beyond Handlebars partials
- Does not provide theming, localization, or styling capabilities
- Does not enforce access control or permission checks on template usage

## 5. Architecture Mapping

| Architecture Discipline | Applicability |
|---|---|
| Atomic Hierarchy | Not applicable — the Template System operates outside the Atom→Molecule→Organism→Template tier system. Templates are server-side rendering utilities, not UI components. |
| Stateless UI | Not applicable — templates are server-side text processing units with no rendering lifecycle |
| Theme Sovereignty | Not applicable — templates do not reference theme tokens; some templates (base-layout) use hardcoded email-safe color values |
| Localization Invariant | Not applicable — templates accept pre-localized strings from callers and do not manage translation keys |

## 6. Responsibility Realization

| Responsibility | Technical Realization |
|---|---|
| Bundle `.hbs` templates | Template registry populated during application bootstrap with embedded source strings |
| Compile and render templates | `TemplateRenderer` service compiles via `Handlebars.compile()` and invokes the resulting function with data |
| Cross-platform resolution | Resolution strategy selects bundled map first; falls back to `fs.readFile` when `window` is undefined (Node only) |
| Return structured result | `RenderResult` object with shape `{ success: boolean, html?: string, error?: string }` |
| Provide `ifEquals` helper | Custom Handlebars helper registered globally; compares two arguments and executes the appropriate block |

## 7. Workflow Realization

| Step | Description |
|---|---|
| 1. Template Request | Caller provides template name and data payload |
| 2. Source Resolution | Resolver checks bundled templates map; if not found and in Node environment, reads from filesystem |
| 3. Compilation | Handlebars compiles the raw source into a render function |
| 4. Rendering | Compiled function is invoked with caller data plus registered helpers |
| 5. Result Packaging | Output HTML and success status are wrapped in a `RenderResult` and returned to caller |

## 8. State Realization

| Functional State | Technical Realization |
|---|---|
| Bundled Mode | Template source is resolved from the in-memory registry map; no I/O required |
| Filesystem Mode | Template source is read from disk via `fs.readFile`; only available in Node environment |
| Error State | Compilation or rendering failure produces a `RenderResult` with `success: false` and an error message |

## 9. Permission Realization

The Template System is a server-side rendering utility with no user-facing permission model. Access to template rendering is governed by the calling feature's own authorization logic.

## 10. Validation Realization

The Template System does not validate the structure or completeness of caller-supplied data. Missing variables render as empty strings per Handlebars default behavior. Schema validation, if required, is the responsibility of the calling feature.

## 11. Error Realization

| Condition | Behavior |
|---|---|
| Template name not found in registry and not on filesystem | Returns `RenderResult` with `success: false` and an error indicating the template could not be resolved |
| Handlebars compilation failure (syntax error in `.hbs` source) | Returns `RenderResult` with `success: false` and the compilation error message |
| Runtime render error (helper failure, unexpected data type) | Returns `RenderResult` with `success: false` and the runtime error message |
| Filesystem read error (permissions, missing file) | Returns `RenderResult` with `success: false` and the I/O error message |

## 12. Integration Realization

| Integration Point | Description |
|---|---|
| Calling Features | Features (alert, OTP email, task summary, base layout) invoke the `TemplateRenderer` with their template name and data |
| Template Registry | Populated at bootstrap with embedded `.hbs` source strings for each known template |
| Filesystem (Node only) | Fallback resolution path reads `.hbs` files from disk when bundled lookup fails |

## 13. Ownership Mapping

| Artifact | Owner |
|---|---|
| Template registry | Template System |
| Template source (`.hbs` files) | Individual feature teams owning each template |
| `TemplateRenderer` service | Template System |
| `ifEquals` helper | Template System |
| `RenderResult` type | Template System |

## 14. Architecture Traceability

| Architecture Decision | Compliance |
|---|---|
| Templates exist outside Atomic Hierarchy | Templates are server-side rendering utilities; not subject to UI component tier rules |
| No theme token dependency | Templates that require styling (base-layout) use hardcoded values appropriate for email client rendering |
| No localization responsibility | Templates accept pre-localized strings; no translation key management |

## 15. Feature Traceability

| Artifact | Feature |
|---|---|
| Template registry | Template System |
| Template compilation | Template System |
| Template rendering | Template System |
| `ifEquals` helper | Template System |
| Render result packaging | Template System |

## 16. Open Questions

- Should compiled templates be cached to avoid repeated compilation of the same source?
- What is the expected behavior when a template contains a helper that is not registered?
- Should there be a mechanism for callers to register custom helpers per-render rather than globally?
- How are template source updates handled at runtime without application restart?
