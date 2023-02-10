import React from "react";
import { Flex, Heading, Text, HStack, VStack, Box } from "@chakra-ui/react";
import Image from "next/image";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import DataHeader from "../DataHeader";

const tabs = ["raffler", "ticket", "raffle"];

function OnChainData() {
  return (
    <VStack borderColor="brand.500">
      <DataHeader
        title="ON CHAIN DATA"
        titleIcon="/assets/data.svg"
        bg="brand.400"
        actionText="Refresh"
        actionIcon="/assets/refresh.svg"
      />
      <Tabs isFitted width={"100%"}>
        <TabList>
          {tabs.map((tab) => {
            return (
              <Tab
                _active={{ background: "transparent" }}
                _selected={{ borderColor: "brand.800" }}
                borderColor="brand.500"
                key={tab}
              >
                {tab}
              </Tab>
            );
          })}
        </TabList>
      </Tabs>
      <Flex
        py={2}
        borderBottom={"2px"}
        borderColor="brand.500"
        w="100%"
        align="center"
        px={4}
      >
        <Text pr={2} fontWeight="bold">
          ADDRESS:
        </Text>
        <Input
          variant={"unstyled"}
          placeholder="9iSD3wkC1aq3FcwgjJfEua9FkkZJWv7Cuxs6sKjc3VnR"
        />
        <ArrowDownIcon />
      </Flex>
      <Flex h="xs">
        <Text>This is where the data will be displayed</Text>
      </Flex>
    </VStack>
  );
}

export default OnChainData;
