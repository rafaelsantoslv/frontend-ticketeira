# Etapa 1: build
FROM node:20 AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm build

# Etapa 2: produção
FROM node:20-alpine AS runner
WORKDIR /app

# Instale o PNPM na imagem de produção
RUN npm install -g pnpm

# Copie apenas o que é necessário para rodar a aplicação
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# Use pnpm start em vez de next start diretamente
CMD ["pnpm", "start"]