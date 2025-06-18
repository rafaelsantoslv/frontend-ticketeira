"use client"

import { createContext, useContext, useState, useEffect } from "react"

const TicketSelectionContext = createContext(null)

export function TicketSelectionProvider({ children }) {
    const [selectedTickets, setSelectedTickets] = useState({})
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)

    // Carregar seleção do localStorage ao iniciar
    useEffect(() => {
        try {
            const savedSelection = localStorage.getItem("selectedTickets")
            if (savedSelection) {
                const parsedSelection = JSON.parse(savedSelection)
                setSelectedTickets(parsedSelection)
            }
        } catch (error) {
            console.error("Error loading ticket selection from localStorage:", error)
            localStorage.removeItem("selectedTickets")
        }
    }, [])

    // Calcular totais quando a seleção mudar
    useEffect(() => {
        let amount = 0
        let quantity = 0

        Object.values(selectedTickets).forEach((ticket) => {
            amount += ticket.price * ticket.quantity
            quantity += ticket.quantity
        })

        setTotalAmount(amount)
        setTotalQuantity(quantity)

        // Salvar no localStorage
        try {
            localStorage.setItem("selectedTickets", JSON.stringify(selectedTickets))
        } catch (error) {
            console.error("Error saving ticket selection to localStorage:", error)
        }
    }, [selectedTickets])

    const addTicket = (ticket) => {
        setSelectedTickets((prev) => {
            const ticketId = ticket.id
            const existingTicket = prev[ticketId]

            return {
                ...prev,
                [ticketId]: {
                    ...ticket,
                    quantity: existingTicket ? existingTicket.quantity + 1 : 1,
                },
            }
        })
    }

    const removeTicket = (ticketId) => {
        setSelectedTickets((prev) => {
            const existingTicket = prev[ticketId]

            if (!existingTicket || existingTicket.quantity <= 0) {
                return prev
            }

            if (existingTicket.quantity === 1) {
                const newSelection = { ...prev }
                delete newSelection[ticketId]
                return newSelection
            }

            return {
                ...prev,
                [ticketId]: {
                    ...existingTicket,
                    quantity: existingTicket.quantity - 1,
                },
            }
        })
    }

    const clearSelection = () => {
        setSelectedTickets({})
        localStorage.removeItem("selectedTickets")
    }

    const value = {
        selectedTickets,
        totalAmount,
        totalQuantity,
        addTicket,
        removeTicket,
        clearSelection,
    }

    return <TicketSelectionContext.Provider value={value}>{children}</TicketSelectionContext.Provider>
}

export function useTicketSelection() {
    const context = useContext(TicketSelectionContext)
    if (!context) {
        throw new Error("useTicketSelection must be used within a TicketSelectionProvider")
    }
    return context
}
