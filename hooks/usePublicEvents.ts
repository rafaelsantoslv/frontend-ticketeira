"use client"

import { useState, useEffect, useMemo } from "react"
import { toast } from "@/components/ui/use-toast"
import { mockEvents } from "@/lib/mock-data"

export function usePublicEvents(itemsPerPage = 9) {
    const [events, setEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [categoryFilter, setCategoryFilter] = useState("")
    const [dateFilter, setDateFilter] = useState("")

    useEffect(() => {
        fetchEvents()
    }, [])

    useEffect(() => {
        filterEvents()
        // Resetar para a primeira página quando os filtros mudarem
        setCurrentPage(1)
    }, [searchTerm, categoryFilter, dateFilter, events])

    const filterEvents = () => {
        let filtered = [...events]

        // Filtrar por termo de busca
        if (searchTerm.trim() !== "") {
            filtered = filtered.filter(
                (event) =>
                    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.locationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.locationCity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.category?.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        // Filtrar por categoria
        if (categoryFilter) {
            filtered = filtered.filter((event) => event.category === categoryFilter)
        }

        // Filtrar por data
        if (dateFilter) {
            const today = new Date()
            const nextWeek = new Date(today)
            nextWeek.setDate(today.getDate() + 7)
            const nextMonth = new Date(today)
            nextMonth.setMonth(today.getMonth() + 1)

            switch (dateFilter) {
                case "today":
                    filtered = filtered.filter((event) => {
                        const eventDate = new Date(event.startDate)
                        return (
                            eventDate.getDate() === today.getDate() &&
                            eventDate.getMonth() === today.getMonth() &&
                            eventDate.getFullYear() === today.getFullYear()
                        )
                    })
                    break
                case "thisWeek":
                    filtered = filtered.filter((event) => {
                        const eventDate = new Date(event.startDate)
                        return eventDate >= today && eventDate <= nextWeek
                    })
                    break
                case "thisMonth":
                    filtered = filtered.filter((event) => {
                        const eventDate = new Date(event.startDate)
                        return eventDate >= today && eventDate <= nextMonth
                    })
                    break
            }
        }

        setFilteredEvents(filtered)
    }

    const fetchEvents = async () => {
        setIsLoading(true)
        try {
            // Simular delay da API
            await new Promise((resolve) => setTimeout(resolve, 500))

            // Usar dados mockados em vez de chamar a API
            setEvents(mockEvents)
            setFilteredEvents(mockEvents)
        } catch (error) {
            console.error("Error fetching events:", error)
            toast({
                title: "Erro ao carregar eventos",
                description: "Não foi possível carregar a lista de eventos.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Calcular o total de páginas
    const totalPages = useMemo(() => Math.ceil(filteredEvents.length / itemsPerPage), [filteredEvents, itemsPerPage])

    // Obter eventos da página atual
    const paginatedEvents = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredEvents.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredEvents, currentPage, itemsPerPage])

    // Obter eventos em destaque (primeiros 3 eventos)
    const featuredEvents = useMemo(() => {
        return events.slice(0, 3)
    }, [events])

    // Função para mudar de página
    const handlePageChange = (page) => {
        setCurrentPage(page)
        // Rolar para o topo da página quando mudar de página
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Obter categorias únicas para filtro
    const categories = useMemo(() => {
        const uniqueCategories = new Set(events.map((event) => event.category))
        return Array.from(uniqueCategories)
    }, [events])

    return {
        events,
        filteredEvents,
        paginatedEvents,
        featuredEvents,
        isLoading,
        searchTerm,
        setSearchTerm,
        currentPage,
        totalPages,
        itemsPerPage,
        totalItems: filteredEvents.length,
        onPageChange: handlePageChange,
        categoryFilter,
        setCategoryFilter,
        dateFilter,
        setDateFilter,
        categories,
    }
}
