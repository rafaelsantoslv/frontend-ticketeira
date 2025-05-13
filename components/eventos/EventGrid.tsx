// components/eventos/EventsGrid.tsx
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
                <EventCard
                    key={event.id}
                    event={event}
                />
            ))}
        </div>
    );
}