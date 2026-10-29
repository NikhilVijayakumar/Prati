# Skills

Skills are stored once in `skills/shared`, `skills/frontend`, and `skills/qa`. Frontend and shared skills were selected from the staffing-platform reference; QA skills cover test cases, data and traceability. `knowledge-first` and the OKF verifier come from Vyasa; `graphify` is the locally installed graphify skill. Apply by relevance, not as a mandatory checklist. Several frontend adapters and Git discipline have been adapted to Prati. Other imported skills may describe upstream processes or optional tools; project instructions and the actual repository take precedence.

Run `python scripts/sync_skills.py --dry-run` to inspect links, then `python scripts/sync_skills.py --agents claude` (or another supported agent) to install references. `python scripts/sync_skills.py --help` lists options. Links may require Windows developer mode or appropriate permission; do not overwrite existing unrelated agent files. Verify with the same `--agents` selection and `--verify`. Agent directories are local setup, not the canonical skill source.

For graph exploration invoke `/graphify` per `shared/graphify/SKILL.md`; install its separate `graphifyy` tool when needed. Generated graphs are derived navigation aids, not authoritative requirements or knowledge. Review its corpus and sensitive-file rules before running it.
