# ADR 0001: No runtime write seam for `hydrogen.config.json`

Status: Accepted · 2026-09-13

## Context

The Theme capability is config-driven: the wizard (Layer 1) writes
`hydrogen.config.json`, and the storefront re-themes from it (see
`openspec/changes/implement-config-driven-theming`). The question is whether
the running storefront also needs a **write** path back to that config — for
example, to persist a draft theme from the same process that renders it.

Today the read side has two entry points:

- the build-time bundled config (`import bundledConfig from 'hydrogen.config.json'`), and
- a request-time preview seam (`?config=…` / `?theme=…` / `x-theme-config`,
  non-production only).

There is no write seam.

## Decision

The storefront remains **read-only** with respect to theme config in v1.

- The wizard writes `hydrogen.config.json` **at deploy time** into the
  per-merchant repository; push-to-deploy publishes it.
- Live previewing uses the request-time seam (read-only), never a persisted write.
- A runtime `writeConfig` seam is an explicit non-goal for v1 and will be
  added as an additive change only if draft-persistence-at-runtime is ever
  required.

## Consequences

- The config source of truth is a single artifact owned by the wizard, not by
  the storefront process — no concurrency/write-conflict surface.
- The storefront stays a pure function of config + request; simpler to reason
  about and test.
- The read side already abstracts an optional `path` (`readConfig(path?)`), so
  a future write seam (an authenticated endpoint writing the file) slots in
  without disturbing the resolution pipeline.
- Cost: a draft can only be previewed, not saved from the storefront itself.
  Acceptable because saving is the wizard's job in the 15-minute flow.
