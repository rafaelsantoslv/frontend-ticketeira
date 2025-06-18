"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { useAuth } from "@/modules/auth/contexts/useAuth"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import { User } from "@/types/Auth"
import { loginSchema, LoginFormData } from "@/modules/auth/schemas/loginSchema"
import { toast } from "sonner"

export function LoginForm() {
    const router = useRouter()
    const { login } = useAuth()

    const { isLoading, error, handleSubmit } = useFormSubmit<User>({
        onSuccess: () => {
            toast.success("Login realizado com sucesso")
            router.push("/painel")
        },
    })

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: LoginFormData) => {
        const result = await login(data.email, data.password)
        if (!result.success) {
            toast.error(result.error || "Erro ao fazer login. Verifique suas credenciais.")
        }
    }

    return (
        <>
            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => handleSubmit(() => onSubmit(data)))} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="seu@email.com"
                                        autoComplete="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="******"
                                        autoComplete="current-password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full bg-[#400041] hover:bg-[#5a105b] text-white" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Entrando...
                            </>
                        ) : (
                            "Entrar"
                        )}
                    </Button>
                </form>
            </Form>
        </>
    )
}
