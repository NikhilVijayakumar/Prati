# Prati — AI-Native Documentation Index

## Navigation Guide

**Task-based quick reference:**
- **Add/modify UI component** → `src/common/components/{atoms,molecules,organisms,templates}/`
- **Theme / styling** → `src/theme/tokens/`, `src/common/theme/`
- **Design tokens** → `src/theme/tokens/colors.ts`, `spacing.ts`, `typography.ts`
- **Localization hook/context** → `src/common/localization/LanguageContext.ts`
- **Language selector UI** → `src/common/localization/LanguageComponent.tsx`
- **Build / config** → `vite.config.ts`, `package.json`

**Debug & Fix:**
- **Fix UI style** → `src/theme/tokens/`, `src/common/theme/`
- **Fix component** → `src/common/components/{tier}/{ComponentName}.tsx`
- **Fix localization hook** → `src/common/localization/LanguageContext.ts`

**Docs:**
- **Component catalog** → `docs/raw/feature/components/`
- **Design system rules** → `docs/raw/design-system/rules/`
- **Theming** → `docs/raw/feature/theming/`
- **Atomic design** → `docs/raw/feature/components/atomic-design/`

## Global Constants

| Key | Value |
|-----|-------|
| Name | prati |
| Version | 0.1.0 |
| Type | React Design System + Component Library |
| Build | Vite (ESM + UMD) |
| Used By | astra (re-exports prati) |

## High-Level Vision

Prati is the UI layer of the Astra ecosystem. It owns 47 React components organized by Atomic Design, Material UI 7 theming with BAVANS design tokens, and localization infrastructure (`LanguageContext`, `useLanguage`, `LanguageSelector`). The architecture layer ([Astra](https://github.com/NikhilVijayakumar/astra)) depends on Prati and provides state management, API patterns, and `LanguageProvider`.

## Dependency Stack

| Library | Version | Role |
|---------|---------|------|
| @mui/material | 7.2.0 | Component foundation (peer) |
| @emotion/react | 11.13.3 | CSS-in-JS (peer) |
| @emotion/styled | 11.13.0 | CSS-in-JS (peer) |
| framer-motion | 11.18.2 | Animation |
| lucide-react | 0.400.0 | Icons |
| react-markdown | 10.1.0 | Markdown rendering |
| react-syntax-highlighter | 16.1.1 | Code highlighting |
| uuid | 14.0.0 | IDs |

## System Map

```
src/
├── lib.ts                          ← entry: exports components + theme + localization
├── common/
│   ├── components/
│   │   ├── atoms/                  ← 5 primitives (StatusDot, SeverityBadge, Loading/Error/EmptyState)
│   │   ├── molecules/              ← 6 composed units (Card, Notification, TrendMetricCard, viewers)
│   │   ├── organisms/              ← 32 complex sections (DataTable, FileTree, DrawerComponent, ...)
│   │   ├── templates/              ← 3 page layouts (PageHeader, SummaryPanel, HeroSection)
│   │   └── index.ts
│   ├── localization/
│   │   ├── LanguageContext.ts      ← context definition + useLanguage hook
│   │   ├── LanguageComponent.tsx   ← LanguageSelector UI (MUI dropdown)
│   │   └── index.ts
│   └── theme/
│       ├── ThemeProvider.tsx       ← MUI ThemeProvider wrapper
│       ├── ThemeToggle.tsx         ← light/dark toggle button
│       ├── themeContext.ts         ← ThemeContext + useTheme hook
│       ├── themeData.ts            ← ThemeProviderProps type
│       └── index.ts
└── theme/
    ├── appTheme.ts                 ← lightTheme, darkTheme, createAstraTheme
    ├── tokens/
    │   ├── colors.ts               ← BAVANS color palette
    │   ├── spacing.ts              ← 4px base spacing scale
    │   └── typography.ts           ← Inter + IBM Plex Mono type system
    └── index.ts
```

## Feature Details

### Design Tokens (src/theme/tokens/)
- **Colors:** Soft indigo primary (`#5A60F5`), Linear-style dark BG (`#0e1015`), semantic status
- **Spacing:** Base 4px — `spacing.xs=1`, `spacing.md=2`, `spacing.lg=3` etc. (MUI 8px multiplier)
- **Typography:** 8 standard + 8 custom variants (`monoBody`, `monoCaption`, `body2Medium`, `splashTitle`, `micro`, ...)

### Theming (src/common/theme/, src/theme/)
- **Key:** `ThemeProvider`, `ThemeToggle`, `useTheme`, `lightTheme`, `darkTheme`, `createAstraTheme`
- **Usage:** Wrap app with `<ThemeProvider lightTheme={...} darkTheme={...}>`
- **Custom themes:** Use `createAstraTheme(lightOverrides, darkOverrides)` to merge with BAVANS tokens

### Localization (src/common/localization/)
- **Key:** `LanguageContext`, `useLanguage()`, `LanguageSelector`
- **Usage:** `useLanguage()` → `{ literal, currentLanguage, setCurrentLanguage, availableLanguages }`
- **Provider:** Supplied by Astra's `LanguageProvider` — Prati owns context + consumer side only

### Component Library (src/common/components/)
- **Atoms (5):** `StatusDot`, `SeverityBadge`, `LoadingState`, `ErrorState`, `EmptyState`
- **Molecules (6):** `Card`, `Notification`, `TrendMetricCard`, `ImageViewer`, `JsonViewer`, `MdViewer`
- **Organisms (32):** `DataTable`, `FileTree`, `TerminalViewer`, `DrawerComponent`, `ToolbarComponent`, `FormLayout`, and 26 more
- **Templates (3):** `PageHeader`, `SummaryPanel`, `HeroSection`

## Concept Mapping

| Concept | Implementation | Location |
|---------|---------------|----------|
| Design tokens | `colors`, `spacing`, `typography` | `src/theme/tokens/` |
| MUI theme | `lightTheme`, `darkTheme` | `src/theme/appTheme.ts` |
| Theme toggle | `ThemeProvider`, `useTheme` | `src/common/theme/` |
| i18n context | `LanguageContext`, `useLanguage` | `src/common/localization/LanguageContext.ts` |
| i18n UI | `LanguageSelector` | `src/common/localization/LanguageComponent.tsx` |
| Atomic atoms | `StatusDot`, states | `src/common/components/atoms/` |

## Critical Flows

### Theme Flow
```
<ThemeProvider lightTheme darkTheme> → ThemeContext → useTheme() → MUI theme applied → components styled
```

### Localization Consumer Flow
```
(Astra's LanguageProvider wraps app) → LanguageContext populated → useLanguage() → literal['key'] → UI text
```

### Component Creation
```
Define props → Create {Component}.tsx → export from {tier}/index.ts → Add doc to docs/raw/feature/components/
```

### Build Flow
```
npm run build → Vite + vite-plugin-dts → dist/prati.es.js (externalizes react, @mui/*, @emotion/*)
```

## Documentation Manifest

### Design System
- `docs/raw/design-system/design.md`
- `docs/raw/design-system/rules/Core Design Rules.md`
- `docs/raw/design-system/rules/Brand Guideline.md`
- `docs/raw/design-system/rules/Design Quality Checklist.md`
- `docs/raw/design-system/rules/Premium UI Patterns.md`
- `docs/raw/design-system/rules/theme.md`
- `docs/raw/design-system/rules/atomic-rules.md`
- `docs/raw/design-system/brand/` — BAVANS brand identity

### Components
- `docs/raw/feature/components/atomic-design/` — tier definitions
- `docs/raw/feature/components/atoms/` — per-atom docs
- `docs/raw/feature/components/molecules/` — per-molecule docs
- `docs/raw/feature/components/organisms/` — per-organism docs
- `docs/raw/feature/components/templates/` — per-template docs
- `docs/raw/feature-technical/components/` — implementation detail per component
- `docs/raw/feature-design/components/` — design spec per component

### Theming
- `docs/raw/feature/theming/README.md`
- `docs/raw/feature/theming/tokens.md`
- `docs/raw/feature/theming/ThemeToggle.md`
- `docs/raw/feature-technical/theming/`
- `docs/raw/architecture/core/theming.md`
- `docs/raw/architecture/invariants/theme-sovereignty.md`

### Architecture
- `docs/raw/architecture/core/component-tiers.md`
- `docs/raw/architecture/invariants/atomic-hierarchy.md`
- `docs/raw/architecture/invariants/stateless-ui.md`
- `docs/raw/architecture/runtime-maps/component-lifecycle.md`
- `docs/raw/architecture/runtime-maps/component-tiers.md`
- `docs/raw/architecture/runtime-maps/provider-hierarchy.md`

## Rules

- All components consume theme tokens — never hardcode colors or spacing values
- All components stateless — data via props only
- Use `useLanguage()` — never hardcode UI strings in components
- Follow Atomic Design methodology — atoms have no internal dependencies on other components
- `LanguageSelector` and `useLanguage` require a `LanguageProvider` ancestor (provided by Astra or consumer)

## API Surface

See: `src/lib.ts`

## Maintenance

- Version: 0.1.0
- Consumed by: astra (`file:../Prati` locally)
