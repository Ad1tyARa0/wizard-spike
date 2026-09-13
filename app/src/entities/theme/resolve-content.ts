/**
 * Content resolution — production-real hero copy + media.
 *
 * The presets hold NO brand copy; merchant copy comes from
 * hydrogen.config.json (written by the wizard / Layer 1). Empty fields fall
 * back to live Shopify shop data (shop.name / shop.description / shop
 * brand.coverImage), and finally to generic UI fallbacks — never to demo
 * copy. The optional hero image is config-first, then the shop cover, then
 * none (plain statement hero).
 */
import type { HeroContent } from './theme-types';

export interface ShopIdentity {
  name?: string | null;
  description?: string | null;
  /** URL of the shop's brand cover image (`shop.brand.coverImage.image.url`). */
  coverImageUrl?: string | null;
}

const GENERIC: HeroContent = {
  eyebrow: '',
  statement: 'Welcome',
  sub: '',
  cta: 'Shop now',
  ctaHref: '/collections/all',
  image: '',
};

/** Resolve the hero for rendering: config ⊕ shop data ⊕ generic. */
export function resolveHeroContent(content: HeroContent, shop: ShopIdentity = {}): HeroContent {
  return {
    eyebrow: content.eyebrow || GENERIC.eyebrow,
    statement: content.statement || shop.name || GENERIC.statement,
    sub: content.sub || shop.description || GENERIC.sub,
    cta: content.cta || GENERIC.cta,
    ctaHref: content.ctaHref || GENERIC.ctaHref,
    image: content.image || shop.coverImageUrl || GENERIC.image,
  };
}
