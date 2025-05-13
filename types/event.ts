// types/event.ts
export interface Event {
    id: string
    title: string
    date: Date
    location: string
    venue: string
    status: "active" | "upcoming" | "completed" | "canceled"
    ticketsSold: number
    image: string
}