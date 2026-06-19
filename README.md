# Prati

A **React design system and component library** providing 46 UI components organized by Atomic Design, Material UI 7 theming with design tokens, localization infrastructure, an interactive prototype runtime, and a Handlebars template renderer.

Prati is a standalone UI library — it pairs with [Astra](https://github.com/NikhilVijayakumar/astra) for MVVM architecture and state management, but works independently as a design system.

> **For full documentation and AI context, see [docs/raw/](docs/raw/)** — component catalog, design system rules, theming, and atomic design methodology.

## What Prati Is Not

- Not a routing library — use React Router or your framework's router
- Not a state management solution — use Astra, Redux, or Zustand
- Not a backend service — Prati is purely a UI layer
- Not an application framework — Prati provides components, not application structure

## Features

- **46 UI Components**: Atoms → Molecules → Organisms → Templates organized by Atomic Design
- **Theming**: MUI 7 `ThemeProvider` with built-in light/dark token sets, `createAstraTheme` for brand overrides, persistent theme preference, and `ThemeToggle` component
- **Design Tokens**: Color palette, 8px base spacing scale (`spacing.xs`=8px, `spacing.md`=16px), and typography system
- **Localization**: `LanguageProvider`, `useLanguage` hook, and `LanguageSelector` UI — runtime language switching with dictionary-based translations, no page reload required
- **Proto Runtime**: Interactive prototype generation — navigation, mock data, local persistence, and workflow simulation for stakeholder review without a backend
- **Template Renderer**: Handlebars-based HTML generator for email and notification content — `otp-email`, `alert`, `task-summary`, and `base-layout` templates bundled at build time
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

### Provider Hierarchy

Prati requires two providers at the application root. **Nesting order is fixed:**

```tsx
<ThemeProvider ...>          {/* outermost — always first */}
  <LanguageProvider ...>    {/* inside ThemeProvider — always second */}
    <YourApp />
  </LanguageProvider>
</ThemeProvider>
```

Consumer providers (Auth, Router) go inside both Prati providers.

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

Use `createAstraTheme` to merge your brand overrides with the default tokens:

```tsx
import { ThemeProvider, createAstraTheme } from "prati";

// createAstraTheme accepts light and dark override objects
const { lightTheme, darkTheme } = createAstraTheme(
  { palette: { primary: { main: "#FF5722" } } },
  { palette: { primary: { main: "#FF7043" } } }
);
```

Add `ThemeToggle` to let users switch between light and dark mode:

```tsx
import { useTheme, ThemeToggle } from "prati";

function AppHeader() {
  const themeContext = useTheme();
  return <ThemeToggle themeContext={themeContext} />;
}
```

### 2. Localization

Prati exports `LanguageProvider` — pass your translation dictionaries directly:

```tsx
import { LanguageProvider, useLanguage, LanguageSelector } from "prati";

const translations = {
  en: { "app.title": "My App", "ui.save": "Save" },
  es: { "app.title": "Mi App", "ui.save": "Guardar" },
};

function App() {
  return (
    <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
      <LanguageProvider
        translations={translations}
        availableLanguages={[
          { code: "en", label: "English" },
          { code: "es", label: "Español" },
        ]}
        defaultLanguage="en"
      >
        <YourApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}

// In any component — access translations via useLanguage
function MyComponent() {
  const { literal } = useLanguage();
  return <h1>{literal["app.title"]}</h1>;
}
```

Translation keys use **flat dot-notation** (`"app.title"`, `"ui.save"`) — not nested objects.

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

// spacing base unit: 8px (MUI standard)
// spacing.xs = 1   → 8px
// spacing.md = 2   → 16px
// spacing.internal = 0.5 → 4px (sub-unit)
// colors.primary = '#5A60F5'
// colors.background.dark = '#0e1015'
```

### 5. Template Renderer

```tsx
import { createTemplateRenderer, bundledTemplates } from "prati";

const renderer = createTemplateRenderer({ templates: bundledTemplates });
const result = await renderer.render({
  templateName: "otp-email",
  data: { name: "Alice", code: "123456", title: "Your OTP" },
});
// result.success: true, result.html: rendered HTML string
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

Prati enforces the BAVANS design language (Brand-Aligned Visual and Navigation System) — a curated set of color, spacing, and typography rules:

- **Colors**: Soft indigo primary (`#5A60F5`), Linear-style dark backgrounds (`#0e1015`), semantic status colors
- **Spacing**: 8px base unit — use `spacing.*` tokens, never hardcode px values
- **Typography**: Inter (sans) + IBM Plex Mono — 8 custom MUI variants including `monoBody`, `splashTitle`, `micro`
- **Rules**: Never hardcode colors. All components consume theme tokens. Always localize strings.

See `docs/raw/design-system/rules/` for full design rules and checklist.

## Proto Runtime

Proto Runtime enables interactive application prototyping using Prati's design system — without a backend:

- **Navigation**: Route and workflow navigation between screens
- **Mock Data**: Realistic prototype data without API services
- **Persistence**: Local session persistence between page reloads
- **Workflow Simulation**: CRUD flows, wizard flows, approval flows

```
Prati
├── Components      — UI primitives (this repo)
├── Theming         — Light/dark mode + tokens
├── Localization    — Runtime i18n
├── Proto Runtime   — Interactive prototype generation
└── Templates       — Handlebars HTML rendering
```

## Used With Astra

Prati components and hooks are consumed directly from `"prati"`. [Astra](https://github.com/NikhilVijayakumar/astra) provides the MVVM architecture layer:

```tsx
import { AppStateHandler, useDataState } from "prati";
import { DataTable } from "prati";
```

See [Astra](https://github.com/NikhilVijayakumar/astra) for ViewModel, repository, and API layer integration.

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
    components/     # atoms, molecules, organisms, templates (46 components)
    localization/   # LanguageProvider, LanguageContext, useLanguage, LanguageSelector
    theme/          # ThemeProvider, ThemeToggle
  proto-runtime/    # Interactive prototype generator (navigation, persistence, mock data, workflows)
  services/         # Handlebars template renderer service
  templates/        # Handlebars templates (alert, otp-email, task-summary, base-layout)
  theme/            # Design tokens (colors, spacing, typography) + appTheme + createAstraTheme
  types/            # Shared TypeScript interfaces and types
  lib.ts            # Public entry point — all exports
```

## Documentation

- `docs/raw/design-system/` — Brand guidelines, BAVANS design language, design rules
- `docs/raw/feature/components/` — Component catalog by Atomic Design tier
- `docs/raw/feature/theming/` — ThemeProvider, ThemeToggle, tokens
- `docs/raw/feature/localization/` — LanguageProvider, translation patterns
- `docs/raw/feature/proto-runtime/` — Proto Runtime overview and subsystem docs
- `docs/raw/feature/templates/` — Template renderer and Handlebars template docs
- `docs/raw/architecture/invariants/` — Atomic hierarchy rules, theme sovereignty, MVVM invariants
- `docs/raw/architecture/integration-contracts/` — Getting started, state management, feature structure
