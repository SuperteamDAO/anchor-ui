"use client";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/theme-provider";

const UnifiedWalletProvider = dynamic(
  async () => (await import("@jup-ag/wallet-adapter")).UnifiedWalletProvider,
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
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
        {children}
      </UnifiedWalletProvider>
    </ThemeProvider>
  );
}
