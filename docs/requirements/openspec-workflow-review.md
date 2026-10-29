# OpenSpec and skill grill review

Status: setup review, 2026-10-30. This is a review record, not a product requirement or evidence that implementation checks passed.

| Question | Finding and recommendation | Status |
| --- | --- | --- |
| Can the workflow resolve its templates? | The frontend schema defines proposal, specs, UI contract, design and tasks. Templates must exist and dependencies must be acyclic. Validate with the OpenSpec CLI as well as local checks. | CLI validation pending: tool unavailable. |
| Can generated artifacts be read? | Literal newline escapes appeared in proposal and specification templates; replaced with actual Markdown. | Fixed. |
| Is an upstream process silently imposed? | Imported templates and the Git skill prescribed a `develop` branch; this checkout exposes only `main`. Follow actual project policy and protections instead. | Fixed; branch protection not assessed. |
| Do frontend skills match this library? | Several adapters assumed Storybook, shadcn, DTCG, Tailwind and a feature application. Replace these assumptions with the actual React/MUI library and proportionate checks. | Four adapters adapted. Other imported skills require contextual selection. |
| Is a linked verification policy present? | The imported tasks template linked to a nonexistent frontend policy. It now asks for risk-proportionate verification and recorded evidence. | Fixed. |
| Can non-UI work use the schema? | The UI contract is a required dependency. Explain when no visible UI is affected. The imported templates are long; keep completed artifacts proportionate. | Supported by current schema; no separate lightweight schema chosen. |
| Are docs, knowledge, requirements and specs equivalent? | Knowledge is durable and independent; requirement packages express intended behavior; OpenSpec deltas describe change. Existing converted material is draft and needs comparison with implementation. | Ongoing; no approval implied. |
| Can graphify and the CLI run immediately? | Both are optional external tools and neither was found during setup. Their outputs are not evidence until executed. | Installation and execution pending. |
| Should small fixes and documentation-only work require the full chain? | Recommendation: allow a documented lightweight path for low-risk work while retaining traceability and verification; keep behavior changes with material compatibility or UI impact in the full path. The exact trigger and handling of spec-free changes need a project decision and CLI validation. | Open; user input requested. |

This review does not establish a full audit of every imported skill or the entire existing documentation corpus. Revisit when those skills or documents are used.
