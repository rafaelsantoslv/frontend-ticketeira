"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import EventCreationForm from "@/components/event-creation-form"
import BatchManagementForm from "@/components/batch-management-form"

// Tipo para os eventos
type Event = {
  id: string
  title: string
  date: string
  time: string
  location: string
  address: string
  category: string
  ageRating: string
  about: string
  image: string
}

// Tipo para os lotes
type Batch = {
  id: string
  name: string
  price: number
  startDate: string
  endDate: string
  quantity: number
  isActive: boolean
}

export default function InformacoesPage() {
  // Estado para armazenar os eventos
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "LA VIE GLOW PARTY - INAUGURAÇÃO",
      date: "15/06/2023",
      time: "22:00",
      location: "Club XYZ",
      address: "Rua das Flores, 123 - Blumenau, SC",
      category: "Festa",
      ageRating: "18+",
      about: "Festa de inauguração com muita música eletrônica e efeitos visuais incríveis.",
      image: "/placeholder.svg?height=200&width=400",
    },
  ])

  // Estado para armazenar os lotes
  const [batches, setBatches] = useState<Batch[]>([
    {
      id: "1",
      name: "Lote 1",
      price: 50,
      startDate: "01/05/2023",
      endDate: "31/05/2023",
      quantity: 100,
      isActive: false,
    },
    {
      id: "2",
      name: "Lote 2",
      price: 70,
      startDate: "01/06/2023",
      endDate: "14/06/2023",
      quantity: 150,
      isActive: true,
    },
  ])

  // Estado para controlar o diálogo de criação de evento
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)

  // Estado para controlar o diálogo de gerenciamento de lotes
  const [isBatchDialogOpen, setIsBatchDialogOpen] = useState(false)

  // Função para adicionar um novo evento
  const handleAddEvent = (eventData: Omit<Event, "id">) => {
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
    }
    setEvents([...events, newEvent])
    setIsEventDialogOpen(false)
  }

  // Função para adicionar um novo lote
  const handleAddBatch = (batchData: Omit<Batch, "id">) => {
    const newBatch = {
      ...batchData,
      id: Date.now().toString(),
    }
    setBatches([...batches, newBatch])
    setIsBatchDialogOpen(false)
  }

  // Função para alternar o status de um lote
  const toggleBatchStatus = (id: string) => {
    setBatches(batches.map((batch) => (batch.id === id ? { ...batch, isActive: !batch.isActive } : batch)))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Informações do Evento</h1>
          <p className="text-muted-foreground">Gerencie as informações do seu evento</p>
        </div>
        <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#400041] hover:bg-[#5a105b]">
              <PlusCircle className="mr-2 h-4 w-4" />
              Criar Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Evento</DialogTitle>
              <DialogDescription>Preencha os detalhes do seu evento abaixo.</DialogDescription>
            </DialogHeader>
            <EventCreationForm onSubmit={handleAddEvent} onCancel={() => setIsEventDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {events.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">Nenhum evento cadastrado. Clique em "Criar Evento" para começar.</p>
          </CardContent>
        </Card>
      ) : (
        events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
              </div>
              <div className="md:w-2/3 p-6">
                <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Data e Hora</p>
                    <p>
                      {event.date} às {event.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Local</p>
                    <p>{event.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Endereço</p>
                    <p>{event.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Categoria</p>
                    <p>{event.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Classificação</p>
                    <p>{event.ageRating}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Sobre</p>
                  <p className="text-sm">{event.about}</p>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Lotes</h3>
                  <Dialog open={isBatchDialogOpen} onOpenChange={setIsBatchDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-[#400041] hover:bg-[#5a105b]">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar Lote
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Lote</DialogTitle>
                        <DialogDescription>Preencha as informações do lote abaixo.</DialogDescription>
                      </DialogHeader>
                      <BatchManagementForm onSubmit={handleAddBatch} onCancel={() => setIsBatchDialogOpen(false)} />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mt-4 space-y-2">
                  {batches.length === 0 ? (
                    <p className="text-sm text-gray-500">Nenhum lote cadastrado.</p>
                  ) : (
                    batches.map((batch) => (
                      <div key={batch.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">{batch.name}</span>
                            <span
                              className={`ml-2 text-xs px-2 py-0.5 rounded-full ${batch.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                            >
                              {batch.isActive ? "Ativo" : "Inativo"}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            R$ {batch.price.toFixed(2)} • {batch.quantity} ingressos • {batch.startDate} até{" "}
                            {batch.endDate}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant={batch.isActive ? "default" : "outline"}
                            onClick={() => toggleBatchStatus(batch.id)}
                          >
                            {batch.isActive ? "Desativar" : "Ativar"}
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
