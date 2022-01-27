import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  titulo: yup.string().required("Titulo obrigatorio"),
  total: yup.number().required("valor a ser inserido"),
});

interface ModalData {
  titulo: string;
  total: number;
}

export const ModalAddExpense = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [despesa, setDespesa] = useState<ModalData>({} as ModalData);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ModalData>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Center w="70px" h="70px">
        <Button
          onClick={onOpen}
          bg="white"
          color="purple.500"
          borderRadius="50%"
          fontSize="40px"
        >
          +
        </Button>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent
          bg="black.500"
          border="1px solid"
          borderColor="green.500"
          pb="25px"
          borderRadius="10px"
          boxShadow="1px 0px 62px 0px rgb(0,245,155)"
          as="form"
          onSubmit={handleSubmit(setDespesa)}
        >
          <ModalHeader pb={4}></ModalHeader>
          <ModalCloseButton color="purple.500" fontSize="16px" />
          <ModalBody
            pb={3.5}
            w="90%"
            display="flex"
            flexDir="column"
            alignSelf="center"
          >
            <FormControl
              display="flex"
              flexDir="column"
              justifyContent="center"
            >
              <FormLabel fontSize="20px">Titulo</FormLabel>
              <ChakraInput
                bg="white"
                p="28px 16px"
                color="black.500"
                placeholder="Titulo"
                type="text"
                {...register("titulo")}
              />
              <FormErrorMessage>{errors.titulo?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              mt={4}
              display="flex"
              flexDir="column"
              justifyContent="center"
            >
              <FormLabel fontSize="20px">Total</FormLabel>
              <ChakraInput
                bg="white"
                p="28px 16px"
                color="black.500"
                placeholder="Total"
                type="number"
                {...register("total")}
              />
              <FormErrorMessage>{errors.total?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="center" pr="0px" pl="0px" pb={6}>
            <Button
              padding="28px 0px"
              colorScheme="gray"
              w="80%"
              color="black.500"
              type="submit"
              border="3px solid"
              borderColor="white"
              onClickCapture={() => {}}
              _hover={{
                bg: "gray.600",
                border: "3px solid",
                borderColor: "purple.500",
                color: "white",
              }}
            >
              Add expenssive
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
