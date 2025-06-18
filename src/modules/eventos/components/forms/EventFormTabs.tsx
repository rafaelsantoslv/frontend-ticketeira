import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useFormContext } from "react-hook-form"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// TAB DETALHES
export function EventFormTabDetails({ imagePreview, onImageChange, onImageRemove }: {
    imagePreview: string | null
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onImageRemove: () => void
}) {
    const form = useFormContext()

    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="bannerImage"
                render={() => (
                    <FormItem>
                        <FormLabel>Imagem do Banner</FormLabel>
                        <FormControl>
                            <div className="space-y-4">
                                {imagePreview ? (
                                    <div className="relative">
                                        <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg border" />
                                        <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={onImageRemove}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                                        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Clique para fazer upload da imagem do banner</p>
                                        <Input type="file" accept="image/*" onChange={onImageChange} className="cursor-pointer" />
                                    </div>
                                )}
                            </div>
                        </FormControl>
                        <FormDescription>Esta imagem será exibida como banner do evento (recomendado: 1200x600px)</FormDescription>
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
                            <Input placeholder="Ex: Festival de Música Rock 2024" {...field} />
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
                            <Textarea rows={6} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    <SelectItem value="music">Música</SelectItem>
                                    <SelectItem value="sports">Esportes</SelectItem>
                                    <SelectItem value="arts">Artes</SelectItem>
                                    <SelectItem value="business">Negócios</SelectItem>
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
                                    <SelectItem value="livre">Livre</SelectItem>
                                    <SelectItem value="18+">18 anos</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}

// TAB DATETIME
export function EventFormTabDatetime() {
    const form = useFormContext()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["startDate", "endDate"].map((fieldName) => (
                <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName as "startDate" | "endDate"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>{fieldName === "startDate" ? "Data de Início" : "Data de Término"}</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant="outline" className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                        >
                                            {field.value ? format(field.value, "PPP 'às' HH:mm", { locale: ptBR }) : <span>Selecione</span>}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => {
                                            if (!date) return
                                            const hours = field.value?.getHours() || 19
                                            const minutes = field.value?.getMinutes() || 0
                                            const newDate = new Date(date)
                                            newDate.setHours(hours, minutes)
                                            field.onChange(newDate)
                                        }}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                    />
                                    <div className="p-3 border-t">
                                        <Input
                                            type="time"
                                            value={field.value ? format(field.value, "HH:mm") : "19:00"}
                                            onChange={(e) => {
                                                const [hours, minutes] = e.target.value.split(":")
                                                const newDate = field.value || new Date()
                                                newDate.setHours(+hours, +minutes)
                                                field.onChange(new Date(newDate))
                                            }}
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
        </div>
    )
}

// TAB LOCATION
export function EventFormTabLocation() {
    const form = useFormContext()

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">Informações do Local</h3>
            </div>

            <FormField
                control={form.control}
                name="locationName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome do Local</FormLabel>
                        <FormControl>
                            <Input placeholder="Ex: Centro de Convenções" {...field} />
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
                            <Input placeholder="Rua das Flores, 123 - Centro" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                    control={form.control}
                    name="locationCity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: São Paulo" {...field} />
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
                                <Input
                                    placeholder="SP"
                                    maxLength={2}
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="locationZip"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="00000-000"
                                    {...field}
                                    onChange={(e) => {
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
            </div>
        </div>
    )
}
