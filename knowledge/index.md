---
okf_version: "0.2"
---
# Prati Knowledge

Durable, independently readable concepts in [Open Knowledge Format v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md). The project profile is in [profile.json](profile.json). Concepts are drafts derived from existing documentation, not proof of implementation or human approval. Check source and code before relying on a claim.

Concept frontmatter identifies revision-pinned source documents. The references record provenance, not human verification; sources may describe intended or historical behavior. Run `python scripts/verify_knowledge.py` after installing the project's Node dependencies. This validates structure and provenance metadata, not the truth of the content.

- [Product](product/) — scope and consumers.
- [Architecture](architecture/) — component and provider structure.
- [Concepts](concepts/) — theming, localization and prototype runtime.

Visual design guidance, brand context, accessibility and component concepts are indexed under Concepts. These are documented intentions and require review against current code and the applicable product context.

- [Practices](practices/) — design, architecture and security review.
