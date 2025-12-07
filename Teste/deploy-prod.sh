#!/usr/bin/env bash
set -euo pipefail

# Small deploy helper for operators.
# - Puxa imagens (tags fornecidas via env vars ou usa 'latest')
# - (Opcional) verifica assinatura com cosign se COSIGN_VERIFY=true
# - Cria .env.prod a partir de .env.prod.example (se não existir) com prompts
# - Executa docker compose -f docker-compose.deploy.yml up -d
# - Roda health checks rápidos

REPO_OWNER=${REPO_OWNER:-"evertonfoz"}
USERS_TAG=${USERS_IMAGE_TAG:-"latest"}
AUTH_TAG=${AUTH_IMAGE_TAG:-"latest"}
EVENTS_TAG=${EVENTS_IMAGE_TAG:-"latest"}
COSIGN_VERIFY=${COSIGN_VERIFY:-"false"}

echo "[deploy-prod] usando imagens:"
echo "  users:   ghcr.io/${REPO_OWNER}/users-service:${USERS_TAG}"
echo "  auth:    ghcr.io/${REPO_OWNER}/auth-service:${AUTH_TAG}"
echo "  events:  ghcr.io/${REPO_OWNER}/events-service:${EVENTS_TAG}"

if [ ! -f .env.prod ]; then
  if [ -f .env.prod.example ]; then
    echo ".env.prod não encontrado — copiando de .env.prod.example"
    cp .env.prod.example .env.prod
    echo "ATENÇÃO: edite .env.prod e substitua segredos (JWT_ACCESS_SECRET, credenciais DB, etc.)"
    read -p "Deseja abrir .env.prod agora em nano? (s/N) " OPEN
    if [[ "$OPEN" =~ ^([sS]|[yY])$ ]]; then
      nano .env.prod
    fi
  else
    echo "Arquivo .env.prod.example não existe. Saindo." >&2
    exit 1
  fi
fi

# Pull imagens
docker pull ghcr.io/${REPO_OWNER}/users-service:${USERS_TAG}
docker pull ghcr.io/${REPO_OWNER}/auth-service:${AUTH_TAG}
docker pull ghcr.io/${REPO_OWNER}/events-service:${EVENTS_TAG}

if [ "$COSIGN_VERIFY" = "true" ]; then
  if ! command -v cosign >/dev/null 2>&1; then
    echo "COSIGN_VERIFY=true mas cosign não está instalado. Instale cosign para verificação." >&2
    exit 1
  fi
  echo "Verificando assinaturas com cosign..."
  cosign verify --key cosign.pub ghcr.io/${REPO_OWNER}/users-service:${USERS_TAG}
  cosign verify --key cosign.pub ghcr.io/${REPO_OWNER}/auth-service:${AUTH_TAG}
  cosign verify --key cosign.pub ghcr.io/${REPO_OWNER}/events-service:${EVENTS_TAG}
fi

echo "Subindo com docker compose (deploy-only)"
docker compose -f docker-compose.deploy.yml up -d

echo "Aguardando serviços ficarem saudáveis (aguarde alguns segundos)"
sleep 8

function health() {
  URL=$1
  if curl -sfS "$URL" >/dev/null; then
    echo "OK: $URL"
    return 0
  else
    echo "FALHA: $URL"
    return 1
  fi
}

echo "Testando endpoints de health (localhost:3010/3011/3012)"
health http://localhost:3010/health || true
health http://localhost:3011/health || true
health http://localhost:3012/health || true

echo "Deploy concluído (verificar logs e métricas)."
