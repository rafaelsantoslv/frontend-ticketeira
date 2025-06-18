"use client"

import { usePublicEvents } from "@/hooks/usePublicEvents"
import { PublicHeader } from "@/components/public/PublicHeader"
import { EventList } from "@/components/eventos/EventList"
import { FeaturedEvents } from "@/components/eventos/EventFeatured"

export default function EventosPage() {
    const {
        paginatedEvents,
        featuredEvents,
        isLoading,
        searchTerm,
        setSearchTerm,
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        onPageChange,
    } = usePublicEvents()

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <PublicHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} showSearch={true} />

            <div className="container mx-auto px-4 py-8">
                <div className="space-y-12">
                    {/* Hero Section */}
                    <div className="text-center space-y-4 py-8">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Descubra Eventos Incríveis
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Encontre os melhores eventos da sua região e garante já o seu ingresso
                        </p>
                    </div>

                    {/* Featured Events */}
                    <FeaturedEvents events={featuredEvents} />

                    {/* All Events */}
                    <section className="space-y-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-gray-900">Todos os Eventos</h2>
                            <p className="text-gray-600">Explore nossa seleção completa de eventos</p>
                        </div>

                        <EventList
                            events={paginatedEvents}
                            isLoading={isLoading}
                            searchTerm={searchTerm}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                            onPageChange={onPageChange}
                        />
                    </section>
                </div>
            </div>
        </div>
    )
}
