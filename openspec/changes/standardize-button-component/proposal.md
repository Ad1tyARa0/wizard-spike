# Standardize Button Component

## Why

Buttons are the storefront's most repeated control and currently have no owning
component. Each call site renders a bare `<button>` and inherits its look from
scattered CSS selectors (`.product-form button`, `.cart-discount button`,
`.cart-line-quantity button`, `.order-search-buttons button`), the hero CTA is a
separate hand-rolled `.home__hero-cta` anchor, and account routes fall back to
the bare `button` element rule. The store owner dislikes how the buttons look,
wants a single reusable button used across the app, and wants it to carry the
shimmer animation from Magic UI's `ShimmerButton` — but with three deliberate
changes: a 4px corner radius instead of a pill, no shadow (a hollow, minimal
surface), and a prop that toggles the always-on animation so it can run on hover
only.

## What Changes

- **New primitive `shared/ui/button/`** — `Button` (button element) and
  `ButtonLink` (anchor) sharing one implementation, one CSS contract, and one
  public API (`~/src/shared/ui`). The primitive owns: hollow appearance, the
  4px radius, the shimmer, the label type, and the disabled, focus and pressed
  states. One size for the whole app (44px minimum target) — not a size scale.
- **Shimmer ported from Tailwind to plain CSS** — the Magic UI effect
  (conic-gradient arc + slide/alternate + spin keyframes, container-query sized)
  is rewritten as tokens-driven CSS in `shared/styles/app.css`. The upstream
  version injects a `<style>` element per instance and hard-codes hex colors;
  this port emits no per-instance style tag and colors from theme tokens.
- **The sweep stays on the border** — upstream hides the arc behind an inset
  copy of its _opaque_ fill, so only a thin rim of it shows and the effect reads
  as a bright spot travelling the perimeter. A hollow face would expose the whole
  arc as a colored wash across the button, so the rim is rebuilt with a ring mask
  (`mask-composite`) sized by `shimmerSize` (2px default) — same visual, hollow
  face.
- **`shimmer` prop with hover-only default** — `'hover' | 'always' | 'none'`.
  `'hover'` (default) keeps the animation dormant until hover, keyboard focus,
  or press; `'always'` is the upstream always-running behavior; `'none'`
  removes the effect. `prefers-reduced-motion: reduce` disables it entirely.
- **No shadow, hollow surface** — the upstream inner-highlight (`shadow-[inset…]`)
  and any drop shadow are dropped. The button is transparent with a 1px border
  in `currentColor`, so it inverts correctly on dark or photo backgrounds. The
  `playful` preset keeps composing its own hard offset shadow + rotation on the
  hero CTA — that is that preset's design language, not the primitive's.
- **`radius.button` token (4px)** — the corner radius becomes part of the
  config-driven token set (`--radius-button`), so presets and `design.radius`
  overrides change it without code edits. The `playful` preset sets it to `0`.
- **Every text CTA standardized** — product form/add-to-cart, cart line
  quantity and remove, cart discount and gift card actions, search, sign out,
  account profile/orders/addresses, and the home hero CTA all render the new
  primitive. Existing ad-hoc button CSS rules are deleted rather than left
  alongside it.

## Impact

- **One look, one place to change it.** Restyling every CTA in the app becomes a
  change to `shared/ui/button/button.tsx` + its CSS section, not a hunt across
  selectors and routes.
- **Theme contract grows additively** (`radius.button`); existing configs keep
  working, and the `playful` preset stays square-cornered via the token.
- **A11y:** hover-only shimmer also triggers on `:focus-visible` and `:active`
  (touch and keyboard users see it), `md` keeps a 44px minimum target, the
  focus ring uses `--color-ring`, and reduced-motion users get no animation.
- **Deliberate exclusions (unchanged):** icon-only controls that carry no button
  chrome (header menu/search/cart, aside close — `.header-icon-button`/`.reset`)
  and the product variant chips (`.product-options-item`, a selection control
  with selected state). They are not CTAs and are documented as out of scope.
- **Architecture:** the new module follows the `shared/ui` kebab-case
  folder + `index.ts` rule required by the pending
  `group-widget-modules-into-folders` change; no new layer or slice boundaries.
