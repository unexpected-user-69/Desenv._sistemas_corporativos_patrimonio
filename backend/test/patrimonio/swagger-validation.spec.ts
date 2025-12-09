import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Aumentar timeout global para este arquivo - testes de Swagger precisam inicializar a aplicação completa
jest.setTimeout(60000);

describe('Swagger Documentation Validation', () => {

  let app: INestApplication;
  let swaggerDocument: any;

  beforeAll(async () => {
    process.env.DEV_AUTO_AUTH = 'true';
    process.env.NODE_ENV = 'test';

    try {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      // Configurar o prefixo global como no main.ts
      app.setGlobalPrefix('v1');
      await app.init();

      // Obter documento Swagger - usar a mesma configuração do main.ts
    const config = new DocumentBuilder()
      .setTitle('Patrimonio & Inventario API')
      .setDescription(
        'API RESTful completa para gestão de patrimônio e inventário. ' +
        'Inclui autenticação JWT, autorização baseada em roles, CRUD completo de usuários e patrimônio, ' +
        'sistema de auditoria e validação de dados.',
      )
      .setVersion('1.0.0')
      .setContact('Equipe de Desenvolvimento', '', 'dev@example.com')
      .addTag('root', 'Endpoints raiz da API')
      .addTag('auth', 'Autenticação e autorização')
      .addTag('users', 'Gerenciamento de usuários')
      .addTag('patrimonio', 'Gestão de patrimônio')
      .addTag('categorias', 'Categorias de patrimônio')
      .addTag('events', 'Eventos relacionados a patrimônio')
      .addTag('audit', 'Sistema de auditoria')
      .addTag('maintenance', 'Gestão de manutenção e ordens de serviço')
      .addTag('reports', 'Geração e gerenciamento de relatórios')
      .addTag('reports-metrics', 'Métricas e estatísticas de relatórios')
      .addTag('reports-catalog', 'Catálogo de relatórios e permissões')
      .addTag('notifications', 'Sistema de notificações e templates')
      .addTag('integrations-erp', 'Integrações com sistemas ERP')
      .addTag('inventory-mobile', 'Inventário móvel e campanhas')
      .addTag('cache', 'Gerenciamento de cache')
      .addTag('metrics', 'Métricas e monitoramento do sistema')
      .addTag('enums', 'Enumeradores e constantes do sistema')
      .addTag('common', 'Utilitários compartilhados')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Digite o token JWT obtido no endpoint /auth/login',
        },
        'bearer',
      )
      .build();
      swaggerDocument = SwaggerModule.createDocument(app, config);
    } catch (error) {
      console.error('Erro ao inicializar aplicação no teste:', error);
      throw error;
    }
  }, 60000); // Aumentar timeout para 60 segundos

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    delete process.env.DEV_AUTO_AUTH;
  });

  describe('FASE 1: Endpoints de Alta Prioridade', () => {
    const endpointsFase1 = [
      {
        method: 'patch',
        path: '/v1/patrimonio/{id}/status',
        summary: 'Alterar status de um patrimônio',
      },
      {
        method: 'post',
        path: '/v1/patrimonio/{id}/transferir-responsavel',
        summary: 'Transferir patrimônio para outro responsável',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/dashboard',
        summary: 'Obter todas as métricas principais para dashboard',
      },
    ];

    endpointsFase1.forEach((endpoint) => {
      it(`deve ter documentação para ${endpoint.method.toUpperCase()} ${endpoint.path}`, () => {
        const paths = swaggerDocument.paths || {};
        // O Swagger gera paths COM o prefixo /v1 quando createDocument é chamado após setGlobalPrefix
        const pathKey = endpoint.path;
        const pathDoc = paths[pathKey];

        expect(pathDoc).toBeDefined();
        expect(pathDoc[endpoint.method]).toBeDefined();
        expect(pathDoc[endpoint.method].summary || pathDoc[endpoint.method].description).toContain(
          endpoint.summary.split(' ')[0],
        );
      });
    });
  });

  describe('FASE 2: Gestão de Status', () => {
    const endpointsFase2Status = [
      {
        method: 'patch',
        path: '/v1/patrimonio/{id}/ativar',
        summary: 'Ativar patrimônio',
      },
      {
        method: 'patch',
        path: '/v1/patrimonio/{id}/desativar',
        summary: 'Desativar patrimônio',
      },
      {
        method: 'post',
        path: '/v1/patrimonio/{id}/descarte',
        summary: 'Marcar patrimônio para descarte',
      },
    ];

    endpointsFase2Status.forEach((endpoint) => {
      it(`deve ter documentação para ${endpoint.method.toUpperCase()} ${endpoint.path}`, () => {
        const paths = swaggerDocument.paths || {};
        // O Swagger gera paths COM o prefixo /v1
        const pathKey = endpoint.path;
        const pathDoc = paths[pathKey];

        expect(pathDoc).toBeDefined();
        expect(pathDoc[endpoint.method]).toBeDefined();
      });
    });
  });

  describe('FASE 2: Gestão de Localização', () => {
    const endpointsFase2Localizacao = [
      {
        method: 'patch',
        path: '/v1/patrimonio/{id}/localizacao',
        summary: 'Atualizar localização do patrimônio',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/localizacao/{localizacao}',
        summary: 'Listar patrimônios por localização',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/stats/localizacoes',
        summary: 'Obter estatísticas por localização',
      },
    ];

    endpointsFase2Localizacao.forEach((endpoint) => {
      it(`deve ter documentação para ${endpoint.method.toUpperCase()} ${endpoint.path}`, () => {
        const paths = swaggerDocument.paths || {};
        // O Swagger gera paths COM o prefixo /v1
        const pathKey = endpoint.path;
        const pathDoc = paths[pathKey];

        expect(pathDoc).toBeDefined();
        expect(pathDoc[endpoint.method]).toBeDefined();
      });
    });
  });

  describe('FASE 2: Estatísticas Avançadas', () => {
    const endpointsFase2Stats = [
      {
        method: 'get',
        path: '/v1/patrimonio/stats/faixa-valor',
        summary: 'Obter estatísticas por faixa de valor',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/stats/aquisicao',
        summary: 'Obter estatísticas por período de aquisição',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/stats/evolucao',
        summary: 'Obter gráfico de evolução temporal',
      },
    ];

    endpointsFase2Stats.forEach((endpoint) => {
      it(`deve ter documentação para ${endpoint.method.toUpperCase()} ${endpoint.path}`, () => {
        const paths = swaggerDocument.paths || {};
        // O Swagger gera paths COM o prefixo /v1
        const pathKey = endpoint.path;
        const pathDoc = paths[pathKey];

        expect(pathDoc).toBeDefined();
        expect(pathDoc[endpoint.method]).toBeDefined();
      });
    });
  });

  describe('FASE 3: Buscas Avançadas', () => {
    const endpointsFase3Buscas = [
      {
        method: 'get',
        path: '/v1/patrimonio/numero-serie/{numeroSerie}',
        summary: 'Buscar patrimônio por número de série',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/aquisicao-periodo',
        summary: 'Buscar patrimônios por intervalo de data de aquisição',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/valor-range',
        summary: 'Buscar patrimônios por intervalo de valor',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/status-multiplos',
        summary: 'Buscar patrimônios por múltiplos status',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/categorias-multiplas',
        summary: 'Buscar patrimônios por múltiplas categorias',
      },
    ];

    endpointsFase3Buscas.forEach((endpoint) => {
      it(`deve ter documentação para ${endpoint.method.toUpperCase()} ${endpoint.path}`, () => {
        const paths = swaggerDocument.paths || {};
        // O Swagger gera paths COM o prefixo /v1
        const pathKey = endpoint.path;
        const pathDoc = paths[pathKey];

        expect(pathDoc).toBeDefined();
        expect(pathDoc[endpoint.method]).toBeDefined();
      });
    });
  });

  describe('FASE 3: Operações em Lote', () => {
    const endpointsFase3Bulk = [
      {
        method: 'post',
        path: '/v1/patrimonio/bulk',
        summary: 'Criar múltiplos patrimônios em lote',
      },
      {
        method: 'patch',
        path: '/v1/patrimonio/bulk',
        summary: 'Atualizar múltiplos patrimônios em lote',
      },
      {
        method: 'post',
        path: '/v1/patrimonio/bulk/transferir-responsavel',
        summary: 'Transferir múltiplos patrimônios para o mesmo responsável',
      },
    ];

    endpointsFase3Bulk.forEach((endpoint) => {
      it(`deve ter documentação para ${endpoint.method.toUpperCase()} ${endpoint.path}`, () => {
        const paths = swaggerDocument.paths || {};
        // O Swagger gera paths COM o prefixo /v1
        const pathKey = endpoint.path;
        const pathDoc = paths[pathKey];

        expect(pathDoc).toBeDefined();
        expect(pathDoc[endpoint.method]).toBeDefined();
      });
    });
  });

  describe('FASE 3: Validações', () => {
    const endpointsFase3Validacoes = [
      {
        method: 'get',
        path: '/v1/patrimonio/validar-codigo/{codigo}',
        summary: 'Validar se um código está disponível',
      },
      {
        method: 'post',
        path: '/v1/patrimonio/verificar-duplicidade',
        summary: 'Verificar duplicidade de patrimônios',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/{id}/disponibilidade',
        summary: 'Verificar disponibilidade de um patrimônio',
      },
    ];

    endpointsFase3Validacoes.forEach((endpoint) => {
      it(`deve ter documentação para ${endpoint.method.toUpperCase()} ${endpoint.path}`, () => {
        const paths = swaggerDocument.paths || {};
        // O Swagger gera paths COM o prefixo /v1
        const pathKey = endpoint.path;
        const pathDoc = paths[pathKey];

        expect(pathDoc).toBeDefined();
        expect(pathDoc[endpoint.method]).toBeDefined();
      });
    });
  });

  describe('FASE 3: Alertas', () => {
    const endpointsFase3Alertas = [
      {
        method: 'get',
        path: '/v1/patrimonio/garantia-expirada',
        summary: 'Buscar patrimônios com garantia expirada',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/alertas/garantia',
        summary: 'Buscar patrimônios com garantia vencendo em breve',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/manutencao-prolongada',
        summary: 'Buscar patrimônios em manutenção prolongada',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/sem-responsavel',
        summary: 'Buscar patrimônios sem responsável',
      },
    ];

    endpointsFase3Alertas.forEach((endpoint) => {
      it(`deve ter documentação para ${endpoint.method.toUpperCase()} ${endpoint.path}`, () => {
        const paths = swaggerDocument.paths || {};
        // O Swagger gera paths COM o prefixo /v1
        const pathKey = endpoint.path;
        const pathDoc = paths[pathKey];

        expect(pathDoc).toBeDefined();
        expect(pathDoc[endpoint.method]).toBeDefined();
      });
    });
  });

  describe('FASE 3: Histórico', () => {
    const endpointsFase3Historico = [
      {
        method: 'get',
        path: '/v1/patrimonio/{id}/historico',
        summary: 'Obter histórico de alterações de um patrimônio',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/{id}/historico/responsaveis',
        summary: 'Obter histórico de responsáveis de um patrimônio',
      },
      {
        method: 'get',
        path: '/v1/patrimonio/responsavel/{id}/historico',
        summary: 'Obter histórico de patrimônios por responsável',
      },
    ];

    endpointsFase3Historico.forEach((endpoint) => {
      it(`deve ter documentação para ${endpoint.method.toUpperCase()} ${endpoint.path}`, () => {
        const paths = swaggerDocument.paths || {};
        // O Swagger gera paths COM o prefixo /v1
        const pathKey = endpoint.path;
        const pathDoc = paths[pathKey];

        expect(pathDoc).toBeDefined();
        expect(pathDoc[endpoint.method]).toBeDefined();
      });
    });
  });

  describe('Validação Geral do Swagger', () => {
    it('deve ter tag "patrimonio" definida', () => {
      const tags = swaggerDocument.tags || [];
      const patrimonioTag = tags.find((tag: any) => tag.name === 'patrimonio');
      expect(patrimonioTag).toBeDefined();
    });

    it('deve ter Bearer Auth configurado', () => {
      const securitySchemes = swaggerDocument.components?.securitySchemes || {};
      expect(securitySchemes.bearer).toBeDefined();
      expect(securitySchemes.bearer.type).toBe('http');
      expect(securitySchemes.bearer.scheme).toBe('bearer');
    });

    it('deve ter informações da API', () => {
      expect(swaggerDocument.info).toBeDefined();
      expect(swaggerDocument.info.title).toBeDefined();
      expect(swaggerDocument.info.version).toBeDefined();
    });

    it('deve ter pelo menos 32 endpoints de patrimônio documentados', () => {
      const paths = swaggerDocument.paths || {};
      // Os paths no Swagger incluem o prefixo /v1
      const patrimonioPaths = Object.keys(paths).filter((path) =>
        path.includes('/patrimonio'),
      );
      
      expect(patrimonioPaths.length).toBeGreaterThanOrEqual(32);
    });
  });
});
