"use client"

import { useAuth } from "@/modules/auth/contexts/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type { Role } from "@/modules/auth/constants/roles"

export function useRequireRole(allowedRoles: Role[]) {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.replace("/login")
            } else if (!allowedRoles.includes(user.role)) {
                router.replace("/unauthorized") // você pode criar essa página
            }
        }
    }, [user, isLoading, router])
}
