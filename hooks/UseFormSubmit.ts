import { ApiResponse, BaseServiceState } from "@/types/api"
import { useState } from "react"

interface UseFormSubmitOptions<T> {
    onSuccess?: (data: T) => void
    onError?: (error: string) => void
}

export function useFormSubmit<T>({ onSuccess, onError }: UseFormSubmitOptions<T> = {}) {
    const [state, setState] = useState<BaseServiceState>({
        isLoading: false,
        error: null,
    })


    const handleSubmit = async (submitFn: () => Promise<ApiResponse<T>>) => {
        setState({ isLoading: true, error: null })

        try {
            const result = await submitFn()

            if (!result.success) {
                setState({ isLoading: false, error: result.error || 'Ocorreu um erro' })
                onError?.(result.error || 'Ocorreu um erro')
                return false
            }

            setState({ isLoading: false, error: null })
            onSuccess?.(result.data as T)
            return true
        } catch (error) {
            const errorMessage = 'Erro ao conectar com o servidor'
            setState({ isLoading: false, error: errorMessage })
            onError?.(errorMessage)
            return false
        }
    }

    return {
        ...state,
        handleSubmit,
    }

}