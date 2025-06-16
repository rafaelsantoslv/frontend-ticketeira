import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";

export function EventCardSalesSector({ event, getBatchesBySector, getSectorStats }) {
    return (
        <Card className="bg-white">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Vendas por Setor</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {event.sectors.map((sector) => {
                        const sectorBatches = getBatchesBySector(sector.id)
                        const stats = getSectorStats(sector.id)

                        return (
                            <div key={sector.id} className="space-y-2">
                                {/* Cabeçalho do setor */}
                                <div className="grid grid-cols-3 border-b pb-2">
                                    <div className="font-semibold text-lg text-[#400041] text-left pl-4">{sector.name}</div>
                                    <div className="text-base font-semibold text-left pl-4">{stats.totalSold} ingressos</div>
                                    <div className="text-base font-semibold text-left pl-4">{formatCurrency(stats.totalRevenue)}</div>
                                </div>

                                {/* Lotes do setor */}
                                <div className="space-y-1">
                                    {sectorBatches.map((batch) => {
                                        const batchTotal = batch.sold * batch.price;
                                        return (
                                            <div key={batch.id} className="grid grid-cols-3 py-1 text-sm">
                                                <div className="font-medium text-gray-600 text-left pl-4">{batch.name}</div>
                                                <div className="text-gray-500 text-left pl-4">
                                                    {batch.sold} x {formatCurrency(batch.price)}
                                                </div>
                                                <div className="text-gray-600 text-left pl-4">{formatCurrency(batchTotal)}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    <div className="grid grid-cols-3 border-t pt-3 mt-4 font-semibold text-base">
                        <div className="text-[#400041] text-left pl-4">Total</div>
                        <div className="text-left pl-4">{event.stats.totalSold} ingressos</div>
                        <div className="text-left pl-4">{formatCurrency(event.stats.totalRevenue)}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}