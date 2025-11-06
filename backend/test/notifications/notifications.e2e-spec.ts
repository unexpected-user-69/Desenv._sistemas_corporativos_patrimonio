// Habilitar auto-auth para testes ANTES de importar módulos
process.env.DEV_AUTO_AUTH = 'true';
process.env.NODE_ENV = 'test';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as http from 'http';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { NotificationChannel } from '../../src/notifications/entities/notification-template.entity';

/**
 * Testes E2E para o módulo notifications
 * 
 * ⚠️ PRÉ-REQUISITOS:
 * - Banco de dados PostgreSQL deve estar rodando
 * - Migrações devem estar executadas (npm run migration:run)
 * 
 * Os testes validam:
 * - ✅ Cenários de sucesso (criação, atualização, listagem)
 * - ✅ Erros 404 (template/política/webhook não encontrado)
 * - ✅ Erros 400 (dados inválidos)
 * - ✅ Erros 409 (conflitos de key/version, URL duplicada)
 */
describe('Notifications (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let testTemplateId: string;
  let testPolicyId: string;
  let testWebhookId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
    dataSource = app.get(DataSource);

    // Criar tabelas se não existirem
    await setupDatabaseTables(dataSource);
  });

  afterAll(async () => {
    await cleanupTestData(dataSource);
    await app.close();
  });

  describe('POST /v1/notifications/templates', () => {
    it('deve criar um template com sucesso (201)', async () => {
      const uniqueKey = `patrimonio.status.changed.${Date.now()}`;
      const dto = {
        key: uniqueKey,
        version: 1,
        channel: NotificationChannel.EMAIL,
        subject: 'Status do patrimônio alterado',
        body: 'O patrimônio {{patrimonio.nome}} teve seu status alterado para {{novoStatus}}',
        locale: 'pt-BR',
      };

      const response = await request(httpServer)
        .post('/v1/notifications/templates')
        .send(dto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.key).toBe(dto.key);
      expect(response.body.version).toBe(dto.version);
      expect(response.body.channel).toBe(dto.channel);
      expect(response.body.subject).toBe(dto.subject);
      expect(response.body.body).toBe(dto.body);
      testTemplateId = response.body.id;
    });

    it('deve retornar 400 para dados faltando', async () => {
      const dto = {
        // key faltando
        channel: NotificationChannel.EMAIL,
        body: 'Template body',
      };

      await request(httpServer)
        .post('/v1/notifications/templates')
        .send(dto)
        .expect(400);
    });

    it('deve retornar 409 para template duplicado (mesma key e version)', async () => {
      const uniqueKey = `template.duplicado.${Date.now()}`;
      
      // Criar primeiro template
      await request(httpServer)
        .post('/v1/notifications/templates')
        .send({
          key: uniqueKey,
          version: 1,
          channel: NotificationChannel.EMAIL,
          body: 'Template original',
        })
        .expect(201);

      // Tentar criar duplicado
      const dto = {
        key: uniqueKey,
        version: 1,
        channel: NotificationChannel.EMAIL,
        body: 'Template duplicado',
      };

      await request(httpServer)
        .post('/v1/notifications/templates')
        .send(dto)
        .expect(409);
    });
  });

  describe('GET /v1/notifications/templates', () => {
    it('deve listar templates (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/notifications/templates')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /v1/notifications/templates/:id', () => {
    it('deve buscar template por ID (200)', async () => {
      // Criar template para buscar
      const createResponse = await request(httpServer)
        .post('/v1/notifications/templates')
        .send({
          key: `template.to.find.${Date.now()}`,
          channel: NotificationChannel.EMAIL,
          body: 'Template para buscar',
        })
        .expect(201);

      const templateId = createResponse.body.id;

      const response = await request(httpServer)
        .get(`/v1/notifications/templates/${templateId}`)
        .expect(200);

      expect(response.body.id).toBe(templateId);
      expect(response.body).toHaveProperty('key');
      expect(response.body).toHaveProperty('channel');
    });

    it('deve retornar 404 para template não encontrado', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000999';
      await request(httpServer)
        .get(`/v1/notifications/templates/${fakeId}`)
        .expect(404);
    });
  });

  describe('PUT /v1/notifications/templates/:id', () => {
    it('deve atualizar template com sucesso (200)', async () => {
      // Criar template para atualizar
      const createResponse = await request(httpServer)
        .post('/v1/notifications/templates')
        .send({
          key: `template.to.update.${Date.now()}`,
          channel: NotificationChannel.EMAIL,
          subject: 'Assunto original',
          body: 'Corpo original',
        })
        .expect(201);

      const templateId = createResponse.body.id;

      const dto = {
        subject: 'Novo assunto atualizado',
        body: 'Novo corpo do template',
      };

      const response = await request(httpServer)
        .put(`/v1/notifications/templates/${templateId}`)
        .send(dto)
        .expect(200);

      expect(response.body.subject).toBe(dto.subject);
      expect(response.body.body).toBe(dto.body);
    });

    it('deve retornar 404 para template não encontrado', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000999';
      const dto = {
        body: 'Novo corpo',
      };

      await request(httpServer)
        .put(`/v1/notifications/templates/${fakeId}`)
        .send(dto)
        .expect(404);
    });
  });

  describe('DELETE /v1/notifications/templates/:id', () => {
    it('deve remover template com sucesso (204)', async () => {
      // Criar um template para deletar
      const createResponse = await request(httpServer)
        .post('/v1/notifications/templates')
        .send({
          key: `template.to.delete.${Date.now()}`,
          channel: NotificationChannel.EMAIL,
          body: 'Template para deletar',
        })
        .expect(201);

      const templateId = createResponse.body.id;

      await request(httpServer)
        .delete(`/v1/notifications/templates/${templateId}`)
        .expect(204);

      // Verificar que foi removido
      await request(httpServer)
        .get(`/v1/notifications/templates/${templateId}`)
        .expect(404);
    });

    it('deve retornar 404 para template não encontrado', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000999';
      await request(httpServer)
        .delete(`/v1/notifications/templates/${fakeId}`)
        .expect(404);
    });
  });

  describe('POST /v1/notifications/policies', () => {
    it('deve criar uma política com sucesso (201)', async () => {
      const dto = {
        eventKey: 'events.patrimonio.status.changed',
        priority: 'medium',
        channels: ['email', 'webhook'],
        enabled: true,
      };

      const response = await request(httpServer)
        .post('/v1/notifications/policies')
        .send(dto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.eventKey).toBe(dto.eventKey);
      expect(response.body.priority).toBe(dto.priority);
      expect(response.body.channels).toEqual(dto.channels);
      expect(response.body.enabled).toBe(dto.enabled);
      testPolicyId = response.body.id;
    });

    it('deve retornar 400 para dados inválidos', async () => {
      const dto = {
        // eventKey faltando
        channels: ['email'],
      };

      await request(httpServer)
        .post('/v1/notifications/policies')
        .send(dto)
        .expect(400);
    });
  });

  describe('GET /v1/notifications/policies', () => {
    it('deve listar políticas ativas (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/notifications/policies')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      // Verificar que apenas políticas ativas são retornadas
      response.body.forEach((policy: any) => {
        expect(policy.enabled).toBe(true);
      });
    });
  });

  describe('POST /v1/notifications/webhooks', () => {
    it('deve criar um webhook com sucesso (201)', async () => {
      const dto = {
        name: 'Webhook de Teste',
        url: 'https://example.com/webhook',
        secret: 'my-secret-key-123',
        enabled: true,
      };

      const response = await request(httpServer)
        .post('/v1/notifications/webhooks')
        .send(dto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(dto.name);
      expect(response.body.url).toBe(dto.url);
      expect(response.body.enabled).toBe(dto.enabled);
      testWebhookId = response.body.id;
    });

    it('deve retornar 400 para URL inválida', async () => {
      const dto = {
        name: 'Webhook Inválido',
        url: 'url-invalida',
        secret: 'secret',
      };

      await request(httpServer)
        .post('/v1/notifications/webhooks')
        .send(dto)
        .expect(400);
    });

    it('deve retornar 409 para webhook com URL duplicada', async () => {
      const dto = {
        name: 'Webhook Duplicado',
        url: 'https://example.com/webhook',
        secret: 'another-secret',
      };

      await request(httpServer)
        .post('/v1/notifications/webhooks')
        .send(dto)
        .expect(409);
    });
  });

  describe('GET /v1/notifications/webhooks', () => {
    it('deve listar webhooks (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/notifications/webhooks')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('POST /v1/notifications/test', () => {
    it('deve enviar notificação de teste com sucesso (200)', async () => {
      // Criar template primeiro
      const templateResponse = await request(httpServer)
        .post('/v1/notifications/templates')
        .send({
          key: 'test.notification',
          channel: NotificationChannel.EMAIL,
          subject: 'Teste {{nome}}',
          body: 'Olá {{nome}}, esta é uma notificação de teste.',
        })
        .expect(201);

      const dto = {
        channel: NotificationChannel.EMAIL,
        templateKey: 'test.notification',
        data: {
          nome: 'João Silva',
        },
        recipient: 'test@example.com',
      };

      const response = await request(httpServer)
        .post('/v1/notifications/test')
        .send(dto)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
    });

    it('deve retornar 404 para template não encontrado', async () => {
      const dto = {
        channel: NotificationChannel.EMAIL,
        templateKey: 'template.que.nao.existe',
        recipient: 'test@example.com',
      };

      await request(httpServer)
        .post('/v1/notifications/test')
        .send(dto)
        .expect(404);
    });

    it('deve retornar 400 para dados inválidos', async () => {
      const dto = {
        // channel faltando
        templateKey: 'test.notification',
      };

      await request(httpServer)
        .post('/v1/notifications/test')
        .send(dto)
        .expect(400);
    });
  });
});

// Funções auxiliares
async function setupDatabaseTables(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    // Verificar e criar tabela notification_templates
    try {
      await queryRunner.query('SELECT 1 FROM notification_templates LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS notification_templates (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          key varchar(100) NOT NULL,
          version int NOT NULL DEFAULT 1,
          channel varchar(20) NOT NULL,
          subject varchar(200),
          body text NOT NULL,
          locale varchar(10) NOT NULL DEFAULT 'pt-BR',
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(key, version)
        );
        CREATE INDEX IF NOT EXISTS ix_notification_templates_channel ON notification_templates(channel);
      `);
    }

    // Verificar e criar tabela notification_policies
    try {
      await queryRunner.query('SELECT 1 FROM notification_policies LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS notification_policies (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          event_key varchar(100) NOT NULL,
          priority varchar(20) NOT NULL DEFAULT 'medium',
          channels varchar[] NOT NULL DEFAULT '{}',
          enabled boolean NOT NULL DEFAULT true,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS ix_notification_policies_event_key ON notification_policies(event_key);
        CREATE INDEX IF NOT EXISTS ix_notification_policies_enabled ON notification_policies(enabled);
      `);
    }

    // Verificar e criar tabela webhooks
    try {
      await queryRunner.query('SELECT 1 FROM webhooks LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS webhooks (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          name varchar(100) NOT NULL,
          url varchar(500) NOT NULL,
          secret varchar(255) NOT NULL,
          enabled boolean NOT NULL DEFAULT true,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS ix_webhooks_enabled ON webhooks(enabled);
      `);
    }

    // Verificar e criar tabela notification_logs
    try {
      await queryRunner.query('SELECT 1 FROM notification_logs LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS notification_logs (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          event_key varchar(100) NOT NULL,
          channel varchar(20) NOT NULL,
          status varchar(20) NOT NULL DEFAULT 'pending',
          attempts int NOT NULL DEFAULT 0,
          duration_ms int,
          error text,
          recipient varchar(500),
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS ix_notification_logs_event_key ON notification_logs(event_key);
        CREATE INDEX IF NOT EXISTS ix_notification_logs_channel_status_created_at ON notification_logs(channel, status, created_at);
      `);
    }
  } finally {
    await queryRunner.release();
  }
}

async function cleanupTestData(dataSource: DataSource): Promise<void> {
  try {
    // Limpar dados de teste (opcional, pode deixar para análise)
    // await dataSource.query(`DELETE FROM notification_logs WHERE event_key LIKE 'test.%'`);
    // await dataSource.query(`DELETE FROM notification_templates WHERE key LIKE 'test.%'`);
    // await dataSource.query(`DELETE FROM notification_policies WHERE event_key LIKE 'events.test.%'`);
    // await dataSource.query(`DELETE FROM webhooks WHERE name LIKE 'Webhook%'`);
  } catch (error) {
    // Ignorar erros de limpeza
  }
}

