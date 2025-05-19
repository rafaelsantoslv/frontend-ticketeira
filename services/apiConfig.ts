import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
})

export const axiosInstanceR2 = axios.create({
    withCredentials: false
})