# DrawerComponent

A responsive side navigation drawer that adapts between mobile overlay and desktop sidebar.

## Overview

Renders a side navigation menu that adapts to screen size: temporary overlay drawer on small screens, permanent sidebar on larger screens. Menu items are filtered by matching feature names against a provided feature list map, enabling feature-flag-driven navigation. The parent controls the open/close state via callbacks.

## Responsibilities

- Render a responsive side navigation drawer (temporary on small screens, permanent on larger screens)
- Filter menu items by matching feature names against a provided feature list
- Call a click handler with the item index on menu item click
- Keep mobile drawer content mounted when closed

## Non-Responsibilities

- Does not manage navigation, routing, or page transitions
- Does not authenticate users or control access to menu items
- Does not manage mobile menu open/close state — receives state and toggle handler as inputs
- Does not handle deep linking or active state highlighting
- Does not fetch feature data — receives features as input

## Core Concepts

- **Responsive breakpoint pattern:** Renders a temporary drawer (overlay with backdrop) on small screens and a permanent drawer (always visible, no overlay) on larger screens — a single component adapts its navigation paradigm to viewport size.
- **Feature-based filtering:** Menu items are filtered by matching names against a feature list — items without a matching entry are silently excluded, enabling feature-flag-driven navigation without conditional logic.
- **Controlled component pattern:** Open/close state is owned by the parent — the drawer has no internal open/close state, keeping the toggle decision in the parent's responsive logic.
- **Content keep-mounted on mobile:** Drawer content stays in the DOM when closed, preserving scroll position and avoiding remount animations on toggle.

## States

- **Open (mobile)** — Temporary drawer visible on small screens; overlay active
- **Closed (mobile)** — Drawer hidden; content remains mounted
- **Open (desktop)** — Permanent drawer visible on larger screens; no overlay
- **Empty** — All features filtered out or empty feature list; renders empty list
- **Filtered** — Some features excluded due to missing feature list entries; only matching items render

## Edge Cases

- All features filtered out: Renders empty list with no items
- Empty feature list: Returns empty list with no children
- Missing feature name in feature list: The feature's menu item is filtered out silently
- Very long feature names: Truncated with ellipsis
- Drawer width is fixed and does not resize with viewport

## Error Conditions

- Empty feature list — Guard clause returns empty list
- No matching features — All items filtered out; renders empty list

## Authorization

**Visibility:** Authenticated — the navigation drawer is rendered for authenticated users navigating the application.

## User Journey

### Entry Conditions
A user opens the application on a mobile device or small screen and wants to access the navigation menu.

### Primary Flow
The user taps the menu icon — a temporary overlay drawer slides in from the side with filtered navigation items; tapping a menu item navigates or triggers an action.

### Alternate Flows
On a desktop screen — the drawer appears as a permanent sidebar without an overlay, always visible alongside the main content.

### Failure Flows
All features are filtered out by the feature list — the drawer renders with an empty list, offering no navigation options.

### Recovery Flows
The developer ensures the feature list includes all valid navigation items.

### Exit Conditions
The user selects a menu item and is navigated to the corresponding page or section.

## Workflow

### Trigger
The parent component renders this drawer with menu items, a feature list, and open/close state.

### Preconditions
Menu items and a feature list are provided; the parent controls visibility state.

### Steps
The component filters items by matching feature names, renders the filtered list in a temporary overlay (mobile) or permanent sidebar (desktop), and fires click handlers on item selection.

### Outcomes
The user sees available navigation options and can navigate by tapping an item.

### Exceptions
The feature list is empty — all items are filtered out and the drawer shows an empty list.

### Completion Criteria
The drawer renders with filtered navigation items and responds to selection.

### State Transitions

| From State | To State | Trigger |
| ---------- | -------- | ------- |
| Closed (mobile) | Open (mobile) | User taps the menu icon in the toolbar |
| Open (mobile) | Closed (mobile) | User taps the overlay or selects a navigation item |
| Any state | Open (desktop) | Screen width crosses the desktop breakpoint |
| Any state | Filtered | Feature-flag configuration changes; some items excluded |
| Filtered | Empty | All items are excluded by feature flags |
| Empty | Filtered | Feature flag restored; at least one item re-included |

## See Also

- [Glossary](../../concepts/glossary.md) — concept-to-feature ownership map
- [Authorization Model](../../concepts/authorization.md) — cross-cutting permission rules
- [ToolbarComponent](./ToolbarComponent.md) — sibling that fires the open/close toggle callback
