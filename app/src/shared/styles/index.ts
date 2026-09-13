/**
 * FSD public API — shared/styles.
 * External modules may only import from this file, never from internals.
 *
 * The token values used to be re-exported here (a TS mirror of the minimal
 * preset); that mirror had no consumers and was deleted. Token values live in
 * `~/src/shared/config` (single source of truth); the CSS files (tokens.css /
 * app.css / reset.css) are imported directly by `root.tsx` via `?url`.
 */
export type { TokenSet, ThemeState } from '~/src/shared/config';
