import { useEffect, useState } from "react"
import { EventSummary, StatsSummary } from "../types/painel-types"
import { mockEvents, mockStats } from "../mock/painel"

export function usePainelData() {
    const [recentEvents, setRecentEvents] = useState<EventSummary[]>([])
    const [stats, setStats] = useState<StatsSummary>({
        totalEvents: 0,
        activeEvents: 0,
        totalTicketsSold: 0,
        totalRevenue: 0,
    })
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        // Em um cenário real, isso seria uma chamada de API
        setTimeout(() => {
            setRecentEvents(mockEvents)
            setStats(mockStats)

            setIsLoading(false)
        }, 1000)
    }, [])

    return { recentEvents, stats, isLoading }
}