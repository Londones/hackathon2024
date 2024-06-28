import React, { createContext, useState } from "react";
import { Auth } from "@/lib/types";

type AuthContextType = {
    auth: Auth;
    setAuth: React.Dispatch<React.SetStateAction<Auth>>;
    persist: boolean;
    setPersist: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const authItem = localStorage.getItem("auth");
    const persistItem = localStorage.getItem("persist");

    const [auth, setAuth] = useState<Auth>(
        authItem
            ? JSON.parse(authItem)
            : {
                  userId: "",
                  name: "",
                  firstName: "",
                  accessToken: "",
                  email: "",
                  role: "",
              }
    );
    const [persist, setPersist] = useState(persistItem ? JSON.parse(persistItem) : false);

    return <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
