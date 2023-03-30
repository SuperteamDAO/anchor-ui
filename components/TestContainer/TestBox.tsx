import React from "react";
import * as anchor from "@coral-xyz/anchor";
import {
  Box,
  Flex,
  Text,
  Heading,
  HStack,
  VStack,
  Image,
  IconButton,
  useBoolean,
  FormControl,
  FormLabel,
  Input,
  Button,
  Tag,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { IdlAccount, IdlInstruction } from "@coral-xyz/anchor/dist/cjs/idl";
import { useForm } from "react-hook-form";

type TestBoxProps = {
  instruction: IdlInstruction;
};

type AccountProps = {
  text: String;
};

const AccountType = ({ text }: AccountProps) => {
  return (
    <Tag size={"sm"} color="white" borderRadius="0" bg="#232323">
      {text}
    </Tag>
  );
};

function TestBox({ instruction }: TestBoxProps) {
  const [open, setOpen] = useBoolean();
  console.log("instruction.accounts", instruction?.accounts);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log("DATA", data);
  return (
    <Box w="full">
      <HStack
        bg="#232323"
        justify={"space-between"}
        color="white"
        py={4}
        px={6}
        onClick={setOpen.toggle}
        borderRadius="md"
      >
        <HStack>
          <Image
            src={"/assets/input_icon.svg"}
            alt="IDL Editor Icon"
            width={"12px"}
            height={"15px"}
          />
          <Text fontWeight={"semibold"} fontSize={"18px"}>
            {instruction.name !== undefined ? instruction.name : "Unnamed"}
          </Text>
        </HStack>
        <Box>
          {open ? (
            <ChevronUpIcon w={8} h={8} />
          ) : (
            <ChevronDownIcon w={8} h={8} />
          )}
        </Box>
      </HStack>
      {open && (
        <Box borderRadius="md" mt={2} bg="#191919" py={4} px={6} color="white">
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Box
              w={"full"}
              pb={1}
              borderBottom="1px"
              borderBottomColor={"brand.500"}
            >
              <Text fontWeight={"semibold"}>Accounts</Text>
            </Box>
            <Box pt={1}>
              {instruction.accounts.map((account, index) => {
                const idlAccount = account as IdlAccount;
                return (
                  <Box key={index} mb={4}>
                    <Box>
                      <FormControl key={account.name} id={account.name}>
                        <FormLabel htmlFor={account.name} fontWeight="medium">
                          {account.name}
                        </FormLabel>
                        <Input
                          variant="filled"
                          bg="#232323"
                          borderRadius={"0"}
                          _hover={{ bg: "#444444", borderColor: "#444444" }}
                          _active={{ bg: "#999999", borderColor: "#444444" }}
                          _focus={{ bg: "#444444", borderColor: "#444444" }}
                          maxW={"50%"}
                          type="text"
                          {...register(account.name, {
                            required: "This field is required",
                          })}
                          placeholder={account.name}
                        />
                        <HStack pt={1} spacing={1}>
                          {idlAccount.isMut && (
                            <AccountType text={"isMutable"} />
                          )}
                          {idlAccount.isSigner && (
                            <AccountType text="isSigner" />
                          )}
                          {idlAccount.isOptional && (
                            <AccountType text="isOptional" />
                          )}
                        </HStack>
                      </FormControl>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box
              w={"full"}
              pb={1}
              borderBottom="1px"
              borderBottomColor={"brand.500"}
            >
              <Text fontWeight={"semibold"}>Args</Text>
            </Box>
            <Box pt={1}>
              {instruction.args.map((arg, index) => (
                <FormControl key={arg.name}>
                  <FormLabel htmlFor={arg.name}>{arg.name}</FormLabel>
                  <Input
                    variant="filled"
                    bg="#232323"
                    borderRadius={"0"}
                    _hover={{ bg: "#444444", borderColor: "#444444" }}
                    _active={{ bg: "#999999", borderColor: "#444444" }}
                    _focus={{ bg: "#444444", borderColor: "#444444" }}
                    maxW={"50%"}
                    type="text"
                    {...register(arg.name, {
                      required: "This field is required",
                    })}
                    placeholder={arg.name}
                  />
                </FormControl>
              ))}
            </Box>
            <HStack pt={3}>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </HStack>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default TestBox;
