import { describe, expect, test } from 'bun:test';
import { resolveHeroContent } from '../app/src/shared/config';
import type { HeroContent } from '../app/src/shared/config';

const CONFIG_HERO: HeroContent = {
  eyebrow: 'New Collection',
  statement: 'Less, but better.',
  sub: 'Considered goods for everyday life.',
  cta: 'Shop the collection',
  ctaHref: '/collections/all',
};

describe('resolveHeroContent — config ⊕ shop data ⊕ generic', () => {
  test('config copy wins over shop data', () => {
    const hero = resolveHeroContent(CONFIG_HERO, {
      name: 'Acme Store',
      description: 'Whatever.',
    });
    expect(hero).toEqual(CONFIG_HERO);
  });

  test('empty config falls back to live Shopify shop data (production-real)', () => {
    const hero = resolveHeroContent(
      { eyebrow: '', statement: '', sub: '', cta: 'Shop now', ctaHref: '/collections/all' },
      { name: 'Acme Store', description: 'Premium goods.' },
    );
    expect(hero.statement).toBe('Acme Store');
    expect(hero.sub).toBe('Premium goods.');
    expect(hero.cta).toBe('Shop now');
  });

  test('empty config + no shop data falls back to generic values, never demo copy', () => {
    const hero = resolveHeroContent({
      eyebrow: '',
      statement: '',
      sub: '',
      cta: 'Shop now',
      ctaHref: '/collections/all',
    });
    expect(hero.statement).toBe('Welcome');
    expect(hero.sub).toBe('');
    expect(hero.cta).toBe('Shop now');
    expect(hero.ctaHref).toBe('/collections/all');
    expect(hero.statement).not.toBe('Less, but better.');
  });

  test('partial config keeps its values, missing fields fall back', () => {
    const hero = resolveHeroContent(
      { eyebrow: '', statement: 'My Hero', sub: '', cta: 'Shop now', ctaHref: '/collections/all' },
      { name: 'Acme Store', description: 'Premium goods.' },
    );
    expect(hero.statement).toBe('My Hero');
    expect(hero.sub).toBe('Premium goods.');
  });

  test('empty eyebrow stays empty (section renders no eyebrow)', () => {
    const hero = resolveHeroContent(CONFIG_HERO, {});
    expect(hero.eyebrow).toBe('New Collection');
    const empty = resolveHeroContent(
      { eyebrow: '', statement: 'X', sub: '', cta: 'Shop now', ctaHref: '/' },
      {},
    );
    expect(empty.eyebrow).toBe('');
  });
});
