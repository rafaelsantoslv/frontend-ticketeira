import { Credentials, RegisterData, User } from "@/types/auth";
import { axiosInstance } from "./apiConfig";
import { ApiResponse } from "@/types/api";


export class AuthService {

    private static instance: AuthService;
    private readonly baseUrl: string = "/auth";


    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public async login(credentials: Credentials): Promise<ApiResponse<User>> {
        try {
            const response = await axiosInstance.post(`${this.baseUrl}/login`, credentials)
            return { success: true, data: response.data }
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || "Ocorreu um erro inesperado"
            }
        }
    }

    public async register(registerData: RegisterData) {
        return axiosInstance.post("/auth/register", registerData)
    }
}