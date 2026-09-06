import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunction,
  isRouteErrorResponse,
  useRouteError,
  useRouteLoaderData,
} from 'react-router';
import { Analytics, getShopAnalytics, useNonce } from '@shopify/hydrogen';
import type { Route } from './+types/root';
import favicon from '~/assets/favicon.svg';
import { defaultTheme, loadConfig, tokensToCssVars } from '~/src/shared/config';
import type { ThemePresetName, ThemeState } from '~/src/shared/config';
import { FOOTER_QUERY, HEADER_QUERY } from '~/src/shared/api';
import appStyles from '~/src/shared/styles/app.css?url';
import resetStyles from '~/src/shared/styles/reset.css?url';
import { PageLayout } from '~/src/widgets';
import { ThemeSwitcher } from '~/src/shared/ui';

export type RootLoader = typeof loader;

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({ formMethod, currentUrl, nextUrl }) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') {
    return true;
  }

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) {
    return true;
  }

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  // For more details see: https://remix.run/docs/en/main/route/should-revalidate
  return false;
};

/**
 * The main and reset stylesheets are added in the Layout component
 * to prevent a bug in development HMR updates.
 *
 * This avoids the "failed to execute 'insertBefore' on 'Node'" error
 * that occurs after editing and navigating to another page.
 *
 * It's a temporary fix until the issue is resolved.
 * https://github.com/remix-run/remix/issues/9242
 */
export function links() {
  return [
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // The header query is deferred too (see loadDeferredData): the page shell
  // paints immediately with a skeleton header instead of blocking first paint
  // on the Storefront API.
  const criticalData = {};

  const { storefront, env } = args.context;

  // Config-driven theming: hydrogen.config.json → runtime token resolution.
  // In non-production the loader also accepts a request-time config override
  // (the wizard's live-preview seam); production ignores it.
  const theme = await loadConfig({ request: args.request });

  return {
    ...deferredData,
    ...criticalData,
    theme,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: Route.LoaderArgs) {
  const { storefront, cart } = context;

  // Deferred header: renders behind a Suspense skeleton (HeaderSkeleton) so
  // first paint doesn't wait on the Storefront API. Cached long-lived and
  // error-tolerant, like the footer query.
  const header = storefront
    .query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: 'main-menu', // Adjust to your header menu handle
      },
    })
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  // defer the footer query (below the fold)
  const footer = storefront
    .query(FOOTER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        footerMenuHandle: 'footer', // Adjust to your footer menu handle
      },
    })
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });
  return {
    cart: cart.get(),
    header,
    footer,
  };
}

export function Layout({ children }: { children?: React.ReactNode }) {
  const nonce = useNonce();

  // Emit the resolved runtime token set as CSS custom properties on <html>
  // plus the active preset marker (`data-theme`) for preset-scoped styles.
  // Static tokens.css keeps the minimal defaults, so the page renders even
  // before/without loader data.
  const data = useRouteLoaderData<RootLoader>('root');
  const theme: ThemeState = data?.theme ?? defaultTheme();
  const cssVars = tokensToCssVars(theme.tokens) as React.CSSProperties;

  return (
    <html lang="en" data-theme={theme.preset} style={cssVars}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={resetStyles} />
        <link rel="stylesheet" href={appStyles} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {/* Dev-only theme preview switcher — not rendered in production
            builds (import.meta.env.PROD is statically replaced). A full-page
            navigate re-runs the root loader, which applies the preview
            override via the request-time seam (?theme=…). */}
        {!import.meta.env.PROD && (
          <ThemeSwitcher
            current={theme.preset}
            onSelect={(preset: ThemePresetName) => {
              window.location.href = `/?theme=${preset}`;
            }}
          />
        )}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const data = useRouteLoaderData<RootLoader>('root');

  if (!data) {
    return <Outlet />;
  }

  return (
    <Analytics.Provider cart={data.cart} shop={data.shop} consent={data.consent}>
      <PageLayout {...data}>
        <Outlet />
      </PageLayout>
    </Analytics.Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="route-error">
      <h1>Oops</h1>
      <h2>{errorStatus}</h2>
      {errorMessage && (
        <fieldset>
          <pre>{errorMessage}</pre>
        </fieldset>
      )}
    </div>
  );
}
