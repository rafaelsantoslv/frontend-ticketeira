import Link from "next/link"
import { ArrowLeft, ChevronDown, HelpCircle, Menu, MessageCircle, X } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function TicketDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[220px] bg-[#3a0a3a] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[#4a1a4a]">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-[#3a0a3a] text-xl font-bold">u</span>
            </div>
            <span className="ml-2 text-white text-lg font-semibold">uniticket</span>
          </div>
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
          <Link href="#" className="flex items-center px-4 py-3 text-white hover:bg-[#4a1a4a]">
            <ArrowLeft className="h-5 w-5 mr-3" />
            <span>Voltar</span>
          </Link>

          <Link href="#" className="flex items-center px-4 py-3 text-white bg-[#8e44ad] hover:bg-[#9b59b6]">
            <div className="h-5 w-5 mr-3 flex items-center justify-center">
              <span className="h-3 w-3 rounded-full border-2 border-white"></span>
            </div>
            <span>Dashboard</span>
          </Link>

          <div className="flex items-center justify-between px-4 py-3 text-white hover:bg-[#4a1a4a] cursor-pointer">
            <div className="flex items-center">
              <div className="h-5 w-5 mr-3 flex items-center justify-center">
                <span className="h-4 w-4 border-2 border-white rotate-45"></span>
              </div>
              <span>Ingressos</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </div>

          <div className="flex items-center justify-between px-4 py-3 text-white hover:bg-[#4a1a4a] cursor-pointer">
            <div className="flex items-center">
              <div className="h-5 w-5 mr-3 flex items-center justify-center">
                <span className="text-lg">$</span>
              </div>
              <span>Vendas</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </div>

          <Link href="#" className="flex items-center px-4 py-3 text-white hover:bg-[#4a1a4a]">
            <div className="h-5 w-5 mr-3 flex items-center justify-center">
              <div className="h-4 w-4 flex flex-col">
                <div className="h-1 w-1 bg-white rounded-full"></div>
                <div className="flex">
                  <div className="h-1 w-1 bg-white rounded-full"></div>
                  <div className="h-1 w-1 bg-white rounded-full ml-1"></div>
                </div>
              </div>
            </div>
            <span>Participantes</span>
          </Link>

          <Link href="#" className="flex items-center px-4 py-3 text-white hover:bg-[#4a1a4a]">
            <div className="h-5 w-5 mr-3 flex items-center justify-center">
              <div className="h-3 w-3 border-2 border-white rounded-full"></div>
            </div>
            <span>Checkins</span>
          </Link>

          <Link href="#" className="flex items-center px-4 py-3 text-white hover:bg-[#4a1a4a]">
            <div className="h-5 w-5 mr-3 flex items-center justify-center">
              <div className="h-3 w-3 border-2 border-white"></div>
            </div>
            <span>Informações do Evento</span>
          </Link>

          <div className="flex items-center justify-between px-4 py-3 text-white hover:bg-[#4a1a4a] cursor-pointer">
            <div className="flex items-center">
              <div className="h-5 w-5 mr-3 flex items-center justify-center">
                <span className="text-lg">$</span>
              </div>
              <span>Financeiro</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white p-4 flex items-center justify-between border-b">
          <div className="text-sm text-gray-600">
            <span>EVENTOS</span>
            <span className="mx-2">/</span>
            <span>LA VIE GLOW PARTY - INAUGURAÇÃO - BLUMENAU</span>
          </div>
          <div className="flex items-center">
            <div className="text-right mr-3">
              <div className="text-sm font-semibold">Olá, Wendell de Lima Andreatti</div>
              <div className="text-xs text-gray-500">wandreatti@agencia7etti.com.br</div>
            </div>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-[#3a0a3a] text-white">WA</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="ml-2">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 bg-[#e6eaee]">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-700">Dashboard ingressos</h1>
            <p className="text-gray-500">Essa é a página inicial das suas vendas de ingresso.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="p-4 bg-[#8e44ad] text-white">
              <div className="text-2xl font-bold">R$ 40.380,00</div>
              <div className="text-sm">Total de vendas</div>
            </Card>

            <Card className="p-4 bg-[#8e44ad] text-white">
              <div className="text-2xl font-bold">R$ 39.650,00</div>
              <div className="text-sm">Total transferido</div>
            </Card>

            <Card className="p-4 bg-[#8e44ad] text-white">
              <div className="text-2xl font-bold">R$ 66,74</div>
              <div className="text-sm">Ticket Médio</div>
            </Card>

            <Card className="p-4 bg-[#8e44ad] text-white">
              <div className="text-2xl font-bold">1010 / 0</div>
              <div className="text-sm">Confirmados / Pendentes</div>
            </Card>
          </div>

          {/* Sales Sections */}
          <div className="grid grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6">
        <Button className="h-14 w-14 rounded-full bg-[#8e44ad] hover:bg-[#9b59b6] shadow-lg">
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  )
}
