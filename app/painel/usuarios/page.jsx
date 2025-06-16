"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Loader2, PlusCircle, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Esquema de validação para o formulário de produtor
const producerFormSchema = z.object({
    name: z.string().min(3, {
        message: "O nome deve ter pelo menos 3 caracteres.",
    }),
    email: z.string().email({
        message: "Email inválido.",
    }),
    phone: z.string().min(10, {
        message: "O telefone deve ter pelo menos 10 dígitos.",
    }),
    document: z.string().min(11, {
        message: "O CPF deve ter 11 dígitos.",
    }),
    company: z.string().optional(),
})

// Tipo para usuários

export default function UsuariosPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterRole, setFilterRole] = useState("all")
    const [users, setUsers] = useState([
        {
            id: "u1",
            name: "João Silva",
            email: "joao.silva@exemplo.com",
            role: "admin",
            status: "active",
            createdAt: "15/06/2023",
        },
        {
            id: "u2",
            name: "Maria Souza",
            email: "maria.souza@exemplo.com",
            role: "producer",
            status: "active",
            createdAt: "20/06/2023",
        },
        {
            id: "u3",
            name: "Carlos Oliveira",
            email: "carlos.oliveira@exemplo.com",
            role: "user",
            status: "active",
            createdAt: "25/06/2023",
        },
        {
            id: "u4",
            name: "Ana Santos",
            email: "ana.santos@exemplo.com",
            role: "producer",
            status: "inactive",
            createdAt: "30/06/2023",
        },
    ])

    const form = useForm({
        resolver: zodResolver(producerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            document: "",
            company: "",
        },
    })

    function onSubmit(values) {
        setIsSubmitting(true)

        // Simular uma chamada de API
        setTimeout(() => {
            const newUser: User = {
                id: `u${Date.now()}`,
                name: values.name,
                email: values.email,
                role: "producer",
                status: "active",
                createdAt: new Date().toLocaleDateString("pt-BR"),
            }

            setUsers([newUser, ...users])

            toast({
                title: "Produtor criado com sucesso",
                description: `O produtor ${values.name} foi criado com sucesso.`,
            })

            form.reset()
            setIsSubmitting(false)
            setIsDialogOpen(false)
        }, 1500)
    }

    // Filtrar usuários
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRole = filterRole === "all" || user.role === filterRole
        return matchesSearch && matchesRole
    })

    // Renderizar o papel do usuário
    const renderUserRole = (role) => {
        switch (role) {
            case "admin":
                return <Badge className="bg-purple-500">Administrador</Badge>
            case "producer":
                return <Badge className="bg-blue-500">Produtor</Badge>
            case "user":
                return <Badge className="bg-green-500">Usuário</Badge>
            default:
                return null
        }
    }

    // Renderizar o status do usuário
    const renderUserStatus = (status) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-500">Ativo</Badge>
            case "inactive":
                return <Badge className="bg-red-500">Inativo</Badge>
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Usuários</h1>
                <p className="text-muted-foreground">Gerencie usuários e produtores</p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar usuários..."
                            className="pl-8 w-full sm:w-[250px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={filterRole} onValueChange={setFilterRole}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrar por papel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="admin">Administradores</SelectItem>
                            <SelectItem value="producer">Produtores</SelectItem>
                            <SelectItem value="user">Usuários</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#400041] hover:bg-[#5a105b]">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Novo Produtor
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Criar Novo Produtor</DialogTitle>
                            <DialogDescription>
                                Preencha os dados abaixo para criar um novo produtor. Um email será enviado com as instruções de acesso.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome Completo</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nome do produtor" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="email@exemplo.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Telefone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="(00) 00000-0000" {...field} />
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
                                                <FormLabel>CPF</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="000.000.000-00" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="company"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel>Empresa (opcional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nome da empresa" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit" className="bg-[#400041] hover:bg-[#5a105b]" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Criando...
                                            </>
                                        ) : (
                                            "Criar Produtor"
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            <Tabs defaultValue="todos">
                <TabsList>
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="produtores">Produtores</TabsTrigger>
                    <TabsTrigger value="usuarios">Usuários</TabsTrigger>
                </TabsList>
                <TabsContent value="todos">
                    <Card>
                        <CardContent className="p-0">
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 text-left align-middle font-medium">Nome</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Papel</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Data de Criação</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {filteredUsers.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                            >
                                                <td className="p-4 align-middle">{user.name}</td>
                                                <td className="p-4 align-middle">{user.email}</td>
                                                <td className="p-4 align-middle">{renderUserRole(user.role)}</td>
                                                <td className="p-4 align-middle">{renderUserStatus(user.status)}</td>
                                                <td className="p-4 align-middle">{user.createdAt}</td>
                                                <td className="p-4 align-middle">
                                                    <Button variant="outline" size="sm">
                                                        Editar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredUsers.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                                    Nenhum usuário encontrado.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="produtores">
                    <Card>
                        <CardContent className="p-0">
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 text-left align-middle font-medium">Nome</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Data de Criação</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {filteredUsers
                                            .filter((user) => user.role === "producer")
                                            .map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                                >
                                                    <td className="p-4 align-middle">{user.name}</td>
                                                    <td className="p-4 align-middle">{user.email}</td>
                                                    <td className="p-4 align-middle">{renderUserStatus(user.status)}</td>
                                                    <td className="p-4 align-middle">{user.createdAt}</td>
                                                    <td className="p-4 align-middle">
                                                        <Button variant="outline" size="sm">
                                                            Editar
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        {filteredUsers.filter((user) => user.role === "producer").length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                                    Nenhum produtor encontrado.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="usuarios">
                    <Card>
                        <CardContent className="p-0">
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 text-left align-middle font-medium">Nome</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Data de Criação</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {filteredUsers
                                            .filter((user) => user.role === "user")
                                            .map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                                >
                                                    <td className="p-4 align-middle">{user.name}</td>
                                                    <td className="p-4 align-middle">{user.email}</td>
                                                    <td className="p-4 align-middle">{renderUserStatus(user.status)}</td>
                                                    <td className="p-4 align-middle">{user.createdAt}</td>
                                                    <td className="p-4 align-middle">
                                                        <Button variant="outline" size="sm">
                                                            Editar
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        {filteredUsers.filter((user) => user.role === "user").length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                                    Nenhum usuário encontrado.
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
