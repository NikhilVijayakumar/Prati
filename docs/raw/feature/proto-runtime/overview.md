# Proto Runtime

## Overview

Proto Runtime is a Prati feature that enables creation of interactive application prototypes using Prati Design System principles.

Unlike traditional mockup systems that generate static HTML screens, Proto Runtime generates realistic prototypes that support navigation, data persistence, localization, theming, validation states, and user workflows.

Proto Runtime allows teams to validate application behavior before implementation while remaining independent from production infrastructure.

---

# Purpose

Proto Runtime exists to support:

* Interactive Mockups
* Feature Demonstrations
* User Experience Validation
* Workflow Validation
* Stakeholder Reviews
* Design Verification
* Prototype-Based Discussions

The goal is to create realistic application prototypes without requiring backend services or production implementation.

---

# Core Concept

Proto Runtime combines:

```text
Presentation
+
Presentation Logic
+
Mock Persistence
```

to simulate application behavior.

Proto Runtime is not intended to implement:

```text
Business Logic
Backend Services
Authentication
Authorization
Production Persistence
API Integration
Application Architecture
```

---

# Responsibilities

Proto Runtime provides:

* Prototype Boilerplate
* HTML Component Runtime
* Navigation Support
* Mock Data Support
* Data Persistence
* Workflow Simulation
* Validation State Support

Proto Runtime consumes existing Prati capabilities:

* Components
* Templates
* Theming
* Localization

Proto Runtime follows all Prati Design System rules and architecture invariants.

---

# Dependencies

Proto Runtime depends on existing Prati features.

## Components

Proto Runtime uses Prati component definitions and component design principles.

## Templates

Proto Runtime uses Prati templates for page-level composition.

## Theming

Proto Runtime consumes the Prati Theme System.

Theme behavior, token resolution, and theme contracts are defined by the Theming feature.

## Localization

Proto Runtime consumes the Prati Localization System.

Localization support is mandatory.

All user-facing content must support localization and follow Prati localization rules.

---

# What Proto Runtime Provides

## Prototype Boilerplate

Provides a standard project structure for building interactive prototypes.

---

## HTML Component Runtime

Provides HTML implementations of Prati design system components.

These components follow:

* Design Tokens
* Theme Rules
* Localization Rules
* Accessibility Rules
* Responsive Rules

---

## Navigation

Provides navigation capabilities for prototype applications.

Examples:

* Route Navigation
* Screen Navigation
* Workflow Navigation
* Deep Linking

---

## Mock Data

Provides support for prototype data.

Mock data allows prototypes to simulate realistic application behavior without backend services.

---

## Persistence

Provides local persistence for prototype data.

Data remains available between sessions without requiring external services.

---

## Workflow Simulation

Provides support for simulating application workflows.

Examples:

* CRUD Flows
* Wizard Flows
* Review Flows
* Approval Flows

---

# Supported Use Cases

Proto Runtime is intended for:

* Business Applications
* Dashboard Prototypes
* Form-Based Applications
* Administrative Applications
* Workflow Demonstrations
* Internal Tools
* Desktop Application Prototypes
* Web Application Prototypes

---

# Non-Goals

Proto Runtime does not provide:

* API Clients
* Repository Layers
* Domain Services
* Business Rules
* Authentication Providers
* Authorization Systems
* Production Databases
* Synchronization Engines
* Microservice Integration

These concerns belong to application implementation rather than prototyping.

---

# Relationship to Prati

Proto Runtime is a feature of Prati.

```text
Prati

├── Components
├── Templates
├── Theming
├── Localization
└── Proto Runtime
```

Proto Runtime extends Prati's capabilities by enabling creation of interactive prototypes while continuing to use the same design system principles, themes, localization infrastructure, and component standards.

---

# Success Criteria

A prototype is considered successful when:

* Users can navigate the application.
* Workflows can be demonstrated.
* Validation states are visible.
* Themes function correctly.
* Localization functions correctly.
* Data persists between sessions.
* Screens respond correctly across viewports.
* Stakeholders can evaluate the application experience.

without requiring backend services or production infrastructure.
