# 🚀 Guia Rápido - API Patrimônio e Inventário

## 📍 Base URL
```
http://localhost:3101/v1
```

## 📚 Documentação Swagger
```
http://localhost:3101/docs
```

---

## 🔍 Exemplos de Uso

### 1. Health Check

```bash
# PowerShell
Invoke-WebRequest http://localhost:3101/v1/health

# Curl
curl http://localhost:3101/v1/health
```

**Resposta:**
```json
{
  "status": "healthy",
  "message": "OK",
  "timestamp": "2025-10-22T18:20:00.000Z",
  "uptime": 1234.567
}
```

---

## 👥 USERS - Gerenciamento de Usuários

### Criar Usuário

```powershell
$user = @{
  name = "Maria Silva"
  email = "maria.silva@empresa.com"
  password = "SenhaForte@123"
  role = "ADMIN"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3101/v1/users `
  -Method POST `
  -Body $user `
  -ContentType "application/json"
```

### Listar Usuários

```powershell
# Listar todos (paginado)
Invoke-WebRequest http://localhost:3101/v1/users

# Com filtros
Invoke-WebRequest "http://localhost:3101/v1/users?page=1&limit=10&role=ADMIN&isActive=true"
```

### Buscar por Email

```powershell
Invoke-WebRequest http://localhost:3101/v1/users/email/maria.silva@empresa.com
```

### Busca Avançada

```powershell
Invoke-WebRequest "http://localhost:3101/v1/users/advanced/search?name=Silva&role=ADMIN"
```

### Estatísticas por Role

```powershell
Invoke-WebRequest http://localhost:3101/v1/users/stats/roles
```

**Resposta:**
```json
{
  "ADMIN": 2,
  "TEACHER": 3,
  "STUDENT": 15
}
```

---

## 🏢 PATRIMÔNIO - Gestão de Bens

### Criar Patrimônio

```powershell
$patrimonio = @{
  codigo = "PAT2025001"
  nome = "Notebook Dell Latitude 7420"
  descricao = "Notebook corporativo para desenvolvimento"
  categoria = "EQUIPAMENTO"
  status = "ATIVO"
  marca = "Dell"
  modelo = "Latitude 7420"
  numeroSerie = "BR123456789"
  valorAquisicao = 4500.00
  dataAquisicao = "2025-01-15"
  dataGarantia = "2028-01-15"
  localizacao = "Sala TI - Andar 3"
  observacoes = "16GB RAM, 512GB SSD"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3101/v1/patrimonio `
  -Method POST `
  -Body $patrimonio `
  -ContentType "application/json"
```

### Listar Patrimônios

```powershell
# Todos
Invoke-WebRequest http://localhost:3101/v1/patrimonio

# Com filtros
Invoke-WebRequest "http://localhost:3101/v1/patrimonio?categoria=EQUIPAMENTO&status=ATIVO&page=1&limit=20"

# Busca por texto
Invoke-WebRequest "http://localhost:3101/v1/patrimonio?q=Dell"
```

### Buscar por Código

```powershell
Invoke-WebRequest http://localhost:3101/v1/patrimonio/codigo/PAT2025001
```

### Filtrar por Categoria

```powershell
# Categorias disponíveis: EQUIPAMENTO, MOBILIARIO, VEICULO, IMOVEL, SOFTWARE, OUTROS
Invoke-WebRequest http://localhost:3101/v1/patrimonio/categoria/EQUIPAMENTO
```

### Filtrar por Status

```powershell
# Status disponíveis: ATIVO, INATIVO, MANUTENCAO, DESCARTADO
Invoke-WebRequest http://localhost:3101/v1/patrimonio/status/ATIVO
```

### Estatísticas

```powershell
# Por categoria
Invoke-WebRequest http://localhost:3101/v1/patrimonio/stats/categoria

# Por status
Invoke-WebRequest http://localhost:3101/v1/patrimonio/stats/status

# Valor total
Invoke-WebRequest http://localhost:3101/v1/patrimonio/stats/valor-total
```

**Exemplo de Resposta - Valor Total:**
```json
{
  "valorTotal": 125450.00
}
```

### Garantias Vencendo

```powershell
# Patrimônios com garantia vencendo nos próximos 90 dias
Invoke-WebRequest "http://localhost:3101/v1/patrimonio/vencimento-garantia?dias=90"
```

### Atualizar Patrimônio

```powershell
$update = @{
  status = "MANUTENCAO"
  observacoes = "Em manutenção preventiva - HD upgrade"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3101/v1/patrimonio/{id} `
  -Method PATCH `
  -Body $update `
  -ContentType "application/json"
```

---

## 📝 AUDITORIA - Logs e Rastreamento

### Criar Log de Auditoria

```powershell
$auditLog = @{
  entityType = "Patrimonio"
  entityId = "123e4567-e89b-12d3-a456-426614174000"
  action = "UPDATE"
  description = "Status alterado para manutenção"
  oldValues = @{
    status = "ATIVO"
  }
  newValues = @{
    status = "MANUTENCAO"
  }
  ipAddress = "192.168.1.100"
  userAgent = "Sistema/1.0"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3101/v1/audit/logs `
  -Method POST `
  -Body $auditLog `
  -ContentType "application/json"
```

### Listar Logs de Auditoria

```powershell
# Todos os logs
Invoke-WebRequest http://localhost:3101/v1/audit/logs

# Com filtros
Invoke-WebRequest "http://localhost:3101/v1/audit/logs?page=1&limit=20&action=UPDATE&entityType=User"
```

### Buscar Logs por Entidade

```powershell
Invoke-WebRequest http://localhost:3101/v1/audit/logs/entity/Patrimonio/123e4567-e89b-12d3-a456-426614174000
```

### Buscar Logs por Usuário

```powershell
Invoke-WebRequest http://localhost:3101/v1/audit/logs/user/{userId}
```

### Estatísticas de Auditoria

```powershell
Invoke-WebRequest http://localhost:3101/v1/audit/stats
```

**Resposta:**
```json
{
  "totalLogs": 152,
  "actionsCount": {
    "CREATE": 45,
    "UPDATE": 78,
    "DELETE": 12,
    "LOGIN": 17
  },
  "entityTypesCount": {
    "User": 89,
    "Patrimonio": 63
  },
  "recentActivity": [...]
}
```

---

## 📊 MÉTRICAS - Monitoramento

### Métricas do Sistema

```powershell
Invoke-WebRequest http://localhost:3101/v1/metrics
```

### Health Check do Sistema

```powershell
Invoke-WebRequest http://localhost:3101/v1/metrics/health
```

### Logs do Sistema

```powershell
Invoke-WebRequest http://localhost:3101/v1/metrics/logs
```

---

## 💾 CACHE - Gerenciamento

### Estatísticas do Cache

```powershell
Invoke-WebRequest http://localhost:3101/v1/cache/stats
```

**Resposta:**
```json
{
  "hits": 1250,
  "misses": 180,
  "total": 1430,
  "hitRate": 87.4,
  "memoryUsage": "52.3 MB",
  "keysCount": 3450,
  "uptime": "3d 12h 45m"
}
```

### Listar Chaves do Cache

```powershell
Invoke-WebRequest http://localhost:3101/v1/cache/keys
```

### Limpar Cache

```powershell
Invoke-WebRequest -Uri http://localhost:3101/v1/cache/clear `
  -Method POST
```

### Remover Chave Específica

```powershell
Invoke-WebRequest -Uri http://localhost:3101/v1/cache/key/user:123 `
  -Method DELETE
```

---

## 🔐 Validações e Regras de Negócio

### Usuários

- **Email**: Deve ser único e válido
- **Senha**: Mínimo 8 caracteres, deve conter maiúsculas, minúsculas, números e caracteres especiais
- **Roles**: ADMIN, TEACHER, STUDENT
- **Nome**: Obrigatório, máximo 255 caracteres

### Patrimônio

- **Código**: Único, obrigatório, máximo 50 caracteres
- **Nome**: Obrigatório, máximo 255 caracteres
- **Valor**: Deve ser maior ou igual a 0
- **Categoria**: EQUIPAMENTO, MOBILIARIO, VEICULO, IMOVEL, SOFTWARE, OUTROS
- **Status**: ATIVO, INATIVO, MANUTENCAO, DESCARTADO

---

## 📋 Paginação e Ordenação

### Parâmetros Comuns

```
?page=1           # Número da página (padrão: 1)
&limit=10         # Itens por página (padrão: 10)
&sortBy=nome      # Campo para ordenação
&sortOrder=ASC    # ASC ou DESC
```

### Exemplo

```powershell
Invoke-WebRequest "http://localhost:3101/v1/patrimonio?page=2&limit=20&sortBy=valorAquisicao&sortOrder=DESC"
```

**Resposta:**
```json
{
  "data": [...],
  "total": 150,
  "page": 2,
  "limit": 20,
  "totalPages": 8,
  "hasNextPage": true,
  "hasPreviousPage": true
}
```

---

## 🔍 Busca e Filtros

### Busca Textual

```powershell
# Busca em múltiplos campos
Invoke-WebRequest "http://localhost:3101/v1/patrimonio?q=Dell"
```

### Busca Fuzzy (Aproximada)

```powershell
Invoke-WebRequest "http://localhost:3101/v1/users/fuzzy/search?q=jon"
# Encontra: John, João, Jonathan, etc.
```

### Filtros Combinados

```powershell
Invoke-WebRequest "http://localhost:3101/v1/patrimonio?categoria=EQUIPAMENTO&status=ATIVO&valorMinimo=1000&valorMaximo=5000"
```

---

## ⚠️ Tratamento de Erros

### Códigos de Status HTTP

- **200 OK**: Sucesso
- **201 Created**: Recurso criado
- **400 Bad Request**: Dados inválidos
- **404 Not Found**: Recurso não encontrado
- **409 Conflict**: Conflito (email/código duplicado)
- **500 Internal Server Error**: Erro no servidor

### Exemplo de Erro

```json
{
  "ok": false,
  "statusCode": 400,
  "message": {
    "message": ["O email deve ser válido", "A senha deve ser forte"],
    "error": "Bad Request",
    "statusCode": 400
  },
  "timestamp": "2025-10-22T18:20:00.000Z"
}
```

---

## 🛠️ Scripts PowerShell Úteis

### Script de Teste Completo

```powershell
# Salvar em: teste-api.ps1

# 1. Verificar saúde
$health = (Invoke-WebRequest http://localhost:3101/v1/health).Content | ConvertFrom-Json
Write-Host "Sistema: $($health.status)" -ForegroundColor Green

# 2. Listar usuários
$users = (Invoke-WebRequest http://localhost:3101/v1/users).Content | ConvertFrom-Json
Write-Host "Total de usuários: $($users.total)" -ForegroundColor Cyan

# 3. Listar patrimônios
$patrimonios = (Invoke-WebRequest http://localhost:3101/v1/patrimonio).Content | ConvertFrom-Json
Write-Host "Total de patrimônios: $($patrimonios.total)" -ForegroundColor Cyan

# 4. Stats de auditoria
$audit = (Invoke-WebRequest http://localhost:3101/v1/audit/stats).Content | ConvertFrom-Json
Write-Host "Total de logs: $($audit.totalLogs)" -ForegroundColor Cyan
```

---

## 📞 Suporte e Recursos

- **Swagger UI**: http://localhost:3101/docs
- **Health Check**: http://localhost:3101/v1/health
- **Relatórios**: Ver arquivos `RESULTADO_TESTES_API.md` e `SUMARIO_EXECUTIVO_FINAL.md`

---

**Última Atualização**: 22/10/2025  
**Versão da API**: 1.0.0  
**Status**: ✅ Totalmente Operacional

