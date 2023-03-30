import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Image from "next/image";

import NetworkMenu from "../NetworkMenu";
import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

function NavBar() {
  return (
    <Flex
      as="nav"
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
        <WalletMultiButtonDynamic />
      </Flex>
    </Flex>
  );
}

export default NavBar;
