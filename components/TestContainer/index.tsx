import React from "react";
import * as anchor from "@coral-xyz/anchor";
import TestBox from "./TestBox";
import { Box, VStack, Text } from "@chakra-ui/react";

type TestContainerType = {
  program: anchor.Program;
};

function TestContainer({ program }: TestContainerType) {
  const idl = program.idl;

  console.log("IDL IN TEST CONTAINER", idl);

  return (
    <Box>
      <Text
        pb={4}
        borderBottom="1px"
        borderColor="brand.500"
        color={"white"}
        fontWeight="extrabold"
        fontSize="2xl"
      >
        {idl.name !== undefined ? idl.name : "Unnamed"} -{" "}
      </Text>
      <VStack
        maxH={"86vh"}
        pt={4}
        pb={20}
        spacing={4}
        overflowY="scroll"
        css={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        {idl.instructions.map((instruction, index) => {
          return <TestBox instruction={instruction} key={index} />;
        })}
      </VStack>
    </Box>
  );
}

export default TestContainer;
