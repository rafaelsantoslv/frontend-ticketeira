export interface Credentials {
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

export interface User {
    email: string;
    name: string;
    role: string;
}

export interface AuthResponse {
    id: string;
    message?: string;
}

export interface AuthResult {
    success: boolean;
    data: User;
    error?: string;
}