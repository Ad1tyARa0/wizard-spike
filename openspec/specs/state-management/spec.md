# State Management Capability

## Purpose

The State Management capability defines the protocol for adding client/server state to the storefront: how a Redux slice is structured, how server-resolved data is seeded into the store so SSR and hydration agree, how a slice's public API is shaped, and which gates a feature change must pass before it is considered done. It complements the Architecture capability (layer layout, import direction, kebab-case naming, public-`index.ts` rule) with the concrete conventions the theme slice established and every future slice MUST follow.

## Requirements

### Requirement: slice-file-organization

A Redux slice MUST be split into separate kebab-case files for actions, reducer, and selectors (e.g. `theme-actions.ts`, `theme-reducer.ts`, `theme-selectors.ts`) rather than one monolithic slice file, and those files MUST live inside the owning entity slice (e.g. `entities/theme/`).

#### Scenario: actions-in-dedicated-file

- **WHEN** a slice needs an action
- **THEN** the action creator is declared in `*-actions.ts` together with its action-type constant
- **AND** the reducer imports the action creator from that file rather than matching an inline string

#### Scenario: reducer-separate-from-actions

- **WHEN** the slice reducer handles an action
- **THEN** it is defined in `*-reducer.ts` using `createSlice` with `extraReducers` (the slice owns no inline `reducers`) and references the exported action creators

#### Scenario: selectors-in-dedicated-file

- **WHEN** components need to read the slice state
- **THEN** the selectors are declared in `*-selectors.ts` and consumed via `useSelector`

### Requirement: namespaced-action-types

Action-type string constants MUST be grouped under an exported namespace that holds a local base const for the feature and builds the exported type as `<base>/<FEATURE_ACTION>` with a template literal, so every type is a single, findable literal, and callers MUST dispatch the exported action creator (or reference the namespace constant) rather than raw strings.

#### Scenario: constant-under-namespace

- **WHEN** a slice declares an action type
- **THEN** it is written as a namespace with a local base const and a template-literal type, e.g.

  ```ts
  export namespace ThemeActionTypes {
    const themeSet = 'theme';

    export const THEME_SET = `${themeSet}/THEME_SET`;
  }
  ```

- **AND** the exported type string is `<base>/<FEATURE_ACTION>` (e.g. `theme/THEME_SET`)

#### Scenario: no-magic-strings

- **WHEN** a component, route, or listener dispatches an action
- **THEN** it dispatches the exported action creator (e.g. `themeSet(payload)`) instead of a raw string literal

### Requirement: structural-selector-typing

Selectors MUST type their `state` parameter structurally against the slice (e.g. `{ theme: ThemeState }`) rather than importing `RootState`, so the entities layer never depends on the app layer.

#### Scenario: structural-state-param

- **WHEN** a selector is written in an entity slice
- **THEN** it types state as `{ <slice>: <SliceState> }` and does not import `RootState` from `~/src/app/root-reducer`

#### Scenario: no-circular-import

- **WHEN** the slice is registered in the root reducer
- **THEN** `bun run lint:circular` reports no cycle, because selectors and the root reducer do not import each other

### Requirement: root-reducer-registration

Every slice MUST be registered in `app/src/app/root-reducer.ts` so its reducer is part of the store.

#### Scenario: reducer-registered

- **WHEN** a new slice is added
- **THEN** its reducer is combined into `rootReducer` in `app/src/app/root-reducer.ts`

#### Scenario: state-selectable

- **WHEN** a component subscribes to the new slice via `useSelector`
- **THEN** the selector returns the slice's state from the store

### Requirement: ssr-seeding

Server-resolved state that components read from Redux MUST be seeded into the store before render on the server and rehydrated on the client, so the server-rendered HTML matches the client's initial render. Ephemeral, client-only state MUST remain client-only.

#### Scenario: server-seed

- **WHEN** a slice holds server-resolved data (e.g. the resolved theme)
- **THEN** `app/entry.server.tsx` resolves it and passes it to `makeStore(...)` before rendering
- **AND** `makeStore` accepts a preloaded-state argument

#### Scenario: client-rehydrate

- **WHEN** the store is created on the client (`app/entry.client.tsx`)
- **THEN** it rehydrates the slice from the serialized state (e.g. `window.__THEME_STATE__`, emitted by the root `Layout`) so hydration matches the server HTML

#### Scenario: ephemeral-state-client-only

- **WHEN** state is purely ephemeral UI (e.g. drawer open/closed)
- **THEN** it is not seeded on the server and its consuming components render inside `<ClientOnly>`

### Requirement: narrow-public-api

A slice's `index.ts` MUST export only its seams (loader, resolver, actions, reducer, selectors) plus the types consumers actually reference; everything else is an internal seam reachable only by relative imports from the slice's own tests and tooling.

#### Scenario: seams-only-export

- **WHEN** a slice's `index.ts` is written
- **THEN** it re-exports only the public seams and the referenced types, not every internal helper or type

#### Scenario: internals-tested-via-relative

- **WHEN** a test exercises an internal helper (e.g. a resolver or schema parser)
- **THEN** it imports the internal file by relative path (the `tests/` directory is outside the FSD tree and not bound by the public-`index.ts` rule)

### Requirement: verification-gates

A feature change MUST pass the full check suite before it is considered complete.

#### Scenario: full-gate-sequence

- **WHEN** a feature is implemented
- **THEN** `bun run lint`, `bun run typecheck`, `bun test`, and `bun run lint:circular` all pass

#### Scenario: fsd-and-naming-included

- **WHEN** files are added or moved under `app/`
- **THEN** `bun run lint` includes the FSD boundary check (`check-fsd.mjs`) and the kebab-case filename check (`check-filenames.mjs`)

### Requirement: decision-and-doc-trace

Hard-to-reverse design decisions MUST be recorded as ADRs, and structural changes (new/moved layers or slices) MUST be reflected in `docs/architecture.md`.

#### Scenario: adr-recorded

- **WHEN** a design decision is hard to reverse (e.g. a read-only config write seam)
- **THEN** it is recorded as an ADR under `docs/adr/`

#### Scenario: architecture-doc-synced

- **WHEN** a layer or slice is added, renamed, or moved
- **THEN** the FSD layer map in `docs/architecture.md` is updated to match
