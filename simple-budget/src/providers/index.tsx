import { ReactNode } from "react";

import { AuthProvider } from "./AuthContext/index";

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};
