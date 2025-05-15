// hooks/useEvents.ts
import { EventService } from '@/services/eventService'
import { Event } from '@/types/Event'
import { useState, useEffect } from 'react'



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
            const token = localStorage.getItem("token")
            // Em um cenário real, isso seria uma chamada de API
            setTimeout(() => {
                eventService.getEventsMe(token).then((response) => {
                    console.log(response.data.events)
                    setEvents(response.data.events)
                    setFilteredEvents(response.data.events)
                    setIsLoading(false)
                }).catch((error) => {
                    console.log(error)
                })

                //setEvents(mockEvents)
                //setFilteredEvents(mockEvents)
                //setIsLoading(false)
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