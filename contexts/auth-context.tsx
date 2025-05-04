"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { authService, AuthResponse, RegisterData } from "@/services/auth.service"
import { ApiResponse } from "@/types/api"


type AuthContextType = {
  user: AuthResponse | null
  token: string | null
  register: (data: RegisterData) => Promise<ApiResponse<void>>
  login: (email: string, password: string) => Promise<ApiResponse<AuthResponse>>
  logout: () => void;


}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("auth_user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    const result = await authService.login({ email, password })
    if (result.success && result.data) {
      setUser(result.data)
      setToken(result.data.token)
      localStorage.setItem("token", result.data.token)
      document.cookie = `token=${result.data.token}; path=/; max-age=3600; SameSite=Lax`
      localStorage.setItem("user", JSON.stringify(result.data))
    }

    return result
  }

  const register = async (data: RegisterData) => {
    return await authService.register(data)
  }

  const logout = async () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

