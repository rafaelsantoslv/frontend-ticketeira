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
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useAuth } from "@/contexts/auth-context"

export default function Header() {
  const router = useRouter()
  const { logout, user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleSettings = () => {
    setIsOpen(false)
    toast({
      title: "Configurações",
      description: "Você acessou as configurações da conta.",
      action: <ToastAction altText="Fechar">Fechar</ToastAction>,
    })
  }

  const handleLogout = () => {
    setIsOpen(false)
    logout()
    toast({
      title: "Logout",
      description: "Você foi desconectado com sucesso.",
      action: <ToastAction altText="Fechar">Fechar</ToastAction>,
    })
  }

  // Get initials from email
  const getInitials = () => {
    if (!user?.email) return "U"
    return user.email.substring(0, 2).toUpperCase()
  }

  return (
    <div className="bg-white p-4 flex items-center justify-between border-b">
      <div className="text-sm text-gray-600">
        <span>EVENTOS</span>
        <span className="mx-2">/</span>
        <span>LA VIE GLOW PARTY - INAUGURAÇÃO - BLUMENAU</span>
      </div>
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
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
