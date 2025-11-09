import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserRole } from './enums/user-role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import * as bcrypt from 'bcryptjs';
import {
  createMockUserRepository,
  createMockUser,
  createMockCreateUserDto,
  setupFakeTimers,
  restoreRealTimers,
  resetAllMocks,
} from '../../test/utils/test-doubles';
import { HashService } from '../common/services/hash.service';
import { NormalizationService } from '../common/services/normalization.service';
import { CacheService } from '../common/services/cache.service';
import { createCacheServiceMock } from '../../test/mocks/cache.service.mock';
import { FilterService } from '../common/services/filter.service';

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('UsersService - Advanced Unit Tests (PDF 086)', () => {
  let service: UsersService;
  let userRepository: any;
  let bcryptService: any;

  beforeEach(async () => {
    // Arrange - Setup do módulo de teste
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockUserRepository(),
        },
        {
          provide: HashService,
          useValue: {
            hash: jest.fn().mockResolvedValue('hashed-password-123'),
            compare: jest.fn(),
            generateSalt: jest.fn(),
            isValidHash: jest.fn(),
          },
        },
        {
          provide: NormalizationService,
          useValue: {
            normalizeEmail: jest.fn((email) => email.toLowerCase()),
            normalizeName: jest.fn((name) => name.trim()),
            normalizeText: jest.fn(),
            cleanForSearch: jest.fn(),
            capitalizeWords: jest.fn(),
          },
        },
        {
          provide: FilterService,
          useValue: {
            buildAdvancedFilters: jest.fn(),
            buildCursorFilters: jest.fn(),
            generateCursor: jest.fn(),
            isValidSortOption: jest.fn(),
            generateFuzzyPatterns: jest.fn(),
          },
        },
        {
          provide: CacheService,
          useValue: createCacheServiceMock(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    bcryptService = bcrypt;
  });

  afterEach(() => {
    resetAllMocks();
    restoreRealTimers();
  });

  describe('Test Doubles Implementation (PDF 086)', () => {
    describe('1. STUB - Valores pré-configurados', () => {
      it('should use stub for successful user creation', async () => {
        // Arrange
        const createUserDto: CreateUserDto = createMockCreateUserDto();
        const mockUser = createMockUser({ email: createUserDto.email });

        // Configurar stub para retornar valores específicos
        userRepository.findOne.mockResolvedValue(null); // Email não existe
        userRepository.create.mockReturnValue(mockUser);
        userRepository.save.mockResolvedValue(mockUser);
        bcryptService.hash.mockResolvedValue('hashed_password');

        // Act
        const result = await service.create(createUserDto);

        // Assert
        expect(result).toEqual(
          expect.objectContaining({
            name: createUserDto.name,
            email: createUserDto.email,
            role: createUserDto.role,
          }),
        );
        expect(result.passwordHash).toBeUndefined();
        // expect(bcryptService.hash).toHaveBeenCalledWith(
        //   createUserDto.password,
        //   10,
        // );
      });

      it('should use stub for email conflict scenario', async () => {
        // Arrange
        const createUserDto: CreateUserDto = createMockCreateUserDto();
        const existingUser = createMockUser({ email: createUserDto.email });

        // Stub configurado para simular email existente
        userRepository.findOne.mockResolvedValue(existingUser);

        // Act & Assert
        await expect(service.create(createUserDto)).rejects.toThrow(
          ConflictException,
        );
        expect(userRepository.save).not.toHaveBeenCalled();
      });
    });

    describe('2. SPY - Monitoramento de chamadas', () => {
      it('should spy on repository method calls during user update', async () => {
        // Arrange
        const userId = 'test-user-id';
        const updateDto: UpdateUserDto = { name: 'Updated Name' };
        const existingUser = createMockUser({ id: userId });
        const updatedUser = { ...existingUser, ...updateDto };

        userRepository.preload.mockResolvedValue(updatedUser);
        userRepository.save.mockResolvedValue(updatedUser);

        // Act
        const result = await service.update(userId, updateDto);

        // Assert - Verificar se os métodos foram chamados com os argumentos corretos
        expect(userRepository.preload).toHaveBeenCalledWith({
          id: userId,
          ...updateDto,
        });
        expect(userRepository.save).toHaveBeenCalledWith(updatedUser);
        expect(result).toEqual(expect.objectContaining(updateDto));
      });

      it('should spy on findOne calls with correct parameters', async () => {
        // Arrange
        const userId = 'test-user-id';
        const mockUser = createMockUser({ id: userId });
        userRepository.findOne.mockResolvedValue(mockUser);

        // Act
        const result = await service.findOne(userId);

        // Assert - Verificar se findOne foi chamado com os parâmetros corretos
        expect(userRepository.findOne).toHaveBeenCalledWith({
          where: { id: userId },
        });
        expect(userRepository.findOne).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expect.objectContaining({ id: userId }));
      });
    });

    describe('3. MOCK - Expectativas rígidas', () => {
      it('should enforce strict expectations for user deletion', async () => {
        // Arrange
        const userId = 'test-user-id';
        const mockUser = createMockUser({ id: userId });
        userRepository.findOne.mockResolvedValue(mockUser);
        userRepository.softDelete.mockResolvedValue(undefined);

        // Act
        await service.remove(userId);

        // Assert - Expectativas rígidas
        expect(userRepository.findOne).toHaveBeenCalledWith({
          where: { id: userId },
        });
        expect(userRepository.softDelete).toHaveBeenCalledWith(userId);
        expect(userRepository.softDelete).toHaveBeenCalledTimes(1);

        // Verificar que métodos não relacionados NÃO foram chamados
        expect(userRepository.save).not.toHaveBeenCalled();
        expect(userRepository.create).not.toHaveBeenCalled();
      });

      it('should enforce strict expectations for paginated search', async () => {
        // Arrange
        const query: QueryUsersDto = {
          page: 2,
          limit: 5,
          role: UserRole.OPERATOR,
          isActive: true,
        };
        const mockUsers = [createMockUser(), createMockUser()];
        userRepository.findAndCount.mockResolvedValue([mockUsers, 10]);

        // Act
        const result = await service.findAllWithAdvancedFilters(query);

        // Assert - Expectativas rígidas sobre os parâmetros
        expect(userRepository.findAndCount).toHaveBeenCalledWith(
          expect.objectContaining({
            skip: 5, // (page - 1) * limit = (2 - 1) * 5
            take: 5,
            order: { createdAt: 'DESC' },
          }),
        );
        expect(result.page).toBe(2);
        expect(result.limit).toBe(5);
        expect(result.total).toBe(10);
      });
    });
  });

  describe('AAA Pattern Implementation (PDF 086)', () => {
    describe('Arrange-Act-Assert Pattern', () => {
      it('should follow AAA pattern for user creation with validation', async () => {
        // ARRANGE - Preparação dos dados e configuração
        const createUserDto: CreateUserDto = createMockCreateUserDto({
          email: 'test@example.com',
          password: 'securePassword123',
        });
        const hashedPassword = 'hashed_securePassword123';
        const createdUser = createMockUser({
          email: createUserDto.email,
          passwordHash: hashedPassword,
        });

        // Configurar mocks
        userRepository.findOne.mockResolvedValue(null);
        userRepository.create.mockReturnValue(createdUser);
        userRepository.save.mockResolvedValue(createdUser);
        bcryptService.hash.mockResolvedValue(hashedPassword);

        // ACT - Execução da ação única
        const result = await service.create(createUserDto);

        // ASSERT - Verificação do resultado e interações
        expect(result).toEqual(
          expect.objectContaining({
            name: createUserDto.name,
            email: createUserDto.email.toLowerCase(), // Normalização
            role: createUserDto.role,
          }),
        );
        expect(result.passwordHash).toBeUndefined();
        // expect(bcryptService.hash).toHaveBeenCalledWith(
        //   createUserDto.password,
        //   10,
        // );
        expect(userRepository.findOne).toHaveBeenCalledWith({
          where: { email: createUserDto.email.toLowerCase() },
        });
        expect(userRepository.save).toHaveBeenCalledTimes(1);
      });

      it('should follow AAA pattern for error handling scenarios', async () => {
        // ARRANGE - Preparação do cenário de erro
        const createUserDto: CreateUserDto = createMockCreateUserDto();
        const databaseError = { code: '23505' }; // PostgreSQL unique constraint error

        userRepository.findOne.mockResolvedValue(null);
        userRepository.create.mockReturnValue({});
        userRepository.save.mockRejectedValue(databaseError);
        bcryptService.hash.mockResolvedValue('hashed_password');

        // ACT - Execução que deve gerar erro
        let thrownError: any;
        try {
          await service.create(createUserDto);
        } catch (error) {
          thrownError = error;
        }

        // ASSERT - Verificação do tratamento de erro
        expect(thrownError).toBeInstanceOf(ConflictException);
        expect(thrownError.message).toBe('Email already exists');
        expect(userRepository.save).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Time Control Implementation (PDF 086)', () => {
    it('should control time for date-dependent operations', async () => {
      // Arrange - Configurar tempo fake
      const fixedDate = new Date('2023-06-15T10:30:00Z');
      setupFakeTimers(fixedDate);

      const createUserDto: CreateUserDto = createMockCreateUserDto();
      const mockUser = createMockUser({
        createdAt: fixedDate,
        updatedAt: fixedDate,
      });

      userRepository.findOne.mockResolvedValue(null);
      userRepository.create.mockReturnValue(mockUser);
      userRepository.save.mockResolvedValue(mockUser);
      bcryptService.hash.mockResolvedValue('hashed_password');

      // Act
      const result = await service.create(createUserDto);

      // Assert - Verificar se as datas estão corretas
      expect(result.createdAt).toEqual(fixedDate);
      expect(result.updatedAt).toEqual(fixedDate);
    });
  });

  describe('Advanced Filtering Tests', () => {
    it('should handle complex filtering scenarios', async () => {
      // Arrange
      const query: QueryUsersDto = {
        page: 1,
        limit: 10,
        q: 'john',
        role: UserRole.MANAGER,
        isActive: true,
        sortBy: 'name',
        sortOrder: 'ASC',
      };

      const mockUsers = [
        createMockUser({ name: 'John Doe', role: UserRole.MANAGER }),
        createMockUser({ name: 'Johnny Smith', role: UserRole.MANAGER }),
      ];

      userRepository.findAndCount.mockResolvedValue([mockUsers, 2]);

      // Act
      const result = await service.findAllWithAdvancedFilters(query);

      // Assert
      expect(userRepository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.arrayContaining([
            { role: UserRole.MANAGER },
            { isActive: true },
            expect.arrayContaining([
              { name: expect.any(Object) }, // ILike
              { email: expect.any(Object) }, // ILike
            ]),
          ]),
          order: { name: 'ASC' },
        }),
      );
      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(2);
    });
  });

  describe('Edge Cases and Error Scenarios', () => {
    it('should handle empty search results gracefully', async () => {
      // Arrange
      const query: QueryUsersDto = { q: 'nonexistent' };
      userRepository.findAndCount.mockResolvedValue([[], 0]);

      // Act
      const result = await service.findAllWithAdvancedFilters(query);

      // Assert
      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.totalPages).toBe(0);
      expect(result.hasNextPage).toBe(false);
      expect(result.hasPreviousPage).toBe(false);
    });

    it('should handle database connection errors', async () => {
      // Arrange
      const createUserDto: CreateUserDto = createMockCreateUserDto();
      const connectionError = new Error('Database connection lost');

      userRepository.findOne.mockRejectedValue(connectionError);

      // Act & Assert
      await expect(service.create(createUserDto)).rejects.toThrow(
        connectionError,
      );
    });

    it('should handle malformed UUID in findOne', async () => {
      // Arrange
      const invalidId = 'invalid-uuid';
      userRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findOne(invalidId)).rejects.toThrow(
        NotFoundException,
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: invalidId },
      });
    });
  });

  describe('Performance and Optimization Tests', () => {
    it('should optimize database queries for pagination', async () => {
      // Arrange
      const query: QueryUsersDto = { page: 3, limit: 20 };
      userRepository.findAndCount.mockResolvedValue([[], 100]);

      // Act
      await service.findAllWithAdvancedFilters(query);

      // Assert - Verificar se skip/take estão corretos
      expect(userRepository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 40, // (3 - 1) * 20
          take: 20,
        }),
      );
    });

    it('should handle large result sets efficiently', async () => {
      // Arrange
      const largeUserList = Array.from({ length: 1000 }, (_, i) =>
        createMockUser({ id: `user-${i}`, name: `User ${i}` }),
      );
      userRepository.findAndCount.mockResolvedValue([
        largeUserList.slice(0, 10),
        1000,
      ]);

      const query: QueryUsersDto = { page: 1, limit: 10 };

      // Act
      const result = await service.findAllWithAdvancedFilters(query);

      // Assert
      expect(result.data).toHaveLength(10);
      expect(result.total).toBe(1000);
      expect(result.totalPages).toBe(100);
    });
  });
});
