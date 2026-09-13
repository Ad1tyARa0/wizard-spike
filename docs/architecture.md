# Architecture

This storefront follows **Feature-Sliced Design (FSD)** on top of Shopify
Hydrogen (React Router 7). Requirements live in `openspec/specs/` — the
`architecture` capability is the binding contract for everything below.

## Stack

| Concern                   | Choice                                                |
| ------------------------- | ----------------------------------------------------- |
| Framework                 | Shopify Hydrogen `2026.4.5` (React Router 7.16)       |
| UI                        | React 19.2                                            |
| Language                  | TypeScript (strict)                                   |
| Client state              | Redux Toolkit 2.12 + `createListenerMiddleware`       |
| Styling                   | Plain CSS with design tokens (Exaggerated Minimalism) |
| Icons                     | `@phosphor-icons/react`                               |
| Package manager / runtime | Bun                                                   |
| Bundler                   | Vite 8 (via Hydrogen)                                 |
| Sample data               | mock.shop (`.env`)                                    |

## FSD layer map

```
app/                        # Hydrogen/React Router shell (convention-fixed)
├── root.tsx                #   root layout (loaders, fonts, PageLayout)
├── entry.client.tsx        #   client bootstrap — Redux Provider mounted here
├── entry.server.tsx
├── routes.ts               #   route bootstrap: hydrogenRoutes([...routeManifest])
├── route-manifest.ts       #   explicit route table (URLs → route modules)
├── routes/                 #   PAGES layer — feature folders (FSD pages)
└── src/
    ├── app/                # app layer: store, listener-middleware, root-reducer, context
    ├── entities/           # domain models + slices + api clients (each slice has index.ts)
    │   ├── cart/           #   CartVM model, cartSlice, cartLineFromVariant
    │   ├── product/        #   variants model (moved from lib/variants)
    │   ├── theme/          #   config-driven theming: schema, presets, resolver, loader, css-vars, redux slice
    │   └── customer/       #   session, orderFilters, customer-account api
    ├── features/           # user-facing behaviors (each slice has index.ts)
    │   ├── cart-drawer/    #   drawer UI state, CartDrawer, CartToggle
    │   ├── product-form/   #   ProductForm, AddToCartButton
    │   └── search/         #   SearchForm(+Predictive), SearchResults(+Predictive)
    ├── widgets/            # composed blocks — one module per folder
    │   ├── header/         #   Header, HeaderMenu, HeaderSkeleton
    │   ├── cart/           #   CartMain, CartLineItem, CartSummary, cart-types
    │   ├── footer/         #   Footer
    │   ├── page-layout/    #   PageLayout
    │   ├── product/        #   ProductItem
    │   ├── marquee/        #   Marquee
    │   ├── mock-shop-notice/          # MockShopNotice
    │   ├── paginated-resource-section/# PaginatedResourceSection
    │   ├── theme-switcher/ #   ThemeSwitcher (dev-only preview)
    │   └── index.ts        #   one public API
    └── shared/             # no business logic; each segment has index.ts
        ├── ui/             #   one module per folder
        │   ├── aside/      #   Aside, useAside
        │   ├── client-only/#   ClientOnly
        │   ├── product/    #   ProductImage, ProductPrice
    │       ├── skeleton/   #   Skeleton, SkeletonIcon, SkeletonRow
    │       ├── sticker-hover/         # StickerHover
    │       └── index.ts    #   one public API
        ├── api/            #   fragments.ts (GraphQL)
        ├── lib/            #   search.ts, redirect.ts
        └── styles/         #   tokens.css, app.css, reset.css, drawer.css
```

### Why FSD here

FSD fits the real constraints of a 2026 server-first storefront: clean
separation between composition (widgets/pages) and scenarios (features);
stable, tool-enforced conventions that AI-assisted workflows can rely on;
boundary discipline that keeps shared code free of compatibility hacks;
and predictable organization that shortens onboarding for larger teams.
The benefit is not aesthetic structure — it is refactorability: when
boundaries are clear, changes stay local.

### Rules (enforced by `scripts/check-fsd.mjs` — `bun run lint:fsd`)

1. **Layers import only downward** — `app → pages → widgets → features →
   entities → shared`. `shared` imports nothing from other layers (external
   packages only); `entities` never imports `features`.
2. **No cross-slice imports on the same layer** — `features/*` and
   `entities/*` slices are isolated from each other. Cross-feature behavior
   is coordinated in the app layer (e.g. opening the cart drawer on
   `cartLineAdded` happens in `app/listener-middleware.ts`).
3. **Public API is the only import surface** — every slice exposes an
   `index.ts`; modules in other layers/slices must import from it, never
   from internals (`~/src/entities/cart/cart-slice` is a violation;
   `~/src/entities/cart` is correct). Within-slice imports stay relative.
4. **Shared holds primitives, not business logic** — UI kit, utilities,
   GraphQL fragments, tokens. Business logic lives in features/entities,
   where it stays cohesive.

`bun run lint` runs oxlint **and** the FSD checker; CI should run both,
plus `lint:circular` (madge).

### Module organization (widgets & shared/ui)

Every module in `widgets/` and `shared/ui/` lives in its own kebab-case folder
with a public `index.ts`, grouping related files together:

- `widgets/header/` → `header.tsx` + `header-skeleton.tsx`
- `widgets/cart/` → `cart-main.tsx`, `cart-line-item.tsx`, `cart-summary.tsx`, `cart-types.ts`
- `shared/ui/skeleton/` → the skeleton primitives; `shared/ui/product/` → image + price primitives

A module folder's `index.ts` is the only import surface within the layer, and
the layer's top-level `index.ts` (`~/src/widgets`, `~/src/shared/ui`) is the
only surface for external consumers. New widgets / UI primitives must follow
this structure (requirement: architecture spec `module-folder-organization`).

## Naming conventions

All source files and directories use **kebab-case**: lowercase letters, digits,
and hyphens as separators (`listener-middleware.ts`, `cart-slice.ts`,
`customer-address-mutations.ts`). Exemptions:

- `app/routes/**` — route modules follow React Router conventions
  (`$dynamic` segments, `_index` markers, `route.tsx`/`index.tsx`)
- `index.ts` — FSD public API entry points
- `entry.client` / `entry.server` — scaffold-fixed entry points

Exported **symbols** keep their own style (components are PascalCase:
`export function CartMain`), only file/directory names are kebab-case.
Enforced by `scripts/check-filenames.mjs` (`bun run lint:filenames`).

## Server data vs client state

- **Server data** (products, collections, authoritative cart, customer) is
  fetched in React Router loaders/actions via `storefront` and passed down.
- **Redux** holds the resolved **theme** (`entities/theme` — seeded once per
  request in `entry.server.tsx`), plus ephemeral client state: the cart
  view-model (`entities/cart/cartSlice`) and drawer UI
  (`features/cart-drawer/model`).
- **Side effects** run in `app/listenerMiddleware.ts`
  (`createListenerMiddleware`): currently cart-id persistence to localStorage;
  server-cart reconciliation is the next step (change
  `implement-cart-capability`).

The Redux Provider mounts **per request on the server** (`entry.server.tsx`,
seeding the theme) and **per boot on the client** (`entry.client.tsx`, which
rehydrates the theme from the serialized `window.__THEME_STATE__` so hydration
matches the server HTML). Each render gets a fresh store via `makeStore()`, so
there is no cross-request state leakage. Ephemeral Redux state (cart, drawer)
is consumed inside `<ClientOnly>`; the theme is consumed anywhere via
`useSelector` because it is seeded before render on both sides.

## Design language

**Exaggerated Minimalism** — see `design-system/e-commerce-website/MASTER.md`
(source of truth) and the `minimal` preset in `app/src/entities/theme`
(implementation; emitted as CSS custom properties at runtime).

## Scripts

```bash
bun install            # install
bun run dev            # Hydrogen dev server (mock.shop)
bun run typecheck      # react-router typegen + tsc --noEmit
bun run lint           # oxlint + FSD + filename checks (scripts/check-*.mjs)
bun run lint:fsd       # FSD boundaries only
bun run lint:filenames # kebab-case file/directory naming only
bun run lint:circular  # madge — repo-wide circular dependency check
bun run format         # prettier --write (sort-imports + brace spacing)
bun run format:check   # prettier --check (CI gate)
bun run check:specs    # OpenSpec spec format QA
```

## Linting & formatting policy

**oxlint** (`.oxlintrc.json`) enforces the agreed rules:

| Requirement                                                                | Enforcement                                                                                                                                                          |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Import braces spaced (`import { X }`)                                      | Prettier `bracketSpacing: true`                                                                                                                                      |
| Import order (kept stable by convention; sorted on request — see `.prettierrc.json` history) | manual (no auto-sort plugin)                                                                                                                                    |
| No nested ternary                                                          | `eslint/no-nested-ternary` (error)                                                                                                                                   |
| 2-space indent                                                             | Prettier `tabWidth: 2`                                                                                                                                               |
| No circular dependencies                                                   | `import/no-cycle` (warn) **+ madge** (`lint:circular`)                                                                                                               |
| FSD boundaries (layer direction, cross-slice isolation, public API)        | `scripts/check-fsd.mjs` (`lint:fsd`) — imports must target `<slice>/index.ts`                                                                                         |
| Kebab-case file/directory names (route modules & `index.ts` exempt)        | `scripts/check-filenames.mjs` (`lint:filenames`)                                                                                                                      |
| React rules (exhaustive deps, rules of hooks)                              | `react-hooks/*`                                                                                                                                                      |
| TypeScript rules (no `any`, type-only imports, no `ts-ignore`)             | `typescript/no-explicit-any`, `consistent-type-imports`, `ban-ts-comment`                                                                                            |
| Prefer named exports                                                       | `import/no-default-export` (error) — **exempted** for `app/routes/**`, `app/root.tsx`, entry files, and config files, where React Router/CLI require default exports |
| Record types include `\| undefined`                                        | `tsconfig` `noUncheckedIndexedAccess: true` (indexing a record/array yields `T \| undefined`)                                                                        |

Disabled rules (with reasons):

- `jsx-a11y/autocomplete-valid` — false positives on valid tokens (`given-name`, `family-name`)
- `jsx-a11y/prefer-tag-over-role` — stylistic; `role="dialog"`/`role="group"` on `aside`/`div` are legitimate
- `unicorn/no-single-promise-in-promise-methods` — template uses single-element `Promise.all` as intentional parallel-query scaffolding
- `react/refs` — template's render-phase ref pattern is deliberate

Accepted warnings (intentional): `no-console` fires only on deliberate server-side error logging in catch blocks (`root.tsx`, `search.tsx`, `_index.tsx`).

Formatting is enforced by Prettier (`bracketSpacing: true`, single quotes, semicolons, 2 spaces, `printWidth: 100`) — CI should run `format:check` + `lint` + `lint:circular` + `typecheck`.

## Repo layout outside app/

```
openspec/              # OpenSpec tree (specs/, changes/)
design-system/         # ui-ux-pro-max persisted design system
scripts/               # check-specs.mjs
```
