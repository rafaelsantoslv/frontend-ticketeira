"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ImageIcon, Upload } from "lucide-react"
import { parse, isValid, format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Custom validator for DD/MM/YYYY date format
const dateStringSchema = z.string().refine(
  (val) => {
    // Check if it matches DD/MM/YYYY pattern
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) return false

    // Parse the date and check if it's valid
    const parsed = parse(val, "dd/MM/yyyy", new Date())
    return isValid(parsed)
  },
  {
    message: "Data inválida. Use o formato DD/MM/AAAA",
  },
)

const formSchema = z.object({
  title: z.string().min(3, {
    message: "O título deve ter pelo menos 3 caracteres.",
  }),
  dateString: dateStringSchema,
  time: z.string({
    required_error: "O horário do evento é obrigatório.",
  }),
  venueName: z.string().min(3, {
    message: "O nome do local deve ter pelo menos 3 caracteres.",
  }),
  address: z.string().min(5, {
    message: "O endereço deve ter pelo menos 5 caracteres.",
  }),
  ageRating: z.string({
    required_error: "A classificação indicativa é obrigatória.",
  }),
  category: z.string({
    required_error: "A categoria é obrigatória.",
  }),
  about: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  image: z.string().optional(),
  coverImage: z.string().optional(),
})

type EventCreationFormProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  initialData?: any // Adicionado para suportar edição
}

export default function EventCreationForm({ isOpen, onClose, onSubmit, initialData }: EventCreationFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      dateString: "",
      time: "19:00",
      venueName: "",
      address: "",
      ageRating: "",
      category: "",
      about: "",
      image: "",
      coverImage: "",
    },
  })

  // Preencher o formulário com dados iniciais quando disponíveis
  useEffect(() => {
    if (initialData) {
      // Converter a data para o formato DD/MM/YYYY
      const dateString =
        initialData.date instanceof Date
          ? format(initialData.date, "dd/MM/yyyy")
          : format(new Date(initialData.date), "dd/MM/yyyy")

      form.reset({
        title: initialData.title || "",
        dateString: dateString,
        time: initialData.time || "19:00",
        venueName: initialData.venueName || "",
        address: initialData.address || "",
        ageRating: initialData.ageRating || "",
        category: initialData.category || "",
        about: initialData.about || "",
        image: initialData.image || "",
        coverImage: initialData.coverImage || "",
      })

      if (initialData.image) {
        setImagePreview(initialData.image)
      }

      if (initialData.coverImage) {
        setCoverImagePreview(initialData.coverImage)
      }
    }
  }, [initialData, form])

  function handleSubmit(values: z.infer<typeof formSchema>) {
    // Convert the date string to a Date object
    const date = parse(values.dateString, "dd/MM/yyyy", new Date())

    // Create a new object with the date instead of dateString
    const formattedValues = {
      ...values,
      date,
      // Remove the dateString property
      dateString: undefined,
    }

    onSubmit(formattedValues)
    form.reset()
    setImagePreview(null)
    setCoverImagePreview(null)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "coverImage") => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        if (type === "image") {
          setImagePreview(result)
          form.setValue("image", result)
        } else {
          setCoverImagePreview(result)
          form.setValue("coverImage", result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Evento" : "Criar Novo Evento"}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Atualize as informações do evento abaixo."
              : "Preencha as informações abaixo para criar um novo evento."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Título do Evento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: LA VIE GLOW PARTY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date - Simplified to text input */}
              <FormField
                control={form.control}
                name="dateString"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data (DD/MM/AAAA)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 25/12/2025" {...field} />
                    </FormControl>
                    <FormDescription>Digite a data no formato DD/MM/AAAA</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Venue Name */}
              <FormField
                control={form.control}
                name="venueName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Local</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Club XYZ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Rua ABC, 123 - Blumenau, SC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Age Rating */}
              <FormField
                control={form.control}
                name="ageRating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Classificação Indicativa</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="livre">Livre</SelectItem>
                        <SelectItem value="18">+18 anos</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="festa">Festa</SelectItem>
                        <SelectItem value="show">Show</SelectItem>
                        <SelectItem value="teatro">Teatro</SelectItem>
                        <SelectItem value="congresso">Congresso</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="esportivo">Esportivo</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* About */}
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Sobre o Evento</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descreva o seu evento..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem do Evento</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept="image/*"
                            id="event-image"
                            className="hidden"
                            onChange={(e) => handleImageChange(e, "image")}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("event-image")?.click()}
                            className="w-full"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Selecionar Imagem
                          </Button>
                        </div>
                        {imagePreview && (
                          <div className="mt-2 relative w-full h-[150px] rounded-md overflow-hidden">
                            <img
                              src={imagePreview || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>Imagem principal do evento.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cover Image */}
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem de Capa</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept="image/*"
                            id="cover-image"
                            className="hidden"
                            onChange={(e) => handleImageChange(e, "coverImage")}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("cover-image")?.click()}
                            className="w-full"
                          >
                            <ImageIcon className="mr-2 h-4 w-4" />
                            Selecionar Capa
                          </Button>
                        </div>
                        {coverImagePreview && (
                          <div className="mt-2 relative w-full h-[150px] rounded-md overflow-hidden">
                            <img
                              src={coverImagePreview || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>Imagem de capa para o evento.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#400041] hover:bg-[#5a105b]">
                {initialData ? "Salvar Alterações" : "Criar Evento"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
