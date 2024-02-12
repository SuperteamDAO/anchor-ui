import { create } from "zustand";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";

export interface AnchorStore {
  programId: string;
  setProgramId: (programId: string) => void;
  idl: Idl;
  setIdl: (idl: Idl) => void;
  program: Program | null;
  setProgram: (provider?: AnchorProvider) => void;
}

const initialState: AnchorStore = {
  programId: "",
  setProgramId: (programId: string) => {},
  idl: {} as Idl,
  setIdl: (idl: Idl) => {},
  program: null,
  setProgram: (provider?: AnchorProvider) => {},
};

export const useAnchorStore = create<AnchorStore>((set, get) => ({
  ...initialState,
  setProgramId: (programId: string) => set({ programId }),
  setIdl: (idl: Idl) => set({ idl }),
  setProgram: (provider?: AnchorProvider) => {
    const program = new Program(get().idl, get().programId, provider);
    set({ program });
  },
}));
