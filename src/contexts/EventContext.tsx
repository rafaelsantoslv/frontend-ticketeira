import { createContext, useContext, useState } from "react";

const EventContext = createContext()

export function EventProvider({ children }) {
    const [eventCreated, setEventCreated] = useState(false);
    const [eventError, setEventError] = useState(null);
    const [refreshEvents, setRefreshEvents] = useState(false);

    const notifyEventCreated = () => {
        setEventCreated(true);
        setEventError(null);
        setRefreshEvents(true);
    };

    const notifyEventError = (error) => {
        setEventError(error);
        setEventCreated(false);
    };

    const confirmEventsRefreshed = () => {
        setRefreshEvents(false);
    };

    return (
        <EventContext.Provider value={{
            eventCreated,
            eventError,
            refreshEvents,
            notifyEventCreated,
            notifyEventError,
            confirmEventsRefreshed
        }}>
            {children}
        </EventContext.Provider>
    );
}

export function useEventContext() {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEventContext deve ser usado dentro de um EventProvider');
    }
    return context;
}