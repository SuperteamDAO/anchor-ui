import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import {Box,Heading} from "@chakra-ui/react"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <Box>
  <Heading>This is Anchor UI</Heading>
   </Box>
  )
}
