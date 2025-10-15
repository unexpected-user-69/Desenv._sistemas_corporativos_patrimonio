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

### **Produção com Docker**

```bash
# Iniciar tudo com Docker
docker-compose up --build -d
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
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3101
- **Swagger**: http://localhost:3101/docs
- **Database**: localhost:5432

## 📚 Documentação

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