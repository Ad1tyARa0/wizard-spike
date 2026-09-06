# Standardize Icon Sizes

## Why

Icon sizes are currently ad hoc: the header menu/search icons render at 24px while the cart icon renders at 32px, and the drawer close renders at 24px — three different literals with no governing scale. The store owner asked why the cart icon differs from the others and wants icon sizes standardized across the app, with a predefined size scale (s / m / l) used based on requirement, consistent with the config-driven token system (colors, motion, etc. are all theme-updatable tokens).

## What Changes

- The Theme capability gains an `icon-size-scale` requirement: a predefined `sm` / `md` / `lg` icon-size group in the central token set, theme-configurable via presets or `design` config overrides.
- Token plumbing: `theme-types.ts` (`IconSizeTokens` + `TokenSet.icon` + `DesignOverrides.icon`), both presets (`sm: 20px`, `md: 24px`, `lg: 32px`), `resolve-tokens.ts` merge, `css-vars.ts` emission (`--icon-sm` / `--icon-md` / `--icon-lg`), static `tokens.css` defaults, and the typed `tokens.ts` mirror.
- Components standardize on the scale: the header menu (list), search, and cart icon controls all render at `md` (24px), and the cart drawer close renders at `md`. No icon component keeps a size literal.
- The scale is documented in `design-system/e-commerce-website/MASTER.md`.

## Impact

- Header icons are visually consistent (all 24px) at every viewport.
- Icon sizes become part of the theme token contract: switching preset or overriding `design.icon` changes icon sizes without code edits.
- The additive config contract is preserved (new optional keys only); existing configs keep working unchanged.
