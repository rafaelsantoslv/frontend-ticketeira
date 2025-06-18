"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { useNewEventForm } from "@/modules/eventos/hooks/useNewEventForm"
import {
    EventFormTabDetails,
    EventFormTabDatetime,
    EventFormTabLocation,
} from "@/modules/eventos/components/forms/EventFormTabs"
import { FormStepperActions } from "@/modules/eventos/components/forms/FormStepperActions"


export default function NovoEventoPage() {
    const router = useRouter()

    const {
        form,
        onSubmit,
        imagePreview,
        removeImage,
        handleImageChange,
        isSubmitting,
        activeTab,
        setActiveTab,
        hasDetailsErrors,
        hasDatetimeErrors,
        hasLocationErrors,
    } = useNewEventForm()

    return (
        <div className="container max-w-4xl mx-auto py-6 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => router.push("/painel/eventos")}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Criar Novo Evento</h1>
                    <p className="text-muted-foreground">Preencha as informações do seu evento</p>
                </div>
            </div>

            <Card>
                <CardContent className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="details" className="relative">
                                        Detalhes
                                        {hasDetailsErrors && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />}
                                    </TabsTrigger>
                                    <TabsTrigger value="datetime" className="relative">
                                        Data e Hora
                                        {hasDatetimeErrors && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />}
                                    </TabsTrigger>
                                    <TabsTrigger value="location" className="relative">
                                        Localização
                                        {hasLocationErrors && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />}
                                    </TabsTrigger>
                                </TabsList>

                                <div className="mt-6">
                                    <TabsContent value="details">
                                        <EventFormTabDetails
                                            imagePreview={imagePreview}
                                            onImageRemove={removeImage}
                                            onImageChange={handleImageChange}
                                        />
                                    </TabsContent>

                                    <TabsContent value="datetime">
                                        <EventFormTabDatetime />
                                    </TabsContent>

                                    <TabsContent value="location">
                                        <EventFormTabLocation />
                                    </TabsContent>
                                </div>
                            </Tabs>

                            <FormStepperActions
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                isSubmitting={isSubmitting}
                                onCancel={() => router.push("/painel/eventos")}
                            />
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
