#!/usr/bin/env node
/**
 * QA check for OpenSpec capability specs in openspec/specs/<cap>/spec.md.
 * Enforces the conventions used in this repo:
 *   - file: `# <Name> Capability` + `## Purpose` + `## Requirements`
 *   - requirement headers: `### Requirement: <kebab-case-name>`
 *   - every requirement has >= 2 scenarios `#### Scenario: <name>`
 *   - every scenario has `**WHEN**` and `**THEN**` bullets (AND optional)
 *
 * Usage: bun run scripts/check-specs.mjs   (or: node scripts/check-specs.mjs)
 * Exits non-zero when any spec violates the conventions.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const specsDir = join(root, 'openspec', 'specs');
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
let failed = 0;

if (!existsSync(specsDir)) {
  console.error(`No specs directory at ${specsDir}`);
  process.exit(1);
}

const capabilities = readdirSync(specsDir, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

if (capabilities.length === 0) {
  console.error('No capability directories found under openspec/specs/');
  process.exit(1);
}

for (const cap of capabilities) {
  const file = join(specsDir, cap, 'spec.md');
  const errors = [];
  if (!existsSync(file)) {
    errors.push(`missing spec.md`);
  } else {
    const text = readFileSync(file, 'utf8');
    const lines = text.split(/\r?\n/);

    if (!/^# .+ Capability$/.test(lines[0] ?? '')) {
      errors.push(`line 1 must be "# <Name> Capability", got: ${lines[0] ?? '(empty)'}`);
    }
    if (!text.includes('## Purpose')) {
      errors.push(`missing "## Purpose" section`);
    }
    if (!text.includes('## Requirements')) {
      errors.push(`missing "## Requirements" section`);
    }

    // Walk sections: collect requirement ranges.
    const reqs = [];
    lines.forEach((line, i) => {
      const m = line.match(/^### Requirement: (.+)$/);
      if (m) {
        reqs.push({ name: m[1].trim(), start: i, scenarios: 0, when: false, hasThen: false });
      }
    });
    for (let r = 0; r < reqs.length; r++) {
      const req = reqs[r];
      const end = r + 1 < reqs.length ? reqs[r + 1].start : lines.length;
      if (!KEBAB.test(req.name)) {
        errors.push(`requirement "${req.name}" (line ${req.start + 1}) must be kebab-case`);
      }
      for (let i = req.start + 1; i < end; i++) {
        const line = lines[i];
        if (line.startsWith('#### Scenario: ')) {
          req.scenarios++;
        }
        if (/\*\*WHEN\*\*/.test(line)) {
          req.when = true;
        }
        if (/\*\*THEN\*\*/.test(line)) {
          req.hasThen = true;
        }
      }
      if (req.scenarios < 2) {
        errors.push(`requirement "${req.name}" has ${req.scenarios} scenario(s), needs >= 2`);
      }
      if (!req.when) {
        errors.push(`requirement "${req.name}" has no **WHEN** bullet`);
      }
      if (!req.hasThen) {
        errors.push(`requirement "${req.name}" has no **THEN** bullet`);
      }
    }
    const dupes = reqs.map((r) => r.name).filter((n, i, a) => a.indexOf(n) !== i);
    if (dupes.length) {
      errors.push(`duplicate requirement names: ${[...new Set(dupes)].join(', ')}`);
    }
  }

  if (errors.length) {
    failed++;
    console.error(`\n✗ ${cap}:`);
    for (const e of errors) {
      console.error(`    - ${e}`);
    }
  } else {
    console.log(
      `✓ ${cap} (${readFileSync(file, 'utf8').split(/^### Requirement: /m).length - 1} requirements)`,
    );
  }
}

console.log(
  failed === 0
    ? `\nAll ${capabilities.length} specs pass.`
    : `\n${failed}/${capabilities.length} specs have issues.`,
);
process.exit(failed === 0 ? 0 : 1);
