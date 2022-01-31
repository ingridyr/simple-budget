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
  Text,
  Input as ChakraInput,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {useExpenses} from "../../providers/ExpensesContext/index"

const schema = yup.object().shape({
  name: yup.string().required("Field Required"),
  description: yup.string().required("Field Required"),
  amount: yup.number().required("Field Required")
});

interface ModalData {
  name: string;
  description: string
  amount: number;
  budgetId: string
  id: string
  type: string
}

interface SelectedItem {
  name: string;
  description: string
  amount: number;
  budgetId: string
  id: string
  type: string
}

interface ModalEditExpenseProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  selectedItem: SelectedItem
}

export const ModalEditExpense = ({
  isOpen,
  onClose,
  onOpen,  
  selectedItem,
}: ModalEditExpenseProps) => {
  const [expenseve, setExpenseve] = useState<ModalData>({} as ModalData);

  const {restoreInfos} = useExpenses()

  //aqui recebe a função do provider para efetuar a troca:
  const trocaProvider = (data: ModalData) => {
    setExpenseve(data);
    //logica do provider
    //...
  };

  // console.log(selectedItem)
  // console.log(selectedItem.name)

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<ModalData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    restoreInfos(selectedItem.id, reset)
  }, [selectedItem])


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
              <FormLabel fontSize="20px">Name</FormLabel>
              <ChakraInput
                bg="white"
                p="28px 16px"
                color="black.500"
                placeholder="Name"
                type="text"
                // value={selectedItem.name}
                {...register("name")}
              />
              <Text>{errors.name?.message}</Text>
            </FormControl>
            <FormControl
              mt={4}
              display="flex"
              flexDir="column"
              justifyContent="center"
            >
              <FormLabel fontSize="20px">Description</FormLabel>
              <ChakraInput
                bg="white"
                p="28px 16px"
                color="black.500"
                placeholder="Description"
                type="string"
                // value={selectedItem.description}
                {...register("description")}
              />
              <Text>{errors.description?.message}</Text>
            </FormControl>
            <FormControl
              mt={4}
              display="flex"
              flexDir="column"
              justifyContent="center"
            >
              <FormLabel fontSize="20px">Amount</FormLabel>
              <ChakraInput
                bg="white"
                p="28px 16px"
                color="black.500"
                placeholder="Amount"
                type="number"
                // value={selectedItem.amount}
                {...register("amount")}
              />
              <Text>{errors.amount?.message}</Text>
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
