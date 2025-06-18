import Link from "next/link"
import { CalendarDays, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"



export function EventListItem({ event }) {
    // Função para renderizar o status do evento
    const renderEventStatus = (status) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-500">Ativo</Badge>
            case "upcoming":
                return <Badge className="bg-blue-500">Em breve</Badge>
            case "completed":
                return <Badge className="bg-gray-500">Concluído</Badge>
            case "canceled":
                return <Badge className="bg-red-500">Cancelado</Badge>
            default:
                return null
        }
    }

    return (
        <Link href={`/painel/eventos/${event.id}`} className="block">
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                    <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
                    <div className="absolute top-2 right-2">{renderEventStatus(event.status)}</div>
                </div>
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center justify-center min-w-[60px] h-16 bg-gray-100 rounded-lg">
                            <span className="text-xs font-semibold uppercase">
                                {format(new Date(event.startDate), "MMM", { locale: ptBR })}
                            </span>
                            <span className="text-xl font-bold">{format(new Date(event.startDate), "dd")}</span>
                            <span className="text-xs">{format(new Date(event.startDate), "yyyy")}</span>
                        </div>
                        <div>
                            <h3 className="font-medium text-lg line-clamp-2">{event.title}</h3>
                            <div className="text-sm text-muted-foreground mt-1 flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span className="line-clamp-1">
                                    {event.venue}, {event.location}
                                </span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1 flex items-center">
                                <CalendarDays className="mr-1 h-3 w-3" />
                                <span>{format(new Date(event.startDate), "p", { locale: ptBR })}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 border-t mt-2">
                    <div className="w-full flex justify-between items-center">

                        <Button variant="ghost" size="sm" className="text-[#400041]">
                            Ver detalhes
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
