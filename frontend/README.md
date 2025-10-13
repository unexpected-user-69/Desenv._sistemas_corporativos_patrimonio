# Frontend - Sistema de Patrimônio/Inventário

## 🚀 Funcionalidades Implementadas

### ✅ Sistema de Cache Redis
- **Dashboard Completo**: Monitoramento em tempo real do cache Redis
- **Estatísticas**: Hit rate, misses, uso de memória, uptime
- **Gerenciamento de Chaves**: Busca, filtros, criação, edição e exclusão
- **Monitoramento de Operações**: Log de operações GET, SET, DEL, EXPIRE, FLUSH
- **Sistema de Alertas**: Alertas com níveis de severidade (crítico, alto, médio, baixo)
- **Configuração**: Interface para configurar TTL, políticas de evicção e parâmetros
- **Métricas de Performance**: Tempo de resposta, operações por segundo, taxa de erro

### ✅ Filtros Avançados
- **Busca Textual**: Busca por nome, email e outros campos
- **Filtros de Data**: Intervalos de criação e atualização
- **Filtros Específicos**: Por role (STUDENT, TEACHER, ADMIN) e status ativo/inativo
- **Sistema de Presets**: Salvar e carregar combinações de filtros
- **Analytics**: Gráficos de uso de filtros e combinações populares
- **Exportação**: CSV, JSON e XLSX
- **Paginação e Ordenação**: Dinâmica por qualquer campo

## 🛠️ Tecnologias Utilizadas

- **React 18+** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **Zustand** para gerenciamento de estado
- **Axios** para comunicação com API
- **Recharts** para gráficos e métricas
- **Lucide React** para ícones
- **React Hook Form + Zod** para formulários

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── cache/           # Componentes de cache Redis
│   │   │   ├── CacheDashboard.tsx
│   │   │   ├── CacheStats.tsx
│   │   │   ├── CacheHealth.tsx
│   │   │   ├── CacheKeys.tsx
│   │   │   ├── CacheOperations.tsx
│   │   │   ├── CacheAlerts.tsx
│   │   │   └── CacheConfig.tsx
│   │   └── filters/         # Componentes de filtros avançados
│   │       ├── AdvancedFiltersDashboard.tsx
│   │       ├── FilterControls.tsx
│   │       ├── FilterResults.tsx
│   │       ├── FilterPresets.tsx
│   │       └── FilterAnalytics.tsx
│   ├── pages/
│   │   ├── cache/           # Páginas de cache
│   │   └── admin/           # Páginas administrativas
│   ├── services/            # Serviços de API
│   │   ├── cacheService.ts
│   │   └── filterService.ts
│   ├── stores/              # Stores Zustand
│   │   ├── cacheStore.ts
│   │   └── filterStore.ts
│   ├── types/               # Tipos TypeScript
│   │   ├── cache.ts
│   │   └── filters.ts
│   └── App.tsx              # Componente principal
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Configuração
Copie o arquivo `env.example` para `.env` e configure as variáveis:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=Patrimônio Inventário
VITE_APP_VERSION=1.0.0
```

## 📊 Funcionalidades Detalhadas

### Cache Redis
- **Monitoramento em Tempo Real**: Atualização automática de métricas
- **Gerenciamento de Chaves**: Interface completa para CRUD de chaves
- **Configuração Dinâmica**: Alteração de parâmetros sem reinicialização
- **Alertas Inteligentes**: Sistema de notificações com níveis de severidade
- **Exportação de Dados**: Backup e exportação de configurações

### Filtros Avançados
- **Busca Inteligente**: Suporte a múltiplos campos e operadores
- **Filtros de Data**: Intervalos flexíveis com validação
- **Presets Personalizados**: Salvar e reutilizar combinações
- **Analytics Detalhados**: Métricas de uso e performance
- **Exportação Flexível**: Múltiplos formatos de saída

## 🔧 Desenvolvimento

### Estrutura de Componentes
Todos os componentes seguem o padrão:
```tsx
// 1. Imports
import React from 'react';
import { ComponentProps } from './types';

// 2. Types/Interfaces
interface Props {
  // props definition
}

// 3. Component
export const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Handlers
  const handleClick = () => {
    // handler logic
  };
  
  // 6. Effects
  useEffect(() => {
    // effect logic
  }, []);
  
  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### Gerenciamento de Estado
Utilizamos Zustand para gerenciamento de estado global:
- `cacheStore`: Estado do cache Redis
- `filterStore`: Estado dos filtros avançados

### Serviços de API
- `cacheService`: Comunicação com endpoints de cache
- `filterService`: Comunicação com endpoints de filtros

## 🧪 Testes

```bash
# Executar testes unitários
npm run test

# Executar testes com coverage
npm run test:coverage

# Executar testes E2E
npm run test:e2e
```

## 📝 Documentação

- **Componentes**: Documentação inline com JSDoc
- **Tipos**: TypeScript com interfaces bem definidas
- **API**: Integração com Swagger do backend
- **Estados**: Documentação dos stores Zustand

## 🚀 Deploy

### Build de Produção
```bash
npm run build
```

### Variáveis de Ambiente
Configure as seguintes variáveis para produção:
- `VITE_API_BASE_URL`: URL da API backend
- `VITE_APP_NAME`: Nome da aplicação
- `VITE_APP_VERSION`: Versão da aplicação

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Para suporte, entre em contato através de:
- Issues no GitHub
- Email: suporte@patrimonio.com
- Documentação: `/docs`

---

**Desenvolvido com ❤️ usando React, TypeScript e Tailwind CSS**
