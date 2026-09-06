import { describe, expect, test } from 'bun:test';
import { parseThemeConfig } from '../app/src/shared/config';

describe('theme-config-schema (hydrogen.config.json v0.1)', () => {
  test('valid config parses with theme, design, layout, content', () => {
    const config = parseThemeConfig({
      theme: 'playful',
      design: { colors: { accent: '#ff0000' } },
      layout: { headerStyle: 'chunky', gridDensity: 'compact', cardAspectRatio: 'wide' },
      content: { hero: { statement: 'Snack time.' }, marquee: { items: ['A', 'B'] } },
      integrations: { shopify: { enabled: true } },
      ai: { copilot: { enabled: false } },
    });
    expect(config).not.toBeNull();
    expect(config?.theme).toBe('playful');
    expect(config?.design?.colors?.accent).toBe('#ff0000');
    expect(config?.layout?.headerStyle).toBe('chunky');
    expect(config?.layout?.cardAspectRatio).toBe('wide');
    expect(config?.content?.hero?.statement).toBe('Snack time.');
  });

  test('theme absent defaults to minimal', () => {
    const config = parseThemeConfig({});
    expect(config?.theme).toBe('minimal');
  });

  test('unknown keys are tolerated (additive contract)', () => {
    const config = parseThemeConfig({
      theme: 'minimal',
      futureFeature: { x: 1 },
      design: { colors: { futureColor: '#abc' }, futureGroup: { a: 'b' } },
      layout: { futureFlag: true },
    });
    expect(config).not.toBeNull();
    expect(config?.theme).toBe('minimal');
  });

  test('invalid preset name fails validation', () => {
    expect(parseThemeConfig({ theme: 'bogus' })).toBeNull();
  });

  test('non-object input fails validation', () => {
    expect(parseThemeConfig('nope')).toBeNull();
    expect(parseThemeConfig(null)).toBeNull();
    expect(parseThemeConfig(42)).toBeNull();
  });

  test('old config written for an earlier release still parses (additive contract)', () => {
    // A config that only used the v0.1 original keys must keep working even
    // as later releases add keys — here the schema has grown sections.
    const legacy = parseThemeConfig({ theme: 'minimal' });
    expect(legacy).not.toBeNull();
    expect(legacy?.theme).toBe('minimal');
  });

  test('invalid nested values fail validation', () => {
    expect(parseThemeConfig({ layout: { headerStyle: 'wide' } })).toBeNull();
    expect(parseThemeConfig({ content: { hero: { statement: 42 } } })).toBeNull();
  });
});
