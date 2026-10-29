## ADDED Requirements

### Requirement: Provider composition

The documented application integration SHALL place the theme provider outside the language provider. This corresponds to FR-FE-001 in `docs/requirements/frontend-foundations/requirement.md` and `knowledge/architecture/provider-hierarchy.md`.

#### Scenario: Application composes both providers

- **GIVEN** an application uses both the theme and language providers
- **WHEN** it composes its provider hierarchy
- **THEN** the language provider is nested within the theme provider

### Requirement: Runtime language changes

The language context SHALL expose language selection and propagate the selected language's translations without a page reload. This corresponds to FR-FE-002 in `docs/requirements/frontend-foundations/requirement.md` and `knowledge/concepts/localization.md`.

#### Scenario: Consumer switches language

- **GIVEN** a consumer is inside the language provider with translations for the selected language
- **WHEN** the active language changes
- **THEN** the consumer receives the selected language's translations without a page reload

### Requirement: Prototype mock data boundary

The prototype runtime SHALL support configured prototype workflows with mock data without requiring production backend services. This corresponds to FR-FE-003 in `docs/requirements/frontend-foundations/requirement.md` and `knowledge/concepts/prototype-runtime.md`.

#### Scenario: Configured mock workflow

- **GIVEN** a supported prototype workflow configured with mock data
- **WHEN** the workflow is exercised
- **THEN** it does not require a production backend service
