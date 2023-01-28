import React from "react";
import { VStack, Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const routes = [
  {
    name: "IDL",
    img:"/assets/idl_icon.svg"
  },
  {
    name: "Test",
    img:"/assets/test.png"
  },
  {
    name: "Docs",
    img:"/assets/docs_icon.svg"
  },
];

function SideBar() {
  return (
    <VStack h="full" borderRight={"2px"} borderColor="brand.500">
      {
        routes.map((route) => {
          return (
            <Flex w={'full'}  key={route.name} p={6} flexDir={"column"} justify="center" align={"center"}
            _hover={{
              backgroundColor:"#232323",
              borderLeftColor:"#4A83EE",
              borderLeft:"2px"
            }}
            >
            <Image
              src={route.img}
              alt="IDL Editor Icon"
              width={24}
              height={24}
            />
            <Text fontSize={"md"}>{route.name}</Text>
          </Flex>
          )
        })
      }
   
    </VStack>
  );
}

export default SideBar;
