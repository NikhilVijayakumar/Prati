# Translation Patterns

Guidelines for organizing translations and naming keys.

## Overview

Translation Patterns defines the conventions for structuring translation dictionaries, naming keys, and adding new languages. Following these patterns ensures consistency across features and simplifies maintenance.

## Translation Structure

Organize translations as a flat key-value object per language. Each language has its own dictionary with dot-notation keys.

### Example Structure

```
en: {
  "ui.save": "Save",
  "ui.cancel": "Cancel",
  "msg.welcome": "Welcome back",
  "form.name.label": "Name"
}
es: {
  "ui.save": "Guardar",
  "ui.cancel": "Cancelar",
}
```

## Key Naming Conventions

| Pattern         | Example                            | Use Case               |
| --------------- | ---------------------------------- | ---------------------- |
| `category.key`  | `ui.save`, `msg.error`             | Groups related strings |
| `component.key` | `header.title`, `footer.copyright` | Component-scoped       |
| `screen.action` | `login.submit`, `settings.reset`   | Page-specific          |

## Best Practices

1. **Prefix keys by category** — `ui.*`, `msg.*`, `form.*`, `validation.*`
2. **Use consistent naming** — snake_case for keys, camelCase for structure
3. **Provide fallbacks** — handle missing keys gracefully in UI
4. **Keep translations flat** — avoid nested objects, use dot notation instead

## Adding a New Language

1. Create a new dictionary with the same key structure as existing languages
2. Provide at least the core UI keys (save, cancel, etc.)
3. Register the language code and label with the provider
4. The provider exposes the new language for users to select

## Responsibilities

- Define a consistent key-naming convention for all translations
- Provide guidance on flat dictionary structure per language
- Document patterns for accessing translations
- Establish conventions for adding new languages

## Non-Responsibilities

- Not a replacement for full i18n library (pluralization, interpolation, date/number formatting)
- Does not enforce patterns via tooling or lint rules (convention-only)
- Does not cover runtime key fallback or merging strategies
- Does not specify file-splitting or lazy-loading strategies for large translation sets

## Core Concepts

| Concept | Description |
| ------- | ----------- |
| **Dot-notation keys** | Keys like `ui.save` create a namespaced flat structure instead of nested objects |
| **Category prefixing** | `ui.*`, `msg.*`, `form.*` group related keys for maintainability |
| **Per-language dictionary** | Each language is an independent flat set of key-value pairs |
| **Partial coverage** | Languages may define a subset of keys — missing keys surface as undefined at runtime |

## States

- **Defined:** Translation structure is fully specified with conventions and examples
- **Undefined:** Patterns are convention-only — no runtime enforcement via tooling or lint rules
- **Extended:** Adding a new language following the documented pattern

### State Transitions

| From State | To State | Trigger |
| ---------- | -------- | ------- |
| Defined | Extended | A developer adds a new language dictionary following conventions |
| Extended | Defined | New language addition is complete and verified |
| Defined | Undefined | Conventions diverge across features with no enforcement; pattern consistency degrades |
| Undefined | Defined | Patterns are re-aligned and documented with examples |

## Edge Cases

- **Missing key in active language**: Consuming code must handle with fallback or optional chaining
- **Language with no keys**: An empty dictionary is valid but produces no translated strings
- **Dot key collision**: Keys like `form.name` and `form.name.label` can collide if mixed — keep keys at one depth level
- **Non-string values**: Translation values must be strings — objects or numbers cause rendering issues

## Error Conditions

- **Missing key in active language** — Component must handle with fallback text or the key itself
- **Dot key collision** — Mixing keys at different depths causes ambiguous lookups
- **Non-string values** — Objects or numbers in translation values cause rendering errors
- **Partial language coverage** — Languages with subset of keys render missing text as empty values

## Authorization

**Visibility:** Public — translation patterns are a developer reference; all developers may contribute translations without access restrictions.

## User Journey

### Entry Conditions
A developer needs to add translations for a new feature or a new language.

### Primary Flow
The developer follows the key-naming conventions (category.key or component.key), adds entries to the language dictionary, and the translations become available through the localization provider.

### Alternate Flows
A developer adds a new language by creating a new dictionary with the same key structure and registering it with the provider.

### Failure Flows
A developer creates a key that collides with an existing key at a different depth, causing ambiguous lookups.

### Recovery Flows
The developer reviews the key-naming conventions, removes the collision by using consistent depth, and re-tests.

### Exit Conditions
The new translations render correctly in the UI across all supported languages.

## Workflow

### Trigger
A developer needs to display a new string in the UI that must be translated across supported languages.

### Preconditions
The localization system is set up with at least one language provider and translation dictionaries.

### Steps
The developer adds a new key-value pair following dot-notation conventions, adds it to each language dictionary, and uses the key in the component code.

### Outcomes
The string renders in the user's active language.

### Exceptions
A key is added to only some languages — missing languages show no text at runtime.

### Completion Criteria
The new translation key exists in all language dictionaries and renders the correct text in the UI.

## See Also

- [Glossary](../concepts/glossary.md) — concept-to-feature ownership map
- [Authorization Model](../concepts/authorization.md) — cross-cutting permission rules
- [Localization System](./README.md) — the runtime system that consumes these dictionaries

## Future Enhancements

- Automated key-coverage reporting in CI to flag missing translations
- Namespace-based file splitting with lazy loading per route or feature
- Parameterized keys with runtime variable interpolation
- Shared translation key library consumable by mobile apps or backend

## Open Questions

- Should keys follow a strict hierarchical namespace or remain flat with prefixes?
- Is a codemod needed to migrate from hardcoded strings to translation key usage?
