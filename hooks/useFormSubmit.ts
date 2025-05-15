import { ApiResponse, BaseServiceState } from "@/types/Api"
import { useState } from "react"

interface UseFormSubmitOptions<T> {
    onSuccess?: (data: T) => void
    onError?: (error: string) => void
}

export function useFormSubmit<T>({ onSuccess, onError }: UseFormSubmitOptions<T> = {}) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (submitFn: () => Promise<ApiResponse<T>>) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await submitFn()

            if (!result.success) {
                setError(result.error || "Ocorreu um erro");
                onError?.(result.error || "Ocorreu um erro");
                setIsLoading(false);
                return false;
            }

            setError(null);
            onSuccess?.(result.data as T);
            setIsLoading(false);
            return true;
        } catch (error) {
            console.log(error)
            const errorMessage = "Erro ao conectar com o servidor";
            setError(errorMessage);
            onError?.(errorMessage);
            setIsLoading(false);
            return false;
        }
    }

    return {
        isLoading,
        error,
        handleSubmit,
    }

}