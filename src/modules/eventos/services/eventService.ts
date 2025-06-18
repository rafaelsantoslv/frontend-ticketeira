import { mockEvents } from "../mocks/mocksEvents"

// Mock por enquanto
export const eventService = {
    async getEventById(id: string) {
        return mockEvents.find(e => e.id === id) ?? null
    },

    async updateEvent(id: string, data: Partial<Event>) {
        return { ...data, id } // mock response
    },

}
