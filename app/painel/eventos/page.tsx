"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CalendarDays, MapPin, PlusCircle, Search } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CardEvent } from "@/components/card-event"
import { PainelHeader } from "@/components/painel-header"

// Tipos para os dados
type Event = {
    id: string
    title: string
    date: Date
    location: string
    venue: string
    status: "active" | "upcoming" | "completed" | "canceled"
    ticketsSold: number
    image: string
}

export default function EventosPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    // Simular carregamento de dados
    useEffect(() => {
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
    }, [])

    // Filtrar eventos quando o termo de busca mudar
    useEffect(() => {
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
    }, [searchTerm, events])

    // Função para renderizar o status do evento
    const renderEventStatus = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-500">Ativo</Badge>
            case "upcoming":
                return <Badge className="bg-blue-500">Em breve</Badge>
            case "completed":
                return <Badge className="bg-gray-500">Concluído</Badge>
            case "canceled":
                return <Badge className="bg-red-500">Cancelado</Badge>
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            {/* Cabeçalho da página */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <PainelHeader name={"Meus Eventos"} title={"Gerencie todos os seus eventos em um só lugar"} />
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar eventos..."
                            className="pl-8 w-full sm:w-[250px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link href="/painel/eventos/novo">
                        <Button className="bg-[#400041] hover:bg-[#5a105b]">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Criar Novo Evento
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Lista de eventos em cards */}
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#400041] border-t-transparent"></div>
                </div>
            ) : filteredEvents.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900">Nenhum evento encontrado</h3>
                    <p className="mt-2 text-gray-500">
                        {searchTerm
                            ? "Nenhum evento corresponde aos critérios de busca."
                            : "Você ainda não tem eventos cadastrados."}
                    </p>
                    <div className="mt-6">
                        <Link href="/painel/eventos/novo">
                            <Button className="bg-[#400041] hover:bg-[#5a105b]">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Criar Primeiro Evento
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <Link href={`/painel/eventos/${event.id}`} key={event.id} className="block">
                            <CardEvent event={event} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
