
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {theme} from "../theme/theme"
import WalletWrapper from '../components/Wallet/WalletWrapper'


export default function App({ Component, pageProps }: AppProps) {
  const endpoint = "https://api.devnet.solana.com"
  
  return (
    <ChakraProvider theme={theme}>
      <WalletWrapper endpoint={endpoint}>
      <Component {...pageProps} />
      </WalletWrapper>
    </ChakraProvider>
  )
}
