// components/recent-event-card.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, DollarSign, Users } from "lucide-react"
import { EventStatusBadge } from "./event-status-badge"
import { formatCurrency } from "@/utils/formatCurrency"

interface RecentEventCardProps {
    id: string
    title: string
    status: string
    date: string
    ticketsSold: number
    totalRevenue: number
}

export function RecentEventCard({ id, title, status, date, ticketsSold, totalRevenue }: RecentEventCardProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1 mb-2 md:mb-0">
                <div className="flex items-center">
                    <h3 className="font-medium">{title}</h3>
                    <div className="ml-2"><EventStatusBadge status={status} /></div>
                </div>
                <div className="text-sm text-muted-foreground flex flex-col md:flex-row md:gap-4">
                    <span className="flex items-center"><CalendarDays className="mr-1 h-3 w-3" /> {date}</span>
                    <span className="flex items-center"><Users className="mr-1 h-3 w-3" /> {ticketsSold} ingressos</span>
                    <span className="flex items-center"><DollarSign className="mr-1 h-3 w-3" /> {formatCurrency(totalRevenue)}</span>
                </div>
            </div>
            <Link href={`/painel/eventos/${id}`}>
                <Button variant="outline" size="sm">Ver Detalhes</Button>
            </Link>
        </div>
    )
}
