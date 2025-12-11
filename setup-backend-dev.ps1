# ========================================================================
# Script de Setup do Backend para Desenvolvedores Frontend (Windows)
# ========================================================================

param(
    # Namespace do GHCR com as imagens já publicadas
    [string]$RepoOwner = "unexpected-user-69"
)

$ErrorActionPreference = "Stop"
$DefaultTag = "latest"

Write-Host "Sistema de Gestao de Patrimonio - Setup Backend para Frontend" -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Docker
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "[ERRO] Docker nao esta instalado. Instale o Docker Desktop primeiro." -ForegroundColor Red
    Write-Host "   Acesse: https://docs.docker.com/desktop/install/windows-install/" -ForegroundColor Yellow
    exit 1
}

# Validar REPO_OWNER
if ([string]::IsNullOrWhiteSpace($RepoOwner)) {
    Write-Host "[ERRO] REPO_OWNER nao pode ser vazio. Ajuste o parametro -RepoOwner." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Imagens que serao baixadas:" -ForegroundColor Yellow
Write-Host "   - ghcr.io/$RepoOwner/users-service:$DefaultTag"
Write-Host "   - ghcr.io/$RepoOwner/auth-service:$DefaultTag"
Write-Host "   - ghcr.io/$RepoOwner/patrimonio-service:$DefaultTag"
Write-Host "   - ghcr.io/$RepoOwner/categorias-service:$DefaultTag"
Write-Host "   - ghcr.io/$RepoOwner/audit-service:$DefaultTag"
Write-Host "   - ghcr.io/$RepoOwner/events-service:$DefaultTag"
Write-Host "   - ghcr.io/$RepoOwner/api-gateway:$DefaultTag"
Write-Host ""

# Criar .env.prod se nao existir
if (-not (Test-Path ".env.prod")) {
    Write-Host "Criando arquivo .env.prod com configuracoes padrao..." -ForegroundColor Yellow
    
    # Gerar string aleatoria para segredos
    $randomSecret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
    $randomHex = -join ((48..57) + (97..102) | Get-Random -Count 16 | ForEach-Object {[char]$_})
    
    $envContent = @"
# ========================================================================
# Configuracao de Desenvolvimento - Gerada Automaticamente
# ========================================================================
NODE_ENV=production
REPO_OWNER=$RepoOwner

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

# JWT (valores padrao para desenvolvimento - NAO usar em producao!)
JWT_ACCESS_SECRET=dev-secret-key-$randomHex
JWT_REFRESH_SECRET=dev-refresh-secret-$randomHex
JWT_ACCESS_EXPIRES_IN=900
JWT_REFRESH_EXPIRES_IN=604800

# Hash de Senhas
HASH_PEPPER=dev-pepper-$randomHex
HASH_SALT_ROUNDS=12

# Service Token
SERVICE_TOKEN=dev-service-token-$randomHex

# Tags das Imagens
USERS_IMAGE_TAG=$DefaultTag
AUTH_IMAGE_TAG=$DefaultTag
PATRIMONIO_IMAGE_TAG=$DefaultTag
CATEGORIAS_IMAGE_TAG=$DefaultTag
AUDIT_IMAGE_TAG=$DefaultTag
EVENTS_IMAGE_TAG=$DefaultTag
GATEWAY_IMAGE_TAG=$DefaultTag

# URLs dos Servicos
AUTH_API_URL=http://auth-service:3001
USERS_API_URL=http://users-service:3002
PATRIMONIO_API_URL=http://patrimonio-service:3003
CATEGORIAS_API_URL=http://categorias-service:3004
AUDIT_API_URL=http://audit-service:3005
EVENTS_API_URL=http://events-service:3006
"@
    
    $envContent | Out-File -FilePath ".env.prod" -Encoding utf8 -NoNewline
    Write-Host "[OK] Arquivo .env.prod criado!" -ForegroundColor Green
    Write-Host ""
}

# Definir variaveis de ambiente
$env:REPO_OWNER = $RepoOwner
$env:USERS_IMAGE_TAG = $DefaultTag
$env:AUTH_IMAGE_TAG = $DefaultTag
$env:PATRIMONIO_IMAGE_TAG = $DefaultTag
$env:CATEGORIAS_IMAGE_TAG = $DefaultTag
$env:AUDIT_IMAGE_TAG = $DefaultTag
$env:EVENTS_IMAGE_TAG = $DefaultTag
$env:GATEWAY_IMAGE_TAG = $DefaultTag

Write-Host "Baixando imagens Docker do GitHub Container Registry..." -ForegroundColor Yellow
Write-Host "   (Isso pode levar alguns minutos na primeira vez)"
Write-Host ""

# Baixar todas as imagens
docker pull "ghcr.io/$RepoOwner/users-service:$DefaultTag"
if ($LASTEXITCODE -ne 0) { Write-Host "[AVISO] Falha ao baixar users-service" -ForegroundColor Yellow }

docker pull "ghcr.io/$RepoOwner/auth-service:$DefaultTag"
if ($LASTEXITCODE -ne 0) { Write-Host "[AVISO] Falha ao baixar auth-service" -ForegroundColor Yellow }

docker pull "ghcr.io/$RepoOwner/patrimonio-service:$DefaultTag"
if ($LASTEXITCODE -ne 0) { Write-Host "[AVISO] Falha ao baixar patrimonio-service" -ForegroundColor Yellow }

docker pull "ghcr.io/$RepoOwner/categorias-service:$DefaultTag"
if ($LASTEXITCODE -ne 0) { Write-Host "[AVISO] Falha ao baixar categorias-service" -ForegroundColor Yellow }

docker pull "ghcr.io/$RepoOwner/audit-service:$DefaultTag"
if ($LASTEXITCODE -ne 0) { Write-Host "[AVISO] Falha ao baixar audit-service" -ForegroundColor Yellow }

docker pull "ghcr.io/$RepoOwner/events-service:$DefaultTag"
if ($LASTEXITCODE -ne 0) { Write-Host "[AVISO] Falha ao baixar events-service" -ForegroundColor Yellow }

docker pull "ghcr.io/$RepoOwner/api-gateway:$DefaultTag"
if ($LASTEXITCODE -ne 0) { Write-Host "[AVISO] Falha ao baixar api-gateway" -ForegroundColor Yellow }

Write-Host ""
Write-Host "Subindo containers Docker Compose..." -ForegroundColor Yellow
Write-Host ""

docker compose --env-file .env.prod -f docker-compose.deploy.yml up -d

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERRO] Erro ao subir containers. Verifique os logs." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Aguardando servicos inicializarem (aguarde ~30 segundos)..." -ForegroundColor Yellow
Start-Sleep -Seconds 20

Write-Host ""
Write-Host "Verificando saude dos servicos..." -ForegroundColor Yellow
Write-Host ""

function Test-HealthEndpoint {
    param($Url, $Name)
    $maxAttempts = 10
    $attempt = 1
    
    while ($attempt -le $maxAttempts) {
        try {
            $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
            Write-Host "[OK] $Name esta funcionando" -ForegroundColor Green
            return $true
        } catch {
            if ($attempt -lt $maxAttempts) {
                Start-Sleep -Seconds 2
            }
            $attempt++
        }
    }
    
    Write-Host "[AVISO] $Name ainda nao esta respondendo (tente novamente em alguns segundos)" -ForegroundColor Yellow
    return $false
}

Test-HealthEndpoint "http://localhost:3001/health" "Auth Service"
Test-HealthEndpoint "http://localhost:3002/health" "Users Service"
Test-HealthEndpoint "http://localhost:3003/health" "Patrimonio Service"
Test-HealthEndpoint "http://localhost:3004/health" "Categorias Service"
Test-HealthEndpoint "http://localhost:3005/health" "Audit Service"
Test-HealthEndpoint "http://localhost:3006/health" "Events Service"
Test-HealthEndpoint "http://localhost:3100/api/health" "API Gateway"

Write-Host ""
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "[OK] Setup concluido!" -ForegroundColor Green
Write-Host ""
Write-Host "Informacoes importantes:" -ForegroundColor Cyan
Write-Host "   - API Gateway: http://localhost:3100"
Write-Host "   - Auth Service: http://localhost:3001"
Write-Host "   - Users Service: http://localhost:3002"
Write-Host "   - Patrimonio Service: http://localhost:3003"
Write-Host ""
Write-Host "Comandos uteis:" -ForegroundColor Cyan
Write-Host "   - Ver logs:        docker compose -f docker-compose.deploy.yml logs -f"
Write-Host "   - Parar tudo:      docker compose -f docker-compose.deploy.yml down"
Write-Host "   - Reiniciar:       docker compose -f docker-compose.deploy.yml restart"
Write-Host "   - Ver status:      docker compose -f docker-compose.deploy.yml ps"
Write-Host ""
Write-Host "[AVISO] NOTA: Esta configuracao usa valores padrao de desenvolvimento." -ForegroundColor Yellow
Write-Host "   Para producao, edite o arquivo .env.prod e substitua os segredos!" -ForegroundColor Yellow
Write-Host ""
