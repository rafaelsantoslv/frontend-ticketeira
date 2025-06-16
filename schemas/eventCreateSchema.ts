import { z } from "zod"

export const eventFormSchema = z.object({
    title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
    description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
    category: z.string({ required_error: "Selecione uma categoria" }),
    ageRating: z.string({ required_error: "Selecione uma classificação etária" }),
    startDate: z.date({ required_error: "Selecione a data de início" }),
    endDate: z.date({ required_error: "Selecione a data de término" }),
    locationName: z.string().min(2, { message: "Informe o nome do local" }),
    locationAddress: z.string().min(5, { message: "Informe o endereço" }),
    locationCity: z.string().min(2, { message: "Informe a cidade" }),
    locationState: z.string().length(2, { message: "Use a sigla do estado (2 letras)" }),
    locationZip: z.string().min(8, { message: "Informe um CEP válido" }),
    bannerImage: z.any().refine(file => file instanceof File, { message: "Selecione uma imagem válida" }),
})
    .refine(
        (data) => data.endDate >= data.startDate,
        {
            message: "A data de término deve ser posterior ou igual à data de início",
            path: ["endDate"], // Aponta o erro para o campo correto
        }
    )

export type EventFormValues = z.infer<typeof eventFormSchema>

// Agrupamento de campos por aba para verificação de erros
export const formFieldGroups = {
    details: ["title", "description", "category", "ageRating", "bannerImage"],
    datetime: ["startDate", "endDate"],
    location: ["locationName", "locationAddress", "locationCity", "locationState", "locationZip"],
}
