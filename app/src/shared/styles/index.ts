/**
 * FSD public API — shared/styles.
 * External modules may only import from this file, never from internals.
 */
export {
  breakpoints,
  colors,
  createTokens,
  fonts,
  layout,
  motion,
  radius,
  space,
  tokens,
  tracking,
  type,
  weights,
  zIndex,
} from './tokens';
export type { TokenSet, ThemeState } from '~/src/shared/config';
