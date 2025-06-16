"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCheckout, type CustomerInfo, type PaymentMethod } from "@/hooks/useCheckout"
import { formatCurrency } from "@/lib/format"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { CreditCard, QrCode } from "lucide-react"

export function CheckoutForm() {
    const {
        selectedTickets,
        totalAmount,
        paymentMethod,
        setPaymentMethod,
        customerInfo,
        updateCustomerInfo,
        processPayment,
        isLoading,
        pixCode,
        orderId,
    } = useCheckout()

    const [errors, setErrors] = useState < Partial < Record < keyof CustomerInfo, string>>> ({})

    const validateField = (field: keyof CustomerInfo, value: string) => {
        if (!value.trim()) {
            return `${field.charAt(0).toUpperCase() + field.slice(1)} é obrigatório`
        }

        if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Email inválido"
        }

        if (field === "document" && !/^\d{11}$|^\d{14}$/.test(value.replace(/\D/g, ""))) {
            return "CPF/CNPJ inválido"
        }

        if (field === "phone" && !/^\d{10,11}$/.test(value.replace(/\D/g, ""))) {
            return "Telefone inválido"
        }

        return ""
    }

    const handleInputChange = (field: keyof CustomerInfo, value: string) => {
        updateCustomerInfo({ [field]: value })

        const error = validateField(field, value)
        setErrors((prev) => ({
            ...prev,
            [field]: error,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validar todos os campos
        const newErrors: Partial<Record<keyof CustomerInfo, string>> = {}
        let hasErrors = false

        Object.entries(customerInfo).forEach(([field, value]) => {
            const error = validateField(field as keyof CustomerInfo, value)
            if (error) {
                newErrors[field as keyof CustomerInfo] = error
                hasErrors = true
            }
        })

        setErrors(newErrors)

        if (!hasErrors) {
            processPayment()
        }
    }

    if (pixCode) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Pagamento via PIX</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center">
                        <p className="mb-4">Escaneie o QR Code abaixo ou copie o código PIX para realizar o pagamento:</p>
                        <div className="bg-white p-4 rounded-lg mx-auto w-64 h-64 flex items-center justify-center border">
                            <img src={pixCode || "/placeholder.svg"} alt="QR Code PIX" className="max-w-full max-h-full" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="pix-code">Código PIX</Label>
                        <div className="flex">
                            <Input id="pix-code" value={pixCode} readOnly className="flex-1" />
                            <Button
                                variant="outline"
                                className="ml-2"
                                onClick={() => {
                                    navigator.clipboard.writeText(pixCode)
                                }}
                            >
                                Copiar
                            </Button>
                        </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                            Após realizar o pagamento, você receberá a confirmação por email. O pagamento pode levar alguns minutos
                            para ser processado.
                        </p>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                        <p>Pedido #{orderId}</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Informações de pagamento</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-medium">Informações pessoais</h3>

                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome completo</Label>
                                <Input
                                    id="name"
                                    value={customerInfo.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    disabled={isLoading}
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={customerInfo.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    disabled={isLoading}
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="document">CPF/CNPJ</Label>
                                    <Input
                                        id="document"
                                        value={customerInfo.document}
                                        onChange={(e) => handleInputChange("document", e.target.value)}
                                        disabled={isLoading}
                                    />
                                    {errors.document && <p className="text-sm text-red-500">{errors.document}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telefone</Label>
                                    <Input
                                        id="phone"
                                        value={customerInfo.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        disabled={isLoading}
                                    />
                                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium">Método de pagamento</h3>

                        <RadioGroup
                            value={paymentMethod}
                            onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            disabled={isLoading}
                        >
                            <div
                                className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "pix" ? "border-[#400041] bg-purple-50" : ""
                                    }`}
                            >
                                <RadioGroupItem value="pix" id="pix" className="sr-only" />
                                <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer">
                                    <QrCode className="h-5 w-5" />
                                    <div>
                                        <div className="font-medium">PIX</div>
                                        <div className="text-sm text-gray-500">Pagamento instantâneo</div>
                                    </div>
                                </Label>
                            </div>

                            <div
                                className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "credit" ? "border-[#400041] bg-purple-50" : ""
                                    }`}
                            >
                                <RadioGroupItem value="credit" id="credit" className="sr-only" />
                                <Label htmlFor="credit" className="flex items-center gap-2 cursor-pointer">
                                    <CreditCard className="h-5 w-5" />
                                    <div>
                                        <div className="font-medium">Cartão de Crédito</div>
                                        <div className="text-sm text-gray-500">Visa, Mastercard, Elo, etc.</div>
                                    </div>
                                </Label>
                            </div>
                        </RadioGroup>

                        {paymentMethod === "credit" && (
                            <div className="space-y-4 border-t pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="card-number">Número do cartão</Label>
                                    <Input id="card-number" placeholder="0000 0000 0000 0000" disabled={isLoading} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry">Validade</Label>
                                        <Input id="expiry" placeholder="MM/AA" disabled={isLoading} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="123" disabled={isLoading} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="card-name">Nome no cartão</Label>
                                    <Input id="card-name" placeholder="Nome como aparece no cartão" disabled={isLoading} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>{formatCurrency(totalAmount)}</span>
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-[#400041] hover:bg-[#5a105b]" disabled={isLoading}>
                        {isLoading ? <LoadingSpinner className="mr-2" /> : null}
                        {isLoading ? "Processando..." : "Finalizar compra"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
