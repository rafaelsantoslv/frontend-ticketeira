"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/format"
import { useTicketSelection } from "@/contexts/TicketSelection"
import { SimpleCheckout } from "@/components/checkout/SimpleCheckout"
import { Trash2 } from "lucide-react"

export function TicketSummary() {
    const { selectedTickets, totalAmount, totalQuantity, removeTicket, clearSelection } = useTicketSelection()
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

    const hasTickets = totalQuantity > 0

    const handleOpenCheckout = () => {
        if (hasTickets) {
            setIsCheckoutOpen(true)
        }
    }

    const handleCloseCheckout = () => {
        setIsCheckoutOpen(false)
    }

    return (
        <>
            <Card className="sticky top-20">
                <CardHeader className="pb-3">
                    <CardTitle className="text-xl">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                    {!hasTickets ? (
                        <div className="text-center py-6">
                            <p className="text-gray-500">Selecione pelo menos um ingresso para continuar.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {Object.values(selectedTickets).map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className="flex justify-between items-start pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                                >
                                    <div>
                                        <h4 className="font-medium text-gray-900">{ticket.name}</h4>
                                        <p className="text-sm text-gray-500">{ticket.sectorName}</p>
                                        <div className="flex items-center mt-1">
                                            <span className="text-sm font-medium">{formatCurrency(ticket.price)}</span>
                                            <span className="text-gray-400 mx-2">×</span>
                                            <span className="text-sm">{ticket.quantity}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="font-medium">{formatCurrency(ticket.price * ticket.quantity)}</span>
                                        <button
                                            onClick={() => removeTicket(ticket.id)}
                                            className="text-red-500 hover:text-red-700 mt-2 text-sm flex items-center transition-colors"
                                        >
                                            <Trash2 className="h-3 w-3 mr-1" />
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-3 border-t border-gray-200">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">{formatCurrency(totalAmount)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Taxa de serviço</span>
                                    <span className="font-medium">{formatCurrency(totalAmount * 0.1)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold mt-4">
                                    <span>Total</span>
                                    <span>{formatCurrency(totalAmount * 1.1)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <Button
                        onClick={handleOpenCheckout}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                        disabled={!hasTickets}
                    >
                        Continuar para Pagamento
                    </Button>
                    {hasTickets && (
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" onClick={clearSelection}>
                            Limpar seleção
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <SimpleCheckout isOpen={isCheckoutOpen} onClose={handleCloseCheckout} />
        </>
    )
}
