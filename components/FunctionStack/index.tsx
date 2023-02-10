import { Box } from "@chakra-ui/react";
import React from "react";
import DataHeader from "../DataHeader";

function FunctionStack() {
  return (
    <Box>
      <DataHeader
        title="Function Stack"
        bg="#94acff"
        titleIcon="/assets/mon.svg"
        actionText="Clear"
        actionIcon="/assets/eraser.svg"
      />
    </Box>
  );
}

export default FunctionStack;
