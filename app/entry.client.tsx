import { StrictMode, startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HydratedRouter } from 'react-router/dom';
import { NonceProvider } from '@shopify/hydrogen';
import { makeStore } from '~/src/app/store';
import type { ThemeState } from '~/src/entities/theme';

if (!window.location.origin.includes('webcache.googleusercontent.com')) {
  startTransition(() => {
    // Extract nonce from existing script tags
    const existingNonce = document.querySelector<HTMLScriptElement>('script[nonce]')?.nonce;

    // Rehydrate the server-resolved theme (serialized by the root Layout) so
    // the client store matches the server-rendered HTML before hydration.
    const theme = (window as { __THEME_STATE__?: ThemeState }).__THEME_STATE__;

    hydrateRoot(
      document,
      <StrictMode>
        <NonceProvider value={existingNonce}>
          <Provider store={makeStore(theme ? { theme } : undefined)}>
            <HydratedRouter />
          </Provider>
        </NonceProvider>
      </StrictMode>,
    );
  });
}
