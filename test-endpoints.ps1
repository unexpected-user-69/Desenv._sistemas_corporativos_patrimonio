# Script de Teste de Endpoints da API
# Sistema de Patrimônio e Inventário

$baseUrl = "http://localhost:3101"
$results = @()

function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Path,
        [string]$Description,
        [object]$Body = $null
    )
    
    $url = "$baseUrl$Path"
    Write-Host "`n===================================" -ForegroundColor Cyan
    Write-Host "Testando: $Description" -ForegroundColor Yellow
    Write-Host "Método: $Method | URL: $url" -ForegroundColor Gray
    
    try {
        $params = @{
            Uri = $url
            Method = $Method
            ContentType = 'application/json'
        }
        
        if ($Body) {
            $params.Body = ($Body | ConvertTo-Json -Depth 10)
        }
        
        $response = Invoke-WebRequest @params
        $statusCode = $response.StatusCode
        $content = $response.Content
        
        Write-Host "✅ Status: $statusCode" -ForegroundColor Green
        Write-Host "Resposta: $($content.Substring(0, [Math]::Min(200, $content.Length)))..." -ForegroundColor White
        
        $results += [PSCustomObject]@{
            Method = $Method
            Path = $Path
            Description = $Description
            Status = $statusCode
            Result = "✅ SUCESSO"
        }
        
        return $content | ConvertFrom-Json
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "❌ Erro: $statusCode" -ForegroundColor Red
        Write-Host "Mensagem: $($_.Exception.Message)" -ForegroundColor Red
        
        $results += [PSCustomObject]@{
            Method = $Method
            Path = $Path
            Description = $Description
            Status = $statusCode
            Result = "❌ ERRO"
        }
        
        return $null
    }
}

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "     TESTE DE ENDPOINTS - API PATRIMONIO             " -ForegroundColor Cyan
Write-Host "     Sistema de Gestao de Patrimonio e Inventario    " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

# ============================================
# ROOT ENDPOINTS
# ============================================
Write-Host "`n📌 ROOT ENDPOINTS" -ForegroundColor Magenta
Test-Endpoint -Method "GET" -Path "/v1" -Description "Hello world endpoint"
Test-Endpoint -Method "GET" -Path "/v1/health" -Description "Health check"

# ============================================
# USERS ENDPOINTS
# ============================================
Write-Host "`n📌 USERS ENDPOINTS" -ForegroundColor Magenta

# GET /v1/users - Listar usuários
$users = Test-Endpoint -Method "GET" -Path "/v1/users" -Description "Listar todos os usuários"
$userId = if ($users -and $users.data.Count -gt 0) { $users.data[0].id } else { $null }

# GET /v1/users/{id} - Buscar por ID
if ($userId) {
    Test-Endpoint -Method "GET" -Path "/v1/users/$userId" -Description "Buscar usuário por ID"
}

# GET /v1/users/email/{email}
Test-Endpoint -Method "GET" -Path "/v1/users/email/joao@teste.com" -Description "Buscar usuário por email"

# GET /v1/users/advanced/search
Test-Endpoint -Method "GET" -Path "/v1/users/advanced/search?name=Maria" -Description "Busca avançada de usuários"

# GET /v1/users/cursor/search
Test-Endpoint -Method "GET" -Path "/v1/users/cursor/search?limit=5" -Description "Busca com cursor pagination"

# GET /v1/users/fuzzy/search
Test-Endpoint -Method "GET" -Path "/v1/users/fuzzy/search?q=joao" -Description "Busca fuzzy"

# GET /v1/users/date-range
$startDate = (Get-Date).AddDays(-30).ToString("yyyy-MM-dd")
$endDate = (Get-Date).ToString("yyyy-MM-dd")
Test-Endpoint -Method "GET" -Path "/v1/users/date-range?startDate=$startDate&endDate=$endDate" -Description "Buscar usuários por data"

# GET /v1/users/stats/roles
Test-Endpoint -Method "GET" -Path "/v1/users/stats/roles" -Description "Estatísticas por role"

# GET /v1/users/recent/active
Test-Endpoint -Method "GET" -Path "/v1/users/recent/active?limit=5" -Description "Usuários recentemente ativos"

# PUT /v1/users/{id}
if ($userId) {
    $updateData = @{
        name = "João Silva Atualizado"
    }
    Test-Endpoint -Method "PUT" -Path "/v1/users/$userId" -Description "Atualizar usuário" -Body $updateData
}

# ============================================
# PATRIMONIO ENDPOINTS
# ============================================
Write-Host "`n📌 PATRIMONIO ENDPOINTS" -ForegroundColor Magenta

# POST /v1/patrimonio - Criar patrimônio
$newPatrimonio = @{
    codigo = "PAT001"
    nome = "Notebook Dell Inspiron"
    descricao = "Notebook para desenvolvimento"
    categoria = "EQUIPAMENTO"
    status = "ATIVO"
    marca = "Dell"
    modelo = "Inspiron 15"
    numeroSerie = "SN123456"
    valorAquisicao = 3500.00
    dataAquisicao = "2024-01-15"
    dataGarantia = "2026-01-15"
    localizacao = "Sala 101"
}

$patrimonio = Test-Endpoint -Method "POST" -Path "/v1/patrimonio" -Description "Criar novo patrimônio" -Body $newPatrimonio
$patrimonioId = if ($patrimonio) { $patrimonio.id } else { $null }

# Criar mais patrimônios
$patrimonios = @(
    @{codigo="PAT002"; nome="Mesa de Escritório"; categoria="MOBILIARIO"; status="ATIVO"; valorAquisicao=800.00},
    @{codigo="PAT003"; nome="Cadeira Ergonômica"; categoria="MOBILIARIO"; status="ATIVO"; valorAquisicao=1200.00},
    @{codigo="PAT004"; nome="Monitor LG 27''"; categoria="EQUIPAMENTO"; status="ATIVO"; marca="LG"; valorAquisicao=1500.00}
)

foreach ($pat in $patrimonios) {
    Invoke-WebRequest -Uri "$baseUrl/v1/patrimonio" -Method POST -Body ($pat | ConvertTo-Json) -ContentType 'application/json' -ErrorAction SilentlyContinue | Out-Null
}

# GET /v1/patrimonio - Listar patrimônios
Test-Endpoint -Method "GET" -Path "/v1/patrimonio" -Description "Listar todos os patrimônios"

# GET /v1/patrimonio/{id}
if ($patrimonioId) {
    Test-Endpoint -Method "GET" -Path "/v1/patrimonio/$patrimonioId" -Description "Buscar patrimônio por ID"
}

# GET /v1/patrimonio/codigo/{codigo}
Test-Endpoint -Method "GET" -Path "/v1/patrimonio/codigo/PAT001" -Description "Buscar por código"

# GET /v1/patrimonio/categoria/{categoria}
Test-Endpoint -Method "GET" -Path "/v1/patrimonio/categoria/EQUIPAMENTO" -Description "Buscar por categoria"

# GET /v1/patrimonio/status/{status}
Test-Endpoint -Method "GET" -Path "/v1/patrimonio/status/ATIVO" -Description "Buscar por status"

# GET /v1/patrimonio/stats/categoria
Test-Endpoint -Method "GET" -Path "/v1/patrimonio/stats/categoria" -Description "Estatísticas por categoria"

# GET /v1/patrimonio/stats/status
Test-Endpoint -Method "GET" -Path "/v1/patrimonio/stats/status" -Description "Estatísticas por status"

# GET /v1/patrimonio/stats/valor-total
Test-Endpoint -Method "GET" -Path "/v1/patrimonio/stats/valor-total" -Description "Valor total do patrimônio"

# GET /v1/patrimonio/vencimento-garantia
Test-Endpoint -Method "GET" -Path "/v1/patrimonio/vencimento-garantia?dias=365" -Description "Patrimônios com garantia vencendo"

# PATCH /v1/patrimonio/{id}
if ($patrimonioId) {
    $updatePat = @{
        status = "MANUTENCAO"
        observacoes = "Em manutenção preventiva"
    }
    Test-Endpoint -Method "PATCH" -Path "/v1/patrimonio/$patrimonioId" -Description "Atualizar patrimônio" -Body $updatePat
}

# ============================================
# AUDIT ENDPOINTS
# ============================================
Write-Host "`n📌 AUDIT ENDPOINTS" -ForegroundColor Magenta

# POST /v1/audit/logs
$auditLog = @{
    entityType = "User"
    entityId = if ($userId) { $userId } else { "test-id" }
    action = "UPDATE"
    changes = @{
        before = @{ name = "João Silva" }
        after = @{ name = "João Silva Atualizado" }
    }
    metadata = @{
        source = "Test Script"
    }
}
Test-Endpoint -Method "POST" -Path "/v1/audit/logs" -Description "Criar log de auditoria" -Body $auditLog

# GET /v1/audit/logs
$auditLogs = Test-Endpoint -Method "GET" -Path "/v1/audit/logs" -Description "Listar logs de auditoria"
$auditLogId = if ($auditLogs -and $auditLogs.data.Count -gt 0) { $auditLogs.data[0].id } else { $null }

# GET /v1/audit/logs/{id}
if ($auditLogId) {
    Test-Endpoint -Method "GET" -Path "/v1/audit/logs/$auditLogId" -Description "Buscar log por ID"
}

# GET /v1/audit/logs/entity/{entityType}/{entityId}
if ($userId) {
    Test-Endpoint -Method "GET" -Path "/v1/audit/logs/entity/User/$userId" -Description "Buscar logs por entidade"
}

# GET /v1/audit/stats
Test-Endpoint -Method "GET" -Path "/v1/audit/stats" -Description "Estatísticas de auditoria"

# ============================================
# METRICS ENDPOINTS
# ============================================
Write-Host "`n📌 METRICS ENDPOINTS" -ForegroundColor Magenta

Test-Endpoint -Method "GET" -Path "/v1/metrics" -Description "Métricas do sistema"
Test-Endpoint -Method "GET" -Path "/v1/metrics/health" -Description "Saúde do sistema"
Test-Endpoint -Method "GET" -Path "/v1/metrics/logs" -Description "Logs do sistema"

# ============================================
# CACHE ENDPOINTS
# ============================================
Write-Host "`n📌 CACHE ENDPOINTS" -ForegroundColor Magenta

Test-Endpoint -Method "GET" -Path "/v1/cache/stats" -Description "Estatísticas do cache"
Test-Endpoint -Method "GET" -Path "/v1/cache/health" -Description "Saúde do cache"
Test-Endpoint -Method "GET" -Path "/v1/cache/keys" -Description "Chaves do cache"
Test-Endpoint -Method "GET" -Path "/v1/cache/operations" -Description "Operações do cache"
Test-Endpoint -Method "GET" -Path "/v1/cache/config" -Description "Configuração do cache"

# ============================================
# RESUMO DOS TESTES
# ============================================
Write-Host "`n`n========================================================" -ForegroundColor Cyan
Write-Host "              RESUMO DOS TESTES                         " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$results | Format-Table -AutoSize

$total = $results.Count
$success = ($results | Where-Object { $_.Result -eq "✅ SUCESSO" }).Count
$failed = ($results | Where-Object { $_.Result -eq "❌ ERRO" }).Count
$successRate = [math]::Round(($success / $total) * 100, 2)

Write-Host "`n📊 Estatísticas:" -ForegroundColor Yellow
Write-Host "   Total de testes: $total" -ForegroundColor White
Write-Host "   ✅ Sucesso: $success" -ForegroundColor Green
Write-Host "   ❌ Falhas: $failed" -ForegroundColor Red
Write-Host "   Taxa de sucesso: $successRate%" -ForegroundColor $(if ($successRate -ge 80) { "Green" } else { "Yellow" })

Write-Host "`n🔗 Documentação Swagger: http://localhost:3101/docs" -ForegroundColor Cyan
Write-Host "======================================================`n" -ForegroundColor Cyan

