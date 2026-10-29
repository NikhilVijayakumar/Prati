// Validate actual YAML and the Prati provenance profile independently of
// the Python verifier's lightweight frontmatter reader.
const fs = require('node:fs');
const path = require('node:path');
const YAML = require('yaml');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const p = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(p) : p.endsWith('.md') && !['index.md', 'log.md'].includes(entry.name) ? [p] : [];
  });
}

let failures = 0;
for (const file of walk(process.argv[2])) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!match) throw new Error('missing frontmatter');
    const doc = YAML.parse(match[1], { uniqueKeys: true });
    if (!doc || typeof doc !== 'object' || Array.isArray(doc)) throw new Error('frontmatter must be a YAML mapping');
    if (!Array.isArray(doc.sources) || doc.sources.length === 0) throw new Error('sources must be a non-empty list');
    const ids = new Set();
    for (const source of doc.sources) {
      if (!source || typeof source.id !== 'string' || !source.id || ids.has(source.id)) throw new Error('source IDs must be non-empty and unique');
      ids.add(source.id);
      if (typeof source.resource !== 'string' || !/^https:\/\//.test(source.resource)) throw new Error('source resource must be an HTTPS URL');
    }
    if (!doc.generated || typeof doc.generated.by !== 'string' || typeof doc.generated.at !== 'string') throw new Error('generated requires by and at strings');
  } catch (error) {
    failures++;
    console.error(`FAIL ${file}: ${error.message}`);
  }
}
if (failures) process.exitCode = 1;
else console.log('PASS YAML parsing and provenance fields');
