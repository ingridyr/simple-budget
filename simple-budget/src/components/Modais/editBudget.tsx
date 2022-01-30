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
  Input as ChakraInput,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../providers/AuthContext";
import { useBudgets } from "../../providers/BudgetsContext";
import * as yup from "yup";

interface ModalEditBudgetData {
  name: string;
  max_value: number;
  categories: string[];
}

interface ModalEditBudgetProps {
  budgetId: string;
  isOpen: boolean;
  onClose: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required("Name required"),
  max_value: yup
    .number()
    .required("Field required")
    .min(1, "Minimum value greater than or equal to 1"),
});

export const ModalEditBudget = ({
  isOpen,
  onClose,
  budgetId,
}: ModalEditBudgetProps) => {
  const { accessToken } = useAuth();
  const { updateBudget } = useBudgets();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ModalEditBudgetData>({
    resolver: yupResolver(schema),
  });

  const toast = useToast();

  const onSubmitFunction = ({ name, max_value }: ModalEditBudgetData) => {
    toast({
      title: "Budget updated successfully!",
      duration: 7000,
      isClosable: true,
      status: "success",
      position: "top",
    });

    const newData = {
      name: name,
      max_value: max_value,
      categories: [
        "food",
        "entertainment",
        "transport",
        "home",
        "health",
        "others",
      ],
      budgetId: budgetId,
    };
    updateBudget(budgetId, accessToken, newData);
  };

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
          <ModalHeader color="white" pb={4}>
            <ModalCloseButton color="purple.500" fontSize="16px" />
          </ModalHeader>
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
              <FormLabel fontSize="20px">Max Value</FormLabel>
              <ChakraInput
                bg="white"
                p="28px 16px"
                color="black.500"
                placeholder="Max Value"
                type="number"
                {...register("max_value")}
              />
              <p>{errors.max_value?.message}</p>
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
              borderColor="transparent"
              _hover={{
                bg: "gray.600",
                border: "3px solid",
                borderColor: "purple.500",
                color: "white",
              }}
            >
              Update budget
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
