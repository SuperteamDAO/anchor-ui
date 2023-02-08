import React, { FC, useEffect, useState, useMemo, Children, MouseEventHandler, useCallback } from 'react'
import Image from 'next/image'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import NetworkMenu from '../NetworkMenu'
import styles from 'styles/Home.module.css'
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
  VStack
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-phantom";

const NavBar: FC<ButtonProps> = ({ children, disabled, onClick, ...props }) => {
  const { publicKey, disconnect, wallet, connect, connecting, connected, wallets, select } = useWallet();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(

    (event) => {

      if (onClick) onClick(event);
      if (wallet) {
        select(wallet.adapter.name)
      }
      else {
        select(PhantomWalletName)
      }

      if (!event.defaultPrevented) connect().catch(() => { });
    },

    [onClick, connect]
  );
  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (children) return children;
    if (connecting) return 'Connecting ...';
    if (connected) return base58.slice(0, 4) + '..' + base58.slice(-4);
    if (wallet) return wallet.adapter.name;
    return 'Connect Wallet';
  }, [children, connecting, connected, wallet]);

  return (
    <Flex align={"center"} p={4} justify="space-between" borderBottom={"2px"} borderColor="brand.500" >
      <Box>
        <Image src="assets/logo.svg" width={250} height={100} alt="Anchor UI Logo" />
      </Box>
      <Flex align={"center"}>
        <NetworkMenu />
        <Menu>
          <MenuButton
            as={Button}
            borderRadius="none"
            width={44}
            backgroundColor={"#4773E3"}
            _hover={{
              backgroundColor: "#282828 ",
              color: "white",
            }}
            _active={{
              backgroundColor: "#1f1f1f",
              color: "white",
            }}
          >
            <Flex gap={2} justify='center' align='center'>
              {connected && <img src={wallet.adapter.icon}
                width={'25px'}
                height={'25px'}></img>} {content}
            </Flex>

          </MenuButton>
          <MenuList borderColor={"brand.600"} bg={"brand.600"} color={"white"}>
            <MenuItem borderColor={"brand.600"} bg={"brand.600"} color={"white"}>
              <VStack gap={4}>
                {!publicKey ? (
                  <VStack>
                    {wallets
                      .filter((wallet) => wallet.readyState === "Installed")
                      .map((wallet) => (
                        <Button
                          key={wallet.adapter.name}
                          onClick={() => select(wallet.adapter.name)}
                          fontSize="md"
                          borderRadius="none"
                          width={60}
                          backgroundColor={"brand.600"}
                          _hover={{
                            backgroundColor: "#282828 ",
                            color: "white",
                          }}
                          _active={{
                            backgroundColor: "#1f1f1f",
                            color: "white",
                          }}
                        >
                          <Flex align='center' gap={2} justify='space-between'> <img src={wallet.adapter.icon}
                            width={'25px'}
                            height={'25px'}></img>
                            {wallet.adapter.name}
                          </Flex>
                        </Button>
                      ))}
                  </VStack>
                ) : (
                  <Flex align={"center"} justify="center" >
                    <Button onClick={disconnect}
                      fontSize="md"
                      align={'center'}
                      width={60}
                      borderRadius="none"
                      backgroundColor={"brand.600"}
                      _hover={{
                        backgroundColor: "#282828 ",
                        color: "white",
                      }}
                      _active={{
                        backgroundColor: "#1f1f1f",
                        color: "white",
                      }}>Disconnect Wallet
                    </Button>
                  </Flex>
                )}
              </VStack>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex >

  );
};

export default NavBar