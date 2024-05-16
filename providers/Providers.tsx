"use client";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

const UnifiedWalletProvider = dynamic(
  async () => (await import("@jup-ag/wallet-adapter")).UnifiedWalletProvider,
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <UnifiedWalletProvider
        wallets={[]}
        config={{
          autoConnect: false,
          env: "devnet",
          metadata: {
            name: "Degen Raffle",
            description: "Raffle for Degens",
            url: "https://jup.ag",
            iconUrls: ["https://jup.ag/favicon.ico"],
          },
          // implement wallet notifications later with sooner
          // notificationCallback: ,
          walletlistExplanation: {
            href: "https://station.jup.ag/docs/additional-topics/wallet-list",
          },
          theme: "jupiter",
          lang: "en",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            {children}
            {<ReactQueryDevtools initialIsOpen={false} />}
          </TooltipProvider>
        </QueryClientProvider>
      </UnifiedWalletProvider>
    </ThemeProvider>
  );
}
