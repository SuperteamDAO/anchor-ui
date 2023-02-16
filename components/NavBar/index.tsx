import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import NetworkMenu from "../NetworkMenu";

function NavBar() {
  return (
    <Flex
      align={"center"}
      p={4}
      justify="space-between"
      borderBottom={"2px"}
      borderColor="brand.500"
    >
      <Box>
        <Image
          src="assets/logo.svg"
          width={250}
          height={100}
          alt="Anchor UI Logo"
        />
      </Box>
      <Flex align={"center"}>
        <NetworkMenu />
        <WalletMultiButton />
      </Flex>
    </Flex>
  );
}

export default NavBar;
