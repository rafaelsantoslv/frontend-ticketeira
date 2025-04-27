"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    PlusCircle,
    Trash2,
    Calendar,
    MapPin,
    Clock,
    Users,
    Tag,
    ArrowUpRight,
    ChevronDown,
    ChevronUp,
    Edit,
    Ticket,
    DollarSign,
    TicketMinusIcon,
    Check,
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
import CouponForm from "@/components/coupon-form"
import CourtesyForm from "@/components/courtesy-form"
import { StatCard } from "@/components/stat-card"

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
export type Coupon = {
    id: string
    code: string
    discountType: "percentage" | "fixed"
    discountValue: number
    unlimited: boolean
    usageLimit?: number
    usageCount: number
    active: boolean
    createdAt: Date
}

export type Courtesy = {
    id: string
    firstName: string
    lastName: string
    email: string
    sectorId: string
    ticketCode: string
    createdAt: Date
    sent: boolean
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

    // Adicionar os novos estados e funções para gerenciar cupons e cortesias
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const [courtesies, setCourtesies] = useState<Courtesy[]>([])
    const [isSubmittingCourtesy, setIsSubmittingCourtesy] = useState(false)

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
    const handleCreateCoupon = (data: any) => {
        const newCoupon: Coupon = {
            id: `c${Date.now()}`,
            code: data.code,
            discountType: data.discountType,
            discountValue: data.discountValue,
            unlimited: data.unlimited,
            usageLimit: data.usageLimit,
            usageCount: 0,
            active: data.active,
            createdAt: new Date(),
        }

        setCoupons([...coupons, newCoupon])

        toast({
            title: "Cupom criado com sucesso!",
            description: `O cupom "${data.code}" foi criado.`,
        })
    }

    // Adicionar função para criar cortesia
    const handleCreateCourtesy = (data: any) => {
        setIsSubmittingCourtesy(true)

        // Simular uma chamada de API
        setTimeout(() => {
            const ticketCode = "CORT-" + Math.random().toString(36).substring(2, 10).toUpperCase()

            const newCourtesy: Courtesy = {
                id: `ct${Date.now()}`,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                sectorId: data.sectorId,
                ticketCode,
                createdAt: new Date(),
                sent: false,
            }

            setCourtesies([...courtesies, newCourtesy])

            toast({
                title: "Cortesia gerada com sucesso!",
                description: `A cortesia para ${data.firstName} ${data.lastName} foi gerada e será enviada para ${data.email}.`,
            })

            setIsSubmittingCourtesy(false)
        }, 1500)
    }

    // Adicionar função para deletar cupom
    const handleDeleteCoupon = (couponId: string) => {
        setCoupons(coupons.filter((coupon) => coupon.id !== couponId))

        toast({
            title: "Cupom excluído",
            description: "O cupom foi excluído com sucesso.",
        })
    }

    // Adicionar função para reenviar cortesia
    const handleResendCourtesy = (courtesyId: string) => {
        setCourtesies(
            courtesies.map((courtesy) => {
                if (courtesy.id === courtesyId) {
                    return { ...courtesy, sent: true }
                }
                return courtesy
            }),
        )

        toast({
            title: "Cortesia reenviada",
            description: "A cortesia foi reenviada com sucesso.",
        })
    }

    // Adicionar função para deletar cortesia
    const handleDeleteCourtesy = (courtesyId: string) => {
        setCourtesies(courtesies.filter((courtesy) => courtesy.id !== courtesyId))

        toast({
            title: "Cortesia excluída",
            description: "A cortesia foi excluída com sucesso.",
        })
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
                    <TabsTrigger value="lotes">Setores e Lotes</TabsTrigger>
                    <TabsTrigger value="cupons">Cupons</TabsTrigger>
                    <TabsTrigger value="cortesias">Cortesias</TabsTrigger>
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
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                <StatCard title="Total de Ingressos" icon={<Ticket className="h-4 w-4 text-muted-foreground" />} value={event.stats.totalSold} description="Vendidos" />
                                <StatCard title="Ticket Médio" icon={<TicketMinusIcon className="h-4 w-4 text-muted-foreground" />} value={formatCurrency(event.stats.ticketMedium)} />
                                <StatCard title="Check-ins" icon={<Check className="h-4 w-4 text-muted-foreground" />} value={`${event.stats.checkins} / ${event.stats.totalSold}`}
                                    description="Validados" />
                                <StatCard title="Valor Total" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value={formatCurrency(event.stats.totalRevenue)} description="Arrecadado" />
                            </div>


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
                                                <div className="grid grid-cols-3 border-b pb-2">
                                                    <div className="font-semibold text-lg text-[#400041] text-left pl-4">{sector.name}</div>
                                                    <div className="text-base font-semibold text-left pl-4">{stats.totalSold} ingressos</div>
                                                    <div className="text-base font-semibold text-left pl-4">{formatCurrency(stats.totalRevenue)}</div>
                                                </div>

                                                {/* Lotes do setor */}
                                                <div className="space-y-1">
                                                    {sectorBatches.map((batch) => {
                                                        const batchTotal = batch.sold * batch.price;
                                                        return (
                                                            <div key={batch.id} className="grid grid-cols-3 py-1 text-sm">
                                                                <div className="font-medium text-gray-600 text-left pl-4">{batch.name}</div>
                                                                <div className="text-gray-500 text-left pl-4">
                                                                    {batch.sold} x {formatCurrency(batch.price)}
                                                                </div>
                                                                <div className="text-gray-600 text-left pl-4">{formatCurrency(batchTotal)}</div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div className="grid grid-cols-3 border-t pt-3 mt-4 font-semibold text-base">
                                        <div className="text-[#400041] text-left pl-4">Total</div>
                                        <div className="text-left pl-4">{event.stats.totalSold} ingressos</div>
                                        <div className="text-left pl-4">{formatCurrency(event.stats.totalRevenue)}</div>
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
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Vendas Recentes</CardTitle>
                                    <Button variant="ghost" size="sm" className="text-[#400041]">
                                        Ver todas
                                        <ArrowUpRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center justify-between border-b pb-3">
                                            <div>
                                                <p className="font-medium">Comprador {i}</p>
                                                <p className="text-sm text-muted-foreground">comprador{i}@email.com</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">{formatCurrency(70 * i)}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {format(new Date(2023, 5, 10 + i), "dd/MM/yyyy HH:mm")}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Info Tab */}
                <TabsContent value="info">
                    <Card className="overflow-hidden p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Lotes</h3>
                            <Button className="bg-[#400041] hover:bg-[#5a105b]" onClick={() => setIsFormOpen(true)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar Evento
                            </Button>
                        </div>
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
                                    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: event.about }} />
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

                {/* Cupons de desconto */}
                <TabsContent value="cupons">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Cupons de Desconto</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="p-6">
                                <CardHeader className="px-0 pt-0">
                                    <CardTitle className="text-lg">Criar Novo Cupom</CardTitle>
                                </CardHeader>
                                <CardContent className="px-0 pb-0">
                                    <CouponForm onSubmit={handleCreateCoupon} />
                                </CardContent>
                            </Card>

                            <Card className="p-6">
                                <CardHeader className="px-0 pt-0">
                                    <CardTitle className="text-lg">Cupons Ativos</CardTitle>
                                </CardHeader>
                                <CardContent className="px-0 pb-0">
                                    {coupons.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">
                                            Nenhum cupom cadastrado. Crie um novo cupom ao lado.
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {coupons.map((coupon) => (
                                                <div key={coupon.id} className="flex items-center justify-between p-3 border rounded-md">
                                                    <div>
                                                        <div className="flex items-center">
                                                            <span className="font-medium">{coupon.code}</span>
                                                            <span
                                                                className={`ml-2 text-xs px-2 py-0.5 rounded-full ${coupon.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                                    }`}
                                                            >
                                                                {coupon.active ? "Ativo" : "Inativo"}
                                                            </span>
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {coupon.discountType === "percentage"
                                                                ? `${coupon.discountValue}% de desconto`
                                                                : `${formatCurrency(coupon.discountValue)} de desconto`}
                                                            {coupon.unlimited
                                                                ? " • Uso ilimitado"
                                                                : ` • ${coupon.usageCount}/${coupon.usageLimit} usos`}
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() => handleDeleteCoupon(coupon.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Cortesias */}
                <TabsContent value="cortesias">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Ingressos Cortesia</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="p-6">
                                <CardHeader className="px-0 pt-0">
                                    <CardTitle className="text-lg">Gerar Nova Cortesia</CardTitle>
                                </CardHeader>
                                <CardContent className="px-0 pb-0">
                                    <CourtesyForm
                                        onSubmit={handleCreateCourtesy}
                                        sectors={event.sectors}
                                        isSubmitting={isSubmittingCourtesy}
                                    />
                                </CardContent>
                            </Card>

                            <Card className="p-6">
                                <CardHeader className="px-0 pt-0">
                                    <CardTitle className="text-lg">Cortesias Geradas</CardTitle>
                                </CardHeader>
                                <CardContent className="px-0 pb-0">
                                    {courtesies.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">
                                            Nenhuma cortesia gerada. Crie uma nova cortesia ao lado.
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {courtesies.map((courtesy) => {
                                                const sector = event.sectors.find((s) => s.id === courtesy.sectorId)

                                                return (
                                                    <div key={courtesy.id} className="flex items-center justify-between p-3 border rounded-md">
                                                        <div>
                                                            <div className="flex items-center">
                                                                <span className="font-medium">
                                                                    {courtesy.firstName} {courtesy.lastName}
                                                                </span>
                                                                <span
                                                                    className={`ml-2 text-xs px-2 py-0.5 rounded-full ${courtesy.sent ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                                                        }`}
                                                                >
                                                                    {courtesy.sent ? "Enviado" : "Pendente"}
                                                                </span>
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {courtesy.email} • {sector?.name || "Setor desconhecido"}
                                                            </div>
                                                            <div className="text-xs text-gray-400 mt-1">Código: {courtesy.ticketCode}</div>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            {!courtesy.sent && (
                                                                <Button size="sm" variant="outline" onClick={() => handleResendCourtesy(courtesy.id)}>
                                                                    Enviar
                                                                </Button>
                                                            )}
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="text-red-500 hover:text-red-700"
                                                                onClick={() => handleDeleteCourtesy(courtesy.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Vendas */}
                <TabsContent value="vendas">
                    <Card className="p-6">
                        <div className="text-center py-8">
                            <h3 className="text-lg font-semibold mb-2">Vendas</h3>
                            <p className="text-muted-foreground">Informações detalhadas sobre vendas estarão disponíveis aqui.</p>
                        </div>
                    </Card>
                </TabsContent>
                {/* Participantes */}
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
