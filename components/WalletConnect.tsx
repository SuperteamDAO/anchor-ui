"use client";
import dynamic from "next/dynamic";

const WalletButtonDynamic = dynamic(
  async () => (await import("@jup-ag/wallet-adapter")).UnifiedWalletButton,
  { ssr: false }
);
export const WalletConnect = () => {
  return <WalletButtonDynamic />;
};
