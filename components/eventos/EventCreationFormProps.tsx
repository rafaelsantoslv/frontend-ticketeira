"use client"

import type React from "react"
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
import { useEventForm } from "@/hooks/useEventForm"
import { DateTimeFields } from "../DateTimeFields"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Popover, PopoverContent } from "../ui/popover"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { useState } from "react"
import { cn } from "@/lib/utils"




export default function EventCreationForm({ isOpen, onClose, onSubmit, initialData }: EventCreationFormProps) {
  const { form, handleSubmit } = useEventForm(initialData)
  const [date, setDate] = useState<Date | undefined>(undefined);

  const onSubmitForm = (data) => {
    const formattedData = handleSubmit(data)
    onSubmit(formattedData)
    form.reset()
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
          <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Título do Evento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: FESTA DAS CORES..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date - Simplified to text input */}

              <DateTimeFields control={form.control} namePrefix="start" />

              {/* Venue Name */}
              <FormField
                control={form.control}
                name="locationName"
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
                name="locationAddress"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Rua ABC, 123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locationCity"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Florianópolis" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locationState"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: SantaCatarina" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locationZip"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 88010-000" {...field} />
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
              {/* <FormField
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
                /> */}

              {/* Cover Image */}
              {/* <FormField
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
                /> */}
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
