# 🔐 Configuração de JWT Secrets para Produção

**Data**: 2025-01-27  
**Status**: ✅ Guia de Configuração Criado

---

## 📋 Visão Geral

Este documento descreve como configurar os JWT secrets de forma segura para produção. Os secrets são críticos para a segurança do sistema de autenticação.

---

## ⚠️ IMPORTANTE: Segurança

**NUNCA**:
- ❌ Commite secrets no repositório Git
- ❌ Compartilhe secrets em canais não seguros
- ❌ Use os mesmos secrets em desenvolvimento e produção
- ❌ Use secrets fracos ou previsíveis

**SEMPRE**:
- ✅ Use secrets gerados aleatoriamente com pelo menos 32 bytes
- ✅ Mantenha secrets em variáveis de ambiente seguras
- ✅ Use diferentes secrets para cada ambiente (dev, staging, prod)
- ✅ Rotacione secrets periodicamente

---

## 🔧 Variáveis Necessárias

O sistema requer duas variáveis de ambiente para JWT:

1. **`JWT_ACCESS_SECRET`**: Secret para assinar access tokens (expira em 15 minutos)
2. **`JWT_REFRESH_SECRET`**: Secret para assinar refresh tokens (expira em 7 dias por padrão)

---

## 🚀 Geração de Secrets Seguros

### Método 1: Usando Node.js (Recomendado)

```bash
# Gerar JWT_ACCESS_SECRET
node -e "console.log('JWT_ACCESS_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"

# Gerar JWT_REFRESH_SECRET
node -e "console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

### Método 2: Gerar Ambos de Uma Vez

```bash
node -e "console.log('JWT_ACCESS_SECRET=' + require('crypto').randomBytes(32).toString('hex')); console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

### Método 3: Usando OpenSSL

```bash
# Gerar JWT_ACCESS_SECRET
openssl rand -hex 32

# Gerar JWT_REFRESH_SECRET
openssl rand -hex 32
```

### Método 4: Usando Python

```bash
python -c "import secrets; print('JWT_ACCESS_SECRET=' + secrets.token_hex(32))"
python -c "import secrets; print('JWT_REFRESH_SECRET=' + secrets.token_hex(32))"
```

---

## 📝 Configuração por Ambiente

### Desenvolvimento

Para desenvolvimento local, você pode usar secrets simples ou gerar novos:

1. Copie o `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Edite o `.env` e configure os secrets:
```env
JWT_ACCESS_SECRET=seu_secret_de_acesso_aqui
JWT_REFRESH_SECRET=seu_secret_de_refresh_aqui
```

**⚠️ IMPORTANTE**: O `.env` está no `.gitignore` e NÃO deve ser commitado.

### Produção

Para produção, configure os secrets através de:

1. **Variáveis de Ambiente do Servidor** (Recomendado)
2. **Sistema de Gerenciamento de Secrets** (ex: AWS Secrets Manager, HashiCorp Vault)
3. **Docker Secrets** (se usar Docker Swarm)
4. **Kubernetes Secrets** (se usar Kubernetes)

---

## 🐳 Docker e Docker Compose

### Docker Compose (Desenvolvimento)

No `docker-compose.yml`, os secrets podem ser configurados via variáveis de ambiente:

```yaml
services:
  backend:
    environment:
      - JWT_ACCESS_SECRET=${JWT_ACCESS_SECRET}
      - JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
```

### Docker Secrets (Produção)

Para produção com Docker, use secrets:

```bash
# Criar secrets
echo "seu_secret_access" | docker secret create jwt_access_secret -
echo "seu_secret_refresh" | docker secret create jwt_refresh_secret -

# Usar no docker-compose.prod.yml
services:
  backend:
    secrets:
      - jwt_access_secret
      - jwt_refresh_secret
    environment:
      - JWT_ACCESS_SECRET_FILE=/run/secrets/jwt_access_secret
      - JWT_REFRESH_SECRET_FILE=/run/secrets/jwt_refresh_secret
```

---

## ☁️ Plataformas Cloud

### Heroku

```bash
heroku config:set JWT_ACCESS_SECRET=seu_secret_access
heroku config:set JWT_REFRESH_SECRET=seu_secret_refresh
```

### AWS (EC2/ECS)

```bash
# Via AWS Systems Manager Parameter Store
aws ssm put-parameter --name "/patrimonio/jwt/access_secret" --value "seu_secret" --type "SecureString"
aws ssm put-parameter --name "/patrimonio/jwt/refresh_secret" --value "seu_secret" --type "SecureString"
```

### Google Cloud Platform

```bash
# Via Secret Manager
gcloud secrets create jwt-access-secret --data-file=-
gcloud secrets create jwt-refresh-secret --data-file=-
```

### Azure

```bash
# Via Azure Key Vault
az keyvault secret set --vault-name seu-vault --name "JWT-ACCESS-SECRET" --value "seu_secret"
az keyvault secret set --vault-name seu-vault --name "JWT-REFRESH-SECRET" --value "seu_secret"
```

---

## ✅ Validação

### Verificar se os Secrets Estão Configurados

1. **Verificar variáveis de ambiente**:
```bash
# Linux/Mac
echo $JWT_ACCESS_SECRET
echo $JWT_REFRESH_SECRET

# Windows PowerShell
$env:JWT_ACCESS_SECRET
$env:JWT_REFRESH_SECRET
```

2. **Testar autenticação**:
```bash
# Fazer login
curl -X POST http://localhost:3101/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seu@email.com","password":"sua_senha"}'

# Se retornar tokens, os secrets estão funcionando corretamente
```

3. **Verificar logs**:
- Se os secrets não estiverem configurados, você verá erros no startup
- Em produção, o JwtStrategy lançará erro se `JWT_ACCESS_SECRET` estiver ausente

---

## 🔄 Rotação de Secrets

Para rotacionar secrets em produção:

1. **Gerar novos secrets** usando os métodos acima
2. **Configurar novos secrets** no ambiente de produção
3. **Reiniciar a aplicação**
4. **Invalidar tokens antigos** (opcional, mas recomendado):
   - Todos os tokens emitidos antes da rotação serão inválidos
   - Usuários precisarão fazer login novamente

**⚠️ IMPORTANTE**: Rotação de secrets invalida TODOS os tokens existentes. Planeje a rotação para minimizar impacto.

---

## 📚 Referências

- **JWT Strategy**: `src/auth/strategies/jwt.strategy.ts`
- **Auth Module**: `src/auth/auth.module.ts`
- **Auth Service**: `src/auth/auth.service.ts`
- **Variáveis de Ambiente**: `.env.example`

---

## 🎯 Checklist de Configuração

- [ ] Secrets gerados usando método seguro (32+ bytes)
- [ ] Secrets configurados no ambiente de produção
- [ ] Secrets NÃO commitados no repositório
- [ ] `.env` no `.gitignore` (verificado)
- [ ] Aplicação testada com novos secrets
- [ ] Documentação de rotação de secrets criada (se necessário)
- [ ] Backup dos secrets em local seguro (criptografado)

---

**Última Atualização**: 2025-01-27  
**Responsável**: Agente 04 - Testes e Documentação

