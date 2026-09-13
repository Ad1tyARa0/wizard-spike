import { describe, expect, test } from 'bun:test';
import {
  MINIMAL_PRESET,
  PLAYFUL_PRESET,
  resolveTokens,
  tokensToCssVars,
} from '../app/src/shared/config';

describe('tokensToCssVars — resolved tokens as CSS custom properties', () => {
  test('maps every token group to the established CSS variable names', () => {
    const vars = tokensToCssVars(MINIMAL_PRESET.tokens);

    // colors
    expect(vars['--color-primary']).toBe('#000000');
    expect(vars['--color-on-primary']).toBe('#ffffff');
    expect(vars['--color-muted-foreground']).toBe('#57534e');
    expect(vars['--color-hero-accent']).toBe('#d4af37');
    // fonts
    expect(vars['--font-display']).toContain('Montserrat');
    expect(vars['--font-heading']).toContain('Montserrat');
    expect(vars['--font-condensed']).toContain('Montserrat');
    // type / weights / tracking / space / radius
    expect(vars['--type-body-lg']).toBe('1.125rem');
    expect(vars['--weight-black']).toBe('900');
    expect(vars['--tracking-tight']).toBe('-0.05em');
    expect(vars['--space-2xl']).toBe('128px');
    expect(vars['--radius-card']).toBe('0');
    expect(vars['--radius-pill']).toBe('999px');
    // shared button primitive radius — 4px, the app's single CTA corner radius
    expect(vars['--radius-button']).toBe('4px');
    // icon-size scale
    expect(vars['--icon-sm']).toBe('20px');
    expect(vars['--icon-md']).toBe('24px');
    expect(vars['--icon-lg']).toBe('32px');
    // motion + breakpoints + z + layout
    expect(vars['--duration-fast']).toBe('150ms');
    expect(vars['--ease-out']).toContain('cubic-bezier');
    expect(vars['--breakpoint-md']).toBe('768px');
    expect(vars['--z-drawer']).toBe('40');
    expect(vars['--container-max']).toBe('1440px');
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
