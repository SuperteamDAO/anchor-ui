import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export enum Networks {
    mainnet = "https://api.mainnet-beta.solana.com",
    devnet = "https://api.devnet.solana.com",
    localnet = "http://localhost:8899"
}

interface NetworkState {
    network: Networks,
    setNetwork: (network: Networks) => void
}


export const useNetworkStore = create<NetworkState>((set) => ({
    network: Networks.devnet ,
    setNetwork: (network) => set({network: network})
}))


export const useIDLStore = create((set) => ({
    idl: JSON,
    // Possibly add a Parsing Logic
    setIDL: (data:any) => set({idl:data})
}))