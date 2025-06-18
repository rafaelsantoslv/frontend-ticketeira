"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { toast } from "sonner"



import { EventTabList } from "@/modules/eventos/components/EventTabList"
import { EventDashboard } from "@/modules/eventos/components/EventDashboard"
import { EventInfo } from "@/modules/eventos/components/EventInfo"
import { EventCardSector } from "@/modules/eventos/components/EventCardSector"
import { EventCuponsDiscout } from "@/modules/eventos/components/EventCuponsDiscount"
import { EventCortesy } from "@/modules/eventos/components/EventCortesy"
import { EventCheckin } from "@/modules/eventos/components/EventCheckin"
import EventCreationForm from "@/modules/eventos/components/EventCreationFormProps"
import SectorManagementForm from "@/components/SectorManageForm"
import BatchManagementForm from "@/components/BatchManageForm"
import { useEventDetails } from "@/modules/eventos/hooks/useEventDetails"



export default function EventoDetalhesPage() {
    const { id } = useParams()
    const eventId = id as string

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isBatchFormOpen, setIsBatchFormOpen] = useState(false)
    const [isSectorFormOpen, setIsSectorFormOpen] = useState(false)

    const {
        event,
        isLoading,
        updateEvent,
        expandedSectors,
        toggleSectorExpanded,
        addSector,
        addBatch,
        deleteSector,
        deleteBatch,
        toggleBatchStatus,
        coupons,
        setCoupons,
        createCoupon,
        courtesies,
        setCourtesies,
        createCourtesy,
        isSubmittingCourtesy
    } = useEventDetails(eventId)

    const handleEditEvent = (data) => {
        updateEvent(data)
        toast.success("Evento atualizado com sucesso!")
        setIsFormOpen(false)
    }

    if (isLoading) return <LoadingSpinner />
    if (!event) return (
        <div className="text-center py-8">
            <h2 className="text-xl font-semibold">Evento não encontrado</h2>
            <p className="text-muted-foreground mt-2">Verifique se o link está correto.</p>
            <Button className="mt-4" onClick={() => window.history.back()}>Voltar</Button>
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{event.title}</h1>
                    <Badge>{event.status}</Badge>
                </div>
            </div>

            <Tabs defaultValue="dashboard">
                <EventTabList />
                <EventDashboard event={event} />
                <EventInfo event={event} setIsFormOpen={setIsFormOpen} />

                <TabsContent value="lotes">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Setores e Lotes</h3>
                            <Button onClick={() => setIsSectorFormOpen(true)} className="bg-[#400041] hover:bg-[#5a105b]">
                                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Setor
                            </Button>
                        </div>
                        {event.sectors.length === 0 ? (
                            <Card className="p-6 text-center text-muted-foreground">Nenhum setor cadastrado.</Card>
                        ) : (
                            event.sectors.map((sector) => (
                                <EventCardSector
                                    key={sector.id}
                                    sector={sector}
                                    isExpanded={expandedSectors[sector.id]}
                                    toggleSectorExpanded={toggleSectorExpanded}
                                    setIsBatchFormOpen={setIsBatchFormOpen}
                                    handleDeleteSector={deleteSector}
                                    handleDeleteBatch={deleteBatch}
                                    handleToggleBatchStatus={toggleBatchStatus}
                                />
                            ))
                        )}
                    </div>
                </TabsContent>

                <EventCuponsDiscout
                    coupons={coupons}
                    handleCreateCoupon={createCoupon}
                    handleDeleteCoupon={(id) => setCoupons(coupons.filter(c => c.id !== id))}
                />

                <EventCortesy
                    event={event}
                    courtesies={courtesies}
                    isSubmittingCourtesy={isSubmittingCourtesy}
                    handleCreateCourtesy={createCourtesy}
                    handleResendCourtesy={(id) => setCourtesies(courtesies.map(c => c.id === id ? { ...c, sent: true } : c))}
                    handleDeleteCourtesy={(id) => setCourtesies(courtesies.filter(c => c.id !== id))}
                />

                <TabsContent value="vendas">
                    <Card className="p-6 text-center text-muted-foreground">Informações sobre vendas em breve.</Card>
                </TabsContent>

                <TabsContent value="participantes">
                    <Card className="p-6 text-center text-muted-foreground">Informações sobre participantes em breve.</Card>
                </TabsContent>

                <EventCheckin sampleCheckins={event.checkins} />
            </Tabs>

            <EventCreationForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleEditEvent}
                initialData={event}
            />

            <SectorManagementForm
                isOpen={isSectorFormOpen}
                onClose={() => setIsSectorFormOpen(false)}
                onSubmit={addSector}
                eventName={event.title}
            />

            <BatchManagementForm
                isOpen={isBatchFormOpen}
                onClose={() => setIsBatchFormOpen(false)}
                onSubmit={addBatch}
                eventName={event.title}
                sectors={event.sectors}
            />
        </div>
    )
}
