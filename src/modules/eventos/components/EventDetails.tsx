import { CalendarDays, MapPin, Clock, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"




export function EventDetails({ event }) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return format(date, "HH:mm", { locale: ptBR })
    }

    return (
        <div className="space-y-6">
            <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden">
                <img
                    src={event.coverImage || "/placeholder.svg?height=400&width=800"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div>
                <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-[#400041]">{event.category}</Badge>
                    {event.ageRating && (
                        <Badge variant="outline" className="border-[#400041] text-[#400041]">
                            {event.ageRating}
                        </Badge>
                    )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                        <CalendarDays className="h-5 w-5 mr-2 text-[#400041]" />
                        <span>{formatDate(event.startDate)}</span>
                    </div>

                    <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-[#400041]" />
                        <span>{formatTime(event.startDate)}</span>
                    </div>

                    <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-[#400041]" />
                        <span>
                            {event.locationName}, {event.locationCity}
                        </span>
                    </div>

                    {event.ageRating && (
                        <div className="flex items-center">
                            <Info className="h-5 w-5 mr-2 text-[#400041]" />
                            <span>Classificação: {event.ageRating}</span>
                        </div>
                    )}
                </div>

                <div className="prose max-w-none">
                    <h2 className="text-xl font-semibold mb-2">Sobre o evento</h2>
                    <div dangerouslySetInnerHTML={{ __html: event.description }} />
                </div>

                {event.locationAddress && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Local</h2>
                        <p>{event.locationAddress}</p>
                        {event.locationCoordinates && (
                            <div className="mt-4 h-64 bg-gray-200 rounded-lg">
                                {/* Aqui poderia ser integrado um mapa */}
                                <div className="h-full flex items-center justify-center">
                                    <span className="text-gray-500">Mapa do local</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
