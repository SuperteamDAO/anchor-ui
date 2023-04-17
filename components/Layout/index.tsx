import React from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import Footer from "../Footer";
import OnChainData from "../OnChainData";

type layoutProps = {
  children: JSX.Element;
};

const gridAreas = {
  base: `
    "header"
    "main"
    "data"
    "footer"
  `,
  md: `
    "header header header"
    "nav main data"
    "footer footer footer"
  `,
};

const gridColumns = {
  base: "1fr",
  md: "6vw 2fr 1.5fr",
};

const gridRows = {
  base: "9vh 1fr 1fr 5vh",
  md: "9vh 86vh 5vh",
};

function Layout({ children }: layoutProps) {
  const gridTemplateAreas = useBreakpointValue(gridAreas);
  const gridTemplateColumns = useBreakpointValue(gridColumns);
  const gridTemplateRows = useBreakpointValue(gridRows);
  return (
    <div>
      <Grid
        templateAreas={gridTemplateAreas}
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={gridTemplateRows}
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
        <GridItem
          justifySelf={"flex-end"}
          area="footer"
          position="fixed"
          bottom={0}
        >
          <Footer />
        </GridItem>
      </Grid>
    </div>
  );
}

export default Layout;
