import {Flex, Image, Text, FormControl, FormLabel, Button, Input} from "@chakra-ui/react"

import {useHistory} from "react-router-dom"

import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"

import LoginImage from "../../assets/LoginImage.png"
import Logo from "../../assets/Logo.png"

import {useAuth} from "../../providers/AuthContext/index"

import {FaEnvelope, FaLock} from "react-icons/fa"

interface LoginProps {
    email: string
    password: string
}

export const Login = () => {

    const history = useHistory()

    const {login} = useAuth()

    const schema = yup.object().shape({
        email: yup.string().required("Campo Obrigatório").email("Email Inválido"),
        password: yup.string().required("Campo Obrigatório") 
    })

    const {register, handleSubmit, formState: {errors}} = useForm<LoginProps>({
        resolver: yupResolver(schema)
    })

    const sendData = (data: LoginProps) => {
        login(data)
    }

    return (
        <>
            <Image src={Logo} alt="Logo" padding="15px"/>
            <Flex display="flex" flexDirection={["column", "column", "row-reverse", "row-reverse"]} width="100%" height="80vh">
                <Flex width={["100%", "100%", "60%", "60%"]} flexDirection="column" alignItems="center" justifyContent="center">
                    <Image src={LoginImage} alt="Login Image" width={["300px", "400px", "600px"]}/>
                </Flex>
                <Flex width={["100%", "100%", "40%", "40%"]} height="80vh" alignItems="center" justifyContent="center">
                    <FormControl maxWidth="440px" backgroundColor="green.500" padding="20px" color="black.500" borderRadius="5px">
                        <form onSubmit={handleSubmit(sendData)}>
                            <Text fontSize="24px" marginBottom="15px">Faça o <strong>login</strong></Text>
                            <FormLabel htmlFor="name" fontSize="18px"><strong>Email</strong></FormLabel>
                            <Input border="2px" borderColor="purple.500" background="black.500" color="white" {...register("email")} height="60px"/>
                            <Text marginBottom="15px" color="red" fontWeight="bold" fontSize="20px">{errors.email?.message}</Text>
                            <FormLabel htmlFor="password" fontSize="18px"><strong>Senha</strong></FormLabel>
                            <Input type="password" borderColor="purple.500" background="black.500" color="white" {...register("password")} height="60px"/>
                            <Text marginBottom="15px" color="red" fontWeight="bold" fontSize="20px">{errors.password?.message}</Text>
                            <Button width="100%" height="60px" background="gradient.0" color="white" type="submit">Entrar</Button>
                            <Text textAlign="right" margin="10px 0px">Já possuí uma conta?</Text>
                            <Button width="100%" height="60px" background="gradient.0" color="white" onClick={() => history.push("/signup")}>Cadastrar</Button>
                        </form>
                    </FormControl>
                </Flex>
            </Flex>
        </>
    )
}