"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth2 } from "@/modules/auth/contexts/AuthContext"
import { Loader2, Upload } from "lucide-react"

export default function ConfiguracoesPage() {
    const { toast } = useToast()
    const { user } = useAuth2()
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("perfil")

    // Dados simulados do usuário
    const [userData, setUserData] = useState({
        nome: user?.email ? user.email.split("@")[0] : "Usuário",
        email: user?.email || "usuario@exemplo.com",
        telefone: "(11) 98765-4321",
        empresa: "Unyx Ticket",
        cargo: "Administrador",
        cpf: "123.456.789-00",
        senha: "••••••••",
        novaSenha: "",
        confirmarSenha: "",
        notificacoes: {
            email: true,
            vendas: true,
            checkins: false,
            financeiro: true,
            marketing: false,
        },
        tema: "claro",
        idioma: "pt-BR",
    })

    // Função para atualizar os dados do usuário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Função para atualizar as notificações
    const handleNotificationChange = (key: string, checked: boolean) => {
        setUserData((prev) => ({
            ...prev,
            notificacoes: {
                ...prev.notificacoes,
                [key]: checked,
            },
        }))
    }

    // Função para salvar as alterações
    const handleSave = (section: string) => {
        setIsLoading(true)

        // Simulação de uma requisição
        setTimeout(() => {
            setIsLoading(false)
            toast({
                title: "Configurações atualizadas",
                description: `As configurações de ${section} foram atualizadas com sucesso.`,
            })
        }, 1000)
    }

    // Função para obter as iniciais do usuário
    const getInitials = () => {
        if (!userData.nome) return "U"
        return userData.nome.substring(0, 2).toUpperCase()
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Configurações</h1>
            </div>

            <Tabs defaultValue="perfil" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid grid-cols-4 md:w-[600px]">
                    <TabsTrigger value="perfil">Perfil</TabsTrigger>
                    <TabsTrigger value="seguranca">Segurança</TabsTrigger>
                    <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
                    <TabsTrigger value="preferencias">Preferências</TabsTrigger>
                </TabsList>

                {/* Aba de Perfil */}
                <TabsContent value="perfil" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações Pessoais</CardTitle>
                            <CardDescription>Atualize suas informações pessoais e de contato.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-col items-center space-y-2">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src="/placeholder.svg" />
                                        <AvatarFallback className="bg-[#400041] text-white text-xl">{getInitials()}</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline" size="sm" className="flex gap-2">
                                        <Upload className="h-4 w-4" />
                                        Alterar foto
                                    </Button>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nome">Nome completo</Label>
                                            <Input id="nome" name="nome" value={userData.nome} onChange={handleChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" name="email" type="email" value={userData.email} onChange={handleChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="telefone">Telefone</Label>
                                            <Input id="telefone" name="telefone" value={userData.telefone} onChange={handleChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cpf">CPF</Label>
                                            <Input id="cpf" name="cpf" value={userData.cpf} onChange={handleChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="empresa">Empresa</Label>
                                            <Input id="empresa" name="empresa" value={userData.empresa} onChange={handleChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cargo">Cargo</Label>
                                            <Input id="cargo" name="cargo" value={userData.cargo} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button
                                onClick={() => handleSave("perfil")}
                                className="bg-[#400041] hover:bg-[#600061]"
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? "Salvando..." : "Salvar alterações"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Aba de Segurança */}
                <TabsContent value="seguranca" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Alterar Senha</CardTitle>
                            <CardDescription>Atualize sua senha para manter sua conta segura.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="senha-atual">Senha atual</Label>
                                <Input id="senha-atual" name="senha" type="password" value={userData.senha} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nova-senha">Nova senha</Label>
                                <Input
                                    id="nova-senha"
                                    name="novaSenha"
                                    type="password"
                                    value={userData.novaSenha}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmar-senha">Confirmar nova senha</Label>
                                <Input
                                    id="confirmar-senha"
                                    name="confirmarSenha"
                                    type="password"
                                    value={userData.confirmarSenha}
                                    onChange={handleChange}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <div className="text-sm text-muted-foreground">
                                A senha deve ter pelo menos 8 caracteres e incluir letras e números.
                            </div>
                            <Button
                                onClick={() => handleSave("segurança")}
                                className="bg-[#400041] hover:bg-[#600061]"
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? "Salvando..." : "Atualizar senha"}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Autenticação de dois fatores</CardTitle>
                            <CardDescription>Adicione uma camada extra de segurança à sua conta.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Autenticação por SMS</p>
                                    <p className="text-sm text-muted-foreground">Receba um código por SMS para confirmar seu login.</p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Autenticação por aplicativo</p>
                                    <p className="text-sm text-muted-foreground">
                                        Use um aplicativo de autenticação como Google Authenticator.
                                    </p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <p className="text-sm text-muted-foreground">
                                A autenticação de dois fatores aumenta significativamente a segurança da sua conta.
                            </p>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Aba de Notificações */}
                <TabsContent value="notificacoes" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferências de Notificação</CardTitle>
                            <CardDescription>Escolha como e quando deseja receber notificações.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Notificações por email</p>
                                    <p className="text-sm text-muted-foreground">Receba atualizações importantes por email.</p>
                                </div>
                                <Switch
                                    checked={userData.notificacoes.email}
                                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Alertas de vendas</p>
                                    <p className="text-sm text-muted-foreground">Seja notificado quando houver novas vendas.</p>
                                </div>
                                <Switch
                                    checked={userData.notificacoes.vendas}
                                    onCheckedChange={(checked) => handleNotificationChange("vendas", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Alertas de check-ins</p>
                                    <p className="text-sm text-muted-foreground">Seja notificado sobre check-ins em seus eventos.</p>
                                </div>
                                <Switch
                                    checked={userData.notificacoes.checkins}
                                    onCheckedChange={(checked) => handleNotificationChange("checkins", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Atualizações financeiras</p>
                                    <p className="text-sm text-muted-foreground">Receba notificações sobre transações financeiras.</p>
                                </div>
                                <Switch
                                    checked={userData.notificacoes.financeiro}
                                    onCheckedChange={(checked) => handleNotificationChange("financeiro", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Comunicações de marketing</p>
                                    <p className="text-sm text-muted-foreground">Receba dicas, novidades e ofertas especiais.</p>
                                </div>
                                <Switch
                                    checked={userData.notificacoes.marketing}
                                    onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button
                                onClick={() => handleSave("notificações")}
                                className="bg-[#400041] hover:bg-[#600061]"
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? "Salvando..." : "Salvar preferências"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Aba de Preferências */}
                <TabsContent value="preferencias" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferências do Sistema</CardTitle>
                            <CardDescription>Personalize sua experiência na plataforma.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="tema">Tema</Label>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="tema-claro"
                                            name="tema"
                                            value="claro"
                                            checked={userData.tema === "claro"}
                                            onChange={handleChange}
                                            className="accent-[#400041]"
                                        />
                                        <Label htmlFor="tema-claro" className="cursor-pointer">
                                            Claro
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="tema-escuro"
                                            name="tema"
                                            value="escuro"
                                            checked={userData.tema === "escuro"}
                                            onChange={handleChange}
                                            className="accent-[#400041]"
                                        />
                                        <Label htmlFor="tema-escuro" className="cursor-pointer">
                                            Escuro
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="tema-sistema"
                                            name="tema"
                                            value="sistema"
                                            checked={userData.tema === "sistema"}
                                            onChange={handleChange}
                                            className="accent-[#400041]"
                                        />
                                        <Label htmlFor="tema-sistema" className="cursor-pointer">
                                            Sistema
                                        </Label>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="idioma">Idioma</Label>
                                <select
                                    id="idioma"
                                    name="idioma"
                                    value={userData.idioma}
                                    onChange={(e) => setUserData({ ...userData, idioma: e.target.value })}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="pt-BR">Português (Brasil)</option>
                                    <option value="en-US">English (US)</option>
                                    <option value="es">Español</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <div>
                                    <p className="font-medium">Mostrar valores com impostos</p>
                                    <p className="text-sm text-muted-foreground">Exibir valores com impostos incluídos nos relatórios.</p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Confirmação antes de excluir</p>
                                    <p className="text-sm text-muted-foreground">Solicitar confirmação antes de excluir itens.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button
                                onClick={() => handleSave("preferências")}
                                className="bg-[#400041] hover:bg-[#600061]"
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? "Salvando..." : "Salvar preferências"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
