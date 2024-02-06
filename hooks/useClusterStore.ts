import { create } from "zustand";

export enum Cluster {
  MainnetBeta,
  Testnet,
  Devnet,
  Custom,
}
export const CLUSTERS = [
  Cluster.MainnetBeta,
  Cluster.Testnet,
  Cluster.Devnet,
  Cluster.Custom,
];

export function clusterSlug(cluster: Cluster): string {
  switch (cluster) {
    case Cluster.MainnetBeta:
      return "mainnet-beta";
    case Cluster.Testnet:
      return "testnet";
    case Cluster.Devnet:
      return "devnet";
    case Cluster.Custom:
      return "custom";
  }
}

export function clusterName(cluster: Cluster): string {
  switch (cluster) {
    case Cluster.MainnetBeta:
      return "Mainnet Beta";
    case Cluster.Testnet:
      return "Testnet";
    case Cluster.Devnet:
      return "Devnet";
    case Cluster.Custom:
      return "Custom";
  }
}

export const MAINNET_BETA_URL = "https://api.mainnet-beta.solana.com";
export const TESTNET_URL = "https://api.testnet.solana.com";
export const DEVNET_URL = "https://api.devnet.solana.com";

export const DEFAULT_CLUSTER = Cluster.Devnet;

export interface RpcStore {
  cluster: Cluster;
  customRpc: string;
  setCustomCluster: (uri: string) => void;
}

const initialState: RpcStore = {
  cluster: DEFAULT_CLUSTER,
  customRpc: "",
  setCustomCluster: (uri: string) => {},
};

export const useClusterStore = create<RpcStore>((set, get) => ({
  ...initialState,
  setCustomCluster: (uri: string) => {
    set({ customRpc: uri });
    set({ cluster: Cluster.Custom });
  },
  setCluster: (cluster: Cluster) => set({ cluster }),
}));