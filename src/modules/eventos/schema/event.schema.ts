import { z } from "zod"

export const eventSchema = z
    .object({
        bannerImage: z.any().optional(),
        title: z.string().min(1).max(100),
        description: z.string().min(10),
        category: z.string().min(1),
        ageRating: z.string().min(1),
        startDate: z.date(),
        endDate: z.date(),
        locationName: z.string().min(1),
        locationAddress: z.string().min(1),
        locationCity: z.string().min(1),
        locationState: z.string().min(2).max(2),
        locationZip: z.string().min(8).max(9),
    })
    .refine((data) => data.endDate > data.startDate, {
        message: "Data de término deve ser posterior à de início",
        path: ["endDate"],
    })

export type EventFormData = z.infer<typeof eventSchema>
