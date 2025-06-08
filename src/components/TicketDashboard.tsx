"use client"

import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Layout from "@/components/Layout"

export default function TicketDashboard() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-700">Dashboard ingressos</h1>
        <p className="text-gray-500">Essa é a página inicial das suas vendas de ingresso.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-[#400041] text-white">
          <div className="text-2xl font-bold">R$ 40.380,00</div>
          <div className="text-sm">Total de vendas</div>
        </Card>

        <Card className="p-4 bg-[#400041] text-white">
          <div className="text-2xl font-bold">R$ 39.650,00</div>
          <div className="text-sm">Total transferido</div>
        </Card>

        <Card className="p-4 bg-[#400041] text-white">
          <div className="text-2xl font-bold">R$ 66,74</div>
          <div className="text-sm">Ticket Médio</div>
        </Card>

        <Card className="p-4 bg-[#400041] text-white">
          <div className="text-2xl font-bold">1010 / 0</div>
          <div className="text-sm">Confirmados / Pendentes</div>
        </Card>
      </div>

      {/* Sales Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sales by Ticket */}
        <Card className="p-6 bg-white">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-semibold">Vendas por ingresso</h2>
            <Button variant="ghost" size="icon" className="ml-2">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>

          <div className="border-b pb-4 mb-4">
            <div className="flex justify-between mb-2">
              <div>Total em vendas</div>
              <div className="font-semibold">R$ 40.380,00</div>
            </div>
            <div className="flex justify-between text-green-600 mb-2">
              <div>(+) Total em ingressos</div>
              <div>R$ 40.380,00</div>
            </div>
            <div className="flex justify-between text-red-500">
              <div>(-) Taxas absorvidas</div>
              <div>-R$ 0,00</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="font-semibold">Pista</div>
              <div className="text-center">511 ingressos</div>
              <div className="font-semibold">R$ 8.020,00</div>
            </div>

            <div className="flex justify-between">
              <div className="font-semibold">Promocional</div>
              <div className="text-center">25 ingressos</div>
              <div className="font-semibold">R$ 1.100,00</div>
            </div>

            <div className="flex justify-between">
              <div className="text-gray-500 pl-4">Meia</div>
              <div className="text-center">15 x R$ 40,00</div>
              <div className="text-gray-500">R$ 600,00</div>
            </div>

            <div className="flex justify-between">
              <div className="text-gray-500 pl-4">Meia</div>
              <div className="text-center">10 x R$ 50,00</div>
              <div className="text-gray-500">R$ 500,00</div>
            </div>

            <div className="flex justify-between">
              <div className="font-semibold">1º Lote</div>
              <div className="text-center">63 ingressos</div>
              <div className="font-semibold">R$ 3.380,00</div>
            </div>

            <div className="flex justify-between">
              <div className="text-gray-500 pl-4">Meia</div>
              <div className="text-center">40 x R$ 50,00</div>
              <div className="text-gray-500">R$ 2.000,00</div>
            </div>

            <div className="flex justify-between">
              <div className="text-gray-500 pl-4">Meia</div>
              <div className="text-center">23 x R$ 60,00</div>
              <div className="text-gray-500">R$ 1.380,00</div>
            </div>
          </div>
        </Card>

        {/* Sales by Origin */}
        <Card className="p-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Vendas por origem</h2>
          <div className="flex items-center justify-center h-40 text-gray-500">Nenhuma venda realizada</div>
        </Card>
      </div>
    </Layout>
  )
}
