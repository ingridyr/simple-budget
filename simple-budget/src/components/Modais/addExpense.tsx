import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useExpenses } from "../../providers/ExpensesContext";
import { useAuth } from "../../providers/AuthContext";
import { InputForm } from "../Input";
import { InputMaskedCurrency } from "../Input/inputMasked";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  amount: yup.string().required("Amount is required"),
  type: yup.string().required("Choose a category"),
});

interface ModalData {
  name: string;
  description: string;
  amount: string;
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
    const newAmount = Number(amount.replaceAll(".", "").replace(",", "."));

    const newData = {
      name: name,
      description: description,
      amount: newAmount,
      type: type,
      budgetId: budgetId,
    };
    createExpense(newData, accessToken)
      .then((_) => {
        toast({
          title: "Expense created successfully!",
          duration: 2000,
          isClosable: true,
          status: "success",
          position: "top",
        });
        onClose();
        reset();
      })
      .catch((err) => console.log(err));
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ModalData>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent
          marginY="auto"
          bg="black.500"
          w="95%"
          border="1px solid"
          borderColor="green.500"
          py="20px"
          borderRadius="10px"
          boxShadow="0px 1px 2px 1px #00F59B"
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
              <Box h="50px" w="60%" mb="12px">
                <Box
                  w="95%"
                  border="2px solid"
                  borderColor="purple.500"
                  borderRadius="5px"
                  _hover={{ borderColor: "#474747", cursor: "pointer" }}
                  padding="2px"
                  bg="black.500"
                  as="select"
                  fontSize="20px"
                  mb="1px"
                  paddingRight="5px"
                  defaultValue={""}
                  {...register("type")}
                >
                  <Box as="option" disabled value="">
                    Categories
                  </Box>

                  {budgetCategories.map((item, index) => (
                    <Box as="option" value={item} key={index}>
                      {item}
                    </Box>
                  ))}
                </Box>
                <Text
                  color="red.500"
                  fontSize="md"
                  pl="2"
                  mb="0"
                  pb="0"
                  h="20px"
                >
                  {errors.type?.message}
                </Text>
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
              <InputMaskedCurrency
                name="amount"
                label="Amount"
                register={register}
                placeholder="Ex: 300.00"
                error={errors.amount}
                prefix="R$"
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
