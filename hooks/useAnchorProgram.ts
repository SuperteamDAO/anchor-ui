import { useNetworkStore, useProgramId, useIDLStore } from "../store";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@chakra-ui/react";
import * as anchor from "@coral-xyz/anchor";

export const useAnchorProgram = () => {
  const anchorWallet = useAnchorWallet();
  const toast = useToast();
  const network = useNetworkStore((state) => state.network);
  const programId = useProgramId((state) => state.programId);
  const idl = useIDLStore((state) => state.idl);

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

    return;
  }

  if (network === null || programId == null || idl == null) {
    toast({
      title: "Something went Wrong",
      description: "There is some issue with your Inputs of ProgramID and IDL",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
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

  return program;
};
