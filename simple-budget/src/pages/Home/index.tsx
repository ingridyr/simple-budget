import { useHistory } from "react-router-dom";
import { Box, Button, Center, Flex, Image, Text } from "@chakra-ui/react";
import { MotionFlex, animationFlex } from "../../styles/animation";
import Logo from "../../assets/Logo.png";
import HomeImage from "../../assets/HomeImage.svg";

export const Home = () => {
  const history = useHistory();

  const redirect = (path: string) => {
    history.push(path);
  };

  return (
    <Box height="100vh">
      <Flex justifyContent="space-between" alignContent="center" p="4">
        <Image src={Logo} alt="Logo" w="150px" />
        <Center>
          <Button
            h="60px"
            w="150px"
            fontWeight="normal"
            fontSize="2xl"
            variant="outline"
            border="2px solid"
            borderColor="purple.500"
            mr="4"
            _hover={{ color: "green.500", transform: "scale(1.08)" }}
            onClick={() => redirect("/login")}
          >
            Login
          </Button>
          <Button
            h="60px"
            w="150px"
            fontWeight="normal"
            fontSize="2xl"
            variant="outline"
            border="2px solid"
            borderColor="purple.500"
            _hover={{ color: "green.500", transform: "scale(1.08)" }}
            onClick={() => redirect("/signup")}
          >
            Sign up
          </Button>
        </Center>
      </Flex>
      <Flex justifyContent="center" alignItems="center" mt="14" h="75vh">
        <Flex w="50%" flexDirection="column" alignSelf="flex-start">
          <Text fontSize="45px" color="purple.500">
            gain control over your financial life
          </Text>
          <Text color="gray.100" fontSize="lg">
            no more being caught off guard by unexpected and unnecessary
            expenses - with the SimpleBudget application, you can keep your
            budget in order in an extremely <strong>simple</strong> and{" "}
            <strong>elegant</strong> way. Add your categories and expenses,
            visualize where your money is going and no more headaches. It's that
            simple!
          </Text>
        </Flex>
        <MotionFlex
          w="30%"
          ml="12"
          // pr="15%"
          // framer-motion props
          initial="hidden"
          animate="visible"
          variants={animationFlex}
        >
          <Flex flexDirection="column" mt={["16", "0"]}>
            <Image
              // alignSelf="center"
              src={HomeImage}
              alt="home image"
              w={["300px", "300px", "400px", "800px"]}
            />
            <Text fontSize="3xl" mt="4" align="center" fontWeight="bold">
              ...starting now
            </Text>
          </Flex>
        </MotionFlex>
      </Flex>
    </Box>
  );
};
