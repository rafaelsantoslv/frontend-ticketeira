export type EventSummary = {
    id: string
    title: string
    date: string
    location: string
    ticketsSold: number
    totalRevenue: number
    status: string
}

export type StatsSummary = {
    totalEvents: number
    activeEvents: number
    totalTicketsSold: number
    totalRevenue: number
}