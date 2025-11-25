process.env.NODE_ENV = 'test';
// Desabilitar rate limiting para testes
process.env.THROTTLE_TTL = '1';
process.env.THROTTLE_LIMIT = '1000';
// Configurar JWT secret para testes
process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev_access_secret';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as http from 'http';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
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
 * - GET /events - Listar eventos com filtros e paginação
 * - POST /events - Criar evento
 * - GET /events/:idOrSlug - Buscar evento por ID ou slug
 * - PATCH /events/:id - Atualizar evento
 * - POST /events/:id/publish - Publicar evento
 */

describe('Events (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
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
    // Events service não usa prefixo /v1
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
    dataSource = app.get(DataSource);

    // Criar tabelas se não existirem
    await setupDatabaseTables(dataSource);

    // Configurar usuários de teste e obter tokens
    tokens = await setupTestUsers(dataSource, 'events-test');
  });

  afterAll(async () => {
    // Limpeza de dados de teste
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

  describe('POST /events', () => {
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
        '/events',
        tokens,
        UserRole.ADMIN,
      )
        .send(createEventDto)
        .expect(201);

      const event = response.body.data || response.body;
      expect(event).toHaveProperty('id');
      expect(event).toHaveProperty('title', createEventDto.title);
      expect(event).toHaveProperty('description', createEventDto.description);
      expect(event).toHaveProperty('slug');
      expect(event).toHaveProperty('eventType', EventType.MANUTENCAO);
      expect(event).toHaveProperty('visibility', EventVisibility.PUBLIC);
      expect(event).toHaveProperty('state', EventState.DRAFT);
      expect(event).toHaveProperty('createdBy');
      expect(event).toHaveProperty('createdAt');
      expect(event).toHaveProperty('updatedAt');

      const event1 = response.body.data || response.body;
      eventId1 = event1.id;
      eventSlug1 = event1.slug;
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
        '/events',
        tokens,
        UserRole.MANAGER,
      )
        .send(createEventDto)
        .expect(201);

      const event2 = response.body.data || response.body;
      expect(event2).toHaveProperty('id');
      expect(event2).toHaveProperty('title', createEventDto.title);
      expect(event2).toHaveProperty('createdBy');
      eventId2 = event2.id;
      eventSlug2 = event2.slug;
    });
  });

  describe('GET /events', () => {
    it('deve listar eventos com paginação (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/events',
        tokens,
        UserRole.ADMIN,
      )
        .query({ page: 1, limit: 20 })
        .expect(200);

      // TransformResponseInterceptor envolve a resposta em { data: ... }
      expect(response.body).toHaveProperty('data');
      const responseData = response.body.data;
      expect(responseData).toHaveProperty('data');
      expect(Array.isArray(responseData.data)).toBe(true);
      expect(responseData).toHaveProperty('total');
      expect(responseData).toHaveProperty('page', 1);
      expect(responseData).toHaveProperty('limit', 20);
      expect(responseData).toHaveProperty('totalPages');
      expect(responseData).toHaveProperty('hasNextPage');
      expect(responseData).toHaveProperty('hasPreviousPage');
    });

    it('deve filtrar eventos por eventType (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/events',
        tokens,
        UserRole.ADMIN,
      )
        .query({ eventType: EventType.MANUTENCAO, page: 1, limit: 20 })
        .expect(200);

      const responseData = response.body.data?.data || response.body.data;
      expect(responseData).toBeDefined();
      if (Array.isArray(responseData) && responseData.length > 0) {
        responseData.forEach((event: any) => {
          expect(event.eventType).toBe(EventType.MANUTENCAO);
        });
      }
    });

    it('deve filtrar eventos por state (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/events',
        tokens,
        UserRole.ADMIN,
      )
        .query({ state: EventState.DRAFT, page: 1, limit: 20 })
        .expect(200);

      const responseData = response.body.data?.data || response.body.data;
      expect(responseData).toBeDefined();
    });

    it('deve filtrar eventos por visibility (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/events',
        tokens,
        UserRole.ADMIN,
      )
        .query({ visibility: EventVisibility.PUBLIC, page: 1, limit: 20 })
        .expect(200);

      const responseData = response.body.data?.data || response.body.data;
      expect(responseData).toBeDefined();
    });

    it('deve buscar eventos por texto (q) (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/events',
        tokens,
        UserRole.ADMIN,
      )
        .query({ q: 'Teste', page: 1, limit: 20 })
        .expect(200);

      const responseData = response.body.data?.data || response.body.data;
      expect(responseData).toBeDefined();
    });

    it('deve filtrar eventos por intervalo de datas (200)', async () => {
      const from = new Date();
      from.setMonth(from.getMonth() - 1);
      const to = new Date();
      to.setMonth(to.getMonth() + 3);

      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/events',
        tokens,
        UserRole.ADMIN,
      )
        .query({ from: from.toISOString(), to: to.toISOString(), page: 1, limit: 20 })
        .expect(200);

      const responseData = response.body.data?.data || response.body.data;
      expect(responseData).toBeDefined();
    });
  });

  describe('GET /events/:idOrSlug', () => {
    it('deve buscar evento por ID (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/events/${eventId1}`,
        tokens,
        UserRole.ADMIN,
      ).expect(200);

      // TransformResponseInterceptor envolve a resposta
      const event = response.body.data || response.body;
      expect(event).toHaveProperty('id', eventId1);
      expect(event).toHaveProperty('title');
      expect(event).toHaveProperty('slug');
    });

    it('deve buscar evento por slug (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/events/${eventSlug1}`,
        tokens,
        UserRole.ADMIN,
      ).expect(200);

      const event = response.body.data || response.body;
      expect(event).toHaveProperty('id', eventId1);
      expect(event).toHaveProperty('slug', eventSlug1);
    });
  });

  describe('PATCH /events/:id', () => {
    it('deve atualizar evento com sucesso (200) - ADMIN (proprietário)', async () => {
      const updateDto = {
        title: 'Evento Atualizado',
        description: 'Descrição atualizada',
      };

      const response = await authenticatedRequest(
        httpServer,
        'patch',
        `/events/${eventId1}`,
        tokens,
        UserRole.ADMIN,
      )
        .send(updateDto)
        .expect(200);

      const event = response.body.data || response.body;
      expect(event).toHaveProperty('id', eventId1);
      expect(event).toHaveProperty('title', updateDto.title);
      expect(event).toHaveProperty('description', updateDto.description);
    });

    it('deve atualizar evento com sucesso (200) - MANAGER (proprietário)', async () => {
      const updateDto = {
        title: 'Evento Atualizado por MANAGER',
      };

      const response = await authenticatedRequest(
        httpServer,
        'patch',
        `/events/${eventId2}`,
        tokens,
        UserRole.MANAGER,
      )
        .send(updateDto)
        .expect(200);

      const event = response.body.data || response.body;
      expect(event).toHaveProperty('id', eventId2);
      expect(event).toHaveProperty('title', updateDto.title);
    });
  });

  describe('POST /events/:id/publish', () => {
    it('deve publicar evento com sucesso (200) - ADMIN (proprietário)', async () => {
      // Criar um novo evento em DRAFT para publicar
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() + 3);
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 6);

      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/events',
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

      const createEvent = createResponse.body.data || createResponse.body;
      const eventToPublishId = createEvent.id;

      // Publicar o evento
      const response = await authenticatedRequest(
        httpServer,
        'post',
        `/events/${eventToPublishId}/publish`,
        tokens,
        UserRole.ADMIN,
      ).expect((res: any) => {
        // POST pode retornar 200 ou 201
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`Expected 200 or 201, got ${res.status}`);
        }
      });

      const event = response.body.data || response.body;
      expect(event).toHaveProperty('id', eventToPublishId);
      expect(event).toHaveProperty('state', EventState.PUBLISHED);
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
        '/events',
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

      const createEvent = createResponse.body.data || createResponse.body;
      const eventToPublishId = createEvent.id;

      // Publicar o evento
      const response = await authenticatedRequest(
        httpServer,
        'post',
        `/events/${eventToPublishId}/publish`,
        tokens,
        UserRole.MANAGER,
      ).expect((res: any) => {
        // POST pode retornar 200 ou 201
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`Expected 200 or 201, got ${res.status}`);
        }
      });

      const event = response.body.data || response.body;
      expect(event).toHaveProperty('id', eventToPublishId);
      expect(event).toHaveProperty('state', EventState.PUBLISHED);
    });
  });
});

// ==================== FUNÇÕES AUXILIARES ====================

async function setupDatabaseTables(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    // Verificar e criar tabela users (necessária para created_by)
    try {
      await queryRunner.query('SELECT 1 FROM users LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TABLE IF NOT EXISTS users (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          email varchar(255) UNIQUE NOT NULL,
          password_hash varchar(255) NOT NULL,
          name varchar(255) NOT NULL,
          role varchar(50) NOT NULL DEFAULT 'OPERATOR',
          is_active boolean NOT NULL DEFAULT true,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          deleted_at timestamptz
        );
        CREATE UNIQUE INDEX IF NOT EXISTS uq_users_email ON users(email);
      `);
    }

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
          version int NOT NULL DEFAULT 1,
          CONSTRAINT fk_events_created_by FOREIGN KEY (created_by) REFERENCES users(id)
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
          PRIMARY KEY (event_id, patrimonio_id),
          CONSTRAINT fk_event_patrimonios_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_event_patrimonios_event ON event_patrimonios(event_id);
        CREATE INDEX IF NOT EXISTS idx_event_patrimonios_patrimonio ON event_patrimonios(patrimonio_id);
      `);
    }
  } finally {
    await queryRunner.release();
  }
}

