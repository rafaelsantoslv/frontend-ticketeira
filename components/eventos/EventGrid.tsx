// components/eventos/EventsGrid.tsx
import Link from 'next/link';
import { EventCard } from './EventCard';
import { Event } from '@/types/event';

interface EventsGridProps {
    events: Event[];
}

export function EventsGrid({
    events
}: EventsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {events.map((event) => (
                <Link href={`/painel/eventos/${event.id}`} key={event.id}>
                    <EventCard
                        key={event.id}
                        event={event}
                    />
                </Link>
            ))}
        </div>
    );
}