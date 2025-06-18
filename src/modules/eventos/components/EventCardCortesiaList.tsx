import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

export function EventCardCortesiaList({
    event,
    handleResendCourtesy,
    handleDeleteCourtesy
}) {
    return (
        <Card className="p-6">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg">Cortesias Geradas</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
                {event.courtesies.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        Nenhuma cortesia gerada. Crie uma nova cortesia ao lado.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {event.courtesies.map((courtesy) => {


                            return (
                                <div key={courtesy.id} className="flex items-center justify-between p-3 border rounded-md">
                                    <div>
                                        <div className="flex items-center">
                                            <span className="font-medium">
                                                {courtesy.name}
                                            </span>
                                            <span
                                                className={`ml-2 text-xs px-2 py-0.5 rounded-full ${courtesy.sent ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                            >
                                                {courtesy.sent ? "Enviado" : "Pendente"}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {courtesy.email} • {courtesy?.sector || "Setor desconhecido"}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1">Código: {courtesy.id}</div>
                                    </div>
                                    <div className="flex space-x-2">
                                        {!courtesy.sent && (
                                            <Button size="sm" variant="outline" onClick={() => handleResendCourtesy(courtesy.id)}>
                                                Enviar
                                            </Button>
                                        )}
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteCourtesy(courtesy.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}