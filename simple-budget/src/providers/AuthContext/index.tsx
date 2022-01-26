import {createContext, useContext, ReactNode, useState} from "react"
import {api} from "../../services/api"

import {useHistory} from "react-router-dom"

interface AuthProviderProps {
    children: ReactNode
}

interface RegisterProps {
    name: string
    email: string
    password: string
}

interface AuthContextData {
    createRegister: (data: RegisterProps) => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({children}: AuthProviderProps) => {

    const history = useHistory()

    const createRegister = (data: RegisterProps) => {
        const newData = {
            name: data.name,
            email: data.email,
            password: data.password
        }

        api.post("/signup/", newData)
        .then((response) => {
            history.push("/login")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <AuthContext.Provider value={{createRegister}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)