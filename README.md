# Prati

A **React design system and component library** providing 47 UI components organized by Atomic Design, Material UI 7 theming with design tokens, and localization infrastructure.

Prati is the UI layer for the [Astra](https://github.com/NikhilVijayakumar/astra) ecosystem — Astra handles MVVM architecture, state management, and API patterns; Prati handles everything you see.

> **For full documentation and AI context, see [docs/raw/](docs/raw/)** — component catalog, design system rules, theming, and atomic design methodology.

## Features

- **47 UI Components**: Atoms → Molecules → Organisms → Templates organized by Atomic Design
- **Design Tokens**: Consistent color palette, spacing scale (4px base), and typography system
- **Theming**: MUI 7 ThemeProvider with built-in light/dark token sets and `createAstraTheme` for overrides
- **Localization**: `LanguageContext`, `useLanguage` hook, and `LanguageSelector` UI — provider-agnostic (pair with Astra's `LanguageProvider`)
- **Type Safety**: Fully written in TypeScript

## Installation

```json
"dependencies": {
  "prati": "git+https://github.com/NikhilVijayakumar/prati.git"
}
```

Local development:

```json
"dependencies": {
  "prati": "file:../Prati"
}
```

## Peer Dependencies

```json
"peerDependencies": {
  "react": ">=19.0.0",
  "react-dom": ">=19.0.0",
  "@mui/material": ">=7.0.0",
  "@emotion/react": ">=11.0.0",
  "@emotion/styled": ">=11.0.0"
}
```

## Quick Start

### 1. Theming

```tsx
import { ThemeProvider, lightTheme, darkTheme } from "prati";

function App() {
  return (
    <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

Use `createAstraTheme` to merge your overrides with the default tokens:

```tsx
import { ThemeProvider, createAstraTheme } from "prati";

const { lightTheme, darkTheme } = createAstraTheme(
  { palette: { primary: { main: "#FF5722" } } },
  { palette: { primary: { main: "#FF7043" } } }
);
```

### 2. Localization

Prati exports the context and hook. Pair with Astra's `LanguageProvider` (or your own):

```tsx
import { LanguageSelector, useLanguage } from "prati";
// Wrap your app with Astra's LanguageProvider, then use the hook/component anywhere
```

### 3. Components

```tsx
import {
  DataTable,
  Card,
  StatusDot,
  SeverityBadge,
  PageHeader,
  HeroSection,
} from "prati";
```

### 4. Design Tokens

```tsx
import { colors, spacing, typography, fonts } from "prati";

// spacing.md = 2  (16px at base 8px MUI scale)
// colors.primary = '#5A60F5'
// colors.background.dark = '#0e1015'
```

## Component Catalog

**Atoms** — Fundamental UI primitives:
`StatusDot`, `SeverityBadge`, `LoadingState`, `ErrorState`, `EmptyState`

**Molecules** — Composed functional units:
`Card`, `Notification`, `TrendMetricCard`, `ImageViewer`, `JsonViewer`, `MdViewer`

**Organisms** — Complex UI sections (32 components):
`DataTable`, `FileTree`, `TerminalViewer`, `AudioPlayerBar`, `AnimatedHeroCharacter`, `CanvasNote`, `CanvasGroup`, `StatusActionCard`, `VersionHistorySelector`, `MultiPhaseWorkflowDiagram`, `FileViewerRouter`, `CsvViewer`, `EntryLayoutFrame`, `OperationHealthPanel`, `VerticalStepIndicator`, `InteractiveStepNode`, `FeatureSegmentCard`, `PlayableMediaCard`, `IconDescriptionListItem`, `ProfileRevealCard`, `StatusListRow`, `EntityConfidenceRow`, `AlertListItem`, `SummaryListItem`, `DecisionActionCard`, `WeeklyReportCard`, `ReviewDecisionDialog`, `MultiStepProgressIndicator`, `FormLayout`, `DrawerComponent`, `ToolbarComponent`, `TimelineNode`

**Templates** — Page-level layouts:
`PageHeader`, `SummaryPanel`, `HeroSection`

## Design System

Prati enforces the BAVANS design language:

- **Colors**: Soft indigo primary (`#5A60F5`), Linear-style dark backgrounds (`#0e1015`), semantic status colors
- **Spacing**: 4px base unit — use `spacing.*` tokens, never hardcode px values
- **Typography**: Inter (sans) + IBM Plex Mono — 8 custom MUI variants including `monoBody`, `splashTitle`, `micro`
- **Rules**: Never hardcode colors. All components consume theme tokens. Always localize strings.

See `docs/raw/design-system/rules/` for full design rules and checklist.

## Used With Astra

Prati is the UI layer. [Astra](https://github.com/NikhilVijayakumar/astra) provides MVVM state, API layer, and `AppStateHandler` (which orchestrates Prati atoms with Astra state):

```tsx
import { AppStateHandler, useDataState } from "astra";
import { DataTable } from "prati";
```

Astra re-exports everything from Prati, so `import { X } from "astra"` works for consumers of the full stack.

## Development

```bash
npm install
npm run build      # vite build → dist/prati.es.js
npm test           # vitest
npm run coverage   # istanbul coverage
```

## Project Structure

```
src/
  common/
    components/    # atoms, molecules, organisms, templates
    localization/  # LanguageContext, useLanguage, LanguageSelector
    theme/         # ThemeProvider, ThemeToggle
  theme/           # design tokens (colors, spacing, typography) + appTheme
  lib.ts           # public entry point
```

## Documentation

- `docs/raw/design-system/` — Brand guidelines, design rules, BAVANS design language
- `docs/raw/feature/components/` — Component catalog by Atomic Design tier
- `docs/raw/feature/theming/` — ThemeProvider, ThemeToggle, tokens
- `docs/raw/feature-technical/components/` — Technical API per component
- `docs/raw/feature-technical/theming/` — Theming implementation detail
- `docs/raw/architecture/invariants/` — Atomic hierarchy rules, theme sovereignty
