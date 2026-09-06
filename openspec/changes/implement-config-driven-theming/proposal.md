# Implement Config-Driven Theming

## Why

The wizard product sells "a storefront that re-themes from a config file — no
developer needed." Today the Theme capability is static: Exaggerated
Minimalism is the only design language, hard-coded in `tokens.css`/`tokens.ts`.
A merchant cannot choose a design philosophy, change colors, typography, or
layout, or preview a draft theme without code edits — which is exactly the
"control without a developer" promise the product is built on.

This change makes the Theme capability config-driven: a validated
`hydrogen.config.json` selects a theme preset and applies token, layout, and
content overrides. It also ships the second design language (Playful DTC,
Partake Foods-inspired) to prove the preset model handles real visual variety —
not minimal-shaped variety. The existing Exaggerated Minimalism language is
retained as preset #1 (already implemented; discarding it would throw away
working design work), and Playful DTC is added as preset #2.

## What Changes

- Config schema v0.1 (zod): `theme` preset selection, `design` token
  overrides, `layout` variant flags, `content` (nav/footer/hero/marquee
  copy), `integrations`, `ai`. **Additive-only contract**: minor releases add
  keys, never rename or remove; breaking changes only on a major version.
- Runtime token resolution: effective token set = `defaults ⊕ preset ⊕
  overrides`, resolved as a pure function and emitted as CSS custom
  properties on the root, with a typed mirror for TypeScript consumers.
  `loadConfig()` runs in the root loader; in non-production the loader also
  accepts a request-time config override (the wizard's live-preview seam).
- Theme presets: `minimal` (Exaggerated Minimalism — existing tokens become
  the preset's defaults) and `playful` (Partake-inspired: cream-dominant
  paired-hue palette, indigo-navy ink, condensed poster display, banded
  full-bleed sections, marquee, sticker hover).
- Layout variant flags v1: header style, product-grid density, home section
  order — consumed by widgets, per FSD.
- New components: first-class `marquee` section (content array, direction,
  speed, pause-on-hover, reduced-motion), `sticker-hover` primitive (tilt +
  hard offset shadow) in `shared/ui`.
- Font policy: ship only fonts licensed for redistribution (Google Fonts).
  Playful preset replaces Partake's proprietary faces (Toroka/Bunch/Gilroy)
  with Archivo Black / Anton / Fredoka / Manrope. Minimal preset's
  Montserrat/Cormorant are already Google Fonts.
- Design system master for the playful language persisted at
  `design-system/e-commerce-website/PLAYFUL-DTC-MASTER.md`.

## Impact

- Theme capability gains: config-file-driven customization (extends the
  existing `storefront-customization` requirement), runtime token
  resolution, preset selection, layout flags, and a second design language.
- The storefront becomes the wizard's template: one codebase, N themes,
  merchant-configurable — the exact seam the wizard writes to.
- Font-licensing risk removed for the productized distribution.
- Two maximally different presets exercise the schema's real range and
  expose minimal-shaped assumptions in components before merchants do.
