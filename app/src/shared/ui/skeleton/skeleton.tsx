import type { CSSProperties } from 'react';

/**
 * Reusable skeleton primitives — shared/ui (change `header-suspense-skeleton`).
 *
 * Compose these into loading states anywhere in the app; styling is token-driven
 * (secondary background, pulse scaled off the theme's base duration) and the
 * global `prefers-reduced-motion` rule collapses the pulse to a static block.
 *
 *   <Skeleton className="my-block" />                  generic block
 *   <SkeletonIcon />                                   square icon slot (44×44)
 *   <SkeletonRow style={{ width: '12rem' }} />         text / nav / logo bar
 */
export function Skeleton({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return <span aria-hidden="true" className={`skeleton ${className}`} style={style} />;
}

/** Fixed square slot for icon-sized placeholders. */
export function SkeletonIcon({
  className = '',
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return <Skeleton className={`skeleton--icon ${className}`} style={style} />;
}

/** Horizontal bar for text / nav / logo placeholders. */
export function SkeletonRow({
  className = '',
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return <Skeleton className={`skeleton--row ${className}`} style={style} />;
}
