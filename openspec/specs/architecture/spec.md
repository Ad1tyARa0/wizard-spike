# Architecture Capability

## Purpose

Defines the technical foundation of the storefront: the technology stack, code organization (feature-sliced design), the separation between server data and client state, and the build tooling. Every other capability builds on these constraints, so this spec is the contract developers and reviewers rely on to keep the codebase maintainable and sellable as a product.

## Requirements

### Requirement: feature-sliced-layout

The storefront codebase MUST be organized into the feature-sliced layers `app`, `pages`, `widgets`, `features`, `entities`, and `shared`, where each layer MAY import only from layers below it.

#### Scenario: downward-import-allowed

- **WHEN** a module in the `features` layer imports a module from `shared`
- **THEN** the import is allowed by convention

#### Scenario: upward-import-rejected

- **WHEN** a module in the `entities` layer imports a module from the `features` layer
- **THEN** the lint or type-check step fails with a layer-boundary violation

### Requirement: slice-public-api

Every slice (`features/*`, `entities/*`, `widgets`, and the `shared` segments `ui`/`lib`/`api`) MUST expose its public API through an `index.ts` file, and modules outside the slice MUST import from that public API rather than from slice internals. Cross-feature behavior MUST be coordinated in the `app` layer (e.g. listener middleware), never by one feature importing another.

#### Scenario: cross-slice-import-through-public-api

- **WHEN** a route module needs the cart slice
- **THEN** it imports from `~/src/entities/cart` (the slice public API) and `bun run lint:fsd` passes

#### Scenario: internal-import-rejected

- **WHEN** a module imports a slice internal directly, e.g. `~/src/entities/cart/cart-slice`
- **THEN** `bun run lint:fsd` fails with a `public-api` violation

#### Scenario: same-layer-cross-feature-rejected

- **WHEN** one feature imports another feature (e.g. `features/product-form` imports `features/cart-drawer`)
- **THEN** `bun run lint:fsd` fails with a `cross-slice` violation

### Requirement: file-naming-convention

Source files and directories MUST use kebab-case names: lowercase letters, digits, and hyphens as separators (e.g. `listener-middleware.ts`, `customer-address-mutations.ts`). Exemptions: route modules under `app/routes/` follow React Router conventions (`$dynamic` segments, `_index` markers, `route.tsx`), FSD public APIs are named `index.ts`, and the scaffold-fixed entry points `entry.client`/`entry.server` keep their names.

#### Scenario: new-source-file-created

- **WHEN** a developer adds a source file under `app/src/`
- **THEN** the file name is kebab-case and `bun run lint:filenames` passes

#### Scenario: pascal-or-camel-case-rejected

- **WHEN** a file or directory is named with PascalCase or camelCase, e.g. `cartSlice.ts` or `CartMain.tsx`
- **THEN** `bun run lint:filenames` fails with a naming violation

### Requirement: hydrogen-routes-as-pages

The storefront MUST use Hydrogen's Remix routes (`app/routes/`) as the `pages` layer, keeping loaders and actions thin and delegating data fetching and business logic to `entities` and `features`.

#### Scenario: new-page-added

- **WHEN** a developer adds a new route file under `app/routes/`
- **THEN** the route composes widgets and features and delegates data loading to entity services

#### Scenario: loader-kept-thin

- **WHEN** a route loader fetches product data
- **THEN** it calls an entity service rather than inlining Storefront API logic

### Requirement: server-data-client-state-separation

Server-fetched data (products, collections, cart, customer) MUST come from Remix loaders as the source of truth, while ephemeral UI state (drawer open/closed, filters, optimistic cart lines) MUST live in the Redux store.

#### Scenario: product-page-load

- **WHEN** a product page loads
- **THEN** the loader fetches product data from the Storefront API and the Redux store holds only UI state for that page

#### Scenario: optimistic-cart-update

- **WHEN** a customer adds an item to the cart
- **THEN** the Redux store applies the optimistic line immediately and the API reconciliation happens through middleware

### Requirement: redux-toolkit-with-listener-middleware

Client state MUST be managed with Redux Toolkit, and async side effects MUST be orchestrated with `createListenerMiddleware`.

#### Scenario: cart-sync-side-effect

- **WHEN** a cart mutation is dispatched
- **THEN** a listener middleware calls the Storefront API and reconciles the cart state, handling failure by rolling back the optimistic update

#### Scenario: persistence-side-effect

- **WHEN** the cart id changes
- **THEN** a listener middleware persists it to localStorage

### Requirement: react-19-runtime

The storefront MUST be built on React 19 and use its concurrent rendering features where beneficial.

#### Scenario: app-renders

- **WHEN** the storefront renders a page
- **THEN** it runs on the React 19 runtime

#### Scenario: dependency-resolution

- **WHEN** dependencies are resolved with `bun install`
- **THEN** React 19 is installed and no legacy React 18 compatibility layer is required

### Requirement: typescript-strict

All application code MUST be written in TypeScript with `strict` mode enabled.

#### Scenario: typecheck-passes

- **WHEN** the project is type-checked with `bun run typecheck`
- **THEN** no type errors are reported

#### Scenario: strict-violation-fails

- **WHEN** code is committed with an implicit `any` or unsafe access
- **THEN** the type-check fails and blocks the build

### Requirement: vite-build-with-bun-tooling

The storefront MUST be built with Hydrogen's Vite-based build pipeline, with Bun as the package manager and script runner.

#### Scenario: dev-server

- **WHEN** a developer runs `bun run dev`
- **THEN** the Hydrogen dev server starts with hot module replacement

#### Scenario: production-build

- **WHEN** a developer runs `bun run build`
- **THEN** a production bundle is emitted with Vite/Rollup

### Requirement: hosting-portability

The storefront build MUST target Oxygen and standard Node hosting without application-level vendor lock-in.

#### Scenario: deploy-to-oxygen

- **WHEN** the storefront is deployed
- **THEN** it runs on Oxygen using the same production build

#### Scenario: deploy-to-node

- **WHEN** the storefront is deployed to a Node server
- **THEN** it runs without code changes

### Requirement: framework-agnostic-presentation

Presentational components in `widgets` and `shared` MUST NOT import Remix or Hydrogen runtime APIs directly, so they can be reused outside the Remix layer (for example, in a future Liquid theme variant).

#### Scenario: widget-reuse

- **WHEN** a widget is extracted to another host application
- **THEN** it renders with plain React props and no Remix imports

#### Scenario: remix-confined-to-pages

- **WHEN** a developer needs a loader, action, or navigation hook
- **THEN** it is used in the `pages` or `app` layer, never in `widgets` or `shared`
