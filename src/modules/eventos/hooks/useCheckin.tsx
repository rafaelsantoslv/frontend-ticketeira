// src/modules/eventos/hooks/useCheckins.ts
import { useState } from "react"
import type { Checkin } from "@/modules/eventos/types"
import { toast } from "@/hooks/useToast"
import { Badge } from "@/components/ui/badge"

export function useCheckins(initialCheckins: Checkin[]) {
    const [checkins, setCheckins] = useState<Checkin[]>(initialCheckins)
    const [selected, setSelected] = useState<string[]>([])
    const [statusFilter, setStatusFilter] = useState("todos")
    const [sectorFilter, setSectorFilter] = useState("todos")
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)

    const filtered = checkins.filter((c) => {
        const matchesSearch =
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus =
            statusFilter === "todos" ||
            (statusFilter === "validados" && c.status === "validated") ||
            (statusFilter === "nao-validados" && c.status === "pending") ||
            (statusFilter === "cancelados" && c.status === "cancelled")

        const matchesSector =
            sectorFilter === "todos" || c.sector === sectorFilter

        return matchesSearch && matchesStatus && matchesSector
    })

    const stats = {
        total: checkins.length,
        validated: checkins.filter((c) => c.status === "validated").length,
        pending: checkins.filter((c) => c.status === "pending").length,
        cancelled: checkins.filter((c) => c.status === "cancelled").length,
    }

    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelected(filtered.map((c) => c.id))
        } else {
            setSelected([])
        }
    }

    const toggleSelect = (id: string, checked: boolean) => {
        setSelected((prev) =>
            checked ? [...prev, id] : prev.filter((x) => x !== id)
        )
    }

    const validate = async (id: string) => {
        setLoading(true)
        await delay()
        setCheckins((prev) =>
            prev.map((c) =>
                c.id === id ? { ...c, status: "validated", validatedAt: new Date().toISOString() } : c
            )
        )
        setLoading(false)
        toast({ title: "Check-in validado com sucesso", description: `#${id}` })
    }

    const cancel = async (id: string) => {
        setLoading(true)
        await delay()
        setCheckins((prev) =>
            prev.map((c) =>
                c.id === id ? { ...c, status: "pending", validatedAt: null } : c
            )
        )
        setLoading(false)
        toast({
            title: "Validação cancelada",
            description: `#${id}`,
            variant: "destructive",
        })
    }

    const bulk = async (action: "validate" | "cancel") => {
        setLoading(true)
        await delay()
        setCheckins((prev) =>
            prev.map((c) =>
                selected.includes(c.id)
                    ? {
                        ...c,
                        status: action === "validate" ? "validated" : "pending",
                        validatedAt: action === "validate" ? new Date().toISOString() : null,
                    }
                    : c
            )
        )
        setSelected([])
        setLoading(false)
        toast({
            title: "Ação em lote executada",
            description: `${action === "validate" ? "Validação" : "Cancelamento"} aplicada a ${selected.length} check-ins.`,
        })
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "validated":
                return <Badge className="bg-green-500 hover:bg-green-600" > Validado </Badge>
            case "pending":
                return <Badge className="bg-yellow-500 hover:bg-yellow-600" > Não validado </Badge>
            case "cancelled":
                return <Badge className="bg-red-500 hover:bg-red-600" > Cancelado </Badge>
            default:
                return <Badge variant="secondary" > Desconhecido </Badge>
        }
    }

    return {
        checkins,
        filtered,
        selected,
        stats,
        searchTerm,
        statusFilter,
        sectorFilter,
        loading,
        setSearchTerm,
        setStatusFilter,
        setSectorFilter,
        toggleSelectAll,
        toggleSelect,
        validate,
        cancel,
        bulk,
        getStatusBadge,
    }
}

const delay = () => new Promise((r) => setTimeout(r, 1000))
