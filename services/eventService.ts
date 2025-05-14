import { axiosInstance } from "./apiConfig";


export class EventService {
    getEventsMe(token) {
        return axiosInstance.get("/producers/me/events", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}