"use client"

import Link from "next/link"
import { ArrowLeft, CalendarSearch, Columns2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    // Se for exatamente o caminho /painel, só retorna true se for exatamente igual
    if (path === '/painel') {
      return pathname === '/painel'
    }
    // Para os outros caminhos, verifica se é exatamente igual ou se começa com o path
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <div className="w-[220px] bg-[#400041] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[#5a105b]">
        <Link href="/" className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#400041] text-xl font-bold">u</span>
          </div>
          <span className="ml-2 text-white text-lg font-semibold">unyx ticket</span>
        </Link>
        <Button variant="ghost" size="icon" className="text-white">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-4">
        <Link href="/" className="flex items-center px-4 py-3 text-white hover:bg-[#5a105b]">
          <ArrowLeft className="h-5 w-5 mr-3" />
          <span>Voltar</span>
        </Link>

        <Link
          href="/painel"
          className={`flex items-center px-4 py-3 text-white ${isActive("/painel") ? "bg-[#DC9188]" : "hover:bg-[#5a105b]"}`}
        >
          <Columns2 className="h-5 w-5 mr-3" />
          <span>Painel</span>
        </Link>

        <Link
          href="/painel/eventos"
          className={`flex items-center px-4 py-3 text-white ${isActive("/painel/eventos") ? "bg-[#DC9188]" : "hover:bg-[#5a105b]"}`}
        >
          <CalendarSearch className="h-5 w-5 mr-3" />
          <span>Eventos</span>
        </Link>

        <Link
          href="/painel/dashboard"
          className={`flex items-center px-4 py-3 text-white ${isActive("/painel/dashboard") ? "bg-[#DC9188]" : "hover:bg-[#5a105b]"}`}
        >
          <div className="h-5 w-5 mr-3 flex items-center justify-center">
            <span className="h-3 w-3 rounded-full border-2 border-white"></span>
          </div>
          <span>Dashboard</span>
        </Link>

        <Link
          href="/painel/informacoes"
          className={`flex items-center px-4 py-3 text-white ${isActive("/painel/informacoes") ? "bg-[#DC9188]" : "hover:bg-[#5a105b]"}`}
        >
          <div className="h-5 w-5 mr-3 flex items-center justify-center">
            <div className="h-3 w-3 border-2 border-white"></div>
          </div>
          <span>Informações do Evento</span>
        </Link>
      </div>
    </div>
  )
}
