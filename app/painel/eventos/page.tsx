"use client"

import { PainelHeader } from "@/components/painel-header"
import { EventSearch } from "@/components/eventos/EventSearch"
import { useEvents } from "@/hooks/useEvent"
import { LoadingSpinner } from "@/components/loading-spinner"
import { EventEmptyList } from "@/components/eventos/EventEmptyList"
import { EventsGrid } from "@/components/eventos/EventGrid"


export default function EventosPage() {

    const { filteredEvents, searchTerm, setSearchTerm, isLoading } = useEvents()


    return (
        <div className="space-y-6">
            {/* Cabeçalho da página */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <PainelHeader name={"Meus Eventos"} title={"Gerencie todos os seus eventos em um só lugar"} />
                <EventSearch nameAction={"Criar Novo Evento"} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            </div>

            {/* Lista de eventos em cards */}
            {isLoading ? (
                <LoadingSpinner />
            ) : filteredEvents.length === 0 ? (
                <EventEmptyList searchTerm={searchTerm} />
            ) : (
                <EventsGrid events={filteredEvents} />
            )}
        </div>
    )
}
