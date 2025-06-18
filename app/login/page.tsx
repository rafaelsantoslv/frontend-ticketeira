"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/modules/auth/components/LoginForm"

export default function LoginPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Entre com seu email e senha para acessar o painel</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-[#400041] hover:underline">
              Registre-se
            </Link>
          </div>
          <div className="text-center">
            <Link href="/" className="text-sm text-gray-500 hover:underline">
              Voltar para a página inicial
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}





