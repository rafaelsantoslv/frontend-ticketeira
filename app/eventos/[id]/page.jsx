"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PublicHeader } from "@/components/public/PublicHeader"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BatchSelection } from "@/components/eventos/EventBatchSelection"
import { TicketSummary } from "@/components/eventos/TicketSummary"
import { mockEvents, mockSectors, mockBatches } from "@/lib/mock-data"
import { TicketSelectionProvider } from "@/contexts/TicketSelection"
import Link from "next/link"

export default function EventDetailsPage() {
    const { id } = useParams()
    const [event, setEvent] = useState(null)
    const [sectors, setSectors] = useState([])
    const [batches, setBatches] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchEventDetails = async () => {
            setIsLoading(true)
            try {
                // Simular delay da API
                await new Promise((resolve) => setTimeout(resolve, 500))

                // Buscar evento dos dados mockados
                const foundEvent = mockEvents.find((e) => e.id === id)
                if (!foundEvent) {
                    throw new Error("Evento não encontrado")
                }

                // Buscar setores do evento
                const eventSectors = mockSectors.filter((s) => s.eventId === id)

                // Buscar lotes do evento
                const eventBatches = mockBatches.filter((b) => b.eventId === id)

                setEvent(foundEvent)
                setSectors(eventSectors)
                setBatches(eventBatches)
            } catch (error) {
                console.error("Error fetching event details:", error)
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }

        if (id) {
            fetchEventDetails()
        }
    }, [id])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <PublicHeader showSearch={false} />
                <div className="container mx-auto px-4 py-16 flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-64 bg-gray-300 rounded mb-8"></div>
                        <div className="h-64 w-full max-w-3xl bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <PublicHeader showSearch={false} />
                <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Evento não encontrado</h2>
                    <p className="text-gray-600 mb-8">O evento que você está procurando não existe ou foi removido.</p>
                    <Button asChild>
                        <Link href="/eventos">Voltar para Eventos</Link>
                    </Button>
                </div>
            </div>
        )
    }

    // Agrupar lotes por setor
    const getBatchesBySector = (sectorId) => {
        return batches.filter((batch) => batch.sectorId === sectorId)
    }

    return (
        <TicketSelectionProvider>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                <PublicHeader showSearch={false} />

                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                        <Link href="/eventos" className="hover:text-blue-600">
                            Eventos
                        </Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <span className="text-gray-800 font-medium">{event.title}</span>
                    </div>

                    {/* Event Header */}
                    <div className="relative rounded-xl overflow-hidden mb-8">
                        <div className="h-64 md:h-80 w-full">
                            <img
                                src={event.bannerImage || "/placeholder.svg?height=300&width=1200"}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded">
                                    {event.category}
                                </span>
                                {event.ageRating && (
                                    <span className="bg-gray-700 text-white text-xs font-medium px-2.5 py-0.5 rounded">
                                        {event.ageRating}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>{format(new Date(event.startDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>{format(new Date(event.startDate), "HH:mm", { locale: ptBR })}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>
                                        {event.locationName}, {event.locationCity}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Event Details */}
                        <div className="lg:col-span-2">
                            <Tabs defaultValue="ingressos" className="w-full">
                                <TabsList className="mb-6">
                                    <TabsTrigger value="ingressos">Ingressos</TabsTrigger>
                                    <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
                                    <TabsTrigger value="local">Local</TabsTrigger>
                                </TabsList>

                                <TabsContent value="ingressos" className="space-y-6">
                                    <div className="bg-white rounded-xl p-6 shadow-sm">
                                        <h2 className="text-xl font-bold mb-4">Selecione seus ingressos</h2>

                                        {sectors.length === 0 ? (
                                            <p className="text-gray-500">Não há ingressos disponíveis para este evento.</p>
                                        ) : (
                                            <div className="space-y-8">
                                                {sectors.map((sector) => (
                                                    <div key={sector.id} className="space-y-4">
                                                        <h3 className="text-lg font-medium">{sector.name}</h3>
                                                        {sector.description && <p className="text-sm text-gray-600">{sector.description}</p>}

                                                        <div className="space-y-3">
                                                            {getBatchesBySector(sector.id).map((batch) => (
                                                                <BatchSelection key={batch.id} batch={batch} sector={sector} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="detalhes">
                                    <div className="bg-white rounded-xl p-6 shadow-sm">
                                        <h2 className="text-xl font-bold mb-4">Sobre o evento</h2>
                                        <div className="prose max-w-none">
                                            <p className="text-gray-700">{event.description}</p>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="local">
                                    <div className="bg-white rounded-xl p-6 shadow-sm">
                                        <h2 className="text-xl font-bold mb-4">Local do evento</h2>
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="font-medium">{event.locationName}</h3>
                                                <p className="text-gray-600">
                                                    {event.locationAddress}, {event.locationCity} - {event.locationState}
                                                </p>
                                            </div>

                                            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                                                <img
                                                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
                                                        `${event.locationAddress}, ${event.locationCity}`,
                                                    )}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${encodeURIComponent(
                                                        `${event.locationAddress}, ${event.locationCity}`,
                                                    )}&key=YOUR_API_KEY`}
                                                    alt="Mapa do local"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <TicketSummary />
                        </div>
                    </div>
                </div>
            </div>
        </TicketSelectionProvider>
    )
}
