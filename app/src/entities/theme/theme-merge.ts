/**
 * Theme capability — the single merge that resolves "defaults ⊕ preset ⊕ overrides".
 *
 * One semantics for the whole theme: plain objects merge recursively, arrays
 * and primitives replace. This replaces the three ad-hoc strategies (per-group
 * spreads in `resolveTokens`, `??`-per-key in `mergeLayout`, nested spreads in
 * `mergeContent`) so a maintainer learns the merge once.
 */
type UnknownRecord = Record<string, unknown>;

function isPlainObject(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Merge sources left-to-right (later wins). Undefined values are skipped so a
 * missing override never clobbers a preset default. Arrays and primitives
 * replace; plain objects recurse. Callers parameterise the result type (e.g.
 * `merge<TokenSet>(...)`) since the sources are heterogeneous.
 */
export function merge<T = UnknownRecord>(...sources: Array<unknown>): T {
  const result: UnknownRecord = {};
  for (const source of sources) {
    if (source === undefined || source === null || typeof source !== 'object') {
      continue;
    }
    for (const [key, value] of Object.entries(source as UnknownRecord)) {
      if (value === undefined) {
        continue;
      }
      const existing = result[key];
      if (isPlainObject(existing) && isPlainObject(value)) {
        result[key] = merge(existing, value);
      } else {
        result[key] = value;
      }
    }
  }
  return result as T;
}
