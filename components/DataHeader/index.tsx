import { Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

type DataHeaderType = {
  title: string;
  titleIcon: string;
  bg: string;
  actionText: string;
  actionIcon: string;
};

const DataHeader = (props: DataHeaderType) => {
  return (
    <Flex
      w="full"
      align={"center"}
      justify="space-between"
      h="9"
      bg="brand.600"
      color="white"
    >
      <HStack px={3} py={1} h="full" bg={props.bg} color="black">
        <Image
          src={props.titleIcon}
          width={20}
          height={20}
          alt="On Chain Data Icon"
        />
        <Text align={"center"}>{props.title}</Text>
      </HStack>
      <HStack px={3}>
        <Image
          src={props.actionIcon}
          width={20}
          height={20}
          alt="Refresh Icon"
        />
        <Text>{props.actionText}</Text>
      </HStack>
    </Flex>
  );
};

export default DataHeader;
