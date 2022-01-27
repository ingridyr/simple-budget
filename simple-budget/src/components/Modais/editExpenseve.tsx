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
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  title: yup.string().required("titulo obrigatorio"),
  total: yup.number().required("valor a ser inserido"),
});

interface ModalData {
  title: string;
  total: number;
}
interface ModalEditExpenseProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  objeto: ModalData;
}

export const ModalEditExpense = ({
  isOpen,
  onClose,
  onOpen,
  objeto,
}: ModalEditExpenseProps) => {
  const [expenseve, setExpenseve] = useState<ModalData>({} as ModalData);
  const [inputs, setInputs] = useState<ModalData>({
    title: objeto.title,
    total: objeto.total,
  } as ModalData);

  //aqui recebe a função do provider para efetuar a troca:
  const trocaProvider = (data: ModalData) => {
    setExpenseve(data);
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
              color="white"
            >
              <FormLabel fontSize="20px">title</FormLabel>
              <ChakraInput
                bg="white"
                p="28px 16px"
                color="black.500"
                placeholder="title"
                type="text"
                value={inputs.title}
                onChangeCapture={(e) =>
                  setInputs({ ...inputs, title: e.currentTarget.value })
                }
                {...register("title")}
              />
              <p>{errors.title?.message}</p>
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
                value={inputs.total}
                onChangeCapture={(e) =>
                  setInputs({ ...inputs, total: Number(e.currentTarget.value) })
                }
                {...register("total")}
              />
              <p>{errors.total?.message}</p>
            </FormControl>
          </ModalBody>

          <ModalFooter
            w="80%"
            alignSelf="center"
            justifyContent="space-around"
            pr="0px"
            pl="0px"
            pb={6}
          >
            <Button
              padding="28px 0px"
              colorScheme="gray"
              w="45%"
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
              Edit
            </Button>
            <Button
              padding="28px 0px"
              colorScheme="gray"
              w="45%"
              color="black.500"
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
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
