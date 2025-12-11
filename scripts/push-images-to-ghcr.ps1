# Script para fazer push das imagens Docker para GitHub Container Registry
# Uso: .\scripts\push-images-to-ghcr.ps1 -Token "seu_github_pat_token"

param(
    [Parameter(Mandatory=$true)]
    [string]$Token,
    
    [string]$RepoOwner = "unexpected-user-69",
    [string]$Tag = "latest"
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Push de Imagens Docker para GHCR" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Lista de servicos
$services = @(
    "users-service",
    "auth-service",
    "patrimonio-service",
    "categorias-service",
    "audit-service",
    "events-service",
    "api-gateway"
)

# Fazer login no GHCR
Write-Host "Fazendo login no GitHub Container Registry..." -ForegroundColor Yellow
echo $Token | docker login ghcr.io -u $RepoOwner --password-stdin

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERRO] Falha ao fazer login no GHCR" -ForegroundColor Red
    exit 1
}

Write-Host "[OK] Login realizado com sucesso!" -ForegroundColor Green
Write-Host ""

# Taggear imagens se necessario
Write-Host "Verificando e taggeando imagens..." -ForegroundColor Yellow

foreach ($service in $services) {
    $localImage = "desenv_sistemas_corporativos_patrimonio-$service`:$Tag"
    $ghcrImage = "ghcr.io/$RepoOwner/$service`:$Tag"
    
    # Verificar se a imagem local existe
    $imageExists = docker images $localImage --format "{{.Repository}}:{{.Tag}}" | Select-String -Pattern $localImage
    
    if ($imageExists) {
        Write-Host "  Taggeando $service..." -ForegroundColor Gray
        docker tag $localImage $ghcrImage
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "    [OK] $ghcrImage" -ForegroundColor Green
        } else {
            Write-Host "    [AVISO] Falha ao taggear $service" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  [AVISO] Imagem local nao encontrada: $localImage" -ForegroundColor Yellow
        Write-Host "    Construa a imagem primeiro com: docker compose build $service" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Fazendo push das imagens..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($service in $services) {
    $ghcrImage = "ghcr.io/$RepoOwner/$service`:$Tag"
    
    Write-Host "Push de $service..." -ForegroundColor Cyan
    docker push $ghcrImage
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  [OK] $ghcrImage publicado com sucesso!" -ForegroundColor Green
        $successCount++
    } else {
        Write-Host "  [ERRO] Falha ao publicar $ghcrImage" -ForegroundColor Red
        $failCount++
    }
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Resumo do Push" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Sucesso: $successCount" -ForegroundColor Green
Write-Host "Falhas:  $failCount" -ForegroundColor $(if ($failCount -gt 0) { "Red" } else { "Green" })
Write-Host ""

if ($failCount -eq 0) {
    Write-Host "[OK] Todas as imagens foram publicadas com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Imagens disponiveis em:" -ForegroundColor Cyan
    foreach ($service in $services) {
        Write-Host "  - ghcr.io/$RepoOwner/$service`:$Tag" -ForegroundColor Gray
    }
} else {
    Write-Host "[AVISO] Algumas imagens falharam. Verifique os erros acima." -ForegroundColor Yellow
}

Write-Host ""

