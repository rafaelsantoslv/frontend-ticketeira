// hooks/useEvents.ts
import { EventService } from '@/services/eventService'
import { useState, useEffect, useMemo } from 'react'

const ITEMS_PER_PAGE = 9

export function useEvents(itemsPerPage = 9) {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [paginatedEvents, setPaginatedEvents] = useState<Event[]>([])
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
        setCurrentPage(1)
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


    useEffect(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        setPaginatedEvents(filteredEvents.slice(startIndex, endIndex))

        // Rolar para o topo quando mudar de página
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }, [currentPage, filteredEvents])

    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return {
        events,
        filteredEvents,
        searchTerm,
        setSearchTerm,
        isLoading,
        paginatedEvents,
        currentPage,
        totalPages,
        itemsPerPage,
        totalItems: filteredEvents.length,
        onPageChange: handlePageChange,
    }
}



