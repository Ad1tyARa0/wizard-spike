import { type ReactNode, useEffect, useState } from 'react';

/**
 * Renders children only after client hydration. Prevents SSR/hydration
 * mismatches for components that depend on client-only state (Redux store,
 * localStorage, window).
 *
 * Note: children elements are created during the server render but never
 * mounted there (the fallback is rendered instead), so component render
 * functions and hooks do not run on the server.
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Intentional: the mount-gate pattern requires flipping state once after
    // hydration; there is no way to know "hydrated" without a post-mount effect.
    // oxlint-disable-next-line react/set-state-in-effect
    setMounted(true);
  }, []);
  return mounted ? <>{children}</> : <>{fallback}</>;
}
