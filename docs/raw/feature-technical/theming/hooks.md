# Overview

`useTheme` is a React hook that consumes `ThemeContext` to provide typed access to the current theme state (`darkMode` boolean) and a toggle function (`toggleDarkMode`). It must be called within a `ThemeProvider` subtree. If called outside the provider, it throws a descriptive error.

---

# Feature Summary

| Attribute | Value |
|-----------|-------|
| **Module** | Theming — useTheme Hook |
| **Status** | Implemented |
| **Primary Concern** | Provide typed, safe access to theme context in any component |
| **Consumers** | Any component that needs to read `darkMode` or call `toggleDarkMode` |
| **Localization** | None — no user-facing strings |

---

# Implementation Reference

## Status

Implemented — hook is defined in `themeContext.ts` alongside the context itself.

## Source Files

| File | Purpose |
|------|---------|
| `src/common/theme/themeContext.ts` | `ThemeContext` creation and `useTheme` hook export |
| `src/common/theme/themeData.ts` | `ThemeContextValue` type definition |
| `src/common/theme/ThemeProvider.tsx` | Provider that initializes the context value |

## Public API

Exported from `src/common/theme/index.ts` → `src/common/index.ts` → `src/lib.ts`:

| Export | Kind | Description |
|--------|------|-------------|
| `useTheme` | Hook function | Returns `ThemeContextValue` |
| `ThemeContext` | `React.Context<ThemeContextValue>` | Raw context (for custom consumers) |
| `ThemeContextValue` | Type | `{ darkMode: boolean; toggleDarkMode: () => void }` |

### Import Contract

```tsx
import { useTheme, ThemeContext, ThemeContextValue } from 'astra';
```

### Return Value

```ts
type ThemeContextValue = {
  darkMode: boolean;        // true when dark mode is active
  toggleDarkMode: () => void;  // call to toggle between light/dark
};
```

### Hook Signature

```ts
function useTheme(): ThemeContextValue;
// No parameters
```

---

# Architecture Mapping

| Pattern | Feature Usage | Reason |
|---------|---------------|--------|
| Stateless UI | ✅ Full | Hook is read-only accessor; never mutates state directly |
| Theme Sovereignty | ✅ Full | Provides typed access to theme state managed by ThemeProvider |
| Public API Stability | ✅ Full | Exported through canonical barrel files; stable return type |
| Dependency Safety | ✅ Full | Only depends on React's `createContext` and `useContext` |
| MVVM | N/A | Infrastructure hook — not a feature ViewModel |

---

# Technical Structure

## Source Implementation

```ts
// themeContext.ts
export const ThemeContext = createContext<ThemeContextValue>(
  {} as ThemeContextValue   // Cast — real value provided by ThemeProvider
);

export function useTheme() {
  return useContext(ThemeContext);
}
```

Note: There is no null/undefined guard — when `ThemeContext` is used outside a provider, the cast `{} as ThemeContextValue` results in a runtime error when accessing `darkMode` or `toggleDarkMode`. The feature spec describes a throw guard, but the current implementation relies on the natural runtime error.

## Data Flow

```
ThemeProvider (sets context value)
       │
       ▼
ThemeContext.Provider value={{ darkMode, toggleDarkMode }}
       │
       ▼
useTheme() ← useContext(ThemeContext)
       │
       ▼
Returns { darkMode, toggleDarkMode } to calling component
```

## Consumers

| Consumer | File | Usage of useTheme |
|----------|------|-------------------|
| Any consumer component | — | `const { darkMode, toggleDarkMode } = useTheme()` |
| ThemeToggle | `src/common/theme/ThemeToggle.tsx` | Receives via prop instead (prop drilling pattern) |

---

# Error Handling

| Condition | Behavior | Severity |
|-----------|----------|----------|
| Called outside `ThemeProvider` | `ThemeContext` defaults to `{}`; accessing `darkMode` → `undefined`; calling `toggleDarkMode` → throws | Runtime error — no explicit guard |
| Stale closure of `toggleDarkMode` | Stable across renders — `useState` setter from provider is stable | No risk |
| Concurrent calls during provider re-render | Context value is updated atomically | No risk |

---

# Non-Functional Requirements

| Requirement | Target | Enforcement |
|-------------|--------|-------------|
| Type safety | Return value typed `ThemeContextValue` | TypeScript |
| Stability | `toggleDarkMode` reference is stable | `useState` setter stability |
| Performance | No selector/memo — entire context consumed | Consumer must memoize if needed |
| Bundle size | ~10 lines of code | Negligible |

---

# Architecture Compliance Review

## Applied Patterns

| Invariant | Compliance | Evidence |
|-----------|------------|----------|
| Theme Sovereignty | ✅ Full | Hook provides typed access to theme state |
| Stateless UI | ✅ Full | Hook is a read-only accessor; writes go through `toggleDarkMode` |
| Public API Stability | ✅ Full | Exported through canonical barrel files |
| Dependency Safety | ✅ Full | Only `react` peer dependency |

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| No explicit error guard for missing provider | Silent `undefined` instead of descriptive throw | Gap — consider adding `if (!context.darkMode) throw Error(...)` |
| Entire context consumed (no selector) | Re-renders on every context change even if consumer only needs `darkMode` | Consumer should memoize or split context |

## Gaps

- Missing explicit error guard: `useTheme` should throw `"useTheme must be used within a ThemeProvider"` when context is undefined/default
- No memoized selector support for partial context consumption
- No `useThemeValue(path)` utility for individual token access

---

# Module Map

```
themeData.ts (ThemeContextValue type)
       │
       ▼
themeContext.ts (createContext, useTheme)
       │
       ├──→ ThemeProvider.tsx (provides value)
       │
       └──→ src/common/theme/index.ts → src/common/index.ts → src/lib.ts
```

**Dependencies:**
- Internal: `themeData.ts` (ThemeContextValue)
- External: `react` (createContext, useContext)

---

# Final Rule

`useTheme` must remain a thin typed wrapper over `useContext(ThemeContext)`. It must never manage state, persist data, or contain business logic. The context value must always be provided by `ThemeProvider`. Consider adding an explicit guard that throws a descriptive error when the hook is called outside a provider subtree.

## Authorization

**Visibility:** Public — stateless Astra library primitive. No authentication or role requirement enforced by Astra. Authorization enforcement is consumer-managed at the application layer.
