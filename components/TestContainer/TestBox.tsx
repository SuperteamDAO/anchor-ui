import React from "react";
import * as anchor from "@coral-xyz/anchor";
import {
  Box,
  Flex,
  Text,
  Heading,
  HStack,
  VStack,
  Image,
  IconButton,
  useBoolean,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { IdlInstruction } from "@coral-xyz/anchor/dist/cjs/idl";

type TestBoxProps = {
  instruction: IdlInstruction;
};

function TestBox({ instruction }: TestBoxProps) {
  const [open, setOpen] = useBoolean();
  console.log("instruction.accounts", instruction?.accounts);
  return (
    <Box w="full">
      <HStack
        bg="#232323"
        justify={"space-between"}
        color="white"
        py={4}
        px={6}
        onClick={setOpen.toggle}
        borderRadius="md"
      >
        <HStack>
          <Image
            src={"/assets/input_icon.svg"}
            alt="IDL Editor Icon"
            width={"12px"}
            height={"15px"}
          />
          <Text fontWeight={"semibold"} fontSize={"18px"}>
            {instruction.name !== undefined ? instruction.name : "Unnamed"}
          </Text>
        </HStack>
        <Box>
          {open ? (
            <ChevronUpIcon w={8} h={8} />
          ) : (
            <ChevronDownIcon w={8} h={8} />
          )}
        </Box>
      </HStack>
      {open && (
        <Box borderRadius="md" mt={2} bg="#191919" py={4} px={6} color="white">
          <Text>{JSON.stringify(instruction.accounts)}</Text>
        </Box>
      )}
    </Box>
  );
}

export default TestBox;
