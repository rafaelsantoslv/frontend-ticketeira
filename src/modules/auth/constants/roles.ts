export const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    PRODUTOR: 'produtor',
} as const

export type Role = keyof typeof ROLES