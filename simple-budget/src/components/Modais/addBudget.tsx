import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input as ChakraInput,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../providers/AuthContext";
import { useBudgets } from "../../providers/BudgetsContext";
import { InputForm } from "../Input";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { AiOutlineArrowRight } from "react-icons/ai";

interface ModalData {
  name: string;
  max_value: number;
  categories: string[];
  userId: number;
}

interface ModalAddBudgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required("Name required"),
  max_value: yup
    .number()
    .min(1, "Minimum value greater than or equal to 1")
    .required("Max value required"),
});

export const ModalAddBudget = ({ isOpen, onClose }: ModalAddBudgetProps) => {
  const { user, accessToken } = useAuth();
  const { createBudget } = useBudgets();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ModalData>({
    resolver: yupResolver(schema),
  });

  const toast = useToast();

  const onSubmitFunction = ({ name, max_value }: ModalData) => {
    toast({
      title: "Budget created successfully!",
      duration: 3000,
      isClosable: true,
      status: "success",
      position: "top",
    });

    const newData = {
      name: name,
      max_value: max_value,
      categories: [
        "Food",
        "Entertainment",
        "Transport",
        "Home",
        "Health",
        "Others",
      ],
      userId: user.id,
    };
    createBudget(newData, accessToken);
    onClose();
  };

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
          boxShadow="0px 1px 3px 2px #00F59B"
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
              Add a new budget
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
                error={errors.name}
              />
            </FormControl>

            <FormControl
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

            <Button
              h="60px"
              w="100%"
              type="submit"
              fontWeight="normal"
              fontSize="lg"
              bg="purple.500"
              border="2px solid"
              borderColor="purple.500"
              _hover={{ transform: "scale(1.08)" }}
            >
              Add a new budget now
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
