"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  sectorId: z.string({
    required_error: "Por favor, selecione um setor",
  }),
  name: z.string().min(2, {
    message: "O nome do lote deve ter pelo menos 2 caracteres.",
  }),
  quantity: z.coerce.number().min(1, {
    message: "A quantidade deve ser pelo menos 1.",
  }),
  price: z.coerce.number().min(0, {
    message: "O preço não pode ser negativo.",
  }),
  active: z.boolean().default(true),
})

type Sector = {
  id: string
  name: string
  capacity: number
  description?: string
}

type BatchManagementFormProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: z.infer<typeof formSchema>) => void
  eventName: string
  sectors: Sector[]
}

export default function BatchManagementForm({
  isOpen,
  onClose,
  onSubmit,
  eventName,
  sectors,
}: BatchManagementFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sectorId: "",
      name: "",
      quantity: 100,
      price: 0,
      active: true,
    },
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values)
    form.reset()
  }

  const noSectors = sectors.length === 0

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Lote</DialogTitle>
          <DialogDescription>Adicione um novo lote para o evento {eventName}.</DialogDescription>
        </DialogHeader>

        {noSectors ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground mb-4">
              Você precisa criar pelo menos um setor antes de adicionar lotes.
            </p>
            <Button onClick={onClose} className="bg-[#400041] hover:bg-[#5a105b]">
              Entendi
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="sectorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Setor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um setor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sectors.map((sector) => (
                          <SelectItem key={sector.id} value={sector.id}>
                            {sector.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Selecione o setor para este lote</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Lote</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 1º Lote, Promocional, Meia-entrada" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Status do Lote</FormLabel>
                      <FormDescription>
                        {field.value ? "Lote ativo e disponível para venda" : "Lote inativo e indisponível para venda"}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#400041] hover:bg-[#5a105b]">
                  Adicionar Lote
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
