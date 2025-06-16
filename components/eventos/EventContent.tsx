// components/eventos/EventContent.tsx
import { LoadingSpinner } from '../LoadingSpinner';
import { EventEmptyList } from './EventEmptyList';
import { EventsGrid } from './EventGrid';
import { Event } from '@/types/Event';

interface EventContentProps {
    isLoading: boolean;
    searchTerm: string;
    filteredEvents: Event[];
    onUpdateEvent: (eventData: Partial<Event>) => Promise<void>;
    onDeleteEvent: () => Promise<void>;
    onPublishToggle: () => Promise<void>;
    onFeatureToggle: () => Promise<void>;
}

export function EventContent({
    isLoading,
    searchTerm,
    filteredEvents,
    onUpdateEvent,
    onDeleteEvent,
    onPublishToggle,
    onFeatureToggle
}: EventContentProps) {
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (filteredEvents.length === 0) {
        return <EventEmptyList searchTerm={searchTerm} />;
    }

    return (
        <EventsGrid
            events={filteredEvents}
            onUpdateEvent={onUpdateEvent}
            onDeleteEvent={onDeleteEvent}
            onPublishToggle={onPublishToggle}
            onFeatureToggle={onFeatureToggle}
        />
    );
}