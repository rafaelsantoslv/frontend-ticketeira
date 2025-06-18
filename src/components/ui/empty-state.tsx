import type React from "react"
interface EmptyStateProps {
    title: string
    description: string
    action?: React.ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
    return (
        <div className="text-center py-16 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-2 text-gray-500">{description}</p>
            {action && <div className="mt-6">{action}</div>}
        </div>
    )
}
