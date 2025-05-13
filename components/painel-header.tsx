// components/common/PainelHeader.tsx
interface PainelHeaderProps {
    name: string;
    title: string;
}

export function PainelHeader({ name, title }: PainelHeaderProps) {
    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
            <p className="text-muted-foreground">{title}</p>
        </div>
    );
}