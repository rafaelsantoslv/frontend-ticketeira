"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, MapPin, Bold, Italic, Underline, List, ListOrdered } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"

// Editor de texto rico
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TiptapUnderline from "@tiptap/extension-underline"

const formSchema = z.object({
    title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
    description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
    category: z.string({ required_error: "Selecione uma categoria" }),
    ageRating: z.string({ required_error: "Selecione uma classificação etária" }),
    startDate: z.date({ required_error: "Selecione a data de início" }).optional(),
    endDate: z.date({ required_error: "Selecione a data de término" }).optional(),
    locationName: z.string().min(2, { message: "Informe o nome do local" }),
    locationAddress: z.string().min(5, { message: "Informe o endereço" }),
    locationCity: z.string().min(2, { message: "Informe a cidade" }),
    locationState: z.string().length(2, { message: "Use a sigla do estado (2 letras)" }),
    locationZip: z.string().min(8, { message: "Informe um CEP válido" }),
    bannerImage: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null
    }

    return (
        <div className="flex items-center gap-1 mb-2 border rounded-md p-1 bg-muted/30">
            <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                aria-label="Negrito"
            >
                <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                aria-label="Itálico"
            >
                <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("underline")}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                aria-label="Sublinhado"
            >
                <Underline className="h-4 w-4" />
            </Toggle>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                aria-label="Lista com marcadores"
            >
                <List className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                aria-label="Lista numerada"
            >
                <ListOrdered className="h-4 w-4" />
            </Toggle>
        </div>
    )
}

const Tiptap = ({ onChange, content }) => {
    const editor = useEditor({
        extensions: [StarterKit, TiptapUnderline],
        content: content || "",
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "focus:outline-none",
            },
        },
    })

    return (
        <div className="border rounded-md">
            <MenuBar editor={editor} />
            <div className="p-2 min-h-[150px] prose prose-sm max-w-none focus-within:outline-none">
                <EditorContent editor={editor} className="focus:outline-none" />
            </div>
        </div>
    )
}

const getCategoryColor = (category) => {
    const colors = {
        Music: "bg-purple-100 text-purple-800 hover:bg-purple-100",
        Sports: "bg-green-100 text-green-800 hover:bg-green-100",
        Arts: "bg-blue-100 text-blue-800 hover:bg-blue-100",
        Food: "bg-orange-100 text-orange-800 hover:bg-orange-100",
        Business: "bg-gray-100 text-gray-800 hover:bg-gray-100",
        Education: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    }
    return colors[category] || "bg-gray-100 text-gray-800 hover:bg-gray-100"
}

const getAgeRatingColor = (rating) => {
    const colors = {
        Livre: "bg-green-100 text-green-800",
        "10+": "bg-blue-100 text-blue-800",
        "12+": "bg-yellow-100 text-yellow-800",
        "14+": "bg-orange-100 text-orange-800",
        "16+": "bg-red-100 text-red-800",
        "18+": "bg-red-200 text-red-900",
    }
    return colors[rating] || "bg-gray-100 text-gray-800"
}

export default function CreateEventDialog({ isOpen, onClose }) {
    const [htmlDescription, setHtmlDescription] = useState("")

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            ageRating: "",
            locationName: "",
            locationAddress: "",
            locationCity: "",
            locationState: "",
            locationZip: "",
            bannerImage: "",
        },
    })

    const watchAllFields = form.watch()

    useEffect(() => {
        // Atualiza o campo de descrição quando o HTML muda
        if (htmlDescription) {
            form.setValue("description", htmlDescription, { shouldValidate: true })
        }
    }, [htmlDescription, form])

    function onSubmit(values: FormValues) {
        console.log(values)
        // Aqui você pode enviar os dados para sua API
        alert("Evento criado com sucesso!")

    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>

            <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Criar Novo Evento</DialogTitle>
                    <DialogDescription>Preencha os detalhes do seu evento. Clique em salvar quando terminar.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Formulário */}
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <Tabs defaultValue="details" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="details">Detalhes</TabsTrigger>
                                        <TabsTrigger value="datetime">Data e Hora</TabsTrigger>
                                        <TabsTrigger value="location">Localização</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="details" className="space-y-4 pt-4">
                                        <FormField
                                            control={form.control}
                                            name="bannerImage"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Imagem de Banner</FormLabel>
                                                    <FormControl>
                                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                                            <Input
                                                                id="picture"
                                                                type="file"
                                                                accept="image/*"
                                                                className="cursor-pointer"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0]
                                                                    if (file) {
                                                                        const reader = new FileReader()
                                                                        reader.onload = (event) => {
                                                                            field.onChange(event.target?.result)
                                                                        }
                                                                        reader.readAsDataURL(file)
                                                                    }
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
                                                        <Tiptap onChange={setHtmlDescription} content={field.value} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-2 gap-4">
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
                                                            <SelectContent>
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

                                    <TabsContent value="datetime" className="space-y-4 pt-4">
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
                                                            <PopoverContent className="w-auto p-0" align="start">
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
                                                            <PopoverContent className="w-auto p-0" align="start">
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

                                    <TabsContent value="location" className="space-y-4 pt-4">
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
                                </Tabs>

                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit">Salvar Evento</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>

                    {/* Pré-visualização */}
                    <div className="hidden md:block">
                        <div className="sticky top-4">
                            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Pré-visualização do Evento</h3>
                            <Card className="overflow-hidden">
                                <div className="h-40 bg-gradient-to-r from-violet-500 to-purple-700 flex items-center justify-center relative overflow-hidden">
                                    {watchAllFields.bannerImage ? (
                                        <img
                                            src={watchAllFields.bannerImage || "/placeholder.svg"}
                                            alt="Banner do evento"
                                            className="w-full h-full object-cover absolute inset-0"
                                        />
                                    ) : (
                                        <span className="text-white text-lg font-medium">{watchAllFields.title || "Título do Evento"}</span>
                                    )}
                                    {watchAllFields.bannerImage && (
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                            <span className="text-white text-lg font-medium drop-shadow-md">
                                                {watchAllFields.title || "Título do Evento"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl">{watchAllFields.title || "Título do Evento"}</CardTitle>
                                        {watchAllFields.ageRating && (
                                            <Badge variant="outline" className={cn(getAgeRatingColor(watchAllFields.ageRating))}>
                                                {watchAllFields.ageRating}
                                            </Badge>
                                        )}
                                    </div>
                                    {watchAllFields.category && (
                                        <Badge variant="secondary" className={cn(getCategoryColor(watchAllFields.category))}>
                                            {watchAllFields.category === "Music"
                                                ? "Música"
                                                : watchAllFields.category === "Sports"
                                                    ? "Esportes"
                                                    : watchAllFields.category === "Arts"
                                                        ? "Artes"
                                                        : watchAllFields.category === "Food"
                                                            ? "Gastronomia"
                                                            : watchAllFields.category === "Business"
                                                                ? "Negócios"
                                                                : watchAllFields.category === "Education"
                                                                    ? "Educação"
                                                                    : watchAllFields.category}
                                        </Badge>
                                    )}
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <div
                                            className="prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{
                                                __html: watchAllFields.description || "<p>Descrição do evento aparecerá aqui...</p>",
                                            }}
                                        />
                                    </div>

                                    {(watchAllFields.startDate || watchAllFields.endDate) && (
                                        <div className="flex flex-col gap-1 text-sm">
                                            <div className="font-medium">Data e Hora</div>
                                            {watchAllFields.startDate && (
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span>Início: {format(watchAllFields.startDate, "PPP 'às' HH:mm", { locale: ptBR })}</span>
                                                </div>
                                            )}
                                            {watchAllFields.endDate && (
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                    <span>Término: {format(watchAllFields.endDate, "PPP 'às' HH:mm", { locale: ptBR })}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {(watchAllFields.locationName || watchAllFields.locationAddress || watchAllFields.locationCity) && (
                                        <div className="flex flex-col gap-1 text-sm">
                                            <div className="font-medium">Local</div>
                                            <div className="flex items-start gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                <div>
                                                    {watchAllFields.locationName && (
                                                        <div className="font-medium">{watchAllFields.locationName}</div>
                                                    )}
                                                    {watchAllFields.locationAddress && <div>{watchAllFields.locationAddress}</div>}
                                                    {(watchAllFields.locationCity || watchAllFields.locationState) && (
                                                        <div>
                                                            {watchAllFields.locationCity}
                                                            {watchAllFields.locationCity && watchAllFields.locationState && ", "}
                                                            {watchAllFields.locationState}
                                                            {watchAllFields.locationZip && ` - ${watchAllFields.locationZip}`}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className="flex justify-end pt-0">
                                    <Button size="sm" variant="default">
                                        Inscrever-se
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
