# Shopify Hydrogen development

This storefront is scaffolded from Shopify's Hydrogen skeleton template. See the README for framework-specific details.

Use the [Shopify AI Toolkit](https://shopify.dev/docs/apps/build/ai-toolkit) for all Shopify API and platform work. If missing, install it in the agent host per that page (or `npx skills add Shopify/shopify-ai-toolkit --list` for skill-compatible hosts).

## Product decisions

Product decisions — features/scope, pricing, positioning, GTM, or architecture — follow the locked decisions in [`docs/product-vision.md`](docs/product-vision.md).

## Frontend architecture

Follow the Feature-Sliced Design conventions in [`docs/architecture.md`](docs/architecture.md). In particular, every module in `widgets/` and `shared/ui/` lives in its own kebab-case folder with a public `index.ts` — e.g. `widgets/header/` holds `header.tsx` + `header-skeleton.tsx`, `widgets/cart/` holds the cart widgets, `shared/ui/skeleton/` holds the skeleton primitives — and imports resolve through the layer's top-level public API (`~/src/widgets`, `~/src/shared/ui`).

## CSS & styling

Follow the CSS capability spec in [`openspec/specs/css/spec.md`](openspec/specs/css/spec.md) (adapted from the `css` skill): lowercase kebab-case class names, design tokens only (no hard-coded colors/fonts/spacing/radii), single-class specificity with no `!important` outside the documented reset exceptions, `gap`-based Flexbox/Grid layouts, `rem`/`clamp()` type, mobile-first `min-width` media queries, and presentational styles in stylesheets rather than inline `style` attributes. Visuals follow the 70/20/10 design system in [`design-system/e-commerce-website/MASTER.md`](design-system/e-commerce-website/MASTER.md).
