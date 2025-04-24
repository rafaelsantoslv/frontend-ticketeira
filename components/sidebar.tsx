"use client"

import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
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

      <div className="p-4">
        <Button variant="outline" className="w-full text-white border-white flex items-center justify-between">
          <div className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Alterar para painel A&B (bar)</span>
          </div>
        </Button>
      </div>

      <div className="mt-4">
        <Link href="/" className="flex items-center px-4 py-3 text-white hover:bg-[#5a105b]">
          <ArrowLeft className="h-5 w-5 mr-3" />
          <span>Voltar</span>
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
