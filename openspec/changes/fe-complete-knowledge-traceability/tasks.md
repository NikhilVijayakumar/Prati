# Tasks

## Traceability and migration

- [x] Establish KT-001 through KT-005 in a requirement package and create the change artifacts.
- [ ] Classify each tracked raw source with rationale and an appropriate knowledge/requirement mapping or reference-only exclusion (KT-001).
- [ ] Complete source-attributed knowledge extraction and record conflicts (KT-002).
- [ ] Create or update requirement packages for applicable product behavior and map them to knowledge (KT-003).
- [ ] Map requirements to capability specifications and implementation/test evidence, or record explicit gaps (KT-004).
- [ ] Validate knowledge, coverage, mappings and OpenSpec; record commands and results (KT-005).
- [ ] Resolve required decisions, complete applicable review and integrate the work before archiving (KT-005).

## Verification record

- Frontend schema: `openspec schema validate frontend` passed using CLI 1.14.1.
- Change validation: `openspec validate fe-complete-knowledge-traceability` passed; the CLI parsed seven proposed requirement deltas.
- Knowledge validation and coverage check passed; four validator regression tests passed.
- `npm test -- --run src/common/localization/LanguageProvider.test.tsx`: two tests passed. Browser-level no-reload evidence remains open.
- Full coverage, requirement mapping, implementation verification and archival: not complete.
