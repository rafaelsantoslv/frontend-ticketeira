"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/format"
import { useCheckout } from "@/hooks/useCheckout"
import { Separator } from "@/components/ui/separator"

export function OrderSummary() {
    const { selectedTickets, totalAmount } = useCheckout()

    if (selectedTickets.length === 0) {
        return null
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Resumo do pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {selectedTickets.map((ticket) => (
                    <div key={ticket.batchId} className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">{ticket.batchName}</p>
                            <p className="text-sm text-gray-500">{ticket.sectorName}</p>
                            <p className="text-sm">
                                {ticket.quantity} x {formatCurrency(ticket.price)}
                            </p>
                        </div>
                        <span className="font-semibold">{formatCurrency(ticket.price * ticket.quantity)}</span>
                    </div>
                ))}

                <Separator />

                <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(totalAmount)}</span>
                </div>
            </CardContent>
        </Card>
    )
}
