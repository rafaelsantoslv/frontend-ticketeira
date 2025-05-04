import { api } from "./api";

export const AuthService = {
    login: async (email: string, password: string) => {
        const response = await api.post("/auth/login", { email, password });
        return response.data;
    },
    validateToken: async () => {
        const response = await api.get("/auth/validate-token");
        return response.data;
    },
    getCurrentUser: async () => {
        const response = await api.get("/auth/me");
        response.data;
    }
}