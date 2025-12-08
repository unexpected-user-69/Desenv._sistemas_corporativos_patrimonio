# 🔒 Comunicação Segura: TLS/HTTPS entre Microsserviços

**Data de Criação**: 2025-01-27  
**Versão**: 1.0.0  
**Contexto**: Atividade 3 - Fase 3: Comunicação Segura entre Microsserviços

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura de Comunicação Segura](#arquitetura-de-comunicação-segura)
3. [Configuração TLS/HTTPS](#configuração-tlshttps)
4. [Implementação por Ambiente](#implementação-por-ambiente)
5. [Proteção de Tráfego Interno](#proteção-de-tráfego-interno)
6. [Proteção de Tráfego Externo](#proteção-de-tráfego-externo)
7. [Certificados e Gestão](#certificados-e-gestão)
8. [Configuração do NestJS](#configuração-do-nestjs)
9. [Boas Práticas](#boas-práticas)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

Este documento detalha a estratégia e implementação de comunicação segura usando TLS/HTTPS no ecossistema de microsserviços do sistema de patrimônio.

### Objetivos

- **Confidencialidade**: Garantir que dados transmitidos entre serviços sejam criptografados
- **Integridade**: Verificar que os dados não foram alterados durante a transmissão
- **Autenticação**: Validar a identidade dos serviços comunicantes
- **Não-repúdio**: Provar que uma comunicação ocorreu (via logs de auditoria)

### Contexto Atual

- **Ambiente de Desenvolvimento**: HTTP (sem TLS) - aceitável para desenvolvimento local
- **Ambiente de Produção**: HTTPS obrigatório - todas as comunicações devem ser criptografadas
- **Comunicação Interna**: TLS mútuo (mTLS) recomendado para comunicação service-to-service
- **Comunicação Externa**: HTTPS com certificados válidos (Let's Encrypt, certificados corporativos)

---

## 🏗️ Arquitetura de Comunicação Segura

### Arquitetura Proposta

```
┌─────────────────────────────────────────────────────────────┐
│                      Cliente/API Gateway                     │
│                         (HTTPS)                              │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS/TLS 1.3
                           │ Certificado válido
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway / Load Balancer             │
│  - Terminação TLS                                           │
│  - SSL Offloading (opcional)                                │
│  - Rate Limiting                                            │
│  - WAF (Web Application Firewall)                           │
└──────────────────────────┬──────────────────────────────────┘
                           │ mTLS (TLS mútuo)
                           │ Certificados mútuos
                           ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Auth        │  │ Users       │  │ Events      │  │ Audit       │
│ Service     │  │ Service     │  │ Service     │  │ Service     │
│             │  │             │  │             │  │             │
│ Port: 3001  │  │ Port: 3002  │  │ Port: 3003  │  │ Port: 3005  │
│ (HTTPS)     │  │ (HTTPS)     │  │ (HTTPS)     │  │ (HTTPS)     │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
```

### Camadas de Segurança

1. **Camada Externa (Cliente → Gateway)**
   - HTTPS padrão (TLS 1.2+)
   - Certificados assinados por CA confiável
   - HSTS (HTTP Strict Transport Security)

2. **Camada Interna (Gateway → Serviços)**
   - mTLS (Mutual TLS) recomendado
   - Certificados internos ou self-signed com PKI interna
   - Validação mútua de identidade

3. **Camada de Serviço (Service-to-Service)**
   - HTTP sobre TLS
   - JWT Bearer tokens para autorização
   - Validação de origem via certificados

---

## ⚙️ Configuração TLS/HTTPS

### 1. Certificados SSL/TLS

#### Opções de Certificados

**Desenvolvimento**:
- Self-signed certificates (gerados localmente)
- Certificados para `localhost` e `*.local`

**Produção**:
- **Let's Encrypt** (gratuito, automático) - recomendado para serviços públicos
- **Certificados corporativos** - para ambientes empresariais
- **Certificados de CA privada** - para comunicação interna

#### Geração de Certificados Self-Signed (Desenvolvimento)

```bash
# Criar diretório para certificados
mkdir -p certs

# Gerar certificado e chave privada
openssl req -x509 -newkey rsa:4096 -nodes \
  -keyout certs/server.key \
  -out certs/server.crt \
  -days 365 \
  -subj "/C=BR/ST=Estado/L=Cidade/O=Organizacao/CN=localhost"

# Gerar certificado para comunicação interna (mTLS)
openssl req -x509 -newkey rsa:4096 -nodes \
  -keyout certs/internal.key \
  -out certs/internal.crt \
  -days 365 \
  -subj "/C=BR/ST=Estado/L=Cidade/O=Organizacao/CN=*.internal"
```

#### Configuração no Docker Compose

```yaml
version: '3.8'
services:
  auth-service:
    build: ./packages/auth-service
    volumes:
      - ./certs:/app/certs:ro
    environment:
      - TLS_ENABLED=true
      - TLS_KEY_PATH=/app/certs/internal.key
      - TLS_CERT_PATH=/app/certs/internal.crt
      - TLS_CA_PATH=/app/certs/ca.crt
    ports:
      - "3001:3001"
```

### 2. Configuração HTTPS no NestJS

#### Modificar `main.ts` para Suportar HTTPS

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // Carregar certificados TLS
  const httpsOptions = process.env.TLS_ENABLED === 'true' ? {
    key: fs.readFileSync(
      process.env.TLS_KEY_PATH || path.join(__dirname, '../certs/server.key')
    ),
    cert: fs.readFileSync(
      process.env.TLS_CERT_PATH || path.join(__dirname, '../certs/server.crt')
    ),
    // Para mTLS, descomentar:
    // ca: fs.readFileSync(
    //   process.env.TLS_CA_PATH || path.join(__dirname, '../certs/ca.crt')
    // ),
    // requestCert: true,
    // rejectUnauthorized: true,
  } : undefined;

  // Criar aplicação NestJS com HTTPS se habilitado
  const app = await NestFactory.create(
    AppModule,
    httpsOptions ? { httpsOptions } : {}
  );

  // ... resto da configuração (CORS, Swagger, etc.)

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  const protocol = httpsOptions ? 'https' : 'http';
  console.log(`✅ Auth Service está rodando em: ${protocol}://localhost:${port}`);
}

bootstrap();
```

#### Variáveis de Ambiente

```env
# TLS/HTTPS Configuration
TLS_ENABLED=true
TLS_KEY_PATH=/app/certs/server.key
TLS_CERT_PATH=/app/certs/server.crt
TLS_CA_PATH=/app/certs/ca.crt

# Para comunicação interna com mTLS
MTLS_ENABLED=true
MTLS_KEY_PATH=/app/certs/internal.key
MTLS_CERT_PATH=/app/certs/internal.crt
```

### 3. Configuração de Clientes HTTP (Service-to-Service)

#### Configurar HTTP Client para Usar HTTPS

```typescript
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersHttpClient {
  private readonly httpService: HttpService;
  private readonly baseUrl: string;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
    this.baseUrl = process.env.USERS_SERVICE_URL || 'http://localhost:3002';

    // Configurar agente HTTPS para comunicação segura
    if (process.env.TLS_ENABLED === 'true') {
      const httpsAgent = new https.Agent({
        ca: fs.readFileSync(
          process.env.TLS_CA_PATH || path.join(__dirname, '../../../certs/ca.crt')
        ),
        cert: fs.readFileSync(
          process.env.MTLS_CERT_PATH || path.join(__dirname, '../../../certs/internal.crt')
        ),
        key: fs.readFileSync(
          process.env.MTLS_KEY_PATH || path.join(__dirname, '../../../certs/internal.key')
        ),
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      });

      this.httpService.axiosRef.defaults.httpsAgent = httpsAgent;
    }
  }

  async validateCredentials(email: string, password: string) {
    const url = `${this.baseUrl}/users/validate`;
    const response = await firstValueFrom(
      this.httpService.post(url, { email, password })
    );
    return response.data;
  }
}
```

---

## 🌍 Implementação por Ambiente

### Desenvolvimento Local

**Configuração**:
- HTTP simples (sem TLS) - aceitável para desenvolvimento
- Servidores rodam em `http://localhost:PORT`
- CORS configurado para aceitar requisições locais

**Quando usar HTTPS em desenvolvimento**:
- Testar comportamento de produção
- Validar certificados e configurações
- Testar mTLS

### Staging/QA

**Configuração**:
- HTTPS obrigatório
- Certificados self-signed ou de CA interna
- HSTS desabilitado (para facilitar testes)
- Validação de certificados relaxada

**Variáveis de ambiente**:
```env
NODE_ENV=staging
TLS_ENABLED=true
TLS_REJECT_UNAUTHORIZED=false  # Apenas em staging
```

### Produção

**Configuração**:
- HTTPS obrigatório e estritamente validado
- Certificados válidos de CA confiável
- HSTS habilitado
- TLS 1.2+ apenas
- mTLS para comunicação interna

**Variáveis de ambiente**:
```env
NODE_ENV=production
TLS_ENABLED=true
TLS_REJECT_UNAUTHORIZED=true
HSTS_ENABLED=true
TLS_MIN_VERSION=1.2
MTLS_ENABLED=true
```

---

## 🔐 Proteção de Tráfego Interno

### Mutual TLS (mTLS)

**O que é mTLS?**
- TLS onde ambos os lados (cliente e servidor) validam os certificados
- Garante que apenas serviços autorizados se comuniquem
- Previne ataques de "service impersonation"

**Quando usar mTLS**:
- Comunicação entre microsserviços
- Comunicação com bancos de dados
- Comunicação com serviços críticos

**Implementação**:

```typescript
// Servidor (ex: auth-service)
const httpsOptions = {
  key: fs.readFileSync('certs/server.key'),
  cert: fs.readFileSync('certs/server.crt'),
  ca: fs.readFileSync('certs/ca.crt'),  // Certificado da CA
  requestCert: true,                      // Solicitar certificado do cliente
  rejectUnauthorized: true,               // Rejeitar se não autorizado
};

// Cliente (ex: events-service chamando auth-service)
const httpsAgent = new https.Agent({
  ca: fs.readFileSync('certs/ca.crt'),
  cert: fs.readFileSync('certs/client.crt'),  // Certificado do cliente
  key: fs.readFileSync('certs/client.key'),   // Chave privada do cliente
  rejectUnauthorized: true,
});
```

### Segurança Adicional para Comunicação Interna

1. **Network Policies** (Kubernetes/Docker)
   - Restringir comunicação entre containers
   - Permitir apenas portas específicas

2. **Service Mesh** (Istio, Linkerd)
   - Gerenciamento automático de mTLS
   - Observabilidade e controle de tráfego

3. **Private Network**
   - Serviços em rede privada
   - Sem exposição pública

---

## 🌐 Proteção de Tráfego Externo

### API Gateway com Terminação TLS

**Responsabilidades do Gateway**:
- Terminação TLS (SSL Offloading)
- Roteamento seguro para serviços backend
- Rate limiting
- WAF (Web Application Firewall)

**Configuração de Gateway (Nginx exemplo)**:

```nginx
# Terminação TLS no Gateway
server {
    listen 443 ssl http2;
    server_name api.seudominio.com;

    # Certificados SSL
    ssl_certificate /etc/ssl/certs/server.crt;
    ssl_certificate_key /etc/ssl/private/server.key;
    ssl_trusted_certificate /etc/ssl/certs/ca.crt;

    # Configurações de segurança TLS
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Roteamento para serviços backend (HTTP interno)
    location /auth/ {
        proxy_pass http://auth-service:3001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /users/ {
        proxy_pass http://users-service:3002/;
        # ... headers
    }
}
```

### Headers de Segurança

**HSTS (HTTP Strict Transport Security)**:
```typescript
// No NestJS, configurar via Helmet
import helmet from 'helmet';

app.use(helmet({
  hsts: {
    maxAge: 31536000,  // 1 ano
    includeSubDomains: true,
    preload: true,
  },
}));
```

**Outros Headers Importantes**:
- `X-Forwarded-Proto`: Identifica o protocolo original (http/https)
- `X-Forwarded-For`: IP do cliente original
- `X-Real-IP`: IP real do cliente

---

## 📜 Certificados e Gestão

### Gestão de Certificados

#### Opção 1: Let's Encrypt (Automático)

**Vantagens**:
- Gratuito
- Renovação automática
- Certificados válidos para navegadores

**Ferramentas**:
- **Certbot**: Renovação automática
- **Traefik**: Gateway com renovação automática
- **Kubernetes Cert-Manager**: Gerenciamento em clusters

#### Opção 2: Certificados Corporativos

**Vantagens**:
- Controle total
- Certificados internos válidos
- Integração com PKI corporativa

**Gerenciamento**:
- PKI (Public Key Infrastructure) interna
- Autoridades certificadoras (CA) corporativas
- Gestão via ferramentas como Vault

#### Opção 3: Self-Signed (Apenas Desenvolvimento)

**Quando usar**:
- Desenvolvimento local
- Testes internos
- Staging isolado

**Limitações**:
- Navegadores mostrarão aviso
- Não confiável por padrão
- Precisa importar CA manualmente

### Renovação Automática

**Script de Renovação (Exemplo com Certbot)**:

```bash
#!/bin/bash
# renew-certs.sh

# Renovar certificados Let's Encrypt
certbot renew --quiet

# Recarregar serviços
docker-compose restart auth-service users-service events-service

# Ou no Kubernetes:
# kubectl rollout restart deployment auth-service
```

**Cron Job**:
```cron
# Renovar certificados diariamente
0 3 * * * /path/to/renew-certs.sh >> /var/log/cert-renewal.log 2>&1
```

---

## 🛠️ Configuração do NestJS

### Módulo de Configuração TLS

Criar um módulo reutilizável para configuração TLS:

```typescript
// src/common/config/tls.config.ts
import * as fs from 'fs';
import * as path from 'path';

export interface TlsOptions {
  enabled: boolean;
  keyPath?: string;
  certPath?: string;
  caPath?: string;
  rejectUnauthorized?: boolean;
}

export function getTlsOptions(): TlsOptions | undefined {
  const tlsEnabled = process.env.TLS_ENABLED === 'true';

  if (!tlsEnabled) {
    return undefined;
  }

  const keyPath = process.env.TLS_KEY_PATH || 
    path.join(process.cwd(), 'certs', 'server.key');
  const certPath = process.env.TLS_CERT_PATH || 
    path.join(process.cwd(), 'certs', 'server.crt');
  const caPath = process.env.TLS_CA_PATH || 
    path.join(process.cwd(), 'certs', 'ca.crt');

  // Verificar se os arquivos existem
  if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    throw new Error(
      `Certificados TLS não encontrados. Key: ${keyPath}, Cert: ${certPath}`
    );
  }

  return {
    enabled: true,
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
    ...(fs.existsSync(caPath) && { ca: fs.readFileSync(caPath) }),
    rejectUnauthorized: process.env.NODE_ENV === 'production',
  };
}
```

### Modificar `main.ts` para Usar Configuração TLS

```typescript
import { getTlsOptions } from './common/config/tls.config';

async function bootstrap() {
  const httpsOptions = getTlsOptions();

  const app = await NestFactory.create(
    AppModule,
    httpsOptions ? { httpsOptions } : {}
  );

  // ... resto da configuração
}
```

---

## ✅ Boas Práticas

### 1. Versões de TLS

- **Mínimo**: TLS 1.2
- **Recomendado**: TLS 1.3
- **Desabilitar**: TLS 1.0, TLS 1.1, SSL 3.0

### 2. Cipher Suites

- Usar apenas cipher suites fortes
- Preferir AEAD (Authenticated Encryption with Associated Data)
- Desabilitar ciphers fracos (RC4, MD5, SHA1)

### 3. Gestão de Chaves

- Nunca commitar chaves privadas no Git
- Usar secrets management (Vault, AWS Secrets Manager)
- Rotacionar chaves regularmente
- Usar diferentes chaves por ambiente

### 4. Validação de Certificados

- Sempre validar certificados em produção
- Verificar data de expiração
- Monitorar renovação automática

### 5. Logging e Auditoria

- Logar tentativas de conexão falhadas
- Monitorar certificados próximos à expiração
- Alertar sobre problemas de TLS

### 6. Performance

- Usar SSL session caching
- Considerar SSL offloading no gateway
- Monitorar overhead de TLS

---

## 🔧 Troubleshooting

### Problema: Certificado Inválido

**Sintomas**:
```
Error: self signed certificate
Error: unable to verify the first certificate
```

**Soluções**:
1. Verificar se o certificado está no caminho correto
2. Verificar permissões do arquivo
3. Em desenvolvimento, definir `TLS_REJECT_UNAUTHORIZED=false` temporariamente
4. Importar CA nos clientes

### Problema: Conexão Recusada

**Sintomas**:
```
Error: connect ECONNREFUSED
```

**Soluções**:
1. Verificar se o serviço está rodando
2. Verificar se a porta está correta
3. Verificar firewall/network policies
4. Verificar se HTTPS está habilitado no servidor mas cliente usa HTTP

### Problema: Handshake Failed (mTLS)

**Sintomas**:
```
Error: handshake failed
Error: certificate verify failed
```

**Soluções**:
1. Verificar se ambos os lados têm certificados válidos
2. Verificar se a CA está configurada corretamente
3. Verificar se `requestCert` está habilitado no servidor
4. Verificar se o cliente está enviando certificado

### Monitoramento

**Métricas importantes**:
- Taxa de falha de handshake TLS
- Tempo de handshake
- Certificados próximos à expiração
- Tentativas de conexão com certificados inválidos

---

## 📚 Referências

- [OWASP Transport Layer Protection Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html)
- [TLS 1.3 RFC 8446](https://tools.ietf.org/html/rfc8446)
- [NestJS HTTPS Documentation](https://docs.nestjs.com/techniques/security)
- [Node.js HTTPS Module](https://nodejs.org/api/https.html)

---

## 🔄 Próximos Passos

1. ✅ Documentação criada
2. ⏳ Implementar configuração TLS nos serviços
3. ⏳ Configurar certificados para desenvolvimento
4. ⏳ Configurar Let's Encrypt para produção
5. ⏳ Implementar mTLS para comunicação interna
6. ⏳ Configurar renovação automática de certificados
7. ⏳ Adicionar monitoramento de certificados

---

**Última Atualização**: 2025-01-27  
**Autor**: Sistema de Patrimônio - Equipe de Arquitetura

