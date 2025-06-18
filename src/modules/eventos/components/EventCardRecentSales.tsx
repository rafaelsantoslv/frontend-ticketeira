import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns"

export function EventCardRecentSales({ event }) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Vendas Recentes</CardTitle>
                    <Button variant="ghost" size="sm" className="text-[#400041]">
                        Ver todas
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {event.sales.map((sales) => (
                        <div key={sales.id} className="flex items-center justify-between border-b pb-3">
                            <div>
                                <p className="font-medium">{sales.name}</p>
                                <p className="text-sm text-muted-foreground">{sales.email}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">{formatCurrency(sales.amount)}</p>
                                <p className="text-sm text-muted-foreground">
                                    {format(sales.date, "dd/MM/yyyy HH:mm")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}