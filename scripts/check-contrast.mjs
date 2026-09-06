#!/usr/bin/env node
/**
 * WCAG AA contrast check over both theme presets' token palettes.
 *
 * Verifies the pairs the Theme capability's accessibility requirement names:
 * ink on every surface a preset can put text on. Fails (exit 1) when any
 * pair drops below the AA minimum of 4.5:1 (normal text).
 *
 * Usage: bun run scripts/check-contrast.mjs  (or: node scripts/check-contrast.mjs)
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const MIN_AA = 4.5;

/** Parse `presets/minimal.ts` / `presets/playful.ts` for the colors block. */
function parseColors(file) {
  const text = readFileSync(join(root, 'app', 'src', 'shared', 'config', 'presets', file), 'utf8');
  const block = text.match(/colors:\s*\{([\s\S]*?)\n  \},/);
  if (!block) {
    throw new Error(`could not find colors block in ${file}`);
  }
  const colors = {};
  for (const m of block[1].matchAll(/(\w+):\s*'#([0-9a-fA-F]{6})'/g)) {
    colors[m[1]] = `#${m[2].toLowerCase()}`;
  }
  return colors;
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// Ink on every surface that can carry text, per preset.
const PAIRS = {
  minimal: [
    ['ink', 'foreground', 'background'], // black on white
    ['ink', 'primary', 'secondary'], // black on stone
    ['ink', 'onAccent', 'accent'], // black on gold
    ['ink', 'onPrimary', 'primary'], // white on black
  ],
  playful: [
    ['ink', 'foreground', 'background'], // ink on cream
    ['ink', 'foreground', 'secondary'], // ink on wash
    ['ink', 'onAccent', 'accent'], // cream on magenta
    ['ink', 'onPrimary', 'primary'], // cream on ink
  ],
};

let failed = 0;

for (const [preset, pairs] of Object.entries(PAIRS)) {
  const colors = parseColors(`${preset}.ts`);
  for (const [name, textRole, bgRole] of pairs) {
    const text = colors[textRole];
    const bg = colors[bgRole];
    if (!text || !bg) {
      failed++;
      console.error(`✗ ${preset}: missing color for pair ${name} (${textRole}/${bgRole})`);
      continue;
    }
    const ratio = contrast(text, bg);
    const ok = ratio >= MIN_AA;
    if (!ok) {
      failed++;
    }
    console.log(
      `${ok ? '✓' : '✗'} ${preset}/${name}: ${text} on ${bg} = ${ratio.toFixed(2)}:1 ${ok ? '' : `(AA needs ${MIN_AA}:1)`}`,
    );
  }
}

if (failed > 0) {
  console.error(`\n${failed} contrast pair(s) below WCAG AA (${MIN_AA}:1).`);
  process.exit(1);
}
console.log(`\nAll preset contrast pairs pass WCAG AA (${MIN_AA}:1).`);
