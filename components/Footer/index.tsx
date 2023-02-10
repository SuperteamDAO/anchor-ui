import React from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import Image from "next/image";

function Footer() {
  return (
    <Flex
      align="center"
      backgroundColor={"#232323"}
      w="100vw"
      h="5vh"
      justify={"space-between"}
    >
      <Flex bg="brand.700" justify={"center"} w="10vw" align="center" h="full">
        <Image
          src="/assets/globe.svg"
          alt="Network Icon"
          width={20}
          height={20}
        />

        <Text px={1} textColor={"black"} fontSize="sm">
          MAINNET-BETA
        </Text>
      </Flex>
      <Flex px={4} align="center" justify="space-between" w="full">
        <Text>No Current Transaction</Text>
        <Flex justify={"center"} align="center" h="full">
          {/* TODO: The SVG here is incomplete need to change it */}
          <Image
            src="/assets/footer_right.svg"
            alt="Trasactions Icon"
            width={20}
            height={20}
          />
          <Text textOverflow={"clip"}>Total 1000 Transactions</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Footer;
