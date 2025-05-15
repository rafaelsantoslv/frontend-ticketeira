import { z } from "zod"
import { parse, isValid } from "date-fns"


const dateStringSchema = z.string().refine(
    (val) => {
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) return false
        const parsed = parse(val, "dd/MM/yyyy", new Date())
        return isValid(parsed)
    },
    { message: "Data inválida. Use o formato DD/MM/AAAA" }
)


export const eventFormSchema = z.object({
    title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres." }),
    startDate: dateStringSchema,
    startTime: z.string({ required_error: "O horário de início é obrigatório." }),
    locationName: z.string().min(3, { message: "O nome do local deve ter pelo menos 3 caracteres." }),
    locationAddress: z.string().min(5, { message: "O endereço deve ter pelo menos 5 caracteres." }),
    locationCity: z.string().min(2, { message: "A cidade é obrigatória." }),
    locationState: z.string().min(2, { message: "O estado é obrigatório." }),
    locationZip: z.string().min(8, { message: "CEP inválido." }),
    ageRating: z.enum(["livre", "18"], { required_error: "A classificação indicativa é obrigatória." }),
    category: z.enum(["festa", "show", "teatro", "congresso", "workshop", "esportivo", "outro"], {
        required_error: "A categoria é obrigatória.",
    }),
    about: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres." })
})

export type EventFormData = z.infer<typeof eventFormSchema>