

import { painelStatsMock, recentEventsMock } from "../mock/painelMock"

export const painelService = {
    async getPainelStats() {
        return painelStatsMock
    },

    async getRecentEvents() {
        return recentEventsMock

    }
}


