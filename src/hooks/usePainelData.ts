import { useEffect, useState } from "react"
import { EventSummary, StatsSummary } from "../types/PainelType"
import { mockEvents, mockStats } from "../mock/painel"
import { useAuth } from "@/modules/auth/contexts/useAuth"


export function usePainelData() {
    const { me } = useAuth()
    const [recentEvents, setRecentEvents] = useState<EventSummary[]>([])
    const [stats, setStats] = useState<StatsSummary>({
        totalEvents: 0,
        activeEvents: 0,
        totalTicketsSold: 0,
        totalRevenue: 0,
    })
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            await me()

            // Se chegou aqui, o token é válido
            // Em um cenário real, isso seria uma chamada de API
            setTimeout(() => {
                setRecentEvents(mockEvents)
                setStats(mockStats)
                setIsLoading(false)
            }, 1000)
        }

        fetchData()
    }, [])

    return { recentEvents, stats, isLoading }
}