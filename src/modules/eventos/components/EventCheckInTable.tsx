import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Check, Download, Eye, FileText, MoreHorizontal, QrCode, RefreshCw, Search, Trash2, X } from "lucide-react"
import type { Checkin, Sector } from "@/modules/eventos/types"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { formatCurrency } from "@/utils/formatCurrency"

interface Props {
    checkins: Checkin[]
    selected: string[]
    searchTerm: string
    sectorFilter: string
    statusFilter: string
    setSearchTerm: (val: string) => void
    setSectorFilter: (val: string) => void
    setStatusFilter: (val: string) => void
    toggleSelectAll: (checked: boolean) => void
    toggleSelect: (id: string, checked: boolean) => void
    onValidate: (id: string) => void
    onCancel: (id: string) => void
    onBulkAction: (action: "validate" | "cancel") => void
    getStatusBadge: (status: string) => JSX.Element
    loading: boolean
    sectors: Sector[]
}

export function CheckinTable({
    checkins,
    selected,
    searchTerm,
    sectorFilter,
    statusFilter,
    setSearchTerm,
    setSectorFilter,
    setStatusFilter,
    toggleSelectAll,
    toggleSelect,
    onValidate,
    onCancel,
    onBulkAction,
    getStatusBadge,
    loading,
    sectors,
}: Props) {
    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Gestão de Check-ins</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            {checkins.length} check-ins encontrados
                            {selected.length > 0 && ` • ${selected.length} selecionados`}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        {selected.length > 0 && (
                            <>
                                <Button variant="outline" size="sm" onClick={() => onBulkAction("validate")} disabled={loading}>
                                    <Check className="h-4 w-4 mr-2" /> Validar Selecionados
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => onBulkAction("cancel")} disabled={loading}>
                                    <X className="h-4 w-4 mr-2" /> Cancelar Selecionados
                                </Button>
                            </>
                        )}
                        <Button variant="outline" size="sm">
                            <QrCode className="h-4 w-4 mr-2" /> Scanner QR
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" /> Exportar
                        </Button>
                        <Button variant="outline" size="sm" disabled={loading}>
                            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Atualizar
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
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
                            {sectors.map((s) => (
                                <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                            ))}
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
                                        checked={selected.length === checkins.length && checkins.length > 0}
                                        onCheckedChange={toggleSelectAll}
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
                            {checkins.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                        Nenhum check-in encontrado
                                    </TableCell>
                                </TableRow>
                            ) : (
                                checkins.map((checkin) => (
                                    <TableRow key={checkin.id} className={selected.includes(checkin.id) ? "bg-muted/50" : ""}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selected.includes(checkin.id)}
                                                onCheckedChange={(checked) => toggleSelect(checkin.id, checked as boolean)}
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
                                        <TableCell className="font-medium">{formatCurrency(checkin.price)}</TableCell>
                                        <TableCell className="text-sm">
                                            {checkin.date ? (
                                                format(new Date(checkin.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                                            ) : (
                                                <span className="text-muted-foreground">Não validado</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {checkin.status === "pending" && (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => onValidate(checkin.id)}
                                                        disabled={loading}
                                                        className="bg-green-600 hover:bg-green-700"
                                                    >
                                                        <Check className="h-4 w-4 mr-1" /> Validar
                                                    </Button>
                                                )}

                                                {checkin.status === "validated" && (
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                                <X className="h-4 w-4 mr-1" /> Cancelar
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Cancelar validação?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Isso tornará o check-in #{checkin.id} pendente novamente.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Fechar</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => onCancel(checkin.id)}
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
                                                            <Eye className="h-4 w-4 mr-2" /> Ver detalhes
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <QrCode className="h-4 w-4 mr-2" /> Mostrar QR Code
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <FileText className="h-4 w-4 mr-2" /> Baixar ingresso
                                                        </DropdownMenuItem>
                                                        {checkin.status !== "cancelled" && (
                                                            <DropdownMenuItem className="text-red-600">
                                                                <Trash2 className="h-4 w-4 mr-2" /> Cancelar check-in
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
    )
}
