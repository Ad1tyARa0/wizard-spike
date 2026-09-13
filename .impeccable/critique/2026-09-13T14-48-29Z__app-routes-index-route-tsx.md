---
target: home page
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:/Users/adityarao/Projects/e-commerce-website/app/routes/_index/route.tsx"
target_fingerprint: "sha256:9e07253306c3b4aa568c30a61048155ad2421f5f6f1d0b1e54d7beffa34ffea0"
target_path: /Users/adityarao/Projects/e-commerce-website/app/routes/_index/route.tsx
timestamp: 2026-09-13T14-48-29Z
slug: app-routes-index-route-tsx
closed: true
---
Method: dual-agent (A: ses_f64c4dff8ffe77Oe41yi9sVc60 · B: ses_f64c4d81effemK9mq8mdnLYXfe)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Skeleton/CLS craft is strong, but the hero CTA has no hover/press state and the recommended count slot is blank until deferred data resolves |
| 2 | Match System / Real World | 2 | "Recommended" is the 4 newest products; "Featured Collection" is the most recently updated collection; "04 items" is template-speak |
| 3 | User Control and Freedom | 3 | No traps; overlays close; but the hero CTA's destination is unannounced |
| 4 | Consistency and Standards | 2 | Hero CTA is plain text while "View collection" gets underline + gold arrow; the documented shared-button standard is unimplemented |
| 5 | Error Prevention | 2 | A failed/empty recommended query leaves a heading over an empty grid |
| 6 | Recognition Rather Than Recall | 2 | The page's primary action has zero affordance — no border, underline, color shift, or uppercase |
| 7 | Flexibility and Efficiency | n/a | Persuade-mode home; no task-critical efficiency path |
| 8 | Aesthetic and Minimalist Design | 3 | Genuinely clean — single accent, no shadows, whitespace honored — but the invisible CTA and double numbering are noise |
| 9 | Error Recovery | 2 | Query failures are swallowed to console; shopper sees blank space, no message or retry |
| 10 | Help and Documentation | n/a | Landing surface; footer policy links cover the only need |
| **Total** | | **19/32 (59%)** | **Acceptable — significant improvements needed** |

## Design Specificity Verdict

**LLM assessment:** Structurally authored, visually category-interchangeable. The derived 01/02/03 numbering and the skeleton craft are genuinely authored. But Montserrat/Cormorant + black/white/gold is stock luxury-minimal vocabulary, and the binding "Exaggerated Minimalism" statement type never appears above the fold — the h1 is `sr-only`, so the fold is image + 13px eyebrow + a plain text link. It could be a portfolio or a restaurant. The multi-tenant constraint explains brand-agnosticism, not the absence of any visible commerce signal at the fold.

**Deterministic scan:** 0 findings across 7 scans (exit 0), including an expanded pass over the home-surface widgets and `--no-config`. Sanity fixtures with gradient text, glows, empty `src`, and 8px text produced 8 findings, proving the engine works. The detector correctly left the decorative hero image and `sr-only` h1 alone. Coverage caveat: styling lives in class-driven CSS, which the CLI doesn't scan — so the issues below are judgment-level (affordance, hierarchy, contrast, semantics), not rule-level.

**Visual overlays:** none — no browser tool in this harness, so no overlay was injected.

## Overall Impression

The commerce core is disciplined and the loading choreography is better than most shipped storefronts. The problem is that the page's peak — the hero and its one action — is its quietest, least-affordanced moment, and the recent strip of button styles turned a documented spec into an invisible CTA. Biggest opportunity: make the hero's action unmistakably an action again.

## What's Working

1. **Config-aware numbering** — `statementIds` filters hidden sections before numbering (`route.tsx:90–98`), so 01/02/03 stay honest when a merchant reorders or hides sections.
2. **Loading craft** — skeleton mirrors card anatomy (4:5 media + meta rows), whole header renders behind a three-zone skeleton; deferred errors are caught so the page still 200s.
3. **Product card execution** — enforced 4:5 crop over Hydrogen's inline ratio, pinned baseline-aligned name/price row, tabular figures.

## Priority Issues

**[P0] The primary hero CTA has no button affordance whatsoever.**
`ButtonLink` is a bare passthrough and no CSS styles `.home__hero-cta` beyond color/width. With `a { text-decoration: none }`, it renders as plain sentence-case text — no border, padding, uppercase, min-height, hover, or press state, and it's a raw `<a>` so it loses React Router prefetch the featured CTA gets. The hero's single conversion path is invisible.
**Fix:** style the primitive (uppercase, ≥44px, 1px `currentColor` border, radius token, hover invert, focus ring) or add the equivalent class to the hero CTA; use `Link` for internal hrefs. → `polish`

**[P1] The hero has no visible statement on the default merchant state.**
The h1 is unconditionally `sr-only`; eyebrow/sub are optional and empty in the minimal preset. A merchant with no cover image and no wizard copy ships a blank fold whose only content is a text link — and the design language's giant display type never appears.
**Fix:** render the statement as visible display type when there's no hero media (falling back to `shop.name`); keep `sr-only` only as the deliberate media-hero variant. → `shape`

**[P1] Contrast commitments are not met.**
(a) `--color-ring: #d4af37` is ~2.1:1 on white — the focus ring fails the 3:1 non-text requirement. (b) The hero scrim's mid-band (38% black) sits where the centered eyebrow lands — ~2.7–3.3:1 over a bright photo, contradicting home.md's "≥4.5:1 over any photo". (c) Gold index numerals are ~2.1:1 on white.
**Fix:** darker/two-tone ring on light surfaces; strengthen the mid scrim or add a text plate; raise accent contrast for small text. → `harden`

**[P2] Section labels don't match their data, and sections can duplicate each other.**
"Recommended" is newest-4; "Featured Collection" is most-recently-updated — so both grids will often show the same products. "04 items" is developer copy.
**Fix:** implement real selection (config `featuredCollectionHandle`, Shopify recommendations) or relabel honestly ("New in") and dedupe; replace the count copy. → `clarify`

**[P2] Post-removal states and rhythm were not re-tuned.**
After removing hairlines: 24px column gap against 128px row gap reads as leftover spacing; product cards' only hover cue is `scale(1.02)`, which reduced-motion disables, leaving zero hover feedback; empty recommended renders a heading over blank space.
**Fix:** rebalance the grid gaps for whitespace-only separation; add a non-motion hover cue; add a proper empty/error state. → `layout`

## Persona Red Flags

**Casey (mobile):** hero CTA is a ~26px-tall line of text (under the 44px target) that doesn't look tappable; hero `<img>` has no `srcset`, so a ≥2000px asset loads on her phone; header search/cart sit outside the thumb zone.
**Jordan (first-timer):** no visible headline says what store this is; "Shop now" doesn't look like a link; icon-only header controls; "Recommended"/"04 items" are unexplained system language.
**Maya (merchant, from PRODUCT.md):** with preset defaults her day-one fold is blank whitespace; she can't choose the featured collection; she can't fix the CTA from the wizard (colors/tokens only); her `<title>` ships as "Hydrogen | Home" — template truth, not hers.

## Minor Observations

- `meta` hard-codes "Hydrogen | Home" instead of `shop.name`.
- Product titles are `h4` under `h2`, skipping h3.
- Numbering loses "01" when `eyebrow` is unset — first visible numeral is "02".
- Hero `<img>` lacks `width`/`height` and responsive sources.
- Marquee is dead code on the shipped minimal home.
- Docs drift: home.md still specifies hairline separators and a hollow/hover-invert CTA; MASTER.md describes a button spec that exists nowhere in code.

## Questions to Consider

- If Exaggerated Minimalism is the binding style, why is the home page's only statement invisible?
- Is "Recommended" a real feature or a placeholder label?
- After removing hairlines, is 24px against 128px the composition you'd choose, or leftover spacing?
- Should a fresh merchant with a catalog but no cover image see a blank hero?

## Run Notes

Target slug `app-routes-index-route-tsx`; ignore list: none; assessments independent (dual-agent, isolated); CLI detector: 7 scans, 0 findings, sanity fixture proved function; browser visibility: skipped (no browser tool exposed); overlay injection: skipped; live server: not started; fallback: CLI + source review; temp fixtures cleaned.
