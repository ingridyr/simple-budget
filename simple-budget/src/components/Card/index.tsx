import {
  Box,
  Flex,
  HStack,
  VStack,
  Button,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { ImBin2 } from "react-icons/im";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface CardProps {
  maximo: number;
  minimo: number;
  porcentagem: number;
}

export const CardBudget = ({ maximo, minimo, porcentagem }: CardProps) => {
  return (
    <Box w="500px" h="300px" bg="#141416 90%" m="6">
      <HStack
        h="40px"
        w="100%"
        justifyContent="space-between"
        paddingTop="12px"
      >
        <Heading pl="30px" fontWeight="semibold">
          Category
        </Heading>
        <HStack pr="30px" spacing="5">
          <Icon
            color="#595959"
            as={AiFillEdit}
            fontSize="30px"
            cursor="pointer"
            onClickCapture={() => console.log("algo")}
          />
          <Icon
            color="#595959"
            as={ImBin2}
            fontSize="30px"
            cursor="pointer"
            onClickCapture={() => console.log("algo")}
          />
        </HStack>
      </HStack>
      <Flex w="100%" h="200px" justifyContent="space-around" mt="20px">
        <Flex w="220px" h="100%" justifyContent="center" alignItems="center">
          <CircularProgress
            size="165px"
            value={porcentagem}
            color="purple.500"
            trackColor="green.500"
            bg="#2F2E41"
            borderRadius="50%"
            thickness="12px"
          >
            <CircularProgressLabel
              color="white"
              fontSize="24px"
              fontWeight="bold"
            >
              40%
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
        <VStack spacing="4" h="100%" justifyContent="center" padding="0px 7px">
          <HStack fontFamily="body.Roboto">
            <Heading
              fontSize="30px"
              as="h4"
              color="green.500"
              fontFamily="body.Roboto"
              fontWeight="medium"
            >
              R$ {maximo}
            </Heading>
            <Text fontSize="24px" color="white">
              / R$ {minimo}
            </Text>
          </HStack>
          <Button
            onClick={() => {}}
            w="230px"
            bg="white"
            fontSize="24px"
            color="black.500"
            padding="15px 10px"
            fontFamily="body.Roboto"
            fontWeight="medium"
          >
            Add expense
          </Button>
          <Button
            onClick={() => {}}
            w="230px"
            bg="white"
            fontSize="24px"
            color="black.500"
            padding="15px 10px"
            fontFamily="body.Roboto"
            fontWeight="medium"
          >
            View Expense
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};
