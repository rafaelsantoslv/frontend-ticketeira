import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function EventCard({ event }) {
    const renderEventStatus = (status: boolean) => {
        switch (status) {
            case true:
                return <Badge className="bg-green-500">Ativo</Badge>
            case false:
                return <Badge className="bg-red-500">Inativo</Badge>
            default:
                return null
        }
    }
    return (
        <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48 w-full">
                <img
                    src={event.imageUrl || "/placeholder.svg"}
                    alt={event.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2">{renderEventStatus(event.isPublished)}</div>
            </div>
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center justify-center min-w-[60px] h-16 bg-gray-100 rounded-lg">
                        <span className="text-xs font-semibold uppercase">
                            {format(event.startDate, "MMM", { locale: ptBR })}
                        </span>
                        <span className="text-xl font-bold">{format(event.startDate, "dd")}</span>
                        <span className="text-xs">{format(event.startDate, "yyyy")}</span>
                    </div>
                    <div>
                        <h3 className="font-medium text-lg line-clamp-2">{event.title}</h3>
                        <div className="text-sm text-muted-foreground mt-1 flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span className="line-clamp-1">
                                {event.locationName}, {event.locationCity}, {event.locationState}
                            </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 flex items-center">
                            <CalendarDays className="mr-1 h-3 w-3" />
                            <span>{format(event.startDate, "p", { locale: ptBR })}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 border-t mt-2">
                <div className="w-full flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{event.soldQuantity > 0 ? event.soldQuantity + " Ingressos vendidos" : "Nenhum ingresso vendido"}</span>
                    <Button variant="ghost" size="sm" className="text-[#400041]">
                        Ver detalhes
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}