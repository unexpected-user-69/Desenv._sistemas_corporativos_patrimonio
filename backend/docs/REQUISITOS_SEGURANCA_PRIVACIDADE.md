# 🔐 Requisitos de Segurança e Privacidade - Sistema de Patrimônio

**Data de Criação**: 2025-01-27  
**Versão**: 1.0.0  
**Contexto**: Atividade 3 - Fase 3: Comunicação Segura entre Microsserviços

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Princípios de Segurança](#princípios-de-segurança)
3. [Requisitos de Autenticação e Autorização](#requisitos-de-autenticação-e-autorização)
4. [Requisitos de Proteção de Dados](#requisitos-de-proteção-de-dados)
5. [Requisitos de Privacidade](#requisitos-de-privacidade)
6. [Requisitos de Comunicação Segura](#requisitos-de-comunicação-segura)
7. [Requisitos de Logging e Auditoria](#requisitos-de-logging-e-auditoria)
8. [Requisitos de Compliance](#requisitos-de-compliance)
9. [Requisitos de Gestão de Vulnerabilidades](#requisitos-de-gestão-de-vulnerabilidades)
10. [Implementação por Camada](#implementação-por-camada)

---

## 🎯 Visão Geral

Este documento define os requisitos de segurança e privacidade para o sistema de patrimônio, incluindo o ecossistema de microsserviços e suas interações.

### Objetivos

- **Confidencialidade**: Garantir que dados sensíveis sejam acessados apenas por pessoas e sistemas autorizados
- **Integridade**: Assegurar que os dados não sejam alterados de forma não autorizada
- **Disponibilidade**: Manter o sistema acessível para usuários autorizados
- **Autenticidade**: Verificar a identidade de usuários e serviços
- **Não-repúdio**: Provar que ações foram realizadas (via auditoria)
- **Privacidade**: Proteger dados pessoais conforme LGPD

### Escopo

Este documento abrange:
- Comunicação entre serviços (service-to-service)
- Comunicação cliente-serviço
- Armazenamento de dados
- Processamento de dados pessoais
- Logging e auditoria
- Gestão de identidades

---

## 🛡️ Princípios de Segurança

### 1. Defense in Depth (Defesa em Profundidade)

**Princípio**: Múltiplas camadas de segurança para proteger o sistema.

**Implementação**:
- Autenticação e autorização em múltiplas camadas
- Validação de entrada em cada serviço
- Criptografia em trânsito e em repouso
- Firewall e network policies
- Monitoramento e detecção de ameaças

### 2. Least Privilege (Menor Privilégio)

**Princípio**: Usuários e serviços devem ter apenas os privilégios mínimos necessários.

**Implementação**:
- Roles e permissões granulares (RBAC)
- Service accounts com permissões específicas
- Segregação de dados por usuário/organização
- Isolamento de ambientes (dev, staging, prod)

### 3. Fail Secure (Falhar com Segurança)

**Princípio**: Em caso de falha, o sistema deve falhar de forma segura (negando acesso).

**Implementação**:
- Timeout padrão para negação de acesso
- Validação de certificados obrigatória
- Tokens expirados rejeitados automaticamente
- Circuit breakers que falham fechado (deny by default)

### 4. Separation of Concerns (Separação de Responsabilidades)

**Princípio**: Diferentes aspectos de segurança devem ser tratados separadamente.

**Implementação**:
- Serviço de autenticação separado (auth-service)
- Serviço de auditoria separado (audit-service)
- Dados sensíveis isolados
- Logs de segurança separados

### 5. Secure by Default (Seguro por Padrão)

**Princípio**: Configuração padrão deve ser a mais segura possível.

**Implementação**:
- HTTPS obrigatório em produção
- Autenticação obrigatória para todas as rotas (exceto públicas explícitas)
- Validação de entrada habilitada por padrão
- Headers de segurança configurados por padrão

---

## 🔑 Requisitos de Autenticação e Autorização

### Autenticação

#### REQ-AUTH-001: Autenticação Obrigatória
- **Descrição**: Todas as rotas, exceto as explicitamente marcadas como públicas, devem exigir autenticação.
- **Implementação**: `@UseGuards(JwtAuthGuard)` por padrão no AppModule
- **Validação**: Verificar que rotas sem `@Public()` retornam 401 quando não autenticadas

#### REQ-AUTH-002: Tokens JWT Válidos
- **Descrição**: Apenas tokens JWT válidos, não expirados e assinados corretamente devem ser aceitos.
- **Implementação**: 
  - Validação de assinatura via JwtStrategy
  - Verificação de expiração automática
  - Validação de issuer e audience (se configurados)
- **Tempo de vida**:
  - Access Token: 15 minutos (configurável)
  - Refresh Token: 7 dias (configurável)

#### REQ-AUTH-003: Revogação de Tokens
- **Descrição**: Tokens devem poder ser revogados (logout, comprometimento).
- **Implementação**: 
  - Refresh tokens armazenados no banco (auth-service)
  - Blacklist de tokens revogados (opcional, via Redis)
  - Endpoint `/auth/logout` para revogação

#### REQ-AUTH-004: Validação de Credenciais
- **Descrição**: Credenciais devem ser validadas com segurança (hash de senha, rate limiting).
- **Implementação**:
  - Senhas hasheadas com Argon2
  - Rate limiting no endpoint de login
  - Proteção contra brute force

#### REQ-AUTH-005: Multi-Factor Authentication (MFA) - Futuro
- **Descrição**: Suporte a autenticação de dois fatores para usuários administrativos.
- **Status**: Planejado para futura implementação

### Autorização

#### REQ-AUTHZ-001: Role-Based Access Control (RBAC)
- **Descrição**: Acesso baseado em roles do usuário.
- **Roles definidos**:
  - `OPERATOR`: Acesso básico de leitura/escrita
  - `MANAGER`: Acesso gerencial (aprovações, relatórios)
  - `ADMIN`: Acesso administrativo completo
- **Implementação**: `@Roles()` decorator + `RolesGuard`

#### REQ-AUTHZ-002: Ownership Verification
- **Descrição**: Usuários só podem acessar recursos que possuem (quando aplicável).
- **Implementação**: 
  - Verificação de `ownerId` em recursos
  - `@OwnerId()` decorator para extrair owner do token
  - Validação no service antes de operações

#### REQ-AUTHZ-003: Service-to-Service Authorization
- **Descrição**: Serviços devem validar autorização ao se comunicar.
- **Implementação**:
  - JWT Bearer tokens em requisições service-to-service
  - Service accounts com roles específicos
  - Validação de origem via certificados (mTLS)

#### REQ-AUTHZ-004: Permissões Granulares
- **Descrição**: Permissões específicas por recurso e ação.
- **Exemplo**: `patrimonio:read`, `patrimonio:write`, `patrimonio:delete`
- **Status**: Planejado para evolução futura

---

## 🔒 Requisitos de Proteção de Dados

### Criptografia em Trânsito

#### REQ-DATA-001: HTTPS Obrigatório
- **Descrição**: Todas as comunicações externas devem usar HTTPS.
- **Implementação**: TLS 1.2+ obrigatório em produção
- **Validação**: Verificar que HTTP não está acessível em produção

#### REQ-DATA-002: Criptografia Interna
- **Descrição**: Comunicação entre serviços deve ser criptografada.
- **Implementação**: mTLS para comunicação service-to-service
- **Alternativa**: HTTPS com certificados internos

#### REQ-DATA-003: Validação de Certificados
- **Descrição**: Certificados devem ser validados em todas as conexões.
- **Implementação**: `rejectUnauthorized: true` em produção
- **Exceção**: Apenas em desenvolvimento/staging para testes

### Criptografia em Repouso

#### REQ-DATA-004: Criptografia de Dados Sensíveis
- **Descrição**: Dados sensíveis no banco devem ser criptografados.
- **Dados sensíveis**:
  - Senhas de usuários (já implementado com Argon2)
  - Tokens de refresh (armazenados com hash)
  - Dados pessoais (se requerido por compliance)
- **Implementação**: 
  - Senhas: Hash irreversível (Argon2)
  - Outros dados: Criptografia AES-256 (se necessário)

#### REQ-DATA-005: Backup Seguro
- **Descrição**: Backups devem ser criptografados.
- **Implementação**: Backups com criptografia AES-256
- **Armazenamento**: Backups em locais seguros com acesso restrito

### Gestão de Secrets

#### REQ-DATA-006: Secrets Management
- **Descrição**: Secrets (chaves, senhas, tokens) não devem ser hardcoded.
- **Implementação**:
  - Variáveis de ambiente para configuração
  - Secrets manager (AWS Secrets Manager, HashiCorp Vault) em produção
  - Rotação regular de secrets

#### REQ-DATA-007: Não Expor Secrets em Logs
- **Descrição**: Secrets não devem aparecer em logs.
- **Implementação**:
  - Sanitização de logs (remover senhas, tokens)
  - Logging interceptor que filtra dados sensíveis
  - Não logar corpo de requisições com credenciais

---

## 🕵️ Requisitos de Privacidade

### LGPD (Lei Geral de Proteção de Dados)

#### REQ-PRIV-001: Consentimento
- **Descrição**: Coletar consentimento explícito para processamento de dados pessoais.
- **Implementação**:
  - Tela de consentimento para novos usuários
  - Armazenar consentimento com timestamp
  - Permitir revogação de consentimento

#### REQ-PRIV-002: Finalidade
- **Descrição**: Processar dados pessoais apenas para finalidade específica e informada.
- **Implementação**:
  - Documentar finalidade de cada coleta de dado
  - Não usar dados para finalidades não informadas
  - Validação antes de novos processamentos

#### REQ-PRIV-003: Minimização
- **Descrição**: Coletar apenas dados pessoais necessários para a finalidade.
- **Implementação**:
  - Revisar campos coletados periodicamente
  - Remover campos não utilizados
  - Não coletar dados desnecessários

#### REQ-PRIV-004: Direitos do Titular
- **Descrição**: Permitir que titulares exerçam seus direitos (acesso, retificação, exclusão, portabilidade).
- **Direitos LGPD**:
  - **Acesso**: Endpoint para consultar dados pessoais
  - **Retificação**: Permitir edição de dados pessoais
  - **Exclusão**: Endpoint para exclusão de dados (anonimização)
  - **Portabilidade**: Exportar dados em formato estruturado
  - **Revogação**: Permitir revogação de consentimento
- **Implementação**:
  - Endpoints específicos para cada direito
  - Processo documentado para atendimento
  - Prazo de atendimento: 15 dias

#### REQ-PRIV-005: Anonimização
- **Descrição**: Dados pessoais devem poder ser anonimizados (não excluídos completamente para auditoria).
- **Implementação**:
  - Soft delete com anonimização
  - Manter dados anonimizados para auditoria
  - Não permitir re-identificação

#### REQ-PRIV-006: Notificação de Incidentes
- **Descrição**: Notificar autoridade e titulares em caso de vazamento de dados.
- **Implementação**:
  - Monitoramento de incidentes de segurança
  - Processo de notificação documentado
  - Prazo: 72 horas após detecção

### Dados Pessoais no Sistema

#### Dados Coletados:
- **Usuários**: Nome, email, CPF (se aplicável), telefone, cargo
- **Patrimônio**: Responsável, localização
- **Logs**: IP, user-agent, ações realizadas

#### Tratamento:
- Armazenamento seguro (criptografado)
- Acesso restrito (autenticação e autorização)
- Retenção por prazo determinado
- Exclusão/anonymização quando não mais necessário

---

## 🌐 Requisitos de Comunicação Segura

### Service-to-Service

#### REQ-COMM-001: Autenticação Mútua
- **Descrição**: Serviços devem validar identidade uns dos outros.
- **Implementação**: mTLS ou JWT com validação de origem

#### REQ-COMM-002: Validação de Origem
- **Descrição**: Serviços devem validar que requisições vêm de serviços autorizados.
- **Implementação**:
  - Whitelist de IPs/hostnames
  - Certificados válidos
  - Service tokens

#### REQ-COMM-003: Rate Limiting
- **Descrição**: Limitar taxa de requisições entre serviços.
- **Implementação**: 
  - Rate limiting por serviço cliente
  - Circuit breakers
  - Retry com backoff

### Cliente-Serviço

#### REQ-COMM-004: HTTPS Obrigatório
- **Descrição**: Clientes devem se conectar via HTTPS.
- **Implementação**: Redirecionar HTTP para HTTPS

#### REQ-COMM-005: CORS Configurado
- **Descrição**: CORS deve permitir apenas origens autorizadas.
- **Implementação**:
  - Whitelist de origens
  - Não usar `*` em produção
  - Validar credentials

#### REQ-COMM-006: Headers de Segurança
- **Descrição**: Headers de segurança devem estar configurados.
- **Headers obrigatórios**:
  - `Strict-Transport-Security` (HSTS)
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Content-Security-Policy`
  - `X-XSS-Protection`

---

## 📝 Requisitos de Logging e Auditoria

### Logging

#### REQ-LOG-001: Logs Estruturados
- **Descrição**: Logs devem ser estruturados (JSON) para facilitar análise.
- **Formato**:
```json
{
  "timestamp": "2025-01-27T10:00:00Z",
  "level": "info",
  "service": "auth-service",
  "message": "User logged in",
  "userId": "uuid",
  "ip": "127.0.0.1",
  "userAgent": "Mozilla/5.0...",
  "correlationId": "uuid"
}
```

#### REQ-LOG-002: Níveis de Log
- **Descrição**: Usar níveis de log apropriados.
- **Níveis**: ERROR, WARN, INFO, DEBUG
- **Regra**: Não logar informações sensíveis em DEBUG

#### REQ-LOG-003: Logs de Segurança
- **Descrição**: Eventos de segurança devem ser logados.
- **Eventos**:
  - Tentativas de login (sucesso e falha)
  - Alterações de permissões
  - Acesso a dados sensíveis
  - Operações administrativas
  - Tentativas de acesso não autorizado

#### REQ-LOG-004: Sanitização de Logs
- **Descrição**: Logs não devem conter informações sensíveis.
- **O que não logar**:
  - Senhas (nem hasheadas)
  - Tokens JWT completos
  - Dados de cartão de crédito
  - CPF completo (apenas últimos 4 dígitos)

### Auditoria

#### REQ-AUDIT-001: Rastreabilidade
- **Descrição**: Todas as ações devem ser rastreáveis.
- **Implementação**: AuditLog entity em audit-service
- **Campos obrigatórios**:
  - Usuário (userId)
  - Ação (action)
  - Recurso (resource, resourceId)
  - Timestamp
  - IP de origem
  - Resultado (sucesso/falha)

#### REQ-AUDIT-002: Retenção de Logs
- **Descrição**: Logs de auditoria devem ser retidos por prazo determinado.
- **Prazo**: Mínimo de 1 ano (conforme LGPD)
- **Implementação**: Política de retenção configurável

#### REQ-AUDIT-003: Imutabilidade
- **Descrição**: Logs de auditoria não devem ser modificáveis.
- **Implementação**:
  - Tabela append-only
  - Permissões restritas (apenas escrita)
  - Backup regular

#### REQ-AUDIT-004: Integridade
- **Descrição**: Logs de auditoria devem ter integridade verificável.
- **Implementação**:
  - Hash de logs (opcional)
  - Assinatura digital (futuro)
  - Backup em local seguro

---

## 📋 Requisitos de Compliance

### LGPD (Lei Geral de Proteção de Dados)

#### REQ-COMP-001: Encarregado de Dados (DPO)
- **Descrição**: Designar encarregado de dados.
- **Responsabilidades**:
  - Receber pedidos de titulares
  - Coordenar ações de privacidade
  - Comunicar com autoridade

#### REQ-COMP-002: Registro de Processamento
- **Descrição**: Manter registro de atividades de processamento.
- **Conteúdo**:
  - Finalidade do processamento
  - Categorias de dados pessoais
  - Categorias de titulares
  - Prazo de retenção
  - Medidas de segurança

#### REQ-COMP-003: Avaliação de Impacto (EIA)
- **Descrição**: Realizar avaliação de impacto quando necessário.
- **Quando necessário**: Processamento de alto risco
- **Conteúdo**: Riscos e mitigações

### Outros Padrões

#### REQ-COMP-004: ISO 27001 (Futuro)
- **Descrição**: Alinhar com padrões de segurança da informação.
- **Status**: Planejado para evolução

#### REQ-COMP-005: PCI DSS (se aplicável)
- **Descrição**: Se houver processamento de pagamentos.
- **Status**: Não aplicável no momento

---

## 🔍 Requisitos de Gestão de Vulnerabilidades

### Detecção

#### REQ-VULN-001: Scanning de Vulnerabilidades
- **Descrição**: Realizar scans regulares de vulnerabilidades.
- **Ferramentas**:
  - npm audit (dependências Node.js)
  - OWASP ZAP (aplicação)
  - Snyk (dependências)
- **Frequência**: Semanal ou após atualizações

#### REQ-VULN-002: Monitoramento de CVE
- **Descrição**: Monitorar CVE (Common Vulnerabilities and Exposures).
- **Implementação**: Alertas automáticos de CVE
- **Ação**: Atualizar dependências vulneráveis

### Resposta

#### REQ-VULN-003: Processo de Correção
- **Descrição**: Processo documentado para correção de vulnerabilidades.
- **Etapas**:
  1. Identificação e classificação
  2. Análise de impacto
  3. Desenvolvimento de correção
  4. Testes
  5. Deploy
  6. Verificação

#### REQ-VULN-004: Classificação de Severidade
- **Descrição**: Classificar vulnerabilidades por severidade.
- **Classificação**:
  - **Crítica**: Correção imediata (< 24h)
  - **Alta**: Correção urgente (< 7 dias)
  - **Média**: Correção em sprint (< 30 dias)
  - **Baixa**: Correção em próximo release

#### REQ-VULN-005: Responsável Divulgador (Responsible Disclosure)
- **Descrição**: Processo para reportar vulnerabilidades.
- **Implementação**: 
  - Email para security@seudominio.com
  - Processo documentado
  - Acreditação de pesquisadores

---

## 🏗️ Implementação por Camada

### Camada de Aplicação

#### Validação de Entrada
- DTOs com class-validator
- Sanitização de dados
- Validação de tipos e formatos

#### Autorização
- Guards (JwtAuthGuard, RolesGuard)
- Decorators (@Roles(), @Public())
- Validação de ownership

### Camada de Comunicação

#### HTTPS/TLS
- Certificados válidos
- TLS 1.2+
- Headers de segurança

#### Rate Limiting
- Por IP
- Por usuário
- Por endpoint

### Camada de Dados

#### Criptografia
- Hash de senhas (Argon2)
- Criptografia de dados sensíveis (se necessário)

#### Acesso
- Connection strings seguras
- Credenciais via secrets manager
- Permissões de banco restritas

### Camada de Infraestrutura

#### Rede
- Firewall
- Network policies
- Isolamento de serviços

#### Monitoramento
- Logs de segurança
- Alertas de anomalias
- Detecção de intrusão

---

## ✅ Checklist de Implementação

### Autenticação e Autorização
- [x] JWT implementado
- [x] Refresh tokens
- [x] RBAC (Roles)
- [x] Guards configurados
- [ ] MFA (planejado)

### Proteção de Dados
- [x] Hash de senhas (Argon2)
- [x] HTTPS em produção (planejado)
- [ ] Criptografia em repouso (se necessário)
- [ ] Secrets management (planejado)

### Privacidade
- [ ] Consentimento
- [ ] Direitos do titular (endpoints)
- [ ] Anonimização
- [ ] Notificação de incidentes

### Logging e Auditoria
- [x] AuditLog entity
- [x] Logs estruturados
- [x] Logs de segurança
- [ ] Retenção configurada

### Compliance
- [ ] Registro de processamento
- [ ] EIA (se necessário)
- [ ] DPO designado

### Gestão de Vulnerabilidades
- [ ] Scanning automatizado
- [ ] Processo de correção
- [ ] Monitoramento de CVE

---

## 📚 Referências

- [LGPD - Lei Geral de Proteção de Dados](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [ISO/IEC 27001](https://www.iso.org/isoiec-27001-information-security.html)

---

## 🔄 Próximos Passos

1. ✅ Documentação criada
2. ⏳ Implementar endpoints de direitos LGPD
3. ⏳ Configurar secrets management
4. ⏳ Implementar scanning de vulnerabilidades
5. ⏳ Configurar retenção de logs
6. ⏳ Criar processo de responsible disclosure
7. ⏳ Realizar avaliação de impacto (EIA)

---

**Última Atualização**: 2025-01-27  
**Autor**: Sistema de Patrimônio - Equipe de Segurança

