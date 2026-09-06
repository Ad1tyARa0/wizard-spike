/**
 * Theme capability — config loading (hydrogen.config.json) + preview seam.
 *
 * `loadConfig()` runs in the root loader. Reading the file is best-effort:
 * absent, malformed, or schema-invalid config falls back to the default
 * preset's values and the page still renders (missing-config-falls-back).
 *
 * Preview seam: in NON-PRODUCTION the loader also accepts a request-time
 * config override (query param `?config=<json>` / `?theme=<preset>`, or
 * header `x-theme-config`) so the wizard can live-preview a draft theme
 * without a rebuild or deployment. Production ignores the override.
 */
import { parseThemeConfig, type ThemeConfig } from './theme-schema';
import { defaultTheme, resolveTheme } from './resolve-tokens';
import type { ThemeState } from './theme-types';

const CONFIG_FILENAME = 'hydrogen.config.json';
const PREVIEW_HEADER = 'x-theme-config';

export interface LoadConfigOptions {
  /** Explicit config file path (tests pass fixtures); defaults to project root. */
  path?: string;
  /** Override the production check (tests). */
  isProduction?: boolean;
  /** The incoming request — enables the preview seam. */
  request?: Request;
}

function isProductionEnv(): boolean {
  return typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';
}

function resolveConfigPath(explicitPath?: string): string {
  if (explicitPath) {
    return explicitPath;
  }
  const cwd = typeof process !== 'undefined' ? process.cwd?.() : undefined;
  return `${cwd ?? '.'}/${CONFIG_FILENAME}`;
}

/**
 * Read + validate the config file. Never throws: any failure yields the
 * default (minimal) config.
 */
export async function readConfig(path?: string): Promise<ThemeConfig> {
  const file = await readConfigFile(resolveConfigPath(path));
  if (file === null) {
    return { theme: 'minimal' };
  }
  try {
    const json = JSON.parse(file.replace(/^\uFEFF/, '')) as unknown;
    return parseThemeConfig(json) ?? { theme: 'minimal' };
  } catch {
    return { theme: 'minimal' };
  }
}

async function readConfigFile(path: string): Promise<string | null> {
  try {
    // Dynamic import keeps `node:fs` out of the static bundle; on runtimes
    // without a filesystem (e.g. Oxygen workers) this fails and we fall
    // back to defaults, exactly as if the file were missing.
    const fs = await import('node:fs');
    return fs.readFileSync(path, 'utf8');
  } catch {
    return null;
  }
}

/**
 * Resolve the effective ThemeState for a request.
 * Order: config file → preview override (non-production only).
 */
export async function loadConfig(options: LoadConfigOptions = {}): Promise<ThemeState> {
  const config = await readConfig(options.path);
  const state = resolveTheme(config);
  return applyPreviewOverride(state, options.request, options.isProduction ?? isProductionEnv());
}

/**
 * Request-time preview override (the wizard's live-preview seam).
 * Ignored in production. Malformed overrides are silently ignored.
 */
export function applyPreviewOverride(
  state: ThemeState,
  request: Request | undefined,
  isProduction: boolean,
): ThemeState {
  if (isProduction || !request) {
    return state;
  }

  const raw = previewOverridePayload(request);
  if (raw !== null) {
    const text = safeDecode(raw);
    try {
      const parsed = parseThemeConfig(JSON.parse(text) as unknown);
      if (parsed) {
        return resolveTheme(parsed);
      }
    } catch {
      // malformed override → keep current state
    }
  }

  const themeParam = new URL(request.url).searchParams.get('theme');
  if (themeParam === 'minimal' || themeParam === 'playful') {
    return resolveTheme({ theme: themeParam });
  }

  return state;
}

function previewOverridePayload(request: Request): string | null {
  const url = new URL(request.url);
  const param = url.searchParams.get('config');
  if (param !== null) {
    return param;
  }
  return request.headers.get(PREVIEW_HEADER);
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export { defaultTheme };
