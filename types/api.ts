export interface ApiResponse<T = any> {
    sucess: boolean,
    data?: T,
    error?: string
}

export interface BaseServiceState {
    isLoading: boolean,
    error: string | null
}