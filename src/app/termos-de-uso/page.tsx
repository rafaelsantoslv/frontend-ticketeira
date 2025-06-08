import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, CreditCard, MapPin, Ticket, Users } from "lucide-react"

export default function TermosDeUso() {
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
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#400041]">
                                Entrar
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-[#DC9188] hover:bg-[#c57e76] text-white">Registrar</Button>
                        </Link>
                    </div>
                </div>
            </header>


            {/* Features Section */}
            <section id="terms" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Termos de Uso</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Por favor, leia atentamente os termos e condições para utilização da plataforma Unyx Ticket
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-8">
                        {/* 1. Definições */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">1. Definições</h3>
                            <p className="text-gray-600 mb-4">
                                Para os fins destes Termos de Uso, consideram-se:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li><strong>Plataforma:</strong> Sistema Unyx Ticket, destinado à venda e gestão de ingressos.</li>
                                <li><strong>Produtor:</strong> Pessoa física ou jurídica que utiliza a plataforma para vender ingressos de seus eventos.</li>
                                <li><strong>Comprador:</strong> Pessoa física ou jurídica que adquire ingressos através da plataforma.</li>
                                <li><strong>Taxa de Serviço:</strong> Valor correspondente a 10% sobre o valor de cada ingresso vendido.</li>
                            </ul>
                        </div>

                        {/* 2. Objeto */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">2. Objeto</h3>
                            <p className="text-gray-600">
                                Este termo regula a utilização da plataforma Unyx Ticket, que oferece serviços de venda e gestão de ingressos para eventos, mediante cobrança de taxa de serviço de 10% sobre o valor de cada ingresso comercializado.
                            </p>
                        </div>

                        {/* 3. Responsabilidades do Produtor */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">3. Responsabilidades do Produtor</h3>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>Fornecer informações verdadeiras e precisas sobre o evento.</li>
                                <li>Responsabilizar-se pela realização do evento conforme anunciado.</li>
                                <li>Cumprir com todas as obrigações legais e fiscais relacionadas ao evento.</li>
                                <li>Aceitar o desconto automático da taxa de serviço de 10% sobre cada ingresso vendido.</li>
                                <li>Não comercializar ingressos por outros meios sem prévia autorização.</li>
                            </ul>
                        </div>

                        {/* 4. Pagamentos e Taxas */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">4. Pagamentos e Taxas</h3>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>A taxa de serviço de 10% será deduzida automaticamente do valor de cada ingresso.</li>
                                <li>Os repasses aos produtores serão realizados conforme cronograma estabelecido em contrato.</li>
                                <li>Todos os pagamentos serão processados através da plataforma.</li>
                                <li>Em caso de cancelamento, a taxa de serviço não será devolvida.</li>
                            </ul>
                        </div>

                        {/* 5. Cancelamentos e Reembolsos */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">5. Cancelamentos e Reembolsos</h3>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>Em caso de cancelamento do evento pelo produtor, os compradores serão reembolsados integralmente, exceto pela taxa de serviço.</li>
                                <li>Cancelamentos por parte dos compradores seguirão a política específica de cada evento.</li>
                                <li>A Unyx Ticket não se responsabiliza por cancelamentos realizados pelos produtores.</li>
                            </ul>
                        </div>

                        {/* 6. Disposições Gerais */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">6. Disposições Gerais</h3>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                <li>A Unyx Ticket reserva-se o direito de modificar estes termos a qualquer momento.</li>
                                <li>A plataforma poderá suspender ou cancelar contas que violem estes termos.</li>
                                <li>Quaisquer disputas serão resolvidas conforme a legislação brasileira.</li>
                            </ul>
                        </div>

                        {/* Acceptance */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-gray-600 text-center">
                                Ao utilizar nossa plataforma, você concorda com todos os termos e condições apresentados acima.
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
                        <p className="text-gray-400 text-sm">© 2025 Unyx Ticket. Todos os direitos reservados.</p>
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
