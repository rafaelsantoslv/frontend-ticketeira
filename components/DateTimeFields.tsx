import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"


export const DateTimeFields = ({ control, namePrefix }: { control: any; namePrefix: string }) => (
    <>
        <FormField
            control={control}
            name={`${namePrefix}Date`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                        <Input placeholder="DD/MM/AAAA" {...field} />
                    </FormControl>
                    <FormDescription>Digite a data</FormDescription>
                </FormItem>
            )}
        />


        <FormField
            control={control}
            name={`${namePrefix}Time`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <FormControl>
                        <Input type="time" {...field} />
                    </FormControl>
                    <FormDescription>Digite o horário</FormDescription>
                </FormItem>
            )}
        />
    </>
)