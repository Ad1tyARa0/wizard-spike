# Standardize Button Component — Tasks

## Spec

- [x] Add the button requirements to the Theme capability (this change's delta):
      `shared-button-primitive`, `hollow-button-appearance`,
      `button-shimmer-animation`, `button-radius-token`, `button-link-parity`,
      `button-motion-accessibility`

## Token plumbing

- [x] `theme-types.ts`: `RadiusTokens.button`
- [x] `presets/minimal.ts`: `radius.button: '4px'`; `presets/playful.ts`: `radius.button: '0'`
- [x] `tokens.css`: static `--radius-button: 4px` default (emitted as `--radius-button`)
- [x] `tests/css-vars.test.ts`: assert `--radius-button` for both presets
- [x] `design-system/e-commerce-website/MASTER.md`: document the button + radius

## Component

- [x] `shared/ui/button/button-shimmer.tsx` — shared internals (class-name builder, CSS-var style, shimmer markup), `aria-hidden`
- [x] `shared/ui/button/button.tsx` — `Button` (button element)
- [x] `shared/ui/button/button-link.tsx` — `ButtonLink` (anchor)
- [x] `shared/ui/button/index.ts` + re-export from `shared/ui/index.ts`
- [x] Props: `shimmer` (`hover` default / `always` / `none`), `shimmerColor`,
      `shimmerSize`, `shimmerDuration`, `background`
- [x] No `borderRadius` prop — the radius comes from the token
- [x] No `size` prop — one size app-wide (44px minimum target)
- [x] `type` defaults to `button`; every submit site passes `type="submit"` explicitly

## Styles (plain CSS, no Tailwind)

- [x] `.btn` base — hollow (transparent fill, 1px `currentColor` border), `--radius-button`, no shadow, uppercase label
- [x] `.btn__shimmer` / `.btn__shimmer-slide` / `.btn__shimmer-spin` / `.btn__backdrop` ported from the Tailwind classes (container-type size, `100cqh`, conic-gradient, blur)
- [x] Ring mask on `.btn__shimmer` (`mask-clip: content-box` + `mask-composite: exclude`, `-webkit-` longhands first) so the dot is visible only along the border and the hollow face stays clean — upstream confines it with an inset copy of its opaque fill
- [x] Dot hugs the border from **outside** it and never paints inside the button: `inset: calc(-1 * (var(--border-width) + var(--btn-shimmer-size)))` with the rim the same width, so the dot is a band `shimmerSize` thick outside the border — and **no `overflow` clip on `.btn`**, because the ring sits outside the padding box where any clip erases it unless `overflow-clip-margin` is honoured (not reliable); the ring mask alone confines the dot and the shimmer element's own `overflow: hidden` rounds its contour
- [x] No hover/focus fill or tint on the surface — the dot is the only hover feedback; the keyboard focus ring stays
- [x] Dot colour defaults to `currentColor` (the border colour) and the conic gradient holds a solid core with falloff at both ends (soft floating dot, no hard trailing cut)
- [x] `.btn__backdrop` at `inset: 0` — the padding box is exactly where the rim's inner edge lands, so a filled surface meets the rim with no gap
- [x] `@keyframes btn-shimmer-slide` + `@keyframes btn-shimmer-spin`
- [x] `shimmer="hover"` pauses + hides the sweep until `:hover` / `:focus-visible` / `:active`
- [x] Disabled state: no animation, muted cursor; `:focus-visible` ring; active press nudge
- [x] `prefers-reduced-motion: reduce` renders the button static
- [x] Delete the replaced ad-hoc rules (`.product-form button`, `.cart-discount button`, `.cart-line-quantity button`, `.order-search-buttons button`, `.home__hero-cta` chrome, playful radius override)

## Standardization

- [x] `features/product-form/add-to-cart-button.tsx` (AddToCartButton)
- [x] `features/search/search-form.tsx` doc example + `routes/search/route.tsx`
- [x] `widgets/cart/cart-line-item.tsx` (decrease/increase/remove)
- [x] `widgets/cart/cart-summary.tsx` (discount remove/apply, gift card apply/remove — incl. the callback ref)
- [x] `widgets/page-layout/page-layout.tsx` (predictive-search aside trigger)
- [x] `routes/_index/route.tsx` hero CTA → `ButtonLink`
- [x] `routes/account/route.tsx` (sign out), `routes/account/profile.tsx` (update)
- [x] `routes/account/orders/index.tsx` (search/clear), `routes/account/addresses.tsx` (create/save/delete)
- [x] No ad-hoc `<button>` text CTAs remain — only the intentional exclusions:
      icon-only controls (`.reset`/`.header-icon-button`: header menu/search/cart,
      drawer close, drawer backdrop, aside close-outside) and product variant chips

## Verification

- [x] `bun run typecheck` clean
- [x] `bun run lint` clean (oxlint + FSD boundaries + filenames)
- [x] `bun test` passes 40/40 (incl. the new `--radius-button` assertions, 220 expects)
- [x] `bun run check:specs` passes; this change's `spec.md` matches the same
      requirement/scenario grammar (6 requirements, all with ≥2 WHEN/THEN scenarios)
- [x] `prettier --check` clean on every changed file
- [x] `bun run lint:circular` — no circular dependency
- [x] `npx shopify hydrogen build --path .` succeeds; the built stylesheet carries
      `.btn*`, `--radius-button`, `container-type: size`, `100cqh` and both keyframes
- [x] Rendered-markup check against a live dev server: hero CTA renders
      `<a class="btn btn--shimmer-hover home__hero-cta">` + shimmer layers;
      Add to cart renders `<button class="btn btn--shimmer-hover" type="submit">`;
      `/`, product, `/search`, `/cart`, `/collections/all` all 200 with no server errors
- [x] Compiled-CSS invariants: zero `box-shadow` in any `.btn*` rule, hollow surface
      declarations present, hover gating + reduced-motion block present
- [ ] **Owner visual check** — pixel-level appearance in a browser: hollow look,
      4px corners, hover sweep, no shadow, `playful` preset square corners
      (headless Chrome hangs in the agent sandbox, so this was verified by
      compiled CSS + rendered markup, not by screenshot)
