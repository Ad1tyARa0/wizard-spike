/**
 * FSD public API — shared/ui.
 * Every UI primitive lives in its own kebab-case folder with a public
 * index.ts (e.g. shared/ui/skeleton/, shared/ui/aside/); external modules
 * import only from this top-level file.
 */
export { Aside, useAside } from './aside';
export { Button, ButtonLink, type ButtonProps, type ButtonLinkProps } from './button';
export { ClientOnly } from './client-only';
export { ProductImage, ProductPrice } from './product';
export { Skeleton, SkeletonIcon, SkeletonRow } from './skeleton';
export { StickerHover } from './sticker-hover';
