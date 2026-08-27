#!/usr/bin/env node
/**
 * Feature-Sliced Design (FSD) boundary checker.
 *
 * Enforces the FSD conventions documented in docs/architecture.md:
 *
 *   1. Layer direction — a module may only import from layers at or below its
 *      own layer in: app → pages → widgets → features → entities → shared.
 *      `shared` imports nothing from other layers (only external packages).
 *   2. Cross-slice isolation — slices on the same layer (features/*, entities/*)
 *      may not import from each other directly; only `shared` and lower.
 *   3. Public API — a module may only import another slice/layer through that
 *      slice's public API (`<slice>/index.ts`), never its internals.
 *      (Within-slice imports stay relative and are exempt.)
 *
 * Run: `bun run lint:fsd` (exit 1 on violations).
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';

const ROOT = resolve('.');
const APP = join(ROOT, 'app');

/** Layer order, top → bottom. A layer may import from itself or anything after it. */
const LAYER_ORDER = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];
const SLICE_LAYERS = new Set(['features', 'entities']);
const TS_EXT = new Set(['.ts', '.tsx', '.mts', '.cts']);

const violations = [];
let scanned = 0;

/** Classify an absolute module path -> { layer, slice } (or null for externals). */
function classify(file) {
  const rel = relative(APP, file).replaceAll('\\', '/');
  if (!rel || rel.startsWith('..')) {
    return null;
  }

  // App shell (root layout, entries, route config)
  if (
    rel === 'root.tsx' ||
    rel.startsWith('entry.') ||
    rel === 'routes.ts' ||
    rel === 'route-manifest.ts'
  ) {
    return { layer: 'app', slice: null };
  }
  // Pages layer = route modules
  if (rel.startsWith('routes/')) {
    // ignore generated route types
    if (rel.includes('/+types/')) {
      return null;
    }
    return { layer: 'pages', slice: null };
  }
  if (!rel.startsWith('src/')) {
    return null;
  }

  const rest = rel.slice('src/'.length);
  const [layer, slice] = rest.split('/');
  if (!LAYER_ORDER.includes(layer)) {
    return null;
  }
  // Only features/ and entities/ have per-slice isolation; app, pages,
  // widgets, and shared are treated as single composition slices.
  return { layer, slice: SLICE_LAYERS.has(layer) ? (slice ?? null) : null };
}

/** Resolve a `~/` or relative import specifier to an absolute file path. */
function resolveModule(file, spec) {
  let base;
  if (spec.startsWith('~/')) {
    base = join(APP, spec.slice(2));
  } else if (spec.startsWith('.')) {
    base = join(dirname(file), spec);
  } else {
    return null; // bare/external import
  }

  const candidates = [];
  if (TS_EXT.has(extname(base))) {
    candidates.push(base);
  } else {
    candidates.push(base, `${base}.ts`, `${base}.tsx`, `${base}.tsx`);
    if (statSync(base, { throwIfNoEntry: false })?.isDirectory()) {
      candidates.push(join(base, 'index.ts'), join(base, 'index.tsx'));
    }
  }
  return candidates.find((c) => statSync(c, { throwIfNoEntry: false })?.isFile());
}

function report(file, spec, rule, detail) {
  const rel = relative(ROOT, file);
  violations.push(`  ${rel}\n    ${rule}: ${detail} (import '${spec}')`);
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (entry === 'node_modules' || entry.startsWith('.react-router')) {
      continue;
    }
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else if (TS_EXT.has(extname(full))) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(APP).filter((f) => !f.includes('/+types/') && !f.includes('.react-router'));

for (const file of files) {
  const source = classify(file);
  if (!source) {
    continue;
  }
  scanned++;

  const src = readFileSync(file, 'utf8');
  const re = /(?:from\s+|import\s+(?:type\s+)?(?:[^'"]*\s+from\s+)?|import\s+)['"]([^'"]+)['"]/g;
  let match;
  while ((match = re.exec(src)) !== null) {
    const spec = match[1];
    if (!spec.startsWith('.') && !spec.startsWith('~/')) {
      continue;
    }
    // skip side-effect styles and generated route types
    if (extname(spec) === '.css' || spec.includes('+types')) {
      continue;
    }
    const target = resolveModule(file, spec);
    if (!target) {
      continue;
    }
    const dep = classify(target);
    if (!dep) {
      continue;
    }

    // Rule 1: layer direction (downward only)
    const sIdx = LAYER_ORDER.indexOf(source.layer);
    const tIdx = LAYER_ORDER.indexOf(dep.layer);
    if (tIdx < sIdx) {
      report(file, spec, 'layer-direction', `${source.layer} must not import ${dep.layer}`);
      continue;
    }

    // Rule 2: cross-slice isolation on the same layer
    if (
      SLICE_LAYERS.has(source.layer) &&
      source.layer === dep.layer &&
      source.slice !== dep.slice
    ) {
      report(
        file,
        spec,
        'cross-slice',
        `${source.layer}/${source.slice} must not import ${dep.layer}/${dep.slice}`,
      );
      continue;
    }

    // Rule 3: public API — cross slice/layer imports must hit <slice>/index
    const sameSlice =
      source.layer === dep.layer && (source.slice === null || source.slice === dep.slice);
    if (!sameSlice) {
      const targetRel = relative(APP, target).replaceAll('\\', '/');
      const isPublicApi = targetRel.endsWith('/index.ts') || targetRel.endsWith('/index.tsx');
      if (!isPublicApi) {
        report(
          file,
          spec,
          'public-api',
          `import through the public API (${dep.layer}/${dep.slice ?? ''}/index) instead of internals`,
        );
      }
    }
  }
}

if (violations.length > 0) {
  console.error(`\nFSD violations (${violations.length}) in ${scanned} modules:\n`);
  console.error(violations.join('\n\n'));
  console.error('\nFix imports, then re-run. See docs/architecture.md → FSD conventions.');
  process.exit(1);
}
console.log(`✓ FSD boundaries OK (${scanned} modules, no violations)`);
