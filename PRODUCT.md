# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary — shoppers:** customers of whichever merchant deploys this storefront. They arrive to browse the catalog, evaluate products, and check out; they never interact with the theme system.
- **Secondary — merchants:** Shopify sellers who pick a theme in the Layer 1 wizard and lightly adjust colors and design tokens. They are the buyers, but they are not the storefront's end user, and their wizard UX lives in a separate app.

## Product Purpose

A Hydrogen storefront codebase that ships multiple merchant-selectable themes from one shared implementation. A merchant picks a theme in the wizard and launches with their existing catalog; the design system and layout come from the theme, not custom development. Success means shoppers can browse and buy on any deployed store without the merchant ever hiring a developer.

## Positioning

One codebase, many themes, config-driven: merchants change colors and light design tokens from the wizard instead of touching code. Each theme must hold up for a wide range of sellers rather than expressing a single brand.

## Operating Context

- Catalog and content come from the merchant's existing Shopify store via the Storefront API.
- Theme selection and light overrides arrive through `hydrogen.config.json`; config resolves at runtime into CSS custom properties and layout flags.
- The Layer 1 wizard (separate app) writes the config and live-previews the storefront; deploys go to the merchant's own Oxygen hosting.
- The config follows an additive-only contract: minor releases add keys, never rename or remove.
- Current work prioritizes the **minimal** theme, which must be applicable to a wide range of sellers; the playful theme is the second preset.

## Capabilities and Constraints

- Shipped presets: `minimal` (Exaggerated Minimalism) and `playful` (Partake-inspired); v1 targets a third philosophy.
- Customization is limited and safe: preset choice plus light color/token/copy overrides and layout variant flags — not freeform composition.
- Fonts must be licensed for redistribution (Google Fonts only).
- Committed accessibility guardrails: body-text contrast ≥ 4.5:1, visible keyboard focus rings, `prefers-reduced-motion` respected.
- No merchant identity, brand, or real catalog is locked; the config copy and products are placeholders.

## Evidence on Hand

- Design languages documented in `design-system/e-commerce-website/` (`MASTER.md`, `pages/home.md`, `PLAYFUL-DTC-MASTER.md`, `home-body-wireframes.html`).
- Product and architecture docs in `docs/` and `openspec/changes/`; wizard product spec at `~/research/hydrogen-storefront-wizard-spec.md`.
- Absent, and future work must not fabricate: real merchant copy, brand assets, customer testimonials, sales or benchmark data.

## Product Principles

1. One storefront, many themes: every theme shares the same codebase and commerce logic; theming is config, never a fork.
2. Shoppers lead: storefront surfaces are judged by browsing and buying success first.
3. The minimal theme proves breadth: it must feel considered for any seller, not one niche.
4. Customization stays safe: merchants adjust presets, tokens, and copy — never code.
5. Placeholder is not truth: never present demo copy, imagery, or claims as real.

## Accessibility & Inclusion

No product-specific standard beyond the committed design guardrails: ≥ 4.5:1 body contrast, visible focus, reduced-motion support, keyboard-operable controls.
