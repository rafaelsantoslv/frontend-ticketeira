import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/utils/formatCurrency"
import type { Event } from "@/modules/eventos/types"

type Props = {
    event: Event
}

export function EventCardSalesSector({ event }: Props) {
    return (
        <Card className="bg-white">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Vendas por Setor</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {event.sectors.map((sector) => {
                        const sectorBatches = sector.batches
                        const totalSold = sectorBatches.reduce((sum, b) => sum + b.sold, 0)
                        const totalRevenue = sectorBatches.reduce((sum, b) => sum + b.sold * b.price, 0)

                        return (
                            <div key={sector.id} className="space-y-2">
                                {/* Cabeçalho do setor */}
                                <div className="grid grid-cols-3 border-b pb-2">
                                    <div className="font-semibold text-lg text-[#400041] text-left pl-4">{sector.name}</div>
                                    <div className="text-base font-semibold text-left pl-4">{totalSold} ingressos</div>
                                    <div className="text-base font-semibold text-left pl-4">{formatCurrency(totalRevenue)}</div>
                                </div>

                                {/* Lotes do setor */}
                                <div className="space-y-1">
                                    {sectorBatches.map((batch) => {
                                        const batchTotal = batch.sold * batch.price
                                        return (
                                            <div key={batch.id} className="grid grid-cols-3 py-1 text-sm">
                                                <div className="font-medium text-gray-600 text-left pl-4">{batch.name}</div>
                                                <div className="text-gray-500 text-left pl-4">
                                                    {batch.sold} x {formatCurrency(batch.price)}
                                                </div>
                                                <div className="text-gray-600 text-left pl-4">{formatCurrency(batchTotal)}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}

                    {/* Total geral do evento */}
                    <div className="grid grid-cols-3 border-t pt-3 mt-4 font-semibold text-base">
                        <div className="text-[#400041] text-left pl-4">Total</div>
                        <div className="text-left pl-4">{event.metrics.totalTickets} ingressos</div>
                        <div className="text-left pl-4">{formatCurrency(event.metrics.totalValue)}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
