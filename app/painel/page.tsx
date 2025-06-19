"use client"

import Link from "next/link"
import { CalendarDays, Clock, DollarSign, Plus, Ticket } from "lucide-react"
import { format, isValid } from "date-fns"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/StatCard"
import { RecentEventCard } from "@/modules/eventos/components/EventRecentCard"

import { useAuth } from "@/modules/auth/contexts/useAuth"
import { usePainelData } from "@/modules/painel/hooks/usePainelData"
import { formatCurrency } from "@/utils/formatCurrency"

export default function PainelPage() {
    const { user } = useAuth()
    const { recentEvents, stats, isLoading } = usePainelData()

    const upcomingEvent = recentEvents.find((e) => e.status === "upcoming")

    return (
        <div className="space-y-6">
            {/* Cabeçalho da página */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Bem-vindo ao Painel</h1>
                    <p className="text-muted-foreground">
                        Olá, {user?.name || "Usuário"}! Aqui está uma visão geral dos seus eventos ativos.
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
                <StatCard
                    title="Eventos Ativos"
                    icon={<CalendarDays className="h-4 w-4 text-muted-foreground" />}
                    value={
                        isLoading
                            ? "-"
                            : typeof stats.activeEvents === "number"
                                ? stats.activeEvents
                                : "Nenhum evento ativo"
                    }
                    description={
                        isLoading
                            ? ""
                            : stats.activeEvents > 0
                                ? `${stats.activeEvents} atualmente`
                                : "Você ainda não possui eventos ativos"
                    }
                />

                <StatCard
                    title="Ingressos Vendidos"
                    icon={<Ticket className="h-4 w-4 text-muted-foreground" />}
                    value={
                        isLoading
                            ? "-"
                            : typeof stats.totalTicketsSold === "number"
                                ? stats.totalTicketsSold
                                : "Nenhum ingresso vendido"
                    }
                    description={
                        isLoading
                            ? ""
                            : stats.totalTicketsSold > 0
                                ? "Ingressos vendidos em eventos ativos"
                                : "Nenhum ingresso foi vendido ainda"
                    }
                />

                <StatCard
                    title="Receita Total"
                    icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                    value={
                        isLoading
                            ? "-"
                            : stats.totalRevenue > 0
                                ? formatCurrency(stats.totalRevenue)
                                : "R$ 0,00"
                    }
                    description={
                        isLoading
                            ? ""
                            : stats.totalRevenue > 0
                                ? "Receita gerada por eventos ativos"
                                : "Sem receita gerada até agora"
                    }
                />

                <StatCard
                    title="Próximo Evento"
                    icon={<Clock className="h-4 w-4 text-muted-foreground" />}
                    value={
                        isLoading
                            ? "-"
                            : upcomingEvent?.date && isValid(new Date(upcomingEvent.date))
                                ? format(new Date(upcomingEvent.date), "dd/MM/yyyy")
                                : "Nenhum"
                    }
                    description={
                        isLoading
                            ? ""
                            : upcomingEvent?.title || "Nenhum evento agendado"
                    }
                />
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
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#400041] border-t-transparent" />
                        </div>
                    ) : recentEvents.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            Nenhum evento encontrado. Crie seu primeiro evento!
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentEvents.slice(0, 5).map((event) => (
                                <RecentEventCard
                                    key={event.id}
                                    id={event.id}
                                    date={event.date}
                                    ticketsSold={event.ticketsSold}
                                    status={event.status}
                                    title={event.title}
                                    totalRevenue={event.totalRevenue}
                                />
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
