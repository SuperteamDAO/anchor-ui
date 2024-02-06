import { create } from "zustand";
import { Program } from "@coral-xyz/anchor";

export interface AnchorStore {
  programId: string;
  setProgramId: (programId: string) => void;
  idl: JSON;
  setIdl: (idl: JSON) => void;
  program: Program;
  setProgram: () => void;
}

// export const useAnchorStore =
