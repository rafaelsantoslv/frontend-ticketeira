import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns"

export function EventCardRecentSales({ }) {
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
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b pb-3">
                            <div>
                                <p className="font-medium">Comprador {i}</p>
                                <p className="text-sm text-muted-foreground">comprador{i}@email.com</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">{formatCurrency(70 * i)}</p>
                                <p className="text-sm text-muted-foreground">
                                    {format(new Date(2023, 5, 10 + i), "dd/MM/yyyy HH:mm")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}