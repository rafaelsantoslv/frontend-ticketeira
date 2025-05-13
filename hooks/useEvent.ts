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
                        "id": "ea500a60-d573-45a3-a1a6-1bdf39e7cf2f",
                        "title": "Rock Concert",
                        "locationName": "Rock Arena",
                        "locationCity": "Floripa",
                        "locationState": "SC",
                        "category": "Music",
                        "imageUrl": "http://localhost:3000/teste",
                        "isPublished": false,
                        "isFeatured": false,
                        "startDate": "2025-04-15T20:00:00",
                        "soldQuantity": 100
                    },
                    {
                        "id": "ea500a60-d573-45a3-a1a6-1bdf39e7cf22",
                        "title": "Rock Concertt",
                        "locationName": "Rock Arena",
                        "locationCity": "Floripa",
                        "locationState": "SC",
                        "category": "Music",
                        "imageUrl": "http://localhost:3000/teste",
                        "isPublished": false,
                        "isFeatured": false,
                        "startDate": "2025-04-16T20:00:00",
                        "soldQuantity": 200
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
                    event.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.locationCity.toLowerCase().includes(searchTerm.toLowerCase()),
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