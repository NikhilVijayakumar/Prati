"""Regression tests for invalid YAML and missing provenance in knowledge."""
import subprocess
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / 'scripts/verify_knowledge_yaml.cjs'
VALID = '''---
type: Concept
generated: { by: test/1, at: "2026-10-30T00:00:00Z" }
sources:
  - id: source-1
    resource: https://example.org/source
---
# Concept
'''

class YamlValidationTest(unittest.TestCase):
    def validate(self, content):
        with tempfile.TemporaryDirectory() as temp:
            (Path(temp) / 'concept.md').write_text(content, encoding='utf-8')
            return subprocess.run(['node', str(VALIDATOR), temp], capture_output=True, text=True)

    def test_valid_metadata_passes(self):
        self.assertEqual(self.validate(VALID).returncode, 0)

    def test_malformed_yaml_fails(self):
        self.assertNotEqual(self.validate(VALID.replace('type: Concept', 'type: [unclosed')).returncode, 0)

    def test_missing_sources_fail(self):
        self.assertNotEqual(self.validate(VALID.replace('sources:', 'unrelated:')).returncode, 0)

    def test_duplicate_source_id_fails(self):
        invalid = VALID.replace('---\n# Concept', '  - id: source-1\n    resource: https://example.org/other\n---\n# Concept')
        self.assertNotEqual(self.validate(invalid).returncode, 0)

if __name__ == '__main__':
    unittest.main()
