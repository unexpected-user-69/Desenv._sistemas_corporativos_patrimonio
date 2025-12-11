# Script PowerShell para testar endpoints do Swagger
# Execute após iniciar o servidor: npm run start:dev

Write-Host "🧪 Testando Autenticação Automática do Swagger" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3101"
$apiPrefix = "/v1"

# Função para fazer requisições HTTP
function Invoke-ApiRequest {
    param (
        [string]$Method,
        [string]$Path,
        [hashtable]$Headers = @{},
        [object]$Body = $null
    )
    
    try {
        $uri = "$baseUrl$Path"
        $params = @{
            Method = $Method
            Uri = $uri
            Headers = $Headers
            ContentType = "application/json"
            ErrorAction = "Stop"
        }
        
        if ($Body) {
            $params.Body = ($Body | ConvertTo-Json -Depth 10)
        }
        
        $response = Invoke-WebRequest @params
        return @{
            Status = $response.StatusCode
            Content = $response.Content | ConvertFrom-Json
            Success = $true
        }
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        return @{
            Status = $statusCode
            Content = $null
            Success = $false
            Error = $_.Exception.Message
        }
    }
}

# Teste 1: Verificar se o servidor está rodando
Write-Host "1️⃣  Verificando se o servidor está rodando..." -ForegroundColor Yellow
try {
    $test = Invoke-WebRequest -Uri "$baseUrl$apiPrefix/" -Method GET -ErrorAction Stop
    Write-Host "   ✅ Servidor está rodando!" -ForegroundColor Green
}
catch {
    Write-Host "   ❌ Servidor não está rodando!" -ForegroundColor Red
    Write-Host "   Execute: npm run start:dev" -ForegroundColor Yellow
    exit 1
}

# Teste 2: Testar endpoint dev-token
Write-Host ""
Write-Host "2️⃣  Testando endpoint /v1/auth/dev-token..." -ForegroundColor Yellow
$tokenResponse = Invoke-ApiRequest -Method "POST" -Path "$apiPrefix/auth/dev-token"
if ($tokenResponse.Success -and $tokenResponse.Status -eq 200 -and $tokenResponse.Content.accessToken) {
    Write-Host "   ✅ Endpoint dev-token funcionando!" -ForegroundColor Green
    Write-Host "   Token: $($tokenResponse.Content.accessToken.Substring(0, 30))..." -ForegroundColor Blue
    Write-Host "   User: $($tokenResponse.Content.user.email)" -ForegroundColor Blue
    $token = $tokenResponse.Content.accessToken
}
else {
    Write-Host "   ❌ Endpoint dev-token falhou!" -ForegroundColor Red
    Write-Host "   Status: $($tokenResponse.Status)" -ForegroundColor Red
    if ($tokenResponse.Error) {
        Write-Host "   Erro: $($tokenResponse.Error)" -ForegroundColor Red
    }
    exit 1
}

# Teste 3: Testar script JavaScript
Write-Host ""
Write-Host "3️⃣  Testando se o script JavaScript está sendo servido..." -ForegroundColor Yellow
try {
    $scriptResponse = Invoke-WebRequest -Uri "$baseUrl$apiPrefix/swagger/auto-auth.js" -Method GET -ErrorAction Stop
    if ($scriptResponse.StatusCode -eq 200 -and $scriptResponse.Content -match "setupAutoAuth") {
        Write-Host "   ✅ Script JavaScript está sendo servido!" -ForegroundColor Green
    }
    else {
        Write-Host "   ⚠️  Script retornou, mas conteúdo pode estar incorreto" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "   ❌ Script JavaScript não encontrado!" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Red
}

# Teste 4: Testar endpoints protegidos
Write-Host ""
Write-Host "4️⃣  Testando endpoints protegidos..." -ForegroundColor Yellow

$endpoints = @(
    @{ Method = "GET"; Path = "$apiPrefix/auth/me"; Name = "GET /v1/auth/me" },
    @{ Method = "GET"; Path = "$apiPrefix/users"; Name = "GET /v1/users" },
    @{ Method = "GET"; Path = "$apiPrefix/patrimonio"; Name = "GET /v1/patrimonio" },
    @{ Method = "GET"; Path = "$apiPrefix/categorias"; Name = "GET /v1/categorias" },
    @{ Method = "GET"; Path = "$apiPrefix/events"; Name = "GET /v1/events" },
    @{ Method = "GET"; Path = "$apiPrefix/audit"; Name = "GET /v1/audit" }
)

$headers = @{
    "Authorization" = "Bearer $token"
}

$successCount = 0
$totalCount = $endpoints.Count

foreach ($endpoint in $endpoints) {
    $response = Invoke-ApiRequest -Method $endpoint.Method -Path $endpoint.Path -Headers $headers
    
    if ($response.Success -and ($response.Status -eq 200 -or $response.Status -eq 201)) {
        Write-Host "   ✅ $($endpoint.Name): $($response.Status)" -ForegroundColor Green
        $successCount++
    }
    elseif ($response.Status -eq 401 -or $response.Status -eq 403) {
        Write-Host "   ⚠️  $($endpoint.Name): $($response.Status) (não autenticado)" -ForegroundColor Yellow
    }
    elseif ($response.Status -ge 400 -and $response.Status -lt 500) {
        Write-Host "   ⚠️  $($endpoint.Name): $($response.Status) (erro esperado)" -ForegroundColor Yellow
        $successCount++ # Considera sucesso se não for erro de autenticação
    }
    else {
        Write-Host "   ❌ $($endpoint.Name): $($response.Status)" -ForegroundColor Red
        if ($response.Error) {
            Write-Host "      Erro: $($response.Error)" -ForegroundColor Red
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
    Write-Host ""
    Write-Host "💡 Próximos passos:" -ForegroundColor Cyan
    Write-Host "   1. Acesse: http://localhost:3101/docs" -ForegroundColor Blue
    Write-Host "   2. Abra o console do navegador (F12)" -ForegroundColor Blue
    Write-Host "   3. Verifique se apareceu: '✅ Autenticação automática configurada no Swagger!'" -ForegroundColor Blue
    Write-Host "   4. Teste os endpoints no Swagger UI" -ForegroundColor Blue
}
else {
    Write-Host "⚠️  Alguns testes falharam, mas a autenticação básica está funcionando." -ForegroundColor Yellow
}

exit 0

