import { createContext, useContext, ReactNode, useState } from "react";
import { api } from "../../services/api";

import { useHistory } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

interface User {
  email: string;
  name: string;
  id: number;
}

interface AuthState {
  accessToken: string;
  user: User;
}

interface AuthContextData {
  signup: (data: RegisterProps) => void;
  signin: (data: LoginProps) => void;
  logout: () => void;
  accessToken: string;
  user: User;
  errMessage: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const history = useHistory();

  const [errMessage, setErrMessage] = useState<string>("");

  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@SimpleBudget:accessToken");
    const user = localStorage.getItem("@SimpleBudget:user");

    if (accessToken && user) {
      return {
        accessToken,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signup = (data: RegisterProps) => {
    const newData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    api
      .post("/register", newData)
      .then((_) => {
        history.push("/login");
      })
      .catch((err) => {
        setErrMessage(err.message);
      });
  };

  const signin = (data: LoginProps) => {
    api
      .post("/login", data)
      .then((response) => {
        const accessToken = response.data.accessToken;
        const user = response.data.user;

        localStorage.setItem("@SimpleBudget:accessToken", accessToken);
        localStorage.setItem("@SimpleBudget:user", JSON.stringify(user));
        history.push("/dashboard")
        history.push("/dashboard")
        setData({ accessToken, user });
      })
      .catch((err) => {
        setErrMessage(err.message);
      });
  };

  const logout = () => {
    localStorage.removeItem("@SimpleBudget:accessToken");
    localStorage.removeItem("@SimpleBudget:user");
    history.push("/login")
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        signup,
        signin,
        accessToken: data.accessToken,
        user: data.user,
        errMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);

//     const toast = useToast()

//     const [data, setData] = useState<AuthState>(() => {
//         const accessToken = localStorage.getItem("@SimpleBudget:accessToken")
//         const user = localStorage.getItem("@SimpleBudget:user")

//         if(accessToken && user) {
//             return {
//                 accessToken, user: JSON.parse(user)
//             }
//         }

//         return {} as AuthState
//     })

//     const createRegister = (data: RegisterProps) => {
//         const newData = {
//             name: data.name,
//             email: data.email,
//             password: data.password
//         }

//         api.post("/signup/", newData)
//         .then((response) => {
//             toast({
//                 title: "Cadastro Realizado!",
//                 description: "Cadastro Realizado2",
//                 status: "success",
//                 duration: 5000,
//                 isClosable: true
//             })
//             history.push("/login")
//         })
//         .catch((err) => {
//             console.log(err)
//             toast({
//                 title: "Falha no Cadastro!",
//                 description: "Este Email pode já existir.",
//                 status: "error",
//                 duration: 5000,
//                 isClosable: true
//             })
//         })
//     }

//     const login = (data: LoginProps) => {
//         api.post("/login", data)
//         .then((response) => {
//             const accessToken = response.data.accessToken
//             const user = response.data.user

//             localStorage.setItem("@SimpleBudget:accessToken", accessToken)
//             localStorage.setItem("@SimpleBudget:user", JSON.stringify(user))

//             toast({
//                 title: "Login Realizado!",
//                 status: "success",
//                 duration: 5000,
//                 isClosable: true
//             })

//             setData({accessToken, user})
//             history.push("/dashboard")
//         })
//         .catch((err) => {
//             console.log(err)
//             toast({
//                 title: "Falha no Login!",
//                 description: "Verifique os Campos Novamente.",
//                 status: "error",
//                 duration: 5000,
//                 isClosable: true
//             })
//         })
//     }

//     return (
//         <AuthContext.Provider value={{createRegister, login, accessToken: data.accessToken, user: data.user}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

export const useAuth = () => useContext(AuthContext);
