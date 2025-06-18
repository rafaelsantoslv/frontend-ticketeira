export const authService = {
    async login(email: string, password: string) {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        return await response.json()
    },

    async me() {
        const response = await fetch('/api/auth/me', { credentials: 'include' })
        if (!response.ok) return { success: false }
        return await response.json()
    },

    logout() {
        fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    },
}