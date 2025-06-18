import { StatCard } from "@/components/StatCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Ban, Check, RefreshCcw, Ticket } from "lucide-react";

export function EventCardOverViewCheckin({ }) {
    return (
        <Card className="bg-white">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Resumo de CheckIns</CardTitle>
            </CardHeader>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total para check-ins" icon={<Ticket className="h-4 w-4 text-muted-foreground" />} value={100} description="Ingressos" />
                <StatCard title="Validados" icon={<Check className="h-4 w-4 text-muted-foreground" />} value={50} description="Ingressos" />
                <StatCard title="Pendentes" icon={<RefreshCcw className="h-4 w-4 text-muted-foreground" />} value={50} description="Ingressos" />
                <StatCard title="Cancelados" icon={<Ban className="h-4 w-4 text-muted-foreground" />} value={0} description="Ingressos" />

            </div>
        </Card>
    )
}