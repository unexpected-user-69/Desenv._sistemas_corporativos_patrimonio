# Script para testar todos os endpoints da API
$baseUrl = "http://localhost:3101/v1"
$results = @()

function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Url,
        [string]$Description,
        [object]$Body = $null
    )
    
    Write-Host ""
    Write-Host "========================================"
    Write-Host "$Method $Url"
    Write-Host "$Description"
    Write-Host "========================================"
    
    try {
        $params = @{
            Method = $Method
            Uri = "$baseUrl$Url"
            ContentType = "application/json"
            ErrorAction = "Stop"
        }
        
        if ($Body) {
            $params.Body = ($Body | ConvertTo-Json -Depth 10)
        }
        
        $response = Invoke-RestMethod @params
        Write-Host "SUCCESS: Status 200 OK" -ForegroundColor Green
        $script:results += [PSCustomObject]@{
            Method = $Method
            Endpoint = $Url
            Description = $Description
            Status = "SUCCESS"
            StatusCode = 200
        }
        return $response
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 404 -or $statusCode -eq 400) {
            Write-Host "WARNING: Status $statusCode (Esperado para endpoints sem dados)" -ForegroundColor Yellow
            $script:results += [PSCustomObject]@{
                Method = $Method
                Endpoint = $Url
                Description = $Description
                Status = "EXPECTED_ERROR"
                StatusCode = $statusCode
            }
        } else {
            Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
            Write-Host "Status Code: $statusCode" -ForegroundColor Red
            $script:results += [PSCustomObject]@{
                Method = $Method
                Endpoint = $Url
                Description = $Description
                Status = "ERROR"
                StatusCode = $statusCode
                Error = $_.Exception.Message
            }
        }
    }
}

Write-Host "========================================"
Write-Host "TESTANDO TODOS OS ENDPOINTS DA API"
Write-Host "========================================"

# ====== ROOT ENDPOINTS ======
Write-Host ""
Write-Host "=== ROOT ENDPOINTS ==="
Test-Endpoint -Method "GET" -Url "/" -Description "Hello world endpoint"
Test-Endpoint -Method "GET" -Url "/health" -Description "Health check"

# ====== USERS ENDPOINTS ======
Write-Host ""
Write-Host "=== USERS ENDPOINTS ==="

# Criar um usuário para testes
$testUser = @{
    name = "Usuario Teste API"
    email = "teste.api.$(Get-Random)@email.com"
    password = "SenhaForte123"
    role = "STUDENT"
    isActive = $true
}
$createdUser = Test-Endpoint -Method "POST" -Url "/users" -Description "Criar usuário" -Body $testUser
$userId = $createdUser.id

Test-Endpoint -Method "GET" -Url "/users" -Description "Listar usuários"
Test-Endpoint -Method "GET" -Url "/users?page=1&limit=10" -Description "Listar usuários com paginação"
Test-Endpoint -Method "GET" -Url "/users?role=STUDENT" -Description "Listar usuários por role"
Test-Endpoint -Method "GET" -Url "/users?isActive=true" -Description "Listar usuários ativos"
Test-Endpoint -Method "GET" -Url "/users?sortBy=name&sortOrder=ASC" -Description "Listar usuários ordenados"

if ($userId) {
    Test-Endpoint -Method "GET" -Url "/users/$userId" -Description "Buscar usuário por ID"
    Test-Endpoint -Method "PUT" -Url "/users/$userId" -Description "Atualizar usuário" -Body @{ name = "Usuario Atualizado" }
}

Test-Endpoint -Method "GET" -Url "/users/email/$($testUser.email)" -Description "Buscar por email"
Test-Endpoint -Method "GET" -Url "/users/stats/roles" -Description "Estatísticas por role"
Test-Endpoint -Method "GET" -Url "/users/recent/active?days=30" -Description "Usuários ativos recentes"

# ====== CATEGORIAS ENDPOINTS ======
Write-Host ""
Write-Host "=== CATEGORIAS ENDPOINTS ==="

# Criar uma categoria para testes
$testCategoria = @{
    codigo = "TEST_$(Get-Random)"
    nome = "Categoria Teste API"
    descricao = "Categoria criada para testes"
    ativo = $true
}
$createdCategoria = Test-Endpoint -Method "POST" -Url "/categorias" -Description "Criar categoria" -Body $testCategoria
$categoriaId = $createdCategoria.id

Test-Endpoint -Method "GET" -Url "/categorias" -Description "Listar categorias"
Test-Endpoint -Method "GET" -Url "/categorias?page=1&limit=10" -Description "Listar categorias com paginação"
Test-Endpoint -Method "GET" -Url "/categorias?ativo=true" -Description "Listar categorias ativas"

if ($categoriaId) {
    Test-Endpoint -Method "GET" -Url "/categorias/$categoriaId" -Description "Buscar categoria por ID"
    Test-Endpoint -Method "GET" -Url "/categorias/codigo/$($testCategoria.codigo)" -Description "Buscar categoria por código"
    Test-Endpoint -Method "PUT" -Url "/categorias/$categoriaId" -Description "Atualizar categoria" -Body @{ 
        codigo = $testCategoria.codigo
        nome = "Categoria Atualizada"
        descricao = "Descrição atualizada"
        ativo = $true
    }
    Test-Endpoint -Method "PATCH" -Url "/categorias/$categoriaId/desativar" -Description "Desativar categoria"
    Test-Endpoint -Method "PATCH" -Url "/categorias/$categoriaId/ativar" -Description "Ativar categoria"
}

# ====== PATRIMONIO ENDPOINTS ======
Write-Host ""
Write-Host "=== PATRIMONIO ENDPOINTS ==="

Test-Endpoint -Method "GET" -Url "/patrimonio" -Description "Listar patrimônios"
Test-Endpoint -Method "GET" -Url "/patrimonio?page=1&limit=10" -Description "Listar patrimônios com paginação"
Test-Endpoint -Method "GET" -Url "/patrimonio/stats/categoria" -Description "Estatísticas por categoria"
Test-Endpoint -Method "GET" -Url "/patrimonio/stats/status" -Description "Estatísticas por status"
Test-Endpoint -Method "GET" -Url "/patrimonio/stats/valor-total" -Description "Valor total"
Test-Endpoint -Method "GET" -Url "/patrimonio/vencimento-garantia?dias=30" -Description "Vencimento garantia"

# Criar patrimônio para testes se temos categoria
if ($categoriaId) {
    $testPatrimonio = @{
        codigo = "PAT-TEST-$(Get-Random)"
        nome = "Patrimonio Teste API"
        descricao = "Patrimonio criado para testes"
        categoriaId = $categoriaId
        status = "ATIVO"
        valorAquisicao = 1000.00
        dataAquisicao = (Get-Date).ToString("yyyy-MM-dd")
    }
    $createdPatrimonio = Test-Endpoint -Method "POST" -Url "/patrimonio" -Description "Criar patrimônio" -Body $testPatrimonio
    $patrimonioId = $createdPatrimonio.id
    
    if ($patrimonioId) {
        Test-Endpoint -Method "GET" -Url "/patrimonio/$patrimonioId" -Description "Buscar patrimônio por ID"
        Test-Endpoint -Method "GET" -Url "/patrimonio/codigo/$($testPatrimonio.codigo)" -Description "Buscar patrimônio por código"
        Test-Endpoint -Method "GET" -Url "/patrimonio/categoria/$categoriaId" -Description "Buscar patrimônios por categoria"
        Test-Endpoint -Method "GET" -Url "/patrimonio/status/ATIVO" -Description "Buscar patrimônios por status"
        Test-Endpoint -Method "PATCH" -Url "/patrimonio/$patrimonioId" -Description "Atualizar patrimônio" -Body @{ nome = "Patrimonio Atualizado" }
    }
}

# ====== ENUMS ENDPOINTS ======
Write-Host ""
Write-Host "=== ENUMS ENDPOINTS ==="

Test-Endpoint -Method "GET" -Url "/enums/categorias" -Description "Listar categorias enum"
Test-Endpoint -Method "GET" -Url "/enums/status" -Description "Listar status enum"
Test-Endpoint -Method "GET" -Url "/enums/roles" -Description "Listar roles enum"
Test-Endpoint -Method "GET" -Url "/enums/campos-ordenacao" -Description "Listar campos de ordenação"
Test-Endpoint -Method "GET" -Url "/enums/direcoes-ordenacao" -Description "Listar direções de ordenação"

# ====== METRICS ENDPOINTS ======
Write-Host ""
Write-Host "=== METRICS ENDPOINTS ==="

Test-Endpoint -Method "GET" -Url "/metrics" -Description "Obter métricas do sistema"
Test-Endpoint -Method "GET" -Url "/metrics/health" -Description "Verificar saúde do sistema"
Test-Endpoint -Method "GET" -Url "/metrics/logs?limit=10" -Description "Obter logs do sistema"

# ====== CACHE ENDPOINTS ======
Write-Host ""
Write-Host "=== CACHE ENDPOINTS ==="

Test-Endpoint -Method "GET" -Url "/cache/stats" -Description "Estatísticas do cache"
Test-Endpoint -Method "GET" -Url "/cache/health" -Description "Saúde do cache"
Test-Endpoint -Method "GET" -Url "/cache/keys" -Description "Listar chaves do cache"
Test-Endpoint -Method "GET" -Url "/cache/keys?pattern=user*&limit=10" -Description "Listar chaves filtradas"
Test-Endpoint -Method "GET" -Url "/cache/operations?limit=10" -Description "Operações recentes do cache"
Test-Endpoint -Method "GET" -Url "/cache/alerts" -Description "Alertas do cache"
Test-Endpoint -Method "GET" -Url "/cache/config" -Description "Configuração do cache"
Test-Endpoint -Method "GET" -Url "/cache/key/test-key" -Description "Obter chave específica"
Test-Endpoint -Method "POST" -Url "/cache/clear" -Description "Limpar cache"

# ====== AUDIT ENDPOINTS ======
Write-Host ""
Write-Host "=== AUDIT ENDPOINTS ==="

Test-Endpoint -Method "GET" -Url "/audit/logs" -Description "Listar logs de auditoria"
Test-Endpoint -Method "GET" -Url "/audit/stats" -Description "Estatísticas de auditoria"

# Criar log de auditoria para testes
$testAuditLog = @{
    action = "TEST"
    entityType = "TEST"
    entityId = (New-Guid).ToString()
    userId = if ($userId) { $userId } else { (New-Guid).ToString() }
    description = "Log de teste criado via API"
    oldValues = @{ status = "INATIVO" }
    newValues = @{ status = "ATIVO" }
}
$createdAuditLog = Test-Endpoint -Method "POST" -Url "/audit/logs" -Description "Criar log de auditoria" -Body $testAuditLog
$auditLogId = $createdAuditLog.id

if ($auditLogId) {
    Test-Endpoint -Method "GET" -Url "/audit/logs/$auditLogId" -Description "Buscar log por ID"
}

if ($userId) {
    Test-Endpoint -Method "GET" -Url "/audit/logs/user/$userId" -Description "Buscar logs por usuário"
}

# ====== LIMPEZA ======
Write-Host ""
Write-Host "=== LIMPANDO DADOS DE TESTE ==="

if ($patrimonioId) {
    Test-Endpoint -Method "DELETE" -Url "/patrimonio/$patrimonioId" -Description "Deletar patrimônio de teste"
}

if ($categoriaId) {
    Test-Endpoint -Method "DELETE" -Url "/categorias/$categoriaId" -Description "Deletar categoria de teste"
}

if ($userId) {
    Test-Endpoint -Method "DELETE" -Url "/users/$userId" -Description "Deletar usuário de teste"
}

# ====== RESUMO FINAL ======
Write-Host ""
Write-Host "========================================"
Write-Host "RESUMO DOS TESTES"
Write-Host "========================================"

$totalTests = $results.Count
$successTests = ($results | Where-Object { $_.Status -eq "SUCCESS" }).Count
$expectedErrors = ($results | Where-Object { $_.Status -eq "EXPECTED_ERROR" }).Count
$errorTests = ($results | Where-Object { $_.Status -eq "ERROR" }).Count

Write-Host ""
Write-Host "Total de testes: $totalTests"
Write-Host "Sucessos (200): $successTests" -ForegroundColor Green
Write-Host "Erros esperados (404/400): $expectedErrors" -ForegroundColor Yellow
Write-Host "Erros reais: $errorTests" -ForegroundColor Red

if ($errorTests -gt 0) {
    Write-Host ""
    Write-Host "=== ENDPOINTS COM ERRO ==="
    $results | Where-Object { $_.Status -eq "ERROR" } | ForEach-Object {
        Write-Host ""
        Write-Host "$($_.Method) $($_.Endpoint)" -ForegroundColor Red
        Write-Host "  Descrição: $($_.Description)"
        Write-Host "  Status Code: $($_.StatusCode)" -ForegroundColor Red
        Write-Host "  Erro: $($_.Error)" -ForegroundColor Red
    }
}

# Exportar resultados para JSON
$results | ConvertTo-Json -Depth 10 | Out-File "test-results.json"
Write-Host ""
Write-Host "Resultados salvos em test-results.json"
