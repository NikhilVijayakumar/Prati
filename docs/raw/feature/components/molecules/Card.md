# Card

A styled container that groups related content with an optional header section.

## Overview

A versatile card component that wraps content in a bordered surface. Supports a header with title, supporting text, and an action slot. The card body accepts any content as children. All header sections are optional and render independently.

## Responsibilities

- Render a styled container surface for grouping content
- Display an optional header with title, supporting text, and action slot
- Render children as the card body content

## Non-Responsibilities

- Does not manage or persist state
- Does not fetch or load data
- Does not handle click events or user interactions beyond the action slot
- Does not enforce layout constraints
- Does not provide scroll or overflow behavior

## Core Concepts

- **Slot-based composition:** The card exposes named slots (title, supporting text, action, children) — each section renders independently and can be omitted without affecting others.
- **Border-based premium styling:** Uses a subtle border rather than shadow for the surface treatment.
- **Optional header pattern:** The header row only renders when at least one header prop is provided — empty props produce no header.
- **Flex column layout:** Card body stacks vertically with consistent spacing; child components control their own sizing.

## States

- **Full** — Title, supporting text, action, and children all present
- **Empty** — No header props and no children; renders as empty surface with padding and border
- **No header** — Only children rendered without title or action sections

### State Transitions

| From State | To State | Trigger |
| ---------- | -------- | ------- |
| Full | No header | All header props are removed; only children remain |
| Full | Empty | All props removed; renders empty bordered surface |
| No header | Full | Header props (title, action, supporting text) provided |
| No header | Empty | Children removed; no header props present |
| Empty | No header | Children provided with no header props |
| Empty | Full | Children and header props both provided |

## Edge Cases

- All header props omitted: Header row not rendered; only children displayed
- All props omitted: Renders empty container with padding and border
- Action slot overflow: Action content may overflow on narrow card widths
- Long supporting text: Text wraps naturally within the card width

## Error Conditions

- **Action overflow** — Action slot content may overflow on narrow cards where the available width is insufficient for the action element
- **Null or undefined children** — Card renders the bordered surface with no body content; header sections remain unaffected
- **All props omitted** — Card renders as an empty bordered container; no visible content is displayed to the user

## Authorization

**Visibility:** Authenticated — used as a layout container within authenticated application views.

## User Journey

### Entry Conditions
A developer needs a styled container to group related content with an optional header.

### Primary Flow
The developer provides title, supporting text, optional action slot, and children — the card renders as a bordered container with the header and body.

### Alternate Flows
No header props are given — only the children render inside the bordered container.

### Failure Flows
The action slot content overflows on a narrow card — the user cannot interact with the action properly.

### Recovery Flows
The developer adjusts the action content or the card width to prevent overflow.

### Exit Conditions
The user views the grouped content inside the card and interacts with action elements as needed.

## Workflow

### Trigger
A developer renders this card with optional header props and children.

### Preconditions
The card is placed within a layout context that provides width.

### Steps
The component renders the header row (if any props provided) and the body children inside a bordered surface.

### Outcomes
Related content is visually grouped and displayed with consistent styling.

### Exceptions
Action content overflows on narrow cards.

### Completion Criteria
The card renders with its header and body content in a styled container.

## See Also

- [Glossary](../../concepts/glossary.md) — concept-to-feature ownership map
- [Authorization Model](../../concepts/authorization.md) — cross-cutting permission rules
