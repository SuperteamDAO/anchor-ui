import type { AppProps } from "next/app";
import { ChakraProvider,Text } from "@chakra-ui/react";
import { theme } from "../theme/theme";
import WalletWrapper from "../components/Wallet/WalletWrapper";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const endpoint = "https://api.devnet.solana.com";

  return (
    <div>
      <ChakraProvider theme={theme}>
        <WalletWrapper endpoint={endpoint}>
          {typeof window !== undefined ? (
              <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : <Text>Undefined</Text>}
        </WalletWrapper>
      </ChakraProvider>
    </div>
  );
}
