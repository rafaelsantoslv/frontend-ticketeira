"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
    code: z.string().min(3, {
        message: "O código deve ter pelo menos 3 caracteres.",
    }),
    discountType: z.enum(["percentage", "fixed"]),
    discountValue: z.coerce.number().min(0, {
        message: "O valor do desconto não pode ser negativo.",
    }),
    unlimited: z.boolean().default(false),
    usageLimit: z.coerce
        .number()
        .min(1, {
            message: "O limite de uso deve ser pelo menos 1.",
        })
        .optional(),
    active: z.boolean().default(true),
})

export default function CouponForm({ onSubmit }) {
    const [isGenerating, setIsGenerating] = useState(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
            discountType: "percentage",
            discountValue: 10,
            unlimited: false,
            usageLimit: 1,
            active: true,
        },
    })

    const watchDiscountType = form.watch("discountType")
    const watchUnlimited = form.watch("unlimited")

    function handleSubmit(values) {
        // Se for ilimitado, remova o limite de uso
        if (values.unlimited) {
            values.usageLimit = undefined
        }

        onSubmit(values)
        form.reset()
        toast({
            title: "Cupom criado com sucesso!",
            description: `O cupom "${values.code}" foi criado.`,
        })
    }

    function generateRandomCode() {
        setIsGenerating(true)

        // Simular uma chamada de API para gerar um código
        setTimeout(() => {
            const randomCode = "PROMO" + Math.random().toString(36).substring(2, 8).toUpperCase()
            form.setValue("code", randomCode)
            setIsGenerating(false)
        }, 500)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código do Cupom</FormLabel>
                            <div className="flex gap-2">
                                <FormControl>
                                    <Input placeholder="Ex: PROMO10" {...field} />
                                </FormControl>
                                <Button type="button" variant="outline" onClick={generateRandomCode} disabled={isGenerating}>
                                    {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                                    {isGenerating ? "Gerando..." : "Gerar"}
                                </Button>
                            </div>
                            <FormDescription>Digite um código ou clique em "Gerar" para criar um código aleatório.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="discountType"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Tipo de Desconto</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="percentage" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Percentual (%)</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="fixed" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Valor Fixo (R$)</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="discountValue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {watchDiscountType === "percentage" ? "Percentual de Desconto (%)" : "Valor do Desconto (R$)"}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={0}
                                    max={watchDiscountType === "percentage" ? 100 : undefined}
                                    step={watchDiscountType === "percentage" ? 1 : 0.01}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                {watchDiscountType === "percentage"
                                    ? "Insira um valor entre 1 e 100%."
                                    : "Insira o valor do desconto em reais."}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="unlimited"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Uso Ilimitado</FormLabel>
                                <FormDescription>O cupom pode ser usado sem limite de vezes.</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {!watchUnlimited && (
                    <FormField
                        control={form.control}
                        name="usageLimit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Limite de Uso</FormLabel>
                                <FormControl>
                                    <Input type="number" min={1} {...field} />
                                </FormControl>
                                <FormDescription>Quantas vezes este cupom pode ser utilizado.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Status do Cupom</FormLabel>
                                <FormDescription>
                                    {field.value ? "Cupom ativo e disponível para uso" : "Cupom inativo e indisponível para uso"}
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-[#400041] hover:bg-[#5a105b]">
                    Criar Cupom
                </Button>
            </form>
        </Form>
    )
}