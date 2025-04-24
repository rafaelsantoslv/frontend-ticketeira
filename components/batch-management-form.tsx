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

const formSchema = z.object({
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

type BatchManagementFormProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: z.infer<typeof formSchema>) => void
  eventName: string
}

export default function BatchManagementForm({ isOpen, onClose, onSubmit, eventName }: BatchManagementFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Lote</DialogTitle>
          <DialogDescription>Adicione um novo lote para o evento {eventName}.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
      </DialogContent>
    </Dialog>
  )
}
