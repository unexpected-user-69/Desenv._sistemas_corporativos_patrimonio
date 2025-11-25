# Script PowerShell para corrigir autenticação e obter token
# Uso: .\scripts\fix-auth-and-get-token.ps1

Write-Host "🔧 Corrigindo autenticação e obtendo token..." -ForegroundColor Cyan
Write-Host ""

# Configurações
$devEmail = "admin@dev.local"
$devPassword = "AdminPassword123!"
$authServiceUrl = "http://localhost:3001"
$usersServiceUrl = "http://localhost:3002"

# 1. Verificar se os serviços estão rodando
Write-Host "1️⃣ Verificando se os serviços estão rodando..." -ForegroundColor Yellow

try {
    $authResponse = Invoke-WebRequest -Uri "$authServiceUrl/health" -Method GET -TimeoutSec 2 -ErrorAction Stop
    Write-Host "   ✅ Auth Service está rodando" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Auth Service NÃO está rodando em $authServiceUrl" -ForegroundColor Red
    Write-Host "   💡 Inicie o auth-service primeiro!" -ForegroundColor Yellow
    exit 1
}

try {
    $usersResponse = Invoke-WebRequest -Uri "$usersServiceUrl/health" -Method GET -TimeoutSec 2 -ErrorAction Stop
    Write-Host "   ✅ Users Service está rodando" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Users Service NÃO está rodando em $usersServiceUrl" -ForegroundColor Red
    Write-Host "   💡 Inicie o users-service primeiro!" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# 2. Recriar usuário no banco
Write-Host "2️⃣ Recriando usuário no banco de dados..." -ForegroundColor Yellow

$usersServicePath = "Desenv._sistemas_corporativos_patrimonio\backend\packages\users-service"
if (Test-Path $usersServicePath) {
    Push-Location $usersServicePath
    try {
        node scripts/create-dev-user.js
        Write-Host "   ✅ Usuário recriado" -ForegroundColor Green
    } catch {
        Write-Host "   ⚠️  Erro ao recriar usuário, mas continuando..." -ForegroundColor Yellow
    }
    Pop-Location
} else {
    Write-Host "   ⚠️  Caminho do users-service não encontrado" -ForegroundColor Yellow
}

Write-Host ""

# 3. Aguardar um pouco para o serviço processar
Write-Host "3️⃣ Aguardando 2 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

# 4. Tentar fazer login
Write-Host "4️⃣ Tentando fazer login..." -ForegroundColor Yellow

$loginBody = @{
    email = $devEmail
    password = $devPassword
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$authServiceUrl/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $loginBody `
        -ErrorAction Stop

    $accessToken = $loginResponse.accessToken
    $refreshToken = $loginResponse.refreshToken
    $user = $loginResponse.user

    Write-Host ""
    Write-Host "✅ LOGIN REALIZADO COM SUCESSO!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎫 TOKEN DE ACESSO (use no Swagger):" -ForegroundColor Cyan
    Write-Host ("=" * 80) -ForegroundColor Cyan
    Write-Host $accessToken -ForegroundColor White
    Write-Host ("=" * 80) -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Informações do usuário:" -ForegroundColor Cyan
    Write-Host "   ID: $($user.id)" -ForegroundColor White
    Write-Host "   Email: $($user.email)" -ForegroundColor White
    Write-Host "   Nome: $($user.name)" -ForegroundColor White
    Write-Host "   Role: $($user.role)" -ForegroundColor White
    Write-Host ""
    Write-Host "💾 Refresh Token (primeiros 50 caracteres):" -ForegroundColor Cyan
    Write-Host "   $($refreshToken.Substring(0, [Math]::Min(50, $refreshToken.Length)))..." -ForegroundColor White
    Write-Host ""
    Write-Host "📝 PRÓXIMOS PASSOS:" -ForegroundColor Cyan
    Write-Host "   1. Abra o Swagger do users-service: http://localhost:3002/api" -ForegroundColor White
    Write-Host "   2. Clique no botão 'Authorize' (cadeado no topo)" -ForegroundColor White
    Write-Host "   3. Cole o token acima no campo 'Value'" -ForegroundColor White
    Write-Host "   4. Clique em 'Authorize' e depois 'Close'" -ForegroundColor White
    Write-Host "   5. Agora você pode testar os endpoints!" -ForegroundColor White
    Write-Host ""

    # Salvar token em arquivo
    $tokenFile = "Desenv._sistemas_corporativos_patrimonio\backend\.token"
    $accessToken | Out-File -FilePath $tokenFile -Encoding UTF8 -NoNewline
    Write-Host "💾 Token salvo em: $tokenFile" -ForegroundColor Green
    Write-Host ""

} catch {
    Write-Host ""
    Write-Host "❌ ERRO AO FAZER LOGIN:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.ErrorDetails.Message) {
        $errorDetails = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
        if ($errorDetails) {
            Write-Host "   Mensagem: $($errorDetails.message.message)" -ForegroundColor Red
        }
    }
    
    Write-Host ""
    Write-Host "🔧 SOLUÇÕES POSSÍVEIS:" -ForegroundColor Yellow
    Write-Host "   1. Reinicie o users-service para carregar o HASH_PEPPER correto" -ForegroundColor White
    Write-Host "   2. Verifique se o HASH_PEPPER está configurado no .env do backend" -ForegroundColor White
    Write-Host "   3. Execute manualmente no Swagger:" -ForegroundColor White
    Write-Host "      - POST $authServiceUrl/auth/login" -ForegroundColor White
    Write-Host "      - Body: { `"email`": `"$devEmail`", `"password`": `"$devPassword`" }" -ForegroundColor White
    Write-Host ""
}

