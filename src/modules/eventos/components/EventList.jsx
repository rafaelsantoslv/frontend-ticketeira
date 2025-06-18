
import { EventListItem } from "./EventListItem"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { LoadingSpinner } from "../LoadingSpinner"
import { EmptyState } from "@/components/ui/empty-state"
import { Pagination } from "@/components/ui/pagination"


export function EventList({
    events,
    isLoading,
    searchTerm,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
}) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner />
            </div>
        )
    }

    if (totalItems === 0) {
        return (
            <EmptyState
                title="Nenhum evento encontrado"
                description={
                    searchTerm ? "Nenhum evento corresponde aos critérios de busca." : "Você ainda não tem eventos cadastrados."
                }
                action={
                    <Link href="/painel/eventos/novo">
                        <Button className="bg-[#400041] hover:bg-[#5a105b]">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Criar Primeiro Evento
                        </Button>
                    </Link>
                }
            />
        )
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <EventListItem key={event.id} event={event} />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    )
}
