"use client"

import Link from "next/link"
import { CalendarSearch, FileText, LayoutDashboard, MessageCircle, User, Wallet } from "lucide-react"
import { useSidebarState } from "@/hooks/use-sidebar-state"
import { cn } from "@/lib/utils"
import { SideBarItem } from "./SidebarItem"

export default function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebarState()

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    // se o clique veio de dentro de um link ou botão, ignora
    const target = e.target as HTMLElement
    if (target.closest("a") || target.closest("button")) return
    toggleSidebar()
  }


  return (
    <div onClick={handleToggle} className={cn(
      "bg-[#400041] flex flex-col transition-all duration-300 ease-in-out",
      collapsed ? "w-[70px]" : "w-[220px]",
    )}>
      <div className="flex items-center justify-between p-4 border-b border-[#5a105b]">
        <Link href="/" className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#400041] text-xl font-bold">u</span>
          </div>
          {!collapsed && <span className="ml-2 text-white text-lg font-semibold">unyx ticket</span>}
        </Link>
      </div>

      <div className="mt-4">
        <SideBarItem link="/painel" name="Painel" icon={<LayoutDashboard className="h-5 w-5" />} />
        <SideBarItem link="/painel/eventos" name="Eventos" icon={<CalendarSearch className="h-5 w-5" />} />
        <SideBarItem link="/painel/financeiro" name="Financeiro" icon={<Wallet className="h-5 w-5" />} />
        <SideBarItem link="/painel/usuarios" name="Usuarios" icon={<User className="h-5 w-5" />} />
      </div>
      <div className="mt-auto border-t border-[#5a105b] py-4">
        <a
          href="https://wa.me/554888234180" // Substitua 'seunumero' pelo número do WhatsApp
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center py-3 text-white transition-all duration-300 hover:bg-[#5a105b]",
            collapsed ? "justify-center px-0" : "px-4"
          )}
        >
          <div className="flex items-center justify-center h-5 w-5">
            <MessageCircle className="h-5 w-5" />
          </div>
          {!collapsed && <span className="ml-3">Suporte</span>}
        </a>

        <Link
          href="/termos-de-uso" // Ajuste para a rota correta dos termos de uso
          className={cn(
            "flex items-center py-3 text-white transition-all duration-300 hover:bg-[#5a105b]",
            collapsed ? "justify-center px-0" : "px-4"
          )}
        >
          <div className="flex items-center justify-center h-5 w-5">
            <FileText className="h-5 w-5" />
          </div>
          {!collapsed && <span className="ml-3">Termos de Uso</span>}
        </Link>
      </div>
    </div>
  )
}
