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
  Input as ChakraInput,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../providers/AuthContext";
import { useBudgets } from "../../providers/BudgetsContext";
import * as yup from "yup";
import { InputForm } from "../Input";

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
      duration: 3000,
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
    onClose();
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
          <ModalHeader
            color="white"
            pb={4}
            align="center"
            borderBottom="1px solid"
            borderColor="gray.900"
          >
            <Heading
              as="h1"
              fontSize="xl"
              fontWeight="normal"
              color="green.500"
            >
              Edit budget
            </Heading>
            <ModalCloseButton
              color="green.500"
              fontSize="lg"
              mt="1"
              _hover={{
                transition: "0.2s",
                color: "purple.500",
              }}
            />
          </ModalHeader>
          <ModalBody
            //pb={3.5}
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
              <InputForm
                name="name"
                label="Name"
                register={register}
                error={errors.name}
              />
            </FormControl>

            <FormControl
              mt={2}
              display="flex"
              flexDir="column"
              justifyContent="center"
            >
              <InputForm
                name="max_value"
                label="Max value"
                register={register}
                error={errors.max_value}
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
              Edit budget
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
