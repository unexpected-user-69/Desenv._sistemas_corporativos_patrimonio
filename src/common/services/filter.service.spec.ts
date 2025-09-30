import { Test, TestingModule } from '@nestjs/testing';
import { FilterService, AdvancedFilterOptions } from './filter.service';
import { User, UserRole } from '../../users/entities/user.entity';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterService],
    }).compile();

    service = module.get<FilterService>(FilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buildAdvancedFilters', () => {
    it('should build basic filter options', () => {
      // Arrange
      const options: AdvancedFilterOptions = {
        page: 1,
        limit: 10,
        sortBy: 'name',
        sortOrder: 'ASC',
      };

      // Act
      const result = service.buildAdvancedFilters(options);

      // Assert
      expect(result.skip).toBe(0);
      expect(result.take).toBe(10);
      expect(result.order).toEqual({ name: 'ASC' });
      expect(result.where).toBeUndefined();
    });

    it('should build filters with role and isActive', () => {
      // Arrange
      const options: AdvancedFilterOptions = {
        role: UserRole.STUDENT,
        isActive: true,
        page: 2,
        limit: 20,
      };

      // Act
      const result = service.buildAdvancedFilters(options);

      // Assert
      expect(result.skip).toBe(20);
      expect(result.take).toBe(20);
      expect(result.where).toEqual([
        { role: UserRole.STUDENT },
        { isActive: true },
      ]);
    });

    it('should build filters with search text', () => {
      // Arrange
      const options: AdvancedFilterOptions = {
        searchText: 'joão',
        page: 1,
        limit: 10,
      };

      // Act
      const result = service.buildAdvancedFilters(options);

      // Assert
      expect(result.where).toBeDefined();
      expect(Array.isArray(result.where)).toBe(true);
      expect(result.where).toHaveLength(2);
      expect(result.where).toContainEqual({ name: expect.any(Object) });
      expect(result.where).toContainEqual({ email: expect.any(Object) });
    });

    it('should build filters with date range', () => {
      // Arrange
      const dateFrom = new Date('2023-01-01');
      const dateTo = new Date('2023-12-31');
      const options: AdvancedFilterOptions = {
        dateFrom,
        dateTo,
        page: 1,
        limit: 10,
      };

      // Act
      const result = service.buildAdvancedFilters(options);

      // Assert
      expect(result.where).toEqual([
        { createdAt: expect.any(Object) }, // Between object
      ]);
    });

    it('should combine multiple filters', () => {
      // Arrange
      const options: AdvancedFilterOptions = {
        searchText: 'joão',
        role: UserRole.TEACHER,
        isActive: true,
        page: 1,
        limit: 10,
      };

      // Act
      const result = service.buildAdvancedFilters(options);

      // Assert
      expect(result.where).toBeDefined();
      expect(Array.isArray(result.where)).toBe(true);
      expect(result.where).toHaveLength(4); // 2 from role+name, 2 from isActive+email
      // Verifica que temos combinações de filtros
      expect(result.where).toContainEqual(
        expect.objectContaining({ role: UserRole.TEACHER, name: expect.any(Object) }),
      );
      expect(result.where).toContainEqual(
        expect.objectContaining({ isActive: true, name: expect.any(Object) }),
      );
    });
  });

  describe('buildCursorFilters', () => {
    it('should build cursor filters without cursor', () => {
      // Arrange
      const options: AdvancedFilterOptions = {
        page: 1,
        limit: 10,
      };

      // Act
      const result = service.buildCursorFilters(options);

      // Assert
      expect(result.skip).toBe(0);
      expect(result.take).toBe(10);
    });

    it('should build cursor filters with valid cursor', () => {
      // Arrange
      const cursorData = {
        id: 'user-123',
        createdAt: new Date('2023-06-01'),
      };
      const cursor = Buffer.from(JSON.stringify(cursorData)).toString('base64');
      const options: AdvancedFilterOptions = {
        sortOrder: 'DESC',
        limit: 10,
      };

      // Act
      const result = service.buildCursorFilters(options, cursor);

      // Assert
      expect(result.where).toBeDefined();
    });

    it('should handle invalid cursor gracefully', () => {
      // Arrange
      const invalidCursor = 'invalid-cursor';
      const options: AdvancedFilterOptions = {
        page: 1,
        limit: 10,
      };

      // Act
      const result = service.buildCursorFilters(options, invalidCursor);

      // Assert
      expect(result.skip).toBe(0);
      expect(result.take).toBe(10);
    });
  });

  describe('generateCursor', () => {
    it('should generate cursor from user data', () => {
      // Arrange
      const user: User = {
        id: 'user-123',
        name: 'João Silva',
        email: 'joao@example.com',
        passwordHash: 'hashed',
        role: UserRole.STUDENT,
        isActive: true,
        createdAt: new Date('2023-06-01'),
        updatedAt: new Date('2023-06-01'),
        version: 1,
        deletedAt: null,
        avatarUrl: null,
      };

      // Act
      const result = service.generateCursor(user);

      // Assert
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      // Decode and verify
      const decoded = JSON.parse(Buffer.from(result, 'base64').toString());
      expect(decoded.id).toBe('user-123');
      expect(decoded.createdAt).toBeDefined();
    });
  });

  describe('isValidSortOption', () => {
    it('should return true for valid sort options', () => {
      // Arrange & Act & Assert
      expect(service.isValidSortOption('name', 'ASC')).toBe(true);
      expect(service.isValidSortOption('email', 'DESC')).toBe(true);
      expect(service.isValidSortOption('createdAt', 'ASC')).toBe(true);
      expect(service.isValidSortOption('updatedAt', 'DESC')).toBe(true);
    });

    it('should return false for invalid sort field', () => {
      // Arrange & Act & Assert
      expect(service.isValidSortOption('invalidField', 'ASC')).toBe(false);
      expect(service.isValidSortOption('name', 'INVALID')).toBe(false);
    });

    it('should return false for invalid sort order', () => {
      // Arrange & Act & Assert
      expect(service.isValidSortOption('name', 'INVALID')).toBe(false);
      expect(service.isValidSortOption('name', 'asc')).toBe(false); // lowercase
    });
  });

  describe('generateFuzzyPatterns', () => {
    it('should generate fuzzy patterns for search text', () => {
      // Arrange
      const searchText = 'joão';

      // Act
      const result = service.generateFuzzyPatterns(searchText);

      // Assert
      expect(result).toContain('%joão%');
      expect(result.length).toBeGreaterThan(1);
    });

    it('should return empty array for short text', () => {
      // Arrange
      const searchText = 'a';

      // Act
      const result = service.generateFuzzyPatterns(searchText);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return empty array for empty text', () => {
      // Arrange
      const searchText = '';

      // Act
      const result = service.generateFuzzyPatterns(searchText);

      // Assert
      expect(result).toEqual([]);
    });

    it('should generate patterns with missing characters', () => {
      // Arrange
      const searchText = 'test';

      // Act
      const result = service.generateFuzzyPatterns(searchText);

      // Assert
      expect(result).toContain('%test%');
      expect(result).toContain('%est%'); // missing first character
      expect(result).toContain('%tst%'); // missing second character
    });

    it('should generate patterns with extra characters', () => {
      // Arrange
      const searchText = 'test';

      // Act
      const result = service.generateFuzzyPatterns(searchText);

      // Assert
      expect(result).toContain('%_test%'); // extra character at beginning
      expect(result).toContain('%t_est%'); // extra character in middle
    });
  });
});
