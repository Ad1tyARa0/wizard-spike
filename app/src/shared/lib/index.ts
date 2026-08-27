/**
 * FSD public API — shared/lib.
 * External modules may only import from this file, never from internals.
 */
export { redirectIfHandleIsLocalized } from './redirect';
export { getEmptyPredictiveSearchResult, urlWithTrackingParams } from './search';
export type { PredictiveSearchReturn, RegularSearchReturn } from './search';
