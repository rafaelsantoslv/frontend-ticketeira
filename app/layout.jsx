import { Inter } from "next/font/google"
import "./globals.css"

import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/AuthContext"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Unyx Ticket - Plataforma de Venda de Ingressos",
  description: "Gerencie eventos, venda ingressos e acompanhe resultados em tempo real",
  generator: 'v0.dev'
}
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
