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
  const content = useMemo(() => {
    if (children) return children;
    if (connecting) return 'Connecting ...';
    if (connected) return 'Connected';
    if (wallet) return wallet.adapter.name;
    return 'Connect Wallet';
  }, [children, connecting, connected, wallet]);

  console.log('wallets', wallets)
  console.log('WllL', wallet)

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
            {content}
          </MenuButton>
          <MenuList borderColor={"brand.600"} bg={"brand.600"} color={"white"}>
            <MenuItem borderColor={"brand.600"} bg={"brand.600"} color={"white"}>

              <VStack gap={4} mt={2}>
                {/* <Heading>Solana Custom Wallet UI example (Chakra UI)</Heading> */}

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
                          width={44}
                          backgroundColor={"brand.600"}
                          leftIcon={
                            <img src={wallet.adapter.icon}
                              width={'25px'}
                              height={'25px'}></img>
                          }
                          _hover={{
                            backgroundColor: "#282828 ",
                            color: "white",
                          }}
                          _active={{
                            backgroundColor: "#1f1f1f",
                            color: "white",
                          }}
                        >
                          {wallet.adapter.name}
                        </Button>
                      ))}
                  </VStack>
                ) : (
                  <VStack gap={4}>
                    <Text>{publicKey.toBase58()}</Text>
                    <Button onClick={disconnect}
                      fontSize="md"
                      borderRadius="none"
                      width={44}
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
                  </VStack>
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