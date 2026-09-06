import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  applyPreviewOverride,
  defaultTheme,
  loadConfig,
  readConfig,
} from '../app/src/shared/config';

const fixtureDir = join(process.cwd(), '.tmp', 'config-tests');

beforeAll(() => {
  mkdirSync(fixtureDir, { recursive: true });
});

afterAll(() => {
  rmSync(fixtureDir, { recursive: true, force: true });
});

function fixture(name: string, content: string): string {
  const path = join(fixtureDir, name);
  writeFileSync(path, content, 'utf8');
  return path;
}

describe('readConfig — hydrogen.config.json', () => {
  test('valid config file parses', async () => {
    const path = fixture('valid.json', JSON.stringify({ theme: 'playful' }));
    const config = await readConfig(path);
    expect(config.theme).toBe('playful');
  });

  test('unknown keys in the file are tolerated', async () => {
    const path = fixture(
      'unknown.json',
      JSON.stringify({ theme: 'playful', someFutureKey: { nested: true } }),
    );
    const config = await readConfig(path);
    expect(config.theme).toBe('playful');
  });

  test('missing file falls back to minimal defaults', async () => {
    const config = await readConfig(join(fixtureDir, 'does-not-exist.json'));
    expect(config.theme).toBe('minimal');
  });

  test('malformed JSON falls back to minimal defaults', async () => {
    const path = fixture('malformed.json', '{ not valid json !!!');
    const config = await readConfig(path);
    expect(config.theme).toBe('minimal');
  });

  test('schema-invalid file falls back to minimal defaults', async () => {
    const path = fixture('invalid.json', JSON.stringify({ theme: 'no-such-preset' }));
    const config = await readConfig(path);
    expect(config.theme).toBe('minimal');
  });
});

describe('loadConfig — end to end', () => {
  test('loads playful config and resolves full theme state', async () => {
    const path = fixture(
      'load-playful.json',
      JSON.stringify({
        theme: 'playful',
        design: { colors: { accent: '#ffcc00' } },
      }),
    );
    const state = await loadConfig({ path });
    expect(state.preset).toBe('playful');
    expect(state.tokens.colors.accent).toBe('#ffcc00');
    expect(state.tokens.colors.background).toBe('#fff6eb');
    expect(state.layout.headerStyle).toBe('chunky');
    // No content in the fixture config → neutral preset defaults (no demo copy)
    expect(state.content.marquee.items).toEqual([]);
    expect(state.content.hero.cta).toBe('Shop now');
  });

  test('missing config renders default (minimal) theme, no crash', async () => {
    const state = await loadConfig({ path: join(fixtureDir, 'nope.json') });
    expect(state).toEqual(defaultTheme());
  });
});

describe('applyPreviewOverride — the wizard live-preview seam', () => {
  const base = defaultTheme();

  function requestWith(url: string, headers: Record<string, string> = {}): Request {
    return new Request(url, { headers });
  }

  test('?theme= playful preview works in non-production', () => {
    const state = applyPreviewOverride(base, requestWith('http://localhost/?theme=playful'), false);
    expect(state.preset).toBe('playful');
  });

  test('?config= JSON preview works in non-production', () => {
    const payload = encodeURIComponent(JSON.stringify({ theme: 'playful' }));
    const state = applyPreviewOverride(
      base,
      requestWith(`http://localhost/?config=${payload}`),
      false,
    );
    expect(state.preset).toBe('playful');
  });

  test('x-theme-config header preview works in non-production', () => {
    const state = applyPreviewOverride(
      base,
      requestWith('http://localhost/', { 'x-theme-config': JSON.stringify({ theme: 'playful' }) }),
      false,
    );
    expect(state.preset).toBe('playful');
  });

  test('preview override is IGNORED in production', () => {
    const state = applyPreviewOverride(base, requestWith('http://localhost/?theme=playful'), true);
    expect(state.preset).toBe('minimal');
    const headerState = applyPreviewOverride(
      base,
      requestWith('http://localhost/', { 'x-theme-config': JSON.stringify({ theme: 'playful' }) }),
      true,
    );
    expect(headerState.preset).toBe('minimal');
  });

  test('malformed preview override is ignored, current state kept', () => {
    const state = applyPreviewOverride(base, requestWith('http://localhost/?config=%%%'), false);
    expect(state).toEqual(base);
    const badJson = applyPreviewOverride(
      base,
      requestWith('http://localhost/?config=' + encodeURIComponent('{oops')),
      false,
    );
    expect(badJson).toEqual(base);
    const unknownTheme = applyPreviewOverride(
      base,
      requestWith('http://localhost/?theme=nope'),
      false,
    );
    expect(unknownTheme).toEqual(base);
  });
});
