import { mockEvents, mockStats } from '@/mocks/dashboard'

export class MockPainelService {
  async getRecentEvents() {
    return Promise.resolve({ data: mockEvents })
  }

  async getStats() {
    return Promise.resolve({ data: mockStats })
  }
}
