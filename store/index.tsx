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

export const useIDLStore = create<IDLStore>((set) => ({
  idl: null,
  // Possibly add a Parsing Logic
  setIdl: (data: any) => set({ idl: data }),
}));

interface ProgramId {
  programId: string;
  setProgramId: (id: string) => void;
}

export const useProgramId = create<ProgramId>((set) => ({
  programId: "",
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
