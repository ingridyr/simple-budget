import {
  Box,
  Flex,
  HStack,
  VStack,
  Button,
  Heading,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { ModalViewExpenses } from "../Modais/viewExpenses";
import { ModalAddExpense } from "../../components/Modais/addExpense";
import { useAuth } from "../../providers/AuthContext";
import { useExpenses } from "../../providers/ExpensesContext";

interface CardProps {
  budgetName: string;
  budgetCategories: string[]
  budgetId: string;
  maxValue: number;
  totalSpend: number;
  percentage: number;
}

export const CardBudget = ({
  budgetId,
  budgetName,
  budgetCategories,
  maxValue,
  totalSpend,
  percentage,
}: CardProps) => {
  const {
    isOpen: isModalViewExpensesOpen,
    onOpen: onModalViewExpensesOpen,
    onClose: onModalViewExpensesClose,
  } = useDisclosure();

  const {
    isOpen: isModalAddExpenseOpen,
    onOpen: onModalAddExpenseOpen,
    onClose: onModalAddExpenseClose,
  } = useDisclosure();

  //ler o maxValue do budget
  //ler e reduzir todos os valores amount das expenses do budget
  //calcular a porcentagem do total de amounts pelo maxValue do budget

  //chamar o modal addExpense
  //passar o budgetId para ele

  const { accessToken } = useAuth();
  const { listExpenses } = useExpenses();

  const handleClick = () => {
    onModalViewExpensesOpen();
    listExpenses(budgetId, accessToken);
  };

  console.log(budgetCategories)

  return (
    <>
      <ModalAddExpense
        isOpen={isModalAddExpenseOpen}
        onClose={onModalAddExpenseClose}
        budgetId={budgetId}
        budgetCategories={budgetCategories}
      />
      <ModalViewExpenses
        isOpen={isModalViewExpensesOpen}
        onClose={onModalViewExpensesClose}
        budgetId={budgetId}
        budgetName={budgetName}
      />
      <Box w="500px" h="300px" bg="black.300" m="6" borderRadius="10px" p="5px">
        <HStack
          h="40px"
          w="100%"
          justifyContent="space-between"
          paddingTop="12px"
        >
          <Heading pl="30px" fontWeight="medium">
            {budgetName}
          </Heading>
          <HStack pr="30px" spacing="5">
            <Icon
              color="gray.300"
              as={AiFillEdit}
              fontSize="30px"
              cursor="pointer"
              onClickCapture={() => {}}
            />
            <Icon
              color="gray.300"
              as={FaTrash}
              fontSize="25px"
              cursor="pointer"
              onClickCapture={() => {}}
            />
          </HStack>
        </HStack>
        <Flex w="100%" h="200px" justifyContent="space-around" mt="20px">
          <Flex w="220px" h="100%" justifyContent="center" alignItems="center">
            <CircularProgress
              size="165px"
              value={percentage}
              color="green.500"
              trackColor="purple.500"
              thickness="10px"
            >
              <CircularProgressLabel
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontSize="24px"
                fontWeight="bold"
                bg="#2F2E41"
                borderRadius="50%"
                h="75%"
                w="75%"
              >
                40%
              </CircularProgressLabel>
            </CircularProgress>
          </Flex>
          <VStack
            spacing="4"
            h="100%"
            justifyContent="center"
            padding="0px 7px"
          >
            <HStack fontFamily="body.Roboto">
              <Heading
                fontSize="30px"
                as="h4"
                color="green.500"
                fontFamily="other"
                fontWeight="medium"
              >
                R$ {maxValue}
              </Heading>
              <Text fontSize="24px" color="gray.100">
                / R$ {totalSpend}
              </Text>
            </HStack>
            <Button
              onClick={() => onModalAddExpenseOpen()}
              w="230px"
              h="60px"
              bg="white"
              fontSize="24px"
              color="gray.350"
              padding="20px 10px"
              border="3px solid"
              borderColor="white"
              fontFamily="other"
              fontWeight="medium"
              focusBorderColor="none"
              _hover={{
                border: "3px solid",
                borderColor: "green.500",
                color: "white",
                bg: "gray.100",
              }}
            >
              Add expense
            </Button>
            <Button
              onClick={handleClick}
              w="230px"
              h="60px"
              bg="white"
              fontSize="24px"
              color="gray.350"
              padding="20px 10px"
              border="3px solid"
              borderColor="white"
              focusBorderColor="none"
              fontFamily="other"
              fontWeight="medium"
              _hover={{
                border: "3px solid",
                borderColor: "green.500",
                color: "white",
                bg: "gray.100",
              }}
            >
              View expenses
            </Button>
          </VStack>
        </Flex>
      </Box>
    </>
  );
};
