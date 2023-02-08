import React from "react";
import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import Footer from "../Footer";
import OnChainData from "../OnChainData";

type layoutProps = {
  children: JSX.Element;
};

function Layout({ children }: layoutProps) {
  return (
    <div>
      <Grid
        templateAreas={` 
        "header header header"
        "nav main data"
        "footer footer footer"

        `}
        gridTemplateColumns={"6vw 2fr 1.5fr"}
        gridTemplateRows="auto 90vh 5vh"
      >
        <GridItem area={"header"}>
          <NavBar />
        </GridItem>
        <GridItem area={"nav"}>
          <SideBar />
        </GridItem>

        <GridItem area={"main"}>{children}</GridItem>
        <GridItem borderLeft={"2px"} borderColor="brand.500" area="data">
          <OnChainData />
          {/* <FunctionStack /> */}
        </GridItem>
        <GridItem justifySelf={"flex-end"} area="footer" position="fixed" bottom={0}>
          <Footer />
        </GridItem>
      </Grid>
    </div>
  );
}

export default Layout;
