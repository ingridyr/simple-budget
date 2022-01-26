import { Box, Flex, Heading } from "@chakra-ui/react";
import { SideMenu } from "../../components/SideMenu";

export const Dashboard = () => {
  return (
    <Flex justifyContent="center" alignItems="flex-start">
      <SideMenu isSelected={true} />
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Heading alignSelf="flex-start" h="50px" m="20px" size="lg">
          Expenses by category
        </Heading>
        <Flex
          gap="30px"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          w="90%"
          h="70%"
          alignContent="flex-start"
          m="10px"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_) => (
            <Box
              border="2px solid white"
              w="500px"
              h="250px"
              borderRadius="10px"
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
