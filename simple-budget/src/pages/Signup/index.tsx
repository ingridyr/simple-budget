import {
  Box,
  Flex,
  Image,
  Text,
  FormControl,
  Button,
  Heading,
} from "@chakra-ui/react";

import {
  MotionFlex,
  animationFlex,
  itemAnimation,
} from "../../styles/animation";

import { useHistory } from "react-router-dom";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import SignupImage from "../../assets/SignupImage.png";
import Logo from "../../assets/Logo.png";

import { useAuth } from "../../providers/AuthContext/index";

import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

import { InputForm } from "../../components/Input/index";

interface DataProps {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const Signup = () => {
  const history = useHistory();

  const { signup } = useAuth();

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
    signup(data);
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
        height="60vh"
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
            ml={["220px", "50px"]}
            display={["none", "none", "flex", "flex"]}
          />
        </Flex>
        <MotionFlex
          width={["100%", "100%", "40%", "40%"]}
          marginTop={["100px", "50px", "0px"]}
          alignItems="center"
          justifyContent="center"
          height="60vh"
          // framer-motion props
          initial="hidden"
          animate="visible"
          variants={animationFlex}
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

              <InputForm
                name="name"
                label="Nome"
                register={register}
                error={errors.name}
                icon={FaUser}
              />
              <InputForm
                name="email"
                label="Email"
                register={register}
                error={errors.email}
                icon={FaEnvelope}
              />
              <InputForm
                name="password"
                label="Senha"
                type="password"
                register={register}
                error={errors.password}
                icon={FaLock}
              />
              <InputForm
                name="confirm_password"
                label="Confirmar Senha"
                type="password"
                register={register}
                error={errors.confirm_password}
                icon={FaLock}
              />

              <Button
                width="100%"
                height="60px"
                background="gradient.0"
                color="white"
                type="submit"
                fontWeight="normal"
                fontSize="lg"
                mt="6"
                _hover={{ transform: "scale(1.02)" }}
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
                _hover={{ transform: "scale(1.02)" }}
                onClick={() => history.push("/login")}
              >
                FAZER LOGIN
              </Button>
            </form>
          </FormControl>
        </MotionFlex>
      </Flex>
    </>
  );
};
