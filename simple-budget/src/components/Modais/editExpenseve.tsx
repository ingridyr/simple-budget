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

import { useAuth } from "../../providers/AuthContext/index";
import { useExpenses } from "../../providers/ExpensesContext/index";
import { InputForm } from "../Input";

const schema = yup.object().shape({
  name: yup.string().required("Name required"),
  description: yup.string().required("Description required"),
  amount: yup
    .number()
    .required("Amount Required")
    .min(1, "Amount value should be higher than 0"),
});

interface ModalData {
  name: string;
  description: string;
  amount: number;
  budgetId: string;
  id: string;
  type: string;
  userId: number;
}

interface SelectedItem {
  name: string;
  description: string;
  amount: number;
  budgetId: string;
  id: string;
  type: string;
}

interface ModalEditExpenseProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  selectedItem: SelectedItem;
}

export const ModalEditExpense = ({
  isOpen,
  onClose,
  onOpen,
  selectedItem,
}: ModalEditExpenseProps) => {
  const { accessToken } = useAuth();
  const { restoreInfos, updateExpense, deleteExpense } = useExpenses();

  const changeExpenseData = (data: ModalData) => {
    updateExpense(selectedItem.id, accessToken, data);
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ModalData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (selectedItem.id) {
      restoreInfos(selectedItem.id, reset);
    }
  }, [selectedItem]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent
          marginY="auto"
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
              <InputForm
                name="name"
                label="Name"
                register={register}
                placeholder="Ex: Cardiologist"
                error={errors.name}
              />
            </FormControl>
            <FormControl
              mt={4}
              display="flex"
              flexDir="column"
              justifyContent="center"
            >
              <InputForm
                name="description"
                label="Description"
                register={register}
                placeholder="Ex: doit review"
                error={errors.description}
              />
            </FormControl>
            <FormControl
              mt={4}
              display="flex"
              flexDir="column"
              justifyContent="center"
            >
              <InputForm
                name="amount"
                label="Amount"
                register={register}
                placeholder="Ex: 200"
                error={errors.amount}
              />
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
              onClick={() => {
                deleteExpense(selectedItem.id, accessToken);
                onClose();
              }}
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
