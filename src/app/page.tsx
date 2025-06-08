import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, CheckCircle, CreditCard, MapPin, Ticket, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#400041] text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-[#400041] text-xl font-bold">u</span>
            </div>
            <span className="ml-2 text-white text-2xl font-semibold">unyx ticket</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-[#DC9188] transition-colors">
              Recursos
            </a>
            <a href="#how-it-works" className="hover:text-[#DC9188] transition-colors">
              Como Funciona
            </a>
            <a href="#pricing" className="hover:text-[#DC9188] transition-colors">
              Preços
            </a>
          </nav>
          <div className="flex space-x-4">
            <Link href="/login">
              <Button variant="outline" className="border-white text-[#400041] hover:bg-white hover:text-[#400041]">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#DC9188] hover:bg-[#c57e76] text-white">Registrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#400041] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Simplifique a venda de ingressos para seus eventos
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Plataforma completa para gerenciar eventos, vender ingressos e acompanhar resultados em tempo real.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button className="bg-[#DC9188] hover:bg-[#c57e76] text-white text-lg px-8 py-6">
                    Comece Agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button
                    variant="outline"
                    className="border-white text-[#400041] hover:bg-white hover:text-[#400041] text-lg px-8 py-6"
                  >
                    Saiba Mais
                  </Button>
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Unyx Ticket Dashboard"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Recursos Poderosos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tudo o que você precisa para gerenciar seus eventos e vender ingressos com facilidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-[#400041] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Ticket className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Venda de Ingressos</h3>
              <p className="text-gray-600">
                Venda ingressos online com facilidade, gerencie lotes e preços diferentes para cada tipo de ingresso.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-[#400041] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Check-in Simplificado</h3>
              <p className="text-gray-600">
                Sistema de check-in rápido e eficiente com QR Code, evitando filas e melhorando a experiência.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-[#400041] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <CreditCard className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Pagamentos Seguros</h3>
              <p className="text-gray-600">
                Integração com diversos métodos de pagamento, garantindo segurança e facilidade nas transações.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-[#400041] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Gestão de Eventos</h3>
              <p className="text-gray-600">
                Crie e gerencie múltiplos eventos, com informações detalhadas e personalização completa.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-[#400041] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Users className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Gestão de Participantes</h3>
              <p className="text-gray-600">
                Acompanhe informações dos participantes, envie comunicados e gerencie listas VIP.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-[#400041] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Localização e Mapa</h3>
              <p className="text-gray-600">
                Integração com mapas para facilitar a localização do evento e informações de acesso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Como Funciona</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Três passos simples para começar a vender ingressos para seus eventos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-[#400041] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Crie sua conta</h3>
              <p className="text-gray-600">
                Registre-se gratuitamente e configure seu perfil de organizador de eventos.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-[#400041] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Configure seu evento</h3>
              <p className="text-gray-600">
                Adicione informações, imagens, lotes de ingressos e preços para seu evento.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-[#400041] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Comece a vender</h3>
              <p className="text-gray-600">
                Compartilhe o link de vendas e acompanhe em tempo real os resultados no painel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <span className="text-[#400041] text-xl font-bold">u</span>
                </div>
                <span className="ml-2 text-white text-xl font-semibold">unyx ticket</span>
              </div>
              <p className="text-gray-400">A plataforma completa para venda de ingressos e gerenciamento de eventos.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Documentação
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Guias
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Suporte
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Vendas
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2023 Unyx Ticket. Todos os direitos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                Termos
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacidade
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
