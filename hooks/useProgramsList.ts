import { create } from "zustand";
import { AnchorProvider, Idl } from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";

interface ProgramsListStore {
  programs: Program[];
  addProgram: (program: Program) => void;
  removeProgram: (program: Program) => void;
  editProgram: (programId: string, program: Program) => void;
}

const initialState: ProgramsListStore = {
  programs: [],
  addProgram: (program: Program) => {},
  removeProgram: (program: Program) => {},
  editProgram: (programId: string, program: Program) => {},
};

export const useProgramsListStore = create<ProgramsListStore>((set, get) => ({
  ...initialState,
  addProgram: (program: Program) =>
    set((state) => ({ programs: [...state.programs, program] })),
  removeProgram: (program: Program) => {
    set((state) => ({
      programs: state.programs.filter((p) => p.programId !== program.programId),
    }));
  },
  editProgram: (programId: string, program: Program) => {
    if (program) {
      set((state) => ({
        programs: state.programs.map((p) => {
          if (p.programId.toString() === programId) {
            return program;
          }
          return p;
        }),
      }));
    }
  },
}));
