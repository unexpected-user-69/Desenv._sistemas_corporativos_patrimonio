import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserRole } from './enums/user-role.enum';
import { QueryUsersDto } from './dto/query-users.dto';
import { createUserRepositoryMock } from '../../test/mocks/repository.mock';
import { HashService } from '../common/services/hash.service';
import { NormalizationService } from '../common/services/normalization.service';
import { FilterService } from '../common/services/filter.service';
import { CacheService } from '../common/services/cache.service';
import { createCacheServiceMock } from '../../test/mocks/cache.service.mock';

describe('UsersService - Find Methods', () => {
  let service: UsersService;
  let userRepository: jest.Mocked<any>;

  const mockUsers: User[] = [
    {
      id: 'user-1',
      name: 'João Silva',
      email: 'joao.silva@example.com',
      passwordHash: 'hashed-password-1',
      role: UserRole.STUDENT,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      version: 1,
    } as User,
    {
      id: 'user-2',
      name: 'Maria Santos',
      email: 'maria.santos@example.com',
      passwordHash: 'hashed-password-2',
      role: UserRole.TEACHER,
      isActive: true,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
      version: 1,
    } as User,
    {
      id: 'user-3',
      name: 'Pedro Admin',
      email: 'pedro.admin@example.com',
      passwordHash: 'hashed-password-3',
      role: UserRole.ADMIN,
      isActive: false,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03'),
      version: 1,
    } as User,
  ];

  beforeEach(async () => {
    jest.clearAllMocks();
    userRepository = createUserRepositoryMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
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
  });

  describe('findAll', () => {
    it('should return all users without passwordHash', async () => {
      // Arrange
      userRepository.find.mockResolvedValue(mockUsers);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        id: 'user-1',
        name: 'João Silva',
        email: 'joao.silva@example.com',
        role: UserRole.STUDENT,
        isActive: true,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        version: 1,
      });
      expect(result[0].passwordHash).toBeUndefined();
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no users exist', async () => {
      // Arrange
      userRepository.find.mockResolvedValue([]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual([]);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAllWithAdvancedFilters', () => {
    it('should return paginated users with default parameters', async () => {
      // Arrange
      const query: QueryUsersDto = {};
      userRepository.findAndCount.mockResolvedValue([mockUsers, 3]);

      // Act
      const result = await service.findAllWithAdvancedFilters(query);

      // Assert
      expect(result).toEqual({
        data: expect.arrayContaining([
          expect.objectContaining({
            id: 'user-1',
            name: 'João Silva',
            email: 'joao.silva@example.com',
            role: UserRole.STUDENT,
            isActive: true,
          }),
        ]),
        total: 3,
        page: 1,
        limit: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      });
      expect(result.data[0].passwordHash).toBeUndefined();
    });

    it('should handle pagination correctly', async () => {
      // Arrange
      const query: QueryUsersDto = { page: 2, limit: 1 };
      userRepository.findAndCount.mockResolvedValue([mockUsers.slice(1, 2), 3]);

      // Act
      const result = await service.findAllWithAdvancedFilters(query);

      // Assert
      expect(result.page).toBe(2);
      expect(result.limit).toBe(1);
      expect(result.total).toBe(3);
      expect(result.totalPages).toBe(3);
      expect(result.hasNextPage).toBe(true);
      expect(result.hasPreviousPage).toBe(true);
    });

    it('should filter by role', async () => {
      // Arrange
      const query: QueryUsersDto = { role: UserRole.STUDENT };
      const studentUsers = mockUsers.filter(
        (user) => user.role === UserRole.STUDENT,
      );
      userRepository.findAndCount.mockResolvedValue([studentUsers, 1]);

      // Act
      const result = await service.findAllWithAdvancedFilters(query);

      // Assert
      expect(result.data).toHaveLength(1);
      expect(result.data[0].role).toBe(UserRole.STUDENT);
      expect(userRepository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          where: [{ role: UserRole.STUDENT }],
        }),
      );
    });

    it('should filter by isActive status', async () => {
      // Arrange
      const query: QueryUsersDto = { isActive: true };
      const activeUsers = mockUsers.filter((user) => user.isActive === true);
      userRepository.findAndCount.mockResolvedValue([activeUsers, 2]);

      // Act
      const result = await service.findAllWithAdvancedFilters(query);

      // Assert
      expect(result.data).toHaveLength(2);
      expect(result.data.every((user) => user.isActive === true)).toBe(true);
      expect(userRepository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          where: [{ isActive: true }],
        }),
      );
    });

    it('should handle text search with ILIKE', async () => {
      // Arrange
      const query: QueryUsersDto = { q: 'joão' };
      const matchingUsers = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes('joão') ||
          user.email.toLowerCase().includes('joão'),
      );
      userRepository.findAndCount.mockResolvedValue([matchingUsers, 1]);

      // Act
      const result = await service.findAllWithAdvancedFilters(query);

      // Assert
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toContain('João');
      expect(userRepository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.any(Array),
        }),
      );
    });

    it('should combine multiple filters', async () => {
      // Arrange
      const query: QueryUsersDto = {
        role: UserRole.TEACHER,
        isActive: true,
        page: 1,
        limit: 5,
      };
      const filteredUsers = mockUsers.filter(
        (user) => user.role === UserRole.TEACHER && user.isActive === true,
      );
      userRepository.findAndCount.mockResolvedValue([filteredUsers, 1]);

      // Act
      const result = await service.findAllWithAdvancedFilters(query);

      // Assert
      expect(result.data).toHaveLength(1);
      expect(result.data[0].role).toBe(UserRole.TEACHER);
      expect(result.data[0].isActive).toBe(true);
    });

    it('should handle sorting by different fields', async () => {
      // Arrange
      const query: QueryUsersDto = { sortBy: 'name', sortOrder: 'ASC' };
      userRepository.findAndCount.mockResolvedValue([mockUsers, 3]);

      // Act
      await service.findAllWithAdvancedFilters(query);

      // Assert
      expect(userRepository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          order: { name: 'ASC' },
        }),
      );
    });

    it('should handle empty search results', async () => {
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

    it('should calculate pagination metadata correctly', async () => {
      // Arrange
      const query: QueryUsersDto = { page: 3, limit: 2 };
      userRepository.findAndCount.mockResolvedValue([mockUsers.slice(2), 5]);

      // Act
      const result = await service.findAllWithAdvancedFilters(query);

      // Assert
      expect(result.page).toBe(3);
      expect(result.limit).toBe(2);
      expect(result.total).toBe(5);
      expect(result.totalPages).toBe(3); // Math.ceil(5/2) = 3
      expect(result.hasNextPage).toBe(false); // page 3 of 3
      expect(result.hasPreviousPage).toBe(true); // page > 1
    });

    it('should not expose passwordHash in any user data', async () => {
      // Arrange
      const query: QueryUsersDto = {};
      userRepository.findAndCount.mockResolvedValue([mockUsers, 3]);

      // Act
      const result = await service.findAllWithAdvancedFilters(query);

      // Assert
      result.data.forEach((user) => {
        expect(user.passwordHash).toBeUndefined();
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('role');
        expect(user).toHaveProperty('isActive');
      });
    });
  });
});
