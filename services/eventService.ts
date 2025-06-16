
import { axiosInstance } from "./apiConfig";
import { axiosInstanceR2 } from "./apiConfig";


export class EventService {
    public async getEventsMe({ page = 1, limit = 10 } = {}) {
        try {
            const response = await axiosInstance.get("/producers/me/events", {
                params: { page, limit }
            })

            return { success: true, data: response.data }
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || "Ocorreu um erro inesperado"
            }
        }
    }

    createEventMe(data) {
        return axiosInstance.post("/producers/me/events", data)
    }

    uploadImagem(url, image) {
        return axiosInstanceR2.put(url, image, { // Use a URL diretamente
            headers: {
                'Content-Type': image.type,
            },
        });
    }
}