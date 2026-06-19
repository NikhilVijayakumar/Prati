# Persistence

## Overview

Persistence provides the ability for prototype applications to retain data across user interactions and sessions.

Unlike traditional mockups that lose state when refreshed or reopened, Proto Runtime supports realistic data persistence, allowing prototypes to behave more like real applications.

Persistence enables stakeholders to experience workflows that involve creating, updating, and managing data without requiring backend services.

---

# Purpose

Persistence exists to support realistic application behavior during prototype validation.

The goal is to ensure that user actions can produce lasting changes within the prototype environment.

Examples include:

* Creating Records
* Updating Records
* Deleting Records
* Saving User Preferences
* Maintaining Application State

without requiring production databases or APIs.

---

# Responsibilities

Persistence provides:

* Data Retention
* State Retention
* Session Continuity
* Workflow Continuity
* Mock Data Updates

Persistence does not provide:

* Production Databases
* Synchronization
* Distributed Storage
* Data Replication
* Transaction Management
* Backend Integration

---

# Core Principles

## Prototype First

Persistence exists to support prototype validation.

The objective is realistic behavior rather than production-grade storage.

---

## User Experience Focused

Users should experience data behavior that resembles a real application.

Actions performed within the prototype should produce visible and lasting results.

---

## Infrastructure Independent

Persistence must function without:

* Backend Services
* APIs
* Cloud Services
* External Databases

---

## Simple By Default

Persistence should remain simple to configure and consume.

Prototype authors should focus on workflows and demonstrations rather than storage implementation.

---

# Supported Scenarios

## Data Creation

Users can create new records during prototype execution.

Examples:

* Create Task
* Create Project
* Create User
* Create Note

---

## Data Modification

Users can update existing records.

Examples:

* Edit Task
* Update Profile
* Change Status
* Modify Settings

---

## Data Removal

Users can remove records from prototype datasets.

Examples:

* Delete Task
* Remove Project
* Archive Record

---

## Preference Persistence

Applications may store user preferences.

Examples:

* Selected Language
* Theme Preference
* Dashboard Layout
* User Settings

---

## Workflow Persistence

Persistence supports multi-step workflows.

Examples:

* Wizards
* Review Processes
* Approval Flows
* Multi-Screen Forms

Users should be able to continue workflows without losing progress.

---

# Data Sources

Persistence operates on prototype data.

Examples include:

* Mock Data
* Generated Data
* User Entered Data
* Temporary Application Data

Persistence is not intended for production datasets.

---

# Relationship to Mock Data

Persistence extends mock data behavior.

```text id="vlg9m7"
Mock Data

      ↓

User Interaction

      ↓

Persistence

      ↓

Updated Prototype State
```

This allows prototype data to evolve during execution rather than remaining static.

---

# Relationship to Navigation

Persistence works across navigation flows.

Users should be able to:

* Navigate Between Screens
* Return To Previous Screens
* Continue Workflows

without losing relevant information.

---

# Relationship to Localization

Persistence must operate independently of language selection.

Changing language should not modify stored application data.

Localization affects presentation, not persistence.

---

# Relationship to Theming

Persistence must operate independently of themes.

Changing themes should not modify stored application data.

Theming affects presentation, not persistence.

---

# Expected User Experience

Users should perceive persistence as natural application behavior.

Examples:

* Created records remain visible.
* Updated values remain updated.
* Deleted records remain removed.
* Preferences remain selected.
* Workflow progress remains available.

The prototype should feel consistent and reliable throughout a session.

---

# Non-Goals

Persistence is not intended to provide:

* Enterprise Data Storage
* Distributed Systems
* Multi-User Collaboration
* Audit Trails
* Security Controls
* Data Governance
* Synchronization Services

These concerns belong to production implementations.

---

# Success Criteria

Persistence is considered successful when:

* User actions result in lasting changes.
* Data remains available between interactions.
* Workflows retain progress.
* Preferences remain available.
* Application behavior feels realistic.
* No backend services are required.

The result should be a prototype that behaves like a functional application while remaining simple and lightweight.
