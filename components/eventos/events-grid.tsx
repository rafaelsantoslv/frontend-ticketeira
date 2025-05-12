import Link from "next/link";
import { CardEvent } from "./card-event";

export function EventsGrid({ events }) {
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
            <Link href={`/painel/eventos/${event.id}`} key={event.id} className="block">
                <CardEvent event={event} />
            </Link>
        ))}
    </div>
}