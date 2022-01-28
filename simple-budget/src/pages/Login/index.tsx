import {
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

import LoginImage from "../../assets/LoginImage.png";
import Logo from "../../assets/Logo.png";

import { useAuth } from "../../providers/AuthContext/index";

import { FaEnvelope, FaLock } from "react-icons/fa";

import { InputForm } from "../../components/Input/index";

interface LoginProps {
  email: string;
  password: string;
}

export const Login = () => {
  const history = useHistory();

  const { signin } = useAuth();

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
    signin(data);
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
            // mr="16"
          />
        </Flex>
        <MotionFlex
          width={["100%", "100%", "40%", "40%"]}
          height="80vh"
          alignItems="center"
          justifyContent="center"
          // framer-motion props
          initial="hidden"
          animate="visible"
          variants={animationFlex}
          // variants={itemAnimation}
          ml={["0", "16"]}
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

              <InputForm
                name="email"
                label="Email"
                register={register}
                error={errors.email}
                icon={FaEnvelope}
              />
              <InputForm
                name="password"
                label="Password"
                type="password"
                register={register}
                error={errors.password}
                icon={FaLock}
              />

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
        </MotionFlex>
      </Flex>
    </>
  );
};
