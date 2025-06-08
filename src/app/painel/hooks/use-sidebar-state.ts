"use client"

import { useState } from "react"

export function useSidebarState() {
    const [collapsed, setCollapsed] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const savedState = localStorage.getItem("sidebar-collapsed")
            return savedState === "false"
        }
        return true
    })


    // Função para alternar o estado da sidebar
    const toggleSidebar = () => {
        setCollapsed(prev => {
            const newState = !prev
            localStorage.setItem("sidebar-collapsed", String(newState))
            return newState
        })
    }

    return { collapsed, toggleSidebar }
}
