/**
 * Content resolution — production-real hero copy.
 *
 * The presets hold NO brand copy; merchant copy comes from
 * hydrogen.config.json (written by the wizard / Layer 1). Empty fields fall
 * back to live Shopify shop data (shop.name / shop.description), and finally
 * to generic UI fallbacks — never to demo copy.
 */
import type { HeroContent } from './theme-types';

export interface ShopIdentity {
  name?: string | null;
  description?: string | null;
}

const GENERIC: HeroContent = {
  eyebrow: '',
  statement: 'Welcome',
  sub: '',
  cta: 'Shop now',
  ctaHref: '/collections/all',
};

/** Resolve the hero copy for rendering: config ⊕ shop data ⊕ generic. */
export function resolveHeroContent(content: HeroContent, shop: ShopIdentity = {}): HeroContent {
  return {
    eyebrow: content.eyebrow || GENERIC.eyebrow,
    statement: content.statement || shop.name || GENERIC.statement,
    sub: content.sub || shop.description || GENERIC.sub,
    cta: content.cta || GENERIC.cta,
    ctaHref: content.ctaHref || GENERIC.ctaHref,
  };
}
