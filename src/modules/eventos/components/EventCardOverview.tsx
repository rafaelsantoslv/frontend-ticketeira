import { StatCard } from "@/components/StatCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import { Check, DollarSign, Ticket, TicketMinusIcon } from "lucide-react";

export function EventCardOverview({ event }) {
    return (
        <Card className="bg-white">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Resumo de Vendas</CardTitle>
            </CardHeader>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total de Ingressos" icon={<Ticket className="h-4 w-4 text-muted-foreground" />} value={event.metrics.totalSales} description="Emitidos" />
                <StatCard title="Ticket Médio" icon={<TicketMinusIcon className="h-4 w-4 text-muted-foreground" />} value={formatCurrency(event.metrics.averageTicket)} />
                <StatCard title="Check-ins" icon={<Check className="h-4 w-4 text-muted-foreground" />} value={`${event.metrics.totalSales} / ${event.metrics.totalCheckins}`}
                    description="Validados" />
                <StatCard title="Valor Total" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value={formatCurrency(event.metrics.totalValue)} description="Arrecadado" />
            </div>
        </Card>
    )
}