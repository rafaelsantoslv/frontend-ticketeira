import { useEffect, useState } from "react"
import { eventService } from "../services/eventService"
import type { EventSummary } from "../types"

export function useEventList(itemsPerPage = 6) {
    const [events, setEvents] = useState<EventSummary[]>([])
    const [filtered, setFiltered] = useState<EventSummary[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true)
            const data = await eventService.getAllEventSummaries()
            setEvents(data)
            setIsLoading(false)
        }
        fetchEvents()
    }, [])

    useEffect(() => {
        const filtered = events.filter((event) =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFiltered(filtered)
        setPage(1)
    }, [searchTerm, events])

    const paginatedEvents = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage)

    return {
        events: paginatedEvents,
        searchTerm,
        setSearchTerm,
        isLoading,
        page,
        setPage,
        totalPages: Math.ceil(filtered.length / itemsPerPage),
        totalItems: filtered.length,
        itemsPerPage,
    }
}
