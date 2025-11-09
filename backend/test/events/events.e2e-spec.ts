process.env.NODE_ENV = 'test';
// Desabilitar rate limiting para testes
process.env.THROTTLE_TTL = '1';
process.env.THROTTLE_LIMIT = '1000';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as http from 'http';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { HashService } from '../../src/common/services/hash.service';
import { UserRole } from '../../src/users/enums/user-role.enum';
import { EventType } from '../../src/events/enums/event-type.enum';
import { EventState } from '../../src/events/enums/event-state.enum';
import { EventVisibility } from '../../src/events/enums/event-visibility.enum';
import {
  setupTestUsers,
  authenticatedRequest,
  TestUserTokens,
} from '../helpers/auth-helper';

/**
 * Testes E2E para Events Controller
 * 
 * Cobre todos os 5 endpoints do Events Controller:
 * - GET /v1/events - Listar eventos com filtros e paginação
 * - POST /v1/events - Criar evento
 * - GET /v1/events/:idOrSlug - Buscar evento por ID ou slug
 * - PATCH /v1/events/:id - Atualizar evento
 * - POST /v1/events/:id/publish - Publicar evento
 */

describe('Events (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let hashService: HashService;
  let tokens: TestUserTokens;

  // Eventos de teste
  let eventId1: string;
  let eventId2: string;
  let eventSlug1: string;
  let eventSlug2: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('v1');
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
    dataSource = app.get(DataSource);
    hashService = app.get(HashService);

    // Criar tabelas se não existirem
    await setupDatabaseTables(dataSource);

    // Configurar usuários de teste e obter tokens
    tokens = await setupTestUsers(httpServer, dataSource, hashService, 'events-test');
  });

  afterAll(async () => {
    // Limpeza de dados de teste (opcional)
    try {
      await dataSource.query(
        `DELETE FROM event_patrimonios 
         WHERE event_id IN (
           SELECT id FROM events 
           WHERE created_by IN (
             SELECT id FROM users 
             WHERE email LIKE '%events-test%@example.com'
           )
         )`,
      );
      await dataSource.query(
        `DELETE FROM events 
         WHERE created_by IN (
           SELECT id FROM users 
           WHERE email LIKE '%events-test%@example.com'
         )`,
      );
    } catch (error) {
      // Ignorar erros de limpeza
    }
    await app.close();
  });

  describe('POST /v1/events', () => {
    it('deve criar evento com sucesso (201) - ADMIN', async () => {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() + 1);
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 8);

      const createEventDto = {
        title: 'Evento de Teste E2E',
        description: 'Descrição do evento de teste',
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        eventType: EventType.MANUTENCAO,
        visibility: EventVisibility.PUBLIC,
        state: EventState.DRAFT,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/events',
        tokens,
        UserRole.ADMIN, // POST /events requer ADMIN ou MANAGER
      )
        .send(createEventDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title', createEventDto.title);
      expect(response.body).toHaveProperty('description', createEventDto.description);
      expect(response.body).toHaveProperty('slug');
      expect(response.body).toHaveProperty('eventType', EventType.MANUTENCAO);
      expect(response.body).toHaveProperty('visibility', EventVisibility.PUBLIC);
      expect(response.body).toHaveProperty('state', EventState.DRAFT);
      expect(response.body).toHaveProperty('createdBy');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');

      eventId1 = response.body.id;
      eventSlug1 = response.body.slug;
    });

    it('deve criar evento com sucesso (201) - MANAGER', async () => {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() + 2);
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 4);

      const createEventDto = {
        title: 'Evento Criado por MANAGER',
        description: 'Descrição do evento criado por MANAGER',
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        eventType: EventType.AUDITORIA,
        visibility: EventVisibility.PUBLIC,
        state: EventState.DRAFT,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/events',
        tokens,
        UserRole.MANAGER, // POST /events requer ADMIN ou MANAGER
      )
        .send(createEventDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title', createEventDto.title);
      expect(response.body).toHaveProperty('createdBy'); // Verificar apenas que createdBy existe
      eventId2 = response.body.id;
      eventSlug2 = response.body.slug;
    });
  });

  describe('GET /v1/events', () => {
    it('deve listar eventos com paginação (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/events',
        tokens,
        UserRole.ADMIN, // GET /events requer autenticação
      )
        .query({ page: 1, limit: 20 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('page', 1);
      expect(response.body).toHaveProperty('limit', 20);
      expect(response.body).toHaveProperty('totalPages');
      expect(response.body).toHaveProperty('hasNextPage');
      expect(response.body).toHaveProperty('hasPreviousPage');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('deve filtrar eventos por eventType (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/events',
        tokens,
        UserRole.ADMIN,
      )
        .query({ eventType: EventType.MANUTENCAO, page: 1, limit: 20 })
        .expect(200);

      expect(response.body.data).toBeDefined();
      if (response.body.data.length > 0) {
        response.body.data.forEach((event: any) => {
          expect(event.eventType).toBe(EventType.MANUTENCAO);
        });
      }
    });

    it('deve filtrar eventos por state (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/events',
        tokens,
        UserRole.ADMIN,
      )
        .query({ state: EventState.DRAFT, page: 1, limit: 20 })
        .expect(200);

      expect(response.body.data).toBeDefined();
    });

    it('deve filtrar eventos por visibility (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/events',
        tokens,
        UserRole.ADMIN,
      )
        .query({ visibility: EventVisibility.PUBLIC, page: 1, limit: 20 })
        .expect(200);

      expect(response.body.data).toBeDefined();
    });

    it('deve buscar eventos por texto (q) (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/events',
        tokens,
        UserRole.ADMIN,
      )
        .query({ q: 'Teste', page: 1, limit: 20 })
        .expect(200);

      expect(response.body.data).toBeDefined();
    });

    it('deve filtrar eventos por intervalo de datas (200)', async () => {
      const from = new Date();
      from.setMonth(from.getMonth() - 1);
      const to = new Date();
      to.setMonth(to.getMonth() + 3);

      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/events',
        tokens,
        UserRole.ADMIN,
      )
        .query({ from: from.toISOString(), to: to.toISOString(), page: 1, limit: 20 })
        .expect(200);

      expect(response.body.data).toBeDefined();
    });
  });

  describe('GET /v1/events/:idOrSlug', () => {
    it('deve buscar evento por ID (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/events/${eventId1}`,
        tokens,
        UserRole.ADMIN, // GET /events/:idOrSlug requer autenticação
      ).expect(200);

      expect(response.body).toHaveProperty('id', eventId1);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('slug');
    });

    it('deve buscar evento por slug (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/events/${eventSlug1}`,
        tokens,
        UserRole.ADMIN,
      ).expect(200);

      expect(response.body).toHaveProperty('id', eventId1);
      expect(response.body).toHaveProperty('slug', eventSlug1);
    });
  });

  describe('PATCH /v1/events/:id', () => {
    it('deve atualizar evento com sucesso (200) - ADMIN (proprietário)', async () => {
      const updateDto = {
        title: 'Evento Atualizado',
        description: 'Descrição atualizada',
      };

      const response = await authenticatedRequest(
        httpServer,
        'patch',
        `/v1/events/${eventId1}`,
        tokens,
        UserRole.ADMIN, // PATCH /events/:id requer autenticação e ser proprietário
      )
        .send(updateDto)
        .expect(200);

      expect(response.body).toHaveProperty('id', eventId1);
      expect(response.body).toHaveProperty('title', updateDto.title);
      expect(response.body).toHaveProperty('description', updateDto.description);
    });

    it('deve atualizar evento com sucesso (200) - MANAGER (proprietário)', async () => {
      const updateDto = {
        title: 'Evento Atualizado por MANAGER',
      };

      const response = await authenticatedRequest(
        httpServer,
        'patch',
        `/v1/events/${eventId2}`,
        tokens,
        UserRole.MANAGER, // PATCH /events/:id requer autenticação e ser proprietário
      )
        .send(updateDto)
        .expect(200);

      expect(response.body).toHaveProperty('id', eventId2);
      expect(response.body).toHaveProperty('title', updateDto.title);
    });
  });

  describe('POST /v1/events/:id/publish', () => {
    it('deve publicar evento com sucesso (200) - ADMIN (proprietário)', async () => {
      // Criar um novo evento em DRAFT para publicar
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() + 3);
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 6);

      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/events',
        tokens,
        UserRole.ADMIN,
      )
        .send({
          title: 'Evento para Publicar',
          description: 'Este evento será publicado',
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          eventType: EventType.INVENTARIO,
          visibility: EventVisibility.PUBLIC,
          state: EventState.DRAFT,
        })
        .expect(201);

      const eventToPublishId = createResponse.body.id;

      // Publicar o evento
      const response = await authenticatedRequest(
        httpServer,
        'post',
        `/v1/events/${eventToPublishId}/publish`,
        tokens,
        UserRole.ADMIN, // POST /events/:id/publish requer autenticação e ser proprietário
      ).expect((res) => {
        // POST pode retornar 200 ou 201
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`Expected 200 or 201, got ${res.status}`);
        }
      });

      expect(response.body).toHaveProperty('id', eventToPublishId);
      expect(response.body).toHaveProperty('state', EventState.PUBLISHED);
    });

    it('deve publicar evento com sucesso (200) - MANAGER (proprietário)', async () => {
      // Criar um novo evento em DRAFT para publicar
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() + 4);
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 5);

      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/events',
        tokens,
        UserRole.MANAGER,
      )
        .send({
          title: 'Evento para Publicar por MANAGER',
          description: 'Este evento será publicado por MANAGER',
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          eventType: EventType.TRANSFERENCIA,
          visibility: EventVisibility.PUBLIC,
          state: EventState.DRAFT,
        })
        .expect(201);

      const eventToPublishId = createResponse.body.id;

      // Publicar o evento
      const response = await authenticatedRequest(
        httpServer,
        'post',
        `/v1/events/${eventToPublishId}/publish`,
        tokens,
        UserRole.MANAGER,
      ).expect((res) => {
        // POST pode retornar 200 ou 201
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`Expected 200 or 201, got ${res.status}`);
        }
      });

      expect(response.body).toHaveProperty('id', eventToPublishId);
      expect(response.body).toHaveProperty('state', EventState.PUBLISHED);
    });
  });
});

// ==================== FUNÇÕES AUXILIARES ====================

async function setupDatabaseTables(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    // Verificar e criar tabela events
    try {
      await queryRunner.query('SELECT 1 FROM events LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TABLE IF NOT EXISTS events (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          title varchar(255) NOT NULL,
          description text,
          slug varchar(255) UNIQUE NOT NULL,
          start_date timestamptz NOT NULL,
          end_date timestamptz,
          event_type varchar(50) NOT NULL DEFAULT 'OUTROS',
          visibility varchar(50) NOT NULL DEFAULT 'PUBLIC',
          state varchar(50) NOT NULL DEFAULT 'DRAFT',
          created_by uuid NOT NULL,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          deleted_at timestamptz,
          version int NOT NULL DEFAULT 1
        );
        CREATE UNIQUE INDEX IF NOT EXISTS uq_events_slug ON events(slug);
        CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
        CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
        CREATE INDEX IF NOT EXISTS idx_events_event_type ON events(event_type);
        CREATE INDEX IF NOT EXISTS idx_events_state ON events(state);
      `);
    }

    // Verificar e criar tabela event_patrimonios (relacionamento muitos para muitos)
    try {
      await queryRunner.query('SELECT 1 FROM event_patrimonios LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS event_patrimonios (
          event_id uuid NOT NULL,
          patrimonio_id uuid NOT NULL,
          PRIMARY KEY (event_id, patrimonio_id)
        );
        CREATE INDEX IF NOT EXISTS idx_event_patrimonios_event ON event_patrimonios(event_id);
        CREATE INDEX IF NOT EXISTS idx_event_patrimonios_patrimonio ON event_patrimonios(patrimonio_id);
      `);
    }
  } finally {
    await queryRunner.release();
  }
}

