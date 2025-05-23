"use client"

import Link from "next/link"
import { CalendarDays, ChevronRight, Clock, DollarSign, LineChart, Plus, Ticket, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { usePainelData } from "./hooks/use-painel-data"
import { formatCurrency } from "@/utils/formatCurrency"
import { EventStatusBadge } from "@/components/event-status-badge"
import { StatCard } from "@/components/stat-card"
import { RecentEventCard } from "@/components/recent-event-card"



export default function PainelPage() {
    const { user } = useAuth()
    const { recentEvents, stats, isLoading } = usePainelData()


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
                <StatCard title="Total de Eventos" icon={<CalendarDays className="h-4 w-4 text-muted-foreground" />} value={isLoading ? "-" : stats.totalEvents} description={isLoading ? "" : `${stats.activeEvents} eventos ativos`} />
                <StatCard title="Ingressos Vendidos" icon={<Ticket className="h-4 w-4 text-muted-foreground" />} value={isLoading ? "-" : stats.totalTicketsSold} description="Em todos eventos" />
                <StatCard title="Receita Total" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value={isLoading ? "-" : formatCurrency(stats.totalRevenue)} description="De todos os eventos" />
                <StatCard title="Próximo Evento" icon={<Clock className="h-4 w-4 text-muted-foreground" />} value={isLoading ? "-" : recentEvents.find((e) => e.status === "upcoming")?.date || "Nenhum"} description={isLoading ? "" : recentEvents.find((e) => e.status === "upcoming")?.title || "Nenhum evento agendado"} />
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
                                <RecentEventCard key={event.id} id={event.id} date={event.date} ticketsSold={event.ticketsSold} status={event.status} title={event.title} totalRevenue={event.totalRevenue} />

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
        </div >
    )
}
