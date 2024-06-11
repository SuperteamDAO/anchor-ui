import { create } from "zustand";

export enum Cluster {
  MainnetBeta = "mainnet-beta",
  Testnet = "testnet",
  Devnet = "devnet",
  Localnet = "localnet",
  Custom = "custom",
}
export const CLUSTERS = [
  Cluster.MainnetBeta,
  Cluster.Devnet,
  Cluster.Localnet,
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
    case Cluster.Localnet:
      return "localnet";
    case Cluster.Custom:
      return "custom";
  }
}

// slug to cluster
export function slugToCluster(slug: string): Cluster {
  switch (slug) {
    case "mainnet-beta":
      return Cluster.MainnetBeta;
    case "testnet":
      return Cluster.Testnet;
    case "devnet":
      return Cluster.Devnet;
    case "custom":
      return Cluster.Custom;
    case "localnet":
      return Cluster.Localnet;
    default:
      return Cluster.Devnet;
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
    case Cluster.Localnet:
      return "Localnet";
    case Cluster.Custom:
      return "Custom";
  }
}

export const MAINNET_BETA_URL = "https://api.mainnet-beta.solana.com";
export const TESTNET_URL = "https://api.testnet.solana.com";
export const DEVNET_URL = "https://api.devnet.solana.com";
export const LOCALHOST_URL = "http://localhost:8899";

export const DEFAULT_CLUSTER = Cluster.Localnet;

export interface RpcStore {
  cluster: Cluster;
  customRpc: string;
  setCustomCluster: (uri: string) => void;
  setCluster: (cluster: Cluster) => void;
  getRpcUrl: (cluster: Cluster) => string;
}

const initialState: RpcStore = {
  cluster: DEFAULT_CLUSTER,
  customRpc: "",
  setCustomCluster: (uri: string) => {},
  setCluster: (cluster: Cluster) => {},
  getRpcUrl: (cluster: Cluster) => "",
};

export const useClusterStore = create<RpcStore>((set, get) => ({
  ...initialState,
  setCustomCluster: (uri: string) => {
    if (get().cluster === Cluster.Custom) {
      set({ customRpc: uri });
    }
  },
  setCluster: (cluster: Cluster) => set({ cluster }),
  getRpcUrl: (cluster: Cluster): string => {
    switch (cluster) {
      case Cluster.MainnetBeta:
        return MAINNET_BETA_URL;
      case Cluster.Testnet:
        return TESTNET_URL;
      case Cluster.Devnet:
        return DEVNET_URL;
      case Cluster.Localnet:
        return LOCALHOST_URL;
      case Cluster.Custom:
        return get().customRpc;
    }
  },
}));
