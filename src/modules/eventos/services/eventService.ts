
import { mockEvents } from "../mocks/mockEventDetails"
import { mockEventSummaries } from "../mocks/mockEventSummary"
import { EventSummary } from "../types"

export const eventService = {
    async getEventById(id: string) {
        return mockEvents.find(e => e.id === id) ?? null
    },

    async updateEvent(id: string, data: Partial<Event>) {
        return { ...data, id }
    },

    async getAllEventSummaries(): Promise<EventSummary[]> {
        return mockEventSummaries
    },

    async createEvent(data: any) {
        console.log("Evento a ser criado:", data)
        await new Promise((res) => setTimeout(res, 1500))
        return {
            success: true,
            id: crypto.randomUUID(), // simulação de id do evento criado
        }
    }
}
