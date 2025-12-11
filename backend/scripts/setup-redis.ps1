# Script PowerShell para instalar e configurar Redis no Windows
# Requer: Chocolatey, Docker, ou WSL

Write-Host "🔧 Configurando Redis para desenvolvimento local (Windows)..." -ForegroundColor Green

# Verificar se Redis já está rodando
$redisRunning = $false
try {
    $response = redis-cli ping 2>$null
    if ($response -eq "PONG") {
        Write-Host "✅ Redis já está rodando" -ForegroundColor Green
        $redisRunning = $true
    }
} catch {
    Write-Host "⚠️ Redis não está rodando" -ForegroundColor Yellow
}

if (-not $redisRunning) {
    Write-Host "📦 Redis não encontrado. Escolha uma opção:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Docker (Recomendado)" -ForegroundColor Cyan
    Write-Host "   docker run -d --name redis -p 6379:6379 redis:alpine"
    Write-Host ""
    Write-Host "2. Docker Compose (Recomendado - já configurado)" -ForegroundColor Cyan
    Write-Host "   docker-compose up -d redis"
    Write-Host ""
    Write-Host "3. Chocolatey" -ForegroundColor Cyan
    Write-Host "   choco install redis-64"
    Write-Host ""
    Write-Host "4. WSL (Windows Subsystem for Linux)" -ForegroundColor Cyan
    Write-Host "   wsl --install"
    Write-Host "   Depois instale Redis no WSL"
    Write-Host ""
    
    $choice = Read-Host "Escolha uma opção (1-4) ou pressione Enter para usar Docker Compose"
    
    switch ($choice) {
        "1" {
            Write-Host "🐳 Iniciando Redis via Docker..." -ForegroundColor Yellow
            docker run -d --name patrimonio_redis -p 6379:6379 redis:alpine
            Start-Sleep -Seconds 3
        }
        "2" {
            Write-Host "🐳 Iniciando Redis via Docker Compose..." -ForegroundColor Yellow
            docker-compose up -d redis
            Start-Sleep -Seconds 3
        }
        "3" {
            if (Get-Command choco -ErrorAction SilentlyContinue) {
                Write-Host "📦 Instalando Redis via Chocolatey..." -ForegroundColor Yellow
                choco install redis-64 -y
                Write-Host "⚠️ Reinicie o terminal e execute: redis-server" -ForegroundColor Yellow
            } else {
                Write-Host "❌ Chocolatey não encontrado. Instale em: https://chocolatey.org/" -ForegroundColor Red
            }
        }
        "4" {
            Write-Host "🐧 Configurando WSL..." -ForegroundColor Yellow
            wsl --install
            Write-Host "⚠️ Após instalar WSL, execute no WSL:" -ForegroundColor Yellow
            Write-Host "   sudo apt-get update && sudo apt-get install -y redis-server" -ForegroundColor Cyan
        }
        default {
            Write-Host "🐳 Usando Docker Compose (padrão)..." -ForegroundColor Yellow
            docker-compose up -d redis
            Start-Sleep -Seconds 3
        }
    }
}

# Verificar se Redis está acessível
Write-Host "🔍 Verificando conexão com Redis..." -ForegroundColor Yellow

$maxRetries = 5
$retryCount = 0
$connected = $false

while ($retryCount -lt $maxRetries -and -not $connected) {
    try {
        # Tentar conectar via Docker se estiver rodando em container
        $dockerPs = docker ps --filter "name=redis" --format "{{.Names}}" 2>$null
        if ($dockerPs) {
            Write-Host "✅ Redis está rodando em Docker: $dockerPs" -ForegroundColor Green
            $connected = $true
        } else {
            # Tentar conectar diretamente
            $response = redis-cli ping 2>$null
            if ($response -eq "PONG") {
                Write-Host "✅ Redis está respondendo" -ForegroundColor Green
                $connected = $true
            }
        }
    } catch {
        $retryCount++
        if ($retryCount -lt $maxRetries) {
            Write-Host "⏳ Aguardando Redis... ($retryCount/$maxRetries)" -ForegroundColor Yellow
            Start-Sleep -Seconds 2
        }
    }
}

if (-not $connected) {
    Write-Host "❌ Não foi possível conectar ao Redis" -ForegroundColor Red
    Write-Host "💡 Tente iniciar manualmente:" -ForegroundColor Yellow
    Write-Host "   docker-compose up -d redis" -ForegroundColor Cyan
    exit 1
}

# Configurar variáveis de ambiente
Write-Host "🔧 Configurando variáveis de ambiente..." -ForegroundColor Yellow

$envFile = ".env"
if (-not (Test-Path $envFile)) {
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" $envFile
        Write-Host "📝 Arquivo .env criado a partir de .env.example" -ForegroundColor Green
    } else {
        New-Item -ItemType File -Path $envFile | Out-Null
        Write-Host "📝 Arquivo .env criado" -ForegroundColor Green
    }
}

# Adicionar configurações do Redis
$envContent = Get-Content $envFile -Raw -ErrorAction SilentlyContinue
if ($envContent -notmatch "REDIS_HOST") {
    Add-Content -Path $envFile -Value "`n# Redis Configuration`nREDIS_HOST=localhost`nREDIS_PORT=6379`nREDIS_DB=0`nREDIS_PASSWORD="
    Write-Host "✅ Configurações do Redis adicionadas ao .env" -ForegroundColor Green
} else {
    Write-Host "✅ Configurações do Redis já existem no .env" -ForegroundColor Green
}

Write-Host "✨ Configuração do Redis concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Execute os testes: npm run test:e2e -- test/notifications/notifications.e2e-spec.ts" -ForegroundColor White
Write-Host "   2. Verifique o status: docker ps | findstr redis" -ForegroundColor White
Write-Host "   3. Acesse o Redis CLI: docker exec -it patrimonio_redis redis-cli" -ForegroundColor White


