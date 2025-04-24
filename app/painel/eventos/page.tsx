"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CalendarDays, ChevronRight, MapPin, PlusCircle, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Tipos para os dados
type Event = {
    id: string
    title: string
    date: Date
    location: string
    venue: string
    status: "active" | "upcoming" | "completed" | "canceled"
    ticketsSold: number
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
                },
                {
                    id: "2",
                    title: "FESTIVAL DE VERÃO 2023",
                    date: new Date("2023-12-20T18:00:00"),
                    location: "Balneário Camboriú, SC",
                    venue: "Praia Central",
                    status: "upcoming",
                    ticketsSold: 450,
                },
                {
                    id: "3",
                    title: "SHOW DE ROCK - BANDAS LOCAIS",
                    date: new Date("2023-05-05T20:00:00"),
                    location: "Blumenau, SC",
                    venue: "Teatro Municipal",
                    status: "completed",
                    ticketsSold: 180,
                },
                {
                    id: "4",
                    title: "WORKSHOP DE FOTOGRAFIA",
                    date: new Date("2023-04-10T14:00:00"),
                    location: "Joinville, SC",
                    venue: "Centro de Eventos",
                    status: "canceled",
                    ticketsSold: 45,
                },
                {
                    id: "5",
                    title: "FEIRA GASTRONÔMICA",
                    date: new Date("2023-08-25T11:00:00"),
                    location: "Florianópolis, SC",
                    venue: "Parque Municipal",
                    status: "upcoming",
                    ticketsSold: 320,
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

    // Formatar data para exibição
    const formatEventDate = (date: Date) => {
        return (
            <div className="flex flex-col items-center justify-center w-16 h-16 bg-gray-100 rounded-lg">
                <span className="text-sm font-semibold">{format(date, "MMM", { locale: ptBR }).toUpperCase()}</span>
                <span className="text-xl font-bold">{format(date, "dd")}</span>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Cabeçalho da página */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Meus Eventos</h1>
                    <p className="text-muted-foreground">Gerencie todos os seus eventos em um só lugar</p>
                </div>
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

            {/* Lista de eventos */}
            <Card>
                <CardHeader>
                    <CardTitle>Todos os Eventos</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center h-40">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#400041] border-t-transparent"></div>
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            {searchTerm
                                ? "Nenhum evento encontrado para esta busca."
                                : "Nenhum evento encontrado. Crie seu primeiro evento!"}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredEvents.map((event) => (
                                <Link href={`/painel/eventos/${event.id}`} key={event.id}>
                                    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                        {formatEventDate(event.date)}
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                <h3 className="font-medium">{event.title}</h3>
                                                <div>{renderEventStatus(event.status)}</div>
                                            </div>
                                            <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:gap-4 mt-1">
                                                <span className="flex items-center">
                                                    <MapPin className="mr-1 h-3 w-3" /> {event.venue}, {event.location}
                                                </span>
                                                <span className="flex items-center">
                                                    <CalendarDays className="mr-1 h-3 w-3" /> {format(event.date, "PPp", { locale: ptBR })}
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
