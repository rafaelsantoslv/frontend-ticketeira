import { EmptyEventsList } from "./empty-event-list";
import { EventsGrid } from "./events-grid";
import { LoadingSpinner } from "../loading-spinner";

export function EventContent({ isLoading, searchTerm, filteredEvents }) {
    if (isLoading) {
        return <LoadingSpinner />
    }
    if (filteredEvents.length === 0) {
        return <EmptyEventsList searchTerm={searchTerm} />
    }
    return <EventsGrid events={filteredEvents} />
}