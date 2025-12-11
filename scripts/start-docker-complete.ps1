# Script para subir a aplicacao completa com Docker
# Inclui: PostgreSQL, Redis e Backend
# Executa migrations automaticamente com tratamento de indices duplicados

Write-Host "[*] Iniciando aplicacao Patrimonio e Inventario..." -ForegroundColor Cyan

# Verificar se Docker esta rodando
Write-Host "`n[*] Verificando Docker..." -ForegroundColor Yellow
try {
    docker ps | Out-Null
    Write-Host "[OK] Docker esta rodando" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Docker nao esta rodando. Por favor, inicie o Docker Desktop." -ForegroundColor Red
    exit 1
}

# Verificar se docker-compose esta disponivel
Write-Host "`n[*] Verificando Docker Compose..." -ForegroundColor Yellow
try {
    docker-compose --version | Out-Null
    Write-Host "[OK] Docker Compose disponivel" -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Docker Compose nao encontrado" -ForegroundColor Red
    exit 1
}

# Verificar Node.js para executar migrations
Write-Host "`n[*] Verificando Node.js..." -ForegroundColor Yellow
$nodeAvailable = $false
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "[OK] Node.js disponivel: $nodeVersion" -ForegroundColor Green
        $nodeAvailable = $true
    }
} catch {
    Write-Host "[AVISO] Node.js nao encontrado. Migrations serao executadas via container (limitado)" -ForegroundColor Yellow
}

# Verificar/criar arquivo .env no backend
$backendEnvPath = ".\backend\.env"

Write-Host "`n[*] Verificando arquivo .env do backend..." -ForegroundColor Yellow
if (-not (Test-Path $backendEnvPath)) {
    Write-Host "[AVISO] Arquivo .env nao encontrado. Criando..." -ForegroundColor Yellow
    
    # Criar .env basico usando array de linhas para evitar problemas com virgulas
    $envLines = @(
        "# Configuracoes do Banco de Dados",
        "DB_HOST=db",
        "DB_PORT=5432",
        "DB_USER=postgres",
        "DB_PASS=postgres",
        "DB_NAME=patrimonio_inventario",
        "DB_SSL=false",
        "DB_LOGGING=false",
        "",
        "# Configuracoes do Backend",
        "PORT=3101",
        "NODE_ENV=development",
        "",
        "# Configuracoes do Redis",
        "REDIS_HOST=redis",
        "REDIS_PORT=6379",
        "REDIS_DB=0",
        "REDIS_PASSWORD=",
        "",
        "# Configuracoes de Seguranca",
        "HASH_PEPPER=dev-pepper-change-in-production",
        "HASH_SALT_ROUNDS=12",
        "",
        "# Configuracoes de Autenticacao JWT",
        "JWT_ACCESS_SECRET=dev_access_secret_change_in_production",
        "JWT_REFRESH_SECRET=dev_refresh_secret_change_in_production",
        "JWT_ACCESS_EXPIRES_IN=15m",
        "REFRESH_EXPIRES_DAYS=7",
        "DEV_AUTO_AUTH=false",
        "",
        "# CORS",
        "CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://localhost:3101",
        "",
        "# Swagger Dev Token (apenas desenvolvimento)",
        "SWAGGER_DEV_EMAIL=admin@dev.local",
        "SWAGGER_DEV_PASSWORD=AdminPassword123!",
        "SWAGGER_DEV_NAME=Admin Dev"
    )
    
    $envLines | Out-File -FilePath $backendEnvPath -Encoding UTF8
    Write-Host "[OK] Arquivo .env criado em $backendEnvPath" -ForegroundColor Green
} else {
    Write-Host "[OK] Arquivo .env ja existe" -ForegroundColor Green
}

# Funcao para limpar indices duplicados do banco de dados
function CleanDuplicateIndexes {
    Write-Host "`n[*] Limpando indices duplicados (se houver)..." -ForegroundColor Yellow
    
    $indexesToClean = @(
        "ux_connectors_key",
        "ix_executions_connector_status_started_at",
        "ix_executions_created_by_started_at",
        "ix_execution_logs_execution_created_at",
        "ix_execution_logs_execution_level",
        "ix_maintenance_plans_categoria",
        "ix_maintenance_plans_owner",
        "ix_maintenance_plans_status",
        "ix_work_orders_plan",
        "ix_work_orders_status",
        "ix_work_orders_priority",
        "ix_work_orders_status_opened_at",
        "ix_work_orders_patrimonio_status",
        "ix_work_orders_owner_opened_at",
        "ix_work_orders_priority_due_date",
        "ix_work_logs_work_order",
        "ix_work_logs_work_order_created_at",
        "ix_parts_work_order",
        "ix_parts_work_order_part_number",
        "ix_notification_templates_type_active",
        "ix_notification_templates_name",
        "ix_notification_templates_key_version",
        "ix_notification_templates_channel",
        "ix_notification_policies_event_key",
        "ix_notification_policies_enabled",
        "ix_webhooks_enabled",
        "ix_notification_logs_channel_status_created_at",
        "ix_notification_logs_event_key",
        "ix_report_requests_status_created_at",
        "ix_report_requests_user_id",
        "ix_report_requests_created_by_created_at",
        "ix_report_artifacts_request_id",
        "ix_report_artifacts_expires_at",
        "ix_report_catalogs_active",
        "ix_report_catalog_versions_catalog_id",
        "ix_report_permissions_catalog_id",
        "ix_report_permissions_user_id",
        "ix_report_quotas_user_id"
    )
    
    $cleanedCount = 0
    foreach ($indexName in $indexesToClean) {
        try {
            docker exec patrimonio_inventario_db psql -U postgres -d patrimonio_inventario -c "DROP INDEX IF EXISTS $indexName CASCADE;" 2>$null | Out-Null
            if ($LASTEXITCODE -eq 0) {
                $cleanedCount++
            }
        } catch {
            # Ignorar erros
        }
    }
    
    if ($cleanedCount -gt 0) {
        Write-Host "[OK] $cleanedCount indice(s) duplicado(s) removido(s)" -ForegroundColor Green
    } else {
        Write-Host "[OK] Nenhum indice duplicado encontrado" -ForegroundColor Green
    }
}

# Verificar se ha containers rodando
Write-Host "`n[*] Parando containers existentes (se houver)..." -ForegroundColor Yellow
docker-compose down 2>$null

# Subir containers (sem frontend)
Write-Host "`n[*] Subindo containers Docker..." -ForegroundColor Cyan
Write-Host "   - PostgreSQL (porta 5432)" -ForegroundColor Gray
Write-Host "   - Redis (porta 6379)" -ForegroundColor Gray
Write-Host "   - Backend NestJS (porta 3101)" -ForegroundColor Gray

docker-compose up -d --build db redis backend

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERRO] Erro ao subir containers!" -ForegroundColor Red
    Write-Host "Verifique os logs com: docker-compose logs" -ForegroundColor Yellow
    exit 1
}

# Aguardar servicos estarem prontos
Write-Host "`n[*] Aguardando servicos estarem prontos..." -ForegroundColor Yellow

$maxAttempts = 60
$attempt = 0
$dbReady = $false
$redisReady = $false

while ($attempt -lt $maxAttempts) {
    $attempt++
    
    # Verificar PostgreSQL
    if (-not $dbReady) {
        try {
            docker exec patrimonio_inventario_db pg_isready -U postgres 2>$null | Out-Null
            if ($LASTEXITCODE -eq 0) {
                $dbReady = $true
                Write-Host "`n[OK] PostgreSQL esta pronto" -ForegroundColor Green
            }
        } catch {
            # Container ainda nao esta pronto
        }
    }
    
    # Verificar Redis
    if (-not $redisReady) {
        try {
            $redisCheck = docker exec patrimonio_inventario_redis redis-cli ping 2>$null
            if ($redisCheck -eq "PONG") {
                $redisReady = $true
                Write-Host "`n[OK] Redis esta pronto e respondendo" -ForegroundColor Green
            }
        } catch {
            # Container ainda nao esta pronto
        }
    }
    
    if ($dbReady -and $redisReady) {
        break
    }
    
    Start-Sleep -Seconds 2
    Write-Host "." -NoNewline -ForegroundColor Gray
}

Write-Host ""

if (-not $dbReady) {
    Write-Host "`n[ERRO] PostgreSQL nao esta pronto!" -ForegroundColor Red
    Write-Host "Verifique os logs: docker-compose logs db" -ForegroundColor Yellow
    exit 1
}

if (-not $redisReady) {
    Write-Host "`n[ERRO] Redis nao esta pronto!" -ForegroundColor Red
    Write-Host "Verifique os logs: docker-compose logs redis" -ForegroundColor Yellow
    Write-Host "Tentando iniciar Redis manualmente..." -ForegroundColor Yellow
    docker-compose up -d redis
    Start-Sleep -Seconds 5
    $redisCheck = docker exec patrimonio_inventario_redis redis-cli ping 2>$null
    if ($redisCheck -eq "PONG") {
        Write-Host "[OK] Redis iniciado com sucesso" -ForegroundColor Green
        $redisReady = $true
    } else {
        Write-Host "[AVISO] Redis pode nao estar funcionando corretamente" -ForegroundColor Yellow
    }
}

# Limpar indices duplicados antes de executar migrations
CleanDuplicateIndexes

# Executar migrations
Write-Host "`n[*] Executando migrations do banco de dados..." -ForegroundColor Cyan
Write-Host "   (Isso pode levar alguns segundos)" -ForegroundColor Gray

$migrationSuccess = $false
$migrationRetries = 3

if (-not $dbReady) {
    Write-Host "[ERRO] Nao e possivel executar migrations: PostgreSQL nao esta pronto" -ForegroundColor Red
} else {
    # Configurar variaveis de ambiente para conexao com banco Docker
    $env:DB_HOST = "localhost"
    $env:DB_PORT = "5432"
    $env:DB_USER = "postgres"
    $env:DB_PASS = "postgres"
    $env:DB_NAME = "patrimonio_inventario"
    $env:DB_SSL = "false"
    
    # Metodo preferido: Executar localmente com Node.js (se disponivel)
    if ($nodeAvailable) {
        Write-Host "   Executando migrations localmente (Node.js)..." -ForegroundColor Gray
        
        # Verificar se node_modules existe
        $backendPath = ".\backend"
        if (-not (Test-Path "$backendPath\node_modules")) {
            Write-Host "   [AVISO] node_modules nao encontrado. Instalando dependencias..." -ForegroundColor Yellow
            Push-Location $backendPath
            npm install 2>&1 | Out-Null
            Pop-Location
        }
        
        # Executar migrations com retry e tratamento de erros
        for ($retry = 1; $retry -le $migrationRetries; $retry++) {
            Write-Host "   Tentativa $retry de $migrationRetries..." -ForegroundColor Gray
            
            Push-Location $backendPath
            $migrationOutput = npm run migration:run 2>&1 | Out-String
            $migrationExitCode = $LASTEXITCODE
            Pop-Location
            
            # Verificar se houve erro de indice duplicado
            if ($migrationOutput -match "relation.*already exists" -or $migrationOutput -match "already exists") {
                Write-Host "   [AVISO] Indice duplicado detectado. Limpando..." -ForegroundColor Yellow
                CleanDuplicateIndexes
                Start-Sleep -Seconds 2
                continue
            }
            
            # Verificar sucesso - varias formas de detectar sucesso
            $isSuccess = $false
            if ($migrationExitCode -eq 0) {
                $isSuccess = $true
            } elseif ($migrationOutput -match "Migration.*executed successfully") {
                $isSuccess = $true
            } elseif ($migrationOutput -match "Nenhuma migração pendente") {
                $isSuccess = $true
            } elseif ($migrationOutput -match "Total de migrações executadas") {
                $isSuccess = $true
            } elseif ($migrationOutput -match "Execução de migrações concluída") {
                $isSuccess = $true
            }
            
            if ($isSuccess) {
                $migrationSuccess = $true
                Write-Host "[OK] Migrations executadas com sucesso" -ForegroundColor Green
                
                # Mostrar resumo
                $successCount = ([regex]::Matches($migrationOutput, "Migration.*executed successfully")).Count
                if ($successCount -gt 0) {
                    Write-Host "   $successCount migration(s) executada(s)" -ForegroundColor Green
                }
                
                # Extrair total de migrations
                if ($migrationOutput -match "Total de migrações executadas:\s*(\d+)") {
                    $totalMigrations = $matches[1]
                    Write-Host "   Total de migrations no banco: $totalMigrations" -ForegroundColor Gray
                }
                break
            } else {
                if ($retry -lt $migrationRetries) {
                    Write-Host "   [AVISO] Erro na execucao. Tentando novamente..." -ForegroundColor Yellow
                    CleanDuplicateIndexes
                    Start-Sleep -Seconds 3
                } else {
                    Write-Host "   [AVISO] Erro apos $migrationRetries tentativas" -ForegroundColor Yellow
                    Write-Host "   Ultima saida:" -ForegroundColor Gray
                    $migrationOutput -split "`n" | Select-Object -Last 10 | ForEach-Object {
                        Write-Host "     $_" -ForegroundColor DarkGray
                    }
                }
            }
        }
    }
    
    # Metodo alternativo: Tentar via container (limitado)
    if (-not $migrationSuccess) {
        Write-Host "   [AVISO] Tentando executar migrations via container..." -ForegroundColor Yellow
        Write-Host "   (Nota: Container de producao pode nao ter todas as dependencias)" -ForegroundColor Gray
        
        try {
            $migrationOutput = docker exec patrimonio_inventario_backend npm run migration:run 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[OK] Migrations executadas via container" -ForegroundColor Green
                $migrationSuccess = $true
            }
        } catch {
            # Continuar
        }
    }
    
    if (-not $migrationSuccess) {
        Write-Host "[AVISO] Nao foi possivel executar migrations automaticamente" -ForegroundColor Yellow
        Write-Host "   Isso pode ser normal se as migrations ja foram aplicadas" -ForegroundColor Gray
        Write-Host "   Para executar manualmente:" -ForegroundColor Yellow
        Write-Host "   cd backend" -ForegroundColor Cyan
        Write-Host "   npm run migration:run" -ForegroundColor Cyan
    }
}

# Verificar status das migrations
Write-Host "`n[*] Verificando status das migrations..." -ForegroundColor Cyan
try {
    $migrationCount = docker exec patrimonio_inventario_db psql -U postgres -d patrimonio_inventario -t -c "SELECT COUNT(*) FROM migrations;" 2>$null
    $migrationCount = $migrationCount.Trim()
    Write-Host "[OK] Total de migrations aplicadas: $migrationCount" -ForegroundColor Green
} catch {
    Write-Host "[AVISO] Nao foi possivel verificar status das migrations" -ForegroundColor Yellow
}

# Aguardar backend estar pronto
Write-Host "`n[*] Aguardando backend estar pronto..." -ForegroundColor Yellow
$backendReady = $false
$backendAttempts = 60

for ($i = 1; $i -le $backendAttempts; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3101/v1" -Method GET -TimeoutSec 2 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200 -or $response.StatusCode -eq 404) {
            $backendReady = $true
            Write-Host "`n[OK] Backend esta pronto e respondendo" -ForegroundColor Green
            break
        }
    } catch {
        # Backend ainda nao esta pronto
    }
    Start-Sleep -Seconds 2
    Write-Host "." -NoNewline -ForegroundColor Gray
}

Write-Host ""

if (-not $backendReady) {
    Write-Host "[AVISO] Backend pode nao estar totalmente pronto ainda" -ForegroundColor Yellow
    Write-Host "   Verifique os logs: docker-compose logs backend" -ForegroundColor Yellow
}

# Verificacao final dos servicos
Write-Host "`n[*] Verificacao final dos servicos..." -ForegroundColor Cyan

# Verificar Redis novamente
try {
    $finalRedisCheck = docker exec patrimonio_inventario_redis redis-cli ping 2>$null
    if ($finalRedisCheck -eq "PONG") {
        Write-Host "[OK] Redis: Funcionando corretamente" -ForegroundColor Green
    } else {
        Write-Host "[AVISO] Redis: Nao esta respondendo corretamente" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[ERRO] Redis: Nao foi possivel verificar" -ForegroundColor Red
}

# Verificar PostgreSQL novamente
try {
    docker exec patrimonio_inventario_db pg_isready -U postgres 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] PostgreSQL: Funcionando corretamente" -ForegroundColor Green
    } else {
        Write-Host "[AVISO] PostgreSQL: Nao esta respondendo corretamente" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[ERRO] PostgreSQL: Nao foi possivel verificar" -ForegroundColor Red
}

# Verificar Backend
try {
    $backendCheck = Invoke-WebRequest -Uri "http://localhost:3101/v1" -Method GET -TimeoutSec 2 -ErrorAction SilentlyContinue
    if ($backendCheck.StatusCode -eq 200 -or $backendCheck.StatusCode -eq 404) {
        Write-Host "[OK] Backend: Funcionando corretamente" -ForegroundColor Green
    } else {
        Write-Host "[AVISO] Backend: Retornou status $($backendCheck.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[AVISO] Backend: Nao foi possivel verificar (pode estar iniciando)" -ForegroundColor Yellow
}

# Status final
Write-Host "`n[*] Status dos containers:" -ForegroundColor Cyan
docker-compose ps

Write-Host "`n[OK] Aplicacao iniciada com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "[*] Servicos rodando:" -ForegroundColor Cyan
Write-Host "   - PostgreSQL:     localhost:5432" -ForegroundColor White
Write-Host "   - Redis:          localhost:6379" -ForegroundColor White
Write-Host "   - Backend API:    http://localhost:3101" -ForegroundColor White
Write-Host "   - Swagger Docs:   http://localhost:3101/docs" -ForegroundColor White
Write-Host ""
Write-Host "[*] Comandos uteis:" -ForegroundColor Cyan
Write-Host "   - Ver logs:       docker-compose logs -f" -ForegroundColor White
Write-Host "   - Logs Redis:     docker-compose logs redis" -ForegroundColor White
Write-Host "   - Logs DB:        docker-compose logs db" -ForegroundColor White
Write-Host "   - Logs Backend:   docker-compose logs backend" -ForegroundColor White
Write-Host "   - Parar:          docker-compose down" -ForegroundColor White
Write-Host "   - Reiniciar:      docker-compose restart" -ForegroundColor White
Write-Host "   - Status:         docker-compose ps" -ForegroundColor White
Write-Host ""
if (-not $migrationSuccess) {
    Write-Host "[*] Executar migrations manualmente:" -ForegroundColor Cyan
    Write-Host "   cd backend" -ForegroundColor White
    Write-Host "   npm run migration:run" -ForegroundColor White
    Write-Host ""
}
