# Multi-stage Dockerfile para aplicação React
# Baseado em PDF 084 - Containerização e Configuração

# Estágio base (Build)
FROM node:22-bullseye-slim AS base

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Instalar dependências de sistema operacional
RUN apt-get update && apt-get install -y --no-install-recommends bash && rm -rf /var/lib/apt/lists/*

# Copiar package.json (evitar package-lock para permitir npm install resolver optional deps)
COPY package.json ./

# Instalar dependências completas
RUN npm install --no-audit --no-fund

# Copiar código-fonte
COPY . .

# Compilar aplicação
RUN npm run build

# Estágio prod (Produção/Runtime)
FROM node:22-bullseye-slim AS prod

# Instalar bash
RUN apt-get update && apt-get install -y --no-install-recommends bash && rm -rf /var/lib/apt/lists/*

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json para instalação de produção
COPY package.json ./

# Instalar apenas dependências de produção
RUN npm install --no-audit --no-fund --omit=dev

# Copiar artefatos compilados do estágio base
COPY --from=base /usr/src/app/dist ./dist

# Expor porta
EXPOSE 5173

# Definir variável de ambiente
ENV NODE_ENV=production

# Instalar um servidor estático leve para servir o build
RUN npm install -g serve

# Comando de inicialização: servir a pasta dist estaticamente
CMD ["serve", "-s", "dist", "-l", "5173"]


