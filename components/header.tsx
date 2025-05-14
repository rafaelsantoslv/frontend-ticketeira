"use client"

import { useState } from "react"
import { Menu, Settings, LogOut } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useAuth2 } from "@/contexts/AuthContext"
import Link from "next/link"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth2()
  const [isOpen, setIsOpen] = useState(false)

  const handleSettings = () => {
    setIsOpen(false)
    toast({
      title: "Configurações",
      description: "Você acessou as configurações da conta.",
      action: <ToastAction altText="Fechar">Fechar</ToastAction>,
    })
    router.push("/painel/configuracoes")
  }

  // const handleLogout = () => {
  //   setIsOpen(false)
  //   logout()
  //   toast({
  //     title: "Logout",
  //     description: "Você foi desconectado com sucesso.",
  //     action: <ToastAction altText="Fechar">Fechar</ToastAction>,
  //   })
  // }

  // Get initials from email
  const getInitials = () => {
    if (!user?.email) return "U"
    return user.email.substring(0, 2).toUpperCase()
  }

  // Gerar o breadcrumb com base no pathname
  const generateBreadcrumb = () => {
    const paths = pathname.split("/").filter(Boolean)

    // Se não estiver no painel, não mostra breadcrumb
    if (paths[0] !== "painel") return null

    // Estrutura de breadcrumb
    const breadcrumbs = []

    // Adiciona "PAINEL" como primeiro item
    breadcrumbs.push(
      <Link href="/painel" key="painel" className="hover:text-[#400041]">
        PAINEL
      </Link>,
    )

    // Se tiver mais níveis, adiciona-os
    if (paths.length > 1) {
      if (paths[1] === "dashboard") {
        breadcrumbs.push(<span key="dashboard">DASHBOARD</span>)
      } else if (paths[1] === "financeiro") {
        breadcrumbs.push(
          <Link href="/painel/eventos" key="eventos" className="hover:text-[#400041]">
            FINANCEIRO
          </Link>,
        )
      }
      else if (paths[1] === "usuarios") {
        breadcrumbs.push(
          <Link href="/painel/eventos" key="eventos" className="hover:text-[#400041]">
            USUARIOS
          </Link>,
        )
      }
      else if (paths[1] === "eventos") {
        breadcrumbs.push(
          <Link href="/painel/eventos" key="eventos" className="hover:text-[#400041]">
            EVENTOS
          </Link>,
        )

        // Se for um evento específico
        if (paths.length > 2 && paths[2] !== "novo") {
          // Aqui você poderia buscar o nome do evento com base no ID
          // Por enquanto, vamos usar um nome genérico ou o ID
          const eventName = paths[2] === "1" ? "LA VIE GLOW PARTY" : `EVENTO ${paths[2]}`
          breadcrumbs.push(<span key="evento-nome">{eventName}</span>)
        } else if (paths[2] === "novo") {
          breadcrumbs.push(<span key="novo-evento">NOVO EVENTO</span>)
        }
      }
    }

    // Retorna os breadcrumbs separados por "/"
    return breadcrumbs.map((crumb, index) => {
      // Adiciona separador entre os itens, exceto no último
      return index < breadcrumbs.length - 1 ? (
        <span key={`crumb-${index}`}>
          {crumb} <span className="mx-2 text-gray-400">/</span>
        </span>
      ) : (
        <span key={`crumb-${index}`}>{crumb}</span>
      )
    })
  }

  return (
    <div className="bg-white p-4 flex items-center justify-between border-b">
      <div className="text-sm text-gray-600">{generateBreadcrumb()}</div>
      <div className="flex items-center">
        <div className="text-right mr-3">
          <div className="text-sm font-semibold">Olá, {user?.email ? user.email.split("@")[0] : "Usuário"}</div>
          <div className="text-xs text-gray-500">{user?.email}</div>
        </div>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-[#400041] text-white">{getInitials()}</AvatarFallback>
        </Avatar>

        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
