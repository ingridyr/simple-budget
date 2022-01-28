import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import {
  MotionFlex,
  animationFlex,
  itemAnimation,
} from "../../styles/animation";
import Logo from "../../assets/Logo.png";
import HomeImage from "../../assets/HomeImage.svg";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const redirect = (path: string) => {
    setLoading(true);
    history.push(path);
  };

  return (
    <>
      <Image src={Logo} alt="Logo" pt="15px" pl="15px" />
      <MotionFlex
        justifyContent="center"
        alignItems="center"
        // framer-motion props
        initial="hidden"
        animate="visible"
        variants={animationFlex}
        // variants={itemAnimation}
      >
        <Flex flexDirection="column" mt={["16", "12"]}>
          <Text fontSize="2xl" mb="8" align="center">
            gain control over your financial life
          </Text>
          <Image
            alignSelf="center"
            src={HomeImage}
            alt="home image"
            w={["300px", "300px", "400px", "400px"]}
          />
          <Text fontSize="3xl" mt="8" align="center" fontWeight="bold">
            ...starting now
          </Text>
          <Flex mt="8" mb="8" w="100%" justifyContent="space-around">
            <Button
              isLoading={loading}
              h="60px"
              w="45%"
              fontWeight="normal"
              fontSize="2xl"
              variant="outline"
              border="2px solid"
              borderColor="purple.500"
              _hover={{ color: "green.500", transform: "scale(1.08)" }}
              onClick={() => redirect("/login")}
            >
              Login
            </Button>
            <Button
              isLoading={loading}
              h="60px"
              w="45%"
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
          </Flex>
        </Flex>
      </MotionFlex>
    </>
  );
};
