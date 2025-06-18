"use client"

import { Button } from "@/components/ui/button"

type Props = {
    activeTab: "details" | "datetime" | "location"
    setActiveTab: (tab: "details" | "datetime" | "location") => void
    isSubmitting: boolean
    onCancel: () => void
}

const TAB_ORDER: ("details" | "datetime" | "location")[] = ["details", "datetime", "location"]

export function FormStepperActions({ activeTab, setActiveTab, isSubmitting, onCancel }: Props) {
    const currentIndex = TAB_ORDER.indexOf(activeTab)

    const hasPrevious = currentIndex > 0
    const hasNext = currentIndex < TAB_ORDER.length - 1

    const goToPrevious = () => {
        if (hasPrevious) setActiveTab(TAB_ORDER[currentIndex - 1])
    }

    const goToNext = () => {
        if (hasNext) setActiveTab(TAB_ORDER[currentIndex + 1])
    }

    return (
        <div className="flex justify-between pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
            </Button>

            <div className="flex gap-2">
                {hasPrevious && (
                    <Button type="button" variant="outline" onClick={goToPrevious}>
                        Voltar
                    </Button>
                )}

                {hasNext ? (
                    <Button type="button" onClick={goToNext}>
                        Próximo
                    </Button>
                ) : (
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Salvando..." : "Salvar Evento"}
                    </Button>
                )}
            </div>
        </div>
    )
}
