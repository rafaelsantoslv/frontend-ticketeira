import { useEffect, useState } from "react"
import { painelService } from "@/modules/painel/services/painelService"

import { RecentEvent, Stats } from "@/modules/painel/types"

export function usePainelData() {
    const [isLoading, setIsLoading] = useState(true)
    const [stats, setStats] = useState<Stats>({
        activeEvents: 0,
        totalTicketsSold: 0,
        totalRevenue: 0,
    })
    const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const [statsData, recentData] = await Promise.all([
                    painelService.getPainelStats(),
                    painelService.getRecentEvents(),
                ])

                setStats(statsData)
                setRecentEvents(recentData)
            } catch (error) {
                console.error("Erro ao carregar dados do painel:", error)
                // Futuramente: setar erro ou exibir toast
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return {
        stats,
        recentEvents,
        isLoading,
    }
}
