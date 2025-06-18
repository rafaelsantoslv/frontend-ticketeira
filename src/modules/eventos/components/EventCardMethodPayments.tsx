import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { CreditCard, QrCode, Receipt } from "lucide-react";

export function EventCardMethodPayments({ event }) {
    return (
        <Card className="bg-white">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Métodos de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Cartão de Crédito */}
                    <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-3 text-[#400041]" />
                            <div>
                                <p className="font-medium">Cartão de Crédito</p>
                                <p className="text-sm text-muted-foreground">Visa, Mastercard, Elo</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-medium">156 ingressos</p>
                            <p className="text-sm text-muted-foreground">{formatCurrency(7800)}</p>
                        </div>
                    </div>

                    {/* PIX */}
                    <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center">
                            <QrCode className="h-5 w-5 mr-3 text-[#400041]" />
                            <div>
                                <p className="font-medium">PIX</p>
                                <p className="text-sm text-muted-foreground">Pagamento instantâneo</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-medium">82 ingressos</p>
                            <p className="text-sm text-muted-foreground">{formatCurrency(4100)}</p>
                        </div>
                    </div>

                    {/* Boleto */}
                    <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center">
                            <Receipt className="h-5 w-5 mr-3 text-[#400041]" />
                            <div>
                                <p className="font-medium">Boleto</p>
                                <p className="text-sm text-muted-foreground">Pagamento bancário</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-medium">20 ingressos</p>
                            <p className="text-sm text-muted-foreground">{formatCurrency(680)}</p>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="font-semibold text-[#400041]">Total</div>
                        <div className="text-right">
                            <p className="font-semibold">{event.metrics.totalSales} ingressos</p>
                            <p className="font-semibold">{formatCurrency(event.metrics.totalValue)}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}