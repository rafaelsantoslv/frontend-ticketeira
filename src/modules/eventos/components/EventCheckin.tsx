
import type { Event } from "@/modules/eventos/types"
import { TabsContent } from "@/components/ui/tabs"
import { EventCardOverViewCheckin } from "./EventCardOverViewCheckin"

import { useCheckins } from "../hooks/useCheckin"
import { CheckinTable } from "./EventCheckInTable"

type Props = {
    event: Event
}

export function EventCheckin({ event }: Props) {
    const {
        checkins,
        filtered,
        selected,
        stats,
        searchTerm,
        statusFilter,
        sectorFilter,
        loading,
        setSearchTerm,
        setStatusFilter,
        setSectorFilter,
        toggleSelectAll,
        toggleSelect,
        validate,
        cancel,
        bulk,
        getStatusBadge,
    } = useCheckins(event.checkins)

    return (
        <TabsContent value="checkins">
            <div className="space-y-6">
                <EventCardOverViewCheckin stats={stats} />
                <CheckinTable
                    checkins={filtered}
                    selected={selected}
                    searchTerm={searchTerm}
                    sectorFilter={sectorFilter}
                    statusFilter={statusFilter}
                    setSearchTerm={setSearchTerm}
                    setSectorFilter={setSectorFilter}
                    setStatusFilter={setStatusFilter}
                    toggleSelectAll={toggleSelectAll}
                    toggleSelect={toggleSelect}
                    onValidate={validate}
                    onCancel={cancel}
                    onBulkAction={bulk}
                    getStatusBadge={getStatusBadge}
                    loading={loading}
                    sectors={event.sectors}
                />
            </div>
        </TabsContent>
    )
}
