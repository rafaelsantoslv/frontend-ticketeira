export interface ApiResponse<T> {
    success: boolean,
    data?: T,
    error?: string
}

export interface BaseServiceState {
    isLoading: boolean,
    error: string | null
}