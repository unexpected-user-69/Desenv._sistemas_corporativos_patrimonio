import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserRole } from './enums/user-role.enum';
import { AdvancedQueryUsersDto } from './dto/advanced-query-users.dto';
import { CacheService } from '../common/services/cache.service';
import { HashService } from '../common/services/hash.service';
import { NormalizationService } from '../common/services/normalization.service';
import { FilterService } from '../common/services/filter.service';
import { createRepositoryMock } from '../../test/mocks/repository.mock';

describe('UsersService - Advanced Cache Features', () => {
  let service: UsersService;
  let userRepository: jest.Mocked<Repository<User>>;
  let cacheService: jest.Mocked<CacheService>;
  let hashService: jest.Mocked<HashService>;
  let normalizationService: jest.Mocked<NormalizationService>;
  let filterService: jest.Mocked<FilterService>;

  const mockUser: User = {
    id: 'user-1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    passwordHash: 'hashed-password',
    role: UserRole.STUDENT,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    version: 1,
  } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createRepositoryMock<User>(),
        },
        {
          provide: CacheService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
            reset: jest.fn(),
            generateKey: jest.fn(),
            getOrSet: jest.fn(),
            invalidatePattern: jest.fn(),
          },
        },
        {
          provide: HashService,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
            generateSalt: jest.fn(),
            isValidHash: jest.fn(),
          },
        },
        {
          provide: NormalizationService,
          useValue: {
            normalizeEmail: jest.fn(),
            normalizeName: jest.fn(),
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
            buildFuzzyFilters: jest.fn(),
            buildDateRangeFilters: jest.fn(),
            validateSortOptions: jest.fn(),
            generateCursor: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    cacheService = module.get(CacheService);
    hashService = module.get(HashService);
    normalizationService = module.get(NormalizationService);
    filterService = module.get(FilterService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findWithAdvancedFilters', () => {
    const query: AdvancedQueryUsersDto = {
      page: 1,
      limit: 20,
      q: 'joão',
      role: UserRole.STUDENT,
      isActive: true,
      sortBy: 'name',
      sortOrder: 'ASC',
    };

    it('should return cached result when available', async () => {
      // Arrange
      const cachedResult = {
        data: [mockUser],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      };

      cacheService.generateKey.mockReturnValue('users:advanced:cache-key');
      cacheService.get.mockResolvedValue(cachedResult);

      // Act
      const result = await service.findWithAdvancedFilters(query);

      // Assert
      expect(result).toEqual(cachedResult);
      expect(cacheService.get).toHaveBeenCalledWith('users:advanced:cache-key');
      expect(userRepository.createQueryBuilder).not.toHaveBeenCalled();
    });

    it('should execute query and cache result when not cached', async () => {
      // Arrange
      const mockQueryBuilder = {
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[mockUser], 1]),
      };

      userRepository.createQueryBuilder.mockReturnValue(
        mockQueryBuilder as any,
      );
      cacheService.generateKey.mockReturnValue('users:advanced:cache-key');
      cacheService.get.mockResolvedValue(undefined);

      // Act
      const result = await service.findWithAdvancedFilters(query);

      // Assert
      expect(result).toEqual({
        data: [
          {
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            role: mockUser.role,
            isActive: mockUser.isActive,
            avatarUrl: mockUser.avatarUrl,
            createdAt: mockUser.createdAt,
            updatedAt: mockUser.updatedAt,
            version: mockUser.version,
          },
        ],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        '(user.name ILIKE :searchTerm OR user.email ILIKE :searchTerm)',
        { searchTerm: '%joão%' },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'user.role = :role',
        { role: UserRole.STUDENT },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'user.isActive = :isActive',
        { isActive: true },
      );
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('user.name', 'ASC');
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(20);

      expect(cacheService.set).toHaveBeenCalledWith(
        'users:advanced:cache-key',
        expect.any(Object),
        300,
      );
    });

    it('should apply date filters correctly', async () => {
      // Arrange
      const queryWithDates: AdvancedQueryUsersDto = {
        page: 1,
        limit: 20,
        createdAfter: '2024-01-01T00:00:00.000Z',
        createdBefore: '2024-12-31T23:59:59.999Z',
        updatedAfter: '2024-06-01T00:00:00.000Z',
        updatedBefore: '2024-06-30T23:59:59.999Z',
      };

      const mockQueryBuilder = {
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
      };

      userRepository.createQueryBuilder.mockReturnValue(
        mockQueryBuilder as any,
      );
      cacheService.generateKey.mockReturnValue('users:advanced:cache-key');
      cacheService.get.mockResolvedValue(undefined);

      // Act
      await service.findWithAdvancedFilters(queryWithDates);

      // Assert
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'user.createdAt >= :createdAfter',
        { createdAfter: new Date('2024-01-01T00:00:00.000Z') },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'user.createdAt <= :createdBefore',
        { createdBefore: new Date('2024-12-31T23:59:59.999Z') },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'user.updatedAt >= :updatedAfter',
        { updatedAfter: new Date('2024-06-01T00:00:00.000Z') },
      );
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'user.updatedAt <= :updatedBefore',
        { updatedBefore: new Date('2024-06-30T23:59:59.999Z') },
      );
    });
  });

  describe('getUserStats', () => {
    it('should return cached stats when available', async () => {
      // Arrange
      const cachedStats = {
        total: 100,
        active: 80,
        inactive: 20,
        byRole: { STUDENT: 60, TEACHER: 30, ADMIN: 10 },
      };

      cacheService.get.mockResolvedValue(cachedStats);

      // Act
      const result = await service.getUserStats();

      // Assert
      expect(result).toEqual(cachedStats);
      expect(cacheService.get).toHaveBeenCalledWith('users:stats');
      expect(userRepository.count).not.toHaveBeenCalled();
    });

    it('should calculate and cache stats when not cached', async () => {
      // Arrange
      const mockQueryBuilder = {
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([
          { role: 'STUDENT', count: '60' },
          { role: 'TEACHER', count: '30' },
          { role: 'ADMIN', count: '10' },
        ]),
      };

      userRepository.createQueryBuilder.mockReturnValue(
        mockQueryBuilder as any,
      );
      userRepository.count
        .mockResolvedValueOnce(100) // total
        .mockResolvedValueOnce(80) // active
        .mockResolvedValueOnce(20); // inactive

      cacheService.get.mockResolvedValue(undefined);

      // Act
      const result = await service.getUserStats();

      // Assert
      expect(result).toEqual({
        total: 100,
        active: 80,
        inactive: 20,
        byRole: { STUDENT: 60, TEACHER: 30, ADMIN: 10 },
      });

      expect(cacheService.set).toHaveBeenCalledWith(
        'users:stats',
        expect.any(Object),
        600,
      );
    });
  });

  describe('invalidateUserCache', () => {
    it('should invalidate user cache patterns', () => {
      // Act
      service.invalidateUserCache();

      // Assert
      expect(cacheService.invalidatePattern).toHaveBeenCalledWith('users:*');
    });
  });
});
