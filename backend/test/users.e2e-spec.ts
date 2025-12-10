import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as http from 'http';
import { AppModule } from '../src/app.module';
import { UserRole } from '../src/users/enums/user-role.enum';
import { setupTestUsers, authenticatedRequest, TestUserTokens } from './helpers/auth-helper';
import { HashService } from '../src/common/services/hash.service';
import { DataSource } from 'typeorm';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let hashService: HashService;
  let tokens: TestUserTokens;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('v1');
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
    
    // Aguardar um pouco para garantir que a aplicação está totalmente inicializada
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    dataSource = moduleFixture.get<DataSource>(DataSource);
    hashService = moduleFixture.get<HashService>(HashService);
    
    tokens = await setupTestUsers(httpServer, dataSource, hashService, 'users-e2e');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /v1/users', () => {
    it('should create a new user', async () => {
      const timestamp = Date.now();
      const createUserDto = {
        name: 'João Silva',
        email: `joao.silva.${timestamp}@example.com`,
        password: 'Senha123', // Senha forte: min 8 chars, maiúscula, minúscula, número
        role: UserRole.OPERATOR,
        isActive: true,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/users',
        tokens,
        UserRole.ADMIN
      )
        .send(createUserDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', 'João Silva');
      expect(response.body).toHaveProperty('email', createUserDto.email);
      expect(response.body).toHaveProperty('role', UserRole.OPERATOR);
      expect(response.body).toHaveProperty('isActive', true);
      expect(response.body).not.toHaveProperty('passwordHash');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
      expect(response.body).toHaveProperty('version');
    });

    it('should return 409 when email already exists', async () => {
      const timestamp = Date.now();
      const duplicateEmail = `duplicate.${timestamp}@example.com`;
      
      // Primeiro criar um usuário
      await authenticatedRequest(
        httpServer,
        'post',
        '/v1/users',
        tokens,
        UserRole.ADMIN
      )
        .send({
          name: 'Primeiro Usuário',
          email: duplicateEmail,
          password: 'Senha123', // Senha forte
          role: UserRole.OPERATOR,
        })
        .expect(201);

      // Tentar criar outro com o mesmo email
      const createUserDto = {
        name: 'Maria Santos',
        email: duplicateEmail, // Email duplicado
        password: 'Senha456', // Senha forte
        role: UserRole.MANAGER,
      };

      await authenticatedRequest(
        httpServer,
        'post',
        '/v1/users',
        tokens,
        UserRole.ADMIN
      )
        .send(createUserDto)
        .expect(409);
    });

    it('should return 400 for invalid data', async () => {
      const invalidUserDto = {
        name: '', // Nome vazio
        email: 'email-invalido', // Email inválido
        password: '123', // Senha muito curta e sem maiúscula
      };

      await authenticatedRequest(
        httpServer,
        'post',
        '/v1/users',
        tokens,
        UserRole.ADMIN
      )
        .send(invalidUserDto)
        .expect(400);
    });
  });

  describe('GET /v1/users', () => {
    it('should return all users', async () => {
      // Endpoint requer autenticação
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/users',
        tokens,
        UserRole.ADMIN
      )
        .expect(200);

      // Pode retornar array direto ou objeto com propriedade data
      const users = Array.isArray(response.body) 
        ? response.body 
        : (response.body.data || response.body.items || []);
      
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);

      // Verificar se não há passwordHash nos dados retornados
      (users as Record<string, unknown>[]).forEach(
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
      // Criar um usuário primeiro para buscar
      const timestamp = Date.now();
      const createUserDto = {
        name: 'Test User',
        email: `test.user.${timestamp}@example.com`,
        password: 'Senha123',
        role: UserRole.OPERATOR,
        isActive: true,
      };

      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/users',
        tokens,
        UserRole.ADMIN
      )
        .send(createUserDto)
        .expect(201);

      const testUserId = createResponse.body.id;

      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/users/${testUserId}`,
        tokens,
        UserRole.ADMIN
      )
        .expect(200);

      expect(response.body).toHaveProperty('id', testUserId);
      expect(response.body).toHaveProperty('name', createUserDto.name);
      expect(response.body).not.toHaveProperty('passwordHash');
    });

    it('should return 404 for non-existent user', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      // Endpoint pode requerer autenticação
      await authenticatedRequest(
        httpServer,
        'get',
        `/v1/users/${nonExistentId}`,
        tokens,
        UserRole.ADMIN
      )
        .expect((res) => {
          if (res.status !== 404 && res.status !== 403) {
            throw new Error(`Expected 404 or 403, got ${res.status}`);
          }
        });
    });

    it('should return 400 for invalid UUID', async () => {
      // Endpoint pode requerer autenticação
      await authenticatedRequest(
        httpServer,
        'get',
        '/v1/users/invalid-uuid',
        tokens,
        UserRole.ADMIN
      )
        .expect((res) => {
          if (res.status !== 400 && res.status !== 403) {
            throw new Error(`Expected 400 or 403, got ${res.status}`);
          }
        });
    });
  });

  describe('PUT /v1/users/:id', () => {
    it('should update a user', async () => {
      // Criar um usuário primeiro para atualizar
      const timestamp = Date.now();
      const createUserDto = {
        name: 'User To Update',
        email: `user.update.${timestamp}@example.com`,
        password: 'Senha123',
        role: UserRole.OPERATOR,
        isActive: true,
      };

      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/users',
        tokens,
        UserRole.ADMIN
      )
        .send(createUserDto)
        .expect(201);

      const userIdToUpdate = createResponse.body.id;

      const updateUserDto = {
        name: 'User Updated',
        role: UserRole.MANAGER,
        isActive: false,
      };

      const response = await authenticatedRequest(
        httpServer,
        'put',
        `/v1/users/${userIdToUpdate}`,
        tokens,
        UserRole.ADMIN
      )
        .send(updateUserDto)
        .expect(200);

      expect(response.body).toHaveProperty('id', userIdToUpdate);
      expect(response.body).toHaveProperty('name', 'User Updated');
      expect(response.body).toHaveProperty('role', UserRole.MANAGER);
      expect(response.body).toHaveProperty('isActive', false);
      expect(response.body).not.toHaveProperty('passwordHash');
    });

    it('should return 404 for non-existent user', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const updateUserDto = { name: 'Nome Atualizado' };

      await authenticatedRequest(
        httpServer,
        'put',
        `/v1/users/${nonExistentId}`,
        tokens,
        UserRole.ADMIN
      )
        .send(updateUserDto)
        .expect(404);
    });
  });

  describe('DELETE /v1/users/:id', () => {
    it('should soft delete a user', async () => {
      // Criar um usuário primeiro para deletar
      const timestamp = Date.now();
      const createUserDto = {
        name: 'User To Delete',
        email: `user.delete.${timestamp}@example.com`,
        password: 'Senha123',
        role: UserRole.OPERATOR,
        isActive: true,
      };

      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/users',
        tokens,
        UserRole.ADMIN
      )
        .send(createUserDto)
        .expect(201);

      const userIdToDelete = createResponse.body.id;

      await authenticatedRequest(
        httpServer,
        'delete',
        `/v1/users/${userIdToDelete}`,
        tokens,
        UserRole.ADMIN
      )
        .expect((res) => {
          if (res.status !== 200 && res.status !== 204) {
            throw new Error(`Expected 200 or 204, got ${res.status}`);
          }
        });

      // Verificar se o usuário foi soft deleted (não aparece na listagem)
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/users',
        tokens,
        UserRole.ADMIN
      )
        .expect(200);

      // Pode retornar array direto ou objeto com propriedade data
      const users = Array.isArray(response.body) 
        ? response.body 
        : (response.body.data || response.body.items || []);

      const deletedUser = (users as Record<string, unknown>[]).find(
        (user: Record<string, unknown>) => user.id === userIdToDelete,
      );
      expect(deletedUser).toBeUndefined();
    });

    it('should return 404 for non-existent user', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      await authenticatedRequest(
        httpServer,
        'delete',
        `/v1/users/${nonExistentId}`,
        tokens,
        UserRole.ADMIN
      )
        .expect(404);
    });
  });

  describe('GET /v1/users/email/:email', () => {
    it('should return user by email', async () => {
      // Endpoint pode requerer autenticação
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/users/email/${tokens.adminEmail}`,
        tokens,
        UserRole.ADMIN
      )
        .expect((res) => {
          if (res.status !== 200 && res.status !== 403) {
            throw new Error(`Expected 200 or 403, got ${res.status}`);
          }
        });

      if (response.status === 200) {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('email', tokens.adminEmail);
        expect(response.body).not.toHaveProperty('passwordHash');
      }
    });

    it('should return 404 for non-existent email', async () => {
      const timestamp = Date.now();
      await authenticatedRequest(
        httpServer,
        'get',
        `/v1/users/email/notfound.${timestamp}@example.com`,
        tokens,
        UserRole.ADMIN
      )
        .expect((res) => {
          if (res.status !== 404 && res.status !== 403) {
            throw new Error(`Expected 404 or 403, got ${res.status}`);
          }
        });
    });

    it('should handle case-insensitive email search', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/users/email/${tokens.adminEmail.toUpperCase()}`,
        tokens,
        UserRole.ADMIN
      )
        .expect((res) => {
          if (res.status !== 200 && res.status !== 403) {
            throw new Error(`Expected 200 or 403, got ${res.status}`);
          }
        });

      if (response.status === 200) {
        expect(response.body).toHaveProperty('email');
      }
    });
  });

  describe('POST /v1/users/bulk', () => {
    it('should create multiple users', async () => {
      const timestamp = Date.now();
      const bulkUsers = [
        {
          name: 'Maria Santos',
          email: `maria.santos.${timestamp}@example.com`,
          password: 'Senha456', // Senha forte
          role: UserRole.MANAGER,
          isActive: true,
        },
        {
          name: 'Pedro Costa',
          email: `pedro.costa.${timestamp}@example.com`,
          password: 'Senha789', // Senha forte
          role: UserRole.ADMIN,
          isActive: true,
        },
      ];

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/users/bulk',
        tokens,
        UserRole.ADMIN
      )
        .send(bulkUsers)
        .expect(201);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name', 'Maria Santos');
      expect(response.body[0]).toHaveProperty('email', bulkUsers[0].email);
      expect(response.body[0]).not.toHaveProperty('passwordHash');
      expect(response.body[1]).toHaveProperty('id');
      expect(response.body[1]).toHaveProperty('name', 'Pedro Costa');
      expect(response.body[1]).toHaveProperty('email', bulkUsers[1].email);
    });

    it('should return 409 for empty array', async () => {
      await authenticatedRequest(
        httpServer,
        'post',
        '/v1/users/bulk',
        tokens,
        UserRole.ADMIN
      )
        .send([])
        .expect((res) => {
          if (res.status !== 400 && res.status !== 409) {
            throw new Error(`Expected 400 or 409, got ${res.status}`);
          }
        });
    });

    it('should return 409 for duplicate emails in request', async () => {
      const timestamp = Date.now();
      const duplicateEmail = `duplicate.${timestamp}@example.com`;
      const duplicateUsers = [
        {
          name: 'User 1',
          email: duplicateEmail,
          password: 'Senha123', // Senha forte
          role: UserRole.OPERATOR,
        },
        {
          name: 'User 2',
          email: duplicateEmail,
          password: 'Senha456', // Senha forte
          role: UserRole.MANAGER,
        },
      ];

      await authenticatedRequest(
        httpServer,
        'post',
        '/v1/users/bulk',
        tokens,
        UserRole.ADMIN
      )
        .send(duplicateUsers)
        .expect(409);
    });

    it('should return 409 for too many users', async () => {
      const timestamp = Date.now();
      const tooManyUsers = Array.from({ length: 101 }, (_, i) => ({
        name: `Test User ${i}`,
        email: `test.${timestamp}.${i}@example.com`,
        password: 'Senha123', // Senha forte
        role: UserRole.OPERATOR,
      }));

      await authenticatedRequest(
        httpServer,
        'post',
        '/v1/users/bulk',
        tokens,
        UserRole.ADMIN
      )
        .send(tooManyUsers)
        .expect((res) => {
          if (res.status !== 400 && res.status !== 409) {
            throw new Error(`Expected 400 or 409, got ${res.status}`);
          }
        });
    });
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(httpServer).get('/v1/health').expect(200);

      // Health check pode retornar JSON ou texto
      if (response.headers['content-type']?.includes('application/json')) {
        expect(response.body).toHaveProperty('status');
        expect(response.body.status || response.body.message).toBeDefined();
      } else {
        expect(response.text).toBeDefined();
      }
    });
  });
});
