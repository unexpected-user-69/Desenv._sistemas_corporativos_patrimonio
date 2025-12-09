# 🔐 SERVICE_TOKEN - Autenticação Service-to-Service

## 📋 Visão Geral

O `SERVICE_TOKEN` é um segredo compartilhado usado para autenticação entre microsserviços internos. Ele funciona como uma "senha" que apenas os serviços internos conhecem, permitindo comunicação segura sem depender de JWTs de usuários finais.

## 🚀 Configuração

### 1. Gerar um Token Seguro

O token deve ter **pelo menos 32 caracteres aleatórios**. Para gerar um token seguro:

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32

# Python
python -c "import secrets; print(secrets.token_hex(32))"
```

### 2. Configurar Variáveis de Ambiente

Adicione o `SERVICE_TOKEN` no arquivo `.env` de **todos os serviços** que precisam se comunicar:

```env
# Token principal
SERVICE_TOKEN=seu-token-aqui-minimo-32-caracteres

# OU use SERVICE_TOKEN_CURRENT (alternativa)
SERVICE_TOKEN_CURRENT=seu-token-atual-aqui

# Token próximo (opcional, usado durante rotação)
SERVICE_TOKEN_NEXT=seu-proximo-token-aqui
```

**Importante**: Use `SERVICE_TOKEN` ou `SERVICE_TOKEN_CURRENT`, não ambos.

### 3. Serviços que Precisam do Token

Atualmente, os seguintes serviços precisam do `SERVICE_TOKEN`:

- ✅ **auth-service**: Para chamar `POST /users/validate` no users-service
- ✅ **users-service**: Para validar requisições do auth-service

## 🔒 Implementação

### ServiceTokenGuard

O `ServiceTokenGuard` valida o token recebido no header `x-service-token`:

```typescript
@ServiceOnly()
@UseGuards(ServiceTokenGuard)
@Post('validate')
async validate(@Body() dto: ValidateUserDto) {
  // Endpoint protegido
}
```

### Cliente HTTP

O `UsersHttpClient` inclui automaticamente o token nas requisições:

```typescript
// Headers são adicionados automaticamente
headers: {
  'Content-Type': 'application/json',
  'x-service-token': process.env.SERVICE_TOKEN
}
```

## 🔄 Rotação de Token (Dual Token Strategy)

Para rotacionar o token sem downtime:

1. **Fase 1**: Configure `SERVICE_TOKEN_NEXT` em todos os serviços
2. **Fase 2**: Atualize os clientes HTTP para usar o novo token
3. **Fase 3**: Mude `SERVICE_TOKEN_NEXT` para `SERVICE_TOKEN_CURRENT`
4. **Fase 4**: Remova `SERVICE_TOKEN_NEXT` após todos os serviços atualizarem

O guard aceita ambos os tokens durante a transição.

## 🛡️ Segurança

### Boas Práticas

1. **Nunca commite o token** no repositório
2. **Use cofres de segredos** em produção (AWS Secrets Manager, Azure Key Vault)
3. **Rotacione periodicamente** (recomendado: a cada 60 dias)
4. **Use tokens diferentes** por ambiente (dev, staging, produção)
5. **Monitore tentativas de autenticação** falhadas

### Fail-Closed Security

O guard aplica o princípio **Fail-Closed Security**:
- Rejeita se token ausente
- Rejeita se token inválido
- Rejeita se `SERVICE_TOKEN` não configurado

### Logging

O guard registra tentativas de autenticação, mas **nunca expõe o token real** (OWASP):
- ✅ Loga IP, path, token length
- ❌ Nunca loga o valor do token

## 📝 Exemplo de Uso

### Endpoint Protegido

```typescript
// users-service/src/users/users.controller.ts
@ServiceOnly()
@UseGuards(ServiceTokenGuard)
@Post('validate')
async validate(@Body() dto: ValidateUserDto) {
  // Apenas serviços com SERVICE_TOKEN válido podem acessar
}
```

### Cliente HTTP

```typescript
// auth-service/src/auth/users-http-client.ts
async validateCredentials(email: string, password: string) {
  const response = await this.httpService.post(
    `${this.baseUrl}/users/validate`,
    { email, password },
    {
      headers: this.getServiceHeaders(), // Inclui x-service-token automaticamente
    }
  );
}
```

## 🧪 Testes

Em modo de teste (`NODE_ENV=test`), o `UsersHttpClient` usa validação direta no banco, bypassando o HTTP e o `SERVICE_TOKEN`. Isso é intencional para facilitar testes E2E.

## 📚 Referências

- Especificação completa: `meusarq_md` (seção 1213)
- Validação de implementação: `VALIDACAO_ESPECIFICACAO_MEUSARQ.md`

