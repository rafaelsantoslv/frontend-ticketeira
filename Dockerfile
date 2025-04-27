# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /app

# Instala pnpm globalmente
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

# Copia arquivos de dependências
COPY pnpm-lock.yaml package.json ./

# Instala dependências com pnpm
RUN pnpm install --frozen-lockfile

# Copia restante dos arquivos da aplicação
COPY . .

# Gera build standalone do Next.js
RUN pnpm build

# Etapa 2: Imagem final para produção
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Instala pnpm novamente (caso precise rodar algo extra)
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

# Copia apenas o necessário do build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
