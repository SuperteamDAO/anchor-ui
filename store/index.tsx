import { create } from "zustand";
import * as anchor from "@coral-xyz/anchor";
import { persist, createJSONStorage } from "zustand/middleware";

export enum Networks {
  mainnet = "https://api.mainnet-beta.solana.com",
  devnet = "https://api.devnet.solana.com",
  localnet = "http://localhost:8899",
}

interface NetworkState {
  network: Networks;
  setNetwork: (network: Networks) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  network: Networks.devnet,
  setNetwork: (network) => set({ network: network }),
}));

interface IDLStore {
  idl: any;
  setIdl: (data: any) => void;
}

const idl = {
  version: "0.1.0",
  name: "dummy",
  instructions: [
    {
      name: "setData",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "storageAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "text",
          type: "string",
        },
      ],
    },
    {
      name: "changeText",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "storageAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "text",
          type: "string",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "Storage",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "text",
            type: "string",
          },
          {
            name: "no",
            type: "u64",
          },
        ],
      },
    },
  ],
  metadata: {
    address: "28CDRWqCXVRyibawAucbTDYe3RQthce7zG6Bizv16FYr",
  },
};

export const useIDLStore = create<IDLStore>((set) => ({
  idl: idl,
  // Possibly add a Parsing Logic
  setIdl: (data: any) => set({ idl: data }),
}));

interface ProgramId {
  programId: string;
  setProgramId: (id: string) => void;
}

export const useProgramId = create<ProgramId>((set) => ({
  programId: "28CDRWqCXVRyibawAucbTDYe3RQthce7zG6Bizv16FYr",
  setProgramId: (id: string) => set({ programId: id }),
}));

interface Program {
  program?: anchor.Program;
  setProgram: (program: anchor.Program) => void;
}

export const useProgram = create<Program>((set) => ({
  program: undefined,
  setProgram: (program: anchor.Program) => set({ program: program }),
}));
