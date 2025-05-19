
import { axiosInstance } from "./apiConfig";


export class EventService {
    public async getEventsMe() {
        try {
            const response = await axiosInstance.get("/producers/me/events")

            return { success: true, data: response.data }
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || "Ocorreu um erro inesperado"
            }
        }
    }

    createEventMe() {
        return axiosInstance.post("/producers/me/events")
    }
    uploadImagem(url, image) {
        return axiosInstance.post(url, {

        })
    }
}