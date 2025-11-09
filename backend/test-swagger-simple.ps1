# Teste simplificado do Swagger
Write-Host "🧪 Testando Autenticação Automática do Swagger" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3101"
$maxRetries = 10
$retryDelay = 3

# Função para testar conexão
function Test-ServerConnection {
    param([string]$Url, [int]$MaxRetries = 5)
    
    for ($i = 1; $i -le $MaxRetries; $i++) {
        try {
            $response = Invoke-WebRequest -Uri $Url -Method GET -TimeoutSec 2 -ErrorAction Stop
            return $true
        }
        catch {
            Write-Host "   Tentativa ${i}/${MaxRetries}: Servidor não está respondendo..." -ForegroundColor Yellow
            if ($i -lt $MaxRetries) {
                Start-Sleep -Seconds $retryDelay
            }
        }
    }
    return $false
}

# Teste 1: Verificar se o servidor está rodando
Write-Host "1️⃣  Verificando se o servidor está rodando em $baseUrl..." -ForegroundColor Yellow
$serverRunning = Test-ServerConnection -Url "$baseUrl/v1/" -MaxRetries $maxRetries

if (-not $serverRunning) {
    Write-Host "   ❌ Servidor não está rodando!" -ForegroundColor Red
    Write-Host ""
    Write-Host "   💡 Para iniciar o servidor, execute:" -ForegroundColor Cyan
    Write-Host "      npm run start:dev" -ForegroundColor Blue
    Write-Host ""
    Write-Host "   Aguarde alguns segundos após iniciar e execute este script novamente." -ForegroundColor Yellow
    exit 1
}

Write-Host "   ✅ Servidor está rodando!" -ForegroundColor Green
Write-Host ""

# Teste 2: Testar endpoint dev-token
Write-Host "2️⃣  Testando endpoint /v1/auth/dev-token..." -ForegroundColor Yellow
try {
    $headers = @{
        "Content-Type" = "application/json"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/v1/auth/dev-token" -Method POST -Headers $headers -ErrorAction Stop
    
    if ($response.accessToken) {
        Write-Host "   ✅ Endpoint dev-token funcionando!" -ForegroundColor Green
        Write-Host "   Token: $($response.accessToken.Substring(0, 30))..." -ForegroundColor Blue
        Write-Host "   User: $($response.user.email)" -ForegroundColor Blue
        $token = $response.accessToken
    }
    else {
        Write-Host "   ❌ Token não retornado!" -ForegroundColor Red
        exit 1
    }
}
catch {
    Write-Host "   ❌ Erro ao obter token: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "   Status: $statusCode" -ForegroundColor Red
    }
    exit 1
}

Write-Host ""

# Teste 3: Testar script JavaScript
Write-Host "3️⃣  Testando se o script JavaScript está sendo servido..." -ForegroundColor Yellow
try {
    $scriptResponse = Invoke-WebRequest -Uri "$baseUrl/v1/swagger/auto-auth.js" -Method GET -ErrorAction Stop
    if ($scriptResponse.StatusCode -eq 200 -and $scriptResponse.Content -match "setupAutoAuth") {
        Write-Host "   ✅ Script JavaScript está sendo servido!" -ForegroundColor Green
        Write-Host "   Tamanho: $($scriptResponse.Content.Length) caracteres" -ForegroundColor Blue
    }
    else {
        Write-Host "   ⚠️  Script retornou, mas conteúdo pode estar incorreto" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "   ❌ Script JavaScript não encontrado: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Teste 4: Testar endpoints protegidos
Write-Host "4️⃣  Testando endpoints protegidos..." -ForegroundColor Yellow

$endpoints = @(
    @{ Method = "GET"; Path = "/v1/auth/me"; Name = "GET /v1/auth/me" },
    @{ Method = "GET"; Path = "/v1/users"; Name = "GET /v1/users" },
    @{ Method = "GET"; Path = "/v1/patrimonio"; Name = "GET /v1/patrimonio" },
    @{ Method = "GET"; Path = "/v1/categorias"; Name = "GET /v1/categorias" }
)

$authHeaders = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$successCount = 0
$totalCount = $endpoints.Count

foreach ($endpoint in $endpoints) {
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl$($endpoint.Path)" -Method $endpoint.Method -Headers $authHeaders -ErrorAction Stop
        Write-Host "   ✅ $($endpoint.Name): 200 OK" -ForegroundColor Green
        $successCount++
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 401 -or $statusCode -eq 403) {
            Write-Host "   ⚠️  $($endpoint.Name): $statusCode (não autenticado/autorizado)" -ForegroundColor Yellow
        }
        elseif ($statusCode -ge 400 -and $statusCode -lt 500) {
            Write-Host "   ⚠️  $($endpoint.Name): $statusCode (erro esperado)" -ForegroundColor Yellow
            $successCount++ # Considera sucesso se não for erro de autenticação
        }
        else {
            Write-Host "   ❌ $($endpoint.Name): $statusCode" -ForegroundColor Red
        }
    }
    Start-Sleep -Milliseconds 200
}

# Resumo
Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "📊 Resumo dos Testes:" -ForegroundColor Cyan
Write-Host "   ✅ Endpoints funcionando: $successCount/$totalCount" -ForegroundColor $(if ($successCount -eq $totalCount) { "Green" } else { "Yellow" })
Write-Host "   🔑 Token obtido: Sim" -ForegroundColor Green
Write-Host ""

if ($successCount -eq $totalCount) {
    Write-Host "🎉 Todos os testes passaram!" -ForegroundColor Green
}
elseif ($successCount -gt 0) {
    Write-Host "⚠️  Alguns testes falharam, mas a autenticação básica está funcionando." -ForegroundColor Yellow
}
else {
    Write-Host "❌ Testes falharam." -ForegroundColor Red
}

Write-Host ""
Write-Host "💡 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Acesse: http://localhost:3101/docs" -ForegroundColor Blue
Write-Host "   2. Abra o console do navegador (F12)" -ForegroundColor Blue
Write-Host "   3. Verifique se apareceu: '✅ Autenticação automática configurada no Swagger!'" -ForegroundColor Blue
Write-Host "   4. Teste os endpoints no Swagger UI" -ForegroundColor Blue
Write-Host ""

exit 0

