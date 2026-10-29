# Tasks

- [x] Add concept YAML and source metadata validation.
- [x] Add source-inventory generation and drift checking.
- [x] Validate the knowledge bundle and source inventory.
- [x] Run regression checks for valid, malformed and missing provenance metadata.

## Verification record

- `python scripts/verify_knowledge.py`: passed; 38 concepts, no errors or warnings.
- `python -m unittest scripts.test_knowledge_validation`: passed; four tests.
- `python scripts/knowledge_coverage.py --check`: passed.
- These checks do not establish content accuracy, complete source review, or product behavior verification.
