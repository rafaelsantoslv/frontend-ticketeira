import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Clock, Edit, MapPin, Tag, Users } from "lucide-react";

import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button";

export function EventCardInfo({ event, setIsFormOpen }) {
    return (
        <Card className="overflow-hidden p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Lotes</h3>
                <Button className="bg-[#400041] hover:bg-[#5a105b]" onClick={() => setIsFormOpen(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar Evento
                </Button>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                    <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
                </div>
                <div className="md:w-2/3 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="flex items-center text-muted-foreground mb-1">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Data e Hora</span>
                            </div>
                            <p className="font-medium">
                                {format(new Date(event.date), "PPP", { locale: ptBR })} às {event.time}
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center text-muted-foreground mb-1">
                                <MapPin className="mr-2 h-4 w-4" />
                                <span>Local</span>
                            </div>
                            <p className="font-medium">{event.venueName}</p>
                        </div>
                        <div>
                            <div className="flex items-center text-muted-foreground mb-1">
                                <MapPin className="mr-2 h-4 w-4" />
                                <span>Endereço</span>
                            </div>
                            <p className="font-medium">{event.address}</p>
                        </div>
                        <div>
                            <div className="flex items-center text-muted-foreground mb-1">
                                <Tag className="mr-2 h-4 w-4" />
                                <span>Categoria</span>
                            </div>
                            <p className="font-medium">{event.category}</p>
                        </div>
                        <div>
                            <div className="flex items-center text-muted-foreground mb-1">
                                <Users className="mr-2 h-4 w-4" />
                                <span>Classificação</span>
                            </div>
                            <p className="font-medium">{event.ageRating}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center text-muted-foreground mb-1">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>Sobre</span>
                        </div>
                        <p className="text-sm">{event.about}</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}