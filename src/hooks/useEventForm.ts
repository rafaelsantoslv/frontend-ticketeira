"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { eventFormSchema, type EventFormValues } from "@/schemas/eventCreateSchema"
import { EventService } from "@/services/eventService"

const eventService = new EventService()

export function useEventForm() {
    const [htmlDescription, setHtmlDescription] = useState("")
    const [formSubmitted, setFormSubmitted] = useState(false)

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
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
            bannerImage: "",
        },
        mode: "onChange",
    })

    // Atualiza o campo de descrição quando o HTML muda
    useEffect(() => {
        if (htmlDescription) {
            form.setValue("description", htmlDescription, { shouldValidate: true })
        }
    }, [htmlDescription, form])

    const onSubmit = async (values: EventFormValues) => {

        try {
            const response = await eventService.createEventMe(values)

            const sendImage = await eventService.uploadImagem(response.data.imageUrl, values.bannerImage)
            console.log(sendImage)
        } catch (error) {
            console.log("deu erro " + error)
        }


        console.log(values)
        // Aqui você pode enviar os dados para sua API
        alert("Evento criado com sucesso!")
        resetForm()
        return values
    }

    const handleSubmit = form.handleSubmit(
        (values) => {
            onSubmit(values)
        },
        () => {
            // Este callback é executado quando há erros de validação
            setFormSubmitted(true)
        },
    )

    const resetForm = () => {
        form.reset()
        setHtmlDescription("")
        setFormSubmitted(false)
    }

    return {
        form,
        formState: form.formState,
        handleSubmit,
        resetForm,
        htmlDescription,
        setHtmlDescription,
        formSubmitted,
        setFormSubmitted,
    }
}
