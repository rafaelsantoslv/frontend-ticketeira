"use client"

import type React from "react"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"

export default function PainelLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">{children}</main>
      </div>
    </div>
  )
}
