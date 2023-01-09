import React from 'react'
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
    Box
  } from '@chakra-ui/react'
  import {ChevronDownIcon} from "@chakra-ui/icons"

  enum Networks  {
    Mainnet = "https://api.mainnet-beta.solana.com",
    Devnet = "https://api.devnet.solana.com",
    Localnet = "http://localhost:8899"
  }
  



function NetworkMenu() {
    const NetworkList = [
        {
            value : "Mainnet",
            uri: Networks.Mainnet,
        },
        {
            value : "Devnet",
            uri: Networks.Devnet,
        },
        {
            value : "Localnet",
            uri: Networks.Localnet,
        }
      ]
  return (
    <Box px={4}>
         <Menu >
         <MenuButton as={Button} colorScheme="twitter"  rightIcon={<ChevronDownIcon />}>

    Select Network
  </MenuButton>
  <MenuList color={"blackAlpha.800"}>
    {
        NetworkList.map((network) => 
            <MenuItem key={network.value}>{network.value}</MenuItem>
        )
    }
  </MenuList>
    </Menu>
    </Box>
  )
}

export default NetworkMenu