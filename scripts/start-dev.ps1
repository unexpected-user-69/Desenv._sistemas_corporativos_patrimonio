# Script para iniciar o ambiente de desenvolvimento completo (Windows PowerShell)
# Backend + Frontend + Database

Write-Host "🚀 Iniciando Ambiente de Desenvolvimento..." -ForegroundColor Cyan

# Função para parar processos ao sair
function Cleanup {
    Write-Host "Parando serviços..." -ForegroundColor Yellow
    if ($global:BackendJob) { Stop-Job $global:BackendJob }
    if ($global:FrontendJob) { Stop-Job $global:FrontendJob }
    Write-Host "Serviços parados" -ForegroundColor Green
}

# 1. Iniciar banco de dados
Write-Host "Iniciando banco de dados PostgreSQL..." -ForegroundColor Cyan
if (Get-Command docker -ErrorAction SilentlyContinue) {
    docker-compose up db -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Banco de dados PostgreSQL iniciado" -ForegroundColor Green
    } else {
        Write-Host "❌ Falha ao iniciar banco de dados" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "⚠️ Docker não encontrado. Certifique-se de que o banco está rodando." -ForegroundColor Yellow
}

# 2. Iniciar Backend
Write-Host "Iniciando backend (NestJS)..." -ForegroundColor Cyan
$BackendBlock = {
    Set-Location "backend"
    npm run start:dev
}
$global:BackendJob = Start-Job -ScriptBlock $BackendBlock
Write-Host "✅ Backend iniciando em background..." -ForegroundColor Green

# 3. Iniciar Frontend
Write-Host "Iniciando frontend (React)..." -ForegroundColor Cyan
$FrontendBlock = {
    Set-Location "frontend"
    npm run dev
}
$global:FrontendJob = Start-Job -ScriptBlock $FrontendBlock
Write-Host "✅ Frontend iniciando em background..." -ForegroundColor Green

# 4. Informações
Write-Host ""
Write-Host "🎉 Ambiente de desenvolvimento iniciado!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Serviços rodando:"
Write-Host "  🗄️  Database: PostgreSQL (localhost:5432)"
Write-Host "  🚀 Backend: NestJS (http://localhost:3101)"
Write-Host "  🎨 Frontend: React (http://localhost:5173)"
Write-Host "  📖 Swagger: http://localhost:3101/docs"
Write-Host ""
Write-Host "⚠️  Nota: Este script usa Jobs do PowerShell. Os logs não aparecem aqui em tempo real." -ForegroundColor Yellow
Write-Host "Para ver logs, use: Receive-Job -Id <Id> -Keep"
Write-Host "Backend Job ID: $($global:BackendJob.Id)"
Write-Host "Frontend Job ID: $($global:FrontendJob.Id)"
Write-Host ""
Write-Host "Pressione qualquer tecla para parar e sair..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Cleanup
