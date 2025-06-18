"use client"

import { useAuth } from "@/modules/auth/contexts/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useRequireAuth() {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/login")
        }
    }, [user, isLoading, router])
}
