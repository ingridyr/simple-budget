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
  Text,
  Input as ChakraInput,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {useAuth} from "../../providers/AuthContext/index"
import {useExpenses} from "../../providers/ExpensesContext/index"

const schema = yup.object().shape({
  name: yup.string().required("Field Required"),
  description: yup.string().required("Field Required"),
  amount: yup.number().required("Field Required").min(1, "Amount value should be higher than 0")
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

  const {accessToken} = useAuth()
  const {restoreInfos, updateExpense} = useExpenses()

  const changeExpenseData = (data: ModalData) => {
    updateExpense(selectedItem.id, accessToken, data)
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<ModalData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if(selectedItem.id){
      restoreInfos(selectedItem.id, reset)
    }
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
          onSubmit={handleSubmit(changeExpenseData)}
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
                {...register("name")}
              />
              <Text color="red">{errors.name?.message}</Text>
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
                type="text"
                {...register("description")}
              />
              <Text color="red">{errors.description?.message}</Text>
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
                {...register("amount")}
              />
              <Text color="red">{errors.amount?.message}</Text>
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
