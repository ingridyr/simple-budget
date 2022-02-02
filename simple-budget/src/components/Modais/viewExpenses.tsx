import {
  Box,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiFillEdit, AiOutlineConsoleSql } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../../providers/AuthContext";
import { useExpenses } from "../../providers/ExpensesContext";
import { useDisclosure } from "@chakra-ui/react";
import EmptyStreet from "../../assets/Empty.svg";
import { ModalEditExpense } from "../Modais/editExpenseve";

import { useState } from "react";

interface ModalViewExpensesProps {
  budgetName: string;
  budgetId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface ModalData {
  name: string;
  description: string;
  amount: number;
  budgetId: string;
  id: string;
  type: string;
}

export const ModalViewExpenses = ({
  isOpen,
  onClose,
  budgetId,
  budgetName,
}: ModalViewExpensesProps) => {
  const { expenses, deleteExpense } = useExpenses();
  const { accessToken } = useAuth();

  const toast = useToast();

  const [selectedItem, setSelectedItem] = useState<ModalData>({} as ModalData);

  const handleDelete = (item: any, accessToken: string) => {
    toast({
      title: "Expense deleted successfully",
      duration: 9000,
      isClosable: true,
      status: "success",
      position: "top",
    });
    deleteExpense(item, accessToken);
  };

  const {
    isOpen: isModalEditExpenseOpen,
    onOpen: onModalEditExpenseOpen,
    onClose: onModalEditExpenseClose,
  } = useDisclosure();

  const modalSelect = (item: ModalData) => {
    setSelectedItem(item);
    onModalEditExpenseOpen();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent
          bgColor="black.500"
          boxShadow="0px 1px 6px 1px #00F59B"
          marginY="auto"
        >
          <ModalHeader>
            <Flex alignItems="center" justifyContent="space-between">
              <Heading as="h1" fontSize={["2xl", "3xl"]} fontWeight="normal">
                {budgetName}
              </Heading>
              <ModalCloseButton
                mt="10px"
                color="purple.500"
                fontSize="16px"
                _hover={{
                  transition: "0.2s",
                  color: "green.500",
                }}
              />
            </Flex>
          </ModalHeader>
          <ModalBody
            margin="5px"
            css={{
              "&::-webkit-scrollbar": {
                width: "8px",
                heigth: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#141416",
                borderRadius: "19px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#00F59B",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#7014F2",
                borderRadius: "19px",
              },
            }}
          >
            {expenses.length > 0 ? (
              expenses.map((item) => {
                return (
                  <>
                    <Flex
                      bgColor="black.300"
                      borderRadius="5px"
                      // gap="10px"
                      mb="4"
                      pt="3"
                      pl="3"
                      pr="3"
                      justifyContent="space-between"
                    >
                      <Flex flexDirection="column">
                        <Flex
                          fontSize="16px"
                          gap="10px"
                          width="200px"
                          justifyContent="space-between"
                        >
                          <Heading
                            color="white.0"
                            size="md"
                            fontWeight="normal"
                          >
                            {item.name}
                          </Heading>
                          <Heading
                            color="gray.300"
                            size="md"
                            fontWeight="normal"
                          >
                            {item.type}
                          </Heading>
                        </Flex>
                        <Text
                          fontSize="sm"
                          color="gray.300"
                          // marginLeft="5px"
                          // p="10px"
                        >
                          {item.description}
                        </Text>
                      </Flex>
                      <Box display="block">
                        <Text
                          fontFamily="other"
                          color="green.500"
                          fontWeight="500"
                        >
                          R$ {item.amount.toFixed(2)}
                        </Text>
                        <Flex
                          m="10px"
                          alignItems="center"
                          gap="10px"
                          color="gray.300"
                        >
                          <AiFillEdit
                            size={25}
                            cursor="pointer"
                            onClick={() => modalSelect(item)}
                          />
                          <FaTrash
                            size={19}
                            cursor="pointer"
                            onClick={() => handleDelete(item.id, accessToken)}
                          />
                        </Flex>
                      </Box>
                    </Flex>
                  </>
                );
              })
            ) : (
              <>
                <Text color="green.500" fontSize={["lg", "xl"]} w="100%" pb="6">
                  You don't have any registered expense.
                </Text>
                <Image src={EmptyStreet} alt="Empty" pb="6" />
              </>
            )}
            <ModalEditExpense
              isOpen={isModalEditExpenseOpen}
              onOpen={onModalEditExpenseOpen}
              onClose={onModalEditExpenseClose}
              selectedItem={selectedItem}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
