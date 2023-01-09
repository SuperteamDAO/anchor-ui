import React from 'react'
import {VStack,Box,Flex,Text} from "@chakra-ui/react"
import Image from 'next/image'

function SideBar() {
  return (
    <VStack h='full' borderRight={"2px"} borderColor="brand.500">
        <Flex flexDir={"column"} align={'center'}>
            <Box>
                <Image src="assets/idl_icon.svg" alt="IDL Editor Icon" width={24} height={24} />
                <Text fontSize={"xs"}>IDL</Text>
            </Box>
        </Flex>

    </VStack>
  )
}

export default SideBar