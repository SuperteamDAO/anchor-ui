import React, {
  FC,
  useEffect,
  useState,
  useMemo,
  Children,
  MouseEventHandler,
  useCallback,
} from "react";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import NetworkMenu from "../NetworkMenu";
import styles from "styles/Home.module.css";
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
  VStack,
} from "@chakra-ui/react";
import WalletDropdown from "../WalletDropdown";

const NavBar: FC<ButtonProps> = ({ children, disabled, onClick, ...props }) => {
  return (
    <Flex
      align={"center"}
      p={4}
      justify="space-between"
      borderBottom={"2px"}
      borderColor="brand.500"
    >
      <Box>
        <Image
          src="assets/logo.svg"
          width={250}
          height={100}
          alt="Anchor UI Logo"
        />
      </Box>
      <Flex align={"center"}>
        <NetworkMenu />
        <WalletDropdown />
      </Flex>
    </Flex>
  );
};

export default NavBar;
