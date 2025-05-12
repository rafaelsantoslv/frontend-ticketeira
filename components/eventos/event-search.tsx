import { PlusCircle, Search } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";

export function EventSearch({ searchTerm, setSearchTerm, nameAction }) {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Buscar eventos..."
                    className="pl-8 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Link href="/painel/eventos/novo">
                <Button className="bg-[#400041] hover:bg-[#5a105b]">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {nameAction}
                </Button>
            </Link>
        </div>
    )
}