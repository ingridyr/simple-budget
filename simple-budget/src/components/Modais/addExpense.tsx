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

interface ModalAddExpenseProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalAddExpense = ({
  isOpen,
  onClose,
  onOpen,
}: ModalAddExpenseProps) => {
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
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent
          bg="black.500"
          border="1px solid"
          borderColor="green.500"
          pb="25px"
          borderRadius="10px"
          boxShadow="0px 1px 7px 2px #00F59B"
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
              onClickCapture={() => {}}
              _hover={{
                bg: "gray.600",
                border: "3px solid",
                borderColor: "purple.500",
                color: "white",
              }}
            >
              Add expense
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
