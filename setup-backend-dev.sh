#!/usr/bin/env bash
set -euo pipefail

# ========================================================================
# Script de Setup do Backend para Desenvolvedores Frontend
# ========================================================================
# Este script baixa as imagens Docker do GitHub Container Registry
# e sobe todo o ambiente backend funcional com configurações padrão
# ========================================================================

REPO_OWNER=${REPO_OWNER:-"CHANGEME_SEU_USUARIO_GITHUB"}
DEFAULT_TAG="latest"

echo "🚀 Sistema de Gestão de Patrimônio - Setup Backend para Frontend"
echo "================================================================="
echo ""

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    echo "   Acesse: https://docs.docker.com/get-docker/"
    exit 1
fi

# Verificar se Docker Compose está instalado
if ! command -v docker compose &> /dev/null && ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

# Solicitar REPO_OWNER se não foi fornecido
if [ "$REPO_OWNER" == "CHANGEME_SEU_USUARIO_GITHUB" ]; then
    echo "📝 Por favor, informe o usuário/organização do GitHub Container Registry:"
    read -p "   REPO_OWNER (ex: seu-usuario-github): " REPO_OWNER
    if [ -z "$REPO_OWNER" ]; then
        echo "❌ REPO_OWNER é obrigatório. Saindo."
        exit 1
    fi
fi

echo ""
echo "📦 Imagens que serão baixadas:"
echo "   - ghcr.io/${REPO_OWNER}/users-service:${DEFAULT_TAG}"
echo "   - ghcr.io/${REPO_OWNER}/auth-service:${DEFAULT_TAG}"
echo "   - ghcr.io/${REPO_OWNER}/patrimonio-service:${DEFAULT_TAG}"
echo "   - ghcr.io/${REPO_OWNER}/categorias-service:${DEFAULT_TAG}"
echo "   - ghcr.io/${REPO_OWNER}/audit-service:${DEFAULT_TAG}"
echo "   - ghcr.io/${REPO_OWNER}/events-service:${DEFAULT_TAG}"
echo "   - ghcr.io/${REPO_OWNER}/api-gateway:${DEFAULT_TAG}"
echo ""

# Criar .env.prod se não existir
if [ ! -f .env.prod ]; then
    echo "📄 Criando arquivo .env.prod com configurações padrão de desenvolvimento..."
    
    cat > .env.prod <<EOF
# ========================================================================
# Configuração de Desenvolvimento - Gerada Automaticamente
# ========================================================================
NODE_ENV=production
REPO_OWNER=${REPO_OWNER}

# Banco de Dados
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_DB=patrimonio_inventario
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres123
DB_NAME=patrimonio_inventario
DB_SSL=false
DB_LOGGING=false

# JWT (valores padrão para desenvolvimento - NÃO usar em produção!)
JWT_ACCESS_SECRET=dev-secret-key-change-in-production-$(openssl rand -hex 16 2>/dev/null || echo "dev-secret-123")
JWT_REFRESH_SECRET=dev-refresh-secret-change-in-production-$(openssl rand -hex 16 2>/dev/null || echo "dev-refresh-123")
JWT_ACCESS_EXPIRES_IN=900
JWT_REFRESH_EXPIRES_IN=604800

# Hash de Senhas
HASH_PEPPER=dev-pepper-change-in-production-$(openssl rand -hex 16 2>/dev/null || echo "dev-pepper-123")
HASH_SALT_ROUNDS=12

# Service Token
SERVICE_TOKEN=dev-service-token-change-in-production-$(openssl rand -hex 16 2>/dev/null || echo "dev-token-123")

# Tags das Imagens
USERS_IMAGE_TAG=${DEFAULT_TAG}
AUTH_IMAGE_TAG=${DEFAULT_TAG}
PATRIMONIO_IMAGE_TAG=${DEFAULT_TAG}
CATEGORIAS_IMAGE_TAG=${DEFAULT_TAG}
AUDIT_IMAGE_TAG=${DEFAULT_TAG}
EVENTS_IMAGE_TAG=${DEFAULT_TAG}
GATEWAY_IMAGE_TAG=${DEFAULT_TAG}

# URLs dos Serviços
AUTH_API_URL=http://auth-service:3001
USERS_API_URL=http://users-service:3002
PATRIMONIO_API_URL=http://patrimonio-service:3003
CATEGORIAS_API_URL=http://categorias-service:3004
AUDIT_API_URL=http://audit-service:3005
EVENTS_API_URL=http://events-service:3006
EOF

    echo "✅ Arquivo .env.prod criado com sucesso!"
    echo ""
fi

# Exportar variáveis para o docker-compose
export REPO_OWNER
export USERS_IMAGE_TAG=${DEFAULT_TAG}
export AUTH_IMAGE_TAG=${DEFAULT_TAG}
export PATRIMONIO_IMAGE_TAG=${DEFAULT_TAG}
export CATEGORIAS_IMAGE_TAG=${DEFAULT_TAG}
export AUDIT_IMAGE_TAG=${DEFAULT_TAG}
export EVENTS_IMAGE_TAG=${DEFAULT_TAG}
export GATEWAY_IMAGE_TAG=${DEFAULT_TAG}

echo "📥 Baixando imagens Docker do GitHub Container Registry..."
echo "   (Isso pode levar alguns minutos na primeira vez)"
echo ""

# Baixar todas as imagens
docker pull ghcr.io/${REPO_OWNER}/users-service:${DEFAULT_TAG} || echo "⚠️  Falha ao baixar users-service"
docker pull ghcr.io/${REPO_OWNER}/auth-service:${DEFAULT_TAG} || echo "⚠️  Falha ao baixar auth-service"
docker pull ghcr.io/${REPO_OWNER}/patrimonio-service:${DEFAULT_TAG} || echo "⚠️  Falha ao baixar patrimonio-service"
docker pull ghcr.io/${REPO_OWNER}/categorias-service:${DEFAULT_TAG} || echo "⚠️  Falha ao baixar categorias-service"
docker pull ghcr.io/${REPO_OWNER}/audit-service:${DEFAULT_TAG} || echo "⚠️  Falha ao baixar audit-service"
docker pull ghcr.io/${REPO_OWNER}/events-service:${DEFAULT_TAG} || echo "⚠️  Falha ao baixar events-service"
docker pull ghcr.io/${REPO_OWNER}/api-gateway:${DEFAULT_TAG} || echo "⚠️  Falha ao baixar api-gateway"

echo ""
echo "🐳 Subindo containers Docker Compose..."
echo ""

# Usar docker compose ou docker-compose conforme disponível
if command -v docker compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
else
    DOCKER_COMPOSE_CMD="docker-compose"
fi

$DOCKER_COMPOSE_CMD -f docker-compose.deploy.yml up -d

echo ""
echo "⏳ Aguardando serviços inicializarem (aguarde ~30 segundos)..."
sleep 20

echo ""
echo "🏥 Verificando saúde dos serviços..."
echo ""

# Função para verificar health
health_check() {
    local URL=$1
    local NAME=$2
    local MAX_ATTEMPTS=10
    local ATTEMPT=1
    
    while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
        if curl -sfS "$URL" >/dev/null 2>&1; then
            echo "✅ $NAME está funcionando"
            return 0
        fi
        if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
            sleep 2
        fi
        ATTEMPT=$((ATTEMPT + 1))
    done
    
    echo "⚠️  $NAME ainda não está respondendo (tente novamente em alguns segundos)"
    return 1
}

health_check "http://localhost:3001/health" "Auth Service"
health_check "http://localhost:3002/health" "Users Service"
health_check "http://localhost:3003/health" "Patrimonio Service"
health_check "http://localhost:3004/health" "Categorias Service"
health_check "http://localhost:3005/health" "Audit Service"
health_check "http://localhost:3006/health" "Events Service"
health_check "http://localhost:3100/health" "API Gateway"

echo ""
echo "================================================================="
echo "✅ Setup concluído!"
echo ""
echo "📋 Informações importantes:"
echo "   - API Gateway: http://localhost:3100"
echo "   - Auth Service: http://localhost:3001"
echo "   - Users Service: http://localhost:3002"
echo "   - Patrimonio Service: http://localhost:3003"
echo ""
echo "📝 Comandos úteis:"
echo "   - Ver logs:        $DOCKER_COMPOSE_CMD -f docker-compose.deploy.yml logs -f"
echo "   - Parar tudo:      $DOCKER_COMPOSE_CMD -f docker-compose.deploy.yml down"
echo "   - Reiniciar:       $DOCKER_COMPOSE_CMD -f docker-compose.deploy.yml restart"
echo "   - Ver status:      $DOCKER_COMPOSE_CMD -f docker-compose.deploy.yml ps"
echo ""
echo "⚠️  NOTA: Esta configuração usa valores padrão de desenvolvimento."
echo "   Para produção, edite o arquivo .env.prod e substitua os segredos!"
echo ""

