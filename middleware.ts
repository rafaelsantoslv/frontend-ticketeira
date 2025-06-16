import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Route } from "./types/MiddlewareType"

const ROUTES: Record<string, Route> = {
  home: {
    path: '/',
    isProtected: false
  },
  login: {
    path: '/login',
    isProtected: false,
    isAuthRoute: true
  },
  register: {
    path: '/register',
    isProtected: false,
    isAuthRoute: true
  },
  painel: {
    path: '/painel',
    isProtected: true
  }
}


export function middleware(request: NextRequest) {

  if (process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isAuthRoute = (path: string): boolean => {
    return Object.values(ROUTES).some(
      route => route.isAuthRoute && path.startsWith(route.path)
    );
  }

  const isProtectedRoute = (path: string): boolean => {
    return Object.values(ROUTES).some(
      route => route.isProtected && path.startsWith(route.path)
    );
  }

  // Função para redirecionar
  const redirectTo = (path: string): NextResponse => {
    return NextResponse.redirect(new URL(path, request.url));
  }

  try {
    // Usuário não autenticado tentando acessar rota protegida
    if (!token && isProtectedRoute(pathname)) {
      console.log(`Redirecionamento: Acesso negado à rota protegida ${pathname}`);
      return redirectTo(ROUTES.login.path);
    }

    // Usuário autenticado tentando acessar rotas de auth
    if (token && isAuthRoute(pathname)) {
      console.log(`Redirecionamento: Usuário autenticado tentando acessar ${pathname}`);
      return redirectTo(ROUTES.painel.path);
    }

    // Permite a continuação da requisição
    return NextResponse.next();
  } catch (error) {
    console.error('Erro no middleware:', error);
    return redirectTo(ROUTES.home.path);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/painel/:path*"],
}
