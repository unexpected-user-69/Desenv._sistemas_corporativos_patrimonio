#!/bin/bash

# Script para iniciar o ambiente de desenvolvimento completo
# Backend + Frontend + Database

set -e

echo "🚀 Iniciando Ambiente de Desenvolvimento..."

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

# Função para limpar processos ao sair
cleanup() {
    log_info "Parando serviços..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
    log_success "Serviços parados"
    exit 0
}

# Capturar sinais de interrupção
trap cleanup SIGINT SIGTERM

# 1. Iniciar banco de dados
log_info "Iniciando banco de dados PostgreSQL..."

if command -v docker &> /dev/null && docker info &> /dev/null; then
    docker-compose up db -d
    
    # Aguardar banco ficar pronto
    log_info "Aguardando banco de dados ficar pronto..."
    sleep 5
    
    if docker-compose ps db | grep -q "Up"; then
        log_success "Banco de dados PostgreSQL iniciado"
    else
        log_error "Falha ao iniciar banco de dados"
        exit 1
    fi
else
    log_warning "Docker não está disponível. Certifique-se de que o banco está rodando"
fi

# 2. Iniciar backend
log_info "Iniciando backend (NestJS)..."

cd backend
npm run start:dev &
BACKEND_PID=$!
cd ..

log_success "Backend iniciado (PID: $BACKEND_PID)"

# Aguardar backend ficar pronto
log_info "Aguardando backend ficar pronto..."
sleep 10

# 3. Iniciar frontend
log_info "Iniciando frontend (React)..."

cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

log_success "Frontend iniciado (PID: $FRONTEND_PID)"

# 4. Aguardar serviços ficarem prontos
log_info "Aguardando serviços ficarem prontos..."
sleep 5

# 5. Mostrar informações dos serviços
echo ""
log_success "🎉 Ambiente de desenvolvimento iniciado com sucesso!"
echo ""
echo "📊 Serviços rodando:"
echo "  🗄️  Database: PostgreSQL (localhost:5432)"
echo "  🚀 Backend: NestJS (http://localhost:3101)"
echo "  🎨 Frontend: React (http://localhost:5173)"
echo "  📖 Swagger: http://localhost:3101/docs"
echo ""
echo "🔗 Links úteis:"
echo "  🌐 Aplicação: http://localhost:5173"
echo "  🚀 API: http://localhost:3101"
echo "  📖 Documentação: http://localhost:3101/docs"
echo ""
echo "⏹️  Para parar os serviços, pressione Ctrl+C"
echo ""

# Aguardar indefinidamente
wait
