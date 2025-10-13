# Sistema de Monitoramento e Observabilidade (M2)

Este projeto implementa um sistema completo de monitoramento e observabilidade para o Sistema de Patrimônio/Inventário, baseado nas funcionalidades implementadas no backend.

## 🚀 Funcionalidades Implementadas

### 📊 Dashboard de Monitoramento
- **Métricas em Tempo Real**: Visualização de performance, throughput e latência
- **Status do Sistema**: Monitoramento da saúde dos serviços
- **Logs Estruturados**: Visualização de logs com filtros por nível
- **Atualização Automática**: Refresh automático configurável

### 📈 Gráficos e Visualizações
- **Gráficos de Linha**: Para métricas temporais (tempo de resposta, throughput)
- **Gráficos de Barras**: Para comparações de dados
- **Gráficos de Pizza**: Para distribuição de métodos HTTP
- **Responsivos**: Adaptáveis a diferentes tamanhos de tela

### 🚨 Sistema de Alertas
- **Regras de Alerta**: Configuração de condições e limites
- **Níveis de Severidade**: Critical, High, Medium, Low
- **Status de Ativação**: Controle de alertas ativos/inativos
- **Histórico**: Último disparo de cada alerta

### 🔧 Funcionalidades Técnicas
- **TypeScript**: Tipagem forte em toda a aplicação
- **Tailwind CSS**: Estilização moderna e responsiva
- **Recharts**: Gráficos interativos e responsivos
- **WebSocket**: Conexão em tempo real (preparado)
- **Mock Data**: Dados simulados para demonstração

## 🛠️ Tecnologias Utilizadas

- **React 18+** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **Recharts** para gráficos
- **Axios** para comunicação com API (preparado)

## 📁 Estrutura do Projeto

```
frontend-new/
├── src/
│   ├── components/
│   │   └── monitoring/
│   │       ├── MonitoringDashboard.tsx    # Dashboard principal
│   │       ├── MetricsChart.tsx           # Componente de gráficos
│   │       └── AlertPanel.tsx             # Painel de alertas
│   ├── pages/
│   │   └── monitoring/
│   │       └── MonitoringPage.tsx         # Página de monitoramento
│   ├── services/
│   │   └── monitoring.ts                  # Serviço de API
│   ├── types/
│   │   └── monitoring.ts                  # Tipos TypeScript
│   ├── config/
│   │   └── app.ts                         # Configurações
│   ├── App.tsx                            # Componente principal
│   └── main.tsx                           # Ponto de entrada
├── tailwind.config.js                     # Configuração Tailwind
├── postcss.config.js                      # Configuração PostCSS
└── package.json                           # Dependências
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
Crie um arquivo `.env` na raiz do projeto:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=Sistema de Patrimônio
VITE_APP_VERSION=1.0.0
VITE_MONITORING_REFRESH_INTERVAL=30000
VITE_MONITORING_AUTO_REFRESH=true
```

## 📊 Componentes Principais

### MonitoringDashboard
Dashboard principal com:
- Métricas de performance em tempo real
- Status de saúde do sistema
- Logs recentes com filtros
- Atualização automática

### MetricsChart
Componente de gráficos com suporte a:
- Gráficos de linha para métricas temporais
- Gráficos de barras para comparações
- Gráficos de pizza para distribuições
- Responsividade automática

### AlertPanel
Painel de alertas com:
- Listagem de regras de alerta
- Níveis de severidade
- Status de ativação
- Histórico de disparos

## 🔌 Integração com Backend

O sistema está preparado para integrar com os endpoints do backend:

- `GET /v1/metrics` - Métricas em tempo real
- `GET /v1/health` - Saúde do sistema
- `GET /v1/logs` - Logs estruturados
- `GET /v1/alerts/rules` - Regras de alerta
- `WS /v1/metrics/stream` - WebSocket para métricas

## 🎨 Design System

### Cores
- **Primary**: Azul (#3b82f6)
- **Success**: Verde (#10b981)
- **Warning**: Amarelo (#f59e0b)
- **Danger**: Vermelho (#ef4444)

### Componentes
- Cards com sombra sutil
- Botões com estados hover/focus
- Indicadores de status coloridos
- Loading states com spinners

## 📱 Responsividade

O sistema é totalmente responsivo:
- **Mobile**: Layout em coluna única
- **Tablet**: Grid 2 colunas
- **Desktop**: Grid 4 colunas para métricas

## 🔄 Atualizações em Tempo Real

- **Auto-refresh**: Configurável (padrão 30s)
- **WebSocket**: Preparado para conexão em tempo real
- **Mock Data**: Dados simulados que se atualizam automaticamente

## 🧪 Testes

Para executar testes (quando implementados):
```bash
npm run test
```

## 📝 Próximos Passos

1. **Integração Real**: Conectar com endpoints reais do backend
2. **WebSocket**: Implementar conexão em tempo real
3. **Testes**: Adicionar testes unitários e E2E
4. **PWA**: Transformar em Progressive Web App
5. **Notificações**: Sistema de notificações push

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido como parte do Sistema de Patrimônio/Inventário - M2 Observabilidade**