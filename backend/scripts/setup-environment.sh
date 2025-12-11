#!/bin/bash

# Script para configurar novos ambientes de desenvolvimento
# Baseado no projeto de referência do professor

set -e

echo "🚀 Configurando Ambiente de Desenvolvimento..."

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
if [ ! -f "package.json" ]; then
    log_error "Execute este script na pasta backend (onde está o package.json do backend)"
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

# Git
if ! command -v git &> /dev/null; then
    log_error "Git não está instalado"
    exit 1
fi

GIT_VERSION=$(git --version)
log_success "Git: $GIT_VERSION"

# 2. Instalar dependências do projeto
log_info "Instalando dependências do projeto..."
npm install
log_success "Dependências instaladas"

# 3. Configurar arquivo .env
log_info "Configurando arquivo .env..."

if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        log_success "Arquivo .env criado a partir do .env.example"
        log_warning "Edite o arquivo .env com suas configurações específicas"
    else
        log_error "Arquivo .env.example não encontrado"
        exit 1
    fi
else
    log_success "Arquivo .env já existe"
fi

# 4. Configurar banco de dados
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

# 5. Executar migrações
log_info "Executando migrações do banco de dados..."

if npm run migration:run &> /dev/null; then
    log_success "Migrações executadas com sucesso"
else
    log_warning "Falha ao executar migrações. Execute manualmente: npm run migration:run"
fi

# 6. Executar testes
log_info "Executando testes..."

if npm test &> /dev/null; then
    log_success "Todos os testes passaram"
else
    log_warning "Alguns testes falharam. Execute manualmente: npm test"
fi

# 7. Executar lint
log_info "Executando lint..."

if npm run lint &> /dev/null; then
    log_success "Lint passou sem erros"
else
    log_warning "Lint encontrou problemas. Execute manualmente: npm run lint"
fi

# 8. Build do projeto
log_info "Executando build do projeto..."

if npm run build &> /dev/null; then
    log_success "Build executado com sucesso"
else
    log_error "Falha no build. Corrija os erros antes de continuar"
    exit 1
fi

# 9. Configurar Git hooks (opcional)
log_info "Configurando Git hooks..."

if [ -d ".git" ]; then
    # Criar diretório de hooks se não existir
    mkdir -p .git/hooks
    
    # Hook de pre-commit
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "🔍 Executando pre-commit hooks..."

# Lint
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Lint falhou. Commit cancelado."
    exit 1
fi

# Testes
npm test
if [ $? -ne 0 ]; then
    echo "❌ Testes falharam. Commit cancelado."
    exit 1
fi

echo "✅ Pre-commit hooks passaram!"
EOF

    chmod +x .git/hooks/pre-commit
    log_success "Git hook de pre-commit configurado"
else
    log_warning "Diretório .git não encontrado. Git hooks não configurados"
fi

# 10. Resumo final
echo ""
log_success "🎉 Ambiente de desenvolvimento configurado com sucesso!"
echo ""
echo "📊 Resumo da configuração:"
echo "  ✅ Dependências do sistema verificadas"
echo "  ✅ Dependências do projeto instaladas"
echo "  ✅ Arquivo .env configurado"
echo "  ✅ Banco de dados PostgreSQL iniciado"
echo "  ✅ Migrações executadas"
echo "  ✅ Testes executados"
echo "  ✅ Lint executado"
echo "  ✅ Build executado"
echo "  ✅ Git hooks configurados"
echo ""
echo "🚀 Comandos úteis:"
echo "  📱 Iniciar aplicação: npm run start:dev"
echo "  🧪 Executar testes: npm test"
echo "  🔍 Executar lint: npm run lint"
echo "  🏗️  Executar build: npm run build"
echo "  🗄️  Executar migrações: npm run migration:run"
echo "  🐳 Iniciar banco: docker-compose up db -d"
echo "  📊 Ver logs do banco: docker-compose logs db"
echo ""
echo "📚 Documentação:"
echo "  📖 README.md - Documentação principal"
echo "  🔧 .env.example - Exemplo de configuração"
echo "  🐳 docker-compose.yml - Configuração do banco"
echo "  📋 implementacoes_completas.md - Status das implementações"
echo ""
log_success "✨ Ambiente pronto para desenvolvimento!"
