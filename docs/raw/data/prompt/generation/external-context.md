# External Context Generation System v1.0

## Purpose

You are acting as:

* Repository Analyst
* Documentation Architect
* Context Extraction Specialist
* Governance Analyst
* Knowledge Consolidation Specialist

Your responsibility is to generate:

```text
docs/raw/external-context/{repository}.md
```

for repositories that provide architecture, design systems, runtime capabilities, governance rules, standards, specifications, implementation guidance, or other repository-specific knowledge.

The generated document serves as:

```text
Repository Context Document
```

for AI systems.

The generated document enables AI systems to understand repositories that are not part of their training data.

---

# Scope

## Inputs

### External Repository Path

Provided as a relative path.

```text
../astra
```

### Repository Documentation

Read:

```text
README.md
package.json
docs/raw/**
src/**
```

where available.

---

# Core Principle

The purpose of this document is:

```text
Knowledge Transfer
```

not:

```text
Dependency Management
```

The generated document should answer:

* What is this repository?
* Why does it exist?
* What does it own?
* What does it not own?
* What concepts are important?
* What rules govern usage?
* What should AI systems understand before generating code?

---

# Relative Path Rule

Repositories must be referenced using relative paths.

Examples:

```text
../astra
../prati
../prana
```

Absolute paths are forbidden.

Examples of forbidden paths:

```text
E:\Python\astra
C:\workspace\prati
/home/user/prana
```

The generated context must remain portable across:

* Windows
* Linux
* macOS

---

# Dependency Scope Declaration

The dependency scope defines which aspects of the repository are consumed.

## Scope Types

| Scope | Meaning | Behavior |
|-------|---------|----------|
| **Full** | Consumer depends on all repository aspects | Scan all documentation areas. Extract all concepts, rules, integration points, and AI guidance. |
| **Specific** | Consumer depends on limited, declared aspects | Only scan and extract from documentation areas in the Relevant Areas list. Skip phases for non-relevant areas. |

## Scope Selection

If the dependency is limited to specific concerns (e.g., architecture only, governance only), declare:

```text
Dependency Scope: Specific
Relevant Areas:
  - Architecture
  - Governance
```

If the dependency covers all repository aspects:

```text
Dependency Scope: Full
```

If scope is not declared:

Default to Full.

## Impact on Discovery Phases

When scope is **Specific**:

| Phase | Behavior |
|-------|----------|
| Phase 0 — Repository Discovery | Full scan (identity needed regardless). Documentation scan limited to Relevant Areas. |
| Phase 1 — Responsibility Extraction | Full extraction (responsibilities needed regardless). |
| Phase 2 — Non-Responsibility Extraction | Full extraction. |
| Phase 3 — Ownership Extraction | Limited to Relevant Areas. |
| Phase 4 — Concept Extraction | Only concepts from Relevant Areas. |
| Phase 5 — Rule Extraction | Only rules from Relevant Areas. |
| Phase 6 — Integration Point Extraction | Only integration points relevant to Relevant Areas. |
| Phase 7 — Documentation Extraction | Only documentation from Relevant Areas. |
| Phase 8 — AI Guidance Extraction | Only guidance relevant to Relevant Areas. |

---

# Repository Identity Verification

Before analysis begins determine:

### Repository Name

### Repository Purpose

### Repository Type

Supported Types:

* Application Engineering Platform
* Design System
* Runtime Platform
* Host Platform
* Product Application
* Shared Library
* Infrastructure Platform
* Unknown

Required Matrix:

| Field              | Value |
| ------------------ | ----- |
| Repository Name    |       |
| Repository Purpose |       |
| Repository Type    |       |

If identity cannot be determined:

Record Open Question.

Do not infer purpose from repository name alone.

---

# Discovery Phase 0 — Repository Discovery

## Goal

Understand the repository.

### Step 1

Read:

```text
README.md
```

Extract:

* Purpose
* Scope
* Responsibilities

### Step 2

Read:

```text
package.json
```

Extract:

* name
* description

### Step 3

Scan:

```text
docs/raw/**
```

Identify:

* Architecture Areas
* Design Areas
* Runtime Areas
* Governance Areas
* Feature Areas

### Step 4

Scan:

```text
src/**
```

Understand:

* Major Modules
* Architectural Boundaries
* Public Surface Area

---

# Discovery Phase 1 — Responsibility Extraction

## Goal

Determine repository responsibilities.

Required Matrix:

| Responsibility | Evidence |
| -------------- | -------- |

Examples:

```text
MVVM
Repositories
Hooks
Boilerplate
```

or

```text
Components
Themes
Localization
```

Every responsibility must be supported by evidence.

---

# Discovery Phase 2 — Non-Responsibility Extraction

## Goal

Determine repository boundaries.

Required Matrix:

| Non-Responsibility | Evidence |
| ------------------ | -------- |

Examples:

```text
Does Not Own Components

Does Not Own Localization

Does Not Own Runtime Services
```

The goal is to identify what the repository intentionally does not own.

---

# Discovery Phase 3 — Ownership Extraction

## Goal

Determine ownership.

Read:

```text
governance/ownership-map.md
```

if available.

Then verify using:

```text
Architecture Documentation
Feature Documentation
Repository Structure
```

Required Matrix:

| Concern | Ownership |
| ------- | --------- |

Supported Ownership:

* Owned
* Consumed
* Unknown

Ownership must be evidence-based.

If ownership cannot be verified:

Classify:

```text
Unknown
```

Never guess.

---

# Discovery Phase 4 — Concept Extraction

## Goal

Identify important repository concepts.

Examples:

```text
MVVM
Repository Pattern
ViewModel Pattern
Theme System
Design Tokens
Localization
Prototype Runtime
```

Required Matrix:

| Concept | Description |
| ------- | ----------- |

Concepts should explain how the repository thinks.

---

# Discovery Phase 5 — Rule Extraction

## Goal

Identify repository rules.

Examples:

```text
Dependency Rules

Ownership Rules

Architectural Invariants

Design Rules

Validation Rules

State Rules
```

Required Matrix:

| Rule | Source |
| ---- | ------ |

Rules must be traceable.

---

# Discovery Phase 6 — Integration Point Extraction

## Goal

Identify how other repositories interact with this repository.

Required Matrix:

| Integration Point | Purpose |
| ----------------- | ------- |

Examples:

```text
Repository Consumption

Component Consumption

Runtime Consumption

Design System Consumption
```

---

# Discovery Phase 7 — Documentation Extraction

## Goal

Identify documentation most relevant to consumers.

Required Matrix:

| Documentation Area | Purpose |
| ------------------ | ------- |

Examples:

```text
architecture/core

architecture/invariants

design-system

feature
```

Only include areas relevant to consumers.

---

# Discovery Phase 8 — AI Guidance Extraction

## Goal

Generate guidance for AI systems.

The generated guidance should explain:

### What AI should know first

### Common mistakes

### Important ownership boundaries

### Important repository assumptions

### Areas frequently misunderstood

This section is specifically optimized for:

```text
Feature Generation

Feature Technical Generation

Implementation Generation

Governance Validation
```

---

# Cross Validation

Before generating output validate:

### Repository Identity

### Dependency Scope

### Responsibilities

### Non-Responsibilities

### Ownership

### Concepts

### Rules

### Documentation References

### AI Guidance

If evidence is insufficient:

Record Open Question.

Do not invent information.

---

# Failure Modes

| Scenario                          | Action                |
| --------------------------------- | --------------------- |
| Repository path invalid           | Stop and report       |
| README missing                    | Open Question         |
| package.json missing              | Use directory name    |
| docs/raw missing                  | Partial generation    |
| Ownership unavailable             | Unknown               |
| Responsibilities unclear          | Open Question         |
| Repository type unknown           | Unknown               |
| Dependency scope not declared     | Default to Full       |
| Scope is Specific but Relevant Areas empty | Open Question  |
| Requested Relevant Area not found in repo docs | Open Question |

---

# Traceability Rule

Every claim must have evidence.

Required Matrix:

| Claim | Evidence |
| ----- | -------- |

Examples:

| Claim                 | Evidence         |
| --------------------- | ---------------- |
| Astra owns MVVM       | ownership-map.md |
| Prati owns Components | ownership-map.md |

Nothing may be asserted without evidence.

---

# Required Document Structure

# Overview

# Repository Summary

# Repository Identity

# Dependency Scope

# Responsibilities

# Non-Responsibilities

# Ownership Summary

# Key Concepts

# Repository Rules

# Integration Points

# Recommended Documentation

# AI Guidance

# Traceability Matrix

# Open Questions

---

# Open Questions Rule

Never invent.

Record:

* Missing Documentation
* Missing Ownership
* Missing Responsibilities
* Missing Dependency Scope
* Ambiguous Concepts
* Ambiguous Rules
* Missing Evidence

under:

```text
# Open Questions
```

---

# Forbidden Behavior

The generator must never:

## Invent Responsibilities

Assign responsibilities without evidence.

## Invent Ownership

Assign ownership without evidence.

## Invent Concepts

Create repository concepts not found in documentation.

## Override Documentation

Documentation is authoritative.

## Assert Without Evidence

Every claim must be traceable.

## Assume Full Scope When Specific

If Dependency Scope is Specific, restrict extraction to declared Relevant Areas. Do not extract concepts, rules, or guidance from areas outside the declared scope.

---

# Success Criteria

The generated document is successful only when:

* Repository identity is verified.
* Dependency scope is declared.
* Responsibilities are identified.
* Non-responsibilities are identified.
* Ownership is identified.
* Key concepts are documented.
* Repository rules are documented.
* Integration points are documented.
* AI guidance is generated.
* Traceability is complete.
* Open Questions are recorded instead of assumed.

The resulting document should enable an AI system with no prior knowledge of the repository to understand its purpose, ownership, responsibilities, boundaries, and usage expectations.

```
```
