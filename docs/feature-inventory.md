# Feature Inventory & Status

Status of the planned feature set against the actual codebase (this is a
tracker, not an OpenSpec requirements contract — those live in
`openspec/specs/<capability>/spec.md`).

Legend:

- ✅ **Implemented** — present and functional in the codebase.
- 🟡 **Partial** — scaffolded or only part of the feature exists.
- ⚠️ **Requires setup** — code is present but needs Shopify/external config to work.
- ❌ **Not implemented** — no code for it.

> Note on the roadmap's `✅` marks: several are inaccurate (see "Discrepancies"
> at the bottom). This inventory reflects what the code actually contains.

---

## 1. Catalog & product detail

- ✅ Product listing + pagination — `routes/collections/all.tsx`, `routes/collections/$handle.tsx`, `widgets/paginated-resource-section`
- ✅ Product detail page (PDP) — `routes/products/$handle.tsx`
- ✅ Variant selection (size/color) — `features/product-form`
- ✅ Variant-specific images — `selectedVariant.image` on the PDP (single image)
- ❌ Image gallery / zoom / video — only a single `ProductImage`
- 🟡 Inventory awareness — low-stock "Only N left" (`quantityAvailable`) + "Sold out" (`availableForSale`); back-in-stock notification still out of scope (needs a Shopify app)
- ❌ Size charts / fit guidance
- ❌ Bundle products
- 🟡 Combined listings — template-default `isDifferentProduct` handling in `ProductForm`
- ❌ Product comparison table
- ❌ Custom options (engraving, configurator)
- ❌ Pre-order / made-to-order
- ❌ Cross-sell "pairs well with"

## 2. Discovery & navigation

- ✅ Predictive / typeahead search — `features/search` (`SearchFormPredictive`, `SearchResultsPredictive`)
- ✅ Search results page — `routes/search/route.tsx`
- ❌ Faceted filtering — collections render title + products only
- ❌ Sorting — no sort UI; only default GraphQL `sortKey`
- 🟡 Mega menu / merchandised nav — `HeaderMenu` is a basic nav, not a mega menu
- ❌ Breadcrumbs
- ❌ Recently viewed
- ❌ Product recommendations — home "recommended" is just `products(first:4, sortKey: UPDATED_AT)`
- 🟡 Infinite scroll / load-more — "Load more" pagination button, not infinite scroll
- ❌ Advanced search engine (Algolia / Klevu / SearchSpring)
- 🟡 No-results handling — `SearchResults.Empty` exists; no synonyms
- ❌ Search synonyms

## 3. Cart & checkout

- ✅ Server-side cart — Hydrogen `context.cart`
- ✅ Cart drawer — `features/cart-drawer`
- ✅ Cart page — `routes/cart/route.tsx`, `widgets/cart`
- ✅ Quantity editing / line removal — `CartForm` actions
- ✅ Discount codes — `cart/route.tsx` action + `routes/discount/$code.tsx`
- ✅ Cart persistence across sessions — `app/listener-middleware.ts` (cart-id → localStorage)
- ❌ Shipping estimate in cart
- ✅ Checkout handoff — checkout domain via `root.tsx` consent
- ✅ Guest checkout — Shopify-hosted checkout default
- ❌ Express checkout (Shop Pay / Apple Pay / Google Pay)
- ❌ BNPL (Klarna / Affirm / Afterpay)
- 🟡 Order status / tracking — order detail exists; no shipment tracking
- ❌ Abandoned cart recovery
- ❌ Post-purchase upsell
- ❌ One-click reorder

## 4. Customer accounts

- ⚠️ Login / logout / OAuth — `routes/account/{login,logout,authorize}` via Customer Account API; **requires setup** (public domain + store config, see README) and has no visible header entry point
- ⚠️ Order history + detail — `routes/account/orders` + `entities/customer`; **requires setup**
- 🟡 Profile / addresses — `routes/account/{profile,addresses}` + `customer-address-mutations`; **requires setup**

## 5. Merchandising / personalization

- 🟡 Featured / curated rails — home hero + featured-collection band (hardcoded sort)
- ❌ Product recommendations
- ❌ Cross-sell / upsell blocks
- ❌ Recently viewed
- ❌ Personalized ranking per visitor

## 6. Trust & conversion

- ❌ Reviews and ratings
- ❌ Press / social proof logos
- ❌ Live chat or AI support
- ❌ FAQ page

## 7. Content / CMS

- ✅ Blog + article pages — `routes/blogs/*`
- ✅ Static pages — `routes/pages/$handle.tsx`
- ❌ Rich media / video blocks

## 8. Marketing & lifecycle

- ❌ Loyalty program
- ❌ Referral program
- ❌ Affiliate tracking

## 9. Analytics

- ✅ Shopify analytics — `Analytics.Provider` + `ProductView` / `CollectionView` / `SearchView`
- ❌ GA4 / GTM

## 10. SEO & performance

- ✅ robots.txt — `routes/[robots.txt]/route.tsx`
- ✅ Sitemap — `routes/sitemap/*` (`sitemap.xml` + paged)
- ❌ Redirect map for legacy URLs
- ❌ Core Web Vitals budgets
- ❌ AI-agent discovery (`/llms.txt`, `/.well-known/ucp`, `/sitemap_agentic_discovery.xml`)

## 11. AI / personalization

- ❌ Personalized AI recommendations

## 12. International & operations

- ❌ Multi-language / locale routing — i18n hardcoded `EN` / `US`
- ❌ Markets segmentation
- 🟡 WCAG 2.2 AA — theme spec requires contrast/focus/reduced-motion; not a full audit
- ❌ Accessibility statement
- ❌ CCPA / GDPR data request path
- ✅ PCI compliance — via Shopify checkout

---

## Discrepancies vs the roadmap marks

- **Login / auth is in the code** (`routes/account/*`, `entities/customer`) but is
  marked ✅ without being visible: it needs the Customer Account API setup step
  (README → step 1–2) and currently has **no sign-in entry point in the header**.
- **Faceted filtering**, **sorting**, and **image gallery/zoom/video** are marked
  ✅ in the roadmap but have **no implementation** (collections are bare
  list+description; the PDP shows a single image).
- **Product recommendations** is marked but only exists as a "new arrivals"
  query, not a real recommendation engine.

## How the code is organized (vs the roadmap)

The roadmap groups by customer-facing area (catalog, discovery, cart, …). The
code is organized by **Feature-Sliced Design** layers (`app` / `routes` /
`widgets` / `features` / `entities` / `shared`) and **domain slices**
(`entities/cart`, `entities/product`, `entities/customer`, `entities/theme`,
`features/cart-drawer`, `features/product-form`, `features/search`). A single
roadmap area maps across several slices — e.g. "cart & checkout" spans
`routes/cart`, `entities/cart`, `features/cart-drawer`, `widgets/cart`, and
`app/listener-middleware.ts`.
