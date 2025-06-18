"use client"

import { PainelHeader } from "@/components/PainelHeader"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { Pagination } from "@/components/ui/pagination"
import { EventSearch } from "@/modules/eventos/components/EventSearch"
import { EventEmptyList } from "@/modules/eventos/components/EventEmptyList"
import { EventsGrid } from "@/modules/eventos/components/EventGrid"
import { useEventList } from "@/modules/eventos/hooks/useEventList" // novo hook

export default function EventosPage() {
    const {
        events,
        searchTerm,
        setSearchTerm,
        isLoading,
        page,
        setPage,
        totalPages,
        totalItems,
        itemsPerPage,
    } = useEventList(6) // padrão de 6 por página

    return (
        <div className="space-y-6">
            {/* Cabeçalho da página */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <PainelHeader
                    name="Meus Eventos"
                    title="Gerencie todos os seus eventos em um só lugar"
                />
                <EventSearch
                    nameAction="Criar Novo Evento"
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </div>

            {/* Lista de eventos */}
            {isLoading ? (
                <LoadingSpinner />
            ) : events.length === 0 ? (
                <EventEmptyList searchTerm={searchTerm} />
            ) : (
                <>
                    <EventsGrid events={events} />
                    <Pagination
                        currentPage={page}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            )}
        </div>
    )
}
