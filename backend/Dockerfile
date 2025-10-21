# Multi-stage Dockerfile para aplicação NestJS
# Baseado em PDF 084 - Containerização e Configuração

# Estágio base (Build)
FROM node:22-alpine AS base

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Instalar dependências de sistema operacional
RUN apk add --no-cache bash postgresql-client

# Copiar package files
COPY package*.json ./

# Instalar dependências completas
RUN npm ci

# Copiar código-fonte
COPY . .

# Compilar aplicação
RUN npm run build

# Estágio prod (Produção/Runtime)
FROM node:22-alpine AS prod

# Instalar bash e cliente PostgreSQL para executar start.sh (pg_isready)
RUN apk add --no-cache bash postgresql-client

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar package files
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --omit=dev

# Copiar artefatos compilados do estágio base
COPY --from=base /usr/src/app/dist ./dist


# Copiar script de inicialização
COPY --from=base /usr/src/app/start.sh ./

# Garantir finais de linha LF (remover CR) e tornar script executável
RUN sed -i 's/\r$//' ./start.sh && chmod +x ./start.sh

# Definir variável de ambiente
ENV NODE_ENV=production

# Comando de inicialização
CMD ["bash", "./start.sh"]
