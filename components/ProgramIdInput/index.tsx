import React from 'react'
import { Box, Flex, Grid, GridItem,Input,HStack,Text } from "@chakra-ui/react";
import { useProgramId } from '../../store';

function ProgramIdInput() {

    // TODO: Later add this state in localStorage via zustand
    const programId = useProgramId((state) => state.programId);
    const setProgramId = useProgramId((state) => state.setProgramId);

  return (
    <HStack px={3} py={1} borderBottom={"2px"} borderColor = "brand.500">
        <Text color='white' >Program id:</Text>
      <Input variant={"unstyled"} w={"80%"} value={programId} onChange={(e) => setProgramId(e.target.value)} placeholder="CDDMdCAWB5AXgvEy7XJRggAu37QPG1b9aJXndZoPUkkm" />
      </HStack>
  )
}

export default ProgramIdInput