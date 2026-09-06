import type { ThemePresetName } from '../../config';

interface ThemeSwitcherProps {
  current: ThemePresetName;
  onSelect: (preset: ThemePresetName) => void;
}

/**
 * Dev-only preview control: switches between shipped theme presets.
 * Pure presentational — navigation is wired by the caller (root layout),
 * which points it at the request-time preview seam (?theme=…).
 * Not rendered in production builds (gated in app/root.tsx).
 */
export function ThemeSwitcher({ current, onSelect }: ThemeSwitcherProps) {
  return (
    <label className="theme-switcher">
      <span className="theme-switcher__label">Theme preview</span>
      <select
        aria-label="Preview theme"
        className="theme-switcher__select"
        onChange={(event) => onSelect(event.target.value as ThemePresetName)}
        value={current}
      >
        <option value="minimal">Minimal</option>
        <option value="playful">Playful</option>
      </select>
    </label>
  );
}
