import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useExpenses } from "../../providers/ExpensesContext";
import { useAuth } from "../../providers/AuthContext";

const schema = yup.object().shape({
  name: yup.string().required("Field required"),
  description: yup.string().required("Field required"),
  amount: yup.number().required("Field required"),
  type: yup.string().required("Choose a category"),
});

interface ModalData {
  name: string;
  description: string;
  amount: number;
  type: string;
  userId: string;
}

interface ModalAddExpenseProps {
  budgetCategories: string[];
  budgetId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalAddExpense = ({
  budgetCategories,
  budgetId,
  isOpen,
  onClose,
}: ModalAddExpenseProps) => {
  const { createExpense } = useExpenses();
  const { accessToken } = useAuth();

  const toast = useToast();

  const onSubmitFunction = ({ name, description, amount, type }: ModalData) => {
    toast({
      title: "Expense created successfully!",
      duration: 9000,
      isClosable: true,
      status: "success",
      position: "top",
    });

    const newData = {
      name: name,
      description: description,
      amount: amount,
      type: type,
      budgetId: budgetId,
    };
    createExpense(newData, accessToken);
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
          boxShadow="0px 1px 7px 2px #00F59B"
          as="form"
          onSubmit={handleSubmit(onSubmitFunction)}
        >
          <ModalCloseButton color="purple.500" fontSize="16px" m="8px" />
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
              <Box
                bg="black.500"
                as="select"
                _focusVisible={{
                  outlineColor: "black.500",
                }}
                w="70%"
                fontSize="20px"
                marginTop="10px"
                {...register("type")}
              >
                <Box as="option" disabled selected value="">
                  Choose the category
                </Box>
                {budgetCategories.map((item) => (
                  <Box as="option" value={item}>
                    {item}
                  </Box>
                ))}
              </Box>
              <FormLabel marginTop="10px" fontSize="18px">
                Name
              </FormLabel>
              <ChakraInput
                bg="white"
                p="23px"
                color="black.500"
                placeholder="Ex: Cardiologist"
                type="text"
                {...register("name")}
              />

              <FormLabel marginTop="10px" fontSize="18px">
                Description
              </FormLabel>
              <ChakraInput
                bg="white"
                p="23px"
                color="black.500"
                outline="none"
                type="text"
                placeholder="Ex: Medical check - Dr.Strauss"
                {...register("description")}
              />

              <FormLabel marginTop="10px" fontSize="18px">
                Amount
              </FormLabel>
              <ChakraInput
                bg="white"
                p="23px"
                color="black.500"
                outline="none"
                type="number"
                placeholder="Ex: 300.00"
                {...register("amount")}
              />
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
              borderRadius="10px"
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
