# 🏛️ Sistema de Patrimônio e Inventário

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.7+-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-18+-blue" alt="React" />
  <img src="https://img.shields.io/badge/PostgreSQL-15+-blue" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED" alt="Docker" />
</p>

## 📋 Descrição

Sistema completo de controle de patrimônio e inventário com **backend NestJS** e **frontend React**. API RESTful com autenticação, validação, documentação automática e interface moderna.

## 🏗️ Estrutura do Projeto

```
├── backend/                 # API NestJS
│   ├── src/                # Código fonte do backend
│   ├── test/               # Testes
│   ├── scripts/            # Scripts de setup
│   ├── docker-compose.yml  # Orquestração Docker
│   └── package.json        # Dependências do backend
├── frontend/               # Interface React
│   ├── src/                # Código fonte do frontend
│   ├── public/             # Arquivos estáticos
│   └── package.json        # Dependências do frontend
├── docs/                   # Documentação
└── README.md              # Este arquivo
```

## ✨ Funcionalidades

### 🔐 **Backend (NestJS)**
- API RESTful completa
- Autenticação JWT
- CRUD de usuários e patrimônio
- Validação e serialização
- Documentação Swagger
- Testes unitários e E2E
- Containerização Docker

### 🎨 **Frontend (React)**
- Interface moderna com Tailwind CSS
- Dashboard interativo
- Autenticação e autorização
- Gerenciamento de patrimônio
- Sistema de notificações
- Relatórios e métricas
- Cache e performance

## 🚀 Como Executar

### **Setup Inicial (Primeira vez)**

```bash
# 1. Configurar ambiente completo
./scripts/setup-dev.sh

# 2. Iniciar desenvolvimento
./scripts/start-dev.sh
```

### **Desenvolvimento Local**

#### Opção 1: Script Automatizado (Recomendado)
```bash
# Iniciar tudo automaticamente
./scripts/start-dev.sh
```

#### Opção 2: Manual
```bash
# 1. Iniciar banco de dados
docker-compose up db -d

# 2. Backend (terminal 1)
cd backend
npm run start:dev

# 3. Frontend (terminal 2)
cd frontend
npm run dev
```

### **Produção com Docker - Microserviços**

O sistema está organizado em microserviços, cada um em seu próprio container dentro do grupo "backend". Todos compartilham o mesmo PostgreSQL com schemas separados.

#### Pré-requisitos
- Docker e Docker Compose instalados
- Arquivo `.env` configurado (veja seção Configuração)

#### Iniciar Todos os Serviços

```bash
# 1. Construir todas as imagens dos microserviços
docker-compose build auth-service users-service events-service audit-service categorias-service patrimonio-service

# 2. Iniciar banco de dados e Redis
docker-compose up -d db redis

# 3. Aguardar banco estar pronto (alguns segundos)
# Os schemas serão criados automaticamente na primeira inicialização

# 4. Iniciar todos os microserviços
docker-compose up -d auth-service users-service events-service audit-service categorias-service patrimonio-service

# Ou iniciar tudo de uma vez:
docker-compose up -d
```

#### Verificar Status dos Serviços

```bash
# Ver status de todos os containers
docker-compose ps

# Ver apenas os microserviços do backend (usando labels)
docker ps --filter "label=com.patrimonio.group=backend"

# Ver logs de um serviço específico
docker-compose logs -f auth-service

# Ver logs de todos os microserviços
docker-compose logs -f auth-service users-service events-service audit-service categorias-service patrimonio-service
```

#### Testar Health Checks

```bash
# Auth Service (Porta 3001)
curl http://localhost:3001/health

# Users Service (Porta 3002)
curl http://localhost:3002/health

# Events Service (Porta 3003)
curl http://localhost:3003/health

# Audit Service (Porta 3004)
curl http://localhost:3004/health

# Categorias Service (Porta 3005)
curl http://localhost:3005/health

# Patrimonio Service (Porta 3006)
curl http://localhost:3006/health
```

#### Estrutura dos Microserviços

| Serviço | Porta | Container | Schema PostgreSQL |
|---------|-------|-----------|-------------------|
| **auth-service** | 3001 | `patrimonio_backend_auth_service` | `auth` |
| **users-service** | 3002 | `patrimonio_backend_users_service` | `users` |
| **events-service** | 3003 | `patrimonio_backend_events_service` | `events` |
| **audit-service** | 3004 | `patrimonio_backend_audit_service` | `audit` |
| **categorias-service** | 3005 | `patrimonio_backend_categorias_service` | `categorias` |
| **patrimonio-service** | 3006 | `patrimonio_backend_patrimonio_service` | `patrimonio` |

#### Gerenciar Containers

```bash
# Parar todos os serviços
docker-compose down

# Parar e remover volumes (CUIDADO: apaga dados)
docker-compose down -v

# Reiniciar um serviço específico
docker-compose restart auth-service

# Reconstruir e reiniciar um serviço
docker-compose up -d --build auth-service

# Ver logs em tempo real
docker-compose logs -f

# Acessar container de um serviço
docker exec -it patrimonio_backend_auth_service sh
```

#### Schemas PostgreSQL

Os schemas são criados automaticamente na primeira inicialização do PostgreSQL. O script está em:
```
./backend/scripts/database/init/create-schemas.sql
```

Para verificar os schemas criados:
```bash
docker exec patrimonio_inventario_db psql -U postgres -d patrimonio_inventario -c "\dn"
```

#### Documentação Completa

Para mais detalhes sobre a estrutura dos containers, veja:
- [Estrutura dos Containers do Backend](docs/ESTRUTURA_BACKEND_CONTAINERS.md)
- [Status dos Containers](docs/STATUS_FINAL_CONTAINERS.md)
### **Obter Token de Desenvolvimento**

#### Obter token completo (com informações do usuário)
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:3101/v1/auth/dev-token" -Method POST -Headers @{"Content-Type"="application/json"} -ErrorAction Stop; Write-Host "✅ Novo token obtido:" -ForegroundColor Green; Write-Host "Token: $($response.accessToken)" -ForegroundColor Yellow; Write-Host "User: $($response.user.email)" -ForegroundColor Blue; Write-Host "Role: $($response.user.role)" -ForegroundColor Blue; $response.accessToken
```

#### Obter ID do usuário (com formatação)
```powershell
$userId = (Invoke-RestMethod -Uri "http://localhost:3101/v1/auth/dev-token" -Method POST -Headers @{"Content-Type"="application/json"}).user.id; Write-Host "✅ ID do usuário: $userId" -ForegroundColor Green; $userId
```

### **Gerenciar Relatórios**

#### Listar todas as solicitações de relatório
```powershell
$token = (Invoke-RestMethod -Uri "http://localhost:3101/v1/auth/dev-token" -Method POST -Headers @{"Content-Type"="application/json"}).accessToken; $headers = @{"Authorization"="Bearer $token"; "Accept"="application/json"}; $requests = Invoke-RestMethod -Uri "http://localhost:3101/v1/reports/requests" -Method GET -Headers $headers; $requests | ForEach-Object { Write-Host "ID: $($_.id) | Status: $($_.status) | Tipo: $($_.type)" -ForegroundColor Cyan }
```

#### Encontrar ID de relatório válido para download (status: completed)
```powershell
$token = (Invoke-RestMethod -Uri "http://localhost:3101/v1/auth/dev-token" -Method POST -Headers @{"Content-Type"="application/json"}).accessToken; $headers = @{"Authorization"="Bearer $token"; "Accept"="application/json"}; $completed = Invoke-RestMethod -Uri "http://localhost:3101/v1/reports/requests?status=completed" -Method GET -Headers $headers; if ($completed.Count -gt 0) { Write-Host "✅ ID válido para download: $($completed[0].id)" -ForegroundColor Green; $completed[0].id } else { Write-Host "❌ Nenhum relatório com status 'completed' encontrado" -ForegroundColor Red; Write-Host "💡 Crie uma nova solicitação de relatório primeiro" -ForegroundColor Yellow }
```

#### Criar nova solicitação de relatório
```powershell
$token = (Invoke-RestMethod -Uri "http://localhost:3101/v1/auth/dev-token" -Method POST -Headers @{"Content-Type"="application/json"}).accessToken; $headers = @{"Authorization"="Bearer $token"; "Content-Type"="application/json"}; $body = @{ type = "csv"; model = "patrimonio"; filters = @{} } | ConvertTo-Json; $response = Invoke-RestMethod -Uri "http://localhost:3101/v1/reports/requests" -Method POST -Headers $headers -Body $body; Write-Host "✅ Solicitação criada: $($response.id)" -ForegroundColor Green; Write-Host "Status: $($response.status)" -ForegroundColor Yellow; $response.id
```
  
## 🔧 Configuração

### **Arquivo .env (Raiz do projeto)**
```env
# Banco de dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=patrimonio_inventario

# Backend
BACKEND_PORT=3101
NODE_ENV=development

# Frontend
FRONTEND_PORT=5173
VITE_API_BASE_URL=http://localhost:3101
VITE_APP_NAME=Patrimônio Inventário

# Segurança
HASH_PEPPER=your-pepper-here
HASH_SALT_ROUNDS=12
```

### **URLs dos Serviços**

#### Frontend
- **Frontend**: http://localhost:5173

#### Backend Monolítico (se estiver rodando)
- **Backend**: http://localhost:3101
- **Swagger**: http://localhost:3101/docs

#### Microserviços Backend
- **Auth Service**: http://localhost:3001 (Swagger: http://localhost:3001/api)
- **Users Service**: http://localhost:3002 (Swagger: http://localhost:3002/api)
- **Events Service**: http://localhost:3003 (Swagger: http://localhost:3003/api)
- **Audit Service**: http://localhost:3004 (Swagger: http://localhost:3004/api)
- **Categorias Service**: http://localhost:3005 (Swagger: http://localhost:3005/api)
- **Patrimonio Service**: http://localhost:3006 (Swagger: http://localhost:3006/api)

#### Infraestrutura
- **Database**: localhost:5432
- **Redis**: localhost:6379

## 📚 Documentação

- [Estrutura dos Containers do Backend](docs/ESTRUTURA_BACKEND_CONTAINERS.md) - Como os microserviços estão organizados
- [Status Final dos Containers](docs/STATUS_FINAL_CONTAINERS.md) - Status atual e verificação
- [Setup Docker](docs/DOCKER_SETUP.md)
- [Branch Protection](docs/BRANCH_PROTECTION_GUIDE.md)
- [Definition of Done](docs/DEFINITION_OF_DONE.md)
- [Governance Audit](docs/GOVERNANCE_AUDIT.md)

## 🧪 Testes

```bash
# Testes do Backend
cd backend
npm test
npm run test:e2e

# Testes do Frontend
cd frontend
npm test

# Testes completos (raiz do projeto)
./scripts/setup-dev.sh  # Inclui testes
```

## 📈 Status do Projeto

### **✅ Implementado**
- ✅ Backend NestJS completo
- ✅ Frontend React moderno
- ✅ Autenticação e autorização
- ✅ CRUD completo
- ✅ Containerização Docker
- ✅ Testes automatizados
- ✅ Documentação Swagger

### **🔄 Em Desenvolvimento**
- 🔄 Testes E2E completos
- 🔄 Métricas avançadas
- 🔄 Performance testing
- 🔄 Deploy automatizado

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feat/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feat/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ usando NestJS e React**