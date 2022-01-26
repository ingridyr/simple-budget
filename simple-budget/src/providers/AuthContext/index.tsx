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

interface LoginProps {
    email: string
    password: string
}

interface User {
    email: string
    name: string
    id: number
}

interface AuthState {
    accessToken: string
    user: User
}

interface AuthContextData {
    createRegister: (data: RegisterProps) => void
    login: (data: LoginProps) => void
    accessToken: string
    user: User
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({children}: AuthProviderProps) => {

    const history = useHistory()

    const [data, setData] = useState<AuthState>(() => {
        const accessToken = localStorage.getItem("@SimpleBudget:accessToken")
        const user = localStorage.getItem("@SimpleBudget:user")

        if(accessToken && user) {
            return {
                accessToken, user: JSON.parse(user)
            }
        }

        return {} as AuthState
    })

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

    const login = (data: LoginProps) => {
        api.post("/login", data)
        .then((response) => {
            const accessToken = response.data.accessToken
            const user = response.data.user

            localStorage.setItem("@SimpleBudget:accessToken", accessToken)
            localStorage.setItem("@SimpleBudget:user", JSON.stringify(user))
            setData({accessToken, user})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <AuthContext.Provider value={{createRegister, login, accessToken: data.accessToken, user: data.user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)