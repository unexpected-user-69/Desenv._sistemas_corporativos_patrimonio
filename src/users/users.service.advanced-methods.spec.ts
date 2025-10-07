import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
import { HashService } from '../common/services/hash.service';
import { NormalizationService } from '../common/services/normalization.service';
import { FilterService } from '../common/services/filter.service';
import { CacheService } from '../common/services/cache.service';
import { Between, ILike } from 'typeorm';

describe('UsersService - Advanced Methods (Trabalho Integrado)', () => {
  let service: UsersService;
  let userRepository: jest.Mocked<any>;
  let filterService: jest.Mocked<FilterService>;

  const mockUser: User = {
    id: 'user-1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    passwordHash: 'hashed-password-1',
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
          useValue: {
            find: jest.fn(),
            findAndCount: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            preload: jest.fn(),
            softDelete: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnThis(),
              addSelect: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              orWhere: jest.fn().mockReturnThis(),
              orderBy: jest.fn().mockReturnThis(),
              addOrderBy: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              take: jest.fn().mockReturnThis(),
              limit: jest.fn().mockReturnThis(),
              offset: jest.fn().mockReturnThis(),
              groupBy: jest.fn().mockReturnThis(),
              addGroupBy: jest.fn().mockReturnThis(),
              having: jest.fn().mockReturnThis(),
              andHaving: jest.fn().mockReturnThis(),
              orHaving: jest.fn().mockReturnThis(),
              leftJoin: jest.fn().mockReturnThis(),
              innerJoin: jest.fn().mockReturnThis(),
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              innerJoinAndSelect: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockResolvedValue([]),
              getOne: jest.fn().mockResolvedValue(null),
              getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
              getRawMany: jest.fn().mockResolvedValue([]),
              getRawOne: jest.fn().mockResolvedValue(null),
              getCount: jest.fn().mockResolvedValue(0),
              getSql: jest.fn().mockReturnValue('SELECT * FROM users'),
              setParameter: jest.fn().mockReturnThis(),
              setParameters: jest.fn().mockReturnThis(),
            }),
          },
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
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
    filterService = module.get(FilterService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findWithAdvancedFilters', () => {
    it('should return paginated users with advanced filters', async () => {
      // Arrange
      const query = {
        page: 1,
        limit: 10,
        q: 'joão',
        role: UserRole.STUDENT,
        isActive: true,
        sortBy: 'createdAt' as const,
        sortOrder: 'DESC' as const,
      };

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

      // Act
      const result = await service.findWithAdvancedFilters(query);

      // Assert
      expect(userRepository.createQueryBuilder).toHaveBeenCalledWith('user');
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
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
        'user.createdAt',
        'DESC',
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(10);
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
        limit: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      });
    });

    it('should handle empty results', async () => {
      // Arrange
      const query = { page: 1, limit: 10 };

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

      // Act
      const result = await service.findWithAdvancedFilters(query);

      // Assert
      expect(result).toEqual({
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      });
    });
  });

  describe('findWithCursorPagination', () => {
    it('should return users with cursor pagination', async () => {
      // Arrange
      const options = { limit: 10, searchText: 'joão' };
      const cursor = 'cursor123';
      const mockFindOptions = { where: {}, take: 10 };

      filterService.buildCursorFilters.mockReturnValue(mockFindOptions);
      filterService.generateCursor.mockReturnValue('next-cursor');
      userRepository.findAndCount.mockResolvedValue([[mockUser], 1]);

      // Act
      const result = await service.findWithCursorPagination(options, cursor);

      // Assert
      expect(filterService.buildCursorFilters).toHaveBeenCalledWith(
        options,
        cursor,
      );
      expect(result).toEqual({
        data: expect.arrayContaining([
          expect.objectContaining({
            id: mockUser.id,
            name: mockUser.name,
          }),
        ]),
        nextCursor: undefined, // Only 1 result, limit is 10, so no next cursor
        hasMore: false,
      });
    });

    it('should indicate hasMore when results equal limit', async () => {
      // Arrange
      const options = { limit: 1 };
      const mockFindOptions = { where: {}, take: 1 };

      filterService.buildCursorFilters.mockReturnValue(mockFindOptions);
      filterService.generateCursor.mockReturnValue('next-cursor');
      userRepository.findAndCount.mockResolvedValue([[mockUser], 1]);

      // Act
      const result = await service.findWithCursorPagination(options);

      // Assert
      expect(result.hasMore).toBe(true);
      expect(result.nextCursor).toBe('next-cursor');
    });
  });

  describe('findFuzzy', () => {
    it('should return users with fuzzy search', async () => {
      // Arrange
      const searchText = 'joao';
      const patterns = ['%joao%', '%jo%', '%ao%'];

      filterService.generateFuzzyPatterns.mockReturnValue(patterns);
      userRepository.find.mockResolvedValue([mockUser]);

      // Act
      const result = await service.findFuzzy(searchText, 10);

      // Assert
      expect(filterService.generateFuzzyPatterns).toHaveBeenCalledWith(
        searchText,
      );
      expect(userRepository.find).toHaveBeenCalledWith({
        where: [
          { name: ILike('%joao%') },
          { email: ILike('%joao%') },
          { name: ILike('%jo%') },
          { email: ILike('%jo%') },
          { name: ILike('%ao%') },
          { email: ILike('%ao%') },
        ],
        take: 10,
        order: { createdAt: 'DESC' },
      });
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(
        expect.objectContaining({
          id: mockUser.id,
          name: mockUser.name,
        }),
      );
    });

    it('should return empty array when no patterns generated', async () => {
      // Arrange
      filterService.generateFuzzyPatterns.mockReturnValue([]);

      // Act
      const result = await service.findFuzzy('', 10);

      // Assert
      expect(result).toEqual([]);
      expect(userRepository.find).not.toHaveBeenCalled();
    });
  });

  describe('findByDateRange', () => {
    it('should return users within date range', async () => {
      // Arrange
      const dateFrom = new Date('2024-01-01');
      const dateTo = new Date('2024-01-31');
      const options = { role: UserRole.STUDENT, limit: 50 };

      userRepository.find.mockResolvedValue([mockUser]);

      // Act
      const result = await service.findByDateRange(dateFrom, dateTo, options);

      // Assert
      expect(userRepository.find).toHaveBeenCalledWith({
        where: {
          createdAt: Between(dateFrom, dateTo),
          role: UserRole.STUDENT,
        },
        order: { createdAt: 'DESC' },
        take: 50,
      });
      expect(result).toHaveLength(1);
    });

    it('should use default limit when not provided', async () => {
      // Arrange
      const dateFrom = new Date('2024-01-01');
      const dateTo = new Date('2024-01-31');

      userRepository.find.mockResolvedValue([]);

      // Act
      const result = await service.findByDateRange(dateFrom, dateTo);

      // Assert
      expect(userRepository.find).toHaveBeenCalledWith({
        where: {
          createdAt: Between(dateFrom, dateTo),
        },
        order: { createdAt: 'DESC' },
        take: 100,
      });
    });
  });

  describe('getUserStatsByRole', () => {
    it('should return statistics by role', async () => {
      // Arrange
      const users = [
        { role: UserRole.STUDENT },
        { role: UserRole.STUDENT },
        { role: UserRole.TEACHER },
        { role: UserRole.ADMIN },
      ] as User[];

      userRepository.find.mockResolvedValue(users);

      // Act
      const result = await service.getUserStatsByRole();

      // Assert
      expect(userRepository.find).toHaveBeenCalledWith({
        select: ['role'],
      });
      expect(result).toEqual({
        [UserRole.STUDENT]: 2,
        [UserRole.TEACHER]: 1,
        [UserRole.ADMIN]: 1,
      });
    });

    it('should handle empty results', async () => {
      // Arrange
      userRepository.find.mockResolvedValue([]);

      // Act
      const result = await service.getUserStatsByRole();

      // Assert
      expect(result).toEqual({});
    });
  });

  describe('findRecentActiveUsers', () => {
    it('should return recent active users', async () => {
      // Arrange
      const days = 7;
      const limit = 5;
      const recentUser = {
        ...mockUser,
        updatedAt: new Date('2024-01-15'),
      };

      userRepository.find.mockResolvedValue([recentUser]);

      // Act
      const result = await service.findRecentActiveUsers(days, limit);

      // Assert
      expect(userRepository.find).toHaveBeenCalledWith({
        where: {
          isActive: true,
          updatedAt: Between(expect.any(Date), expect.any(Date)),
        },
        order: { updatedAt: 'DESC' },
        take: limit,
      });
      expect(result).toHaveLength(1);
    });

    it('should use default parameters', async () => {
      // Arrange
      userRepository.find.mockResolvedValue([]);

      // Act
      const result = await service.findRecentActiveUsers();

      // Assert
      expect(userRepository.find).toHaveBeenCalledWith({
        where: {
          isActive: true,
          updatedAt: Between(expect.any(Date), expect.any(Date)),
        },
        order: { updatedAt: 'DESC' },
        take: 10,
      });
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      // Arrange
      const id = 'user-1';
      const updateDto = {
        name: 'João Silva Updated',
        email: 'joao.updated@example.com',
      };

      const updatedUser = { ...mockUser, ...updateDto };
      userRepository.preload.mockResolvedValue(updatedUser);
      userRepository.save.mockResolvedValue(updatedUser);

      // Act
      const result = await service.update(id, updateDto);

      // Assert
      expect(userRepository.preload).toHaveBeenCalledWith({
        id,
        ...updateDto,
        email: updateDto.email?.toLowerCase(),
      });
      expect(userRepository.save).toHaveBeenCalledWith(updatedUser);
      expect(result).toEqual(updatedUser);
    });

    it('should hash password when provided', async () => {
      // Arrange
      const id = 'user-1';
      const updateDto = {
        password: 'newpassword123',
      };

      const updatedUser = { ...mockUser, passwordHash: 'hashed-new-password' };
      userRepository.preload.mockResolvedValue(updatedUser);
      userRepository.save.mockResolvedValue(updatedUser);

      // Act
      await service.update(id, updateDto);

      // Assert
      expect(userRepository.preload).toHaveBeenCalledWith({
        id,
        ...updateDto,
        passwordHash: 'hashed-password-123',
      });
    });

    it('should throw NotFoundException when user not found', async () => {
      // Arrange
      const id = 'non-existent';
      const updateDto = { name: 'Updated Name' };

      userRepository.preload.mockResolvedValue(null);

      // Act & Assert
      await expect(service.update(id, updateDto)).rejects.toThrow(
        'User with ID "non-existent" not found',
      );
    });
  });

  describe('remove', () => {
    it('should remove user successfully', async () => {
      // Arrange
      const id = 'user-1';
      userRepository.findOne.mockResolvedValue(mockUser);
      userRepository.softDelete.mockResolvedValue({ affected: 1 });

      // Act
      await service.remove(id);

      // Assert
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(userRepository.softDelete).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException when user not found', async () => {
      // Arrange
      const id = 'non-existent';
      userRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.remove(id)).rejects.toThrow(
        'User with ID "non-existent" not found',
      );
    });
  });
});
