import Head from "next/head";
import Image from "next/image";
import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import JsonEditor from "../components/JsonEditor";

import { useState } from "react";

export default function Home() {
  return (
    <div>
      <Grid
        templateAreas={` 
        "header header header"
        "nav main data"
        "footer footer footer"

        `}
        gridTemplateColumns={"6vw 1fr "}
        gridTemplateRows="auto 1fr auto"
      >
        <GridItem area={"header"}>
          <NavBar />
        </GridItem>

        <GridItem area={"nav"}>
          <SideBar />
        </GridItem>

        <GridItem area={"main"}>
          <JsonEditor />
        </GridItem>

        <GridItem area="data">
          <Box>
            <Heading>This is where things happends</Heading>
          </Box>
        </GridItem>

       
        <GridItem area="footer">
          <Footer />
        </GridItem>
      </Grid>
    </div>
  );
}
