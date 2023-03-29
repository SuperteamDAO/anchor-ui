import React, { useEffect, useState } from "react";
import { VStack, Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const routes = [
  {
    name: "IDL",
    img: "/assets/idl_icon.svg",
    route: "/",
  },
  {
    name: "Test",
    img: "/assets/test.png",
    route: "/test",
  },
  {
    name: "Docs",
    img: "/assets/docs_icon.svg",
    route: "/docs",
  },
];

function SideBar() {
  const router = useRouter();
  // TODO: Add transition to sidebar it's kind of rough

  return (
    <VStack h="full" borderRight={"2px"} borderColor="brand.500">
      {routes.map((route) => {
        return (
          <Link key={route.route} href={route.route} style={{ width: "100%" }}>
            <Flex
              w={"100%"}
              sx={
                router.pathname === route.route
                  ? {
                      backgroundColor: "#232323",
                      borderColor: "#4A83EE !important",
                      borderLeft: "2px",
                    }
                  : {}
              }
              p={6}
              flexDir={"column"}
              justify="center"
              align={"center"}
            >
              <Image
                src={route.img}
                alt="IDL Editor Icon"
                width={24}
                height={24}
              />
              <Text fontSize={"md"}>{route.name}</Text>
            </Flex>
          </Link>
        );
      })}
    </VStack>
  );
}

export default SideBar;
