import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as http from 'http';
import { AppModule } from '../src/app.module';
import { EventType } from '../src/events/enums/event-type.enum';
import { EventState } from '../src/events/enums/event-state.enum';
import { EventVisibility } from '../src/events/enums/event-visibility.enum';

describe('Events (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let createdEventId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /v1/events', () => {
    it('should create a new event', async () => {
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

      const response = await request(httpServer)
        .post('/v1/events')
        .send(createEventDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title', 'Evento de Teste E2E');
      expect(response.body).toHaveProperty('description', 'Descrição do evento de teste');
      expect(response.body).toHaveProperty('slug');
      expect(response.body).toHaveProperty('eventType', EventType.MANUTENCAO);
      expect(response.body).toHaveProperty('visibility', EventVisibility.PUBLIC);
      expect(response.body).toHaveProperty('state', EventState.DRAFT);
      expect(response.body).toHaveProperty('createdBy');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
      expect(response.body).toHaveProperty('version');

      createdEventId = (response.body as Record<string, unknown>).id as string;
    });

    it('should return 400 for invalid data', async () => {
      const invalidEventDto = {
        title: '', // Título vazio
        startDate: 'invalid-date', // Data inválida
      };

      await request(httpServer)
        .post('/v1/events')
        .send(invalidEventDto)
        .expect(400);
    });
  });

  describe('GET /v1/events', () => {
    it('should return paginated events', async () => {
      const response = await request(httpServer)
        .get('/v1/events')
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

    it('should filter events by eventType', async () => {
      const response = await request(httpServer)
        .get('/v1/events')
        .query({ eventType: EventType.MANUTENCAO, page: 1, limit: 20 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /v1/events/:idOrSlug', () => {
    it('should return event by id', async () => {
      if (!createdEventId) {
        return; // Skip se não criou evento anteriormente
      }

      const response = await request(httpServer)
        .get(`/v1/events/${createdEventId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdEventId);
      expect(response.body).toHaveProperty('title');
    });

    it('should return 404 when event not found', async () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174000';

      await request(httpServer)
        .get(`/v1/events/${fakeId}`)
        .expect(404);
    });
  });

  describe('PATCH /v1/events/:id', () => {
    it('should update event', async () => {
      if (!createdEventId) {
        return; // Skip se não criou evento anteriormente
      }

      const updateEventDto = {
        title: 'Evento Atualizado',
        description: 'Nova descrição',
      };

      const response = await request(httpServer)
        .patch(`/v1/events/${createdEventId}`)
        .send(updateEventDto)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdEventId);
      expect(response.body).toHaveProperty('title', 'Evento Atualizado');
      expect(response.body).toHaveProperty('description', 'Nova descrição');
    });
  });

  describe('POST /v1/events/:id/publish', () => {
    it('should publish event', async () => {
      if (!createdEventId) {
        return; // Skip se não criou evento anteriormente
      }

      const response = await request(httpServer)
        .post(`/v1/events/${createdEventId}/publish`)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdEventId);
      expect(response.body).toHaveProperty('state', EventState.PUBLISHED);
    });

    it('should return 400 when event is not DRAFT', async () => {
      if (!createdEventId) {
        return; // Skip se não criou evento anteriormente
      }

      // Tentar publicar novamente (já publicado)
      await request(httpServer)
        .post(`/v1/events/${createdEventId}/publish`)
        .expect(400);
    });
  });
});
