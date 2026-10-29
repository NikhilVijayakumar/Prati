# Requirement to Specification and Evidence Mapping

Status: incomplete. Listed source files and tests are candidates for review, not evidence of a passing test or comprehensive coverage.

| Requirement | Knowledge | Proposed specification | Implementation or verification candidate | Status |
| --- | --- | --- | --- | --- |
| FR-FE-001 | [Provider hierarchy](../../../knowledge/architecture/provider-hierarchy.md) | [Provider composition](../../../openspec/changes/fe-complete-knowledge-traceability/specs/frontend-foundations/spec.md) | [README provider example](../../../README.md) | Draft; review and verification pending |
| FR-FE-002 | [Localization](../../../knowledge/concepts/localization.md) | [Runtime language changes](../../../openspec/changes/fe-complete-knowledge-traceability/specs/frontend-foundations/spec.md) | [LanguageProvider](../../../src/common/localization/LanguageProvider.tsx), [tests](../../../src/common/localization/LanguageProvider.test.tsx) | Component test passed: two tests verify default language and switching translated text. Browser-level no-reload verification and acceptance review remain open. |
| FR-FE-003 | [Prototype runtime](../../../knowledge/concepts/prototype-runtime.md) | [Prototype mock data boundary](../../../openspec/changes/fe-complete-knowledge-traceability/specs/frontend-foundations/spec.md) | [Prototype runtime](../../../src/proto-runtime/index.ts) | Draft; workflow and evidence review pending |
| KT-001–005 | [Knowledge index](../../../knowledge/index.md) | [Knowledge traceability](../../../openspec/changes/fe-complete-knowledge-traceability/specs/knowledge-traceability/spec.md) | [Coverage inventory](../raw-coverage.md), [knowledge validator](../../../scripts/verify_knowledge.py) | Change remains open; remaining sources and product requirements not yet mapped |
| KT-001–002 (validation tooling only) | [Knowledge index](../../../knowledge/index.md) | [Knowledge validation](../../../openspec/specs/knowledge-validation/spec.md) | [Validator](../../../scripts/verify_knowledge.py), [regression tests](../../../scripts/test_knowledge_validation.py), [coverage check](../../../scripts/knowledge_coverage.py) | Verified tooling slice archived; source review and semantic accuracy remain open. |

Additional component, design-system, template and runtime requirements still need extraction and individual mapping. Do not interpret missing rows as out of scope.
