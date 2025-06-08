// hooks/use-is-active.ts
import { usePathname } from "next/navigation"

export function useIsActive(path: string) {
    const pathname = usePathname()

    if (path === '/painel') {
        return pathname === '/painel'
    }

    return pathname === path || pathname.startsWith(`${path}/`)
}
