import { create } from "zustand";
import { AnchorProvider, Idl } from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";

export interface AnchorStore {
  idl: Idl;
  setIdl: (idl: Idl) => void;
  program: Program | null;
  setProgram: (provider?: AnchorProvider) => void;
}

const initialState: AnchorStore = {
  idl: {} as Idl,
  setIdl: (idl: Idl) => {},
  program: null,
  setProgram: (provider?: AnchorProvider) => {},
};

export const useAnchorStore = create<AnchorStore>((set, get) => ({
  ...initialState,

  setIdl: (idl: Idl) => set({ idl }),
  setProgram: (provider?: AnchorProvider) => {
    const program = new Program(get().idl, provider);
    set({ program });
  },
}));
