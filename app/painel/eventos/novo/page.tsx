"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

import CreateEventDialog from "@/components/EventCreateDialog"

export default function NovoEventoPage() {
    const router = useRouter()
    const [isFormOpen, setIsFormOpen] = useState(true)

    const handleCreateEvent = (data: any) => {
        // Em um cenário real, aqui você enviaria os dados para a API

        // Simular criação bem-sucedida
        toast({
            title: "Evento criado com sucesso!",
            description: `O evento "${data.title}" foi criado.`,
        })

        // Redirecionar para a lista de eventos
        router.push("/painel/eventos")
    }

    const handleCancel = () => {
        setIsFormOpen(false)
        router.push("/painel/eventos")
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Criar Novo Evento</h1>
            </div>
            <Card className="p-6">
                <CreateEventDialog isOpen={isFormOpen} onClose={handleCancel} />
            </Card>
        </div>
    )
}
