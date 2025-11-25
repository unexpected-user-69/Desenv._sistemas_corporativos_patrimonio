# Script para matar processo na porta 3001
# Uso: .\scripts\kill-port.ps1 [porta]

param(
    [int]$Port = 3001
)

Write-Host "Procurando processos na porta $Port..." -ForegroundColor Yellow

$processes = netstat -ano | findstr ":$Port"

if ($processes) {
    Write-Host "Processos encontrados:" -ForegroundColor Cyan
    $processes | ForEach-Object {
        Write-Host $_ -ForegroundColor Gray
    }
    
    # Extrair PIDs únicos
    $pids = $processes | ForEach-Object {
        if ($_ -match '\s+(\d+)$') {
            $matches[1]
        }
    } | Select-Object -Unique
    
    foreach ($pid in $pids) {
        $processInfo = Get-Process -Id $pid -ErrorAction SilentlyContinue
        if ($processInfo) {
            Write-Host "`nEncerrando processo PID $pid ($($processInfo.ProcessName))..." -ForegroundColor Yellow
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
            Write-Host "Processo $pid encerrado." -ForegroundColor Green
        } else {
            Write-Host "Processo $pid não encontrado (já foi encerrado)." -ForegroundColor Gray
        }
    }
    
    Write-Host "`nPorta $Port liberada!" -ForegroundColor Green
} else {
    Write-Host "Nenhum processo encontrado na porta $Port." -ForegroundColor Green
}

