"use client"

import { useState, useEffect } from "react"
import type { FieldErrors } from "react-hook-form"
import { type EventFormValues, formFieldGroups } from "@/schemas/eventCreateSchema"

export function useFormErrors(errors: FieldErrors<EventFormValues>, formSubmitted: boolean) {
    const [activeTab, setActiveTab] = useState("details")

    // Verificar se há erros em cada aba
    const hasDetailsErrors = formSubmitted && formFieldGroups.details.some((field) => field in errors)
    const hasDatetimeErrors = formSubmitted && formFieldGroups.datetime.some((field) => field in errors)
    const hasLocationErrors = formSubmitted && formFieldGroups.location.some((field) => field in errors)

    // Efeito para mudar para a primeira aba com erro após submissão
    useEffect(() => {
        if (formSubmitted) {
            if (hasDetailsErrors) {
                setActiveTab("details")
            } else if (hasDatetimeErrors) {
                setActiveTab("datetime")
            } else if (hasLocationErrors) {
                setActiveTab("location")
            }
        }
    }, [formSubmitted, hasDetailsErrors, hasDatetimeErrors, hasLocationErrors])

    return {
        activeTab,
        setActiveTab,
        hasDetailsErrors,
        hasDatetimeErrors,
        hasLocationErrors,
    }
}
