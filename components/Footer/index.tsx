import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { NetworkList } from "../NetworkMenu";
import { useNetworkStore } from "../../store";

function Footer() {
  const network = useNetworkStore((state) => state.network);
  const [name, setName] = useState(NetworkList[1].value);

  const updateNetworkName = (uri: string) => {
    const name = NetworkList.find((network) => {
      if (network.uri == uri) {
        return network.value;
      }
    });

    if (name === undefined) {
      console.log("THIS IS UNDEFINED");
      return;
    }

    setName(name?.value);
  };

  useEffect(() => {
    console.log("NETWORK", network);
    updateNetworkName(network);
  }, [network]);
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

        <Text
          px={1}
          textTransform="uppercase"
          fontWeight="bold"
          textColor={"black"}
          fontSize="sm"
        >
          {name}
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
