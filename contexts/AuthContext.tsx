"use client"

import { AuthService } from "@/services/authService";
import { ApiResponse } from "@/types/api";
import { Credentials, User } from "@/types/auth";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (credentials: Credentials) => Promise<ApiResponse<User>>;
}

const AuthContext2 = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const authService = AuthService.getInstance();




    const login = async (credentials: Credentials): Promise<ApiResponse<User>> => {
        setLoading(true);
        setError(null);
        const result = await authService.login(credentials)
        setLoading(false);


        if (result.success && result.data) {
            setUser(result.data);
            setIsAuthenticated(true);
        } else {
            setUser(null);
            setIsAuthenticated(false);
            setError(result.error || "Erro ao fazer login");
        }
        return result;
    };

    return (
        <AuthContext2.Provider value={{
            user,
            isAuthenticated,
            loading,
            error,
            login
        }}>{children}
        </AuthContext2.Provider>
    )

}

export const useAuth2 = () => useContext(AuthContext2);