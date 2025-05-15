import { useIsActive } from "@/hooks/use-is-active"
import { useSidebarState } from "@/hooks/use-sidebar-state"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ReactNode } from "react"

interface SideBarItemProps {
    link: string
    icon: ReactNode
    name: string
}

export function SideBarItem({ link, icon, name }: SideBarItemProps) {
    const { collapsed } = useSidebarState()
    const isActive = useIsActive(link)
    return (
        <Link
            href={link}
            className={cn(
                "group flex items-center py-3 text-white transition-all duration-300",
                isActive ? "bg-[#DC9188]" : "hover:bg-[#5a105b]",
                collapsed ? "justify-center px-0" : "px-4"
            )}
        >
            <div className="flex items-center justify-center h-5 w-5 flex-shrink-0">
                {icon}
            </div>

            <div
                className={cn(
                    "transition-all duration-300 ease-in-out overflow-hidden",
                    collapsed
                        ? "w-0 opacity-0"
                        : "w-auto ml-3 opacity-100"
                )}
            >
                {!collapsed && (
                    <span className="ml-3 whitespace-nowrap transition-all duration-200">
                        {name}
                    </span>
                )}
            </div>
        </Link>
    )
}

