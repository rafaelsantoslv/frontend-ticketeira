"use client"

import { authService } from "@/modules/auth/services/authService"
import { createContext, ReactNode, useState } from "react"

type User = {
    id: string
    email: string
    role: "USER" | "PRODUTOR" | "ADMIN"
}

type AuthContextType = {
    user: User | null
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
    logout: () => void
    isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    async function login(email: string, password: string) {
        const response = await authService.login(email, password)
        if (response.success) {
            setUser(response.user)
        }
        return response
    }

    function logout() {
        authService.logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
