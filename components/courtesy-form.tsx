"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "O nome deve ter pelo menos 2 caracteres.",
    }),
    lastName: z.string().min(2, {
        message: "O sobrenome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Email inválido.",
    }),
    sectorId: z.string({
        required_error: "Por favor, selecione um setor",
    }),
})

type Sector = {
    id: string
    name: string
}

type CourtesyFormProps = {
    onSubmit: (data: z.infer<typeof formSchema>) => void
    sectors: Sector[]
    isSubmitting?: boolean
}

export default function CourtesyForm({ onSubmit, sectors, isSubmitting = false }: CourtesyFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            sectorId: "",
        },
    })

    function handleSubmit(values: z.infer<typeof formSchema>) {
        onSubmit(values)
        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: João" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sobrenome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: Silva" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Ex: joao.silva@email.com" {...field} />
                            </FormControl>
                            <FormDescription>O ingresso cortesia será enviado para este email.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sectorId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Setor</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um setor" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {sectors.map((sector) => (
                                        <SelectItem key={sector.id} value={sector.id}>
                                            {sector.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>Selecione o setor para o ingresso cortesia</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-[#400041] hover:bg-[#5a105b]" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Gerando...
                        </>
                    ) : (
                        "Gerar Cortesia"
                    )}
                </Button>
            </form>
        </Form>
    )
}
