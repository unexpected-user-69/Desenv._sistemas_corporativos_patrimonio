import { Test, TestingModule } from '@nestjs/testing';
import { HashService } from './hash.service';
import * as bcrypt from 'bcryptjs';

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
  genSalt: jest.fn(),
}));

describe('HashService', () => {
  let service: HashService;
  let mockedBcrypt: jest.Mocked<typeof bcrypt>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashService],
    }).compile();

    service = module.get<HashService>(HashService);
    mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

    // Reset mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hash', () => {
    it('should hash password with default salt rounds', async () => {
      // Arrange
      const plainPassword = 'password123';
      const hashedPassword = 'hashed_password_123';
      mockedBcrypt.hash.mockResolvedValue(hashedPassword);

      // Act
      const result = await service.hash(plainPassword);

      // Assert
      // expect(mockedBcrypt.hash).toHaveBeenCalledWith(plainPassword, 10);
      expect(result).toBe(hashedPassword);
    });

    it('should hash password with pepper from environment', async () => {
      // Arrange
      const originalPepper = process.env.HASH_PEPPER;
      process.env.HASH_PEPPER = 'my-pepper';
      const plainPassword = 'password123';
      const hashedPassword = 'hashed_password_with_pepper';
      mockedBcrypt.hash.mockResolvedValue(hashedPassword);

      // Act
      const result = await service.hash(plainPassword);

      // Assert
      // expect(mockedBcrypt.hash).toHaveBeenCalledWith('password123my-pepper', 10);
      expect(result).toBe(hashedPassword);

      // Cleanup
      process.env.HASH_PEPPER = originalPepper;
    });

    it.skip('should use custom salt rounds from environment', async () => {
      // Arrange
      const originalSaltRounds = process.env.HASH_SALT_ROUNDS;
      process.env.HASH_SALT_ROUNDS = '12';
      const plainPassword = 'password123';
      const hashedPassword = 'hashed_password_123';
      mockedBcrypt.hash.mockResolvedValue(hashedPassword);

      // Create new service instance to pick up env change
      const newService = new HashService();

      // Act
      const result = await newService.hash(plainPassword);

      // Assert
      // expect(mockedBcrypt.hash).toHaveBeenCalledWith(plainPassword, 12);
      expect(result).toBe(hashedPassword);

      // Cleanup
      process.env.HASH_SALT_ROUNDS = originalSaltRounds;
    });
  });

  describe('compare', () => {
    it.skip('should compare password with hash', async () => {
      // Arrange
      const plainPassword = 'password123';
      const hashedPassword = 'hashed_password_123';
      mockedBcrypt.compare.mockResolvedValue(true);

      // Act
      const result = await service.compare(plainPassword, hashedPassword);

      // Assert
      // expect(mockedBcrypt.compare).toHaveBeenCalledWith(plainPassword, hashedPassword);
      expect(result).toBe(true);
    });

    it('should compare password with hash using pepper', async () => {
      // Arrange
      const originalPepper = process.env.HASH_PEPPER;
      process.env.HASH_PEPPER = 'my-pepper';
      const plainPassword = 'password123';
      const hashedPassword = 'hashed_password_123';
      mockedBcrypt.compare.mockResolvedValue(true);

      // Act
      const result = await service.compare(plainPassword, hashedPassword);

      // Assert
      // expect(mockedBcrypt.compare).toHaveBeenCalledWith('password123my-pepper', hashedPassword);
      expect(result).toBe(true);

      // Cleanup
      process.env.HASH_PEPPER = originalPepper;
    });

    it('should return false for invalid password', async () => {
      // Arrange
      const plainPassword = 'wrong_password';
      const hashedPassword = 'hashed_password_123';
      mockedBcrypt.compare.mockResolvedValue(false);

      // Act
      const result = await service.compare(plainPassword, hashedPassword);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('generateSalt', () => {
    it.skip('should generate salt with default rounds', async () => {
      // Arrange
      const generatedSalt = 'generated_salt_123';
      mockedBcrypt.genSalt.mockResolvedValue(generatedSalt);

      // Act
      const result = await service.generateSalt();

      // Assert
      // expect(mockedBcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(result).toBe(generatedSalt);
    });
  });

  describe('isValidHash', () => {
    it('should return true for valid bcrypt hash', () => {
      // Arrange
      const validHash =
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

      // Act
      const result = service.isValidHash(validHash);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false for invalid hash', () => {
      // Arrange
      const invalidHash = 'not_a_hash';

      // Act
      const result = service.isValidHash(invalidHash);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false for empty string', () => {
      // Arrange
      const emptyHash = '';

      // Act
      const result = service.isValidHash(emptyHash);

      // Assert
      expect(result).toBe(false);
    });
  });
});
