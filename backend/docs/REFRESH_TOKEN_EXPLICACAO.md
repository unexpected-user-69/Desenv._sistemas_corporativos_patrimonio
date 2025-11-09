# 🔐 Explicação: Por que o Refresh Token funciona assim?

## ❓ Pergunta Comum

**"Por que o endpoint `/refresh` precisa do refresh token anterior? Por que não posso simplesmente enviar usuário e senha para renovar o token?"**

## ✅ Resposta: Motivos de Segurança

### 1. **Evitar Exposição de Credenciais**

**❌ Problema se pedir usuário e senha:**
- A senha trafegaria na rede múltiplas vezes (a cada renovação)
- Maior risco de interceptação (man-in-the-middle)
- Mais pontos de falha de segurança
- Senha pode ser capturada em logs, cache, etc.

**✅ Solução com Refresh Token:**
- Senha só trafega UMA vez (no login inicial)
- Após login, usa tokens seguros (não são credenciais)
- Tokens podem ser revogados sem comprometer a senha

### 2. **Princípio de Menor Exposição**

```
Login:        Senha → Tokens (seguro, uma vez só)
Refresh:      Token → Novos Tokens (seguro, sem expor senha)
```

### 3. **Rotação de Tokens (Token Rotation)**

O sistema usa **rotação de tokens** por segurança:

```typescript
// Quando você usa o refresh token:
1. Sistema verifica se o refresh token é válido
2. Sistema REVOGA o refresh token antigo
3. Sistema CRIA um novo refresh token
4. Sistema retorna novo access token + novo refresh token
```

**Por que isso é importante?**
- Se um refresh token for roubado, ele só funciona UMA vez
- Após uso, o token antigo é revogado automaticamente
- Atacante não pode reutilizar o token roubado

### 4. **Expiração Diferente**

```
Access Token:  15 minutos  → Curto (se roubado, expira rápido)
Refresh Token: 7 dias      → Longo (mas protegido, só usado para renovar)
```

**Por que access token é curto?**
- Se roubado, o dano é limitado (expira em 15min)
- Força renovação frequente (mais seguro)

**Por que refresh token é longo?**
- Melhor experiência do usuário (não precisa fazer login toda hora)
- Mas é usado apenas para renovar (não para acessar recursos)

### 5. **Revogação de Sessões**

**Com refresh token:**
- Usuário pode fazer logout e revogar TODOS os tokens
- Admin pode revogar tokens de usuários específicos
- Sistema pode detectar tokens comprometidos e revogá-los

**Se pedisse senha:**
- Não teria controle sobre sessões ativas
- Não poderia revogar sessões específicas
- Usuário teria que mudar a senha para revogar tudo

### 6. **Armazenamento Seguro no Servidor**

```typescript
// Refresh token é armazenado com hash Argon2 (nunca em claro)
tokenHash: await argon2.hash(refreshToken)  // Seguro
lookupKey: sha256(refreshToken)              // Indexação rápida
```

**Vantagens:**
- Mesmo se o banco for comprometido, tokens não podem ser usados
- Hash Argon2 é computacionalmente caro (dificulta ataques)
- LookupKey permite busca rápida sem comprometer segurança

## 📊 Fluxo Completo

### Cenário 1: Login Normal
```
1. Cliente → POST /auth/login (email, senha)
2. Servidor → Valida credenciais
3. Servidor → Gera access token (15min) + refresh token (7 dias)
4. Servidor → Armazena refresh token (hash) no banco
5. Cliente ← Recebe tokens
```

### Cenário 2: Access Token Expira (após 15min)
```
1. Cliente → Tenta acessar recurso com access token expirado
2. Servidor → Retorna 401 Unauthorized
3. Cliente → POST /auth/refresh (refresh token)
4. Servidor → Verifica refresh token (não expirado, não revogado)
5. Servidor → REVOGA refresh token antigo
6. Servidor → CRIA novo refresh token
7. Servidor → Gera novo access token
8. Cliente ← Recebe novos tokens
9. Cliente → Tenta acessar recurso novamente (com novo access token)
10. Servidor → Autoriza acesso
```

### Cenário 3: Refresh Token Expira (após 7 dias)
```
1. Cliente → POST /auth/refresh (refresh token expirado)
2. Servidor → Verifica refresh token (EXPIRADO)
3. Servidor → Retorna 401 Unauthorized
4. Cliente → Precisa fazer login novamente (POST /auth/login)
```

## 🛡️ Segurança Adicional

### Detecção de Roubo
```typescript
// Sistema rastreia IP e User-Agent
ip: '192.168.1.100'
userAgent: 'Mozilla/5.0...'

// Se detectar uso suspeito, pode revogar tokens
```

### Rotação Automática
```typescript
// Cada uso do refresh token gera um novo
refreshTokenAntigo → REVOGADO
refreshTokenNovo   → ATIVO
```

### Limite de Tentativas
```typescript
// Throttling no endpoint de refresh
@Throttle({ limit: 10, ttl: 60000 })  // 10 tentativas por minuto
```

## ❌ Por que NÃO pedir usuário e senha?

### Problema 1: Exposição Repetida
```
❌ Toda renovação = senha na rede
❌ Mais chances de interceptação
❌ Logs podem conter senhas
```

### Problema 2: Sem Controle de Sessões
```
❌ Não pode revogar sessões específicas
❌ Não pode fazer logout remoto
❌ Não pode detectar tokens comprometidos
```

### Problema 3: Experiência do Usuário
```
❌ Usuário precisa digitar senha toda hora
❌ Mais fricção no fluxo
❌ Maior chance de erro de digitação
```

### Problema 4: Segurança
```
❌ Senha é credencial permanente (não pode ser revogada facilmente)
❌ Token é credencial temporária (pode ser revogada instantaneamente)
```

## ✅ Resumo

**Refresh Token é o padrão da indústria porque:**
1. ✅ Minimiza exposição de credenciais
2. ✅ Permite revogação de sessões
3. ✅ Melhora experiência do usuário
4. ✅ Aumenta segurança (rotação de tokens)
5. ✅ Permite rastreamento de sessões
6. ✅ Facilita detecção de anomalias

**Padrão OAuth 2.0 / RFC 6749:**
- Este é o padrão usado por Google, Facebook, GitHub, etc.
- É a melhor prática recomendada pela indústria
- É testado e comprovado em produção

## 📚 Referências

- [OAuth 2.0 RFC 6749](https://tools.ietf.org/html/rfc6749)
- [Refresh Token Best Practices](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)
- [Token Rotation](https://oauth.net/2/refresh-tokens/)

