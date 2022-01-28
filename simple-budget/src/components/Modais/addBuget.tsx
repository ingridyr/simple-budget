import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useDisclosure,
  Input as ChakraInput,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required("nome obrigatorio"),
  max: yup
    .number()
    .required("valor a ser inserido")
    .min(1, "no minimo maior ou igual a 1"),
});

interface ModalData {
  name: string;
  max: number;
}
interface ModalEditExpenseProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
/**
{
  isOpen,
  onClose,
  onOpen,
  categorys
}: ModalEditExpenseProps
 */
export const ModalAddBuget = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [category, setCategory] = useState("");
  //aqui recebe a função do provider para efetuar a troca:
  const trocaProvider = (data: ModalData) => {
    console.log(data);
    //logica do provider
    //...
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ModalData>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
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
          onSubmit={handleSubmit(trocaProvider)}
        >
          <ModalHeader color="white" pb={4}>
            <Box
              bg="black.500"
              as="select"
              name="categorias"
              _focusVisible={{
                outlineColor: "black.500",
              }}
            >
              <Box as="option" value="">
                Category
              </Box>
              {[1, 2, 3, 4, 5].map((num) => (
                <Box
                  as="option"
                  value={num}
                  onClick={() => console.log("escolha option")}
                >
                  second Box
                </Box>
              ))}
            </Box>
          </ModalHeader>
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
              color="white"
            >
              <FormLabel fontSize="20px">name</FormLabel>
              <ChakraInput
                bg="white"
                p="28px 16px"
                color="black.500"
                placeholder="name"
                type="text"
                {...register("name")}
              />
              <p>{errors.name?.message}</p>
            </FormControl>

            <FormControl
              mt={4}
              display="flex"
              flexDir="column"
              justifyContent="center"
            >
              <FormLabel fontSize="20px">Máx. Value</FormLabel>
              <ChakraInput
                bg="white"
                p="28px 16px"
                color="black.500"
                placeholder="Máx. Value"
                type="number"
                {...register("max")}
              />
              <p>{errors.max?.message}</p>
            </FormControl>
          </ModalBody>

          <ModalFooter
            alignSelf="center"
            justifyContent="space-around"
            w="100%"
            pr="0px"
            pl="0px"
            pb={6}
          >
            <Button
              padding="28px 0px"
              colorScheme="gray"
              w="80%"
              color="black.500"
              type="submit"
              border="3px solid"
              borderColor="white"
              _hover={{
                bg: "gray.600",
                border: "3px solid",
                borderColor: "purple.500",
                color: "white",
              }}
            >
              Add Buget
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
