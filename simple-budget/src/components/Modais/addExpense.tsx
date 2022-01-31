import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  InputProps as ChakraInputProps,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useExpenses } from "../../providers/ExpensesContext";
import { useAuth } from "../../providers/AuthContext";
import { InputForm } from "../Input";

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
      duration: 3000,
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
          <ModalCloseButton
            color="green.500"
            fontSize="lg"
            mt="1"
            _hover={{
              transition: "0.2s",
              color: "purple.500",
            }}
          />

          <ModalBody
            pb={3.5}
            w="90%"
            display="flex"
            flexDir="column"
            alignSelf="center"
            mt="2"
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
                w="50%"
                mb="20px"
                fontSize="20px"
                {...register("type")}
              >
                <Box as="option" disabled selected value="">
                  Categories
                </Box>

                {budgetCategories.map((item) => (
                  <Box as="option" value={item}>
                    {item}
                  </Box>
                ))}
              </Box>

              <InputForm
                name="name"
                label="Name"
                register={register}
                placeholder="Ex: Cardiologist"
                error={errors.name}
              />

              <InputForm
                name="description"
                label="Description"
                register={register}
                placeholder="Ex: Medical check - Dr.Strauss"
                error={errors.description}
              />

              <InputForm
                name="amount"
                label="Amount"
                register={register}
                placeholder="Ex: 300.00"
                error={errors.amount}
              />
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
              h="60px"
              w="76%"
              type="submit"
              fontWeight="normal"
              fontSize="lg"
              bg="purple.500"
              border="2px solid"
              borderColor="purple.500"
              _hover={{ transform: "scale(1.08)" }}
            >
              Add a new expense
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
