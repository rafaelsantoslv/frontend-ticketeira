import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function EventTabList({ }) {
    return (
        <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="lotes">Setores e Lotes</TabsTrigger>
            <TabsTrigger value="cupons">Cupons</TabsTrigger>
            <TabsTrigger value="cortesias">Cortesias</TabsTrigger>
            <TabsTrigger value="vendas" disabled>Vendas</TabsTrigger>
            <TabsTrigger value="participantes" disabled>Participantes</TabsTrigger>
            <TabsTrigger value="checkins">Check-ins</TabsTrigger>
        </TabsList>
    )
}