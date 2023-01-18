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
        templateAreas={` 
        "header header"
        "nav main"
        "footer footer"

        `}  
        gridTemplateColumns={"auto 1fr"}
        gridTemplateRows="auto 1fr auto"
        >
      <GridItem area={"header"}>
      <NavBar />
      </GridItem>

    <GridItem area={"nav"}   >
    <SideBar />
    </GridItem>

    <GridItem area={"main"}>
    <JsonEditor />
    </GridItem>
    <GridItem area='footer'>
    <Footer />
    </GridItem>
      </Grid>
  
  );
}
