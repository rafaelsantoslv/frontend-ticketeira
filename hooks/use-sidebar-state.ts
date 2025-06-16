"use client"

import { useEffect, useState } from "react"

export function useSidebarState() {

    const [collapsed, setCollapsed] = useState(true)

    useEffect(() => {
        const savedState = localStorage.getItem("sidebar-collapsed")
        if (savedState !== null) {
            setCollapsed(savedState === "true")
        }
    }, [])


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
