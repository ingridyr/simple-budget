import {Flex, Image, Text, FormControl, FormLabel, Button, Input} from "@chakra-ui/react"

import {useHistory} from "react-router-dom"

import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"

import SignupImage from "../../assets/SignupImage.png"
import Logo from "../../assets/Logo.png"

import {useAuth} from "../../providers/AuthContext/index"

import {FaUser, FaEnvelope, FaLock} from "react-icons/fa"

interface DataProps {
    name: string
    email: string
    password: string
    confirm_password: string
}

export const Signup = () => {

    const history = useHistory()

    const {createRegister} = useAuth()

    const schema = yup.object().shape({
        name: yup.string().required("Campo Obrigatório"),
        email: yup.string().required("Campo Obrigatório").email("Email Inválido"),
        password: yup.string().required("Campo Obrigatório"),
        confirm_password: yup.string().required("Campo Obrigatório").oneOf([yup.ref("password")], "Senhas Diferentes")
    })

    const {register, handleSubmit, formState: {errors}} = useForm<DataProps>({
        resolver: yupResolver(schema)
    })

    const sendData = (data: DataProps) => {
        createRegister(data)
    }

    return (    
        <>       
            <Image src={Logo} alt="Logo" padding="15px"/>
            <Flex display="flex" flexDirection={["column", "column", "row", "row"]} width="100%" height="80vh">
                <Flex width={["100%", "100%", "60%", "60%"]} flexDirection="column" alignItems="center" justifyContent="center">
                    <Text width="60%" textAlign="right" fontSize="36px" marginBottom="30px" display={["none", "none", "flex", "flex"]}>uma maneira simples e fácil de fazer amizade com sua vida financeira :)</Text>
                    <Image src={SignupImage} alt="Signup Image" maxWidth="300px" display={["none", "none", "flex", "flex"]}/>
                </Flex>
                <Flex width={["100%", "100%", "40%", "40%"]} alignItems="center" justifyContent="center" height="80vh">
                    <FormControl maxWidth="440px" backgroundColor="green.500" padding="20px" color="black.500" borderRadius="5px">
                        <form onSubmit={handleSubmit(sendData)}>
                            <Text fontSize="24px" marginBottom="15px">Cadastre-se <strong>agora</strong>, é de graça!</Text>
                            <FormLabel htmlFor="name" fontSize="18px"><strong>Nome</strong></FormLabel>
                            <Input type="text" border="2px" borderColor="purple.500" background="black.500" color="white" {...register("name")} height="60px"/>
                            <Text marginBottom="15px" color="red" fontWeight="bold" fontSize="20px">{errors.name?.message}</Text>
                            <FormLabel htmlFor="email" fontSize="18px"><strong>Email</strong></FormLabel>
                            <Input border="2px" borderColor="purple.500" background="black.500" color="white" {...register("email")} height="60px"/>
                            <Text marginBottom="15px" color="red" fontWeight="bold" fontSize="20px">{errors.email?.message}</Text>
                            <FormLabel htmlFor="password" fontSize="18px"><strong>Senha</strong></FormLabel>
                            <Input type="password" borderColor="purple.500" background="black.500" color="white" {...register("password")} height="60px"/>
                            <Text marginBottom="15px" color="red" fontWeight="bold" fontSize="20px">{errors.password?.message}</Text>
                            <FormLabel htmlFor="confirm_password" fontSize="18px"><strong>Confirmar Senha</strong></FormLabel> 
                            <Input type="password" border="2px" borderColor="purple.500" background="black.500" color="white" {...register("confirm_password")} height="60px"/>
                            <Text marginBottom="15px" color="red" fontWeight="bold" fontSize="20px">{errors.confirm_password?.message}</Text>
                            <Button width="100%" height="60px" background="gradient.0" color="white" type="submit">Cadastrar</Button>
                            <Text textAlign="right" margin="10px 0px">Já possuí uma conta?</Text>
                            <Button width="100%" height="60px" background="gradient.0" color="white" onClick={() => history.push("/login")}>Fazer Login</Button>
                        </form>
                    </FormControl>
                </Flex>
            </Flex>
        </> 
    )
}