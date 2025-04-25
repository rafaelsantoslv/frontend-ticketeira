"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    PlusCircle,
    Trash2,
    Edit,
    Calendar,
    MapPin,
    Clock,
    Users,
    Tag,
    BarChart,
    DollarSign,
    Ticket,
    ArrowUpRight,
    ChevronDown,
    ChevronUp,
} from "lucide-react"
import EventCreationForm from "@/components/event-creation-form"
import { toast } from "@/components/ui/use-toast"
import BatchManagementForm from "@/components/batch-management-form"
import SectorManagementForm from "@/components/sector-management-form"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Define types
export type Batch = {
    id: string
    sectorId: string
    name: string
    quantity: number
    price: number
    active: boolean
    sold: number
}

export type Sector = {
    id: string
    name: string
    capacity: number
    description?: string
    expanded?: boolean
}

export type Event = {
    id: string
    title: string
    date: Date
    time: string
    venueName: string
    address: string
    ageRating: string
    category: string
    about: string
    image?: string
    coverImage?: string
    sectors: Sector[]
    batches: Batch[]
    status: "active" | "upcoming" | "completed" | "canceled"
    stats: {
        totalSold: number
        totalRevenue: number
        ticketMedium: number
        checkins: number
    }
}

export default function EventoDetalhesPage() {
    const params = useParams()
    const eventId = params.id as string

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isBatchFormOpen, setIsBatchFormOpen] = useState(false)
    const [isSectorFormOpen, setIsSectorFormOpen] = useState(false)
    const [event, setEvent] = useState<Event | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [expandedSectors, setExpandedSectors] = useState<Record<string, boolean>>({})

    // Simular carregamento de dados do evento
    useEffect(() => {
        // Em um cenário real, isso seria uma chamada de API com o ID do evento
        setTimeout(() => {
            const mockEvent: Event = {
                id: eventId,
                title: eventId === "1" ? "LA VIE GLOW PARTY - INAUGURAÇÃO" : "Evento " + eventId,
                date: new Date("2023-06-15"),
                time: "22:00",
                venueName: "Club XYZ",
                address: "Rua das Flores, 123 - Blumenau, SC",
                ageRating: "18+",
                category: "Festa",
                about: "Festa de inauguração com muita música eletrônica e efeitos visuais incríveis.",
                image: "/placeholder.svg?height=200&width=400",
                coverImage: "/placeholder.svg?height=400&width=800",
                status: "active",
                stats: {
                    totalSold: 258,
                    totalRevenue: 14060,
                    ticketMedium: 48.76,
                    checkins: 132,
                },
                sectors: [
                    {
                        id: "s1",
                        name: "Pista",
                        capacity: 500,
                        description: "Área principal do evento",
                    },
                    {
                        id: "s2",
                        name: "Camarote",
                        capacity: 100,
                        description: "Área VIP com vista privilegiada",
                    },
                ],
                batches: [
                    {
                        id: "1",
                        sectorId: "s1",
                        name: "1º Lote - Pista",
                        quantity: 200,
                        price: 50,
                        active: false,
                        sold: 200,
                    },
                    {
                        id: "2",
                        sectorId: "s1",
                        name: "2º Lote - Pista",
                        quantity: 300,
                        price: 70,
                        active: true,
                        sold: 58,
                    },
                    {
                        id: "3",
                        sectorId: "s2",
                        name: "Camarote VIP",
                        quantity: 50,
                        price: 120,
                        active: true,
                        sold: 0,
                    },
                    {
                        id: "4",
                        sectorId: "s2",
                        name: "Camarote Premium",
                        quantity: 50,
                        price: 150,
                        active: true,
                        sold: 0,
                    },
                ],
            }

            // Inicializar todos os setores como expandidos
            const initialExpandedState: Record<string, boolean> = {}
            mockEvent.sectors.forEach((sector) => {
                initialExpandedState[sector.id] = false
            })
            setExpandedSectors(initialExpandedState)

            setEvent(mockEvent)
            setIsLoading(false)
        }, 1000)
    }, [eventId])

    const handleEditEvent = (data: Partial<Event>) => {
        if (!event) return

        const updatedEvent = {
            ...event,
            ...data,
        }

        setEvent(updatedEvent)
        toast({
            title: "Evento atualizado com sucesso!",
            description: `O evento "${updatedEvent.title}" foi atualizado.`,
        })
        setIsFormOpen(false)
    }

    const handleAddSector = (sectorData: Omit<Sector, "id">) => {
        if (!event) return

        const newSector: Sector = {
            ...sectorData,
            id: `s${Date.now()}`,
        }

        const updatedEvent = {
            ...event,
            sectors: [...event.sectors, newSector],
        }

        setEvent(updatedEvent)
        setExpandedSectors((prev) => ({ ...prev, [newSector.id]: true }))

        toast({
            title: "Setor adicionado com sucesso!",
            description: `O setor "${sectorData.name}" foi adicionado ao evento.`,
        })

        setIsSectorFormOpen(false)
    }

    const handleAddBatch = (batchData: Omit<Batch, "id" | "sold">) => {
        if (!event) return

        const newBatch: Batch = {
            ...batchData,
            id: `b${Date.now()}`,
            sold: 0,
        }

        const updatedEvent = {
            ...event,
            batches: [...event.batches, newBatch],
        }

        setEvent(updatedEvent)

        const sectorName = event.sectors.find((s) => s.id === batchData.sectorId)?.name || "desconhecido"

        toast({
            title: "Lote adicionado com sucesso!",
            description: `O lote "${batchData.name}" foi adicionado ao setor "${sectorName}".`,
        })

        setIsBatchFormOpen(false)
    }

    const handleDeleteSector = (sectorId: string) => {
        if (!event) return

        // Verificar se existem lotes associados a este setor
        const hasAssociatedBatches = event.batches.some((batch) => batch.sectorId === sectorId)

        if (hasAssociatedBatches) {
            toast({
                title: "Não é possível excluir o setor",
                description: "Este setor possui lotes associados. Remova os lotes primeiro.",
                variant: "destructive",
            })
            return
        }

        const updatedEvent = {
            ...event,
            sectors: event.sectors.filter((sector) => sector.id !== sectorId),
        }

        setEvent(updatedEvent)

        toast({
            title: "Setor excluído",
            description: "O setor foi excluído com sucesso.",
        })
    }

    const handleDeleteBatch = (batchId: string) => {
        if (!event) return

        const updatedEvent = {
            ...event,
            batches: event.batches.filter((batch) => batch.id !== batchId),
        }

        setEvent(updatedEvent)

        toast({
            title: "Lote excluído",
            description: "O lote foi excluído com sucesso.",
        })
    }

    const handleToggleBatchStatus = (batchId: string) => {
        if (!event) return

        const updatedEvent = {
            ...event,
            batches: event.batches.map((batch) => {
                if (batch.id === batchId) {
                    return {
                        ...batch,
                        active: !batch.active,
                    }
                }
                return batch
            }),
        }

        setEvent(updatedEvent)

        const batch = event.batches.find((b) => b.id === batchId)
        if (batch) {
            const newStatus = !batch.active
            toast({
                title: `Lote ${newStatus ? "ativado" : "desativado"}`,
                description: `O lote "${batch.name}" foi ${newStatus ? "ativado" : "desativado"}.`,
            })
        }
    }

    const toggleSectorExpanded = (sectorId: string) => {
        setExpandedSectors((prev) => ({
            ...prev,
            [sectorId]: !prev[sectorId],
        }))
    }

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

    // Formatar valor monetário
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value)
    }

    // Agrupar lotes por setor
    const getBatchesBySector = (sectorId: string) => {
        if (!event) return []
        return event.batches.filter((batch) => batch.sectorId === sectorId)
    }


    // Calcular estatísticas do setor
    const getSectorStats = (sectorId: string) => {
        if (!event) return { totalSold: 0, totalRevenue: 0, totalCapacity: 0 }

        const batches = getBatchesBySector(sectorId)
        const totalSold = batches.reduce((sum, batch) => sum + batch.sold, 0)
        const totalRevenue = batches.reduce((sum, batch) => sum + batch.sold * batch.price, 0)
        const totalCapacity = batches.reduce((sum, batch) => sum + batch.quantity, 0)

        return { totalSold, totalRevenue, totalCapacity }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#400041] border-t-transparent"></div>
            </div>
        )
    }

    if (!event) {
        return (
            <div className="text-center py-8">
                <h2 className="text-xl font-semibold">Evento não encontrado</h2>
                <p className="text-muted-foreground mt-2">O evento que você está procurando não existe ou foi removido.</p>
                <Button className="mt-4" onClick={() => window.history.back()}>
                    Voltar
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight">{event.title}</h1>
                    {renderEventStatus(event.status)}
                </div>

            </div>

            <Tabs defaultValue="dashboard">
                <TabsList className="mb-4">
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="info">Informações</TabsTrigger>
                    <TabsTrigger value="lotes">Ingressos</TabsTrigger>
                    <TabsTrigger value="vendas">Vendas</TabsTrigger>
                    <TabsTrigger value="participantes">Participantes</TabsTrigger>
                </TabsList>

                {/* Dashboard Tab */}
                <TabsContent value="dashboard">
                    <div className="space-y-6">
                        {/* Resumo geral */}
                        <Card className="bg-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Resumo de Vendas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total de Ingressos</p>
                                        <h3 className="text-2xl font-bold mt-1">{event.stats.totalSold} vendidos</h3>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                                        <h3 className="text-2xl font-bold mt-1">{formatCurrency(event.stats.totalRevenue)}</h3>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Ticket Médio</p>
                                        <h3 className="text-2xl font-bold mt-1">{formatCurrency(event.stats.ticketMedium)}</h3>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Check-ins</p>
                                        <h3 className="text-2xl font-bold mt-1">
                                            {event.stats.checkins} / {event.stats.totalSold}
                                        </h3>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Vendas por Setor */}
                        <Card className="bg-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Vendas por Setor</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {event.sectors.map((sector) => {
                                        const sectorBatches = getBatchesBySector(sector.id)
                                        const stats = getSectorStats(sector.id)

                                        return (
                                            <div key={sector.id} className="space-y-2">
                                                {/* Cabeçalho do setor */}
                                                <div className="grid grid-cols-3 text-center border-b pb-2">
                                                    <div className="font-semibold text-lg text-[#400041]">{sector.name}</div>
                                                    <div className="text-base font-semibold">{stats.totalSold} ingressos</div>
                                                    <div className="text-base font-semibold">{formatCurrency(stats.totalRevenue)}</div>
                                                </div>

                                                {/* Lotes do setor */}
                                                <div className="space-y-1">
                                                    {sectorBatches.map((batch) => {
                                                        const batchTotal = batch.sold * batch.price;
                                                        return (
                                                            <div key={batch.id} className="grid grid-cols-3 text-center py-1 text-sm">
                                                                <div className="font-medium text-gray-600">{batch.name}</div>
                                                                <div className="text-gray-500">
                                                                    {batch.sold} x {formatCurrency(batch.price)}
                                                                </div>
                                                                <div className="text-gray-600">{formatCurrency(batchTotal)}</div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                        )
                                    })}
                                    <div className="grid grid-cols-3 text-center border-t pt-3 mt-4 font-semibold text-base">
                                        <div className="text-[#400041]">Total</div>
                                        <div>{event.stats.totalSold} ingressos</div>
                                        <div>{formatCurrency(event.stats.totalRevenue)}</div>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>

                        {/* Gráfico de vendas por dia */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Vendas por Dia</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded-md">
                                    <p className="text-muted-foreground">Gráfico de vendas por dia</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Info Tab */}
                <TabsContent value="info">
                    <Card className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3">
                                <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
                            </div>
                            <div className="md:w-2/3 p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center text-muted-foreground mb-1">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            <span>Data e Hora</span>
                                        </div>
                                        <p className="font-medium">
                                            {format(new Date(event.date), "PPP", { locale: ptBR })} às {event.time}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center text-muted-foreground mb-1">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            <span>Local</span>
                                        </div>
                                        <p className="font-medium">{event.venueName}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center text-muted-foreground mb-1">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            <span>Endereço</span>
                                        </div>
                                        <p className="font-medium">{event.address}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center text-muted-foreground mb-1">
                                            <Tag className="mr-2 h-4 w-4" />
                                            <span>Categoria</span>
                                        </div>
                                        <p className="font-medium">{event.category}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center text-muted-foreground mb-1">
                                            <Users className="mr-2 h-4 w-4" />
                                            <span>Classificação</span>
                                        </div>
                                        <p className="font-medium">{event.ageRating}</p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex items-center text-muted-foreground mb-1">
                                        <Clock className="mr-2 h-4 w-4" />
                                        <span>Sobre</span>
                                    </div>
                                    <p className="text-sm">{event.about}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                {/* Setores e Lotes Tab */}
                <TabsContent value="lotes">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Setores e Lotes</h3>
                            <div className="flex gap-2">
                                <Button className="bg-[#400041] hover:bg-[#5a105b]" onClick={() => setIsSectorFormOpen(true)}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Adicionar Setor
                                </Button>

                            </div>
                        </div>

                        {event.sectors.length === 0 ? (
                            <Card className="p-6">
                                <div className="text-center py-8 text-muted-foreground">
                                    Nenhum setor cadastrado. Clique em "Adicionar Setor" para criar um novo setor.
                                </div>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {event.sectors.map((sector) => {
                                    const sectorBatches = getBatchesBySector(sector.id)
                                    const stats = getSectorStats(sector.id)
                                    const isExpanded = expandedSectors[sector.id]

                                    return (
                                        <Card key={sector.id} className="overflow-hidden">
                                            <Collapsible open={isExpanded} onOpenChange={() => toggleSectorExpanded(sector.id)}>
                                                <div className="p-4 flex items-center justify-between bg-gray-50 border-b">
                                                    <div className="flex items-center gap-2">
                                                        <CollapsibleTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="p-1">
                                                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                                            </Button>
                                                        </CollapsibleTrigger>
                                                        <div>
                                                            <h4 className="font-medium text-lg">{sector.name}</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                Capacidade: {sector.capacity} • Vendidos: {stats.totalSold} • Receita:{" "}
                                                                {formatCurrency(stats.totalRevenue)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="outline" onClick={() => setIsBatchFormOpen(true)}>
                                                            <PlusCircle className="mr-1 h-4 w-4" />
                                                            Lote
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() => handleDeleteSector(sector.id)}
                                                            disabled={sectorBatches.length > 0}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>

                                                <CollapsibleContent>
                                                    <div className="p-4">
                                                        {sector.description && (
                                                            <p className="text-sm text-muted-foreground mb-4">{sector.description}</p>
                                                        )}

                                                        {sectorBatches.length === 0 ? (
                                                            <div className="text-center py-4 text-muted-foreground">
                                                                Nenhum lote cadastrado para este setor.
                                                            </div>
                                                        ) : (
                                                            <div className="space-y-3">
                                                                {sectorBatches.map((batch) => (
                                                                    <div
                                                                        key={batch.id}
                                                                        className="flex items-center justify-between p-3 border rounded-md"
                                                                    >
                                                                        <div>
                                                                            <div className="flex items-center">
                                                                                <span className="font-medium">{batch.name}</span>
                                                                                <span
                                                                                    className={`ml-2 text-xs px-2 py-0.5 rounded-full ${batch.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                                                        }`}
                                                                                >
                                                                                    {batch.active ? "Ativo" : "Inativo"}
                                                                                </span>
                                                                            </div>
                                                                            <div className="text-sm text-gray-500">
                                                                                {formatCurrency(batch.price)} • {batch.sold}/{batch.quantity} ingressos vendidos
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex space-x-2">
                                                                            <Button
                                                                                size="sm"
                                                                                variant={batch.active ? "default" : "outline"}
                                                                                onClick={() => handleToggleBatchStatus(batch.id)}
                                                                            >
                                                                                {batch.active ? "Desativar" : "Ativar"}
                                                                            </Button>
                                                                            <Button
                                                                                size="sm"
                                                                                variant="outline"
                                                                                className="text-red-500 hover:text-red-700"
                                                                                onClick={() => handleDeleteBatch(batch.id)}
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        </Card>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="vendas">
                    <Card className="p-6">
                        <div className="text-center py-8">
                            <h3 className="text-lg font-semibold mb-2">Vendas</h3>
                            <p className="text-muted-foreground">Informações detalhadas sobre vendas estarão disponíveis aqui.</p>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="participantes">
                    <Card className="p-6">
                        <div className="text-center py-8">
                            <h3 className="text-lg font-semibold mb-2">Participantes</h3>
                            <p className="text-muted-foreground">Informações sobre participantes estarão disponíveis aqui.</p>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Formulários em modais */}
            <EventCreationForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleEditEvent}
                initialData={event}
            />

            <SectorManagementForm
                isOpen={isSectorFormOpen}
                onClose={() => setIsSectorFormOpen(false)}
                onSubmit={handleAddSector}
                eventName={event.title}
            />

            <BatchManagementForm
                isOpen={isBatchFormOpen}
                onClose={() => setIsBatchFormOpen(false)}
                onSubmit={handleAddBatch}
                eventName={event.title}
                sectors={event.sectors}
            />
        </div>
    )
}
