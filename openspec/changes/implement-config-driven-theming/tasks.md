# Implement Config-Driven Theming — Tasks

## 1. Config schema & loader

- [ ] `app/src/shared/config/schema.ts` — zod schema v0.1: `theme` (preset union), `design` (token overrides: colors/fonts/type/radii/spacing), `layout` (flags: headerStyle, gridDensity, homeSectionOrder), `content` (nav, footer, hero, marquee arrays), `integrations`, `ai`
- [ ] `app/src/shared/config/defaults.ts` — minimal preset defaults (mirror current tokens.css/tokens.ts values)
- [ ] `app/src/shared/config/loadConfig.ts` — read + validate `hydrogen.config.json` (project root); malformed/missing → defaults; strict additive contract documented in schema comments
- [ ] Unit tests: valid config parses; malformed falls back; unknown keys tolerated; partial overrides merge onto defaults

## 2. Runtime token resolution

- [ ] `app/src/shared/config/resolveTokens.ts` — pure `resolveTokens(defaults, preset, overrides) → ResolvedTokens` (no rendering, fully testable)
- [ ] `app/src/shared/styles/tokens.ts` — becomes the typed mirror of resolved tokens (`createTokens(config)`); existing exports become the minimal preset defaults
- [ ] Root loader (`app/root.tsx`) — loads config, resolves tokens, emits CSS custom properties on `:root` (runtime merge; no build-time codegen)
- [ ] Preview seam: non-production loader accepts a request-time config override (query param/header); production ignores it
- [ ] Unit tests: resolver purity, override precedence (defaults ⊕ preset ⊕ overrides), preview override honored only in non-production

## 3. Minimal preset — config-ification

- [ ] Move current hard-coded token values into the minimal preset defaults; tokens.css/tokens.ts consume them via the resolver
- [ ] Audit `app/src/shared/styles/app.css` + widgets for literal values that bypass tokens (theme spec: no literals in components)
- [ ] Verify: `hydrogen.config.json` with `theme: "minimal"` renders visually identical to today's storefront

## 4. Playful DTC preset

- [ ] Persist `design-system/e-commerce-website/PLAYFUL-DTC-MASTER.md` — adapted from the Partake Foods reverse-engineered spec: palette (cream `#fff6eb`, paired hues incl. magenta `#be008b`, indigo-navy ink `#181B48`), radii (2rem cards, pill badges, 0px buttons), motion (marquee durations, sticker hover), copy voice, section architecture
- [ ] Font swap (licensing): Archivo Black (display) / Anton (condensed subheads+marquee) / Fredoka (headings) / Manrope (body) — Google Fonts; fallback stacks; remove any proprietary faces
- [ ] `app/src/shared/config/presets/playful.ts` — full token set + layout defaults + content defaults for the preset
- [ ] `app/src/widgets/marquee/` (or feature per FSD) — first-class marquee section: content array, direction, speed (fast/default/slow), pause-on-hover, reduced-motion → static
- [ ] `app/src/shared/ui/sticker-hover` — tilt + hard offset shadow primitive (accent-token-driven); reduced-motion → no transform
- [ ] Banded sections: `PageLayout`/section wrapper renders full-bleed wash bands with zero section spacing under playful layout defaults
- [ ] Playful header/grid variants wired to layout flags (see §5)
- [ ] Content defaults: playful nav/footer/hero/marquee copy arrays (copy-first voice)

## 5. Layout variant flags

- [ ] Flag plumbing: headerStyle (`minimal` slim sticky / `playful` chunky banded), gridDensity (compact/comfortable), homeSectionOrder (array in config)
- [ ] Widgets consume flags per FSD (no business logic in widgets; flags passed from config)
- [ ] Verify both presets render all routes without breakage (preset-parity)

## 6. Verification

- [ ] `bun run typecheck` clean
- [ ] `bun run lint` + `lint:fsd` + `lint:filenames` + `lint:circular` clean
- [ ] Contrast: computed WCAG AA check over both presets' token palettes (ink on cream, ink on each wash)
- [ ] Preset-parity: every route renders under `minimal` and `playful` without layout overflow (320/768/1024/1440)
- [ ] Reduced-motion: marquee static + sticker hover disabled under `prefers-reduced-motion`
- [ ] `bun run check:specs` clean
- [ ] Preview deploy: branch preview shows both presets; config override via preview seam renders without a rebuild
- [ ] Archive this change once the wizard can write `hydrogen.config.json` and the template re-themes from it
