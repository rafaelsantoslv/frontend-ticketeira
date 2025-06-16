import { useEffect, useState } from "react"
import { EventSummary, StatsSummary } from "../types/PainelType"
import { USE_MOCKS } from "@/utils/config"
import { PainelService } from "@/services/painelService"
import { MockPainelService } from "@/services/mock/painelService"
import { useAuth2 } from "@/contexts/AuthContext"

export function usePainelData() {
    const { validateToken } = useAuth2()
    const [recentEvents, setRecentEvents] = useState<EventSummary[]>([])
    const [stats, setStats] = useState<StatsSummary>({
        totalEvents: 0,
        activeEvents: 0,
        totalTicketsSold: 0,
        totalRevenue: 0,
    })
    const [isLoading, setIsLoading] = useState(true)
    const service = USE_MOCKS ? new MockPainelService() : new PainelService()
    useEffect(() => {
        const fetchData = async () => {
            await validateToken()
            try {
                const token = localStorage.getItem('token') || ''
                const [eventsRes, statsRes] = await Promise.all([
                    service.getRecentEvents(token),
                    service.getStats(token),
                ])
                setRecentEvents(eventsRes.data)
                setStats(statsRes.data)
            } catch (error) {
                console.error('Erro ao carregar dados do painel:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return { recentEvents, stats, isLoading }
}