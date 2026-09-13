---
target: home page
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/adityarao/Projects/e-commerce-website/app/routes/_index/route.tsx"
target_fingerprint: "sha256:31f696646f67dde0e40642c5a874691aa1af9d8e2c7d13dd27bfa1e523e79cac"
target_path: /Users/adityarao/Projects/e-commerce-website/app/routes/_index/route.tsx
timestamp: 2026-09-13T15-38-03Z
slug: app-routes-index-route-tsx
---
Method: dual-agent (A: ses_f64980dd0ffe39LBW2x3LN09RI · B: ses_f649809bcffeS7PU8bhcD7aFUX)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Skeleton/count CLS craft good; loading skeleton not announced; no scroll cue on full-viewport hero |
| 2 | Match System / Real World | 3 | "New arrivals" labels UPDATED_AT-sorted products, not newest-created; 01/02/03 have no shopper meaning |
| 3 | User Control and Freedom | 3 | No traps; 100svh hero is a wall with no skip/scroll affordance |
| 4 | Consistency and Standards | 3 | Cohesive, but media hero's index stays gold while other meta text flips; Button stamps CTA chrome on non-CTA controls app-wide |
| 5 | Error Prevention | 3 | Dedupe + deferred catches good; critical featured query has no protection |
| 6 | Recognition Rather Than Recall | 3 | Conventional controls; numerals require interpretation |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 3 | Disciplined; eyebrow orphaned at far edge, accent nearly invisible |
| 9 | Error Recovery | 2 | Section error has no retry; critical failure drops shoppers into raw Oops/500/<pre>{error}</pre> |
| 10 | Help and Documentation | n/a | Persuade surface |
| **Total** | | **23/32 (72%)** | **Good — was 24/32** |

## Design Specificity Verdict

**LLM assessment:** Authored system, interchangeable page — faithful to a distinctive system (giant type, editorial numerals, whitespace, hollow CTA) but nothing on the rendered page is specific to a product or category. Two sharp edges: the signature giant statement renders only when there is no hero image, so the likely production state (brand cover image) gets no display type at all; and the accent has nearly vanished (one 20px arrow + 13px numerals), weakening the "merchant changes colors" promise.

**Deterministic scan:** 0 findings across 3 passes; sanity probes fired correctly inside the exact scan roots; no config suppression or inline waivers; nonexistent path exits 1, proving exit 0 means real scans. CSS-only files aren't covered by design.

**Visual overlays:** none — no browser tool.

## Overall Impression

The text hero is genuinely confident, and state craft remains above typical. The regression is real: the bolder pass made the hero numeral unreadable over photos and exposed that the signature move disappears whenever a merchant uploads an image. Biggest opportunity: let the giant statement survive hero media.

## What's Working

1. **The text hero is genuinely confident** — clamp(3rem, 10vw, 12rem), 0.88 leading, 12ch measure, balanced wrap.
2. **State craft** — skeleton mirrors card anatomy, count reserves 8ch, empty/error states link onward, hero image eager/high-priority with real srcset, reduced motion honored, focus ring flips over the scrim.
3. **Config integrity** — derived numbering, live shop-data fallbacks (no demo copy), ButtonLink routes internal hrefs through Link with prefetch.

## Priority Issues

**[P1] Gold index numeral fails contrast over the hero photo.**
.home__hero-index explicitly sets --color-accent-strong, so it doesn't inherit the on-primary flip applied to the rest of the meta row. Against the top scrim (62% black) over a white photo it's roughly 1.1–1.3:1 at 13px — and the spec's "meta text flips to on-primary" is false for it.
**Fix:** .home__hero--media .home__hero-index { color: var(--color-on-primary); } (or a scrim-safe accent token). → colorize

**[P1] One merchandising query failure takes down the entire home page.**
The featured collection is awaited in loadCriticalData; any Storefront API error throws to the root boundary, which renders raw Oops / 500 / <pre>{error.message}</pre>. A storefront home must never die because one collection query failed.
**Fix:** catch the featured query like the recommended one and render a section-level fallback, or add a friendly route-level boundary with a catalog link; never print raw error bodies. → harden

**[P2] With a hero image, the signature giant type is invisible.**
sr-only whenever content.image exists, so production shops with a brand cover never see display type — contradicting MASTER's own "giant display type present on statement/hero sections."
**Fix:** render the statement visibly over media (the scrim already guarantees contrast) or at minimum at --type-display. → bolder

**[P2] Hero meta row detaches the eyebrow from its numeral.**
space-between puts "01" far left and "New Collection" far right (~1300px apart at 1440); the wireframe groups them as 01 — New Collection and uses the right edge for a second meta item that has no config key.
**Fix:** group index + eyebrow left; spread only when a real right-side item exists. → layout

**[P2] "New arrivals" self-empties on small catalogs, and docs promise otherwise.**
Top-4 UPDATED_AT minus featured products commonly filters to nothing, so the section shows "on the way" under a featured grid — while home.md:79 still documents a full-list fallback.
**Fix:** fetch more candidates (8–12) or a genuinely different slice; align the doc. → shape

## Persona Red Flags

**Casey (mobile):** hero can push the CTA below the fold with no scroll cue; eager full-size LCP asset on slow connections; skeleton→empty transition can land mid-scroll.
**Riley (edge cases):** long shop names break mid-word at giant scale; all-deduped section is a dead end; non-Shopify hero URLs get Shopify query params appended (can break signed URLs despite the docs inviting "your own host"); API failure exposes raw error text.
**Jordan (first-timer):** icon-only controls; unexplained 01/02/03; "New arrivals are on the way" says nothing concrete; no visible help/contact path.

## Minor Observations

- Docs drift (three places): home.md:24 still says the meta row only renders with an eyebrow; home.md:79 still describes the dedupe fallback; home-body-wireframes.html still shows a gold-filled CTA and hairline cells, and its caption contradicts the hollow CTA.
- Button now applies .btn to every button — cart quantity steppers get 44px CTA chrome; consider a variant.
- Duplicate aria-labelledby="featured-collection-title" on section + inner div.
- Heading jump h2 → h4 in product cards.
- product-item sizes under-serves 2-up (~567px) and over-fetches 4-up.
- Pending-nav --color-muted ~2.3:1, even if transient.
- Footer fallback is policies only; no trust content or closing action.
- Sample marquee copy is snack-brand while minimal omits the marquee.

## Questions to Consider

- If hero media is the production norm, why does the signature statement render only without it?
- What does "01" mean to a shopper?
- Would anyone see a wizard accent-color change?
- Which failures deserve page-level treatment vs section-level?

## Run Notes

Target slug app-routes-index-route-tsx; ignore list none; dual-agent isolated; detector 3 clean passes with sanity proof, no suppression; browser skipped (no tool); overlay skipped; no live server; fallback CLI + source; probes cleaned.
