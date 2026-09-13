import { renderToReadableStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ServerRouter } from 'react-router';
import type { EntryContext } from 'react-router';
import { type HydrogenRouterContextProvider, createContentSecurityPolicy } from '@shopify/hydrogen';
import { isbot } from 'isbot';
import { makeStore } from '~/src/app/store';
import { loadConfig } from '~/src/entities/theme';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: HydrogenRouterContextProvider,
) {
  const { nonce, header, NonceProvider } = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
  });

  // Per-request Redux store: keeps SSR output identical to the client's
  // initial state (ProductForm dispatches only on client events, so the
  // server store never mutates during render) and prevents cross-request
  // state leakage. The theme is resolved once here and seeded into the store
  // so server-rendered components read the correct theme via useSelector.
  const theme = await loadConfig({ request });
  const store = makeStore({ theme });

  const body = await renderToReadableStream(
    <NonceProvider>
      <Provider store={store}>
        <ServerRouter context={reactRouterContext} url={request.url} nonce={nonce} />
      </Provider>
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
