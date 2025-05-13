import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api"
})

export class EventService {
    getEventsMe(token) {
        return axiosInstance.get("/producers/me/events", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}