"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

// Importar o formulário de criação de evento
import EventCreationForm from "@/components/eventos/EventCreationFormProps"

export default function NovoEventoPage() {
    const router = useRouter()
    const [isFormOpen, setIsFormOpen] = useState(true)

    const handleCreateEvent = (data: any) => {
        // Em um cenário real, aqui você enviaria os dados para a API
        console.log("Dados do evento:", data)

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
                <Link href="/painel/eventos">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para Eventos
                    </Button>
                </Link>
            </div>

            <Card className="p-6">
                <EventCreationForm isOpen={isFormOpen} onClose={handleCancel} onSubmit={handleCreateEvent} />
            </Card>
        </div>
    )
}
