import { EventCard } from "./EventCard2"

export function FeaturedEvents({ events }) {
    if (!events || events.length === 0) {
        return null
    }

    return (
        <section className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">Eventos em Destaque</h2>
                <p className="text-gray-600">Confira os eventos mais populares do momento</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} featured={true} />
                ))}
            </div>
        </section>
    )
}
