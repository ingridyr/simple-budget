import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../../providers/AuthContext";
import { useExpenses } from "../../providers/ExpensesContext";

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalViewExpenses = ({ isOpen, onClose }: ModalErrorProps) => {
  const { expenses, deleteExpense } = useExpenses();
  const { accessToken } = useAuth();

  //adc depois duas props recebendo name e category do budget para substituir la em baixo

  const toast = useToast();

  const handleDelete = (item: any, accessToken: any) => {
    toast({
      title: "Até mais!",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
    deleteExpense(item, accessToken);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="black.500" boxShadow="0px 1px 7px 2px #00F59B">
          <ModalHeader>
            <Flex alignItems="center" justifyContent="space-between">
              <Heading>Name</Heading>
              <Text color="gray.300">Category</Text>
            </Flex>
          </ModalHeader>
          <ModalBody>
            {expenses.map((item) => (
              <>
                <Flex
                  bgColor="black.300"
                  borderRadius="5px"
                  gap="10px"
                  m="20px 0"
                  p="10px 15px"
                  justifyContent="space-between"
                >
                  <Flex flexDirection="column">
                    <Heading color="white.0" size="md">
                      {item.name}
                    </Heading>
                    <Text
                      fontSize="sm"
                      color="white.0"
                      marginLeft="5px"
                      p="10px"
                    >
                      {item.description}
                    </Text>
                  </Flex>
                  <Box display="block">
                    <Text fontFamily="other" color="green.500">
                      {item.amount}
                    </Text>
                    <Flex m="10px" alignItems="center" gap="10px">
                      <AiFillEdit color="gray.300" size={25} cursor="pointer" />
                      <FaTrash
                        color="gray.300"
                        size={18}
                        cursor="pointer"
                        onClick={() => handleDelete(item.id, accessToken)}
                      />
                    </Flex>
                  </Box>
                </Flex>
              </>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
