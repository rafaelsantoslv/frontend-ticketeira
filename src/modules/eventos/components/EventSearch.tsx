import Link from "next/link";

// components/eventos/EventSearch.tsx
interface EventSearchProps {
    nameAction: string;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

export function EventSearch({ nameAction, searchTerm, setSearchTerm }: EventSearchProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <input
                type="search"
                placeholder="Buscar eventos..."
                className="pl-2 w-full sm:w-[250px] border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link href="/painel/eventos/novo">
                <button className="bg-[#400041] hover:bg-[#5a105b] text-white px-4 py-2 rounded">
                    {nameAction}
                </button>
            </Link>
        </div >
    );
}