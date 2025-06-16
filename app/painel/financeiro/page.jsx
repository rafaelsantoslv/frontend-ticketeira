"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

// Esquema de validação para o formulário de saque
const withdrawalFormSchema = z.object({
    fullName: z.string().min(3, {
        message: "O nome completo deve ter pelo menos 3 caracteres.",
    }),
    pixKey: z.string().min(5, {
        message: "A chave PIX deve ter pelo menos 5 caracteres.",
    }),
    document: z.string().min(11, {
        message: "O CPF deve ter 11 dígitos.",
    }),
    amount: z.coerce
        .number()
        .positive({
            message: "O valor deve ser maior que zero.",
        })
        .max(10000, {
            message: "O valor máximo para saque é de R$ 10.000,00.",
        }),
})

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [withdrawals, setWithdrawals] = useState([
        {
            id: "w1",
            date: "15/06/2023",
            amount: 1500,
            status: "completed",
            pixKey: "email@exemplo.com",
            fullName: "João Silva",
        },
        {
            id: "w2",
            date: "20/06/2023",
            amount: 2300,
            status: "pending",
            pixKey: "12345678900",
            fullName: "Maria Souza",
        },
    ])

    // Dados financeiros do usuário
    const financialData = {
        totalBalance: 5800,
        availableBalance: 3500,
        pendingWithdrawals: 2300,
    }

    const form = useForm({
        resolver: zodResolver(withdrawalFormSchema),
        defaultValues: {
            fullName: "",
            pixKey: "",
            document: "",
            amount: 0,
        },
    })

    function onSubmit(values) {
        setIsSubmitting(true)

        // Verificar se o valor solicitado é maior que o saldo disponível
        if (values.amount > financialData.availableBalance) {
            toast({
                title: "Erro ao solicitar saque",
                description: "O valor solicitado é maior que o saldo disponível.",
                variant: "destructive",
            })
            setIsSubmitting(false)
            return
        }

        // Simular uma chamada de API
        setTimeout(() => {
            const newWithdrawal = {
                id: `w${Date.now()}`,
                date: new Date().toLocaleDateString("pt-BR"),
                amount: values.amount,
                status: "pending",
                pixKey: values.pixKey,
                fullName: values.fullName,
            }

            setWithdrawals([newWithdrawal, ...withdrawals])

            toast({
                title: "Solicitação de saque enviada",
                description: `Sua solicitação de saque de R$ ${values.amount.toFixed(2)} foi enviada com sucesso.`,
            })

            form.reset()
            setIsSubmitting(false)
        }, 1500)
    }

    // Formatar valor monetário
    const formatCurrency = ((value)) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value)
    }

    // Renderizar o status do saque
    const renderWithdrawalStatus = (status) => {
        switch (status) {
            case "pending":
                return <Badge className="bg-yellow-500">Pendente</Badge>
            case "completed":
                return <Badge className="bg-green-500">Concluído</Badge>
            case "rejected":
                return <Badge className="bg-red-500">Rejeitado</Badge>
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
                <p className="text-muted-foreground">Gerencie suas finanças e solicite saques</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(financialData.totalBalance)}</div>
                        <p className="text-xs text-muted-foreground">Valor total acumulado</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Disponível para Saque</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(financialData.availableBalance)}</div>
                        <p className="text-xs text-muted-foreground">Valor disponível para retirada</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Saques Pendentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(financialData.pendingWithdrawals)}</div>
                        <p className="text-xs text-muted-foreground">Valor em processamento</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="solicitar">
                <TabsList>
                    <TabsTrigger value="solicitar">Solicitar Saque</TabsTrigger>
                    <TabsTrigger value="historico">Histórico de Saques</TabsTrigger>
                </TabsList>
                <TabsContent value="solicitar">
                    <Card>
                        <CardHeader>
                            <CardTitle>Solicitar Saque via PIX</CardTitle>
                            <CardDescription>
                                Preencha os dados abaixo para solicitar um saque. O valor será transferido para a chave PIX informada.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome Completo</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Nome completo do destinatário" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="document"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CPF do Destinatário</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="CPF sem pontuação" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="pixKey"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Chave PIX</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="CPF, e-mail, telefone ou chave aleatória" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="amount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Valor do Saque (R$)</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Valor máximo disponível: {formatCurrency(financialData.availableBalance)}
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" className="bg-[#400041] hover:bg-[#5a105b]" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processando...
                                            </>
                                        ) : (
                                            "Solicitar Saque"
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="historico">
                    <Card>
                        <CardHeader>
                            <CardTitle>Histórico de Saques</CardTitle>
                            <CardDescription>Veja o histórico de todas as suas solicitações de saque.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Valor</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Chave PIX</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Destinatário</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {withdrawals.map((withdrawal) => (
                                            <tr
                                                key={withdrawal.id}
                                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                            >
                                                <td className="p-4 align-middle">{withdrawal.id}</td>
                                                <td className="p-4 align-middle">{withdrawal.date}</td>
                                                <td className="p-4 align-middle">{formatCurrency(withdrawal.amount)}</td>
                                                <td className="p-4 align-middle">{withdrawal.pixKey}</td>
                                                <td className="p-4 align-middle">{withdrawal.fullName}</td>
                                                <td className="p-4 align-middle">{renderWithdrawalStatus(withdrawal.status)}</td>
                                            </tr>
                                        ))}
                                        {withdrawals.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                                    Nenhum saque encontrado.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
