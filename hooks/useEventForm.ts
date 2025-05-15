import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { eventFormSchema, EventFormData } from "@/schemas/eventSchema"
import { format, parse } from "date-fns"

export const useEventForm = (initialData?: Partial<EventFormData>) => {
    const form = useForm<EventFormData>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            title: "",
            startDate: "",
            startTime: "19:00",
            endDate: "",
            endTime: "23:00",
            locationName: "",
            locationAddress: "",
            locationCity: "",
            locationState: "",
            locationZip: "",
            ageRating: "livre",
            category: "festa",
            about: "",
            ...initialData
        }
    })

    const handleSubmit = (values: EventFormData) => {
        const formattedData = {
            ...values,
            startDateTime: combineDateTime(values.startDate, values.startTime),
            endDateTime: combineDateTime(values.endDate, values.endTime),
        }
        return formattedData
    }

    const combineDateTime = (date: string, time: string) => {
        const parsedDate = parse(date, "dd/MM/yyyy", new Date())
        const [hours, minutes] = time.split(":")
        return new Date(
            parsedDate.getFullYear(),
            parsedDate.getMonth(),
            parsedDate.getDate(),
            parseInt(hours),
            parseInt(minutes)
        )
    }

    return { form, handleSubmit }
}