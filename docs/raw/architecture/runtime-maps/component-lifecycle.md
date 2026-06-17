# Runtime Map: Component Lifecycle

Maps the lifecycle of an Astra component from import to render.

## Import Resolution

```
Consumer Code
     │
     ├── import { Card } from "astra"
     │         │
     │         ▼
     │   src/lib.ts              ← entry point
     │         │
     │         ▼
     │   src/common/components/index.ts  ← barrel
     │         │
     │         ▼
     │   src/common/components/molecules/Card.tsx  ← actual component
     │
     ├── import { spacing } from "astra"
     │         │
     │         ▼
     │   src/theme/index.ts     ← re-exports tokens
     │         │
     │         ▼
     │   src/theme/tokens/spacing.ts  ← token values
```

## Render Pipeline

```
Component Definition
     │
     ├── Props validation (TypeScript compile-time)
     │
     ├── Theme resolution
     │     │
     │     ├── useTheme() → ThemeContext
     │     └── MUI's ThemeProvider wraps all children
     │
     ├── Localization resolution
     │     │
     │     └── useLanguage() → literal['key']
     │
     ├── State management (if data-fetching)
     │     │
     │     └── useDataState() → AppState + execute
     │
     └── Render
           │
           ├── LOADING → LoadingSpinner
           ├── ERROR → ErrorState
           └── COMPLETED → Success content
```

## Aligned Documents

| Document | Role |
|----------|------|
| `invariants/stateless-ui.md` | S-1: Components receive data via props |
| `invariants/theme-sovereignty.md` | T-1: All styling via theme |
| `invariants/localization.md` | L-1: All text via translation keys |
| `invariants/atomic-hierarchy.md` | A-1 through A-4: Tier classification |
| `core/component-tiers.md` | Tier guidance |
| `core/api-surface.md` | Import paths |
