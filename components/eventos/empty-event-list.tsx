import Link from "next/link";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

export function EmptyEventsList({ searchTerm }) {
    <div className="text-center py-16 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Nenhum evento encontrado</h3>
        <p className="mt-2 text-gray-500">
            {searchTerm
                ? "Nenhum evento corresponde aos critérios de busca."
                : "Você ainda não tem eventos cadastrados."}
        </p>
        <div className="mt-6">
            <Link href="/painel/eventos/novo">
                <Button className="bg-[#400041] hover:bg-[#5a105b]">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Criar Primeiro Evento
                </Button>
            </Link>
        </div>
    </div>
}