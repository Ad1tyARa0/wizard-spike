import { describe, expect, test } from 'bun:test';
import { defaultTheme, resolveTheme } from '../app/src/entities/theme';
import { resolveTokens } from '../app/src/entities/theme/resolve-tokens';
import type { DesignOverrides, TokenSet } from '../app/src/entities/theme/theme-types';
import { MINIMAL_PRESET, MINIMAL_TOKENS } from '../app/src/entities/theme/presets/minimal';
import { PLAYFUL_PRESET, PLAYFUL_TOKENS } from '../app/src/entities/theme/presets/playful';

describe('resolveTokens — defaults ⊕ preset ⊕ overrides', () => {
  test('resolver is pure: same inputs produce identical output', () => {
    const overrides: DesignOverrides = { colors: { accent: '#123456' } };
    const a = resolveTokens(MINIMAL_TOKENS, PLAYFUL_TOKENS, overrides);
    const b = resolveTokens(MINIMAL_TOKENS, PLAYFUL_TOKENS, overrides);
    expect(a).toEqual(b);
  });

  test('preset wins over defaults, overrides win over preset', () => {
    const resolved = resolveTokens(MINIMAL_TOKENS, PLAYFUL_TOKENS, {
      colors: { accent: '#00ff00' },
    });
    // defaults accent (minimal gold) → preset accent (magenta) → override
    expect(MINIMAL_TOKENS.colors.accent).toBe('#d4af37');
    expect(PLAYFUL_TOKENS.colors.accent).toBe('#be008b');
    expect(resolved.colors.accent).toBe('#00ff00');
    // non-overridden preset value comes from the preset, not defaults
    expect(resolved.colors.background).toBe(PLAYFUL_TOKENS.colors.background);
  });

  test('partial overrides merge onto preset defaults', () => {
    const resolved = resolveTokens(MINIMAL_TOKENS, PLAYFUL_TOKENS, {
      colors: { background: '#ffffff' },
    });
    expect(resolved.colors.background).toBe('#ffffff');
    expect(resolved.colors.foreground).toBe(PLAYFUL_TOKENS.colors.foreground);
    expect(resolved.fonts.body).toBe(PLAYFUL_TOKENS.fonts.body);
  });

  test('every group resolves even with no overrides', () => {
    const resolved = resolveTokens(MINIMAL_TOKENS, PLAYFUL_TOKENS);
    for (const group of Object.keys(MINIMAL_TOKENS) as (keyof TokenSet)[]) {
      expect(resolved[group]).toEqual(PLAYFUL_TOKENS[group]);
    }
  });
});

describe('preset completeness — no preset relies on another', () => {
  test('minimal preset alone is complete', () => {
    const resolved = resolveTokens(MINIMAL_PRESET.tokens, MINIMAL_PRESET.tokens);
    for (const group of Object.keys(MINIMAL_TOKENS) as (keyof TokenSet)[]) {
      expect(Object.keys(resolved[group]).length).toBeGreaterThan(0);
    }
  });

  test('playful preset alone is complete (full token set defined)', () => {
    const resolved = resolveTokens(PLAYFUL_PRESET.tokens, PLAYFUL_PRESET.tokens);
    for (const group of Object.keys(PLAYFUL_TOKENS) as (keyof TokenSet)[]) {
      expect(Object.keys(resolved[group]).length).toBeGreaterThan(0);
    }
    // full set = same number of keys per group as minimal (no gaps)
    for (const group of Object.keys(MINIMAL_TOKENS) as (keyof TokenSet)[]) {
      expect(Object.keys(PLAYFUL_TOKENS[group]).length).toBe(
        Object.keys(MINIMAL_TOKENS[group]).length,
      );
    }
  });
});

describe('resolveTheme', () => {
  test('theme minimal resolves to the minimal preset values', () => {
    const state = resolveTheme({ theme: 'minimal' });
    expect(state.preset).toBe('minimal');
    expect(state.tokens).toEqual(MINIMAL_TOKENS);
    expect(state.layout.headerStyle).toBe('slim');
    expect(state.layout.cardAspectRatio).toBe('portrait');
    expect(state.layout.homeSectionOrder).toEqual([
      'hero',
      'featuredCollection',
      'recommendedProducts',
    ]);
  });

  test('theme playful resolves to the playful preset values', () => {
    const state = resolveTheme({ theme: 'playful' });
    expect(state.preset).toBe('playful');
    expect(state.tokens).toEqual(PLAYFUL_TOKENS);
    expect(state.layout.headerStyle).toBe('chunky');
    expect(state.layout.gridDensity).toBe('compact');
    expect(state.layout.cardAspectRatio).toBe('square');
    expect(state.layout.homeSectionOrder[1]).toBe('marquee');
    // Presets carry no brand copy — marquee is empty by default
    expect(state.content.marquee.items).toEqual([]);
    expect(state.content.hero.cta).toBe('Shop now');
  });

  test('config overrides win over the preset', () => {
    const state = resolveTheme({
      theme: 'playful',
      design: { colors: { accent: '#123abc' } },
      layout: { headerStyle: 'slim', cardAspectRatio: 'wide' },
      content: { hero: { statement: 'Custom hero.' } },
    });
    expect(state.tokens.colors.accent).toBe('#123abc');
    expect(state.layout.headerStyle).toBe('slim');
    expect(state.layout.cardAspectRatio).toBe('wide');
    expect(state.content.hero.statement).toBe('Custom hero.');
    // everything else still comes from the preset
    expect(state.content.hero.cta).toBe(PLAYFUL_PRESET.content.hero.cta);
  });

  test('defaultTheme matches minimal preset', () => {
    expect(defaultTheme()).toEqual(resolveTheme({ theme: 'minimal' }));
  });
});
