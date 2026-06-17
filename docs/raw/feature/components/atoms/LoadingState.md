# LoadingState

A centered loading indicator that shows when content is being fetched or processed.

## Overview

A simple full-width loading indicator consisting of a spinning animation and a localized "Loading..." text message. Centered both horizontally and vertically within its container. Self-contained with no configuration options.

## Responsibilities

- Display a centered animated spinner during loading operations
- Show a localized "Loading..." text message below the spinner
- Fill the full width of its parent container

## Non-Responsibilities

- Does not accept custom messages or content
- Does not handle error, empty, or success transitions
- Does not respond to user interaction
- Does not manage timing or minimum display duration

## Core Concepts

- **Zero-configuration interface:** The component accepts no inputs — it is a fully self-contained visual indicator, enforcing consistent usage across the application.
- **Localization-driven text:** The loading message resolves through the localization system, making it locale-aware without any prop plumbing.
- **Centered layout:** Uses flexbox centering for bidirectional alignment within its parent container.

## States

- **Loading** — Always in loading state by definition; spinner animating, text displayed

## Edge Cases

- Missing localization key: Spinner renders without text content
- Parent layout overrides centering: Component still renders but may not appear centered

## Error Conditions

- Missing localization key — Spinner renders without visible text

## Authorization

**Visibility:** Authenticated — displayed during async operations within authenticated application contexts.

## User Journey

### Entry Conditions
An async operation starts and the parent component replaces content with a loading indicator.

### Primary Flow
The user sees a centered spinner with a "Loading..." text — the UI clearly signals that work is in progress.

### Alternate Flows
The localization key is missing — the spinner appears without text but still signals activity.

### Failure Flows
The operation completes so quickly that the loading state flashes briefly before content replaces it.

### Recovery Flows
No recovery needed — the loading state resolves automatically when the operation completes.

### Exit Conditions
The operation finishes and the parent swaps the loading state for success content or an error display.

## Workflow

### Trigger
An async operation is initiated and the parent component enters loading state.

### Preconditions
The parent component renders this component while the operation is in progress.

### Steps
The component renders a centered spinner and localized loading text.

### Outcomes
The user sees a loading indicator and understands the application is processing.

### Exceptions
The localization key is missing — the spinner renders without text.

### Completion Criteria
The loading indicator is displayed until the operation completes and the parent replaces it.

## See Also

- [Glossary](../../concepts/glossary.md) — concept-to-feature ownership map
- [Authorization Model](../../concepts/authorization.md) — cross-cutting permission rules
- [ErrorState](./ErrorState.md) — sibling atom shown after a loading operation fails
- [EmptyState](./EmptyState.md) — sibling atom shown after a loading operation returns no data
- [State Management](../../state/README.md) — the async state lifecycle that drives this component
