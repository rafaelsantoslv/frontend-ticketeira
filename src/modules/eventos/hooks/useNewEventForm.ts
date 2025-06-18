import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { eventSchema, type EventFormData } from "../schema/event.schema"
import { eventService } from "../services/eventService"


export function useNewEventForm() {
    const router = useRouter()
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<EventFormData>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            ageRating: "",
            locationName: "",
            locationAddress: "",
            locationCity: "",
            locationState: "",
            locationZip: "",
        },
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            form.setValue("bannerImage", file)
            const reader = new FileReader()
            reader.onload = (e) => setImagePreview(e.target?.result as string)
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        form.setValue("bannerImage", undefined)
        setImagePreview(null)
    }

    const onSubmit = async (data: EventFormData) => {
        setIsSubmitting(true)
        try {
            await eventService.createEvent(data)
            router.push("/painel/eventos")
        } catch (error) {
            console.error("Erro ao criar evento:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        form,
        onSubmit,
        handleImageChange,
        removeImage,
        imagePreview,
        isSubmitting,
    }
}
