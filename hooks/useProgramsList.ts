import { create } from "zustand";
import { AnchorProvider, Idl } from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";

interface ProgramsListStore {
  programs: Program[];
  addProgram: (program: Program) => void;
  removeProgram: (program: Program) => void;
}

const initialState: ProgramsListStore = {
  programs: [],
  addProgram: (program: Program) => {},
  removeProgram: (program: Program) => {},
};

export const useProgramsListStore = create<ProgramsListStore>((set, get) => ({
  ...initialState,
  addProgram: (program: Program) =>
    set((state) => ({ programs: [...state.programs, program] })),
  removeProgram: (program: Program) =>
    set((state) => ({ programs: state.programs.filter((p) => p !== program) })),
}));

// i don't think removeProgram is going to work this way so lets see how we can fix it
