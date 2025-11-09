# 🧪 Guia de Teste - Autenticação Automática no Swagger

## 📋 Pré-requisitos

1. **Servidor rodando**: O servidor deve estar em execução em `http://localhost:3101`
2. **Banco de dados**: O banco de dados deve estar configurado e acessível
3. **Navegador**: Use um navegador moderno (Chrome, Firefox, Edge)

## 🚀 Como Testar

### 1. Iniciar o Servidor

```bash
npm run start:dev
```

Aguarde até ver a mensagem:
```
[Nest] XXX  - MM/DD/YYYY, H:MM:SS AM     LOG [NestFactory] Starting Nest application...
[Nest] XXX  - MM/DD/YYYY, H:MM:SS AM     LOG [NestFactory] Nest application successfully started
```

### 2. Acessar o Swagger UI

Abra seu navegador e acesse:
```
http://localhost:3101/docs
```

### 3. Verificar Autenticação Automática

#### 3.1. Verificar Console do Navegador

1. Abra as **Ferramentas de Desenvolvimento** (F12)
2. Vá para a aba **Console**
3. Você deve ver uma das seguintes mensagens:
   - ✅ `Autenticação automática configurada no Swagger!` (verde)
   - ✅ `Swagger já está autenticado!` (verde)
   - ⚠️ Mensagens de aviso (amarelo) - podem ser normais se o script tentar múltiplas vezes

#### 3.2. Verificar Botão "Authorize"

1. No topo da página do Swagger, procure o botão **"Authorize"** 🔒
2. O botão deve mostrar que está **autenticado** (pode ter um ícone de cadeado fechado ou estar marcado)
3. Clique no botão para verificar:
   - Deve mostrar o token JWT preenchido
   - O campo "bearer (JWT)" deve conter um token válido

### 4. Testar Endpoints Protegidos

#### 4.1. Teste Básico - GET /v1/auth/me

1. Expanda a seção **"auth"** no menu lateral
2. Clique em **"GET /v1/auth/me"**
3. Clique em **"Try it out"**
4. Clique em **"Execute"**
5. **Resultado esperado**: Status `200 OK` com dados do usuário autenticado

#### 4.2. Teste - GET /v1/users

1. Expanda a seção **"users"** no menu lateral
2. Clique em **"GET /v1/users"**
3. Clique em **"Try it out"**
4. Clique em **"Execute"**
5. **Resultado esperado**: Status `200 OK` com lista de usuários

#### 4.3. Teste - GET /v1/patrimonio

1. Expanda a seção **"patrimonio"** no menu lateral
2. Clique em **"GET /v1/patrimonio"**
3. Clique em **"Try it out"**
4. Clique em **"Execute"**
5. **Resultado esperado**: Status `200 OK` com lista de patrimônios

#### 4.4. Teste - POST /v1/users (Criar Usuário)

1. Expanda a seção **"users"** no menu lateral
2. Clique em **"POST /v1/users"**
3. Clique em **"Try it out"**
4. Preencha o corpo da requisição:
   ```json
   {
     "email": "teste@example.com",
     "password": "Senha123!",
     "name": "Usuário de Teste",
     "role": "OPERATOR",
     "isActive": true
   }
   ```
5. Clique em **"Execute"**
6. **Resultado esperado**: Status `201 Created` com dados do usuário criado

### 5. Testar Endpoint dev-token

#### 5.1. Via Swagger

1. Expanda a seção **"auth"** no menu lateral
2. Clique em **"POST /v1/auth/dev-token"**
3. Clique em **"Try it out"**
4. Clique em **"Execute"**
5. **Resultado esperado**: Status `200 OK` com `accessToken` e `refreshToken`

#### 5.2. Via cURL (Terminal)

```bash
curl -X POST http://localhost:3101/v1/auth/dev-token \
  -H "Content-Type: application/json"
```

**Resultado esperado**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "...",
  "user": {
    "id": "...",
    "email": "admin@dev.local",
    "name": "Admin Dev"
  }
}
```

### 6. Verificar Script JavaScript

#### 6.1. Verificar se o script está sendo servido

Acesse no navegador:
```
http://localhost:3101/v1/swagger/auto-auth.js
```

**Resultado esperado**: Código JavaScript do script de autenticação automática

#### 6.2. Verificar no código-fonte da página

1. No Swagger UI, clique com o botão direito e selecione **"Ver código-fonte da página"**
2. Procure por `swagger-auto-auth.js` ou `auto-auth.js`
3. Deve aparecer uma tag `<script>` carregando o arquivo

## ✅ Checklist de Validação

- [ ] Servidor está rodando sem erros
- [ ] Swagger UI está acessível em `http://localhost:3101/docs`
- [ ] Console do navegador mostra mensagem de autenticação automática
- [ ] Botão "Authorize" mostra que está autenticado
- [ ] Endpoint `GET /v1/auth/me` retorna `200 OK`
- [ ] Endpoint `GET /v1/users` retorna `200 OK`
- [ ] Endpoint `GET /v1/patrimonio` retorna `200 OK`
- [ ] Endpoint `POST /v1/auth/dev-token` retorna `200 OK` com token
- [ ] Script JavaScript está sendo servido em `/v1/swagger/auto-auth.js`
- [ ] Endpoints protegidos funcionam sem inserir token manualmente

## 🐛 Troubleshooting

### Problema: Console mostra erro de autenticação automática

**Solução**:
1. Verifique se o servidor está rodando
2. Verifique se o endpoint `/v1/auth/dev-token` está acessível
3. Verifique se o usuário de desenvolvimento foi criado no banco de dados
4. Verifique as variáveis de ambiente (se configuradas)

### Problema: Botão "Authorize" não mostra autenticação

**Solução**:
1. Clique manualmente no botão "Authorize"
2. Cole o token obtido de `/v1/auth/dev-token`
3. Clique em "Authorize"
4. Verifique se o token não expirou (tokens expiram em 15 minutos)

### Problema: Endpoints retornam 401/403

**Solução**:
1. Verifique se o token está sendo enviado nos headers
2. Verifique se o token não expirou
3. Verifique se o usuário tem as permissões necessárias (role ADMIN)
4. Tente obter um novo token via `/v1/auth/dev-token`

### Problema: Script JavaScript não está sendo carregado

**Solução**:
1. Verifique se o arquivo `public/swagger-auto-auth.js` existe
2. Verifique se o endpoint `/v1/swagger/auto-auth.js` está acessível
3. Verifique se `NODE_ENV` não está definido como `production`
4. Verifique o console do navegador para erros de carregamento

## 📊 Script de Teste Automatizado

Execute o script de teste automatizado:

```bash
node test-swagger-auth.js
```

Este script testa:
- ✅ Se o servidor está rodando
- ✅ Se o endpoint `/v1/auth/dev-token` funciona
- ✅ Se o script JavaScript está sendo servido
- ✅ Se o Swagger UI está acessível
- ✅ Se os endpoints protegidos funcionam com o token

## 🎯 Resultado Esperado

Após seguir este guia, você deve conseguir:

1. ✅ Acessar o Swagger UI sem precisar inserir token manualmente
2. ✅ Testar todos os endpoints protegidos diretamente
3. ✅ Ver a autenticação automática funcionando no console
4. ✅ Ver o botão "Authorize" mostrando que está autenticado

## 💡 Notas Importantes

- A autenticação automática funciona **apenas em desenvolvimento** (`NODE_ENV !== 'production'`)
- O token expira em **15 minutos** - se expirar, recarregue a página para obter um novo token
- O usuário de desenvolvimento é criado automaticamente na primeira execução
- As credenciais padrão são:
  - Email: `admin@dev.local`
  - Senha: `AdminPassword123!`
  - Role: `ADMIN`

## 🔗 Links Úteis

- Swagger UI: http://localhost:3101/docs
- Endpoint dev-token: http://localhost:3101/v1/auth/dev-token
- Script JavaScript: http://localhost:3101/v1/swagger/auto-auth.js

