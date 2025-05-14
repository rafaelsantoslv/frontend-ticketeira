import { ApiResponse } from '@/types/api';
import api from './api';

export interface LoginData {
    email: string
    password: string
}

export interface RegisterData {
    email: string
    name: string
    phone: string
    document: string
    password: string
}

export interface AuthResponse {
    token: string
    email: string
    name: string
    role: string
}

export const authService = {
    async login(data: LoginData): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await api.post('/auth/login', data);
            if (response.data.token) {
                return {
                    success: true,
                    data: response.data
                }
            }
            return {
                success: false,
                error: 'Token não recebido'
            }

        } catch (error: any) {
            console.log("deu esse erro: " + error)
            return {
                success: false,
                error: error.response?.data?.message || 'Ocorreu um problema ao tentar fazer login'
            }
        }
    },
    async register(data: RegisterData): Promise<ApiResponse<void>> {
        try {
            await api.post('/auth/register', data)
            return { success: true }
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao registrar'
            }
        }
    },


    async validateToken(): Promise<{ success: boolean; error?: string; data?: any }> {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return {
                    success: false,
                    error: 'Token não encontrado'
                };
            }

            const response = await api.get('/auth/validate-token');

            return {
                success: true,
                data: response.data
            };

        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao validar token'
            };
        }
    },

    // Método auxiliar para verificar se o usuário está autenticado
    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    },

    // Método para obter o token
    getToken(): string | null {
        return localStorage.getItem('token');
    }
}