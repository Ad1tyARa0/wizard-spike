# Standardize Icon Sizes — Tasks

## Spec

- [x] Add `icon-size-scale` requirement to the Theme capability (this change's delta)

## Implementation

- [x] Add the icon-size group to the config-driven token set:
  - [x] `theme-types.ts`: `IconSizeTokens` (sm/md/lg) + `TokenSet.icon` + `DesignOverrides.icon`
  - [x] `presets/minimal.ts` + `presets/playful.ts`: `icon: { sm: '20px', md: '24px', lg: '32px' }`
  - [x] `resolve-tokens.ts`: merge the icon group (defaults ⊕ preset ⊕ overrides)
  - [x] `css-vars.ts`: emit `--icon-sm` / `--icon-md` / `--icon-lg`
  - [x] `tokens.css`: static `--icon-*` defaults; `tokens.ts`: typed mirror export
  - [x] `theme-schema.ts`: optional `icon` record in `designOverridesSchema`
- [x] Standardize components on the scale:
  - [x] Header: list, search, cart icon controls all render at `md` (24px)
  - [x] Cart drawer close `X` renders at `md` (24px)
- [x] Document the scale in `design-system/e-commerce-website/MASTER.md`

## Verification

- [x] `bun run typecheck` clean
- [x] `bun run lint` clean
- [x] `bun test` passes (existing group-coverage tests auto-cover the new group; `css-vars.test.ts` gained icon-token assertions)
- [x] Prettier clean on changed files
- [x] No icon size literals remain in component code (`size={24|32}` gone; all sizes come from `theme.tokens.icon.*`)
- [ ] Visual check: header icons identical size (24px) at all viewports
