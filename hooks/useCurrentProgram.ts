import { create } from "zustand";
import { AnchorProvider, Idl } from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";

export interface CurrentProgramStore {
  program: Program | null;
  setProgram: (program: Program) => void;
}

const initialState: CurrentProgramStore = {
  program: null,
  setProgram: (program: Program) => {},
};

export const useCurrentProgramStore = create<CurrentProgramStore>(
  (set, get) => ({
    ...initialState,
    setProgram: (program: Program) => {
      set({ program: program });
    },
  })
);
