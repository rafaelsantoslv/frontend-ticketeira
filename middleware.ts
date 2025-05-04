import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isDevByPass = process.env.SKIP_AUTH === 'true';

  if (isDevByPass) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value
  const isAuthRoute = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")
  const isPublicRoute = request.nextUrl.pathname === "/"
  const isPainelRoute = request.nextUrl.pathname.startsWith("/painel")

  // Se tentar acessar rota do painel sem token, redireciona para login
  if (!token && isPainelRoute) {
    console.log("Redirecionando para /login: Tentativa de acesso ao painel sem token")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Se tentar acessar login/register com token, redireciona para painel
  if (token && isAuthRoute) {
    console.log("Redirecionando para /painel/dashboard: Usuário já autenticado tentando acessar login/register")
    return NextResponse.redirect(new URL("/painel", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/painel/:path*"],
}
