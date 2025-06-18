"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Card } from "@/components/ui/card"

import { CreateEventDialog } from "@/components/eventos/EventCreateDialog"

export default function NovoEventoPage() {
    const router = useRouter()
    const [isFormOpen, setIsFormOpen] = useState(true)

    const handleCancel = () => {
        setIsFormOpen(false)
        router.push("/painel/eventos")
    }

    return (
        <div className="space-y-6">
            <Card className="p-6">
                <CreateEventDialog isOpen={isFormOpen} onClose={handleCancel} />
            </Card>
        </div>
    )
}
