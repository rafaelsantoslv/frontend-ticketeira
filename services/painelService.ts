import { axiosInstance } from './apiConfig'

export class PainelService {
  async getRecentEvents(token: string) {
    return axiosInstance.get('/dashboard/recent-events', {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  async getStats(token: string) {
    return axiosInstance.get('/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}
