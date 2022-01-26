import {
  Flex,
  Image,
  Text,
  FormControl,
  FormLabel,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Heading,
} from "@chakra-ui/react";
import { theme } from "../../styles/theme";

import { useHistory } from "react-router-dom";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import LoginImage from "../../assets/LoginImage.png";
import Logo from "../../assets/Logo.png";

import { useAuth } from "../../providers/AuthContext/index";

import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

interface LoginProps {
  email: string;
  password: string;
}

export const Login = () => {
  const history = useHistory();

  const { login } = useAuth();

  const schema = yup.object().shape({
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    password: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: yupResolver(schema),
  });

  const sendData = (data: LoginProps) => {
    login(data);
  };

  return (
    <>
      <Image src={Logo} alt="Logo" padding="15px" />
      <Flex
        display="flex"
        flexDirection={["column", "column", "row-reverse", "row-reverse"]}
        width="100%"
        height="80vh"
      >
        <Flex
          width={["100%", "100%", "60%", "60%"]}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={LoginImage}
            alt="Login Image"
            width={["300px", "400px", "600px"]}
            mt="8"
            mb="8"
          />
        </Flex>
        <Flex
          width={["100%", "100%", "40%", "40%"]}
          height="80vh"
          alignItems="center"
          justifyContent="center"
        >
          <FormControl
            maxWidth="440px"
            backgroundColor="green.500"
            padding="20px"
            color="black.500"
            borderRadius="5px"
          >
            <form onSubmit={handleSubmit(sendData)}>
              <Heading fontSize="24px" fontWeight="normal" mb="6">
                Faça o <b>login</b>
              </Heading>

              <FormLabel htmlFor="name" fontSize="18px">
                Email
              </FormLabel>
              <InputGroup flexDirection="column">
                <InputLeftElement
                  mt="2.5"
                  children={
                    <FaUser size={18} color={theme.colors.purple["500"]} />
                  }
                />
                <Input
                  border="2px solid"
                  borderColor="purple.500"
                  background="black.500"
                  color="white"
                  {...register("email")}
                  height="60px"
                  fontSize="lg"
                />
                <Text marginBottom="12px" color="red" fontSize="md">
                  {errors.email?.message}
                </Text>
              </InputGroup>

              <FormLabel htmlFor="password" fontSize="18px">
                Senha
              </FormLabel>
              <InputGroup flexDirection="column">
                <InputLeftElement
                  mt="2.5"
                  children={
                    <FaLock size={18} color={theme.colors.purple["500"]} />
                  }
                />
                <Input
                  border="2px solid"
                  type="password"
                  borderColor="purple.500"
                  background="black.500"
                  color="white"
                  {...register("password")}
                  height="60px"
                  fontSize="lg"
                />
                <Text marginBottom="12px" color="red" fontSize="md">
                  {errors.password?.message}
                </Text>
              </InputGroup>

              <Button
                width="100%"
                height="60px"
                background="gradient.0"
                color="white"
                fontWeight="normal"
                fontSize="lg"
                type="submit"
                mt="6"
                // _hover={{ bg: "" }}
              >
                ENTRAR
              </Button>
              <Text textAlign="right" mt="4" mb="2">
                Não possuí uma conta?
              </Text>
              <Button
                width="100%"
                height="60px"
                background="gradient.0"
                color="white"
                fontWeight="normal"
                fontSize="lg"
                onClick={() => history.push("/signup")}
              >
                CADASTRAR
              </Button>
            </form>
          </FormControl>
        </Flex>
      </Flex>
    </>
  );
};
