import {
  Box,
  Flex,
  Image,
  Text,
  FormControl,
  FormLabel,
  Button,
  Input,
  Heading,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { theme } from "../../styles/theme";

import { useHistory } from "react-router-dom";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import SignupImage from "../../assets/SignupImage.png";
import Logo from "../../assets/Logo.png";

import { useAuth } from "../../providers/AuthContext/index";

import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

interface DataProps {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const Signup = () => {
  const history = useHistory();

  const { createRegister } = useAuth();

  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    password: yup.string().required("Campo obrigatório"),
    confirm_password: yup
      .string()
      .required("Campo obrigatório")
      .oneOf([yup.ref("password")], "Senhas diferentes"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>({
    resolver: yupResolver(schema),
  });

  const sendData = (data: DataProps) => {
    createRegister(data);
  };

  return (
    <>
      <Box h={["150px", "200px"]}>
        <Image src={Logo} alt="Logo" pt="15px" pl="15px" />
      </Box>
      <Flex
        display="flex"
        flexDirection={["column", "column", "row", "row"]}
        width="100%"
        height="70vh"
        mb="32"
      >
        <Flex
          width={["100%", "100%", "60%", "60%"]}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            width="70%"
            textAlign="right"
            fontSize="4xl"
            marginBottom="30px"
            display={["none", "none", "flex", "flex"]}
          >
            uma maneira simples e fácil de fazer amizade com sua vida financeira
            :)
          </Text>
          <Image
            src={SignupImage}
            alt="Signup Image"
            maxWidth="350px"
            ml="220px"
            display={["none", "none", "flex", "flex"]}
          />
        </Flex>
        <Flex
          width={["100%", "100%", "40%", "40%"]}
          alignItems="center"
          justifyContent="center"
          height="80vh"
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
                Cadastre-se <b>agora</b>, é de graça!
              </Heading>

              <FormLabel htmlFor="name" fontSize="18px" mb="1">
                Nome
              </FormLabel>
              <InputGroup flexDirection="column">
                <InputLeftElement
                  mt="2.5"
                  children={
                    <FaEnvelope size={18} color={theme.colors.purple["500"]} />
                  }
                />
                <Input
                  type="text"
                  border="2px solid"
                  borderColor="purple.500"
                  background="black.500"
                  color="white"
                  {...register("name")}
                  height="60px"
                  fontSize="lg"
                />
                <Text marginBottom="12px" color="red" fontSize="md">
                  {errors.name?.message}
                </Text>
              </InputGroup>

              <FormLabel htmlFor="email" fontSize="18px" mb="1">
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

              <FormLabel htmlFor="password" fontSize="18px" mb="1">
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

              <FormLabel htmlFor="confirm_password" fontSize="18px" mb="1">
                Confirmar senha
              </FormLabel>
              <InputGroup flexDirection="column">
                <InputLeftElement
                  mt="2.5"
                  children={
                    <FaLock size={18} color={theme.colors.purple["500"]} />
                  }
                />
                <Input
                  type="password"
                  border="2px"
                  borderColor="purple.500"
                  background="black.500"
                  color="white"
                  {...register("confirm_password")}
                  height="60px"
                  fontSize="lg"
                />
                <Text marginBottom="12px" color="red" fontSize="md">
                  {errors.confirm_password?.message}
                </Text>
              </InputGroup>

              <Button
                width="100%"
                height="60px"
                background="gradient.0"
                color="white"
                type="submit"
                fontWeight="normal"
                fontSize="lg"
                mt="6"
              >
                CADASTRAR
              </Button>
              <Text textAlign="right" mt="4" mb="2">
                Já possuí uma conta?
              </Text>
              <Button
                width="100%"
                height="60px"
                background="gradient.0"
                color="white"
                fontWeight="normal"
                fontSize="lg"
                onClick={() => history.push("/login")}
              >
                FAZER LOGIN
              </Button>
            </form>
          </FormControl>
        </Flex>
      </Flex>
    </>
  );
};
