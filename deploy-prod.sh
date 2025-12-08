#!/usr/bin/env bash
set -euo pipefail

# Script de deploy para Sistema de Gestão de Patrimônio
# - Puxa imagens (tags fornecidas via env vars ou usa 'latest')
# - (Opcional) verifica assinatura com cosign se COSIGN_VERIFY=true
# - Cria .env.prod a partir de .env.prod.example (se não existir) com prompts
# - Executa docker compose -f docker-compose.deploy.yml up -d
# - Roda health checks rápidos

REPO_OWNER=${REPO_OWNER:-"seu-usuario-github"}
USERS_TAG=${USERS_IMAGE_TAG:-"latest"}
AUTH_TAG=${AUTH_IMAGE_TAG:-"latest"}
PATRIMONIO_TAG=${PATRIMONIO_IMAGE_TAG:-"latest"}
CATEGORIAS_TAG=${CATEGORIAS_IMAGE_TAG:-"latest"}
AUDIT_TAG=${AUDIT_IMAGE_TAG:-"latest"}
EVENTS_TAG=${EVENTS_IMAGE_TAG:-"latest"}
GATEWAY_TAG=${GATEWAY_IMAGE_TAG:-"latest"}
COSIGN_VERIFY=${COSIGN_VERIFY:-"false"}

echo "[deploy-prod] Sistema de Gestão de Patrimônio - Deploy de Produção"
echo "==============================================================="
echo "[deploy-prod] Usando imagens:"
echo "  users-service:       ghcr.io/${REPO_OWNER}/users-service:${USERS_TAG}"
echo "  auth-service:        ghcr.io/${REPO_OWNER}/auth-service:${AUTH_TAG}"
echo "  patrimonio-service:  ghcr.io/${REPO_OWNER}/patrimonio-service:${PATRIMONIO_TAG}"
echo "  categorias-service:  ghcr.io/${REPO_OWNER}/categorias-service:${CATEGORIAS_TAG}"
echo "  audit-service:       ghcr.io/${REPO_OWNER}/audit-service:${AUDIT_TAG}"
echo "  events-service:      ghcr.io/${REPO_OWNER}/events-service:${EVENTS_TAG}"
echo "  api-gateway:         ghcr.io/${REPO_OWNER}/api-gateway:${GATEWAY_TAG}"
echo "==============================================================="
echo ""

if [ ! -f .env.prod ]; then
  if [ -f .env.prod.example ]; then
    echo ".env.prod não encontrado — copiando de .env.prod.example"
    cp .env.prod.example .env.prod
    echo "⚠️  ATENÇÃO: edite .env.prod e substitua TODOS os valores CHANGEME"
    echo "   Valores necessários:"
    echo "   - JWT_ACCESS_SECRET"
    echo "   - JWT_REFRESH_SECRET"
    echo "   - HASH_PEPPER"
    echo "   - POSTGRES_PASSWORD"
    echo "   - SERVICE_TOKEN"
    echo ""
    read -p "Deseja abrir .env.prod agora em nano? (s/N) " OPEN
    if [[ "$OPEN" =~ ^([sS]|[yY])$ ]]; then
      nano .env.prod
    fi
  else
    echo "❌ Arquivo .env.prod.example não existe. Saindo." >&2
    exit 1
  fi
fi

echo "[deploy-prod] Verificando valores obrigatórios no .env.prod..."
source .env.prod

# Verificações básicas
MISSING_VARS=()
[ -z "${JWT_ACCESS_SECRET:-}" ] && MISSING_VARS+=("JWT_ACCESS_SECRET")
[ -z "${JWT_REFRESH_SECRET:-}" ] && MISSING_VARS+=("JWT_REFRESH_SECRET")
[ -z "${HASH_PEPPER:-}" ] && MISSING_VARS+=("HASH_PEPPER")
[ -z "${POSTGRES_PASSWORD:-}" ] && MISSING_VARS+=("POSTGRES_PASSWORD")

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
  echo "❌ Variáveis obrigatórias não definidas no .env.prod:"
  for var in "${MISSING_VARS[@]}"; do
    echo "   - $var"
  done
  echo "Por favor, edite o arquivo .env.prod e preencha os valores."
  exit 1
fi

# Verificar se valores são padrão (CHANGEME)
if [[ "${JWT_ACCESS_SECRET}" == *"CHANGEME"* ]] || \
   [[ "${JWT_REFRESH_SECRET}" == *"CHANGEME"* ]] || \
   [[ "${HASH_PEPPER}" == *"CHANGEME"* ]] || \
   [[ "${POSTGRES_PASSWORD}" == *"postgres"* ]]; then
  echo "⚠️  AVISO: Valores padrão detectados no .env.prod!"
  echo "   Certifique-se de substituir TODOS os valores CHANGEME antes de ir para produção."
  read -p "Continuar mesmo assim? (s/N) " CONTINUE
  if [[ ! "$CONTINUE" =~ ^([sS]|[yY])$ ]]; then
    echo "Deploy cancelado."
    exit 1
  fi
fi

echo "[deploy-prod] Pull das imagens Docker..."
docker pull ghcr.io/${REPO_OWNER}/users-service:${USERS_TAG}
docker pull ghcr.io/${REPO_OWNER}/auth-service:${AUTH_TAG}
docker pull ghcr.io/${REPO_OWNER}/patrimonio-service:${PATRIMONIO_TAG}
docker pull ghcr.io/${REPO_OWNER}/categorias-service:${CATEGORIAS_TAG}
docker pull ghcr.io/${REPO_OWNER}/audit-service:${AUDIT_TAG}
docker pull ghcr.io/${REPO_OWNER}/events-service:${EVENTS_TAG}
docker pull ghcr.io/${REPO_OWNER}/api-gateway:${GATEWAY_TAG}

if [ "$COSIGN_VERIFY" = "true" ]; then
  if ! command -v cosign >/dev/null 2>&1; then
    echo "❌ COSIGN_VERIFY=true mas cosign não está instalado. Instale cosign para verificação." >&2
    exit 1
  fi
  echo "[deploy-prod] Verificando assinaturas com cosign..."
  cosign verify --key cosign.pub ghcr.io/${REPO_OWNER}/users-service:${USERS_TAG}
  cosign verify --key cosign.pub ghcr.io/${REPO_OWNER}/auth-service:${AUTH_TAG}
  cosign verify --key cosign.pub ghcr.io/${REPO_OWNER}/patrimonio-service:${PATRIMONIO_TAG}
  cosign verify --key cosign.pub ghcr.io/${REPO_OWNER}/categorias-service:${CATEGORIAS_TAG}
  cosign verify --key cosign.pub ghcr.io/${REPO_OWNER}/audit-service:${AUDIT_TAG}
  cosign verify --key cosign.pub ghcr.io/${REPO_OWNER}/events-service:${EVENTS_TAG}
  cosign verify --key cosign.pub ghcr.io/${REPO_OWNER}/api-gateway:${GATEWAY_TAG}
fi

echo "[deploy-prod] Subindo com docker compose (deploy-only)"
docker compose -f docker-compose.deploy.yml up -d

echo "[deploy-prod] Aguardando serviços ficarem saudáveis (aguarde ~30 segundos)"
sleep 15

function health() {
  URL=$1
  NAME=$2
  if curl -sfS "$URL" >/dev/null; then
    echo "✅ OK: $NAME - $URL"
    return 0
  else
    echo "❌ FALHA: $NAME - $URL"
    return 1
  fi
}

echo "[deploy-prod] Testando endpoints de health..."
echo "---------------------------------------------------------------"
health http://localhost:3001/health "Auth Service" || true
health http://localhost:3002/health "Users Service" || true
health http://localhost:3003/health "Patrimonio Service" || true
health http://localhost:3004/health "Categorias Service" || true
health http://localhost:3005/health "Audit Service" || true
health http://localhost:3006/health "Events Service" || true
health http://localhost:3100/health "API Gateway" || true
echo "---------------------------------------------------------------"

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "📋 Próximos passos:"
echo "   1. Verificar logs: docker compose -f docker-compose.deploy.yml logs --tail=50"
echo "   2. Rodar migrations (se necessário)"
echo "   3. Criar usuário admin inicial"
echo "   4. Testar API Gateway: http://localhost:3100"
echo "   5. Verificar Swagger (se habilitado): http://localhost:3100/docs"
echo ""
echo "📊 Comandos úteis:"
echo "   - Ver logs:      docker compose -f docker-compose.deploy.yml logs -f [service-name]"
echo "   - Parar tudo:    docker compose -f docker-compose.deploy.yml down"
echo "   - Restart:       docker compose -f docker-compose.deploy.yml restart [service-name]"
echo "   - Status:        docker compose -f docker-compose.deploy.yml ps"
echo ""

