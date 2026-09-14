import { describe, expect, test } from 'bun:test';
import { tokensToCssVars } from '../app/src/entities/theme';
import { resolveTokens } from '../app/src/entities/theme/resolve-tokens';
import { MINIMAL_PRESET } from '../app/src/entities/theme/presets/minimal';
import { PLAYFUL_PRESET } from '../app/src/entities/theme/presets/playful';

describe('tokensToCssVars — resolved tokens as CSS custom properties', () => {
  test('maps every token group to the established CSS variable names', () => {
    const vars = tokensToCssVars(MINIMAL_PRESET.tokens);

    // colors
    expect(vars['--color-primary']).toBe('#20242B');
    expect(vars['--color-on-primary']).toBe('#F1F2F4');
    expect(vars['--color-muted-foreground']).toBe('#5F6773');
    expect(vars['--color-hero-accent']).toBe('#6C757D');
    // fonts
    expect(vars['--font-display']).toContain('Inter');
    expect(vars['--font-heading']).toContain('Inter');
    expect(vars['--font-condensed']).toContain('Inter');
    expect(vars['--font-mono']).toContain('Space Mono');
    // type / weights / tracking / space / radius
    expect(vars['--type-body-lg']).toBe('1.125rem');
    expect(vars['--weight-black']).toBe('900');
    expect(vars['--tracking-tight']).toBe('-0.04em');
    expect(vars['--space-2xl']).toBe('128px');
    expect(vars['--radius-card']).toBe('0');
    expect(vars['--radius-pill']).toBe('0');
    // shared button primitive radius — zero curves
    expect(vars['--radius-button']).toBe('0');
    // icon-size scale
    expect(vars['--icon-xs']).toBe('16px');
    expect(vars['--icon-sm']).toBe('20px');
    expect(vars['--icon-md']).toBe('24px');
    expect(vars['--icon-lg']).toBe('32px');
    // compact control type + 4px space scale
    expect(vars['--type-label-sm']).toBe('0.75rem');
    expect(vars['--space-4']).toBe('16px');
    expect(vars['--space-8']).toBe('32px');
    expect(vars['--space-11']).toBe('44px');
    // motion + breakpoints + z + layout
    expect(vars['--duration-fast']).toBe('150ms');
    expect(vars['--ease-out']).toContain('cubic-bezier');
    expect(vars['--breakpoint-md']).toBe('768px');
    expect(vars['--z-drawer']).toBe('40');
    expect(vars['--container-max']).toBe('80rem');
    expect(vars['--header-height']).toBe('64px');
  });

  test('playful preset overrides flow into the emitted variables', () => {
    const resolved = resolveTokens(MINIMAL_PRESET.tokens, PLAYFUL_PRESET.tokens);
    const vars = tokensToCssVars(resolved);
    expect(vars['--color-background']).toBe('#fff6eb');
    expect(vars['--color-primary']).toBe('#181b48');
    expect(vars['--color-accent']).toBe('#be008b');
    expect(vars['--radius-card']).toBe('2rem');
    // playful keeps the shared button square-cornered via the token
    expect(vars['--radius-button']).toBe('0');
    expect(vars['--font-display']).toContain('Archivo Black');
    expect(vars['--font-condensed']).toContain('Anton');
  });

  test('all values are strings (ready for the style attribute)', () => {
    const vars = tokensToCssVars(PLAYFUL_PRESET.tokens);
    for (const value of Object.values(vars)) {
      expect(typeof value).toBe('string');
    }
  });
});
