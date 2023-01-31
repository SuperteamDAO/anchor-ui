import React, { useEffect, useState, Children } from 'react'
import Image from 'next/image'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import NetworkMenu from '../NetworkMenu'
import styles from 'styles/Home.module.css'
import WalletWrapper from '../Wallet/WalletWrapper'
import {
  ButtonProps,
  forwardRef,
  Menu,
  MenuButton,
  Avatar as ChakraAvatar,
  MenuList,
  MenuItem,
  Flex,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

const NavBar = forwardRef<ButtonProps, "button">(
  ({ children, ...otherProps }, ref) => {
    const { select, publicKey, disconnect, signMessage, wallets } = useWallet();
    const [provider, setProvider] = useState<PhantomProvider | undefined>(
      undefined
    );
    const [walletKey, setWalletKey] = useState<PhantomProvider | undefined>(
      undefined
    );

    const getProvider = (): PhantomProvider | undefined => {
      if ("solana" in window) {
        const provider = window.solana as any;
        if (provider.isPhantom) return provider as PhantomProvider;
      }
    };

    const connectWallet = async () => {
      const { solana } = window;

      if (solana) {
        try {
          const response = await solana.connect();
          console.log("wallet account ", response.publicKey.toString());
          setWalletKey(response.publicKey.toString());
        } catch (err) {
        }
      }
    };

    const disconnectWallet = async () => {
      const { solana } = window;

      if (walletKey && solana) {
        await (solana as PhantomProvider).disconnect();
        setWalletKey(undefined);
      }
    };

    useEffect(() => {
      const provider = getProvider();

      if (provider) setProvider(provider);
      else setProvider(undefined);
    }, []);


    return (
      <Flex align={"center"} p={4} justify="space-between" borderBottom={"2px"} borderColor="brand.500" >
        <Box>
          <Image src="assets/logo.svg" width={250} height={100} alt="Anchor UI Logo" />
        </Box>
        <Flex align={"center"}>
          <NetworkMenu />
          <Menu>
            <MenuButton  >
              <WalletMultiButton className={styles.walletButton} >Connect</WalletMultiButton>
            </MenuButton>
            <MenuList borderColor={"brand.600"} bg={"brand.600"} color={"white"}>
              <MenuItem borderColor={"brand.600"} bg={"brand.600"} color={"white"}>

                <Flex direction={'column'}>
                  {wallets.filter(
                    (wallet) => wallet.readyState === "Installed"
                  ).length > 0 ? (
                    wallets
                      .filter((wallet) => wallet.readyState === "Installed")
                      .map((wallet) => (

                        <Button
                          color="white"
                          bg={"brand.600"}
                          key={wallet.adapter.name}
                          onClick={connectWallet}
                          // onClick={() => select(wallet.adapter.name)}
                          _hover={{
                            backgroundColor: "#282828 ",
                            color: "white",
                          }}
                          _active={{
                            backgroundColor: "#1f1f1f",
                            color: "white",
                          }}
                          width={44}
                          leftIcon={
                            <img
                              src={wallet.adapter.icon}
                              alt={wallet.adapter.name}
                              className={styles.walletIcon}
                            />
                          }
                        >
                          <Text>{wallet.adapter.name}</Text>
                        </Button>
                      ))
                  ) : (
                    <>
                      <Text mx={4} textAlign="center">
                        Looks like you don&apos;t have a Solana wallet
                        installed.
                      </Text>
                    </>
                  )}
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

    )
  });

export default NavBar