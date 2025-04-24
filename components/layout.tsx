"use client"

import type React from "react"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="p-6 bg-[#e6eaee]">{children}</div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6">
        <Button className="h-14 w-14 rounded-full bg-[#400041] hover:bg-[#5a105b] shadow-lg">
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Toast notifications */}
      <Toaster />
    </div>
  )
}
