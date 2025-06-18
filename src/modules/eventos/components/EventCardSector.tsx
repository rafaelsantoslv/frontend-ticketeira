import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { formatCurrency } from "@/utils/formatCurrency";
import { ChevronDown, ChevronUp, PlusCircle, Trash2 } from "lucide-react";

export function EventCardSector({
    sectorBatches,
    setIsBatchFormOpen,
    handleDeleteSector,
    sector,
    isExpanded,
    stats,
    handleToggleBatchStatus,
    handleDeleteBatch,
    toggleSectorExpanded
}) {
    return (
        <Card key={sector.id} className="overflow-hidden">
            <Collapsible open={isExpanded} onOpenChange={() => toggleSectorExpanded(sector.id)}>
                <div className="p-4 flex items-center justify-between bg-gray-50 border-b">
                    <div className="flex items-center gap-2">
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-1">
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                        </CollapsibleTrigger>
                        <div>
                            <h4 className="font-medium text-lg">{sector.name}</h4>
                            <p className="text-sm text-muted-foreground">
                                Capacidade: {sector.capacity} • Vendidos: {stats.totalSold} • Receita:{" "}
                                {formatCurrency(stats.totalRevenue)}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setIsBatchFormOpen(true)}>
                            <PlusCircle className="mr-1 h-4 w-4" />
                            Lote
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteSector(sector.id)}
                            disabled={sectorBatches.length > 0}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <CollapsibleContent>
                    <div className="p-4">
                        {sector.description && (
                            <p className="text-sm text-muted-foreground mb-4">{sector.description}</p>
                        )}

                        {sectorBatches.length === 0 ? (
                            <div className="text-center py-4 text-muted-foreground">
                                Nenhum lote cadastrado para este setor.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {sectorBatches.map((batch) => (
                                    <div
                                        key={batch.id}
                                        className="flex items-center justify-between p-3 border rounded-md"
                                    >
                                        <div>
                                            <div className="flex items-center">
                                                <span className="font-medium">{batch.name}</span>
                                                <span
                                                    className={`ml-2 text-xs px-2 py-0.5 rounded-full ${batch.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                        }`}
                                                >
                                                    {batch.active ? "Ativo" : "Inativo"}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {formatCurrency(batch.price)} • {batch.sold}/{batch.quantity} ingressos vendidos
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant={batch.active ? "default" : "outline"}
                                                onClick={() => handleToggleBatchStatus(batch.id)}
                                            >
                                                {batch.active ? "Desativar" : "Ativar"}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleDeleteBatch(batch.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    )
}