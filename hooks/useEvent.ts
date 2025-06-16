// hooks/useEvents.ts
import { EventService } from '@/services/eventService'
import { Event } from '@/types/Event'
import { useState, useEffect } from 'react'
import { USE_MOCKS } from '@/utils/config'
import { mockEvents } from '@/mocks/dashboard'



export function useEvents() {
    const [events, setEvents] = useState<Event[]>([])
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const eventService = new EventService()

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
            if (USE_MOCKS) {
                setTimeout(() => {
                    setEvents(mockEvents)
                    setFilteredEvents(mockEvents)
                    setIsLoading(false)
                }, 500)
                return
            }

            const token = localStorage.getItem("token")
            const response = await eventService.getEventsMe(token)
            setEvents(response.data.events)
            setFilteredEvents(response.data.events)
            setIsLoading(false)
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