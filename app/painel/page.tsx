"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CalendarDays, ChevronRight, Clock, DollarSign, LineChart, Plus, Ticket, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"

// Tipos para os dados
type EventSummary = {
    id: string
    title: string
    date: string
    location: string
    ticketsSold: number
    totalRevenue: number
    status: "active" | "upcoming" | "completed"
}

type StatsSummary = {
    totalEvents: number
    activeEvents: number
    totalTicketsSold: number
    totalRevenue: number
}

export default function PainelPage() {
    const { user } = useAuth()
    const [recentEvents, setRecentEvents] = useState<EventSummary[]>([])
    const [stats, setStats] = useState<StatsSummary>({
        totalEvents: 0,
        activeEvents: 0,
        totalTicketsSold: 0,
        totalRevenue: 0,
    })
    const [isLoading, setIsLoading] = useState(true)

    // Simular carregamento de dados
    useEffect(() => {
        // Em um cenário real, isso seria uma chamada de API
        setTimeout(() => {
            setRecentEvents([
                {
                    id: "1",
                    title: "LA VIE GLOW PARTY - INAUGURAÇÃO",
                    date: "15/06/2023",
                    location: "Club XYZ, Blumenau",
                    ticketsSold: 258,
                    totalRevenue: 12580,
                    status: "active",
                },
                {
                    id: "2",
                    title: "FESTIVAL DE VERÃO 2023",
                    date: "20/12/2023",
                    location: "Praia Central, Balneário Camboriú",
                    ticketsSold: 450,
                    totalRevenue: 22500,
                    status: "upcoming",
                },
                {
                    id: "3",
                    title: "SHOW DE ROCK - BANDAS LOCAIS",
                    date: "05/05/2023",
                    location: "Teatro Municipal, Blumenau",
                    ticketsSold: 180,
                    totalRevenue: 5400,
                    status: "completed",
                },
            ])

            setStats({
                totalEvents: 3,
                activeEvents: 1,
                totalTicketsSold: 888,
                totalRevenue: 40480,
            })

            setIsLoading(false)
        }, 1000)
    }, [])

    // Função para renderizar o status do evento
    const renderEventStatus = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-500">Ativo</Badge>
            case "upcoming":
                return <Badge className="bg-blue-500">Em breve</Badge>
            case "completed":
                return <Badge className="bg-gray-500">Concluído</Badge>
            default:
                return null
        }
    }

    // Função para formatar valor monetário
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value)
    }

    return (
        <div className="space-y-6">
            {/* Cabeçalho da página */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Bem-vindo ao Painel</h1>
                    <p className="text-muted-foreground">
                        Olá, {user?.email ? user.email.split("@")[0] : "Usuário"}! Aqui está uma visão geral dos seus eventos.
                    </p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Link href="/painel/eventos/novo">
                        <Button className="bg-[#400041] hover:bg-[#5a105b]">
                            <Plus className="mr-2 h-4 w-4" />
                            Criar Novo Evento
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Cards de estatísticas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Eventos</CardTitle>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{isLoading ? "-" : stats.totalEvents}</div>
                        <p className="text-xs text-muted-foreground">{isLoading ? "" : `${stats.activeEvents} eventos ativos`}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ingressos Vendidos</CardTitle>
                        <Ticket className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{isLoading ? "-" : stats.totalTicketsSold}</div>
                        <p className="text-xs text-muted-foreground">Em todos os eventos</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{isLoading ? "-" : formatCurrency(stats.totalRevenue)}</div>
                        <p className="text-xs text-muted-foreground">De todos os eventos</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Próximo Evento</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {isLoading ? "-" : recentEvents.find((e) => e.status === "upcoming")?.date || "Nenhum"}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {isLoading ? "" : recentEvents.find((e) => e.status === "upcoming")?.title || "Nenhum evento agendado"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Seção de ações rápidas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/painel/dashboard">
                    <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <LineChart className="mr-2 h-5 w-5 text-[#400041]" />
                                Dashboard
                            </CardTitle>
                            <CardDescription>Visualize estatísticas detalhadas e gráficos de desempenho</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Ver detalhes</span>
                            <ChevronRight className="h-4 w-4" />
                        </CardFooter>
                    </Card>
                </Link>

                <Link href="/painel/informacoes">
                    <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <CalendarDays className="mr-2 h-5 w-5 text-[#400041]" />
                                Informações de Eventos
                            </CardTitle>
                            <CardDescription>Gerencie seus eventos, lotes e configurações</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Gerenciar eventos</span>
                            <ChevronRight className="h-4 w-4" />
                        </CardFooter>
                    </Card>
                </Link>

                <Link href="#">
                    <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Users className="mr-2 h-5 w-5 text-[#400041]" />
                                Participantes
                            </CardTitle>
                            <CardDescription>Visualize e gerencie os participantes dos seus eventos</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Ver participantes</span>
                            <ChevronRight className="h-4 w-4" />
                        </CardFooter>
                    </Card>
                </Link>
            </div>

            {/* Lista de eventos recentes */}
            <Card>
                <CardHeader>
                    <CardTitle>Eventos Recentes</CardTitle>
                    <CardDescription>Visão geral dos seus eventos mais recentes</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center h-40">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#400041] border-t-transparent"></div>
                        </div>
                    ) : recentEvents.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            Nenhum evento encontrado. Crie seu primeiro evento!
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                                >
                                    <div className="space-y-1 mb-2 md:mb-0">
                                        <div className="flex items-center">
                                            <h3 className="font-medium">{event.title}</h3>
                                            <div className="ml-2">{renderEventStatus(event.status)}</div>
                                        </div>
                                        <div className="text-sm text-muted-foreground flex flex-col md:flex-row md:gap-4">
                                            <span className="flex items-center">
                                                <CalendarDays className="mr-1 h-3 w-3" /> {event.date}
                                            </span>
                                            <span className="flex items-center">
                                                <Users className="mr-1 h-3 w-3" /> {event.ticketsSold} ingressos
                                            </span>
                                            <span className="flex items-center">
                                                <DollarSign className="mr-1 h-3 w-3" /> {formatCurrency(event.totalRevenue)}
                                            </span>
                                        </div>
                                    </div>
                                    <Link href={`/painel/informacoes`}>
                                        <Button variant="outline" size="sm">
                                            Ver Detalhes
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href="/painel/eventos">
                        <Button variant="outline">Ver Todos os Eventos</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
