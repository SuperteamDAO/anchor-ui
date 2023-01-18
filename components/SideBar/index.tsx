import React from "react";
import { VStack, Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

function SideBar() {
  return (
    <VStack maxW="7vw" h='full' borderRight={"2px"} borderColor="brand.500">
      <Flex p={6} flexDir={"column"} justify="center" align={"center"}>
        <Image
          src="/assets/idl_icon.svg"
          alt="IDL Editor Icon"
          width={24}
          height={24}
        />
        <Text fontSize={"md"}>IDL</Text>
      </Flex>
      <Flex p={6} flexDir={"column"} justify="center" align={"center"}>
        <Image
          src="/assets/test.png"
          alt="IDL Test Icon"
          width={24}
          height={24}
        />
        <Text fontSize={"md"}>Test</Text>
      </Flex>

      <Flex p={6} flexDir={"column"} justify="center" align={"center"}>
        <Image
          src="/assets/docs_icon.svg"
          alt="IDL Test Icon"
          width={24}
          height={24}
        />
        <Text fontSize={"md"}>Docs</Text>
      </Flex>
    </VStack>
  );
}

export default SideBar;
