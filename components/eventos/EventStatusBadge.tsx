import { Badge } from "@/components/ui/badge"

type EventStatusBadgeProps = {
    status: string
}

export const EventStatusBadge = ({ status }: EventStatusBadgeProps) => {
    switch (status) {
        case "active":
            return <Badge className="bg-green-500">Ativo</Badge>
        case "upcoming":
            return <Badge className="bg-blue-500">Em breve</Badge>
        case "completed":
            return <Badge className="bg-gray-500">Concluído</Badge>
        case "canceled":
            return <Badge className="bg-red-500">Cancelado</Badge>
        default:
            return null
    }
}