import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import {Box,Heading} from "@chakra-ui/react"
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import SideBar from '../components/SideBar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <Box w='100vw' h='100vh'>
      <Box w='100vw' h='20vh'>
        <NavBar />
        <SideBar />
        <Footer />
      </Box>
   </Box>
  )
}
