import { MapPin, Clock, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"
import { formatCurrency } from "@/lib/format"

export function EventCard({ event, featured = false }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return format(date, "dd MMM", { locale: ptBR })
    }

    const formatTime = (dateString) => {
        const date = new Date(dateString)
        return format(date, "HH:mm", { locale: ptBR })
    }

    const getLowestPrice = () => {
        let lowestPrice = Number.POSITIVE_INFINITY
        event.sectors?.forEach((sector) => {
            sector.batches?.forEach((batch) => {
                if (batch.isActive && batch.price < lowestPrice) {
                    lowestPrice = batch.price
                }
            })
        })
        return lowestPrice === Number.POSITIVE_INFINITY ? 0 : lowestPrice
    }

    const lowestPrice = getLowestPrice()

    return (
        <Link href={`/eventos/${event.id}`}>
            <Card
                className={`overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full group ${featured ? "ring-2 ring-blue-500 shadow-lg" : ""
                    }`}
            >
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={event.coverImage || "/placeholder.svg?height=200&width=400"}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Featured Badge */}
                    {featured && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-3 py-1 text-xs font-semibold flex items-center">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Destaque
                        </div>
                    )}

                    {/* Date Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl p-2 shadow-lg">
                        <div className="text-center">
                            <div className="text-xs font-medium text-gray-600 uppercase">
                                {format(new Date(event.startDate), "MMM", { locale: ptBR })}
                            </div>
                            <div className="text-lg font-bold text-gray-900">{format(new Date(event.startDate), "dd")}</div>
                        </div>
                    </div>

                    {/* Price Badge */}
                    {lowestPrice > 0 && (
                        <div className="absolute bottom-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl px-3 py-2 shadow-lg">
                            <div className="text-xs opacity-90">A partir de</div>
                            <div className="text-sm font-bold">{formatCurrency(lowestPrice)}</div>
                        </div>
                    )}
                </div>

                <CardContent className="p-6 space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <Badge
                                variant="secondary"
                                className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0"
                            >
                                {event.category}
                            </Badge>
                            {event.ageRating && (
                                <Badge variant="outline" className="text-xs border-gray-300">
                                    {event.ageRating}
                                </Badge>
                            )}
                        </div>

                        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                            {event.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-700">
                            <Clock className="h-4 w-4 mr-3 text-blue-500" />
                            <span className="font-medium">{formatTime(event.startDate)}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-700">
                            <MapPin className="h-4 w-4 mr-3 text-blue-500" />
                            <span className="line-clamp-1 font-medium">
                                {event.locationName}, {event.locationCity}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
