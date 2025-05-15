"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

interface DateTimePickerProps {
    date: Date | undefined
    setDate: (date: Date | undefined) => void
    label: string
    description?: string
}

export function DateTimePicker({ date, setDate, label, description }: DateTimePickerProps) {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)
    const [selectedTime, setSelectedTime] = React.useState<string>(date ? format(date, "HH:mm") : "00:00")

    // Update the combined date and time when either changes
    React.useEffect(() => {
        if (selectedDate) {
            const [hours, minutes] = selectedTime.split(":").map(Number)
            const newDate = new Date(selectedDate)
            newDate.setHours(hours, minutes)
            setDate(newDate)
        } else {
            setDate(undefined)
        }
    }, [selectedDate, selectedTime, setDate])

    return (
        <div className="flex flex-col space-y-2">
            <FormLabel>{label}</FormLabel>
            <div className="flex flex-col space-y-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                            locale={ptBR}
                            className="rounded-md border shadow-md"
                        />
                    </PopoverContent>
                </Popover>

                <div className="flex items-center">
                    <div className="flex w-full items-center space-x-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <Input
                            type="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="flex-1"
                        />
                    </div>
                </div>
            </div>
            {description && <FormDescription>{description}</FormDescription>}
        </div>
    )
}

export function FormDateTimePicker({ field, fieldState, label, description }) {
    return (
        <FormItem className="flex flex-col space-y-2">
            <FormControl>
                <DateTimePicker date={field.value} setDate={field.onChange} label={label} description={description} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}
