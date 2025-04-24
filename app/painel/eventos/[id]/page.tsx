"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2, Edit, Calendar, MapPin, Clock, Users, Tag } from "lucide-react"
import EventCreationForm from "@/components/event-creation-form"
import { toast } from "@/components/ui/use-toast"
import BatchManagementForm from "@/components/batch-management-form"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define event and batch types
export type Batch = {
    id: string
    name: string
    quantity: number
    price: number
    active: boolean
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
    batches: Batch[]
}

export default function EventoDetalhesPage() {
    const params = useParams()
    const eventId = params.id as string

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isBatchFormOpen, setIsBatchFormOpen] = useState(false)
    const [event, setEvent] = useState<Event | null>(null)
    const [isLoading, setIsLoading] = useState(true)

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
                batches: [
                    {
                        id: "1",
                        name: "Lote 1",
                        quantity: 100,
                        price: 50,
                        active: false,
                    },
                    {
                        id: "2",
                        name: "Lote 2",
                        quantity: 150,
                        price: 70,
                        active: true,
                    },
                    {
                        id: "3",
                        name: "Lote VIP",
                        quantity: 50,
                        price: 120,
                        active: true,
                    },
                ],
            }

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

    const handleAddBatch = (batch: Omit<Batch, "id">) => {
        if (!event) return

        const newBatch: Batch = {
            ...batch,
            id: Date.now().toString(),
        }

        setEvent({
            ...event,
            batches: [...event.batches, newBatch],
        })

        toast({
            title: "Lote adicionado com sucesso!",
            description: `O lote "${batch.name}" foi adicionado ao evento.`,
        })

        setIsBatchFormOpen(false)
    }

    const handleDeleteBatch = (batchId: string) => {
        if (!event) return

        setEvent({
            ...event,
            batches: event.batches.filter((batch) => batch.id !== batchId),
        })

        toast({
            title: "Lote excluído",
            description: "O lote foi excluído com sucesso.",
        })
    }

    const handleToggleBatchStatus = (batchId: string) => {
        if (!event) return

        setEvent({
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
        })

        const batch = event.batches.find((b) => b.id === batchId)
        if (batch) {
            const newStatus = !batch.active
            toast({
                title: `Lote ${newStatus ? "ativado" : "desativado"}`,
                description: `O lote "${batch.name}" foi ${newStatus ? "ativado" : "desativado"}.`,
            })
        }
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
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{event.title}</h1>
                    <p className="text-muted-foreground">Gerencie as informações e lotes deste evento</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsFormOpen(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Evento
                    </Button>
                    <Button className="bg-[#400041] hover:bg-[#5a105b]" onClick={() => setIsBatchFormOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar Lote
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="info">
                <TabsList className="mb-4">
                    <TabsTrigger value="info">Informações</TabsTrigger>
                    <TabsTrigger value="lotes">Lotes</TabsTrigger>
                    <TabsTrigger value="vendas">Vendas</TabsTrigger>
                    <TabsTrigger value="participantes">Participantes</TabsTrigger>
                </TabsList>

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

                <TabsContent value="lotes">
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Lotes</h3>
                            <Button className="bg-[#400041] hover:bg-[#5a105b]" onClick={() => setIsBatchFormOpen(true)}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Adicionar Lote
                            </Button>
                        </div>

                        {event.batches.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                Nenhum lote cadastrado. Clique em "Adicionar Lote" para criar um novo lote.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {event.batches.map((batch) => (
                                    <div key={batch.id} className="flex items-center justify-between p-4 border rounded-md">
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
                                                R$ {batch.price.toFixed(2)} • {batch.quantity} ingressos
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
                    </Card>
                </TabsContent>

                <TabsContent value="vendas">
                    <Card className="p-6">
                        <div className="text-center py-8">
                            <h3 className="text-lg font-semibold mb-2">Vendas</h3>
                            <p className="text-muted-foreground">Informações sobre vendas estarão disponíveis aqui.</p>
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

            <BatchManagementForm
                isOpen={isBatchFormOpen}
                onClose={() => setIsBatchFormOpen(false)}
                onSubmit={handleAddBatch}
                eventName={event.title}
            />
        </div>
    )
}
