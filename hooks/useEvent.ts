// hooks/useEvents.ts
import { Event } from '@/types/event'
import { useState, useEffect } from 'react'



export function useEvents() {
    const [events, setEvents] = useState<Event[]>([])
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    // Carregar eventos
    useEffect(() => {
        fetchEvents()
    }, [])

    // Filtrar eventos
    useEffect(() => {
        filterEvents()
    }, [searchTerm, events])

    // Função para buscar eventos
    const fetchEvents = async () => {
        try {
            // Em um cenário real, isso seria uma chamada de API
            setTimeout(() => {
                const mockEvents: Event[] = [
                    {
                        id: "1",
                        title: "LA VIE GLOW PARTY - INAUGURAÇÃO",
                        date: new Date("2023-06-15T22:00:00"),
                        location: "Blumenau, SC",
                        venue: "Club XYZ",
                        status: "active",
                        ticketsSold: 258,
                        image: "/placeholder.svg?height=200&width=400",
                    },
                    {
                        id: "2",
                        title: "FESTIVAL DE VERÃO 2023",
                        date: new Date("2023-12-20T18:00:00"),
                        location: "Balneário Camboriú, SC",
                        venue: "Praia Central",
                        status: "upcoming",
                        ticketsSold: 450,
                        image: "/placeholder.svg?height=200&width=400",
                    },
                    {
                        id: "3",
                        title: "SHOW DE ROCK - BANDAS LOCAIS",
                        date: new Date("2023-05-05T20:00:00"),
                        location: "Blumenau, SC",
                        venue: "Teatro Municipal",
                        status: "completed",
                        ticketsSold: 180,
                        image: "/placeholder.svg?height=200&width=400",
                    },
                    {
                        id: "4",
                        title: "WORKSHOP DE FOTOGRAFIA",
                        date: new Date("2023-04-10T14:00:00"),
                        location: "Joinville, SC",
                        venue: "Centro de Eventos",
                        status: "canceled",
                        ticketsSold: 45,
                        image: "/placeholder.svg?height=200&width=400",
                    },
                    {
                        id: "5",
                        title: "FEIRA GASTRONÔMICA",
                        date: new Date("2023-08-25T11:00:00"),
                        location: "Florianópolis, SC",
                        venue: "Parque Municipal",
                        status: "upcoming",
                        ticketsSold: 320,
                        image: "/placeholder.svg?height=200&width=400",
                    },
                ]

                setEvents(mockEvents)
                setFilteredEvents(mockEvents)
                setIsLoading(false)
            }, 1000)
        } catch (error) {
            console.error('Erro ao carregar eventos:', error)
            setIsLoading(false)
        }
    }

    // Função para filtrar eventos
    const filterEvents = () => {
        if (searchTerm.trim() === "") {
            setFilteredEvents(events)
        } else {
            const filtered = events.filter(
                (event) =>
                    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.venue.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            setFilteredEvents(filtered)
        }
    }

    return {
        events,
        filteredEvents,
        searchTerm,
        setSearchTerm,
        isLoading,
    }
}