import { StrictMode, startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HydratedRouter } from 'react-router/dom';
import { NonceProvider } from '@shopify/hydrogen';
import { makeStore } from '~/src/app/store';

if (!window.location.origin.includes('webcache.googleusercontent.com')) {
  startTransition(() => {
    // Extract nonce from existing script tags
    const existingNonce = document.querySelector<HTMLScriptElement>('script[nonce]')?.nonce;

    hydrateRoot(
      document,
      <StrictMode>
        <NonceProvider value={existingNonce}>
          <Provider store={makeStore()}>
            <HydratedRouter />
          </Provider>
        </NonceProvider>
      </StrictMode>,
    );
  });
}
