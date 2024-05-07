import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useCallback, useState } from "react";
import { WagmiProvider } from "wagmi";

import { config, createMockConfig } from "~/wagmi";

declare global {
  interface Window {
    _setupAccount: typeof createMockConfig;
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(new QueryClient());
  const [wagmiConfig, setWagmiConfig] = useState(config);

  const _setupAccount = useCallback(
    (...args: Parameters<Window["_setupAccount"]>) => {
      const config = createMockConfig(...args);
      setWagmiConfig(config);
    },
    []
  );

  if (typeof window !== "undefined") window._setupAccount = _setupAccount;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
