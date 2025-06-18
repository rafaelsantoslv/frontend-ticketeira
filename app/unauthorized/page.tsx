import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldX, Home } from "lucide-react"

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <ShieldX className="h-8 w-8 text-red-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">401 - Não Autorizado</CardTitle>
                    <CardDescription className="text-gray-600">
                        Você não tem permissão para acessar esta página.
                    </CardDescription>
                </CardHeader>

                <CardContent className="text-center">
                    <p className="text-sm text-gray-500 mb-6">
                        Parece que você não tem permissão para visualizar este conteúdo
                    </p>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Voltar ao Início
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
