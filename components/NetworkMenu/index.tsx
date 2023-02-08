import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Box,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Networks, useNetworkStore } from "../../store";
import Image from "next/image";

const NetworkList = [
  {
    value: "Mainnet",
    uri: Networks.mainnet,
  },
  {
    value: "Devnet",
    uri: Networks.devnet,
  },
  {
    value: "Localnet",
    uri: Networks.localnet,
  },
];

function NetworkMenu() {

  const setNetwork = useNetworkStore((state) => state.setNetwork)
  const network = useNetworkStore((state) => state.network);
  const [name,setName] = useState(NetworkList[1].value);

  const updateNetworkName = (uri: string) => {
    
    const name = NetworkList.find(network => {
      if(network.uri == uri){
        return network.value
      }
    });

    if(name === undefined){
      console.log("THIS IS UNDEFINED")
      return;
    }

    setName(name?.value)
  }

  useEffect(() => {
    console.log("NETWORK",network);
    updateNetworkName(network)
  },[network])

  return (
    <Box px={4}>
      <Menu>
        <MenuButton
          as={Button}
          borderRadius="none"
          width={44}
          backgroundColor={"brand.600"}
          leftIcon={
            <Image
              src="/assets/globe.svg"
              width={20}
              height={20}
              alt="Network Button"
            />
          }
          rightIcon={<ChevronDownIcon />}
          _hover={{
            backgroundColor: "#282828 ",
            color: "white",
          }}
          _active={{
            backgroundColor: "#1f1f1f",
            color: "white",
          }}
        >
          {name}
        </MenuButton>
        <MenuList borderColor={"brand.600"} bg={"brand.600"} color={"white"}>
          {NetworkList.map((network) => (
            <MenuItem

              onClick = {
                () => {
                  setNetwork(network.uri)
                }
              }

              bg={"brand.600"}
              _hover={{
                backgroundColor: "#282828 ",
                color: "white",
              }}
              _active={{
                backgroundColor: "#1f1f1f",
                color: "white",
              }}
              key={network.value}
            >
              {network.value}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
}

export default NetworkMenu;
