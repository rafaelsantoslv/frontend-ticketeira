import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { EventCardOverViewCheckin } from "./EventCardOverViewCheckin";
import { useState } from "react";
import { toast } from "@/hooks/useToast";
import { Check, Download, Eye, FileText, MoreHorizontal, QrCode, RefreshCw, Search, Trash2, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

export function EventCheckin({ sampleCheckins }) {


    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("todos")
    const [sectorFilter, setSectorFilter] = useState("todos")
    const [selectedCheckins, setSelectedCheckins] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedCheckins(filteredCheckins.map((checkin) => checkin.id))
        } else {
            setSelectedCheckins([])
        }
    }

    const handleSelectCheckin = (checkinId: string, checked: boolean) => {
        if (checked) {
            setSelectedCheckins([...selectedCheckins, checkinId])
        } else {
            setSelectedCheckins(selectedCheckins.filter((id) => id !== checkinId))
        }
    }

    const handleValidateCheckin = async (checkinId: string) => {
        setIsLoading(true)
        // Simular API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
        toast({
            title: "Check-in validado",
            description: `Check-in ${checkinId} foi validado com sucesso.`,
        })
    }

    const handleCancelValidation = async (checkinId: string) => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
        toast({
            title: "Validação cancelada",
            description: `Validação do check-in ${checkinId} foi cancelada.`,
            variant: "destructive",
        })
    }

    const handleBulkAction = async (action: string) => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsLoading(false)

        toast({
            title: `Ação em lote executada`,
            description: `${action} aplicado a ${selectedCheckins.length} check-ins.`,
        })
        setSelectedCheckins([])
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "validated":
                return <Badge className="bg-green-500 hover:bg-green-600">Validado</Badge>
            case "pending":
                return <Badge className="bg-yellow-500 hover:bg-yellow-600">Não validado</Badge>
            case "cancelled":
                return <Badge className="bg-red-500 hover:bg-red-600">Cancelado</Badge>
            default:
                return <Badge variant="secondary">Desconhecido</Badge>
        }
    }

    const filteredCheckins = sampleCheckins.filter((checkin) => {
        const matchesSearch =
            checkin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            checkin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            checkin.email.toLowerCase().includes(searchTerm.toLowerCase())

        let matchesStatus = true
        if (statusFilter === "validados") matchesStatus = checkin.status === "validated"
        else if (statusFilter === "nao-validados") matchesStatus = checkin.status === "pending"
        else if (statusFilter === "cancelados") matchesStatus = checkin.status === "cancelled"

        let matchesSector = true
        if (sectorFilter !== "todos") matchesSector = checkin.sector === sectorFilter

        return matchesSearch && matchesStatus && matchesSector
    })

    const stats = {
        total: sampleCheckins.length,
        validated: sampleCheckins.filter((c) => c.status === "validated").length,
        pending: sampleCheckins.filter((c) => c.status === "pending").length,
        cancelled: sampleCheckins.filter((c) => c.status === "cancelled").length,
    }
    return (
        <TabsContent value="checkins">
            <div className="space-y-6">
                <EventCardOverViewCheckin />
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <CardTitle>Gestão de Check-ins</CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {filteredCheckins.length} check-ins encontrados
                                    {selectedCheckins.length > 0 && ` • ${selectedCheckins.length} selecionados`}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                {selectedCheckins.length > 0 && (
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleBulkAction("Validar")} disabled={isLoading}>
                                            <Check className="h-4 w-4 mr-2" />
                                            Validar Selecionados
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleBulkAction("Cancelar")} disabled={isLoading}>
                                            <X className="h-4 w-4 mr-2" />
                                            Cancelar Selecionados
                                        </Button>
                                    </div>
                                )}
                                <Button variant="outline" size="sm">
                                    <QrCode className="h-4 w-4 mr-2" />
                                    Scanner QR
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Exportar
                                </Button>
                                <Button variant="outline" size="sm" disabled={isLoading}>
                                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                                    Atualizar
                                </Button>
                            </div>
                        </div>

                        {/* Filtros */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar por nome, código ou email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos</SelectItem>
                                    <SelectItem value="validados">Validados</SelectItem>
                                    <SelectItem value="nao-validados">Não validados</SelectItem>
                                    <SelectItem value="cancelados">Cancelados</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={sectorFilter} onValueChange={setSectorFilter}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Setor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos os setores</SelectItem>
                                    <SelectItem value="Pista">Pista</SelectItem>
                                    <SelectItem value="Camarote">Camarote</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">
                        <div className="relative w-full overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">
                                            <Checkbox
                                                checked={selectedCheckins.length === filteredCheckins.length && filteredCheckins.length > 0}
                                                onCheckedChange={handleSelectAll}
                                            />
                                        </TableHead>
                                        <TableHead>Código</TableHead>
                                        <TableHead>Participante</TableHead>
                                        <TableHead>Setor/Lote</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Valor</TableHead>
                                        <TableHead>Check-in</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCheckins.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                                Nenhum check-in encontrado
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredCheckins.map((checkin) => (
                                            <TableRow key={checkin.id} className={selectedCheckins.includes(checkin.id) ? "bg-muted/50" : ""}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedCheckins.includes(checkin.id)}
                                                        onCheckedChange={(checked) => handleSelectCheckin(checkin.id, checked as boolean)}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">#{checkin.id}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{checkin.name}</div>
                                                        <div className="text-sm text-muted-foreground">{checkin.email}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{checkin.sector}</div>
                                                        <div className="text-sm text-muted-foreground">{checkin.batch}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{getStatusBadge(checkin.status)}</TableCell>
                                                <TableCell className="font-medium">{checkin.price}</TableCell>
                                                <TableCell className="text-sm">
                                                    {checkin.validatedAt || <span className="text-muted-foreground">Não validado</span>}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {checkin.status === "pending" && (
                                                            <Button
                                                                size="sm"
                                                                onClick={() => handleValidateCheckin(checkin.id)}
                                                                disabled={isLoading}
                                                                className="bg-green-600 hover:bg-green-700"
                                                            >
                                                                <Check className="h-4 w-4 mr-1" />
                                                                Validar
                                                            </Button>
                                                        )}

                                                        {checkin.status === "validated" && (
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                                        <X className="h-4 w-4 mr-1" />
                                                                        Cancelar
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Cancelar validação?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Esta ação irá cancelar a validação do check-in #{checkin.id}. O participante
                                                                            precisará validar novamente na entrada.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => handleCancelValidation(checkin.id)}
                                                                            className="bg-red-600 hover:bg-red-700"
                                                                        >
                                                                            Confirmar
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        )}

                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="sm">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>
                                                                    <Eye className="h-4 w-4 mr-2" />
                                                                    Ver detalhes
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <QrCode className="h-4 w-4 mr-2" />
                                                                    Mostrar QR Code
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <FileText className="h-4 w-4 mr-2" />
                                                                    Baixar ingresso
                                                                </DropdownMenuItem>
                                                                {checkin.status !== "cancelled" && (
                                                                    <DropdownMenuItem className="text-red-600">
                                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                                        Cancelar check-in
                                                                    </DropdownMenuItem>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
    )
}