// hooks/useEvents.ts
import { EventService } from '@/services/eventService'
import { Event } from '@/types/Event'
import { useState, useEffect } from 'react'
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"



export function useEvents() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("")
    const eventService = new EventService()

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
        setIsLoading(true)
        const result = await eventService.getEventsMe()

        if (result.success && result.data) {
            console.log("validei e deu certo")
            setEvents(result.data.events)

            setFilteredEvents(result.data.events)
            setIsLoading(false)
        } else {
            console.log("deu erro")

        }
        setIsLoading(false)
    }

    return {
        events,
        filteredEvents,
        searchTerm,
        setSearchTerm,
        isLoading,
    }
}



