/**
 * Theme capability — hydrogen.config.json schema (v0.1).
 *
 * ADDITIVE-ONLY CONTRACT (documented here and enforced by review):
 *   - Minor releases ADD keys only; they never rename or remove keys.
 *   - A config written for an older release MUST keep working unchanged:
 *     all old keys keep their meaning, only newly added keys may be absent.
 *   - Breaking changes to the schema happen only on a major version bump
 *     (schema version field below is reserved for that).
 *   - Unknown keys are TOLERATED (`.passthrough()`) so newer template
 *     releases can emit keys this release does not know yet.
 *
 * Missing or malformed values fall back to the preset defaults — the page
 * always renders (see loadConfig).
 */
import { z } from 'zod';
import {
  CARD_ASPECT_RATIOS,
  GRID_DENSITIES,
  HEADER_STYLES,
  MARQUEE_DIRECTIONS,
  MARQUEE_SPEEDS,
  THEME_PRESET_NAMES,
} from './theme-types';

const themePresetSchema = z.enum(THEME_PRESET_NAMES).default('minimal');

const designOverridesSchema = z
  .object({
    colors: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
    fonts: z.record(z.string(), z.string()).optional(),
    type: z.record(z.string(), z.string()).optional(),
    weights: z.record(z.string(), z.number()).optional(),
    tracking: z.record(z.string(), z.string()).optional(),
    space: z.record(z.string(), z.string()).optional(),
    radius: z.record(z.string(), z.string()).optional(),
    motion: z.record(z.string(), z.string()).optional(),
    icon: z.record(z.string(), z.string()).optional(),
  })
  .passthrough();

const layoutSchema = z
  .object({
    headerStyle: z.enum(HEADER_STYLES).optional(),
    gridDensity: z.enum(GRID_DENSITIES).optional(),
    cardAspectRatio: z.enum(CARD_ASPECT_RATIOS).optional(),
    homeSectionOrder: z.array(z.string()).optional(),
  })
  .passthrough();

const marqueeContentSchema = z
  .object({
    items: z.array(z.string()).optional(),
    direction: z.enum(MARQUEE_DIRECTIONS).optional(),
    speed: z.enum(MARQUEE_SPEEDS).optional(),
  })
  .passthrough();

const heroContentSchema = z
  .object({
    eyebrow: z.string().optional(),
    statement: z.string().optional(),
    sub: z.string().optional(),
    cta: z.string().optional(),
    ctaHref: z.string().optional(),
    image: z.string().optional(),
  })
  .passthrough();

const contentSchema = z
  .object({
    nav: z.array(z.string()).optional(),
    footer: z.array(z.string()).optional(),
    hero: heroContentSchema.optional(),
    marquee: marqueeContentSchema.optional(),
  })
  .passthrough();

/**
 * v0.1 config schema. Every section optional; `theme` defaults to 'minimal'.
 * Future major versions may add a required `schema` version discriminator.
 */
export const themeConfigSchema = z
  .object({
    theme: themePresetSchema,
    design: designOverridesSchema.optional(),
    layout: layoutSchema.optional(),
    content: contentSchema.optional(),
    integrations: z.record(z.string(), z.unknown()).optional(),
    ai: z.record(z.string(), z.unknown()).optional(),
  })
  .passthrough();

export type ThemeConfig = z.infer<typeof themeConfigSchema>;
export type DesignOverridesInput = z.infer<typeof designOverridesSchema>;
export type LayoutOverridesInput = z.infer<typeof layoutSchema>;
export type ContentOverridesInput = z.infer<typeof contentSchema>;

/**
 * Validate an unknown config value (parsed JSON). Returns `null` on any
 * failure — callers fall back to defaults (missing-config-falls-back).
 */
export function parseThemeConfig(value: unknown): ThemeConfig | null {
  const parsed = themeConfigSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}
