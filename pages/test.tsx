import React from "react";
import { Box, Center, Heading } from "@chakra-ui/react";
import { useProgram } from "../store";
import TestContainer from "../components/TestContainer";

function Test() {
  const program = useProgram((state) => state.program);

  console.log("PROGRAM IN TEST", program);
  if (program === undefined) {
    return (
      <Center p={4}>
        <Heading color={"gray.200"}>No Program Found</Heading>
      </Center>
    );
  } else {
    return (
      <Box p={4}>
        <TestContainer program={program} />
      </Box>
    );
  }
}

export default Test;
