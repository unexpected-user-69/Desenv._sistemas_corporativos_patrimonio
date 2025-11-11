# Arquivos HTTP para Testes Manuais

Este diretório contém arquivos `.http` para testar os endpoints da API manualmente usando REST Client (VSCode) ou similar.

## 📋 Arquivos Disponíveis

- **auth.http** - Testes de autenticação (login, refresh, logout, dev-token)
- **users.http** - Testes de usuários (CRUD, validação)
- **patrimonio.http** - Testes de patrimônio (CRUD, busca)

## 🚀 Como Usar

### 1. Instalar REST Client (VSCode)

Instale a extensão **REST Client** no VSCode:
- Extensão ID: `humao.rest-client`
- Ou procure por "REST Client" no marketplace

### 2. Configurar Variáveis

Antes de executar os testes, configure as variáveis no início de cada arquivo `.http`:

```http
@host = http://localhost:3101
@apiBase = {{host}}/v1
@token = seu-access-token-aqui
@refreshToken = seu-refresh-token-aqui
@userId = id-do-usuario-aqui
@patrimonioId = id-do-patrimonio-aqui
```

### 3. Obter Token

Para obter um token, execute primeiro:

```http
### POST /auth/dev-token - Obter token de desenvolvimento
POST {{apiBase}}/auth/dev-token
```

Ou faça login:

```http
### POST /auth/login - Login
POST {{apiBase}}/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

Copie o `accessToken` e `refreshToken` da resposta e atualize as variáveis.

### 4. Executar Testes

Clique no botão **"Send Request"** acima de cada requisição no arquivo `.http`.

## 📊 Cenários de Teste

### Cenário 1: Autenticação (200)
- ✅ Login com credenciais válidas
- ✅ Refresh token válido
- ✅ Logout com token válido

### Cenário 2: Erro 401 (Não Autenticado)
- ❌ Acessar endpoint protegido sem token
- ❌ Acessar endpoint protegido com token inválido
- ❌ Acessar endpoint protegido com token expirado
- ❌ Login com credenciais inválidas

### Cenário 3: Erro 403 (Não Autorizado)
- ❌ OPERATOR tentando criar usuário (requer ADMIN)
- ❌ OPERATOR tentando deletar patrimônio (requer ADMIN)
- ❌ Tentar acessar recurso de outro usuário sem ser admin

### Cenário 4: Erro 400 (Dados Inválidos)
- ❌ Criar usuário com email inválido
- ❌ Criar patrimônio com dados inválidos
- ❌ Atualizar com dados inválidos

## 🔐 Rotas Públicas vs Protegidas

### Rotas Públicas (marcadas com @Public())
- `POST /v1/auth/login` - Login
- `POST /v1/auth/refresh` - Refresh token
- `POST /v1/auth/logout` - Logout
- `POST /v1/auth/dev-token` - Token de desenvolvimento
- `GET /v1/patrimonio` - Listar patrimônios
- `GET /v1/patrimonio/:id` - Buscar patrimônio por ID
- `POST /v1/users/validate` - Validar credenciais

### Rotas Protegidas (requerem autenticação)
- `GET /v1/auth/me` - Informações do usuário autenticado
- `POST /v1/users` - Criar usuário (requer ADMIN)
- `PUT /v1/users/:id` - Atualizar usuário (self-or-admin)
- `DELETE /v1/users/:id` - Deletar usuário (requer ADMIN)
- `POST /v1/patrimonio` - Criar patrimônio (requer ADMIN ou MANAGER)
- `PATCH /v1/patrimonio/:id` - Atualizar patrimônio (requer ADMIN ou MANAGER)
- `DELETE /v1/patrimonio/:id` - Deletar patrimônio (requer ADMIN)

## 🎯 Padrão Aurora Platform

Estes arquivos seguem o padrão Aurora Platform descrito na atividade:

- ✅ Cenários 401 (token ausente/inválido)
- ✅ Cenários 403 (falha de RBAC/Ownership)
- ✅ Cenários 200/201 (sucesso)
- ✅ Diferentes papéis (ADMIN, MANAGER, OPERATOR)
- ✅ Rotas públicas marcadas com @Public()

## 📝 Notas

- Os tokens de desenvolvimento expiram em 15 minutos
- Use o refresh token para renovar o access token
- Em produção, o endpoint `/auth/dev-token` não está disponível
- As rotas públicas não requerem autenticação, mas podem ter rate limiting

## 🔗 Links Úteis

- **Swagger UI**: http://localhost:3101/docs
- **API Base**: http://localhost:3101/v1
- **Health Check**: http://localhost:3101/v1/metrics/health


