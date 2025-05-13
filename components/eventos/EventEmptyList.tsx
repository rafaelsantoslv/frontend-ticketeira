// components/eventos/EmptyEventsList.tsx
interface EmptyEventsListProps {
    searchTerm: string;
}

export function EventEmptyList({ searchTerm }: EmptyEventsListProps) {
    return (
        <div className="text-center py-16 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Nenhum evento encontrado</h3>
            <p className="mt-2 text-gray-500">
                {searchTerm
                    ? "Nenhum evento corresponde aos critérios de busca."
                    : "Você ainda não tem eventos cadastrados."}
            </p>
            <div className="mt-6">
                <button className="bg-[#400041] hover:bg-[#5a105b] text-white px-4 py-2 rounded">
                    Criar Primeiro Evento
                </button>
            </div>
        </div>
    );
}