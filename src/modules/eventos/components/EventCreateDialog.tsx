"use client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useEventForm } from "@/hooks/useEventForm"
import { useFormErrors } from "@/hooks/useEventFormError"
import { RichTextEditor } from "@/modules/eventos/components/EditTextMenuBar"


export function CreateEventDialog({ isOpen, onClose }) {

    const {
        form,
        formState,
        handleSubmit,
        resetForm,
        setHtmlDescription,
        formSubmitted,
    } = useEventForm()

    const { errors } = formState

    const { activeTab, setActiveTab, hasDetailsErrors, hasDatetimeErrors, hasLocationErrors } = useFormErrors(
        errors,
        formSubmitted,
    )

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => !open && onClose()}
        >
            <DialogTrigger asChild>
                <Button size="lg">Criar Novo Evento</Button>
            </DialogTrigger>
            <DialogContent className="w-[800px]  p-6 max-w-screen-lg">
                <DialogHeader className="px-1">
                    <DialogTitle>Criar Novo Evento</DialogTitle>
                    <DialogDescription>Preencha os detalhes do seu evento. Clique em salvar quando terminar.</DialogDescription>
                </DialogHeader>

                <div className="w-full">
                    <Form {...form}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="details" className="relative">
                                        Detalhes
                                        {hasDetailsErrors && (
                                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
                                        )}
                                    </TabsTrigger>
                                    <TabsTrigger value="datetime" className="relative">
                                        Data e Hora
                                        {hasDatetimeErrors && (
                                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
                                        )}
                                    </TabsTrigger>
                                    <TabsTrigger value="location" className="relative">
                                        Localização
                                        {hasLocationErrors && (
                                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
                                        )}
                                    </TabsTrigger>
                                </TabsList>

                                <div className="mt-4 h-[420px] overflow-y-auto px-1">
                                    <TabsContent value="details" className="space-y-4 pt-2 h-full">
                                        <FormField
                                            control={form.control}
                                            name="bannerImage"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Imagem de Banner</FormLabel>
                                                    <FormControl>
                                                        <div className="grid w-full items-center gap-1.5">
                                                            <Input
                                                                id="picture"
                                                                type="file"
                                                                accept="image/*"
                                                                className="cursor-pointer"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0] || null;
                                                                    form.setValue("bannerImage", file);
                                                                }}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormDescription>Esta imagem será usada como banner do seu evento</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Título do Evento</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ex: Rock Concert" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Descrição</FormLabel>
                                                    <FormControl>
                                                        <RichTextEditor content={field.value} onChange={setHtmlDescription} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-2 gap-4 pb-6">
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
                                                            <SelectContent position="popper" sideOffset={5} align="start" side="bottom">
                                                                <SelectItem value="Music">Música</SelectItem>
                                                                <SelectItem value="Sports">Esportes</SelectItem>
                                                                <SelectItem value="Arts">Artes</SelectItem>
                                                                <SelectItem value="Food">Gastronomia</SelectItem>
                                                                <SelectItem value="Business">Negócios</SelectItem>
                                                                <SelectItem value="Education">Educação</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="ageRating"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Classificação Etária</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecione" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent position="popper" sideOffset={5} align="start" side="bottom">
                                                                <SelectItem value="Livre">Livre</SelectItem>
                                                                <SelectItem value="10+">10+</SelectItem>
                                                                <SelectItem value="12+">12+</SelectItem>
                                                                <SelectItem value="14+">14+</SelectItem>
                                                                <SelectItem value="16+">16+</SelectItem>
                                                                <SelectItem value="18+">18+</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="datetime" className="space-y-4 pt-2 h-full">
                                        <div className="grid grid-cols-1 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="startDate"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel>Data e Hora de Início</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-full pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground",
                                                                        )}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP 'às' HH:mm", { locale: ptBR })
                                                                        ) : (
                                                                            <span>Selecione a data e hora</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start" side="bottom" sideOffset={5}>
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={(date) => {
                                                                        if (date) {
                                                                            const newDate = new Date(date)
                                                                            // Preservar a hora se já existir
                                                                            if (field.value) {
                                                                                newDate.setHours(field.value.getHours(), field.value.getMinutes())
                                                                            } else {
                                                                                newDate.setHours(20, 0) // Default 20:00
                                                                            }
                                                                            field.onChange(newDate)
                                                                        }
                                                                    }}
                                                                    initialFocus
                                                                    locale={ptBR}
                                                                />
                                                                <div className="p-3 border-t border-border">
                                                                    <Input
                                                                        type="time"
                                                                        onChange={(e) => {
                                                                            const date = field.value || new Date()
                                                                            const [hours, minutes] = e.target.value.split(":")
                                                                            date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
                                                                            field.onChange(new Date(date)) // Criar nova instância para garantir atualização
                                                                        }}
                                                                        value={field.value ? format(field.value, "HH:mm") : "20:00"}
                                                                    />
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormDescription>Quando o evento começa</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="endDate"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel>Data e Hora de Término</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-full pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground",
                                                                        )}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP 'às' HH:mm", { locale: ptBR })
                                                                        ) : (
                                                                            <span>Selecione a data e hora</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start" side="bottom" sideOffset={5}>
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={(date) => {
                                                                        if (date) {
                                                                            const newDate = new Date(date)
                                                                            // Preservar a hora se já existir
                                                                            if (field.value) {
                                                                                newDate.setHours(field.value.getHours(), field.value.getMinutes())
                                                                            } else {
                                                                                newDate.setHours(23, 0) // Default 23:00
                                                                            }
                                                                            field.onChange(newDate)
                                                                        }
                                                                    }}
                                                                    initialFocus
                                                                    locale={ptBR}
                                                                />
                                                                <div className="p-3 border-t border-border">
                                                                    <Input
                                                                        type="time"
                                                                        onChange={(e) => {
                                                                            const date = field.value || new Date()
                                                                            const [hours, minutes] = e.target.value.split(":")
                                                                            date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
                                                                            field.onChange(new Date(date)) // Criar nova instância para garantir atualização
                                                                        }}
                                                                        value={field.value ? format(field.value, "HH:mm") : "23:00"}
                                                                    />
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormDescription>Quando o evento termina</FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="location" className="space-y-4 pt-2 h-full">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MapPin className="h-5 w-5 text-muted-foreground" />
                                            <h3 className="text-sm font-medium">Informações do Local</h3>
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="locationName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome do Local</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ex: Rock Arena" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="locationAddress"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Endereço</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ex: Rua Principal, 123" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="locationCity"
                                                render={({ field }) => (
                                                    <FormItem>
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
                                                    <FormItem>
                                                        <FormLabel>Estado</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Ex: SC" maxLength={2} {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="locationZip"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CEP</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Ex: 88000-000"
                                                            {...field}
                                                            onChange={(e) => {
                                                                // Formata o CEP enquanto digita
                                                                let value = e.target.value.replace(/\D/g, "")
                                                                if (value.length > 5) {
                                                                    value = value.substring(0, 5) + "-" + value.substring(5, 8)
                                                                }
                                                                field.onChange(value)
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </TabsContent>
                                </div>
                            </Tabs>

                            <DialogFooter className="px-1">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setOpen(false)
                                        resetForm()
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit">Salvar Evento</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
