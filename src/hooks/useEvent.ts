import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export function useEvent() {
    const params = useParams()
    const eventId = params.id as string
    const [isLoading, setIsLoading] = useState(true)
    const [event, setEvent] = useState(null)

    useEffect(() => {
        // Em um cenário real, isso seria uma chamada de API com o ID do evento
        setTimeout(() => {
            const mockEvent = {
                id: eventId,
                title: eventId === "1" ? "LA VIE GLOW PARTY - INAUGURAÇÃO" : "Evento " + eventId,
                date: new Date("2023-06-15"),
                time: "22:00",
                venueName: "Club XYZ",
                address: "Rua das Flores, 123 - Blumenau, SC",
                ageRating: "18+",
                category: "Festa",
                about: "Festa de inauguração com muita música eletrônica e efeitos visuais incríveis.",
                image: "/placeholder.svg?height=200&width=400",
                coverImage: "/placeholder.svg?height=400&width=800",
                status: "active",
                stats: {
                    totalSold: 258,
                    totalRevenue: 14060,
                    ticketMedium: 48.76,
                    checkins: 132,
                },
                sectors: [
                    {
                        id: "s1",
                        name: "Pista",
                        capacity: 500,
                        description: "Área principal do evento",
                    },
                    {
                        id: "s2",
                        name: "Camarote",
                        capacity: 100,
                        description: "Área VIP com vista privilegiada",
                    },
                ],
                batches: [
                    {
                        id: "1",
                        sectorId: "s1",
                        name: "1º Lote - Pista",
                        quantity: 200,
                        price: 50,
                        active: false,
                        sold: 200,
                    },
                    {
                        id: "2",
                        sectorId: "s1",
                        name: "2º Lote - Pista",
                        quantity: 300,
                        price: 70,
                        active: true,
                        sold: 58,
                    },
                    {
                        id: "3",
                        sectorId: "s2",
                        name: "Camarote VIP",
                        quantity: 50,
                        price: 120,
                        active: true,
                        sold: 0,
                    },
                    {
                        id: "4",
                        sectorId: "s2",
                        name: "Camarote Premium",
                        quantity: 50,
                        price: 150,
                        active: true,
                        sold: 0,
                    },
                ],
                checkins: [
                    {
                        id: "TK-001",
                        name: "João Silva",
                        email: "joao@email.com",
                        sector: "Pista",
                        batch: "1º Lote",
                        status: "validated",
                        validatedAt: "15/06/2023 22:45",
                        price: "R$ 80,00",
                    },
                    {
                        id: "TK-002",
                        name: "Maria Souza",
                        email: "maria@email.com",
                        sector: "Camarote",
                        batch: "VIP",
                        status: "pending",
                        validatedAt: null,
                        price: "R$ 200,00",
                    },
                    {
                        id: "TK-003",
                        name: "Carlos Oliveira",
                        email: "carlos@email.com",
                        sector: "Pista",
                        batch: "2º Lote",
                        status: "cancelled",
                        validatedAt: "15/06/2023 23:10",
                        price: "R$ 100,00",
                    },
                    {
                        id: "TK-004",
                        name: "Ana Costa",
                        email: "ana@email.com",
                        sector: "Camarote",
                        batch: "VIP",
                        status: "validated",
                        validatedAt: "15/06/2023 21:30",
                        price: "R$ 200,00",
                    },
                    {
                        id: "TK-005",
                        name: "Pedro Santos",
                        email: "pedro@email.com",
                        sector: "Pista",
                        batch: "1º Lote",
                        status: "pending",
                        validatedAt: null,
                        price: "R$ 80,00",
                    },
                ]

            }

            setEvent(mockEvent)
            setIsLoading(false)
        }, 1000)
    }, [eventId])

    const getBatchesBySector = (sectorId) => {
        if (!event) return []
        return event.batches.filter((batch) => batch.sectorId === sectorId)
    }

    const getSectorStats = (sectorId) => {
        if (!event) {
            return {
                totalSold: 0,
                totalRevenue: 0,
                totalCapacity: 0,
            }
        }

        const batches = getBatchesBySector(sectorId)

        const totalSold = batches.reduce((sum, batch) => sum + batch.sold, 0)
        const totalRevenue = batches.reduce((sum, batch) => sum + batch.sold * batch.price, 0)
        const totalCapacity = batches.reduce((sum, batch) => sum + batch.quantity, 0)

        return {
            totalSold,
            totalRevenue,
            totalCapacity,
        }
    }

    return {
        getBatchesBySector,
        getSectorStats,
        event,
        setEvent,
        isLoading,
        setIsLoading
    }
}
