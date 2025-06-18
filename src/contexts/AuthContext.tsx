"use client"

import { AuthService } from "@/services/authService"
import { ApiResponse } from "@/types/Api";
import { Credentials, User } from "@/types/Auth";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (credentials: Credentials) => Promise<ApiResponse<User>>;
    logout: () => Promise<void>
    validateToken: () => Promise<ApiResponse<User>>;
}

const AuthContext2 = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
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


    const logout = async () => {
        setLoading(true);
        try {
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
            router.push("/login");
        } catch (error: any) {
            setError(error.message || "Erro ao fazer logout");
            setUser(null);
            setIsAuthenticated(false);
            router.push("/login");
        } finally {
            setLoading(false);
        }
    }

    const validateToken = async (): Promise<ApiResponse<User>> => {
        setLoading(true);
        try {
            const response = await authService.validateToken();
            console.log(response.success)
            if (response.success && response.data) {
                console.log("foi sucesso")
                setUser(response.data);
                setIsAuthenticated(true);
                return response;
            } else {
                console.log("não foi sucesso")
                setUser(null);
                setIsAuthenticated(false);

                await authService.logout()
                router.push("/login");
                return { success: false, error: response.error || "Erro ao validar token" };
            }
        } catch (error: any) {
            setUser(null);
            setIsAuthenticated(false);
            await authService.logout()
            router.push("/login")
            return { success: false, error: error.message || "Erro ao validar token" };
        }
    };

    return (
        <AuthContext2.Provider value={{
            user,
            isAuthenticated,
            loading,
            error,
            login,
            logout,
            validateToken
        }}>{children}
        </AuthContext2.Provider>
    )

}

export const useAuth2 = () => useContext(AuthContext2);