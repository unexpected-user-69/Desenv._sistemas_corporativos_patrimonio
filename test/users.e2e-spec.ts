import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as http from 'http';
import { AppModule } from '../src/app.module';
import { UserRole } from '../src/users/entities/user.entity';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let createdUserId: string;

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

  describe('POST /v1/users', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        name: 'João Silva',
        email: 'joao.silva@example.com',
        password: 'senha123',
        role: UserRole.STUDENT,
        isActive: true,
      };

      const response = await request(httpServer)
        .post('/v1/users')
        .send(createUserDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', 'João Silva');
      expect(response.body).toHaveProperty('email', 'joao.silva@example.com');
      expect(response.body).toHaveProperty('role', UserRole.STUDENT);
      expect(response.body).toHaveProperty('isActive', true);
      expect(response.body).not.toHaveProperty('passwordHash');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
      expect(response.body).toHaveProperty('version');

      createdUserId = (response.body as Record<string, unknown>).id as string;
    });

    it('should return 409 when email already exists', async () => {
      const createUserDto = {
        name: 'Maria Santos',
        email: 'joao.silva@example.com', // Email duplicado
        password: 'senha456',
        role: UserRole.TEACHER,
      };

      await request(httpServer)
        .post('/v1/users')
        .send(createUserDto)
        .expect(409);
    });

    it('should return 400 for invalid data', async () => {
      const invalidUserDto = {
        name: '', // Nome vazio
        email: 'email-invalido', // Email inválido
        password: '123', // Senha muito curta
      };

      await request(httpServer)
        .post('/v1/users')
        .send(invalidUserDto)
        .expect(400);
    });
  });

  describe('GET /v1/users', () => {
    it('should return all users', async () => {
      const response = await request(httpServer).get('/v1/users').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect((response.body as unknown[]).length).toBeGreaterThan(0);

      // Verificar se não há passwordHash nos dados retornados
      (response.body as Record<string, unknown>[]).forEach(
        (user: Record<string, unknown>) => {
          expect(user).not.toHaveProperty('passwordHash');
          expect(user).toHaveProperty('id');
          expect(user).toHaveProperty('name');
          expect(user).toHaveProperty('email');
          expect(user).toHaveProperty('role');
          expect(user).toHaveProperty('isActive');
        },
      );
    });
  });

  describe('GET /v1/users/:id', () => {
    it('should return a specific user', async () => {
      const response = await request(httpServer)
        .get(`/v1/users/${createdUserId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdUserId);
      expect(response.body).toHaveProperty('name', 'João Silva');
      expect(response.body).toHaveProperty('email', 'joao.silva@example.com');
      expect(response.body).not.toHaveProperty('passwordHash');
    });

    it('should return 404 for non-existent user', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      await request(httpServer).get(`/v1/users/${nonExistentId}`).expect(404);
    });

    it('should return 400 for invalid UUID', async () => {
      await request(httpServer).get('/v1/users/invalid-uuid').expect(400);
    });
  });

  describe('PUT /v1/users/:id', () => {
    it('should update a user', async () => {
      const updateUserDto = {
        name: 'João Silva Atualizado',
        role: UserRole.TEACHER,
        isActive: false,
      };

      const response = await request(httpServer)
        .put(`/v1/users/${createdUserId}`)
        .send(updateUserDto)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdUserId);
      expect(response.body).toHaveProperty('name', 'João Silva Atualizado');
      expect(response.body).toHaveProperty('role', UserRole.TEACHER);
      expect(response.body).toHaveProperty('isActive', false);
      expect(response.body).not.toHaveProperty('passwordHash');
    });

    it('should return 404 for non-existent user', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const updateUserDto = { name: 'Nome Atualizado' };

      await request(httpServer)
        .put(`/v1/users/${nonExistentId}`)
        .send(updateUserDto)
        .expect(404);
    });
  });

  describe('DELETE /v1/users/:id', () => {
    it('should soft delete a user', async () => {
      await request(httpServer)
        .delete(`/v1/users/${createdUserId}`)
        .expect(200);

      // Verificar se o usuário foi soft deleted (não aparece na listagem)
      const response = await request(httpServer).get('/v1/users').expect(200);

      const deletedUser = (response.body as Record<string, unknown>[]).find(
        (user: Record<string, unknown>) => user.id === createdUserId,
      );
      expect(deletedUser).toBeUndefined();
    });

    it('should return 404 for non-existent user', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      await request(httpServer)
        .delete(`/v1/users/${nonExistentId}`)
        .expect(404);
    });
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(httpServer).get('/v1/health').expect(200);

      expect(response.text).toBe('OK');
    });
  });
});
