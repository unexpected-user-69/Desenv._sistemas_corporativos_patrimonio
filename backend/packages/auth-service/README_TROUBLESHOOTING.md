# 🔧 Troubleshooting - Auth Service

## Problema: Porta 3001 já em uso (EADDRINUSE)

### Sintoma
```
Error: listen EADDRINUSE: address already in use :::3001
```

### Soluções

#### 1. Usar o script automático (Recomendado)

```powershell
# Encerrar processo na porta 3001
npm run kill-port:3001

# Ou para outra porta
npm run kill-port -- 3002
```

#### 2. Encerrar manualmente

```powershell
# 1. Encontrar o processo
netstat -ano | findstr :3001

# 2. Encerrar o processo (substitua <PID> pelo número encontrado)
taskkill /PID <PID> /F
```

#### 3. Usar outra porta

```powershell
# Definir porta diferente
$env:PORT=3002; npm run start:dev

# Ou no PowerShell
$env:PORT="3002"
npm run start:dev
```

#### 4. Verificar processos Node.js rodando

```powershell
# Listar todos os processos Node.js
Get-Process node

# Encerrar todos os processos Node.js (CUIDADO!)
Get-Process node | Stop-Process -Force
```

### Prevenção

O `main.ts` agora detecta automaticamente quando a porta está em uso e exibe uma mensagem de ajuda com as opções acima.

### Scripts Disponíveis

- `npm run kill-port:3001` - Encerra processo na porta 3001
- `npm run kill-port -- <porta>` - Encerra processo em porta específica

---

## Outros Problemas Comuns

### Erro de Conexão com Banco de Dados

```powershell
# Verificar se o PostgreSQL está rodando
docker-compose ps

# Iniciar o banco
docker-compose up db -d
```

### Erro de Dependências

```powershell
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro de TypeScript

```powershell
# Limpar cache e rebuild
npm run build
```

---

**Última atualização**: 2025-11-25

