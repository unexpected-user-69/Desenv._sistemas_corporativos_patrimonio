Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  TESTE FINAL - API PATRIMONIO" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$results = @()

function Test-API {
    param([string]$Method, [string]$Path, [string]$Desc)
    try {
        $r = Invoke-WebRequest -Uri "http://localhost:3101$Path" -Method $Method -ErrorAction Stop
        $results += [PSCustomObject]@{
            Modulo = $Desc.Split('-')[0].Trim()
            Endpoint = "$Method $Path"
            Status = "OK $($r.StatusCode)"
            Result = "SUCESSO"
        }
        return $true
    } catch {
        $results += [PSCustomObject]@{
            Modulo = $Desc.Split('-')[0].Trim()
            Endpoint = "$Method $Path"
            Status = "ERRO"
            Result = "FALHA"
        }
        return $false
    }
}

# ROOT
Test-API -Method GET -Path "/v1" -Desc "Root - Hello"
Test-API -Method GET -Path "/v1/health" -Desc "Root - Health"

# USERS
Test-API -Method GET -Path "/v1/users" -Desc "Users - Listar"
Test-API -Method GET -Path "/v1/users/email/joao@teste.com" -Desc "Users - Email"
Test-API -Method GET -Path "/v1/users/stats/roles" -Desc "Users - Stats"
Test-API -Method GET -Path "/v1/users/advanced/search?name=Silva" -Desc "Users - Search"
Test-API -Method GET -Path "/v1/users/cursor/search" -Desc "Users - Cursor"
Test-API -Method GET -Path "/v1/users/fuzzy/search?q=joao" -Desc "Users - Fuzzy"
Test-API -Method GET -Path "/v1/users/recent/active" -Desc "Users - Recent"

# PATRIMONIO
Test-API -Method GET -Path "/v1/patrimonio" -Desc "Patrimonio - Listar"
Test-API -Method GET -Path "/v1/patrimonio/codigo/PAT001" -Desc "Patrimonio - Codigo"
Test-API -Method GET -Path "/v1/patrimonio/categoria/EQUIPAMENTO" -Desc "Patrimonio - Categoria"
Test-API -Method GET -Path "/v1/patrimonio/status/ATIVO" -Desc "Patrimonio - Status"
Test-API -Method GET -Path "/v1/patrimonio/stats/categoria" -Desc "Patrimonio - Stats Cat"
Test-API -Method GET -Path "/v1/patrimonio/stats/status" -Desc "Patrimonio - Stats Status"
Test-API -Method GET -Path "/v1/patrimonio/stats/valor-total" -Desc "Patrimonio - Valor"

# AUDIT (CORRIGIDO)
Test-API -Method GET -Path "/v1/audit/logs" -Desc "Audit - Logs"
Test-API -Method GET -Path "/v1/audit/stats" -Desc "Audit - Stats"

# METRICS
Test-API -Method GET -Path "/v1/metrics" -Desc "Metrics - Metricas"
Test-API -Method GET -Path "/v1/metrics/health" -Desc "Metrics - Health"
Test-API -Method GET -Path "/v1/metrics/logs" -Desc "Metrics - Logs"

# CACHE
Test-API -Method GET -Path "/v1/cache/stats" -Desc "Cache - Stats"
Test-API -Method GET -Path "/v1/cache/health" -Desc "Cache - Health"
Test-API -Method GET -Path "/v1/cache/keys" -Desc "Cache - Keys"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "RESUMO POR MODULO" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan

$results | Group-Object Modulo | ForEach-Object {
    $total = $_.Count
    $success = ($_.Group | Where-Object { $_.Result -eq "SUCESSO" }).Count
    $rate = [math]::Round(($success / $total) * 100, 1)
    
    $color = if ($rate -eq 100) {"Green"} elseif ($rate -ge 90) {"Yellow"} else {"Red"}
    Write-Host "$($_.Name): $success/$total ($rate%)" -ForegroundColor $color
}

$totalTests = $results.Count
$totalSuccess = ($results | Where-Object { $_.Result -eq "SUCESSO" }).Count
$successRate = [math]::Round(($totalSuccess / $totalTests) * 100, 1)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "RESULTADO GERAL" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total: $totalTests" -ForegroundColor White
Write-Host "Sucesso: $totalSuccess" -ForegroundColor Green
Write-Host "Falhas: $($totalTests - $totalSuccess)" -ForegroundColor $(if ($totalSuccess -eq $totalTests) {"Green"} else {"Red"})
Write-Host "Taxa: $successRate%" -ForegroundColor $(if ($successRate -eq 100) {"Green"} else {"Yellow"})
Write-Host "`nSwagger: http://localhost:3101/docs" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

