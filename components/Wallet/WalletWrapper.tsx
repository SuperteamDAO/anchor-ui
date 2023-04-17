import React, { Children, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");

type WalletWrapperProps = {
  children: React.ReactNode;
  endpoint: string;
};

function WalletWrapper({ children, endpoint }: WalletWrapperProps) {
  //TODO: Make Sure to change this according to the network change dropdown
  const network = WalletAdapterNetwork.Devnet;

  const wallets = [
    /**
     * Wallets that implement either of these standards will be available automatically.
     *
     *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
     *     (https://github.com/solana-mobile/mobile-wallet-adapter)
     *   - Solana Wallet Standard
     *     (https://github.com/solana-labs/wallet-standard)
     *
     * If you wish to support a wallet that supports neither of those standards,
     * instantiate its legacy wallet adapter here. Common legacy adapters can be found
     * in the npm package `@solana/wallet-adapter-wallets`.
     */
    new PhantomWalletAdapter(),
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default WalletWrapper;
