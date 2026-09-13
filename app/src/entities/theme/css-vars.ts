/**
 * Theme capability — emit resolved tokens as CSS custom properties.
 *
 * Converts a resolved TokenSet into a flat `{ '--token-name': value }` map
 * (camelCase keys become kebab-case: `onPrimary` → `--color-on-primary`).
 * The root layout applies these on the `<html>` element; static stylesheets
 * keep the minimal defaults so the page renders even before/without JS.
 *
 * The group → CSS prefix table below is the single source of truth for the
 * emitted names (one place, not scattered per group). `motion` and `layout`
 * use an empty prefix so their keys map onto the established `--duration-*` /
 * `--ease-*` and `--container-max` / `--header-height` names.
 */
import type { TokenSet } from './theme-types';

function kebabCase(key: string): string {
  return key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

/** Token group → CSS custom-property prefix. */
const GROUPS: Array<readonly [keyof TokenSet, string]> = [
  ['colors', 'color'],
  ['fonts', 'font'],
  ['type', 'type'],
  ['weights', 'weight'],
  ['tracking', 'tracking'],
  ['space', 'space'],
  ['radius', 'radius'],
  ['icon', 'icon'],
  ['breakpoints', 'breakpoint'],
  ['zIndex', 'z'],
  ['layout', ''],
  ['motion', ''],
];

export function tokensToCssVars(tokens: TokenSet): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [group, prefix] of GROUPS) {
    const groupValue = tokens[group] as unknown as Record<string, string | number>;
    for (const [key, value] of Object.entries(groupValue)) {
      const name = prefix ? `${prefix}-${kebabCase(key)}` : kebabCase(key);
      vars[`--${name}`] = String(value);
    }
  }
  return vars;
}
