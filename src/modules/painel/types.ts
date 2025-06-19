export type Stats = {
    activeEvents: number
    totalTicketsSold: number
    totalRevenue: number
}

export type RecentEvent = {
    id: string
    title: string
    date: string
    ticketsSold: number
    totalRevenue: number
    status: "upcoming" | "past"
}