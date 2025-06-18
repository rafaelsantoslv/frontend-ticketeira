
import { useEffect, useState } from "react"
import { eventService } from "../services/eventService"
import type { Event, Coupon, Courtesy } from "../types"

export function useEventDetails(eventId: string) {
    const [event, setEvent] = useState<Event | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [expandedSectors, setExpandedSectors] = useState<Record<string, boolean>>({})
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const [courtesies, setCourtesies] = useState<Courtesy[]>([])
    const [isSubmittingCourtesy, setIsSubmittingCourtesy] = useState(false)

    useEffect(() => {
        const fetchEvent = async () => {
            setIsLoading(true)
            const data = await eventService.getEventById(eventId)
            setEvent(data)
            setCoupons(data?.coupons ?? [])
            setCourtesies(data?.courtesies ?? [])
            setIsLoading(false)
        }

        fetchEvent()
    }, [eventId])

    const toggleSectorExpanded = (id: string) => {
        setExpandedSectors(prev => ({ ...prev, [id]: !prev[id] }))
    }

    const updateEvent = (data: Partial<Event>) => {
        if (!event) return
        setEvent(prev => ({ ...prev!, ...data }))
    }

    const addSector = (sectorData) => {
        if (!event) return
        const newSector = { ...sectorData, id: `s${Date.now()}`, batches: [] }
        setEvent({ ...event, sectors: [...event.sectors, newSector] })
        setExpandedSectors((prev) => ({ ...prev, [newSector.id]: true }))
    }

    const addBatch = (batchData) => {
        if (!event) return
        const updatedSectors = [...event.sectors]
        const targetSector = updatedSectors.find(s => s.id === batchData.sectorId)
        if (targetSector) {
            targetSector.batches.push({
                ...batchData,
                id: `b${Date.now()}`,
                sold: 0,
                active: true
            })
            setEvent({ ...event, sectors: updatedSectors })
        }
    }

    const deleteSector = (sectorId: string) => {
        if (!event) return
        const sector = event.sectors.find(s => s.id === sectorId)
        if (sector?.batches?.length) return false
        setEvent({ ...event, sectors: event.sectors.filter(s => s.id !== sectorId) })
        return true
    }

    const deleteBatch = (batchId: string) => {
        if (!event) return
        const updated = event.sectors.map(sector => ({
            ...sector,
            batches: sector.batches.filter(b => b.id !== batchId)
        }))
        setEvent({ ...event, sectors: updated })
    }

    const toggleBatchStatus = (batchId: string) => {
        if (!event) return
        const updated = event.sectors.map(sector => ({
            ...sector,
            batches: sector.batches.map(b =>
                b.id === batchId ? { ...b, active: !b.active } : b
            )
        }))
        setEvent({ ...event, sectors: updated })
    }

    const createCoupon = (data) => {
        const newCoupon = { ...data, id: `c${Date.now()}` }
        setCoupons([...coupons, newCoupon])
    }

    const createCourtesy = (data) => {
        setIsSubmittingCourtesy(true)
        setTimeout(() => {
            const newCourtesy = {
                ...data,
                id: `ct${Date.now()}`,
                ticketCode: "CORT-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
                sent: false
            }
            setCourtesies([...courtesies, newCourtesy])
            setIsSubmittingCourtesy(false)
        }, 1500)
    }

    return {
        event,
        isLoading,
        updateEvent,
        expandedSectors,
        toggleSectorExpanded,
        addSector,
        addBatch,
        deleteSector,
        deleteBatch,
        toggleBatchStatus,
        coupons,
        setCoupons,
        createCoupon,
        courtesies,
        setCourtesies,
        createCourtesy,
        isSubmittingCourtesy
    }
}
