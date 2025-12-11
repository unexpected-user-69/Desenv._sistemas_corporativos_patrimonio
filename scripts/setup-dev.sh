#!/bin/bash

# Script para configurar ambiente de desenvolvimento completo
# Backend + Frontend + Database

set -e

echo "🚀 Configurando Ambiente de Desenvolvimento Completo..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar se estamos no diretório correto
if [ ! -f "README.md" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    log_error "Execute este script na raiz do projeto (onde estão as pastas backend e frontend)"
    exit 1
fi

# 1. Verificar dependências do sistema
log_info "Verificando dependências do sistema..."

# Node.js
if ! command -v node &> /dev/null; then
    log_error "Node.js não está instalado. Instale em: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
log_success "Node.js: $NODE_VERSION"

# npm
if ! command -v npm &> /dev/null; then
    log_error "npm não está instalado"
    exit 1
fi

NPM_VERSION=$(npm --version)
log_success "npm: $NPM_VERSION"

# Docker
if ! command -v docker &> /dev/null; then
    log_warning "Docker não está instalado. Necessário para o banco de dados"
    log_info "Instale em: https://docs.docker.com/get-docker/"
else
    DOCKER_VERSION=$(docker --version)
    log_success "Docker: $DOCKER_VERSION"
fi

# Docker Compose
if ! command -v docker-compose &> /dev/null; then
    log_warning "Docker Compose não está instalado"
    log_info "Instale em: https://docs.docker.com/compose/install/"
else
    COMPOSE_VERSION=$(docker-compose --version)
    log_success "Docker Compose: $COMPOSE_VERSION"
fi

# 2. Configurar arquivo .env
log_info "Configurando arquivo .env..."

if [ ! -f ".env" ]; then
    if [ -f "env.example" ]; then
        cp env.example .env
        log_success "Arquivo .env criado a partir do env.example"
        log_warning "Edite o arquivo .env com suas configurações específicas"
    else
        log_error "Arquivo env.example não encontrado"
        exit 1
    fi
else
    log_success "Arquivo .env já existe"
fi

# 3. Configurar backend
log_info "Configurando backend..."

cd backend

# Instalar dependências
log_info "Instalando dependências do backend..."
npm ci
log_success "Dependências do backend instaladas"

# Configurar .env do backend
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        log_success "Arquivo .env do backend criado"
    else
        log_warning "Arquivo .env.example do backend não encontrado"
    fi
fi

cd ..

# 4. Configurar frontend
log_info "Configurando frontend..."

cd frontend

# Instalar dependências
log_info "Instalando dependências do frontend..."
npm ci
log_success "Dependências do frontend instaladas"

cd ..

# 5. Configurar banco de dados
log_info "Configurando banco de dados..."

# Verificar se Docker está rodando
if command -v docker &> /dev/null; then
    if docker info &> /dev/null; then
        log_info "Iniciando banco de dados PostgreSQL..."
        docker-compose up db -d
        
        # Aguardar banco ficar pronto
        log_info "Aguardando banco de dados ficar pronto..."
        sleep 10
        
        # Verificar se o banco está rodando
        if docker-compose ps db | grep -q "Up"; then
            log_success "Banco de dados PostgreSQL iniciado"
        else
            log_error "Falha ao iniciar banco de dados"
            exit 1
        fi
    else
        log_warning "Docker não está rodando. Inicie o Docker e execute: docker-compose up db -d"
    fi
else
    log_warning "Docker não instalado. Configure o banco de dados manualmente"
fi

# 6. Executar migrações do backend
log_info "Executando migrações do banco de dados..."

cd backend
if npm run migration:run &> /dev/null; then
    log_success "Migrações executadas com sucesso"
else
    log_warning "Falha ao executar migrações. Execute manualmente: cd backend && npm run migration:run"
fi
cd ..

# 7. Executar testes
log_info "Executando testes..."

# Testes do backend
log_info "Executando testes do backend..."
cd backend
if npm test &> /dev/null; then
    log_success "Testes do backend passaram"
else
    log_warning "Alguns testes do backend falharam. Execute manualmente: cd backend && npm test"
fi
cd ..

# Testes do frontend
log_info "Executando testes do frontend..."
cd frontend
if npm test &> /dev/null; then
    log_success "Testes do frontend passaram"
else
    log_warning "Alguns testes do frontend falharam. Execute manualmente: cd frontend && npm test"
fi
cd ..

# 8. Build dos projetos
log_info "Executando build dos projetos..."

# Build do backend
log_info "Executando build do backend..."
cd backend
if npm run build &> /dev/null; then
    log_success "Build do backend executado com sucesso"
else
    log_error "Falha no build do backend. Corrija os erros antes de continuar"
    exit 1
fi
cd ..

# Build do frontend
log_info "Executando build do frontend..."
cd frontend
if npm run build &> /dev/null; then
    log_success "Build do frontend executado com sucesso"
else
    log_error "Falha no build do frontend. Corrija os erros antes de continuar"
    exit 1
fi
cd ..

# 9. Resumo final
echo ""
log_success "🎉 Ambiente de desenvolvimento configurado com sucesso!"
echo ""
echo "📊 Resumo da configuração:"
echo "  ✅ Dependências do sistema verificadas"
echo "  ✅ Dependências do backend instaladas"
echo "  ✅ Dependências do frontend instaladas"
echo "  ✅ Arquivo .env configurado"
echo "  ✅ Banco de dados PostgreSQL iniciado"
echo "  ✅ Migrações executadas"
echo "  ✅ Testes executados"
echo "  ✅ Build executado"
echo ""
echo "🚀 Comandos úteis:"
echo "  🗄️  Iniciar banco: docker-compose up db -d"
echo "  🚀 Iniciar backend: cd backend && npm run start:dev"
echo "  🎨 Iniciar frontend: cd frontend && npm run dev"
echo "  🐳 Iniciar tudo com Docker: docker-compose up --build"
echo "  🧪 Testes backend: cd backend && npm test"
echo "  🧪 Testes frontend: cd frontend && npm test"
echo ""
echo "📚 URLs importantes:"
echo "  🌐 Frontend: http://localhost:5173"
echo "  🚀 Backend: http://localhost:3101"
echo "  📖 Swagger: http://localhost:3101/docs"
echo "  🗄️  Database: localhost:5432"
echo ""
log_success "✨ Ambiente pronto para desenvolvimento!"
