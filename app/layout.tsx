import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/modules/auth/contexts/AuthContext"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Unyx Ticket - Plataforma de Venda de Ingressos",
  description: "Gerencie eventos, venda ingressos e acompanhe resultados em tempo real",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
