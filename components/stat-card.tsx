import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"

interface StatCardProps {
    title: string
    icon: ReactNode
    value: string | number
    description: string
}

export function StatCard({ title, icon, value, description }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}