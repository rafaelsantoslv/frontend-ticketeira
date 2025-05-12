import { usePathname } from "next/navigation"

export function PainelHeader({ name, title }) {


    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
            <p className="text-muted-foreground">{title}</p>
        </div>
    )
}