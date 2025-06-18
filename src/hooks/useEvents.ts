// hooks/useEvents.ts
import { EventService } from '@/services/eventService'
import { useState, useEffect, useMemo } from 'react'


export function useEvents() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("")
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);

    const eventService = new EventService()

    useEffect(() => {
        fetchEvents()
    }, [page])

    // Filtrar eventos
    useEffect(() => {
        filterEvents()
    }, [searchTerm, events])

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

    const fetchEvents = async () => {
        setIsLoading(true)
        const backendPage = page - 1;
        const result = await eventService.getEventsMe({ page: backendPage, limit: itemsPerPage })

        if (result.success && result.data) {
            console.log(page)
            setEvents(result.data.events)
            setTotalPages(result.data.pagination.pages);
            setTotalItems(result.data.pagination.total);
            setItemsPerPage(result.data.pagination.limit)

            setFilteredEvents(result.data.events)
            setIsLoading(false)
        } else {
            console.log("deu erro")

        }
        setIsLoading(false)
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };


    return {
        events,
        filteredEvents,
        searchTerm,
        setSearchTerm,
        isLoading,
        page,
        setPage: handlePageChange,
        totalPages,
        totalItems,
        itemsPerPage,
    }
}



