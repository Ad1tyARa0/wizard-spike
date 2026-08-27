import { type RouteConfigEntry, index, route } from '@react-router/dev/routes';

/**
 * Route manifest for the storefront.
 *
 * Routes are defined explicitly here (instead of the fs-routes file convention)
 * so that each feature can live in a single condensed folder, e.g. all account
 * routes (layout, profile, addresses, orders, login, logout, authorize) inside
 * `routes/account/`. The file path inside a folder is arbitrary — the URL is
 * defined by the `path` argument below.
 *
 * Note: this means NEW routes must be registered here manually (a route file
 * alone will not be discovered).
 */
export const routeManifest: RouteConfigEntry[] = [
  // Root & platform routes
  index('routes/_index/route.tsx'),
  route('robots.txt', 'routes/[robots.txt]/route.tsx'),
  route('sitemap.xml', 'routes/sitemap/route.tsx'),
  route('sitemap/:type/:page.xml', 'routes/sitemap/paged.tsx'),
  route('*', 'routes/$/route.tsx'),

  // Cart
  route('cart', 'routes/cart/route.tsx', [route(':lines', 'routes/cart/$lines.tsx')]),

  // Account (authenticated area, wrapped in the account layout)
  route('account', 'routes/account/route.tsx', [
    index('routes/account/index.tsx'),
    route('profile', 'routes/account/profile.tsx'),
    route('addresses', 'routes/account/addresses.tsx'),
    route('orders', 'routes/account/orders/index.tsx', { index: true }),
    route('orders/:id', 'routes/account/orders/$id.tsx'),
    route('*', 'routes/account/$.tsx'),
  ]),
  // Auth (outside the account layout, matching the previous `account_.*` escape)
  route('account/login', 'routes/account/login.tsx'),
  route('account/logout', 'routes/account/logout.tsx'),
  route('account/authorize', 'routes/account/authorize.tsx'),

  // Blogs
  route('blogs', 'routes/blogs/route.tsx', { index: true }),
  route('blogs/:blogHandle', 'routes/blogs/$blogHandle/route.tsx', {
    index: true,
  }),
  route('blogs/:blogHandle/:articleHandle', 'routes/blogs/$blogHandle/$articleHandle.tsx'),

  // Collections
  route('collections', 'routes/collections/route.tsx', { index: true }),
  route('collections/all', 'routes/collections/all.tsx'),
  route('collections/:handle', 'routes/collections/$handle.tsx'),

  // Policies
  route('policies', 'routes/policies/route.tsx', { index: true }),
  route('policies/:handle', 'routes/policies/$handle.tsx'),

  // Products
  route('products/:handle', 'routes/products/$handle.tsx'),

  // Pages
  route('pages/:handle', 'routes/pages/$handle.tsx'),

  // Discounts
  route('discount/:code', 'routes/discount/$code.tsx'),

  // Search
  route('search', 'routes/search/route.tsx'),
];
