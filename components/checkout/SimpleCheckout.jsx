"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTicketSelection } from "@/contexts/TicketSelection"
import { formatCurrency } from "@/lib/format"
import { X, CreditCard, User, Check, QrCode, Copy } from "lucide-react"

export function SimpleCheckout({ isOpen, onClose }) {
    const { selectedTickets, totalAmount, totalQuantity, clearSelection } = useTicketSelection()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("credit") // "credit" ou "pix"
    const [pixCode, setPixCode] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        cpf: "",
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const generatePixCode = () => {
        const finalTotal = totalAmount * 1.1
        // Simular código PIX
        const pixCode = `00020126580014BR.GOV.BCB.PIX0136${Math.random().toString(36).substring(2, 15)}520400005303986540${finalTotal.toFixed(2)}5802BR5925UNYX TICKET LTDA6009SAO PAULO62070503***6304`
        setPixCode(pixCode)
    }

    const copyPixCode = () => {
        navigator.clipboard.writeText(pixCode)
        alert("Código PIX copiado!")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsProcessing(true)

        try {
            if (paymentMethod === "pix" && !pixCode) {
                generatePixCode()
                setIsProcessing(false)
                return
            }

            // Simular processamento do pagamento
            await new Promise((resolve) => setTimeout(resolve, 3000))
            setIsSuccess(true)

            // Após 2 segundos, limpar tudo e fechar
            setTimeout(() => {
                clearSelection()
                onClose()
                setIsSuccess(false)
                setIsProcessing(false)
                setPixCode("")
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    cpf: "",
                    cardNumber: "",
                    cardName: "",
                    expiryDate: "",
                    cvv: "",
                })
            }, 2000)
        } catch (error) {
            console.error("Erro no pagamento:", error)
            setIsProcessing(false)
        }
    }

    const finalTotal = totalAmount * 1.1

    if (!isOpen) return null

    if (isSuccess) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-8 max-w-md w-full">
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {paymentMethod === "pix" ? "PIX Confirmado!" : "Pagamento Realizado!"}
                        </h3>
                        <p className="text-gray-600 mb-4">Seus ingressos foram enviados por email.</p>
                        <p className="text-sm text-gray-500">Esta janela será fechada automaticamente...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold">Finalizar Compra</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Formulário */}
                        <div className="space-y-4">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Dados Pessoais */}
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <User className="h-5 w-5" />
                                            Dados Pessoais
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div>
                                            <Label htmlFor="name" className="text-sm">
                                                Nome Completo
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="mt-1"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <Label htmlFor="email" className="text-sm">
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="mt-1"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="phone" className="text-sm">
                                                    Telefone
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="mt-1"
                                                    placeholder="(11) 99999-9999"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="cpf" className="text-sm">
                                                CPF
                                            </Label>
                                            <Input
                                                id="cpf"
                                                name="cpf"
                                                value={formData.cpf}
                                                onChange={handleInputChange}
                                                className="mt-1"
                                                placeholder="000.000.000-00"
                                                required
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Método de Pagamento */}
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg">Método de Pagamento</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Seleção do método */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod("credit")}
                                                className={`p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-all ${paymentMethod === "credit"
                                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <CreditCard className="w-5 h-5" />
                                                <span className="font-medium">Cartão de Crédito</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod("pix")}
                                                className={`p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-all ${paymentMethod === "pix"
                                                    ? "border-green-500 bg-green-50 text-green-700"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <QrCode className="w-5 h-5" />
                                                <span className="font-medium">PIX</span>
                                            </button>
                                        </div>

                                        {/* Formulário do Cartão */}
                                        {paymentMethod === "credit" && (
                                            <div className="space-y-3 pt-2">
                                                <div>
                                                    <Label htmlFor="cardNumber" className="text-sm">
                                                        Número do Cartão
                                                    </Label>
                                                    <Input
                                                        id="cardNumber"
                                                        name="cardNumber"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                        className="mt-1"
                                                        placeholder="0000 0000 0000 0000"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="cardName" className="text-sm">
                                                        Nome no Cartão
                                                    </Label>
                                                    <Input
                                                        id="cardName"
                                                        name="cardName"
                                                        value={formData.cardName}
                                                        onChange={handleInputChange}
                                                        className="mt-1"
                                                        required
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <Label htmlFor="expiryDate" className="text-sm">
                                                            Validade
                                                        </Label>
                                                        <Input
                                                            id="expiryDate"
                                                            name="expiryDate"
                                                            value={formData.expiryDate}
                                                            onChange={handleInputChange}
                                                            className="mt-1"
                                                            placeholder="MM/AA"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="cvv" className="text-sm">
                                                            CVV
                                                        </Label>
                                                        <Input
                                                            id="cvv"
                                                            name="cvv"
                                                            value={formData.cvv}
                                                            onChange={handleInputChange}
                                                            className="mt-1"
                                                            placeholder="000"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* PIX */}
                                        {paymentMethod === "pix" && (
                                            <div className="space-y-3 pt-2">
                                                {!pixCode ? (
                                                    <div className="text-center p-6 bg-green-50 rounded-lg">
                                                        <QrCode className="w-12 h-12 text-green-600 mx-auto mb-3" />
                                                        <h3 className="font-semibold text-green-800 mb-2">Pagamento via PIX</h3>
                                                        <p className="text-sm text-green-700 mb-4">
                                                            Clique no botão abaixo para gerar o código PIX
                                                        </p>
                                                        <p className="text-xs text-green-600">Valor: {formatCurrency(finalTotal)}</p>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3">
                                                        <div className="bg-green-50 p-4 rounded-lg">
                                                            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                                                <QrCode className="w-5 h-5" />
                                                                Código PIX Gerado
                                                            </h3>
                                                            <p className="text-sm text-green-700 mb-3">
                                                                Copie o código abaixo e cole no seu app de pagamentos:
                                                            </p>
                                                            <div className="bg-white p-3 rounded border border-green-200">
                                                                <code className="text-xs break-all text-gray-800">{pixCode}</code>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={copyPixCode}
                                                                className="mt-3 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                                            >
                                                                <Copy className="w-4 h-4" />
                                                                Copiar Código PIX
                                                            </button>
                                                        </div>
                                                        <div className="bg-yellow-50 p-3 rounded-lg">
                                                            <p className="text-xs text-yellow-800 text-center">
                                                                ⏰ Após realizar o pagamento, clique em "Confirmar Pagamento PIX"
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <Button
                                    type="submit"
                                    className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 ${paymentMethod === "pix"
                                        ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                        } text-white`}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            {paymentMethod === "pix" ? "Verificando Pagamento..." : "Processando Pagamento..."}
                                        </div>
                                    ) : paymentMethod === "pix" && !pixCode ? (
                                        "Gerar Código PIX"
                                    ) : paymentMethod === "pix" ? (
                                        "Confirmar Pagamento PIX"
                                    ) : (
                                        `Pagar ${formatCurrency(finalTotal)}`
                                    )}
                                </Button>
                            </form>
                        </div>

                        {/* Resumo do Pedido */}
                        <div>
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        {Object.values(selectedTickets).map((ticket) => (
                                            <div
                                                key={ticket.id}
                                                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                                            >
                                                <div>
                                                    <h4 className="font-medium text-sm">{ticket.name}</h4>
                                                    <p className="text-xs text-gray-500">{ticket.sectorName}</p>
                                                    <p className="text-xs text-gray-600">Qtd: {ticket.quantity}</p>
                                                </div>
                                                <span className="font-medium text-sm">{formatCurrency(ticket.price * ticket.quantity)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t pt-3 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span>{formatCurrency(totalAmount)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Taxa de serviço (10%)</span>
                                            <span>{formatCurrency(totalAmount * 0.1)}</span>
                                        </div>
                                        <div className="border-t pt-2">
                                            <div className="flex justify-between text-lg font-bold">
                                                <span>Total</span>
                                                <span className={paymentMethod === "pix" ? "text-green-600" : "text-blue-600"}>
                                                    {formatCurrency(finalTotal)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`p-3 rounded-lg ${paymentMethod === "pix" ? "bg-green-50" : "bg-blue-50"}`}>
                                        <p
                                            className={`text-xs text-center ${paymentMethod === "pix" ? "text-green-800" : "text-blue-800"}`}
                                        >
                                            {paymentMethod === "pix"
                                                ? "🔒 PIX: Pagamento instantâneo e seguro"
                                                : "🔒 Seus dados estão seguros e protegidos"}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
