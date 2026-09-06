import { SkeletonIcon, SkeletonRow } from '../../shared/ui';

/**
 * Header skeleton — rendered while the header data is pending or the client
 * has not hydrated (see change `header-suspense-skeleton`).
 *
 * Composed from the reusable skeleton primitives: a logo row and a nav row,
 * plus icon blocks for the search and cart controls (and the mobile menu
 * toggle). Mirrors the real header's three-zone grid (`list logo ctas` on
 * mobile, `logo nav ctas` on desktop) and its 64px height, so the resolved
 * Header swaps in with no layout shift. Decorative: aria-hidden, no pointer
 * events.
 */
export function HeaderSkeleton() {
  return (
    <header className="header header-skeleton" aria-hidden="true">
      <SkeletonIcon className="header-skeleton__list" />
      <SkeletonRow className="header-skeleton__logo" style={{ width: '100%' }} />
      <SkeletonRow className="header-skeleton__nav" />
      <div className="header-ctas">
        <SkeletonIcon />
        <SkeletonIcon />
      </div>
    </header>
  );
}
