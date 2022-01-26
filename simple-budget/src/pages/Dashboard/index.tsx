import { Box, Flex, Heading } from "@chakra-ui/react";
import { SideMenu } from "../../components/SideMenu";

export const Dashboard = () => {
  return (
    <Flex flexDirection="column" justifyContent="center">
      <SideMenu />
      <Heading alignSelf="flex-start" h="50px" m="20px">
        Expenses by category
      </Heading>
      <Flex
        gap="40px"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        {[1, 2, 3, 4].map((_) => (
          <Box
            border="2px solid white"
            w="500px"
            h="250px"
            borderRadius="10px"
          />
        ))}
      </Flex>
    </Flex>
  );
};
