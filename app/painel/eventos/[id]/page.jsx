"use client"

import BatchManagementForm from "@/components/BatchManageForm"
import SectorManagementForm from "@/components/SectorManageForm"
import EventCreationForm from "@/components/eventos/EventCreationFormProps"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import {
    PlusCircle
} from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { EventDashboard } from "@/components/eventos/[id]/EventDashboard"
import { EventCardSector } from "@/components/eventos/[id]/EventCardSector"
import { EventInfo } from "@/components/eventos/[id]/EventInfo"
import { EventTabList } from "@/components/eventos/[id]/EventTabList"
import { EventCuponsDiscout } from "@/components/eventos/[id]/EventCuponsDiscount"
import { EventCheckin } from "@/components/eventos/[id]/EventCheckin"
import { EventCortesy } from "@/components/eventos/[id]/EventCortesy"
import { useEvent } from "@/hooks/useEvent"




}

export default function EventoDetalhesPage() {


    const params = useParams()
    const eventId = params.id 

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isBatchFormOpen, setIsBatchFormOpen] = useState(false)
    const [isSectorFormOpen, setIsSectorFormOpen] = useState(false)
    const [expandedSectors, setExpandedSectors] = useState({})

    // Adicionar os novos estados e funções para gerenciar cupons e cortesias
    const [coupons, setCoupons] = useState([])
    const [courtesies, setCourtesies] = useState([])
    const [isSubmittingCourtesy, setIsSubmittingCourtesy] = useState(false)


    const {
        getBatchesBySector,
        getSectorStats,
        event,
        setEvent,
        isLoading,
        setIsLoading
    } = useEvent()


    const handleEditEvent = (data) => {
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

    const handleAddSector = (sectorData) => {
        if (!event) return

        const newSector = {
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

    const handleAddBatch = (batchData) => {
        if (!event) return

        const newBatch = {
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

    const handleDeleteSector = (sectorId) => {
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

    const handleDeleteBatch = (batchId) => {
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

    const handleToggleBatchStatus = (batchId) => {
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

    const toggleSectorExpanded = (sectorId) => {
        setExpandedSectors((prev) => ({
            ...prev,
            [sectorId]: !prev[sectorId],
        }))
    }

    // Função para renderizar o status do evento
    const renderEventStatus = (status) => {
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

    const handleCreateCoupon = (data) => {
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
    const handleCreateCourtesy = (data) => {
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
    const handleDeleteCoupon = (couponId) => {
        setCoupons(coupons.filter((coupon) => coupon.id !== couponId))

        toast({
            title: "Cupom excluído",
            description: "O cupom foi excluído com sucesso.",
        })
    }

    // Adicionar função para reenviar cortesia
    const handleResendCourtesy = (courtesyId) => {
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
    const handleDeleteCourtesy = (courtesyId) => {
        setCourtesies(courtesies.filter((courtesy) => courtesy.id !== courtesyId))

        toast({
            title: "Cortesia excluída",
            description: "A cortesia foi excluída com sucesso.",
        })
    }

    if (isLoading) {
        return <LoadingSpinner />
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
                {/* Tab List*/}
                <EventTabList />

                {/* Dashboard Tab */}
                <EventDashboard getBatchesBySector={getBatchesBySector} getSectorStats={getSectorStats} event={event} />

                {/* Info Tab */}
                <EventInfo event={event} setIsFormOpen={setIsFormOpen} />

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
                                        <EventCardSector
                                            key={sector.id}
                                            sectorBatches={sectorBatches}
                                            setIsBatchFormOpen={setIsBatchFormOpen}
                                            handleDeleteSector={handleDeleteSector}
                                            sector={sector}
                                            isExpanded={isExpanded}
                                            stats={stats}
                                            handleToggleBatchStatus={handleToggleBatchStatus}
                                            handleDeleteBatch={handleDeleteBatch}
                                            toggleSectorExpanded={toggleSectorExpanded}
                                        />

                                    )
                                })}
                            </div>
                        )}
                    </div>

                </TabsContent>

                {/* Cupons de desconto */}
                <EventCuponsDiscout coupons={coupons} handleCreateCoupon={handleCreateCoupon} handleDeleteCoupon={handleDeleteCoupon} />

                {/* Cortesias */}
                <EventCortesy courtesies={courtesies} event={event} handleCreateCourtesy={handleCreateCourtesy} isSubmittingCourtesy={isSubmittingCourtesy} handleResendCourtesy={handleResendCourtesy} handleDeleteCourtesy={handleDeleteCourtesy} />

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

                {/* Check-ins */}
                <EventCheckin sampleCheckins={event?.checkins} />

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
