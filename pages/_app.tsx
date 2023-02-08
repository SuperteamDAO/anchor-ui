import type { AppProps } from "next/app";
import { ChakraProvider,Text } from "@chakra-ui/react";
import { theme } from "../theme/theme";
import WalletWrapper from "../components/Wallet/WalletWrapper";
import Layout from "../components/Layout";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import dynamic from "next/dynamic";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";


export default function App({ Component, pageProps }: AppProps) {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new GlowWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );
  // const endpoint = "https://api.devnet.solana.com";
  const rpc = useMemo(() => clusterApiUrl("mainnet-beta"), []);

  return (
    <div>
      <ConnectionProvider endpoint={rpc}>
      <ChakraProvider theme={theme}>
      <WalletProvider wallets={wallets} autoConnect>
          {typeof window !== undefined ? (
              <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : <Text>Undefined</Text>}
        </WalletProvider>
      </ChakraProvider>
      </ConnectionProvider>
    </div>
  );
}
