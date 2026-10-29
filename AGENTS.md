# Prati agent instructions

Prati is a React/TypeScript frontend component library. Read `README.md`, `knowledge/index.md`, `docs/requirements/README.md`, `openspec/config.yaml`, and `skills/README.md` before relevant work. Preserve unrelated working-tree changes.

For feature or behavior changes, use the frontend OpenSpec lifecycle: proposal, delta specs, UI contract, design, tasks, implementation and verification. Read `openspec/schemas/frontend/schema.yaml`; explain non-applicable UI sections for non-visual changes. Search and maintain OKF knowledge first using `skills/shared/knowledge-first/SKILL.md`, and reference relevant concepts and requirement IDs from change artifacts. Existing knowledge and requirements are drafts unless reviewed; distinguish documented intent from verified behavior. Never invent contracts or treat Gherkin prose as an executed test.

Maintain public exports and peer compatibility; assess theme tokens, component states, keyboard access, accessibility, localization and responsive behavior when affected. Select relevant skills from `skills/` and consult existing components and tests. For implementation use focused tests, `npm run lint` and `npm run build` as applicable; report failures and skipped checks. Run `python scripts/verify_knowledge.py` when changing knowledge. Respect existing branch protection and review requirements.

Graphify is optional discovery support: see `skills/shared/graphify/SKILL.md`. Its output is derived evidence, not the authoritative knowledge bundle.
