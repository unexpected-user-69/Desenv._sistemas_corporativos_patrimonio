import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';
import { Cache } from 'cache-manager';

describe('CacheService', () => {
  let service: CacheService;
  let cacheManager: jest.Mocked<Cache>;

  beforeEach(async () => {
    const mockCacheManager = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
      reset: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return cached value when found', async () => {
      // Arrange
      const key = 'test-key';
      const value = { data: 'test-data' };
      cacheManager.get.mockResolvedValue(value);

      // Act
      const result = await service.get(key);

      // Assert
      expect(result).toEqual(value);
      expect(cacheManager.get).toHaveBeenCalledWith(key);
    });

    it('should return undefined when not found', async () => {
      // Arrange
      const key = 'non-existent-key';
      cacheManager.get.mockResolvedValue(undefined);

      // Act
      const result = await service.get(key);

      // Assert
      expect(result).toBeUndefined();
      expect(cacheManager.get).toHaveBeenCalledWith(key);
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      const key = 'error-key';
      cacheManager.get.mockRejectedValue(new Error('Cache error'));

      // Act
      const result = await service.get(key);

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe('set', () => {
    it('should set value in cache with TTL', async () => {
      // Arrange
      const key = 'test-key';
      const value = { data: 'test-data' };
      const ttl = 300;

      // Act
      await service.set(key, value, ttl);

      // Assert
      expect(cacheManager.set).toHaveBeenCalledWith(key, value, ttl);
    });

    it('should set value in cache without TTL', async () => {
      // Arrange
      const key = 'test-key';
      const value = { data: 'test-data' };

      // Act
      await service.set(key, value);

      // Assert
      expect(cacheManager.set).toHaveBeenCalledWith(key, value, undefined);
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      const key = 'error-key';
      const value = { data: 'test-data' };
      cacheManager.set.mockRejectedValue(new Error('Cache error'));

      // Act & Assert
      await expect(service.set(key, value)).resolves.not.toThrow();
    });
  });

  describe('del', () => {
    it('should delete value from cache', async () => {
      // Arrange
      const key = 'test-key';

      // Act
      await service.del(key);

      // Assert
      expect(cacheManager.del).toHaveBeenCalledWith(key);
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      const key = 'error-key';
      cacheManager.del.mockRejectedValue(new Error('Cache error'));

      // Act & Assert
      await expect(service.del(key)).resolves.not.toThrow();
    });
  });

  describe('reset', () => {
    it('should log reset request', async () => {
      // Arrange
      const loggerSpy = jest.spyOn(service['logger'], 'debug');

      // Act
      service.reset();

      // Assert
      expect(loggerSpy).toHaveBeenCalledWith(
        'Cache reset requested - implementation depends on cache store',
      );
    });

    it('should handle errors gracefully', () => {
      // Act & Assert
      expect(() => service.reset()).not.toThrow();
    });
  });

  describe('generateKey', () => {
    it('should generate consistent key from parameters', () => {
      // Arrange
      const prefix = 'users';
      const params = { page: 1, limit: 20, role: 'STUDENT' };

      // Act
      const key1 = service.generateKey(prefix, params);
      const key2 = service.generateKey(prefix, params);

      // Assert
      expect(key1).toBe(key2);
      expect(key1).toContain(prefix);
    });

    it('should generate different keys for different parameters', () => {
      // Arrange
      const prefix = 'users';
      const params1 = { page: 1, limit: 20 };
      const params2 = { page: 2, limit: 20 };

      // Act
      const key1 = service.generateKey(prefix, params1);
      const key2 = service.generateKey(prefix, params2);

      // Assert
      expect(key1).not.toBe(key2);
    });

    it('should handle empty parameters', () => {
      // Arrange
      const prefix = 'users';
      const params = {};

      // Act
      const key = service.generateKey(prefix, params);

      // Assert
      expect(key).toContain(prefix);
    });
  });

  describe('getOrSet', () => {
    it('should return cached value when available', async () => {
      // Arrange
      const key = 'test-key';
      const cachedValue = { data: 'cached-data' };
      const fn = jest.fn();
      cacheManager.get.mockResolvedValue(cachedValue);

      // Act
      const result = await service.getOrSet(key, fn);

      // Assert
      expect(result).toEqual(cachedValue);
      expect(fn).not.toHaveBeenCalled();
      expect(cacheManager.get).toHaveBeenCalledWith(key);
    });

    it('should execute function and cache result when not cached', async () => {
      // Arrange
      const key = 'test-key';
      const fnResult = { data: 'fresh-data' };
      const fn = jest.fn().mockResolvedValue(fnResult);
      cacheManager.get.mockResolvedValue(undefined);

      // Act
      const result = await service.getOrSet(key, fn, 300);

      // Assert
      expect(result).toEqual(fnResult);
      expect(fn).toHaveBeenCalled();
      expect(cacheManager.set).toHaveBeenCalledWith(key, fnResult, 300);
    });

    it('should handle function errors', async () => {
      // Arrange
      const key = 'test-key';
      const fn = jest.fn().mockRejectedValue(new Error('Function error'));
      cacheManager.get.mockResolvedValue(undefined);

      // Act & Assert
      await expect(service.getOrSet(key, fn)).rejects.toThrow('Function error');
    });
  });

  describe('invalidatePattern', () => {
    it('should log invalidation request', async () => {
      // Arrange
      const pattern = 'users:*';
      const loggerSpy = jest.spyOn(service['logger'], 'debug');

      // Act
      service.invalidatePattern(pattern);

      // Assert
      expect(loggerSpy).toHaveBeenCalledWith(
        `Cache invalidation requested for pattern: ${pattern}`,
      );
    });
  });
});
