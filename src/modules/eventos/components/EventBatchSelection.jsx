"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { useTicketSelection } from "@/contexts/TicketSelection"

export function BatchSelection({ batch, sector }) {
    const [quantity, setQuantity] = useState(0)
    const { addTicket, removeTicket, selectedTickets } = useTicketSelection()

    // Verificar se este ingresso já está no carrinho
    const existingTicket = selectedTickets[batch.id]
    const currentQuantity = existingTicket ? existingTicket.quantity : 0

    const handleAddTicket = () => {
        const ticket = {
            id: batch.id,
            name: batch.name,
            sectorId: sector.id,
            sectorName: sector.name,
            price: batch.price,
            eventId: batch.eventId,
        }
        addTicket(ticket)
    }

    const handleRemoveTicket = () => {
        removeTicket(batch.id)
    }

    // Calcular disponibilidade
    const available = batch.quantity - batch.soldQuantity
    const isAvailable = batch.isActive && available > 0

    return (
        <Card
            className={`overflow-hidden transition-all duration-200 ${currentQuantity > 0 ? "border-blue-300 shadow-md" : "border-gray-200"
                }`}
        >
            <CardContent className="p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="font-medium text-gray-900">{batch.name}</h4>
                        <p className="text-sm text-gray-500">{sector.name}</p>
                        <p className="text-lg font-bold text-blue-600 mt-1">{formatCurrency(batch.price)}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className={`h-8 w-8 rounded-full ${currentQuantity > 0
                                ? "border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
                                : "border-gray-200 text-gray-400"
                                }`}
                            onClick={handleRemoveTicket}
                            disabled={currentQuantity === 0}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>

                        <span className="w-8 text-center font-medium">{currentQuantity}</span>

                        <Button
                            variant="outline"
                            size="icon"
                            className={`h-8 w-8 rounded-full ${isAvailable
                                ? "border-green-300 text-green-500 hover:bg-green-50 hover:text-green-600"
                                : "border-gray-200 text-gray-400"
                                }`}
                            onClick={handleAddTicket}
                            disabled={!isAvailable}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {!isAvailable && (
                    <div className="mt-2">
                        <span className="text-xs text-red-500 font-medium">Esgotado</span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
