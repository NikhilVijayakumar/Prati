# HTML Components

## Overview

HTML Components provide the visual foundation for Proto Runtime applications.

They enable prototype applications to use Prati Design System principles without requiring React, Electron, or application frameworks.

HTML Components allow prototypes to simulate realistic application behavior while remaining lightweight and framework independent.

---

# Purpose

HTML Components exist to provide reusable user interface building blocks for prototype applications.

The goal is to ensure that prototypes follow the same design language, accessibility requirements, localization requirements, and theme rules used throughout Prati.

---

# Responsibilities

HTML Components provide:

* User Interface Rendering
* Design Token Consumption
* Theme Integration
* Localization Integration
* Responsive Behavior
* Accessibility Support
* Interaction Support

HTML Components do not provide:

* Business Logic
* Domain Logic
* API Integration
* Application Architecture
* Backend Connectivity

---

# Design System Alignment

HTML Components follow the same design principles as Prati Components.

This includes:

* Atomic Design
* Design Tokens
* Theme Rules
* Localization Rules
* Accessibility Rules
* Responsive Rules

The objective is visual and behavioral consistency across prototype applications.

---

# Framework Independence

HTML Components are framework independent.

They must not require:

* React
* Electron
* Vue
* Angular
* Backend Frameworks

Prototype applications should remain portable and lightweight.

---

# Relationship to Prati Components

Proto Runtime does not duplicate Prati Components.

Instead, HTML Components represent prototype-oriented implementations of the same design concepts.

Example:

```text
Prati Design System

       │

       ├── React Components

       └── HTML Components
```

Both implementations follow the same design principles while serving different purposes.

---

# Component Categories

HTML Components support the same conceptual hierarchy used throughout Prati.

```text
Atoms

Molecules

Organisms

Templates
```

This ensures consistency between prototypes and production user interfaces.

---

# Theme Integration

HTML Components participate in the Prati Theme System.

Components automatically consume:

* Colors
* Typography
* Spacing
* Elevation
* Motion
* Radius

through design tokens.

Theme behavior is defined by the Theming feature.

---

# Localization Integration

HTML Components participate in the Prati Localization System.

All user-facing text should support localization.

Components must never assume a single language.

Localization behavior is defined by the Localization feature.

---

# Accessibility Integration

Accessibility is a mandatory requirement.

HTML Components must support:

* Keyboard Navigation
* Screen Readers
* Focus Management
* Semantic Markup
* Accessible Labels

Accessibility behavior is defined by Prati accessibility rules.

---

# Responsive Integration

HTML Components participate in responsive layouts.

Components should adapt appropriately across:

* Mobile
* Tablet
* Desktop
* HD
* 2K
* 4K

Responsive behavior is defined by Prati responsive standards.

---

# Supported Use Cases

HTML Components are intended for:

* Dashboard Prototypes
* Administrative Applications
* Workflow Applications
* Form-Based Applications
* Internal Tools
* Feature Demonstrations
* Interactive Mockups

---

# Benefits

HTML Components provide:

* Design Consistency
* Framework Independence
* Theme Compatibility
* Localization Compatibility
* Accessibility Compliance
* Rapid Prototyping
* Reusability

These benefits allow teams to build realistic prototypes without introducing production dependencies.

---

# Relationship to Templates

Templates provide page-level composition.

HTML Components provide reusable building blocks within those templates.

```text
Template

    ↓

Organisms

    ↓

Molecules

    ↓

Atoms
```

This hierarchy remains consistent with Prati Design System principles.

---

# Non-Goals

HTML Components are not intended to provide:

* Production Application Frameworks
* Business Logic
* State Management Frameworks
* Backend Integration
* Domain Services
* Application Architecture

These concerns belong to application implementation rather than prototyping.

---

# Success Criteria

HTML Components are considered successful when:

* Prototype interfaces are visually consistent.
* Components follow Prati Design System rules.
* Localization functions correctly.
* Themes function correctly.
* Accessibility requirements are met.
* Responsive behavior is maintained.
* Prototypes remain framework independent.

The result should be realistic prototype interfaces that align with the broader Prati ecosystem while remaining lightweight and easy to use.
