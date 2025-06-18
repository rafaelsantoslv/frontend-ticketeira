const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
export const authService = {
    async login(email: string, password: string) {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            })
            const isJson = response.headers.get("content-type")?.includes("application/json")
            const data = isJson ? await response.json() : null
            if (!response.ok) {
                const message = data?.message || data?.error || "Erro ao fazer login"
                return { success: false, error: message }
            }
            return { success: true, user: data?.user }
        } catch (error) {
            return { success: false, error: "Erro de rede ou servidor fora do ar" }
        }
    },

    async me() {
        const response = await fetch(`${API_URL}/auth/me`, { credentials: 'include' })
        if (!response.ok) return { success: false }
        return await response.json()
    },

    logout() {
        fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' })
    },
}