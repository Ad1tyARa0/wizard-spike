/**
 * Theme capability — emit resolved tokens as CSS custom properties.
 *
 * Converts a resolved TokenSet into a flat `{ '--token-name': value }` map
 * (camelCase keys become kebab-case: `onPrimary` → `--color-on-primary`).
 * The root layout applies these on the `<html>` element; static stylesheets
 * keep the minimal defaults so the page renders even before/without JS.
 */
import type { TokenSet } from './theme-types';

function kebabCase(key: string): string {
  return key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

export function tokensToCssVars(tokens: TokenSet): Record<string, string> {
  const vars: Record<string, string> = {};

  const emit = (prefix: string, group: object) => {
    for (const [key, value] of Object.entries(group as Record<string, string | number>)) {
      const name = prefix ? `${prefix}-${kebabCase(key)}` : kebabCase(key);
      vars[`--${name}`] = String(value);
    }
  };

  emit('color', tokens.colors);
  emit('font', tokens.fonts);
  emit('type', tokens.type);
  emit('weight', tokens.weights);
  emit('tracking', tokens.tracking);
  emit('space', tokens.space);
  emit('radius', tokens.radius);
  emit('icon', tokens.icon);
  emit('breakpoint', tokens.breakpoints);
  emit('z', tokens.zIndex);
  emit('', tokens.layout); // container-max, header-height

  // Motion maps onto the established CSS names (--duration-*, --ease-out).
  vars['--duration-fast'] = tokens.motion.durationFast;
  vars['--duration-base'] = tokens.motion.durationBase;
  vars['--ease-out'] = tokens.motion.easeOut;

  return vars;
}
