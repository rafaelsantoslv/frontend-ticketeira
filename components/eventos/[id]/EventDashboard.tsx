import { TabsContent } from "@radix-ui/react-tabs";
import { EventCardOverview } from "./EventCardOverview";
import { EventCardSalesSector } from "./EventCardSalesSector";
import { EventCardMethodPayments } from "./EventCardMethodPayments";
import { EventCardRecentSales } from "./EventCardRecentSales";

export function EventDashboard({ getBatchesBySector, getSectorStats, event }) {

    return (
        <TabsContent value="dashboard">
            <div className="space-y-6">
                {/* Resumo geral */}
                <EventCardOverview event={event} />
                {/* Vendas por Setor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <EventCardSalesSector event={event} getBatchesBySector={getBatchesBySector} getSectorStats={getSectorStats} />
                    <EventCardMethodPayments event={event} />
                </div>
                <EventCardRecentSales />
            </div>
        </TabsContent>
    )
}