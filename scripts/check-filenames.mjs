#!/usr/bin/env node
/**
 * Kebab-case file & directory naming checker.
 *
 * Enforces the convention documented in docs/architecture.md and the
 * `file-naming-convention` requirement in openspec/specs/architecture:
 * every source file and directory under `app/` and `scripts/` MUST use
 * lowercase letters, digits, and hyphens as separators.
 *
 * Exemptions (documented conventions):
 *   - `app/routes/**` — route modules follow React Router conventions
 *     (`$dynamic` segments, `_index` markers, `route.tsx`/`index.tsx`).
 *   - basenames `index`, `route` — FSD public APIs / route modules.
 *   - basenames `entry.client`, `entry.server` — scaffold-fixed entry points.
 *   - `+types/**`, `.react-router/**` — generated.
 *
 * Run: `bun run lint:filenames` (exit 1 on violations).
 */
import { readdirSync, statSync } from 'node:fs';
import { basename, extname, join, relative, resolve } from 'node:path';

const ROOT = resolve('.');
const SCOPES = ['app', 'scripts'];
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const EXEMPT_BASENAMES = new Set(['index', 'route', 'entry.client', 'entry.server']);
const IGNORE_DIRS = new Set(['node_modules', '.react-router', '+types']);
const CODE_EXT = /\.(ts|tsx|js|jsx|mjs)$/;

const violations = [];
let scanned = 0;

function check(name, rel, kind) {
  if (!KEBAB.test(name)) {
    violations.push(
      `  ${rel}\n    ${kind} '${name}' must be kebab-case (lowercase letters/digits, hyphens)`,
    );
  }
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (IGNORE_DIRS.has(entry)) {
      continue;
    }
    const full = join(dir, entry);
    const rel = relative(ROOT, full).replaceAll('\\', '/');
    // Route modules follow React Router conventions — exempt.
    if (rel.startsWith('app/routes/')) {
      continue;
    }
    const base = basename(entry, extname(entry));
    if (statSync(full).isDirectory()) {
      check(entry, rel, 'directory');
      walk(full);
    } else if (CODE_EXT.test(entry)) {
      scanned++;
      if (!EXEMPT_BASENAMES.has(base)) {
        check(base, rel, 'file');
      }
    }
  }
}

for (const scope of SCOPES) {
  const full = join(ROOT, scope);
  if (!statSync(full, { throwIfNoEntry: false })?.isDirectory()) {
    continue;
  }
  check(scope, scope, 'directory');
  walk(full);
}

if (violations.length > 0) {
  console.error(`\nFile naming violations (${violations.length}):\n`);
  console.error(violations.join('\n\n'));
  console.error(
    '\nRename the file/directory, then re-run. See docs/architecture.md → Naming conventions.',
  );
  process.exit(1);
}
console.log(`✓ File naming OK (${scanned} files, kebab-case)`);
