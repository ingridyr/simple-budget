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
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalViewExpenses = ({ isOpen, onClose }: ModalErrorProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="black.500" boxShadow="0px 1px 7px 2px #00F59B">
          <ModalHeader>
            <Flex alignItems="center" justifyContent="space-between">
              <Heading>Name</Heading>
              <Text color="#595959">Category</Text>
            </Flex>
          </ModalHeader>
          <ModalBody>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_) => (
              <>
                <Flex
                  bgColor="#141416"
                  borderRadius="5px"
                  gap="10px"
                  m="20px 0"
                  p="10px 15px"
                  justifyContent="space-between"
                >
                  <Flex flexDirection="column">
                    <Heading color="white.0" size="md">
                      Expense #1
                    </Heading>
                    <Text
                      fontSize="sm"
                      color="white.0"
                      marginLeft="5px"
                      p="10px"
                    >
                      Description
                    </Text>
                  </Flex>
                  <Box display="block">
                    <Text fontFamily="other" color="green.500">R$ 300,00</Text>
                    <Flex m="10px" alignItems="center" gap="10px">
                      <AiFillEdit color="#595959" size={25} cursor="pointer" />
                      <FaTrash color="#595959" size={18} cursor="pointer" />
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
