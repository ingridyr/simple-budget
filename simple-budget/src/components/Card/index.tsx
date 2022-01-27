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

interface CardProps {
  maxValue: number;
  minimo: number;
  percentage: number;
  categories: any;
  onOpen: () => void;
}

export const CardBudget = ({
  maxValue,
  minimo,
  percentage,
  categories,
  onOpen,
}: CardProps) => {
  const {
    isOpen: isModalViewExpensesOpen,
    onOpen: onModalViewExpensesOpen,
    onClose: onModalViewExpensesClose,
  } = useDisclosure();

  return (
    <>
      <ModalViewExpenses
        isOpen={isModalViewExpensesOpen}
        onClose={onModalViewExpensesClose}
      />
      <Box w="500px" h="300px" bg="black.300" m="6" borderRadius="10px" p="5px">
        <HStack
          h="40px"
          w="100%"
          justifyContent="space-between"
          paddingTop="12px"
        >
          <Heading pl="30px" fontWeight="medium">
            {categories}
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
                / R$ {minimo}
              </Text>
            </HStack>
            <Button
              onClick={onOpen}
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
              onClick={() => onModalViewExpensesOpen()}
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
              View Expenses
            </Button>
          </VStack>
        </Flex>
      </Box>
    </>
  );
};
