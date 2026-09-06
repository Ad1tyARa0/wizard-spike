import type { ReactNode } from 'react';

/**
 * Sticker-style hover primitive: the child image tilts and gains a hard
 * offset shadow in `--color-hero-accent` on hover.
 *
 * Styles live in shared/styles/app.css under `[data-theme='playful']`; the
 * transform + shadow are disabled under `prefers-reduced-motion`.
 * Theme-agnostic by design — other presets simply don't style the hover.
 */
export function StickerHover({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className ? `sticker-hover ${className}` : 'sticker-hover'}>{children}</div>
  );
}
