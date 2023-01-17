import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import JsonEditor from "../components/JsonEditor";

import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
   
      <Grid
        gridTemplateColumns={"200px 1fr"}
        gridTemplateRows="auto 1fr 100px"
        >
      <GridItem colSpan={2} rowSpan={1}>
      <NavBar />
      </GridItem>

    <GridItem colSpan={1}  >
    <SideBar />
    </GridItem>

<JsonEditor />

    <GridItem colSpan={1}>
    <Footer />
    </GridItem>
      </Grid>
  
  );
}
