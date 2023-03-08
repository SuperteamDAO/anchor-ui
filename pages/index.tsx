import Head from "next/head";
import Image from "next/image";
import {
  useToast,
  Box,
  Flex,
  Grid,
  GridItem,
  Input,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";

import JsonEditor from "../components/JsonEditor";
import ProgramIdInput from "../components/ProgramIdInput";
import * as anchor from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useNetworkStore, useProgramId, useIDLStore } from "../store";
import { useState } from "react";

export default function Home() {
  const network = useNetworkStore((state) => state.network);
  const programId = useProgramId((state) => state.programId);
  const idl = useIDLStore((state) => state.idl);
  const anchorWallet = useAnchorWallet();
  const toast = useToast();
  const [program, setProgram] = useState<anchor.Program>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProgram = () => {
    setIsLoading(true);
    console.log("Network", network);
    console.log("programId", programId);
    console.log("IDL", idl);

    if (!anchorWallet?.publicKey) {
      toast({
        title: "wallet not Found",
        description: "There is some issue with your wallet connection",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    if (network == null) {
      toast({
        title: "No Network Found",
        description:
          "This is some issue with the Network due to which connection is not defined",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    if (programId == null) {
      toast({
        title: "Program Id not Found",
        description: "I think you haven't added the program Id yet",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    if (idl == null) {
      toast({
        title: "IDL Not Found",
        description: "Hey Bro, IDL cannot be Null",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    const opts = {
      preflightCommitment: "processed" as anchor.web3.ConfirmOptions,
    };

    const connection = new anchor.web3.Connection(
      network,
      opts.preflightCommitment
    );

    const provider = new anchor.AnchorProvider(
      connection,
      anchorWallet,
      opts.preflightCommitment
    );

    const program = new anchor.Program(idl, programId, provider);

    setProgram(program);
    toast({
      title: "Program Set",
      description: "Check out the Test's Tab",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setIsLoading(false);
  };

  return (
    <Box>
      <ProgramIdInput />
      <Box pos="relative">
        <Button
          w="24"
          onClick={getProgram}
          isLoading={isLoading}
          colorScheme={"blackAlpha"}
          variant={"solid"}
          pos="absolute"
          top="0"
          right="0"
        >
          Test
        </Button>
        <JsonEditor />
      </Box>
    </Box>
  );
}
