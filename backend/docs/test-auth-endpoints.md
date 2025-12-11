# 🧪 Testes de Validação - Endpoints de Autenticação

## Base URL
- **Desenvolvimento**: `http://localhost:3101/v1`
- **Swagger**: `http://localhost:3101/docs`

## ✅ Checklist de Validação

### 1. POST /auth/login
```bash
# Teste 1: Login válido
curl -X POST http://localhost:3101/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@exemplo.com",
    "password": "Senha123"
  }'

# Esperado: Status 200 com accessToken e refreshToken
# {
#   "data": {
#     "accessToken": "...",
#     "refreshToken": "...",
#     "user": { "id": "...", "email": "...", "name": "..." }
#   }
# }

# Teste 2: Credenciais inválidas
curl -X POST http://localhost:3101/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@exemplo.com",
    "password": "senha_errada"
  }'

# Esperado: Status 401 - "Invalid credentials"
```

### 2. POST /auth/refresh
```bash
# Usar refreshToken obtido no login
curl -X POST http://localhost:3101/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "refresh_token_aqui"
  }'

# Esperado: Status 200 com novo accessToken e refreshToken
# Token antigo deve ser revogado

# Teste 2: Refresh token inválido
curl -X POST http://localhost:3101/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "token_invalido"
  }'

# Esperado: Status 401 - "Invalid or expired refresh token"
```

### 3. GET /auth/me
```bash
# Usar accessToken obtido no login
curl -X GET http://localhost:3101/v1/auth/me \
  -H "Authorization: Bearer access_token_aqui"

# Esperado: Status 200 com dados do usuário
# {
#   "data": {
#     "id": "...",
#     "email": "...",
#     "name": "...",
#     "roles": ["..."]
#   }
# }

# Teste 2: Sem token
curl -X GET http://localhost:3101/v1/auth/me

# Esperado: Status 401 - "Missing bearer token"

# Teste 3: Token inválido
curl -X GET http://localhost:3101/v1/auth/me \
  -H "Authorization: Bearer token_invalido"

# Esperado: Status 401 - "Invalid token"
```

### 4. POST /auth/logout
```bash
curl -X POST http://localhost:3101/v1/auth/logout \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "refresh_token_aqui"
  }'

# Esperado: Status 200 com { "revoked": 1 }
# Refresh token deve ser revogado no banco
```

### 5. Teste de Guards
```bash
# Endpoint protegido (ex: GET /users/:id com @UseGuards)
curl -X GET http://localhost:3101/v1/users/um-id-aqui \
  -H "Authorization: Bearer access_token_valido"

# Esperado: Status 200 ou 403/404 conforme role

# Sem token
curl -X GET http://localhost:3101/v1/users/um-id-aqui

# Esperado: Status 401
```

### 6. Verificar Swagger
- Acessar: http://localhost:3101/docs
- Verificar:
  - ✅ Tag "Auth" está presente
  - ✅ Endpoints de auth estão documentados
  - ✅ DTOs estão documentados
  - ✅ Botão "Authorize" está disponível
  - ✅ Exemplos de request/response estão presentes

### 7. Verificar Interceptors
- Logs devem aparecer no console para cada requisição
- Formato: `METHOD /path STATUS - XXms`
- Timeout deve funcionar para requisições > 10s
- Respostas devem ser transformadas em formato `{ data: ... }`

### 8. Verificar Migration
```sql
-- Verificar se tabela existe
SELECT * FROM auth_refresh_tokens LIMIT 1;

-- Verificar estrutura
\d auth_refresh_tokens
```

## ✅ Status Final

Após executar todos os testes acima, marcar como concluído:

- [ ] Login funciona
- [ ] Refresh funciona
- [ ] Logout funciona
- [ ] Me funciona
- [ ] Guards funcionam
- [ ] Swagger documentado
- [ ] Interceptors funcionam
- [ ] Migration aplicada

